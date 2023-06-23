"use client";
import { getClasses } from "@/lib/helpers";
import { IOrder } from "@/types";
import React from "react";
import { ChevronDown } from "react-feather";
import Button from "../Button";
import Card from "../Card";

interface Props {
  order: IOrder;
}
const Item = ({ order }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const date = new Date(order.date);
  const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <Card className="flex flex-col p-2" variant="square">
      <div className="flex justify-between font-semibold text-slate-200">
        <span>{order.restaurant.name}</span>
        <span>${order.totalPrice}</span>
      </div>
      <span className="text-slate-300">
        {dateString} - {time}
      </span>
      <div
        className={getClasses("max-h-0 overflow-hidden transition-all", {
          "max-h-screen py-4": isExpanded,
        })}
      >
        <ul className="">
          {order.orderedItems.map((item) => (
            <li
              key={item.item}
              className="border-b border-b-gray-800 p-2 text-sm text-slate-300 hover:bg-zinc-900/20 lg:text-base"
            >
              {item.item} x {item.amount}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="mx-auto text-slate-400"
        variant="custom"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <ChevronDown
          className={getClasses("rotate-0 transition-all", {
            "rotate-180": isExpanded,
          })}
        />{" "}
      </Button>
    </Card>
  );
};

export default Item;
