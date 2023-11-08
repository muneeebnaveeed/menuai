import { FC, Dispatch } from "react";
import { IChatMessageAction } from "./types";
import classnames from "classnames";

interface ChatMessageActionProps {
  data: IChatMessageAction;
  onClick: Dispatch<IChatMessageAction>;
  isDisabled: boolean;
}

const ChatMessageAction: FC<ChatMessageActionProps> = ({ data, onClick, isDisabled }) => {
  return (
    <div
      className={classnames("px-8 py-6 bg-brand text-white rounded-full text-xl leading-6 text-center cursor-pointer", {
        "opacity-30": isDisabled,
      })}
      onClick={() => onClick(data)}
    >
      {data.label}
    </div>
  );
};

export default ChatMessageAction;
