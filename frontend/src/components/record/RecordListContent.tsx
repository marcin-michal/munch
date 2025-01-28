import { Flex } from "@patternfly/react-core";
import { models } from "../../../wailsjs/go/models";
import { ItemTitle } from "../generic/ItemTitle";

interface ItemListContentProps {
  records: models.RecordDTO[];
}

export const RecordListContent = ({ records }: ItemListContentProps) => {
  return (
    <Flex direction={{ default: "column" }}>
      {records.map((record) => (
        <div key={record.id}>
          <ItemTitle
            title={record.meal.name}
            info={`${record.meal.nutritions.Calories} | ${record.weight}`}
          />
        </div>
      ))}
    </Flex>
  );
};
