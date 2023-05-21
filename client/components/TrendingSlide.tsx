/* eslint-disable react/display-name */
import { IRestaurant } from "@/types";
import Link from "next/link";
import React, { forwardRef } from "react";
import Button from "./Button";

interface Props {
  restaurant: IRestaurant;
}

type Ref = HTMLDivElement;

export interface MyCustomCSS extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

const TrendingSlide = forwardRef<Ref, Props>((props, ref) => {
  const { restaurant } = props;
  const style = (restaurant: IRestaurant) => {
    console.log({ logo: restaurant.logo });
    return {
      "--image-url": `url(${restaurant.logo})`,
    } as MyCustomCSS;
  };

  return (
    <div
      key={restaurant.id}
      style={style(restaurant)}
      className={`flex w-full flex-none snap-start snap-always flex-col bg-hero-pattern bg-cover bg-center bg-no-repeat`}
      ref={ref}
    >
      <div className="ml-auto flex flex-col gap-2 p-4 text-right">
        <p className="text-5xl font-bold text-white">{restaurant.name}</p>
        <p className="text-xl text-gray-800">{restaurant.description}</p>
      </div>
      <div className="mt-auto mb-4 ml-auto mr-4 flex gap-4">
        <Button as={Link} href={`/restaurants/${restaurant.id}`} className="">
          Go to {restaurant.name}
        </Button>
        <Button
          as={Link}
          href={"/restaurants"}
          variant="secondary"
          className="text-white"
        >
          Explore Restaurants
        </Button>
      </div>
    </div>
  );
});

export default TrendingSlide;
