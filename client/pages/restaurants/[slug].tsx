import ItemCard from "@/components/Card";
import restaurantsService, { MenuItem } from "@/services/restaurantsService";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

const Restaurant = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { menu, isLoading, isError } =
    restaurantsService.useRestaurantMenu(slug);

  // group by category
  const categories: Record<string, MenuItem[]> | undefined = menu?.reduce(
    (acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = [];
      }
      acc[curr.category].push(curr);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  const [category, setCategory] = React.useState<string | undefined>(undefined);

  if (isError) {
    console.log({ isError });
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        {categories &&
          Object.keys(categories).map((cat) => (
            <>
              <button
                className={`rounded-xl border p-1 shadow-sm ${
                  category === cat && "bg-blue-500"
                }`}
                onClick={() =>
                  setCategory((prev) => (prev === cat ? undefined : cat))
                }
              >
                {cat}
              </button>
            </>
          ))}
      </div>
      {menu && menu.length ? (
        menu
          ?.filter((item) =>
            category === undefined ? item : item.category === category
          )
          ?.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              imageUrl={item.image}
              price={item.price}
            />
          ))
      ) : (
        <div>No menu</div>
      )}
    </div>
  );
};

export default Restaurant;
