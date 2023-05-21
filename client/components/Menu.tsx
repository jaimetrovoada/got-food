import React from "react";
import { ItemCard } from "./Card";
import Button from "./Button";
import { IMenuItem } from "@/types";

interface Props {
  menu: IMenuItem[];
  categories: Record<string, IMenuItem[]>;
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
    <section className="mb-20 flex flex-auto overflow-hidden pb-2">
      <aside className="flex flex-col overflow-y-auto px-2">
        {Object.keys(categories).map((cat) => (
          <Button
            className={`rounded-lg p-2 ${
              category === cat
                ? "bg-gray-100 font-bold text-black underline hover:bg-gray-200"
                : "hover:bg-gray-300"
            }`}
            onClick={() => setCategory(cat)}
            key={cat}
            variant="custom"
          >
            {cat}
          </Button>
        ))}
      </aside>
      <aside className="scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-auto px-4">
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
