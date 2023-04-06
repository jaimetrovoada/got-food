import Card from "@/components/Card";
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
            <Card key={item.id}>
              <div className="flex flex-row gap-2">
                <Image
                  src={item.image}
                  alt={`image of the dish - ${item.name}`}
                  width={50}
                  height={50}
                  className="h-auto w-auto rounded-tl-2xl rounded-bl-2xl object-cover"
                />
                <div className="flex flex-col gap-2 p-2">
                  <p className="text-xl font-bold">{item.name}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
              <p className="p-2 text-lg font-bold">${item.price}</p>
            </Card>
          ))
      ) : (
        <div>No menu</div>
      )}
    </div>
  );
};

export default Restaurant;
