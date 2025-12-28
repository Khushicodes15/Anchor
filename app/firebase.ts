import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjJ2fzx0GbUtdNfRh7Gzq1uqXRW2rCV1M",
  authDomain: "anchor-848f2.firebaseapp.com",
  projectId: "anchor-848f2",
  storageBucket: "anchor-848f2.firebasestorage.app",
  messagingSenderId: "300133228042",
  appId: "1:300133228042:web:8b7b78cd24a4ec455b89f3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
