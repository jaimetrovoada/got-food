import { IRestaurant } from "@/types";
import React from "react";
import { LinkCard } from "./Card";
import { RestaurantResponse } from "@shared/types";

interface Props {
  restaurants: RestaurantResponse[];
}

const RestaurantList = ({ restaurants }: Props) => {
  return (
    <>
      {restaurants.map((restaurant) => (
        <LinkCard
          href={`/restaurants/${restaurant.id}`}
          key={restaurant.id}
          name={restaurant.name}
          imageUrl={restaurant.logo}
          description={restaurant.description}
        />
      ))}
    </>
  );
};

export default RestaurantList;
