import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getCustomStatuses, createCustomStatus, deleteCustomStatus } from '../lib/db/custom-statuses';
import type { CustomJobStatus } from '../lib/types/common';


export function useCustomStatuses() {
  const { user } = useAuth();
  const [customStatuses, setCustomStatuses] = useState<CustomJobStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCustomStatuses([]);
      setIsLoading(false);
      return;
    }

    async function loadStatuses() {
      if (!user?.uid) return;
      try {
        const statuses = await getCustomStatuses(user.uid);
        setCustomStatuses(statuses);
      } catch (error) {
        console.error('Error loading custom statuses:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStatuses();
  }, [user]);

  const addCustomStatus = async (status: CustomJobStatus) => {
    if (!user) return;
    setCustomStatuses(prev => [...prev, status]);
  };

  const removeCustomStatus = (statusId: string) => {
    setCustomStatuses(prev => prev.filter(s => s.id !== statusId));
  };

  return {
    customStatuses,
    isLoading,
    removeCustomStatus,
    addCustomStatus,
    deleteCustomStatus
  };
} 