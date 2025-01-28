import { z } from "zod";

export const mealFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(128, "Name must be less than 128 characters"),
  description: z
    .string()
    .max(512, "Description must be less than 512 characters"),
  calories: z.coerce
    .number()
    .int()
    .min(0, "Calories must be a positive number"),
  protein: z.coerce.number().min(0, "Protein must be a positive number"),
  carbs: z.coerce.number().min(0, "Carbs must be a positive number"),
  fat: z.coerce.number().min(0, "Fat must be a positive number"),
  fiber: z.coerce.number().min(0, "Fiber must be a positive number"),
  sugar: z.coerce.number().min(0, "Sugar must be a positive number"),
  salt: z.coerce.number().min(0, "Salt must be a positive number"),
  vitaminA: z.coerce.number().min(0, "Vitamin A must be a positive number"),
  vitaminB: z.coerce.number().min(0, "Vitamin B must be a positive number"),
  vitaminC: z.coerce.number().min(0, "Vitamin C must be a positive number"),
  vitaminD: z.coerce.number().min(0, "Vitamin D must be a positive number"),
  vitaminE: z.coerce.number().min(0, "Vitamin E must be a positive number"),
  vitaminK: z.coerce.number().min(0, "Vitamin K must be a positive number"),
  calcium: z.coerce.number().min(0, "Calcium must be a positive number"),
  iron: z.coerce.number().min(0, "Iron must be a positive number"),
  potassium: z.coerce.number().min(0, "Potassium must be a positive number"),
  magnesium: z.coerce.number().min(0, "Magnesium must be a positive number"),
  zinc: z.coerce.number().min(0, "Zinc must be a positive number"),
  components: z.array(z.string()),
});
