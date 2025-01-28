import { useForm } from "react-hook-form";
import { models } from "../../../wailsjs/go/models";
import { MealForm } from "../../schemas/models";
import { mealFormSchema } from "../../schemas/mealValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";
import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  Checkbox,
  Content,
  Flex,
  Form,
  FormGroup,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalHeader,
  Page,
  Spinner,
  Tab,
  Tabs,
  TextArea,
  TextInput,
} from "@patternfly/react-core";
import { useState } from "react";
import { RecordUpsert } from "../record/RecordUpsert";
import { useNavigate } from "react-router-dom";
import { ItemTitle } from "../generic/ItemTitle";
import { ItemWithButton } from "../generic/ItemWithButton";
import { MinusCircleIcon } from "@patternfly/react-icons";

interface MealUpsertProps {
  meal?: models.MealDTO;
  title: string;
  saveMeal: (meal: models.MealDTO) => Promise<models.MealDTO>;
}

export const MealUpsert = ({ meal, title, saveMeal }: MealUpsertProps) => {
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setComponents] = useState<models.RecordDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setChecked] = useState(meal?.showInSearch || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealForm>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: meal?.name,
      description: meal?.description,
      calories: meal?.nutritions.Calories || 0,
      protein: meal?.nutritions.Protein || 0,
      carbs: meal?.nutritions.Carbs || 0,
      fat: meal?.nutritions.Fat || 0,
      sugar: meal?.nutritions.Sugar || 0,
      fiber: meal?.nutritions.Fiber || 0,
      salt: meal?.nutritions.Salt || 0,
      vitaminA: meal?.nutritions.VitaminA || 0,
      vitaminB: meal?.nutritions.VitaminB || 0,
      vitaminC: meal?.nutritions.VitaminC || 0,
      vitaminD: meal?.nutritions.VitaminD || 0,
      vitaminE: meal?.nutritions.VitaminE || 0,
      vitaminK: meal?.nutritions.VitaminK || 0,
      calcium: meal?.nutritions.Calcium || 0,
      iron: meal?.nutritions.Iron || 0,
      potassium: meal?.nutritions.Potassium || 0,
      magnesium: meal?.nutritions.Magnesium || 0,
      zinc: meal?.nutritions.Zinc || 0,
      components: meal?.components.map((comp) => comp.id) || [],
    },
  });

  const onSubmit = async (data: MealForm) => {
    let nutrition = new models.NutritionalInfo();
    nutrition.Calories = data.calories;
    nutrition.Protein = data.protein;
    nutrition.Carbs = data.carbs;
    nutrition.Fat = data.fat;
    nutrition.Sugar = data.sugar;
    nutrition.Fiber = data.fiber;
    nutrition.Salt = data.salt;
    nutrition.VitaminA = data.vitaminA;
    nutrition.VitaminB = data.vitaminB;
    nutrition.VitaminC = data.vitaminC;
    nutrition.VitaminD = data.vitaminD;
    nutrition.VitaminE = data.vitaminE;
    nutrition.VitaminK = data.vitaminK;
    nutrition.Calcium = data.calcium;
    nutrition.Iron = data.iron;
    nutrition.Potassium = data.potassium;
    nutrition.Magnesium = data.magnesium;
    nutrition.Zinc = data.zinc;

    let newMeal = new models.MealDTO();
    newMeal.name = data.name;
    newMeal.description = data.description;
    newMeal.nutritions = nutrition;
    newMeal.components = components;
    newMeal.showInSearch = isChecked;

    try {
      setLoading(true);
      await saveMeal(newMeal);

      navigate("/");
    } catch (e) {
      setError("Error saving meal");
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex as number);
  };

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter((c) => c.meal.id !== id));
  };

  return (
    <Page>
      {error && <Content component="p">{error}</Content>}
      <Content component="h1" style={{ padding: "1.5rem 1rem 0 1rem" }}>
        {title}
      </Content>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ padding: "1rem" }}>
        <FormGroup label="Name" isRequired fieldId="name">
          <TextInput
            isRequired
            id="name"
            type="text"
            validated={errors.name ? "error" : "default"}
            placeholder="Enter meal name"
            {...register("name")}
          />
        </FormGroup>
        <FormGroup label="Description" fieldId="description">
          <TextArea
            id="description"
            validated={errors.name ? "error" : "default"}
            placeholder="Enter meal description"
            {...register("description")}
          />
        </FormGroup>

        <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
          <Tab eventKey={0} title="Components">
            <Flex direction={{ default: "column" }}>
              {components.map((comp, i) => (
                <div key={`comp-${i}`}>
                  <ItemWithButton
                    title={comp.meal.name}
                    info={`${comp.meal.nutritions.Calories} kcal | ${comp.weight} g`}
                    buttonFun={() => {
                      handleDeleteComponent(comp.meal.id);
                    }}
                    icon={<MinusCircleIcon />}
                    buttonType="control"
                  />
                </div>
              ))}
              <Button
                onClick={handleModalToggle}
                icon={<PlusCircleIcon />}
                variant="secondary"
              >
                Add component
              </Button>
            </Flex>
          </Tab>
          <Tab eventKey={1} title="Nutrients">
            <Flex direction={{ default: "column" }}>
              <Card>
                <CardTitle>Macronutrients</CardTitle>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem span={4}>
                      <FormGroup label="Calories" fieldId="calories" isRequired>
                        <TextInput
                          isRequired
                          id="calories"
                          type="number"
                          validated={errors.calories ? "error" : "default"}
                          placeholder="Enter calories"
                          {...register("calories")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                      <FormGroup label="Protein" fieldId="protein" isRequired>
                        <TextInput
                          isRequired
                          id="protein"
                          type="number"
                          validated={errors.protein ? "error" : "default"}
                          placeholder="Enter protein"
                          {...register("protein")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                      <FormGroup label="Carbs" fieldId="carbs" isRequired>
                        <TextInput
                          isRequired
                          id="carbs"
                          type="number"
                          validated={errors.carbs ? "error" : "default"}
                          placeholder="Enter carbs"
                          {...register("carbs")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                      <FormGroup label="Fat" fieldId="fat" isRequired>
                        <TextInput
                          isRequired
                          id="fat"
                          type="number"
                          validated={errors.fat ? "error" : "default"}
                          placeholder="Enter fat"
                          {...register("fat")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                      <FormGroup label="Sugar" fieldId="sugar" isRequired>
                        <TextInput
                          isRequired
                          id="sugar"
                          type="number"
                          validated={errors.sugar ? "error" : "default"}
                          placeholder="Enter sugar"
                          {...register("sugar")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                      <FormGroup label="Fiber" fieldId="fiber">
                        <TextInput
                          id="fiber"
                          type="number"
                          validated={errors.fiber ? "error" : "default"}
                          placeholder="Enter fiber"
                          {...register("fiber")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={4}>
                      <FormGroup label="Salt" fieldId="salt" isRequired>
                        <TextInput
                          isRequired
                          id="salt"
                          type="number"
                          validated={errors.salt ? "error" : "default"}
                          placeholder="Enter salt"
                          {...register("salt")}
                        />
                      </FormGroup>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
              <Card>
                <CardTitle>Micronutrients</CardTitle>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem span={3}>
                      <FormGroup
                        label="Vitamin A"
                        fieldId="vitaminA"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="vitaminA"
                          type="number"
                          validated={errors.vitaminA ? "error" : "default"}
                          placeholder="Enter Vitamin A"
                          {...register("vitaminA")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup
                        label="Vitamin B"
                        fieldId="vitaminB"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="vitaminB"
                          type="number"
                          validated={errors.vitaminB ? "error" : "default"}
                          placeholder="Enter Vitamin B"
                          {...register("vitaminB")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup
                        label="Vitamin C"
                        fieldId="vitaminC"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="vitaminC"
                          type="number"
                          validated={errors.vitaminC ? "error" : "default"}
                          placeholder="Enter Vitamin C"
                          {...register("vitaminC")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup
                        label="Vitamin D"
                        fieldId="vitaminD"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="vitaminD"
                          type="number"
                          validated={errors.vitaminD ? "error" : "default"}
                          placeholder="Enter Vitamin D"
                          {...register("vitaminD")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup
                        label="Vitamin E"
                        fieldId="vitaminE"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="vitaminE"
                          type="number"
                          validated={
                            errors.vitaminE !== undefined ? "error" : "default"
                          }
                          placeholder="Enter Vitamin E"
                          {...register("vitaminE")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup label="Vitamin K" fieldId="vitaminK">
                        <TextInput
                          id="vitaminK"
                          type="number"
                          validated={
                            errors.vitaminK !== undefined ? "error" : "default"
                          }
                          placeholder="Enter Vitamin K"
                          {...register("vitaminK")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup label="Calcium" fieldId="calcium" isRequired>
                        <TextInput
                          isRequired
                          id="calcium"
                          type="number"
                          validated={errors.calcium ? "error" : "default"}
                          placeholder="Enter calcium"
                          {...register("calcium")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup label="Iron" fieldId="iron" isRequired>
                        <TextInput
                          isRequired
                          id="iron"
                          type="number"
                          validated={errors.iron ? "error" : "default"}
                          placeholder="Enter iron"
                          {...register("iron")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup
                        label="Potassium"
                        fieldId="potassium"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="potassium"
                          type="number"
                          validated={errors.potassium ? "error" : "default"}
                          placeholder="Enter potassium"
                          {...register("potassium")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup
                        label="Magnesium"
                        fieldId="magnesium"
                        isRequired
                      >
                        <TextInput
                          isRequired
                          id="magnesium"
                          type="number"
                          validated={errors.magnesium ? "error" : "default"}
                          placeholder="Enter magnesium"
                          {...register("magnesium")}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={3}>
                      <FormGroup label="Zinc" fieldId="zinc" isRequired>
                        <TextInput
                          isRequired
                          id="zinc"
                          type="number"
                          validated={errors.zinc ? "error" : "default"}
                          placeholder="Enter zinc"
                          {...register("zinc")}
                        />
                      </FormGroup>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </Flex>
          </Tab>
        </Tabs>

        <FormGroup>
          <Checkbox
            label="Show when searching database"
            id="showInSearch"
            isChecked={isChecked}
            onChange={() => setChecked(!isChecked)}
          />
        </FormGroup>

        <ActionGroup>
          <Button variant="primary" type="submit">
            Save
          </Button>
          {loading && <Spinner size="lg" style={{ alignSelf: "center" }} />}
        </ActionGroup>
      </Form>

      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <ModalHeader title="Choose meal component" />
        <ModalBody>
          <RecordUpsert setRecords={setComponents} />
        </ModalBody>
      </Modal>
    </Page>
  );
};
