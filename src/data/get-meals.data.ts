import { useQuery } from "@tanstack/react-query";
import { IMeal, IMealWithoutPrice } from "../schemas/meals.schema";
import mealApi from "../services/meal-api";
import QueryKeys from "../constants/query-keys";
import Paginator, { PaginationControls } from "../services/paginator";
import { faker } from "@faker-js/faker";
import sleep from "../utils/sleep";
import mockedMeals from "../services/mock-clients/meals.mock-client";

export enum MealCategories {
  PASTA = "Pasta",
  BEEF = "Beef",
  SEAFOOD = "Chicken",
  DESSERT = "Dessert",
  SIDE = "Side",
  STARTER = "Starter",
  VEGETARIAN = "Vegetarian",
}

export interface FetchMealsByCategoryQueryVariables {
  category: MealCategories;
  controls: PaginationControls;
}

export const fetchMealsByCategory = async (payload: FetchMealsByCategoryQueryVariables) => {
  const result = await mealApi.get<{ meals: IMealWithoutPrice[] }>("/filter.php", { params: { c: payload.category } });

  await sleep(2000);

  const pageCount = Paginator.getPageCount(result.data.meals.length, payload.controls.limit);

  const paginatedMealsWithoutPrice = Paginator.paginate(result.data.meals, payload.controls);

  const paginatedMeals: IMeal[] = [];

  paginatedMealsWithoutPrice.forEach((e) => {
    const restrictedTitle = e.strMeal.split(" ").slice(0, 3).join(" ");
    const randomPrice = Number(faker.commerce.price());
    const meal: IMeal = { ...e, strMeal: restrictedTitle, price: randomPrice };
    paginatedMeals.push(meal);
  });

  return { docs: paginatedMeals, pageCount };
};

const getPlaceholderData = (limit: number) => {
  const $ = mockedMeals.slice(0, limit);

  return {
    docs: $,
    pageCount: Paginator.getPageCount($.length, limit),
  };
};

export const useMealsByCategory = (payload: FetchMealsByCategoryQueryVariables) => {
  return useQuery([QueryKeys.MEALS_BY_CATEGORY, payload], () => fetchMealsByCategory(payload), {
    placeholderData: getPlaceholderData(payload.controls.limit),
  });
};
