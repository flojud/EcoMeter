/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { config } from "./config";
import { getAuth } from "firebase/auth";

export const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default { app, db, auth };
