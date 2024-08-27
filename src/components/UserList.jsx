import { userStore } from "@/store/userStore";
import ChatList from "./ChatList";
import { auth, db } from "@/firebase/firebase";
import { chatStore } from "@/store/chatStore";
import BaseInput from "./BaseInput";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import AddUser from "./AddUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";

const UserList = () => {
  const { resetChat, changeChat } = chatStore();
  const { currentUser } = userStore();
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [selectChat, setSelectChat] = useState(null)
  const [addUser, setAddUser] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      userStore.getState().fetchUserInfo(null);
      resetChat();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats;

        const promises = items?.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const usersChat = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = usersChat.findIndex(
      (item) => item.chatId === chat.chatId
    );

    usersChat[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: usersChat,
      });
      changeChat(chat.chatId, chat.user);
      setSelectChat(chat.chatId);
    } catch (error) {
      console.log(error);
    }
  };

  const filterChat = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  const handleClose = () => {
    setAddUser(false);
  };

  return (
    <div className="w-[320px] border-r p-4 flex flex-col gap-4 max-h-screen relative bg-white">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={currentUser?.avatar}
            alt="avatar"
            className="h-11 w-11 rounded-full"
          />
          <div>
            <p className="font-medium">{currentUser?.username}</p>
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span className="text-green-600 text-sm">Online</span>
            </div>
          </div>
        </div>
        <button
          className="bg-red-600 text-white rounded p-2 text-xs"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <h1 className="text-xl font-bold">Messages</h1>
      <div className="flex gap-2 items-center justify-between">
        <BaseInput
          placeholder="Search user..."
          className="w-56 focus:!border focus:!border-primary"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => setAddUser((prev) => !prev)}
          className="bg-primary h-full px-4 rounded-md text-white"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-1 gap-2">
        {filterChat.map((chat) => (
          <ChatList
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            data={chat}
            isSeen={chat.isSeen}
            selected={selectChat}
          />
        ))}
        {addUser && <AddUser close={handleClose} />}
      </div>
      <div className="w-full absolute bottom-0 bg-gradient-to-t from-white/80 h-40 left-0 right-0 pointer-events-none"></div>
    </div>
  );
};

export default UserList;
