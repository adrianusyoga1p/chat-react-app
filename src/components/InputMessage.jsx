import upload from "@/firebase/upload";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const InputMessage = ({ currentUser, chatId, user }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const send = async (e) => {
    e.preventDefault();
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userID = [currentUser.id, user.id];

      userID.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setImg({
        file: null,
        url: "",
      });
      setText("");
    }
  };
  return (
    <form
      onSubmit={send}
      className="sticky w-full rounded-lg bg-white p-2.5 bottom-6 shadow-md flex items-center"
    >
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        className="border-none outline-none p-2 w-full placeholder:text-gray-400 placeholder:font-normal"
        placeholder="Input messages"
      />
      <button className="bg-primary px-3 py-1.5 rounded-md text-white">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default InputMessage;
