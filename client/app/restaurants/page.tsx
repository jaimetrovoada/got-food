import Container from "@/components/Container";
import RestaurantList from "@/components/RestaurantList";
import restaurantsService from "@/lib/restaurantsService";
import React from "react";

const Page = async () => {
  const { restaurants } = await getRestaurants();
  return (
    <Container className="flex flex-col gap-4 p-2">
      <RestaurantList restaurants={restaurants} />
    </Container>
  );
};

export default Page;

async function getRestaurants() {
  const restaurant = await restaurantsService.getRestaurants();

  return restaurant;
}
