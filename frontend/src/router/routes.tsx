import { RouteObject } from "react-router-dom";
import { Home } from "../views/Home";
import { MealCreate } from "../views/MealCreate";
import { MealUpdate } from "../views/MealUpdate";
import { MenuLayout } from "../layouts/MenuLayout";
import { DailyDietUpsert } from "../views/DailyDietUpsert";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MenuLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/meals/create",
        element: <MealCreate />,
      },
      {
        path: "/meals/:mealId/update",
        element: <MealUpdate />,
      },
      {
        path: "/daily-diets/:date/upsert",
        element: <DailyDietUpsert />,
      },
    ],
  },
];
