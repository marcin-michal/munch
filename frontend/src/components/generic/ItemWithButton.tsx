import { Button, ButtonType, Flex } from "@patternfly/react-core";
import { ItemTitle } from "./ItemTitle";

interface ItemProps {
  title: string;
  info: string;
  buttonFun: () => void;
  icon: React.ReactNode;
  buttonLabel?: string;
  buttonType?: "primary" | "secondary" | "control";
}

export const ItemWithButton = ({
  title,
  info,
  buttonFun,
  icon,
  buttonLabel,
  buttonType,
}: ItemProps) => {
  return (
    <Flex direction={{ default: "row" }} style={{ width: "100%" }}>
      <ItemTitle title={title} info={info} />

      <Button onClick={buttonFun} icon={icon} variant={buttonType}>
        {buttonLabel ?? ""}
      </Button>
    </Flex>
  );
};
