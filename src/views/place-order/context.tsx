import { createContext, Dispatch, SetStateAction, FC, PropsWithChildren, useState, useContext } from "react";
import { MealCategories } from "../../data/get-meals.data";
import { ICart, ICartProduct } from "./cart/types";
import { IMeal } from "../../schemas/meals.schema";

interface PlaceOrderContextValues {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentLimit: number;
  setCurrentLimit: Dispatch<SetStateAction<number>>;
  currentCategory: MealCategories;
  setCurrentCategory: Dispatch<SetStateAction<MealCategories>>;
  cart: ICart;
  addToCart: (meal: IMeal, quantity?: number) => void;
}

const initialValues: PlaceOrderContextValues = {
  currentPage: 1,
  setCurrentPage: () => {},
  currentLimit: 8,
  setCurrentLimit: () => {},
  currentCategory: MealCategories.PASTA,
  setCurrentCategory: () => {},
  cart: { products: [] },
  addToCart: () => {},
};

const PlaceOrderContext = createContext<PlaceOrderContextValues>(initialValues);

const calculateSubtotal = (quantity: number, price: number) => quantity * price;

export const PlaceOrderContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(initialValues.currentPage);
  const [currentLimit, setCurrentLimit] = useState(initialValues.currentLimit);
  const [currentCategory, setCurrentCategory] = useState(initialValues.currentCategory);
  const [cart, setCart] = useState<ICart>({ products: [] });

  const addToCart = (meal: IMeal, $quantity: number = 1) => {
    setCart(($) => {
      const prev = structuredClone($);
      const existingProductIndex = prev.products.findIndex((e) => e.idMeal === meal.idMeal);

      if (existingProductIndex !== -1) {
        // product already exists
        prev.products[existingProductIndex].quantity += $quantity;
        if (prev.products[existingProductIndex].quantity <= 0) {
          prev.products.splice(existingProductIndex, 1);
        } else {
          const { quantity, price } = prev.products[existingProductIndex];
          prev.products[existingProductIndex].subtotal = calculateSubtotal(quantity, price);
        }
      } else {
        const newProduct: ICartProduct = {
          ...meal,
          quantity: $quantity,
          subtotal: calculateSubtotal($quantity, meal.price),
        };
        prev.products.push(newProduct);
      }

      return prev;
    });
  };

  return (
    <PlaceOrderContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentLimit,
        setCurrentLimit,
        currentCategory,
        setCurrentCategory,
        cart,
        addToCart,
      }}
    >
      {children}
    </PlaceOrderContext.Provider>
  );
};

const usePlaceOrderContext = () => {
  const placeOrderContext = useContext(PlaceOrderContext);
  return placeOrderContext;
};

export default usePlaceOrderContext;
