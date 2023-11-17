import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const signInUserFDB = async (user) => {
  await signInWithEmailAndPassword(auth, user.email, user.password);
  return await getUserDocumentByEmail(user.email);
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
  const userDocRef = collection(db, "Users");
  await addDoc(userDocRef, {
    authProvider: "local",
    uid: createdUser.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
  return await getUserDocumentByEmail(user.email);
};

export const getUserDocumentByEmail = async (email) => {
  const usersRef = collection(db, "Users");
  const userQuery = query(usersRef, where("email", "==", email));
  const userDocSnapshot = await getDocs(userQuery);
  const user = [];
  !userDocSnapshot.empty &&
    userDocSnapshot.forEach((doc) =>
      user.push({ userId: doc.id, ...doc.data() })
    );

  return user.length ? user[0] : null;
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
