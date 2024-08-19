const OtherChat = ({ message, createdAt }) => {
  return (
    <div className="p-4 max-w-72 w-full bg-cyan-900 text-white mr-auto rounded-xl rounded-bl-sm relative">
      {message}
      <div className="absolute bottom-4 right-4 text-[9px]">{createdAt}</div>
    </div>
  );
};

export default OtherChat;
