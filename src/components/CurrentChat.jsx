const CurrentChat = ({ message, createdAt }) => {
  return (
    <div className="p-4 max-w-72 w-fit bg-primary text-white ml-auto rounded-xl rounded-br-sm relative">
      {message}
      <div className="text-[9px] text-right">{createdAt}</div>
    </div>
  );
};

export default CurrentChat;
