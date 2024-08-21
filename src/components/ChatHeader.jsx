import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { chatStore } from "@/store/chatStore";
import { userStore } from "@/store/userStore";

const ChatHeader = ({ user }) => {
  const { chatId } = chatStore();
  const { currentUser } = userStore();
  const handleDelete = async () => {
    const chatRef = doc(db, "chats", chatId);
    const userID = [currentUser.id, user.id];
    const chatDoc = await getDoc(chatRef);

    try {
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        if (Array.isArray(chatData.messages) && chatData.messages.length > 0) {
          userID.forEach(async (id) => {
            const userChatRef = doc(db, "userchats", id);
            const userChatSnapshot = await getDoc(userChatRef);

            if (userChatSnapshot.exists()) {
              const userChatData = userChatSnapshot.data();

              const chatIndex = userChatData.chats.findIndex(
                (c) => c.chatId === chatId
              );

              userChatData.chats[chatIndex].lastMessage = "Message was deleted";
              userChatData.chats[chatIndex].isSeen =
                id === currentUser.id ? true : false;
              userChatData.chats[chatIndex].updatedAt = Date.now();

              await updateDoc(userChatRef, {
                chats: userChatData.chats,
              });
            }
          });

          // Mengatur array messages menjadi kosong
          await updateDoc(chatRef, {
            messages: [],
          });
          console.log("Semua pesan berhasil dihapus!");
        } else {
          console.log("Array messages null, tidak ada pesan untuk dihapus.");
        }
      } else {
        console.log("Dokumen chat tidak ditemukan.");
      }
    } catch (error) {
      console.error("Gagal menghapus semua pesan: ", error);
    }
  };
  return (
    <div className="sticky w-full rounded-lg bg-white p-2.5 top-0 shadow-md">
      <div className="flex gap-4 items-center">
        <img
          src={user?.avatar}
          alt="avatar"
          className="h-11 w-11 rounded-full"
        />
        <div>
          <p className="font-medium">{user?.username}</p>
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            <span className="text-green-600 text-sm">Online</span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="w-10 h-10 hover:bg-red-100 hover:text-red-500 rounded-full ml-auto"
          title="Clear chat"
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
