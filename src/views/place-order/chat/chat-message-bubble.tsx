import { FC } from "react";
import { ChatMessageTypes, IChatMessage } from "./types";
import classnames from "classnames";

interface ChatMessageBubbleProps {
  data: IChatMessage;
}

const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({ data }) => {
  return (
    <div
      className={classnames("px-8 py-6  rounded-full text-xl leading-6", {
        "bg-brand text-white": data.isUser,
        "bg-gray-100": !data.isUser,
      })}
    >
      {data.type === ChatMessageTypes.INTRODUCTION ? (
        <>
          Hello there! I'm <span className="text-brand font-medium">Maurice</span> and I'll help you place your order
          today
        </>
      ) : (
        data.message
      )}
    </div>
  );
};

export default ChatMessageBubble;
