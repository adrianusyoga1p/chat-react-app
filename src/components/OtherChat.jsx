const OtherChat = ({ message, createdAt }) => {
  return (
    <div className="p-4 max-w-72 w-fit bg-cyan-900 text-white mr-auto rounded-xl rounded-bl-sm relative">
      {message}
      <div className="text-[9px] text-right">{createdAt}</div>
    </div>
  );
};

export default OtherChat;
