-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('pending', 'completed');

-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('business', 'customer');

-- CreateTable
CREATE TABLE "menu" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "category" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,
    "restaurantId" UUID,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tableNumber" INTEGER NOT NULL,
    "orderedItems" JSONB NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" "order_status_enum" NOT NULL DEFAULT 'pending',
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" VARCHAR NOT NULL,
    "restaurantId" UUID,
    "userId" UUID,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "logo" VARCHAR NOT NULL,
    "ownerId" UUID,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "passwordHash" VARCHAR NOT NULL,
    "role" "user_role_enum" NOT NULL DEFAULT 'customer',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


---- create above / drop below ----

DROP TABLE "menu";
DROP TABLE "order";
DROP TABLE "restaurant";
DROP TABLE "user";
