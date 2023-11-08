import { MealCategories, useMealsByCategory } from "../../../data/get-meals.data";
import MealCard from "./meal-card";
import PaginationButton from "./pagination-button";
import { Tabs, TabsList, TabsTrigger } from "../../../components/atomic/tabs";
import usePlaceOrderContext from "../context";

const Menu = () => {
  const { currentPage, setCurrentPage, currentLimit, currentCategory, setCurrentCategory } = usePlaceOrderContext();

  const mealsByCategoryQuery = useMealsByCategory({
    category: currentCategory,
    controls: { page: currentPage, limit: currentLimit },
  });

  return (
    <div className="bg-gray-50 w-full h-full overflow-hidden">
      <div className="flex flex-col  p-12 h-full gap-8">
        <div className="mb">
          <h2 className="text-independant-grey-active text-5xl font-bold">Menu</h2>
        </div>
        <Tabs value={currentCategory} onValueChange={(value) => setCurrentCategory(value as MealCategories)}>
          <TabsList>
            {Object.values(MealCategories).map((e) => (
              <TabsTrigger key={e} value={e}>
                {e}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex-1">
          <div className="flex flex-wrap gap-6">
            {mealsByCategoryQuery.data?.docs.map((e) => (
              <MealCard key={e.idMeal} data={e} isLoading={mealsByCategoryQuery.isPlaceholderData} />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <PaginationButton
            type="previous"
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
            disabled={mealsByCategoryQuery.isPlaceholderData || currentPage <= 1}
          />
          <h2 className="text-4xl text-independant-grey-active font-medium">
            {!mealsByCategoryQuery.isPlaceholderData && `Page ${currentPage}/${mealsByCategoryQuery.data?.pageCount}`}
          </h2>
          <PaginationButton
            type="next"
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            disabled={
              mealsByCategoryQuery.isPlaceholderData || currentPage >= (mealsByCategoryQuery.data?.pageCount || 0)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
