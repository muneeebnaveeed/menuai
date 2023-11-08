import { FC } from "react";
import { ICartProduct } from "./types";
import { dollarFormatter } from "../../../utils/formatters";
import usePlaceOrderContext from "../context";
import { TrashIcon } from "lucide-react";

interface CartProductProps {
  data: ICartProduct;
}

const CartProduct: FC<CartProductProps> = ({ data }) => {
  const { addToCart } = usePlaceOrderContext();

  return (
    <div key={data.idMeal} className="rounded-lg p-6 border-2 border-white flex gap-4 text-white relative w-[410px]">
      <button
        className="absolute bottom-5 right-4 p-6"
        type="button"
        onClick={() => {
          addToCart(data, -1);
        }}
      >
        <TrashIcon width={40} height={40} />
      </button>
      <img src={data.strMealThumb} className="w-[100px] h-[170px] object-cover" />
      <div>
        <h2 className="text-3xl font-semibold mb-4">{data.strMeal}</h2>
        <p className="text-2xl mb-1">
          {data.quantity}x {dollarFormatter.format(data.price)}
        </p>
        <p className="text-2xl text-brand font-bold">{dollarFormatter.format(data.subtotal)}</p>
      </div>
    </div>
  );
};

export default CartProduct;
