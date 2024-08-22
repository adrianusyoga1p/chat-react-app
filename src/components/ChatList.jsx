import { useFormatter } from "@/lib/useFormatter";
import avatar from "@/assets/avatar.jpg"

const ChatList = ({ data, onClick, isSeen, selected }) => {
  const { formateTime } = useFormatter();

  return (
    <div
      className={`rounded-lg p-4 w-full hover:bg-soft_primary transition-colors cursor-pointer relative ${
        data.chatId === selected ? "bg-soft_primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        <img
          src={data?.user?.avatar}
          alt="avatar"
          className="h-11 w-11 rounded-full"
        />
        <div>
          <p className="font-medium">{data?.user?.username}</p>
          <p
            className="text-sm text-gray-500 truncate max-w-32"
            title={data?.lastMessage}
          >
            {data?.lastMessage}
          </p>
        </div>
        <div className="ml-auto flex flex-col items-center justify-between">
          <p
            className={`text-sm ${
              !isSeen ? "text-primary font-semibold mb-3" : "text-gray-500 mb-4"
            }`}
          >
            {formateTime(data?.updatedAt)}
          </p>
          {!isSeen && <div className="w-2 h-2 rounded-full bg-primary"></div>}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
