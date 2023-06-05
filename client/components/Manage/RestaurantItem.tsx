import React from "react";
import ListItem from "../ListItem";
import { MapPin, ArrowRightCircle } from "react-feather";
import Button from "../Button";
import Link from "next/link";
import Image from "next/image";
import { RestaurantResponse } from "@shared/types";

interface Props {
  restaurant: RestaurantResponse;
}

const RestaurantItem = ({ restaurant }: Props) => {
  return (
    <ListItem>
      <div className="relative aspect-square w-20 overflow-hidden rounded-xl">
        <Image src={restaurant.logo} fill alt={restaurant.name} />
      </div>
      <div>
        <p className="mb-4 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          {restaurant.name}
        </p>
        <div className="flex w-fit items-center gap-1 rounded-full bg-gray-50 px-2 py-1.5 text-xs font-medium text-gray-600 group-hover:bg-gray-100">
          <MapPin size={16} />
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
