import { auth } from './firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';
import toast from 'react-hot-toast';

export async function connectGmailWatch(applicationId: string, email: string) {
  try {
    const userDoc = doc(db, 'users', auth.currentUser!.uid);
    await updateDoc(userDoc, {
      gmailWatches: arrayUnion({
        applicationId,
        email,
        startedAt: new Date().toISOString()
      })
    });
    
    // In a real implementation, you would:
    // 1. Call your backend to set up Gmail API watch
    // 2. Store the watch ID and expiration
    
    return true;
  } catch (error) {
    console.error('Error connecting Gmail watch:', error);
    throw error;
  }
}

export async function disconnectGmailWatch(applicationId: string, email: string) {
  try {
    const userDoc = doc(db, 'users', auth.currentUser!.uid);
    await updateDoc(userDoc, {
      gmailWatches: arrayRemove({
        applicationId,
        email,
        startedAt: new Date().toISOString()
      })
    });
    
    // In a real implementation:
    // 1. Call your backend to stop Gmail API watch
    // 2. Clean up watch data
    
    return true;
  } catch (error) {
    console.error('Error disconnecting Gmail watch:', error);
    throw error;
  }
}

export async function disconnectAllGmailWatches() {
  try {
    const userDoc = doc(db, 'users', auth.currentUser!.uid);
    await updateDoc(userDoc, {
      gmailWatches: []
    });
    
    // In a real implementation:
    // 1. Call your backend to stop all Gmail API watches
    // 2. Clean up all watch data
    
    toast.success('Successfully disconnected Gmail integration');
    return true;
  } catch (error) {
    console.error('Error disconnecting all Gmail watches:', error);
    throw error;
  }
}