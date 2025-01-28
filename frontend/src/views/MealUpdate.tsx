import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetMeal,
  UpdateMeal,
} from "../../wailsjs/go/repository/MealRepository";
import { models } from "../../wailsjs/go/models";
import { MealUpsert } from "../components/meal/MealUpsert";
import { Bullseye, Content, Spinner } from "@patternfly/react-core";

export const MealUpdate = () => {
  const params = useParams<{ mealId: string }>();
  const [meal, setMeal] = useState<models.MealDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      try {
        const meal = await GetMeal(params.mealId || "");
        setMeal(meal);
      } catch (e) {
        setError("Error loading meal");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, []);

  if (loading) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (error) {
    return <Content component="p">{error}</Content>;
  }

  return (
    <MealUpsert
      title="Update meal"
      meal={meal ?? undefined}
      saveMeal={UpdateMeal}
    />
  );
};
