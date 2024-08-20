import Avatar from "@/assets/avatar.png";
import { useFormatter } from "@/lib/useFormatter";

const ChatList = ({ data, onClick, isSeen }) => {
  const { formateTime } = useFormatter();
  return (
    <div
      className="rounded-lg p-4 w-full hover:bg-soft_primary transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        {!isSeen && <div className="w-2 h-2 rounded-full bg-primary"></div>}
        <img src={data?.user?.avatar} alt="avatar" className="h-11 w-11" />
        <div>
          <p className="font-medium">{data?.user?.username}</p>
          <p
            className="text-sm text-gray-500 truncate max-w-32"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, numquam! Aliquid porro ut saepe sit. Harum obcaecati voluptate fugit blanditiis?"
          >
            {data?.lastMessage}
          </p>
        </div>
        <p
          className={`text-sm ml-auto mb-auto ${
            !isSeen ? "text-primary font-semibold" : "text-gray-500"
          }`}
        >
          {formateTime(data?.updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default ChatList;
