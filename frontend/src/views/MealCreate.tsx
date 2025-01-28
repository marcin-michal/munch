import { CreateMeal } from "../../wailsjs/go/repository/MealRepository";
import { MealUpsert } from "../components/meal/MealUpsert";

export const MealCreate = () => {
  return <MealUpsert title="Add meal" saveMeal={CreateMeal} />;
};
