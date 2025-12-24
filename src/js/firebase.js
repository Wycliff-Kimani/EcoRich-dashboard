import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB5EjVjBzf7gXwqGxMpQpxG10y4DuMUiY",
  authDomain: "ecorich-ee780.firebaseapp.com",
  projectId: "ecorich-ee780",
  storageBucket: "ecorich-ee780.firebasestorage.app",
  messagingSenderId: "834801071726",
  appId: "1:834801071726:web:db2db210c4b4c8e200987f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
