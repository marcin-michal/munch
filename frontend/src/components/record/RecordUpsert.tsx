import {
  ActionGroup,
  Button,
  Content,
  debounce,
  Flex,
  FormGroup,
  SearchInput,
  TextInput,
} from "@patternfly/react-core";
import { useState } from "react";
import { Form } from "react-router-dom";
import { GetMealsByName } from "../../../wailsjs/go/repository/MealRepository";
import { models } from "../../../wailsjs/go/models";
import { useForm } from "react-hook-form";
import { RecordForm } from "../../schemas/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { recordFormSchema } from "../../schemas/recordValidationSchema";
import { ItemTitle } from "../generic/ItemTitle";
import { MinusCircleIcon, PlusCircleIcon } from "@patternfly/react-icons";
import { ItemWithButton } from "../generic/ItemWithButton";

interface ComponentUpsertProps {
  setRecords: React.Dispatch<React.SetStateAction<models.RecordDTO[]>>;
}

export const RecordUpsert = ({ setRecords }: ComponentUpsertProps) => {
  const [selected, setSelected] = useState<models.MealDTO>();
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<models.MealDTO[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RecordForm>({
    resolver: zodResolver(recordFormSchema),
  });

  const onSearchChange = debounce(async (value: string) => {
    setSelected(undefined);
    setError(null);
    if (value === "") {
      setOptions([]);
      return;
    }

    try {
      const res = await GetMealsByName(value);
      setOptions(res);
    } catch (e) {
      setError("Error loading meals");
    }
  }, 400);

  const onSubmit = (data: RecordForm) => {
    let newRecord = new models.RecordDTO();

    if (selected === undefined) {
      return;
    }

    const selectedMeal = selected as models.MealDTO;

    newRecord.meal = selectedMeal;
    newRecord.weight = data.weight;

    setRecords((records) => [newRecord, ...records]);
    setSelected(undefined);
    setValue("weight", 0);
  };

  const onSelect = (meal: models.MealDTO) => {
    setOptions([]);
    setValue("mealId", meal.id);
    setSelected(meal);
  };

  const onDeselect = () => {
    setValue("mealId", "");
    setSelected(undefined);
    setOptions([]);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Content>{error}</Content>}
      <FormGroup label="Component" isRequired fieldId="component">
        <SearchInput
          placeholder="Filter by meal name"
          onChange={(_event, value) => onSearchChange(value)}
          onClear={() => onSearchChange("")}
        />
        {selected !== undefined ? (
          <>
            <Flex
              key={selected.id}
              style={{ width: "100%", padding: "0.2rem 1rem" }}
              justifyContent={{ default: "justifyContentSpaceBetween" }}
            >
              <ItemWithButton
                title={selected.name}
                info={`${selected.nutritions.Calories} kcal`}
                buttonFun={onDeselect}
                buttonType="control"
                icon={<MinusCircleIcon />}
              />
            </Flex>

            <FormGroup label="Weight" isRequired fieldId="weight">
              <TextInput
                isRequired
                type="number"
                id="weight"
                validated={errors.weight ? "error" : "default"}
                {...register("weight", { required: true })}
              />
            </FormGroup>
            <ActionGroup>
              <Button
                type="submit"
                variant="primary"
                style={{ marginTop: "2rem" }}
              >
                Add
              </Button>
            </ActionGroup>
          </>
        ) : (
          options.map((meal) => (
            <Flex
              key={meal.id}
              style={{
                width: "100%",
                padding: "0.2rem 1rem",
                maxHeight: "50px",
              }}
              justifyContent={{ default: "justifyContentSpaceBetween" }}
            >
              <ItemTitle
                title={meal.name}
                info={`${meal.nutritions.Calories} kcal`}
              />
              <Button
                variant="control"
                icon={<PlusCircleIcon />}
                onClick={() => onSelect(meal)}
              />
            </Flex>
          ))
        )}
      </FormGroup>
    </Form>
  );
};
