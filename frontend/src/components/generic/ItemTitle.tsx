import { Content, ContentVariants, Flex } from "@patternfly/react-core";

interface ItemTitleProps {
  title: string;
  info: string;
}

export const ItemTitle = ({ title, info }: ItemTitleProps) => {
  return (
    <Flex
      direction={{ default: "row" }}
      justifyContent={{ default: "justifyContentSpaceBetween" }}
      style={{ width: "90%" }}
    >
      <Content component={ContentVariants.h3}>{title}</Content>
      <Content component={ContentVariants.p}>{info}</Content>
    </Flex>
  );
};
