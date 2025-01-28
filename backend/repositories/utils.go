package repository

import (
	"math"
	"time"

	"github.com/marcin-michal/munch/backend/database"
	"github.com/marcin-michal/munch/backend/models"
	"gorm.io/datatypes"
)

func updateParentMeals(id datatypes.UUID) {
	parentMeals := getParentMeals(id)

	for _, meal := range parentMeals {
		meal.Nutritions = calculateComponentsNutritionPer100g(meal.Components)
		database.DB.Save(&meal)
		updateParentMeals(meal.Id)
	}
}

func getParentMeals(id datatypes.UUID) []models.Meal {
	var parentMeals []models.Meal

	err := database.DB.
		Joins("JOIN records ON records.meal_id = meals.id").
		Where("records.meal_id = ?", id).
		Preload("Components").
		Find(&parentMeals).
		Error
	if err != nil {
		panic(err)
	}

	return parentMeals
}

func calculateComponentsNutritionPer100g(components []models.Record) models.NutritionalInfo {
	return calculateComponentsNutrition(components, false)
}

func calculateComponentsNutrition(components []models.Record, isPerTotal bool) models.NutritionalInfo {
	nutritionalInfo := models.NutritionalInfo{}

	var totalWeight float64
	for _, component := range components {
		totalWeight += component.Weight
	}

	for _, component := range components {
		meal := component.Meal
		factor := component.Weight / totalWeight
		if isPerTotal {
			factor *= (totalWeight / 100)
		}

		nutritionalInfo.Calories += int(math.Ceil(float64(meal.Nutritions.Calories) * factor))
		nutritionalInfo.Carbs += meal.Nutritions.Carbs * factor
		nutritionalInfo.Sugar += meal.Nutritions.Sugar * factor
		nutritionalInfo.Fat += meal.Nutritions.Fat * factor
		nutritionalInfo.Protein += meal.Nutritions.Protein * factor
		nutritionalInfo.Fiber += meal.Nutritions.Fiber * factor
		nutritionalInfo.Salt += meal.Nutritions.Salt * factor
		nutritionalInfo.VitaminA += meal.Nutritions.VitaminA * factor
		nutritionalInfo.VitaminB += meal.Nutritions.VitaminB * factor
		nutritionalInfo.VitaminC += meal.Nutritions.VitaminC * factor
		nutritionalInfo.VitaminD += meal.Nutritions.VitaminD * factor
		nutritionalInfo.VitaminE += meal.Nutritions.VitaminE * factor
		nutritionalInfo.VitaminK += meal.Nutritions.VitaminK * factor
		nutritionalInfo.Calcium += meal.Nutritions.Calcium * factor
		nutritionalInfo.Iron += meal.Nutritions.Iron * factor
		nutritionalInfo.Potassium += meal.Nutritions.Potassium * factor
		nutritionalInfo.Magnesium += meal.Nutritions.Magnesium * factor
		nutritionalInfo.Zinc += meal.Nutritions.Zinc * factor
	}

	return nutritionalInfo
}

func calculateComponentsNutritionPerTotalWeight(components []models.Record) models.NutritionalInfo {
	return calculateComponentsNutrition(components, true)
}

func isValidDate(date string) (bool, error) {
	_, err := time.Parse("2006-01-02", date)

	return err == nil, err
}
