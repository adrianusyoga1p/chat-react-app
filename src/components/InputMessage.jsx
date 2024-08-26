import upload from "@/firebase/upload";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/firebase/firebase";

const InputMessage = ({ currentUser, chatId, user }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const send = async (e) => {
    e.preventDefault();
    let imgUrl = null;
    if (text === "" && img.file === null) return;

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

          userChatData.chats[chatIndex].lastMessage =
            text === "" && imgUrl ? "Photo sent" : text;
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

  const isMac = navigator.userAgent.indexOf("MAX") >= 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if ((isMac && e.ctrlKey) || (!isMac && e.metaKey)) {
        // Ctrl + Enter: Add a new line in the message
        setText((prev) => prev + "\n");
      }
    }
  };

  return (
    <>
      <form onSubmit={send} className="relative w-full">
        <div
          className={`bg-white w-full transition h-auto max-h-72 overflow-hidden absolute left-0 p-4 rounded-t-lg z-10 ${
            img.url == "" ? "bottom-0 translate-y-0" : "-translate-y-full top-2"
          }`}
        >
          <img src={img.url} className="rounded w-full object-center" />
        </div>
        <div className="flex items-center sticky z-50 shadow-md rounded-lg bg-white p-2.5 bottom-0">
          <div className="cursor-pointer p-2">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImg}
            />
            <label htmlFor="file">
              <FontAwesomeIcon
                icon={faImage}
                size="lg"
                className="text-gray-500 cursor-pointer"
              />
            </label>
          </div>
          <textarea
            type="text"
            value={text}
            onKeyDown={handleKeyDown}
            onChange={(e) => setText(e.target.value)}
            className="border-none outline-none p-2 w-full placeholder:text-gray-400 placeholder:font-normal resize-none h-10"
            placeholder="Input messages"
          ></textarea>
          <button
            type="submit"
            className="bg-primary p-3 rounded-md text-white flex items-center justify-center h-full"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </>
  );
};

export default InputMessage;
