package models

import (
	"github.com/google/uuid"
	"gorm.io/datatypes"
)

func ConvertMealToDTO(meal Meal) MealDTO {
	components := make([]RecordDTO, len(meal.Components))
	for i, component := range meal.Components {
		components[i] = ConvertRecordToDTO(component)
	}

	return MealDTO{
		ID:           meal.Id.String(),
		Name:         meal.Name,
		Description:  meal.Description,
		ShowInSearch: meal.ShowInSearch,
		Components:   components,
		Nutritions:   meal.Nutritions,
	}
}

func ConvertRecordToDTO(record Record) RecordDTO {
	var date string
	if record.DailyDietDate != nil {
		date = *record.DailyDietDate
	}

	return RecordDTO{
		ID:            record.Id.String(),
		Meal:          ConvertMealToDTO(record.Meal),
		Weight:        record.Weight,
		DailyDietDate: date,
	}
}

func ConvertDTOToMeal(mealDTO MealDTO) (Meal, error) {
	components := make([]Record, len(mealDTO.Components))
	for i, component := range mealDTO.Components {
		record, err := ConvertDTOToRecord(component)
		if err != nil {
			return Meal{}, err
		}

		components[i] = record
	}

	meal := Meal{
		Name:         mealDTO.Name,
		Description:  mealDTO.Description,
		ShowInSearch: mealDTO.ShowInSearch,
		Components:   components,
		Nutritions:   mealDTO.Nutritions,
	}

	if mealDTO.ID == "" {
		return meal, nil
	}

	parsedId, err := uuid.Parse(mealDTO.ID)
	if err != nil {
		return Meal{}, err
	}

	meal.Id = datatypes.UUID(parsedId)

	return meal, nil
}

func ConvertDTOToRecord(recordDTO RecordDTO) (Record, error) {
	var date *string
	if recordDTO.DailyDietDate != "" {
		date = &recordDTO.DailyDietDate
	}

	meal, err := ConvertDTOToMeal(recordDTO.Meal)
	if err != nil {
		return Record{}, err
	}

	record := Record{
		Meal:          meal,
		Weight:        recordDTO.Weight,
		DailyDietDate: date,
	}

	if recordDTO.ID == "" {
		return record, nil
	}

	parsedId, err := uuid.Parse(recordDTO.ID)
	if err != nil {
		return Record{}, err
	}

	record.Id = datatypes.UUID(parsedId)

	return record, nil
}

func ConvertDailyDietToDTO(dailyDiet DailyDiet) DailyDietDTO {
	records := make([]RecordDTO, len(dailyDiet.Records))
	for i, record := range dailyDiet.Records {
		records[i] = ConvertRecordToDTO(record)
	}

	return DailyDietDTO{
		Date:    dailyDiet.Date,
		Records: records,
	}
}

func ConvertDTOtoDailyDiet(dailyDietDTO DailyDietDTO) (DailyDiet, error) {
	records := make([]Record, len(dailyDietDTO.Records))
	for i, record := range dailyDietDTO.Records {
		res, err := ConvertDTOToRecord(record)
		if err != nil {
			return DailyDiet{}, err
		}

		records[i] = res
	}

	return DailyDiet{
		Date:    dailyDietDTO.Date,
		Records: records,
	}, nil
}
