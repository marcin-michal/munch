package main

import (
	"embed"

	"github.com/marcin-michal/munch/backend/config"
	"github.com/marcin-michal/munch/backend/database"

	repository "github.com/marcin-michal/munch/backend/repositories"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	config.LoadEnv()
	database.Connect()
	database.Migrate()

	app := NewApp()
	trackingRepository := repository.NewTrackingRepository()
	mealRepository := repository.NewMealRepository()

	err := wails.Run(&options.App{
		Title:  "munch",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Bind: []interface{}{
			app, trackingRepository, mealRepository,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
