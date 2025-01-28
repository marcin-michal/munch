package repository

import (
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/marcin-michal/munch/backend/database"
	"github.com/marcin-michal/munch/backend/models"
)

func (mr *MealRepository) GetMeal(id string) (models.MealDTO, error) {
	parseId, err := uuid.Parse(id)
	if err != nil {
		return models.MealDTO{}, errors.New("invalid UUID")
	}

	var meal models.Meal

	res := database.DB.Preload("Components").First(&meal, parseId)
	return models.ConvertMealToDTO(meal), res.Error
}

func (mr *MealRepository) GetMeals() ([]models.MealDTO, error) {
	var meals []models.Meal

	res := database.DB.Preload("Components").Find(&meals)

	mealsDTO := make([]models.MealDTO, len(meals))
	for i, meal := range meals {
		mealsDTO[i] = models.ConvertMealToDTO(meal)
	}

	return mealsDTO, res.Error
}

func (mr *MealRepository) GetMealsByName(name string) ([]models.MealDTO, error) {
	fmt.Println("name: ", name)
	var meals []models.Meal

	wildcardName := "%" + name + "%"
	res := database.DB.Preload("Components").Where("name ILIKE ? AND show_in_search = ?", wildcardName, true).Limit(5).Find(&meals)

	mealsDTO := make([]models.MealDTO, len(meals))
	for i, meal := range meals {
		mealsDTO[i] = models.ConvertMealToDTO(meal)
	}

	return mealsDTO, res.Error
}

func (mr *MealRepository) CreateMeal(mealDTO models.MealDTO) (models.MealDTO, error) {
	meal, err := models.ConvertDTOToMeal(mealDTO)
	if err != nil {
		return models.MealDTO{}, err
	}

	if len(meal.Components) > 0 {
		meal.Nutritions = calculateComponentsNutritionPer100g(meal.Components)
	}
	fmt.Println("meal: ", meal.Nutritions.Calories)
	res := database.DB.Create(&meal)

	return models.ConvertMealToDTO(meal), res.Error
}

func (mr *MealRepository) UpdateMeal(mealDTO models.MealDTO) (models.MealDTO, error) {
	meal, err := models.ConvertDTOToMeal(mealDTO)
	if err != nil {
		return models.MealDTO{}, err
	}

	res := database.DB.Save(&meal)

	updateParentMeals(meal.Id)

	return models.ConvertMealToDTO(meal), res.Error
}

func (mr *MealRepository) DeleteMeal(id string) error {
	parseId, err := uuid.Parse(id)
	if err != nil {
		return errors.New("invalid UUID")
	}

	res := database.DB.Delete(&models.Meal{}, parseId)
	return res.Error
}

type MealRepository struct{}

func NewMealRepository() *MealRepository {
	return &MealRepository{}
}
