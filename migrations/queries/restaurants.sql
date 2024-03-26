-- name: CreateRestaurants :one
 INSERT INTO "restaurant" (
   "name",
   "description",
   "address",
  "logo",
  "ownerId"
 ) VALUES (
   $1, $2, $3, $4, $5
 ) RETURNING *;
