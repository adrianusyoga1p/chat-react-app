import Avatar from "@/assets/avatar.png";

const ChatHeader = ({ currentUser, chatId, user }) => {
  return (
    <div className="sticky w-full rounded-lg bg-white p-2.5 top-0 shadow-md">
      <div className="flex gap-4 items-center">
        <img src={user?.avatar} alt="avatar" className="h-11 w-11" />
        <div>
          <p className="font-medium">{user?.username}</p>
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            <span className="text-green-600 text-sm">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
