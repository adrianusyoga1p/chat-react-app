const CurrentChat = ({ message, createdAt, image }) => {
  const lines = message.split("\n").filter((line) => line.trim() !== "");
  return (
    <div className="p-4 max-w-72 w-fit bg-primary text-white ml-auto rounded-xl rounded-br-sm relative">
      {image && <img src={image} className={`${message && "mb-2"} rounded`} />}
      {lines.map((line) => (
        <>
          {line}
          <br />
        </>
      ))}
      <div className="text-[9px] text-right mt-1.5">{createdAt}</div>
    </div>
  );
};

export default CurrentChat;
