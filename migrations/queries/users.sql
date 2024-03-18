-- name: GetUserByEmail :one
SELECT * FROM "user"
WHERE "email" = $1;
