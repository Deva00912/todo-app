import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  // getDocs,
} from "firebase/firestore";
import { putUserTasks } from "../../Redux/Tasks/action";

export const addTaskFDB = async (task) => {
  await addDoc(collection(db, "Tasks"), task);
};

export const getUserTasksFDB = async (userId) => {
  const tasksRef = collection(db, "Tasks");
  const taskQuery = query(tasksRef, ("userId", "==", userId));

  // const querySnapshot = await getDocs(taskQuery);
  // querySnapshot.forEach((doc) =>
  //   userTasks.push({ taskId: doc.id, ...doc.data() })
  // );
  // putUserTasks(userTasks);

  // eslint-disable-next-line no-unused-vars
  const unSubscribe = onSnapshot(taskQuery, (snapshot) => {
    const userTasks = [];
    snapshot.forEach((doc) => {
      userTasks.push({ taskId: doc.id, ...doc.data() });
    });
    console.log("userTasks - firebase", userTasks);
    putUserTasks(userTasks);
  });
};

export const updateTaskFDB = async (taskId, entry) => {
  const taskDocumentRef = doc(db, "Tasks", taskId);
  await updateDoc(taskDocumentRef, { entry: entry });
};

export const deleteTaskFDB = async (taskId) => {
  const taskDocumentRef = doc(db, "Tasks", taskId);
  await deleteDoc(taskDocumentRef);
};
