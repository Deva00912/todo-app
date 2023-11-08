import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const signInUserFDB = async (user) => {
  await signInWithEmailAndPassword(auth, user.email, user.password);
  return await getUser(user.email);
};

export const signOutFDB = async () => {
  await signOut(auth);
};

export const registerWithEmailAndPassword = async (user) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  const createdUser = response.user;
  const userDocRef = doc(db, "Users", createdUser.uid); // Use createdUser.uid as the document ID
  await setDoc(userDocRef, {
    authProvider: "local",
    uid: createdUser.uid,
    ...user,
  });
  return await getUser(user.email);
};

const getUser = async (email) => {
  const userRef = collection(db, "Users");
  const userQuery = query(userRef, where("email", "==", email));

  const querySnapshot = await getDocs(userQuery);
  const user = [];
  querySnapshot.forEach((doc) => {
    user.push({ userId: doc.id, ...doc.data() });
  });
  return user[0];
};

export const signedInUserTrackIn = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Logged In user");
    } else {
      console.log("User logged out");
    }
  });
};
