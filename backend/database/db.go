package database

import (
	"fmt"
	"os"

	"github.com/marcin-michal/munch/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	fmt.Println("DB_HOST", os.Getenv("DB_HOST"))
	fmt.Println("DB_USER", os.Getenv("DB_USER"))

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"), os.Getenv("DB_PORT"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("failed to connect database")
	}

	DB = db
}

func Migrate() {
	DB.AutoMigrate(&models.DailyDiet{}, &models.Record{}, &models.Meal{})
}
