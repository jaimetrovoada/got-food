import { MenuItem } from "@/services/restaurantsService";
import React from "react";
import ItemCard from "./Card";
import Button from "./Button";

interface Props {
  menu: MenuItem[];
  categories: Record<string, MenuItem[]>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  addToCart: (price: number, name: string, id: string) => void;
}

const Menu = ({
  menu,
  categories,
  category,
  setCategory,
  addToCart,
}: Props) => {
  return (
    <section className="flex flex-1 overflow-hidden">
      <aside className="mb-4 flex flex-col overflow-y-auto px-2">
        {Object.keys(categories).map((cat) => (
          <Button
            className={`rounded-lg p-2 ${
              category === cat
                ? "underline bg-gray-100 font-bold text-black hover:bg-gray-200"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setCategory(cat)}
            key={cat}
            kind="custom"
          >
            {cat}
          </Button>
        ))}
      </aside>
      <aside className="flex w-full flex-1 flex-col gap-2 overflow-y-auto px-4">
        {menu
          .filter((item) =>
            category === undefined ? item : item.category === category
          )
          .map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              imageUrl={item.image}
              price={item.price}
              addToCart={addToCart}
              id={item.id}
            />
          ))}
      </aside>
    </section>
  );
};

export default Menu;
