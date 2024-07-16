import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration for the first project
const firebaseConfig1 = {
  apiKey: "AIzaSyASKtNdUvlCPN7xJdYEesae82RYguimDjM",
  authDomain: "react-chat-e4edd.firebaseapp.com",
  projectId: "react-chat-e4edd",
  storageBucket: "react-chat-e4edd.appspot.com",
  messagingSenderId: "226600163642",
  appId: "1:226600163642:web:b5b9ec89eb79ca8656d803",
  measurementId: "G-D8GK32WZ39"
};

// Initialize Firebase for the first project
const app1 = initializeApp(firebaseConfig1);
const auth1 = getAuth(app1);
const db1 = getFirestore(app1);

// Firebase configuration for the second project
const firebaseConfig2 = {
  apiKey: "AIzaSyDMX-He6pJx66g87owgxh33J3QR1OGlj1k",
  authDomain: "uni-tutor-3d240.firebaseapp.com",
  projectId: "uni-tutor-3d240",
  storageBucket: "uni-tutor-3d240.appspot.com",
  messagingSenderId: "345025359299",
  appId: "1:345025359299:web:7458ef5781b4a986a56176"
};

// Initialize Firebase for the second project
const app2 = initializeApp(firebaseConfig2, 'secondApp');
const storage2 = getStorage(app2);

export { auth1, db1, storage2 };
