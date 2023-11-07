import { FC } from "react";
import Cart from "./cart";
import Chat from "./chat";
import Menu from "./menu";

const PlaceOrderView: FC = () => {
  return (
    <div className="flex h-screen [&_div]:h-[inherit]">
      <div className="w-[300px]">
        <Cart />
      </div>
      <div className="w-[250px]">
        <Chat />
      </div>
      <div className="flex-1">
        <Menu />
      </div>
    </div>
  );
};

export default PlaceOrderView;
