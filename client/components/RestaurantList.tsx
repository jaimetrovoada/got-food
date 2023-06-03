import React from "react";
import { LinkCard } from "./Card";
import { RestaurantResponse } from "@shared/types";

interface Props {
  restaurants: RestaurantResponse[];
}

const RestaurantList = ({ restaurants }: Props) => {
  return (
    <section className="grid flex-1 grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <LinkCard
          href={`/restaurants/${restaurant.id}`}
          key={restaurant.id}
          name={restaurant.name}
          imageUrl={restaurant.logo}
          description={restaurant.description}
          address={restaurant.address}
        />
      ))}
    </section>
  );
};

export default RestaurantList;
