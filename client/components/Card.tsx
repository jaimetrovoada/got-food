import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { IMenuItem } from "@/types";

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
  imageUrl?: string;
  description?: string;
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

const baseStyle = "bg-white border-2 border-black shadow-custom";
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
}: LinkCardProps) => {
  return (
    <Card as={Link} href={href} className="flex h-20 flex-row">
      {imageUrl && (
        <div className="relative w-full max-w-[80px]">
          <Image
            src={imageUrl}
            alt={name + " " + "logo"}
            fill
            className="h-auto overflow-hidden rounded-tl-2xl rounded-bl-2xl object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between p-2">
        <h3 className="text-2xl font-bold underline">{name}</h3>
        {description && <p className="text-gray-500">{description}</p>}
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
      className="flex flex-col items-center justify-between gap-2 bg-white p-2"
    >
      <div className="flex flex-row gap-2">
        <div className="aspect-square rounded-2xl">
          <Image
            src={item.image}
            alt={`image of the dish - ${item.name}`}
            width={50}
            height={50}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">{item.name}</p>
          <p className="text-gray-500 ">{item.description}</p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between p-2">
        <p className="text-lg font-bold">${item.price}</p>
        <Button
          onClick={() => addToCart(item.price, item.name, item.id)}
          className="h-8 w-8 rounded-full bg-blue-500 leading-none text-white shadow-md"
          variant="custom"
        >
          +
        </Button>
      </div>
    </Card>
  );
};
