import { FC } from "react";
import Cart from "./cart";
import Chat from "./chat";
import Menu from "./menu";
import { PlaceOrderContextWrapper } from "./context";

const PlaceOrderView: FC = () => {
  return (
    <PlaceOrderContextWrapper>
      <div className="flex min-h-screen [&>div]:min-h-[inherit] [&>div>div]:min-h-[inherit]">
        <div className="w-[500px]">
          <Cart />
        </div>
        <div className="w-[450px]">
          <Chat />
        </div>
        <div className="flex-1">
          <Menu />
        </div>
      </div>
    </PlaceOrderContextWrapper>
  );
};

export default PlaceOrderView;
