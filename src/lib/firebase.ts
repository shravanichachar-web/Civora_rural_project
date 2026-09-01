import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Initialize Firestore using explicit databaseId from config if provided
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const storage = getStorage(app);

/**
 * Uploads a complaint photo (Data URL string or File object) to Firebase Storage
 * and returns the public download URL. Falls back to original string on error.
 */
export async function uploadComplaintPhoto(
  fileOrDataUrl: File | string,
  complaintId: string,
  type: 'photo' | 'before' | 'after' = 'photo'
): Promise<string> {
  if (!fileOrDataUrl) return '';

  // If it's already an http/https URL, return as is
  if (typeof fileOrDataUrl === 'string' && (fileOrDataUrl.startsWith('http://') || fileOrDataUrl.startsWith('https://'))) {
    return fileOrDataUrl;
  }

  try {
    const timestamp = Date.now();
    const storagePath = `complaints/${complaintId}_${type}_${timestamp}`;
    const storageRef = ref(storage, storagePath);

    if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
      await uploadString(storageRef, fileOrDataUrl, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } else if (fileOrDataUrl instanceof File) {
      await uploadBytes(storageRef, fileOrDataUrl);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    }
  } catch (error) {
    console.warn('Firebase Storage upload warning (using fallback string):', error);
  }

  return typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '';
}
