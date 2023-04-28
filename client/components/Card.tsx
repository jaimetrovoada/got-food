import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

interface ItemCardProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  addToCart?: (price: number, name: string, id: string) => void;
}
interface LinkCardProps {
  href: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

const ItemCard = ({
  name,
  id,
  imageUrl,
  description,
  price,
  addToCart,
}: ItemCardProps) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-2xl border shadow-md">
      <div className="flex flex-row gap-2">
        <Image
          src={imageUrl}
          alt={`image of the dish - ${name}`}
          width={50}
          height={50}
          className="h-auto w-auto rounded-tl-2xl rounded-bl-2xl object-cover"
        />
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <p className="p-2 text-lg font-bold">${price}</p>
      {addToCart && (
        <Button onClick={() => addToCart(price, name, id)}>+</Button>
      )}
    </div>
  );
};

export default ItemCard;

export const LinkCard = ({
  href,
  name,
  imageUrl,
  description,
}: LinkCardProps) => {
  return (
    <Link href={href} className="flex flex-row rounded-2xl border">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name + " " + "logo"}
          width={50}
          height={50}
          className="h-auto w-auto rounded-tl-2xl rounded-bl-2xl object-cover"
        />
      )}
      <div className="p-2">
        <h3 className="text-2xl font-bold">{name}</h3>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
    </Link>
  );
};
