const CurrentChat = ({ message, createdAt }) => {
  return (
    <div className="p-4 max-w-72 w-full bg-primary text-white ml-auto rounded-xl rounded-br-sm relative">
      {message}
      <div className="absolute bottom-4 right-4 text-[9px]">{createdAt}</div>
    </div>
  );
};

export default CurrentChat;
