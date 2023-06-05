import { RestaurantResponse } from "@shared/types";
import Item from "./Item";

interface Props {
  restaurants: RestaurantResponse[];
}

const List = ({ restaurants }: Props) => {
  return (
    <section className="grid flex-1 grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <Item
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

export default List;
