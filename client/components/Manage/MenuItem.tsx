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
      <div className="flex flex-row gap-2 rounded-l-2xl">
        <Image
          src={item.image}
          alt={`image of the dish - ${item.name}`}
          width={50}
          height={50}
          className="h-auto w-auto rounded-l-2xl object-cover"
        />
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">{item.name}</p>
          <p className="w-fit rounded-full bg-gray-50 px-2 py-1.5 text-xs font-medium capitalize text-gray-600 group-hover:bg-gray-100">
            {item.category}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="custom" onClick={() => editItem(item)}>
          <Edit3 className="mr-2 stroke-blue-400" />
        </Button>
        <Button variant="custom" onClick={(e) => deleteItem(item.id)}>
          <Trash className="stroke-red-400" />
        </Button>
      </div>
    </ListItem>
  );
};

export default Item;
