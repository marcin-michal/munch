import { z } from "zod";
import { mealFormSchema } from "./mealValidationSchema";
import { recordFormSchema } from "./recordValidationSchema";

export type MealForm = z.infer<typeof mealFormSchema>;
export type RecordForm = z.infer<typeof recordFormSchema>;
