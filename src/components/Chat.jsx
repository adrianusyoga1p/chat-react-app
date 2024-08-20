import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import CurrentChat from "./CurrentChat";
import InputMessage from "./InputMessage";
import OtherChat from "./OtherChat";
import { chatStore } from "@/store/chatStore";
import { userStore } from "@/store/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useFormatter } from "@/lib/useFormatter";

const Chat = () => {
  const [chat, setChat] = useState();
  const { chatId, user } = chatStore();
  const { currentUser } = userStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res?.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const { formatDate } = useFormatter();


  return (
    <div className="p-6 bg-soft_primary w-[calc(100%-320px)] max-h-screen relative flex-col flex justify-between">
      <ChatHeader user={user} chatId={chatId} currentUser={currentUser} />
      <div className="relative pt-4 mt-auto h-fit max-h-full overflow-y-auto scroll scroll-auto space-y-4">
        {chat?.messages?.map((msg, i) =>
          msg?.senderId === currentUser?.id ? (
            <CurrentChat
              message={msg.text}
              createdAt={formatDate(msg.createdAt.toString())}
              key={i}
            />
          ) : (
            <OtherChat
              message={msg.text}
              key={i}
              createdAt={formatDate(msg.createdAt.toString())}
            />
          )
        )}
        <div ref={endRef}></div>
      </div>
      <InputMessage currentUser={currentUser} chatId={chatId} user={user} />
    </div>
  );
};

export default Chat;
