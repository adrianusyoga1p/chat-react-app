import React, { useState } from "react";
import BaseInput from "./BaseInput";
import { userStore } from "@/store/userStore";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = userStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed w-screen h-screen bg-black/60 inset-0 z-30 p-10 flex justify-center items-center">
      <div className="bg-white rounded-lg h-fit text-start w-fit p-6 space-y-4">
        <h4 className="text-gray-800 text-lg">Add User</h4>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <BaseInput onChange={(e) => setUsername(e.target.value)} />
          <button
            type="submit"
            className="bg-primary text-sm text-white rounded p-2"
          >
            Search
          </button>
        </form>
        {user && (
          <>
            <div className="rounded-lg p-4 w-full hover:bg-soft_primary transition-colors cursor-pointer">
              <div className="flex gap-4 items-center">
                <img src={user?.avatar} alt="avatar" className="h-11 w-11" />
                <div>
                  <p className="font-medium">{user?.username}</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={handleAdd}
                className="bg-primary ml-auto text-sm text-white rounded p-2"
              >
                Add User
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUser;
