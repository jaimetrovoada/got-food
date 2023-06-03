"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { IMenuItem, IOrder } from "@/types";
import { MapPin, Plus } from "react-feather";

interface ItemCardProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  addToCart?: (price: number, name: string, id: string) => void;
  deleteItem?: (id: string) => void;
}
interface LinkCardProps {
  href: string;
  name: string;
  imageUrl: string;
  description: string;
  address: string;
}

type AsProp<C extends React.ElementType> = {
  as?: C extends "div" | typeof Link ? C : never;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type Props<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  CardProps
>;

type CardProps = {
  variant?: "rounded" | "square";
  children: React.ReactNode;
};

const baseStyle = "bg-white border border-gray-600";
const styles = {
  rounded: `${baseStyle} rounded-2xl`,
  square: `${baseStyle}`,
};

const Card = <C extends React.ElementType = "div">({
  as,
  variant = "rounded",
  className,
  children,
  ...props
}: Props<C>) => {
  const Component = as || "div";

  return (
    <Component className={styles[variant] + " " + className} {...props}>
      {children}
    </Component>
  );
};

export default Card;

export const ItemCard = ({
  name,
  id,
  imageUrl,
  description,
  price,
  addToCart,
  deleteItem,
}: ItemCardProps) => {
  return (
    <Card className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2 rounded-l-2xl">
        <Image
          src={imageUrl}
          alt={`image of the dish - ${name}`}
          width={50}
          height={50}
          className="h-auto w-auto rounded-l-2xl object-cover"
        />
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="p-2">
        <p className="text-lg font-bold">${price}</p>
        {addToCart && (
          <Button
            onClick={() => addToCart(price, name, id)}
            className="h-8 w-8 leading-none"
          >
            +
          </Button>
        )}
        {deleteItem && (
          <Button
            onClick={(e) => deleteItem(id)}
            className="h-8 w-8 bg-red-500 leading-none"
          >
            🗑️
          </Button>
        )}
      </div>
    </Card>
  );
};

export const LinkCard = ({
  href,
  name,
  imageUrl,
  description,
  address,
}: LinkCardProps) => {
  return (
    <Card
      as={Link}
      href={href}
      className="group flex flex-col items-start justify-between shadow-lg"
    >
      {imageUrl && (
        <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={imageUrl}
            alt={name + " " + "logo"}
            fill
            className="h-auto overflow-hidden object-cover"
          />
        </div>
      )}
      <div className="flex w-full flex-1 flex-col justify-between gap-4 px-4 py-2">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          {name}
        </h3>
        <div className="flex w-fit items-center gap-1 rounded-full bg-gray-50 px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
          <MapPin size={16} />
          <span>{address}</span>
        </div>
        <p className="px-3 text-sm capitalize leading-6 text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </Card>
  );
};

export const CardSkeleton = () => {
  return (
    <Card className="flex h-20 select-none">
      <Skeleton className="h-full w-[80px] rounded-l-2xl"></Skeleton>
      <div className="flex flex-1 flex-col justify-between p-2">
        <Skeleton className="h-6 w-1/3" rounded></Skeleton>
        <Skeleton className="h-4 w-2/5" rounded></Skeleton>
      </div>
    </Card>
  );
};

interface MenuCardProps {
  item: IMenuItem;
  addToCart: (price: number, name: string, id: string) => void;
}
export const MenuItemCard = ({ item, addToCart }: MenuCardProps) => {
  return (
    <Card
      key={item.id}
      className="group flex flex-col gap-2 p-2 hover:shadow-lg"
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
          <p className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            {item.name}
          </p>
          <p className="text-sm text-gray-600 line-clamp-3">
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

interface OrderCardProps {
  order: IOrder;
}
export const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const date = new Date(order.date);
  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <Card className="flex flex-col p-2" variant="square">
      <div className="flex justify-between">
        <span className="font-bold">{order.restaurant.name}</span>
        <span className="font-bold">${order.totalPrice}</span>
      </div>
      <span className="text-gray-500">
        {dateString} - {time}
      </span>
      <div
        className={`${
          isExpanded ? "max-h-screen" : "max-h-0"
        } overflow-hidden transition-all`}
      >
        <ul className="list-inside list-disc">
          {order.orderedItems.map((item) => (
            <li key={item.item.image} className="list-item text-gray-700">
              {item.item.name} - ${item.item.price} x {item.amount}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="mx-auto text-gray-500"
        variant="tertiary"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        Details
      </Button>
    </Card>
  );
};
