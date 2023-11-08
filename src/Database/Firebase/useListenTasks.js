import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { putUserTasks } from "../../Redux/Tasks/action";
import { useEffect, useState } from "react";

export default function useListenTasks(props) {
  const [taskListener, setTaskListener] = useState({
    listener: null,
  });

  const subscribeToTaskListener = () => {
    const userId = props.auth.data?.userId ? props.auth.data?.userId : "";

    const tasksRef = collection(db, "Tasks");
    const taskQuery = query(tasksRef, where("userId", "==", userId));

    return onSnapshot(
      taskQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        const userTasks = [];
        snapshot.forEach((doc) => {
          userTasks.push({ taskId: doc.id, ...doc.data() });
        });
        putUserTasks(userTasks);
      }
    );
  };

  useEffect(() => {
    if (props.auth.data.userId && typeof taskListener.listener !== "function") {
      setTaskListener({ listener: subscribeToTaskListener() });
    } else if (
      !props.auth.data.userId &&
      typeof taskListener.listener === "function"
    ) {
      taskListener.listener();
      setTaskListener({ listener: null });
    }

    // eslint-disable-next-line
  }, [props.auth.data.userId]);
}

export const addTaskFDB = async (task) => {
  await addDoc(collection(db, "Tasks"), task);
};

export const updateTaskFDB = async (taskId, entry) => {
  const taskDocumentRef = doc(db, "Tasks", taskId);
  await updateDoc(taskDocumentRef, { entry: entry });
};

export const deleteTaskFDB = async (taskId) => {
  const taskDocumentRef = doc(db, "Tasks", taskId);
  await deleteDoc(taskDocumentRef);
};
