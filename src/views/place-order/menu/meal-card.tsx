import { FC } from "react";
import { IMeal } from "../../../schemas/meals.schema";

import SkeletonHOC from "../../../components/misc/loaders/skeleton-hoc";
import usePlaceOrderContext from "../context";
import { PlusIcon } from "lucide-react";
import { dollarFormatter } from "../../../utils/formatters";

interface MealCardProps {
  data: IMeal;
  isLoading: boolean;
}

const MealCard: FC<MealCardProps> = ({ data, isLoading }) => {
  const Skeleton = SkeletonHOC(isLoading);
  const { addToCart } = usePlaceOrderContext();

  return (
    // px-5 py-4 bg-white border border-independant-grey-subtle rounded-lg sm:overflow-hidden shadow-card
    <div
      className="group rounded-lg bg-white shadow-soft-small border border-independant-grey-subtle overflow-hidden w-[200px] flex flex-col cursor-pointer active:shadow-[0_0_0_2px_#CEDBF9] transition-shadow relative"
      onClick={() => {
        addToCart(data);
      }}
    >
      <div className=" absolute p-4 z-10 bg-brand text-white">{dollarFormatter.format(data.price)}</div>
      <div className=" absolute w-full h-full z-10 bg-brand opacity-0 group-hover:opacity-80 flex justify-center items-center transition-opacity">
        <PlusIcon color="white" width={96} height={96} />
      </div>
      <Skeleton width={200} height={200}>
        <img src={data.strMealThumb} className="w-full" />
      </Skeleton>
      <div className="flex-1 flex justify-center items-center px-4 py-6">
        <Skeleton count={1} width={100} height={10}>
          <h2 className="whitespace-normal text-center  text-2xl">{data.strMeal}</h2>
        </Skeleton>
      </div>
    </div>
  );
};

export default MealCard;
