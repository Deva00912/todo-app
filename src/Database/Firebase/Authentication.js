import { signInWithCustomToken, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const signInUserFDB = async (userToken) => {
  await signInWithCustomToken(auth, userToken);
};

export const signOutFDB = async () => {
  await signOut(auth);
};
