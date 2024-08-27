import React from "react";

const OtherChat = ({ message, createdAt, image }) => {
  const lines = message.split("\n").filter((line) => line.trim() !== "");
  return (
    <div className="p-4 max-w-72 w-fit bg-cyan-900 text-white mr-auto rounded-xl rounded-bl-sm relative">
      {image && <img src={image} className={`${message && "mb-2"} rounded`} />}
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
      <div className="text-[9px] text-right mt-1.5">{createdAt}</div>
    </div>
  );
};

export default OtherChat;
