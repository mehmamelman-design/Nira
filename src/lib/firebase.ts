import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRZ5OiBOjFIc3pFS9D_ZSqWOzVe7gML3o",
  authDomain: "gen-lang-client-0223569443.firebaseapp.com",
  projectId: "gen-lang-client-0223569443",
  storageBucket: "gen-lang-client-0223569443.firebasestorage.app",
  messagingSenderId: "908366427258",
  appId: "1:908366427258:web:a5db0d174c428604e2f7c3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, "ai-studio-alovqrillpidelks-4555f510-a97e-4a3d-8f12-d6ebc8c97295");

let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: [browserLocalPersistence, browserSessionPersistence, inMemoryPersistence]
  });
} catch (e) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

