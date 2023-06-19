import { IMenuItem } from "@/types";
import { Plus } from "react-feather";
import Button from "../Button";
import Card from "../Card";
import Image from "next/image";

interface Props {
  item: IMenuItem;
  addToCart: (price: number, name: string, id: string) => void;
}

const Item = ({ item, addToCart }: Props) => {
  return (
    <Card
      key={item.id}
      className="group flex flex-col gap-2 border border-gray-600/50 bg-neutral-950 p-2 shadow-lg hover:border-blue-800/50"
    >
      <div className="flex flex-row gap-2">
        <div className="relative aspect-square w-1/3 overflow-hidden rounded-2xl">
          <Image
            src={item.image}
            alt={`image of the dish - ${item.name}`}
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-xl font-semibold leading-6 text-slate-100 group-hover:underline">
            {item.name}
          </p>
          <p className="line-clamp-3 text-sm text-slate-300/75">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between p-2">
        <p className="text-lg font-bold">${item.price}</p>
        <Button
          onClick={() => addToCart(item.price, item.name, item.id)}
          className="rounded-full bg-blue-500 p-2 text-white shadow-lg"
          variant="custom"
        >
          <Plus size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default Item;
