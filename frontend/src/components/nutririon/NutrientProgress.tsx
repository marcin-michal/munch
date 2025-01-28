import { Content, ContentVariants, Flex } from "@patternfly/react-core";

interface NutrientProgressProps {
  label?: string;
  value: number;
  goal: number;
  unit: string;
}

export const NutrientProgress = ({
  label,
  value,
  goal,
  unit,
}: NutrientProgressProps) => {
  return (
    <Flex
      direction={{ default: "row" }}
      justifyContent={{ default: "justifyContentSpaceBetween" }}
    >
      {label && <Content component={ContentVariants.h6}>{label}:</Content>}
      <Flex
        direction={{ default: "row" }}
        justifyContent={{ default: "justifyContentFlexEnd" }}
      >
        <Content component={ContentVariants.h2}>
          {Math.round(((value + Number.EPSILON) * 100) / 100)} {unit}
        </Content>
        <Content component={ContentVariants.p}>
          / {goal} {unit}
        </Content>
        <Content component={ContentVariants.p}>
          {Math.round((value / goal) * 100)}%
        </Content>
      </Flex>
    </Flex>
  );
};
