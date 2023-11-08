import { IMeal } from "../../schemas/meals.schema";
import { faker } from "@faker-js/faker";
import cuid from "cuid";

const mockMeals = (count: number) => {
  const meals = [];
  for (let i = 0; i < count; i++) {
    const meal: IMeal = {
      idMeal: cuid(),
      strMeal: faker.lorem.words(4),
      strMealThumb: faker.internet.avatar(),
      price: Number(faker.commerce.price()),
    };
    meals.push(meal);
  }
  return meals;
};

const mockedMeals = mockMeals(10);

export default mockedMeals;
