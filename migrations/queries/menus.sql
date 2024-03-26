-- name: CreateMenu :one
 INSERT INTO "menu" (
   "name",
   "description",
   "price",
   "category",
   "image",
   "restaurantId"
 ) VALUES (
   $1, $2, $3, $4, $5, $6
 ) RETURNING *;
