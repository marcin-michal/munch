package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type BaseModel struct {
	Id        datatypes.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	CreatedAt datatypes.Time `gorm:"autoCreateTime"`
	UpdatedAt datatypes.Time `gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
