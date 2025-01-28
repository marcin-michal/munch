import { z } from "zod";

export const recordFormSchema = z.object({
  mealId: z.string().min(1, "Meal is required"),
  weight: z.coerce.number().min(0.1, "Weight must be a positive number"),
});
