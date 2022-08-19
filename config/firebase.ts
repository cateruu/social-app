import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAgfxXbHKTzX_5XE0peMJx3ziTm9_Vm-Fc',
  authDomain: 'social-media-45592.firebaseapp.com',
  databaseURL:
    'https://social-media-45592-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'social-media-45592',
  storageBucket: 'social-media-45592.appspot.com',
  messagingSenderId: '302097840536',
  appId: '1:302097840536:web:8fed43adae359d969093ed',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
