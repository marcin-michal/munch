package repository

import (
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/marcin-michal/munch/backend/database"
	"github.com/marcin-michal/munch/backend/models"
	"gorm.io/gorm"
)

func (tr *TrackingRepository) GetDailyDiet(date string) (models.DailyDietDTO, error) {
	_, err := time.Parse("2006-01-02", date)
	if err != nil {
		return models.DailyDietDTO{}, err
	}

	var dailyDiet models.DailyDiet

	res := database.DB.Preload("Records.Meal").Where("date = ?", date).First(&dailyDiet)
	if res.Error == gorm.ErrRecordNotFound {
		return models.DailyDietDTO{}, nil
	}

	return models.ConvertDailyDietToDTO(dailyDiet), res.Error
}

func (tr *TrackingRepository) UpsertDailyDiet(dailyDietDTO models.DailyDietDTO) (models.DailyDietDTO, error) {
	fmt.Println("dailyDietDTO: ", dailyDietDTO)
	valid, err := isValidDate(dailyDietDTO.Date)
	if !valid {
		return models.DailyDietDTO{}, err
	}

	dailyDiet, err := models.ConvertDTOtoDailyDiet(dailyDietDTO)
	if err != nil {
		return models.DailyDietDTO{}, err
	}
	fmt.Println("dailyDiet: ", dailyDiet)
	date := dailyDietDTO.Date

	res := database.DB.Where("date = ?", date).First(&dailyDiet)
	if res.Error == gorm.ErrRecordNotFound {
		dailyDiet = models.DailyDiet{
			Date: date,
		}
		fmt.Printf("not found")
		res = database.DB.Create(&dailyDiet)
	} else if res.Error == nil {
		res = database.DB.Save(&dailyDiet)
	}

	if res.Error != nil {
		return models.DailyDietDTO{}, res.Error
	}
	fmt.Print("updated: ", dailyDiet)
	return models.ConvertDailyDietToDTO(dailyDiet), res.Error
}

func (tr *TrackingRepository) DeleteDailyDiet(date string) error {
	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return err
	}

	res := database.DB.Delete(&models.DailyDiet{}, parsedDate)
	return res.Error
}

func (tr *TrackingRepository) GetRecord(id string) (models.RecordDTO, error) {
	var record models.Record

	parseId, err := uuid.Parse(id)
	if err != nil {
		return models.RecordDTO{}, errors.New("invalid UUID")
	}

	res := database.DB.First(&record, parseId)

	return models.ConvertRecordToDTO(record), res.Error
}

func (tr *TrackingRepository) CreateRecord(recordDTO models.RecordDTO) (models.RecordDTO, error) {
	record, err := models.ConvertDTOToRecord(recordDTO)
	if err != nil {
		return models.RecordDTO{}, err
	}
	fmt.Println("record: ", recordDTO.Meal.Nutritions.Calories)
	res := database.DB.Create(&record)

	return models.ConvertRecordToDTO(record), res.Error
}

func (tr *TrackingRepository) UpdateRecord(recordDTO models.RecordDTO) (models.RecordDTO, error) {
	record, err := models.ConvertDTOToRecord(recordDTO)
	if err != nil {
		return models.RecordDTO{}, err
	}

	res := database.DB.Save(&record)

	updateParentMeals(record.MealId)

	return models.ConvertRecordToDTO(record), res.Error
}

func (tr *TrackingRepository) DeleteRecord(id string) error {
	fmt.Println("id: ", id)
	parseId, err := uuid.Parse(id)
	if err != nil {
		return errors.New("invalid UUID")
	}

	record := models.Record{}
	recordRes := database.DB.First(&record, parseId)
	mealId := record.MealId
	fmt.Println("iddd: ", id)
	if recordRes.Error != nil {
		return recordRes.Error
	}

	res := database.DB.Unscoped().Delete(record, parseId)
	if res.Error != nil {
		return res.Error
	}
	fmt.Println("iddddd: ", id)
	updateParentMeals(mealId)
	fmt.Println("ok: ", id)
	return nil
}

func (tr *TrackingRepository) GetDailyNutritionalInfo(dailyDietDTO models.DailyDietDTO) (models.NutritionalInfo, error) {
	dailyDiet, err := models.ConvertDTOtoDailyDiet(dailyDietDTO)
	if err != nil {
		return models.NutritionalInfo{}, err
	}

	return calculateComponentsNutritionPerTotalWeight(dailyDiet.Records), nil
}

type TrackingRepository struct{}

func NewTrackingRepository() *TrackingRepository {
	return &TrackingRepository{}
}
