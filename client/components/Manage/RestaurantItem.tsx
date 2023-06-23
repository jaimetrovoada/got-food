import React from "react";
import ListItem from "../ListItem";
import { MapPin, ArrowRightCircle } from "react-feather";
import Button from "../Button";
import Link from "next/link";
import Image from "next/image";
import { IRestaurant } from "@/types";

interface Props {
  restaurant: IRestaurant;
}

const RestaurantItem = ({ restaurant }: Props) => {
  return (
    <ListItem>
      <div className="relative aspect-square w-20 overflow-hidden rounded-xl">
        <Image src={restaurant.logo} fill alt={restaurant.name} />
      </div>
      <div>
        <p className="mb-4 text-lg font-semibold leading-6 text-slate-100 group-hover:underline">
          {restaurant.name}
        </p>
        <div className="flex w-fit items-center gap-1 rounded-full bg-gray-800/50 px-2 py-1.5 text-xs text-gray-400">
          <MapPin size={12} />
          <span>{restaurant.address}</span>
        </div>
      </div>
      <Button
        as={Link}
        href={`/manage/${restaurant.id}/details`}
        className="ml-auto flex items-center gap-2 shadow-none"
        variant="secondary"
      >
        <span>View</span>
        <ArrowRightCircle size={20} />
      </Button>
    </ListItem>
  );
};

export default RestaurantItem;
