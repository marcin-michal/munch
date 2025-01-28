package models

type Meal struct {
	BaseModel    `gorm:"embedded"`
	Name         string
	Description  string
	Nutritions   NutritionalInfo `gorm:"embedded"` // Nutritions per 100g
	Components   []Record
	ShowInSearch bool `gorm:"default:false"`
}

type NutritionalInfo struct {
	Calories  int     `gorm:"default:0"`
	Carbs     float64 `gorm:"default:0"`
	Sugar     float64 `gorm:"default:0"`
	Fat       float64 `gorm:"default:0"`
	Protein   float64 `gorm:"default:0"`
	Fiber     float64 `gorm:"default:0"`
	Salt      float64 `gorm:"default:0"`
	VitaminA  float64 `gorm:"default:0"`
	VitaminB  float64 `gorm:"default:0"`
	VitaminC  float64 `gorm:"default:0"`
	VitaminD  float64 `gorm:"default:0"`
	VitaminE  float64 `gorm:"default:0"`
	VitaminK  float64 `gorm:"default:0"`
	Calcium   float64 `gorm:"default:0"`
	Iron      float64 `gorm:"default:0"`
	Potassium float64 `gorm:"default:0"`
	Magnesium float64 `gorm:"default:0"`
	Zinc      float64 `gorm:"default:0"`
}

type MealDTO struct {
	ID           string          `json:"id"`
	Name         string          `json:"name"`
	Description  string          `json:"description"`
	Nutritions   NutritionalInfo `json:"nutritions"`
	Components   []RecordDTO     `json:"components"`
	ShowInSearch bool            `json:"showInSearch"`
}
