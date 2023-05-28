import React, { useRef } from "react";
import { MenuItemCard } from "./Card";
import Button from "./Button";
import { IMenuItem } from "@/types";
import { ChevronLeft, ChevronRight } from "react-feather";

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
  const categoriesArray = ["all", ...Object.keys(categories)];

  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (buttonsContainerRef.current) {
      buttonsContainerRef.current.scrollLeft +=
        buttonsContainerRef.current.offsetWidth;
    }
  };

  const scrollLeft = () => {
    if (buttonsContainerRef.current) {
      buttonsContainerRef.current.scrollLeft -=
        buttonsContainerRef.current.offsetWidth;
    }
  };

  return (
    <section className="mb-24 flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-row gap-2">
        <Button
          className="aspect-square h-fit rounded-full bg-gray-300 p-2 shadow-sm"
          variant="custom"
          onClick={scrollLeft}
        >
          <ChevronLeft />
        </Button>
        <div
          className="flex w-full max-w-full flex-row gap-2 overflow-auto scroll-smooth px-2"
          ref={buttonsContainerRef}
        >
          {categoriesArray.map((cat) => (
            <Button
              className={`rounded-lg border-2  p-2 uppercase hover:border-black/75 ${
                category === cat
                  ? "border-white bg-white font-bold text-black underline"
                  : "border-slate-200 bg-slate-200 text-gray-700"
              }`}
              onClick={() => setCategory(cat)}
              key={cat}
              variant="custom"
            >
              {cat}
            </Button>
          ))}
        </div>
        <Button
          className="aspect-square h-fit rounded-full bg-gray-300 p-2 shadow-sm"
          variant="custom"
          onClick={scrollRight}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="grid w-full flex-1 grid-flow-row grid-cols-1 gap-2 overflow-auto pb-4 scrollbar md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {menu
          .filter((item) =>
            category === "all" ? item : item.category === category
          )
          .map((item) => (
            <MenuItemCard key={item.id} addToCart={addToCart} item={item} />
          ))}
      </div>
    </section>
  );
};

export default Menu;
