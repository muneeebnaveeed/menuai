import { FC, MouseEventHandler } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import capitalize from "../../../utils/capitalize";
import classNames from "classnames";

interface PaginationButtonProps {
  type: "previous" | "next";
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

const PaginationButton: FC<PaginationButtonProps> = ({ type, ...buttonProps }) => {
  const Icon = type === "previous" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      className="bg-white w-[220px] h-[140px] rounded-lg border border-independant-grey-subtle flex justify-center items-center text-independant-grey-active gap-1 disabled:opacity-30 disabled:cursor-not-allowed active:shadow-[0_0_0_2px_#CEDBF9] transition-shadow font-medium"
      {...buttonProps}
    >
      <Icon
        width={44}
        height={44}
        className={classNames({ "order-1": type === "previous", "order-3": type === "next" })}
      />
      <p className="text-2xl order-2 leading-[44px]">{capitalize(type)}</p>
    </button>
  );
};

export default PaginationButton;
