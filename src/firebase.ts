import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc,
  serverTimestamp,
  type Unsubscribe 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { SiteConfig } from './types';
import { DEFAULT_CONFIG } from './utils/storage';

// Initialize Firebase App instance safely
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore targeting the provisioned database ID if provided
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const SETTINGS_DOC_ID = 'siteConfig';
const SETTINGS_COLLECTION = 'settings';

export const siteConfigDocRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);

/**
 * Real-time listener for site configuration from Cloud Firestore.
 * Automatically synchronizes updates to all visiting clients instantly.
 */
export function subscribeToSiteConfig(
  onUpdate: (config: SiteConfig) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    siteConfigDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const merged: SiteConfig = {
          ...DEFAULT_CONFIG,
          ...data,
        };
        onUpdate(merged);
      } else {
        // If document does not exist yet in Firestore, initialize it with DEFAULT_CONFIG
        onUpdate(DEFAULT_CONFIG);
        // Silently bootstrap initial default document
        setDoc(siteConfigDocRef, {
          ...DEFAULT_CONFIG,
          updatedAt: new Date().toISOString(),
          serverTime: serverTimestamp(),
        }).catch((err) => {
          console.warn('Initial Firestore document seed skipped:', err);
        });
      }
    },
    (error) => {
      console.error('Firestore real-time subscription error:', error);
      if (onError) {
        onError(error);
      }
    }
  );
}

/**
 * Persists site notice configuration directly to Cloud Firestore.
 */
export async function saveSiteConfigToCloud(config: SiteConfig): Promise<void> {
  await setDoc(
    siteConfigDocRef,
    {
      ...config,
      updatedAt: new Date().toISOString(),
      serverTime: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Fetches current site notice configuration one-time from Cloud Firestore.
 */
export async function getSiteConfigFromCloud(): Promise<SiteConfig | null> {
  try {
    const snap = await getDoc(siteConfigDocRef);
    if (snap.exists()) {
      return { ...DEFAULT_CONFIG, ...snap.data() } as SiteConfig;
    }
    return null;
  } catch (err) {
    console.error('Failed to get site config from Firestore:', err);
    return null;
  }
}
