// src/init-firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { environment } from "../environments/environment";

const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  databaseURL: environment.firebase.databaseURL,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
  measurementId: environment.firebase.measurementId
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export { databaseRef, getDownloadURL, set, push, remove, ref, child, get, uploadBytes, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };
