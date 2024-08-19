import Chat from "@/components/Chat";
import UserList from "@/components/UserList";
import { chatStore } from "@/store/chatStore";
import React from "react";

const Home = () => {
  const { chatId } = chatStore();
  return (
    <div className="flex h-full">
      <UserList />
      {chatId && <Chat />}
      {!chatId && (
        <div className="p-6 w-[calc(100%-320px)] max-h-screen flex items-center justify-center text-2xl text-gray-300">
          Add user to start a conversation
        </div>
      )}
    </div>
  );
};

export default Home;
