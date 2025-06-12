import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
//variables de entorno estan localizadas en el archivo .env.local
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
console.log("Firebase Config:", firebaseConfig);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


export const login = ({email, password}) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const register = ({email, password}) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
  return signOut(auth);
}
