import { IRestaurant } from "@/types";
import Link from "next/link";
import React from "react";
import Button from "../Button";
import Skeleton from "../Skeleton";

interface Props {
  restaurant: IRestaurant;
}

export interface MyCustomCSS extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

const TrendingSlide = ({ restaurant }: Props) => {
  const style = (restaurant: IRestaurant) => {
    return {
      "--image-url": `url(${restaurant.logo})`,
    } as MyCustomCSS;
  };

  return (
    <div
      style={style(restaurant)}
      className="flex w-full flex-none snap-center snap-always flex-col rounded-2xl bg-hero-pattern bg-cover bg-center bg-no-repeat md:w-1/2 xl:w-1/3"
    >
      <Button as={Link} variant="custom" href={`/restaurants/${restaurant.id}`}>
        <div className="ml-auto flex flex-col gap-2 px-4 py-8 text-right">
          <p className="text-5xl font-bold text-white underline">
            {restaurant.name}
          </p>
        </div>
      </Button>
    </div>
  );
};

TrendingSlide.Skeleton = function TrendingSlideSkeleton() {
  return (
    <Skeleton className="flex h-28 w-full flex-none snap-center snap-always flex-col rounded-2xl md:w-1/2 xl:w-1/3" />
  );
};

export default TrendingSlide;
