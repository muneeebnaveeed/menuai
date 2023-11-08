import { IMeal } from "../../../schemas/meals.schema";

export interface ICartProduct extends IMeal {
  quantity: number;
  subtotal: number;
}

export interface ICart {
  products: ICartProduct[];
}
