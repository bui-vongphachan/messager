import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import dotenv from "dotenv";

dotenv.config();

const firebaseApp = initializeApp({
  credential: admin.credential.cert(
    require("../../firebase-admin-config.json")
  ),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const firebaseDatabase = getDatabase(firebaseApp);

export { firebaseApp, firebaseDatabase };
