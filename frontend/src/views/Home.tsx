import {
  Bullseye,
  Button,
  Content,
  ContentVariants,
  Flex,
  Label,
  Page,
  PageSection,
  Spinner,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";
import AngleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-left-icon";
import { RecordList } from "../components/record/RecordList";
import {
  DeleteRecord,
  GetDailyDiet,
  GetDailyNutritionalInfo,
  UpsertDailyDiet,
} from "../../wailsjs/go/repository/TrackingRepository";
import { NutritionalInfoPanel } from "../components/nutririon/NutritionalInfoPanel";
import { models } from "../../wailsjs/go/models";
import { useEffect, useState } from "react";
import { dateToString } from "../utils";
import { PlusCircleIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dailyDiet, setDailyDiet] = useState<models.DailyDietDTO>();
  const [nutrients, setNutrients] = useState<models.NutritionalInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDailyDiet() {
      try {
        const dietRes = await GetDailyDiet(dateToString(date));
        if (dietRes.date === "") {
          dietRes.date = dateToString(date);
          dietRes.records = [];
        }
        setDailyDiet(dietRes);
        const nutRes = await GetDailyNutritionalInfo(dietRes);
        setNutrients(nutRes);
      } catch (err) {
        setError("Error getting daily info");
      } finally {
        setLoading(false);
      }
    }

    fetchDailyDiet();
  }, [date, update]);

  const prevDate = () => {
    handleDateChange(-1);
  };

  const nextDate = () => {
    handleDateChange(1);
  };

  const handleDateChange = (dir: number) => {
    setDate(new Date(date.getTime() + dir * (24 * 60 * 60 * 1000)));
  };

  const handleRecordDelete = async (record: models.RecordDTO) => {
    if (dailyDiet === undefined) {
      return;
    }

    let newDailyDiet = dailyDiet;
    newDailyDiet.records = newDailyDiet.records.filter(
      (r) => r.id !== record.id
    );
    try {
      await DeleteRecord(record.id);
      setUpdate(update + 1);
    } catch (err) {
      setError("Error deleting record");
    }
  };

  if (loading) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (error) {
    return (
      <Bullseye>
        <Content component={ContentVariants.h1}>{error}</Content>
      </Bullseye>
    );
  }

  return (
    <Page isContentFilled>
      <PageSection isFilled>
        <Split hasGutter>
          <SplitItem>
            <Flex
              justifyContent={{ default: "justifyContentSpaceBetween" }}
              alignItems={{ default: "alignItemsCenter" }}
            >
              <Button
                variant="plain"
                icon={<AngleLeftIcon />}
                onClick={prevDate}
              />
              <Label>{dateToString(date)}</Label>
              <Button
                variant="plain"
                icon={<AngleRightIcon />}
                onClick={nextDate}
              />
            </Flex>
            <NutritionalInfoPanel nutrients={nutrients} />
          </SplitItem>

          <SplitItem isFilled>
            <Flex
              alignItems={{ default: "alignItemsCenter" }}
              direction={{ default: "column" }}
            >
              <RecordList
                items={dailyDiet?.records || []}
                handleDelete={handleRecordDelete}
              />
              <Button
                variant="primary"
                icon={<PlusCircleIcon />}
                style={{ alignSelf: "center" }}
                onClick={() =>
                  navigate(`/daily-diets/${dateToString(date)}/upsert`)
                }
              >
                Track
              </Button>
            </Flex>
          </SplitItem>
        </Split>
      </PageSection>
    </Page>
  );
};
