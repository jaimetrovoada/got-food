package main

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jaimetrovoada/got-food/internal/config"
	"github.com/jaimetrovoada/got-food/internal/db"
	"github.com/jaimetrovoada/got-food/internal/passwords"
)

//go:embed data.json
var jsonfile []byte

type User struct {
	Name        string        `json:"name"`
	Email       string        `json:"email"`
	Password    string        `json:"password"`
	Role        string        `json:"role"`
	Restaurants *[]Restaurant `json:"restaurants",omitempty`
}

type Restaurant struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Address     string `json:"address"`
	Logo        string `json:"logo"`
	Menus       []Menu `json:"menus"`
}

type Menu struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Category    string `json:"category"`
	Image       string `json:"image"`
}

type Data struct {
	Users []User
}

func main() {

	config, err := config.LoadConfig()
	if err != nil {
		log.Fatal("couldnt load config:", err)
	}

	conn, err := pgx.Connect(context.Background(), config.DATABASE_URL)
	if err != nil {
		log.Fatalf("unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	query := db.New(conn)

	var data Data
	err = json.Unmarshal(jsonfile, &data)
	if err != nil {
		log.Fatalf("failed to decode JSON: %s", err)
	}

	// var wg sync.WaitGroup
	for _, user := range data.Users {
		// wg.Add(1)
		createUser(user, query)
		fmt.Printf("Name: %s, Email: %s\n", user.Name, user.Email)
	}
	// wg.Wait()
	fmt.Printf("#########\n# DONE! #\n#########\n")
}

func createUser(user User, query *db.Queries) (db.User, error) {
	passwordHash, err := passwords.HashPassword(user.Password)
	if err != nil {
		log.Fatalf("failed to hash password: %s", err)
	}
	userParams := db.CreateUserParams{
		Name:         user.Name,
		Email:        user.Email,
		PasswordHash: passwordHash,
		Role:         db.UserRoleEnum(user.Role),
	}
	_user, err := query.CreateUser(context.Background(), userParams)
	if err != nil {
		log.Fatalf("failed to create user: %s", err)
	}

	if user.Role == "business" && user.Restaurants != nil {
		for _, restaurant := range *user.Restaurants {
			// imageFile, _ := assets.ReadFile(fmt.Sprintf("assets/%s", restaurant.Logo))
			// url, err := uploader.UploadToS3(imageFile)

			restaurantParams := db.CreateRestaurantsParams{
				Name:        restaurant.Name,
				Description: restaurant.Description,
				Address:     restaurant.Address,
				Logo:        restaurant.Logo,
				OwnerId:     _user.ID,
			}

			_restaurant, err := query.CreateRestaurants(context.Background(), restaurantParams)
			if err != nil {
				log.Fatalf("failed to create restaurant: %s", err)
			}

			for _, menu := range restaurant.Menus {
				// imageFile, _ := assets.ReadFile(fmt.Sprintf("assets/%s", restaurant.Logo))
				// url, err := uploader.UploadToS3(imageFile)

				menuParams := db.CreateMenuParams{
					Name:         menu.Name,
					Description:  menu.Description,
					Price:        int32(menu.Price),
					Category:     menu.Category,
					Image:        menu.Image,
					RestaurantId: _restaurant.ID,
				}
				_, err := query.CreateMenu(context.Background(), menuParams)
				if err != nil {
					log.Fatalf("failed to create menu: %s", err)
				}
			}
		}
	}
	fmt.Printf("User created:\nName:\t%s,\nEmail:\t%s\n", user.Name, user.Email)

	return _user, nil

}
