import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import CurrentChat from "./CurrentChat";
import InputMessage from "./InputMessage";
import OtherChat from "./OtherChat";
import { chatStore } from "@/store/chatStore";
import { userStore } from "@/store/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useFormatter } from "@/lib/useFormatter";
import moment from "moment";

const Chat = () => {
  const [chat, setChat] = useState(null);
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
  // const formatDates = (date) => {
  //   const today = moment().startOf("day");
  //   const messageDate = moment.unix(date.seconds);
  //   if (messageDate.isSame(today, "day")) {
  //     return "Today";
  //   } else if (messageDate.isSame(today.clone().subtract(1, "day"), "day")) {
  //     return "Yesterday";
  //   } else {
  //     return messageDate.format("MMMM D, YYYY");
  //   }
  // };

  return (
    <div className="p-6 bg-soft_primary w-[calc(100%-320px)] max-h-screen relative flex-col flex justify-between">
      <ChatHeader user={user} chatId={chatId} currentUser={currentUser} />
      <div className="relative pt-4 mt-auto h-fit max-h-full overflow-y-auto scroll scroll-auto space-y-4">
        {/* {formattedMessages.newMessages.map((date) => (
          <div key={date}>
            <h3>Messages for {formatDates(date)}</h3>
            {formattedMessages?.newMessages[date].map((message, index) => {
              const date = new Date(message.createdAt.seconds * 1000);
              const formattedDate = date.toLocaleString();
              return (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Date:</strong> {formattedDate}
                  </p>
                  {message.text && (
                    <p>
                      <strong>Text:</strong> {message.text}
                    </p>
                  )}
                  {message.img && (
                    <img
                      src={message.img}
                      alt="Message"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))} */}
        {chat?.messages.map((msg, i) => (
          <div key={i}>
            {/* <div className="sticky p-2 text-sm rounded bg-white top-0 mx-auto w-fit z-20">
              {formatDates(msg.createdAt)}
            </div> */}
            {msg?.senderId === currentUser?.id ? (
              <CurrentChat
                message={msg.text}
                createdAt={formatDate(msg.createdAt.toString())}
                key={msg.senderId}
                image={msg.img}
              />
            ) : (
              <OtherChat
                message={msg.text}
                key={msg.senderId}
                createdAt={formatDate(msg.createdAt.toString())}
                image={msg.img}
              />
            )}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <InputMessage currentUser={currentUser} chatId={chatId} user={user} />
    </div>
  );
};

export default Chat;
