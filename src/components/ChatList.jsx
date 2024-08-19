import Avatar from "@/assets/avatar.png";

const ChatList = ({ data, onClick, isSeen }) => {
  return (
    <div className={`rounded-lg p-4 w-full hover:bg-soft_primary transition-colors cursor-pointer ${!isSeen ? 'bg-soft_primary' : ''}`} onClick={onClick}>
      <div className="flex gap-4 items-center">
        <img src={Avatar} alt="avatar" className="h-11 w-11" />
        <div>
          <p className="font-medium">{data?.user?.username}</p>
          <p
            className="text-sm text-gray-500 truncate w-48"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, numquam! Aliquid porro ut saepe sit. Harum obcaecati voluptate fugit blanditiis?"
          >
            {data?.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
