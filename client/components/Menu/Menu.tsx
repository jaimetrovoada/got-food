import Item from "./Item";
import { IMenuItem } from "@/types";
import { Suspense } from "react";
import Loader from "./Loader";

interface Props {
  menu: IMenuItem[];
  addToCart: (price: number, name: string, id: string) => void;
}

const Menu = ({ menu, addToCart }: Props) => {
  return (
    <div className="grid w-full flex-1 grid-flow-row grid-cols-1 gap-2 overflow-auto p-2 pb-4 scrollbar md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      <Suspense
        fallback={
          <>
            <Loader />
            <Loader />
            <Loader />
            <Loader />
          </>
        }
      >
        {menu.map((item) => (
          <Item key={item.id} addToCart={addToCart} item={item} />
        ))}
      </Suspense>
    </div>
  );
};

export default Menu;
