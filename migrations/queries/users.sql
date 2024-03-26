-- name: GetUserByEmail :one
SELECT * FROM "user"
WHERE "email" = $1;

-- name: CreateUser :one
INSERT INTO "user" (
  "name",
  "email",
  "passwordHash",
  "role"
) VALUES (
  $1, $2, $3, $4
) RETURNING *;
