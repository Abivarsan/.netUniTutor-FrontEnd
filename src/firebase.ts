import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMX-He6pJx66g87owgxh33J3QR1OGlj1k",
  authDomain: "uni-tutor-3d240.firebaseapp.com",
  projectId: "uni-tutor-3d240",
  storageBucket: "uni-tutor-3d240.appspot.com",
  messagingSenderId: "345025359299",
  appId: "1:345025359299:web:7458ef5781b4a986a56176",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
