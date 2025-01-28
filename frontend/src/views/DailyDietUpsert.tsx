import { useParams } from "react-router-dom";
import { models } from "../../wailsjs/go/models";
import {
  GetDailyDiet,
  UpsertDailyDiet,
} from "../../wailsjs/go/repository/TrackingRepository";
import { useState } from "react";
import { MealUpsert } from "../components/meal/MealUpsert";
import { CreateMeal } from "../../wailsjs/go/repository/MealRepository";

export const DailyDietUpsert = () => {
  const params = useParams<{ date: string }>();
  const [error, setError] = useState<string | null>(null);

  const handleRecord = async (meal: models.MealDTO) => {
    const weight = meal.components.reduce((acc, curr) => acc + curr.weight, 0);

    try {
      const newMeal = await CreateMeal(meal);
      let dailyDiet = await GetDailyDiet(params.date || "");
      let newRecord = new models.RecordDTO();

      newRecord.meal = newMeal;
      newRecord.weight = weight;

      dailyDiet.date = params.date || "";
      if (!Array.isArray(dailyDiet.records)) {
        dailyDiet.records = [];
      }
      dailyDiet.records.push(newRecord);

      await UpsertDailyDiet(dailyDiet);
    } catch (e) {
      console.error(e);
      setError("Error saving daily diet");
    }

    return Promise.resolve(meal);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <MealUpsert title="Add meal" saveMeal={handleRecord} />
    </>
  );
};
