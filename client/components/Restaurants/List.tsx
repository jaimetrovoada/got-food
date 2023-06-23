import { IRestaurant } from "@/types";
import { Suspense } from "react";
import Item from "./Item";
import Loader from "./Loader";

interface Props {
  restaurants: IRestaurant[];
}

const List = ({ restaurants }: Props) => {
  return (
    <section className="grid flex-1 grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        }
      >
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
      </Suspense>
    </section>
  );
};

export default List;
