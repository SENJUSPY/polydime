import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

const meta = import.meta as any;
if (meta.env?.DEV) {
  console.debug('Firebase initialized with project:', firebaseConfig.projectId);
  console.debug('Auth domain:', firebaseConfig.authDomain);
}

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
