import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlkhCbfYBVb3RP3_EYA12ih5IJn_TVIR8",
  authDomain: "thearthecodelive.firebaseapp.com",
  projectId: "thearthecodelive",
  storageBucket: "thearthecodelive.firebasestorage.app",
  messagingSenderId: "969234217622",
  appId: "1:969234217622:web:93b0233e94bfbeae4420b7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);