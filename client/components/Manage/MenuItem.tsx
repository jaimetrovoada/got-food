import { IMenuItem } from "@/types";
import React from "react";
import { Edit3, Trash } from "react-feather";
import Button from "../Button";
import Image from "next/image";
import ListItem from "../ListItem";

interface Props {
  item: IMenuItem;
  deleteItem: (id: string) => void;
  editItem: (item: IMenuItem) => void;
}

const Item = ({ item, editItem, deleteItem }: Props) => {
  return (
    <ListItem>
      <div className="relative aspect-square w-20 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={`image of the dish - ${item.name}`}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="mb-4 text-lg font-semibold capitalize leading-6 text-slate-100 group-hover:underline">
          {item.name}
        </p>
        <p className="flex w-fit items-center gap-1 rounded-full bg-gray-800/50 px-2 py-1.5 text-xs capitalize text-gray-400">
          {item.category}
        </p>
      </div>
      <div className="ml-auto flex flex-col gap-2">
        <Button variant="custom" onClick={() => editItem(item)}>
          <Edit3 className="mr-2 stroke-blue-400" />
        </Button>
        <Button variant="custom" onClick={() => deleteItem(item.id)}>
          <Trash className="stroke-red-400" />
        </Button>
      </div>
    </ListItem>
  );
};

export default Item;
