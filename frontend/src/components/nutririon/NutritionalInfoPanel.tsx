import { Card, CardBody, CardTitle, Flex } from "@patternfly/react-core";
import { models } from "../../../wailsjs/go/models";
import { NutrientProgress } from "./NutrientProgress";

interface NutritionalInfoPanelProps {
  nutrients?: models.NutritionalInfo;
}

export const NutritionalInfoPanel = ({
  nutrients,
}: NutritionalInfoPanelProps) => {
  return (
    <Flex direction={{ default: "column" }}>
      <Card>
        <CardTitle>Calories</CardTitle>
        <CardBody>
          <NutrientProgress
            value={nutrients?.Calories || 0}
            goal={2500}
            unit="kcal"
          />
        </CardBody>
      </Card>
      <Card>
        <CardTitle>Macronutrients</CardTitle>
        <CardBody>
          <NutrientProgress
            label="Carbs"
            value={nutrients?.Carbs || 0}
            goal={150}
            unit="g"
          />
          <NutrientProgress
            label="Fat"
            value={nutrients?.Fat || 0}
            goal={75}
            unit="g"
          />
          <NutrientProgress
            label="Protein"
            value={nutrients?.Protein || 0}
            goal={150}
            unit="g"
          />
          <NutrientProgress
            label="Fiber"
            value={nutrients?.Fiber || 0}
            goal={30}
            unit="g"
          />
          <NutrientProgress
            label="Sugar"
            value={nutrients?.Sugar || 0}
            goal={75}
            unit="g"
          />
          <NutrientProgress
            label="Salt"
            value={nutrients?.Salt || 0}
            goal={6}
            unit="g"
          />
        </CardBody>
      </Card>
      <Card>
        <CardTitle>Micronutrients</CardTitle>
        <CardBody>
          <NutrientProgress
            label="Vitamin A"
            value={nutrients?.VitaminA || 0}
            goal={150}
            unit="mcg"
          />
          <NutrientProgress
            label="Vitamin B"
            value={nutrients?.VitaminB || 0}
            goal={150}
            unit="UI"
          />
          <NutrientProgress
            label="Vitamin C"
            value={nutrients?.VitaminC || 0}
            goal={150}
            unit="mcg"
          />
          <NutrientProgress
            label="Vitamin D"
            value={nutrients?.VitaminD || 0}
            goal={150}
            unit="mcg"
          />
          <NutrientProgress
            label="Vitamin E"
            value={nutrients?.VitaminE || 0}
            goal={150}
            unit="mcg"
          />
          <NutrientProgress
            label="Vitamin K"
            value={nutrients?.VitaminK || 0}
            goal={150}
            unit="mcg"
          />
          <NutrientProgress
            label="Calcium"
            value={nutrients?.Calcium || 0}
            goal={150}
            unit="mg"
          />
          <NutrientProgress
            label="Iron"
            value={nutrients?.Iron || 0}
            goal={150}
            unit="mg"
          />
          <NutrientProgress
            label="Potassium"
            value={nutrients?.Potassium || 0}
            goal={150}
            unit="mg"
          />
          <NutrientProgress
            label="Magnesium"
            value={nutrients?.Magnesium || 0}
            goal={150}
            unit="mg"
          />
          <NutrientProgress label="Zinc" value={100} goal={150} unit="mg" />
        </CardBody>
      </Card>
    </Flex>
  );
};
