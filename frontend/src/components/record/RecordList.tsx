import { useState } from "react";
import { models } from "../../../wailsjs/go/models";
import { TrashIcon } from "@patternfly/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  Button,
  Content,
} from "@patternfly/react-core";
import { ItemTitle } from "../generic/ItemTitle";

interface RecordListProps {
  items: models.RecordDTO[];
  handleDelete: (item: models.RecordDTO) => void;
}

export const RecordList = ({ items, handleDelete }: RecordListProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (id: string) => {
    const index = expanded.indexOf(id);
    const newExpanded: string[] =
      index >= 0
        ? [
            ...expanded.slice(0, index),
            ...expanded.slice(index + 1, expanded.length),
          ]
        : [...expanded, id];
    setExpanded(newExpanded);
  };

  return (
    <Accordion asDefinitionList={false} style={{ width: "100%" }}>
      {items.map((item) => {
        const itemInfo = `${
          (item.meal.nutritions.Calories * item.weight) / 100
        } kcal | ${item.weight}g`;

        return (
          <AccordionItem isExpanded={expanded.includes(item.id)} key={item.id}>
            <AccordionToggle id={item.id} onClick={() => toggle(item.id)}>
              <ItemTitle title={item.meal.name} info={itemInfo} />
            </AccordionToggle>
            <AccordionContent>
              <div key={item.id}>
                <Content component="p">{item.meal.description}</Content>
                <Button
                  variant="danger"
                  icon={<TrashIcon />}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
