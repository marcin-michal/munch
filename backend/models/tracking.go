package models

import (
	"gorm.io/datatypes"
)

type DailyDiet struct {
	Date    string `gorm:"primaryKey"`
	Records []Record
}

type Record struct {
	BaseModel
	Meal          Meal `gorm:"foreignKey:MealId"`
	MealId        datatypes.UUID
	Weight        float64
	DailyDiet     *DailyDiet
	DailyDietDate *string
}

type DailyDietDTO struct {
	Date    string      `json:"date"`
	Records []RecordDTO `json:"records"`
}

type RecordDTO struct {
	ID            string  `json:"id"`
	Meal          MealDTO `json:"meal"`
	Weight        float64 `json:"weight"`
	DailyDietDate string  `json:"dailyDiet"`
}
