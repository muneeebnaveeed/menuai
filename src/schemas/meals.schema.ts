export interface IMealWithoutPrice {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface IMeal extends IMealWithoutPrice {
  price: number;
}
