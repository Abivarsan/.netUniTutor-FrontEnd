import React from "react";
import { auth1 } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { query, collection, where, getDocs, addDoc, DocumentData, QuerySnapshot } from "firebase/firestore";
import { db1 } from "../../firebase";

// Define a type for the user data we expect to store in Firestore
interface UserData {
  uid: string;
  name: string | null;
  authProvider: string;
  email: string | null;
  avatar: string | null;
}

// Define the async function with appropriate TypeScript annotations
export const googleSignIn = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();
    
    // Login user with Google account
    const res = await signInWithPopup(auth1, provider);
    const user: User = res.user;
    
    // Check if the user exists in the Firestore 'users' collection
    const q = query(collection(db1, "users"), where("uid", "==", user.uid));
    const docs: QuerySnapshot<DocumentData> = await getDocs(q);
    
    // If user does not exist in the 'users' collection, add them
    if (docs.empty) {
      const userData: UserData = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        avatar: user.photoURL
      };
      
      await addDoc(collection(db1, "users"), userData);
    }

    // Optional: If you want to log the list of users (uncomment if needed)
    // const querySnapshot = await getDocs(collection(db, "users"));
    // const usersList = querySnapshot.docs.map(doc => doc.data() as UserData);
    // console.log({ usersList });

  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};
