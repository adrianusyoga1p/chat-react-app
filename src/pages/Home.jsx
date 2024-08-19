import Chat from "@/components/Chat";
import Loading from "@/components/Loading";
import UserList from "@/components/UserList";
import GuardedRoute from "@/router/guard";
import { chatStore } from "@/store/chatStore";
import { userStore } from "@/store/userStore";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../firebase";

const Home = () => {
  const { chatId } = chatStore();
  const { currentUser, isLoading, fetchUserInfo } = userStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <Loading />;

  return (
    <GuardedRoute auth={currentUser}>
      <div className="flex h-full">
        <UserList />
        {chatId && <Chat />}
        {!chatId && (
          <div className="p-6 w-[calc(100%-320px)] max-h-screen flex items-center justify-center text-2xl text-gray-300">
            Add user to start a conversation
          </div>
        )}
      </div>
    </GuardedRoute>
  );
};

export default Home;
