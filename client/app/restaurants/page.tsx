import { LinkCard } from "@/components/Card";
import Container from "@/components/Container";
import restaurantsService from "@/services/restaurantsService";
import React from "react";

const Page = async () => {
  const { restaurants } = await getRestaurants();
  return (
    <Container className="flex flex-col gap-4 p-2">
      {restaurants?.map((restaurant) => (
        <LinkCard
          href={`/restaurants/${restaurant.id}`}
          key={restaurant.id}
          name={restaurant.name}
          imageUrl={restaurant.logo}
          description={restaurant.description}
        />
      ))}
    </Container>
  );
};

export default Page;

async function getRestaurants() {
  const restaurant = await restaurantsService.getRestaurants();

  return restaurant;
}
