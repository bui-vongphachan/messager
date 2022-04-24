import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onDisconnect,
  serverTimestamp,
} from "firebase/database";
import Cookie from "universal-cookie";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(firebase);

const auth = getAuth(firebase);

/* signInAnonymously(auth)
  .then(() => {
    const cookie = new Cookie();
    const user_id = cookie.get("user_id");
    const user_name = cookie.get("user_name");

    const firebaseRef = ref(firebaseDatabase, `profiles/${user_id}`);
    const connectedRef = ref(firebaseDatabase, `.info/connected`);

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() == false) {
        return;
      } else {
        if (user_id) {
          set(firebaseRef, {
            user_id,
            user_name,
            status: "online",
            last_changed: serverTimestamp(),
          });
        }
      }
    });

    onDisconnect(firebaseRef).update({
      status: "offline",
      last_changed: serverTimestamp(),
    });
  })
  .catch((error) => {
    console.log({ error });
  }); */

export { firebase, firebaseDatabase };
