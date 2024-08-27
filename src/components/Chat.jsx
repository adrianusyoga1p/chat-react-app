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
import Loading from "./Loading";

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
  const formatingDate = (date) => {
    const today = moment().startOf("day");
    let messageDate;

    if (typeof date === "object" && date.seconds) {
      messageDate = moment.unix(date.seconds);
    } else {
      messageDate = moment(date); // For ISO date string or other formats
    }

    if (!messageDate.isValid()) {
      return "Invalid Date";
    }

    if (messageDate.isSame(today, "day")) {
      return "Today";
    } else if (messageDate.isSame(today.clone().subtract(1, "day"), "day")) {
      return "Yesterday";
    } else {
      return messageDate.format("MMMM D, YYYY");
    }
  };

  const formatDates = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const groupMessagesByDate = (chat) => {
    return chat?.reduce((acc, message) => {
      const date = formatDates(message.createdAt.seconds);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        createdAt: message.createdAt,
        text: message.text,
        senderId: message.senderId,
        img: message.img,
      });
      return acc;
    }, {});
  };

  const formattedMessages = {
    createdAt: chat?.messages[0].createdAt,
    newMessages: groupMessagesByDate(chat?.messages),
  };

  console.log(formattedMessages.newMessages);

  if (!formattedMessages || !formattedMessages?.newMessages) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-soft_primary w-[calc(100%-320px)] max-h-screen relative flex-col flex justify-between">
      <ChatHeader user={user} chatId={chatId} currentUser={currentUser} />
      <div className="relative pt-4 mt-auto h-fit max-h-full overflow-y-auto scroll scroll-auto">
        {Object.keys(formattedMessages?.newMessages).map((date, i) => (
          <div className="space-y-4" key={i}>
            <div className="sticky p-2 text-sm rounded bg-white top-0 mx-auto w-fit z-20">
              {formatingDate(date)}
            </div>
            {formattedMessages?.newMessages[date].map((msg, index) => {
              return msg?.senderId === currentUser?.id ? (
                <CurrentChat
                  message={msg.text}
                  createdAt={formatDate(msg.createdAt.toString())}
                  key={index}
                  image={msg.img}
                />
              ) : (
                <OtherChat
                  message={msg.text}
                  key={index}
                  createdAt={formatDate(msg.createdAt.toString())}
                  image={msg.img}
                />
              );
            })}
          </div>
        ))}
        <div className="mb-4" ref={endRef}></div>
      </div>
      <InputMessage currentUser={currentUser} chatId={chatId} user={user} />
    </div>
  );
};

export default Chat;
