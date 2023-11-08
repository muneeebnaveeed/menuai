import { dollarFormatter } from "../../../utils/formatters";
import usePlaceOrderContext from "../context";
import CartProduct from "./cart-product";
import { useMemo } from "react";

const Cart = () => {
  const { cart } = usePlaceOrderContext();
  const total = useMemo(
    () => cart.products.reduce((amount, product) => (amount += product.subtotal), 0),
    [cart.products]
  );
  return (
    <div className="bg-independant-grey-active w-full h-full overflow-hidden">
      <div className="flex flex-col  p-12 h-full">
        <div className="mb-12">
          <h2 className="text-white text-5xl font-bold">Cart</h2>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-4 h-full">
            {cart.products.length <= 0 && (
              <div className="w-full h-full flex justify-center items-center px-4">
                <h1 className="text-white text-4xl">Please select a meal to add in cart</h1>
              </div>
            )}
            {cart.products.map((e) => (
              <CartProduct key={e.idMeal} data={e} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 pb-4">
          {total && <h1 className="font-semibold text-6xl text-white">Total: {dollarFormatter.format(total)}</h1>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
