"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Link from "next/link";
import { IRestaurant } from "@/types";
import useOnScreen from "@/hooks/useOnScreen";
import React from "react";

interface Props {
  trending: IRestaurant[];
}

export interface MyCustomCSS extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

const Home = ({ trending }: Props) => {
  const [isVisible1, ref1] = useOnScreen();
  const [isVisible2, ref2] = useOnScreen();
  const [isVisible3, ref3] = useOnScreen();
  const [isVisible4, ref4] = useOnScreen();
  const [isVisible5, ref5] = useOnScreen();

  const dotsArr = [
    {
      ref: ref1,
      isVisible: isVisible1,
    },
    {
      ref: ref2,
      isVisible: isVisible2,
    },
    {
      ref: ref3,
      isVisible: isVisible3,
    },
    {
      ref: ref4,
      isVisible: isVisible4,
    },
    {
      ref: ref5,
      isVisible: isVisible5,
    },
  ];
  const scrollToElement = (el: HTMLDivElement) => {
    el.scrollIntoView({ behavior: "smooth" });
  };

  const style = (restaurant: IRestaurant) => {
    console.log({ logo: restaurant.logo });
    return {
      "--image-url": `url(${restaurant.logo})`,
    } as MyCustomCSS;
  };

  if (!trending || trending.length === 0) {
    return (
      <Container className="flex items-center justify-center">
        <Button as={Link} href="/restaurants">
          Explore
        </Button>
      </Container>
    );
  }

  return (
    <Container className="flex max-w-full">
      <div className="flex-no-wrap scrolling-touch relative flex w-full max-w-full flex-1 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        <div className="fixed left-10 bottom-10 z-30 flex gap-4">
          {trending.map((_, index) => (
            <Button
              key={index}
              onClick={() => scrollToElement(dotsArr[index].ref.current)}
              variant="custom"
              className={`h-4 w-4 rounded-full ${
                !dotsArr[index].isVisible ? "bg-gray-500" : "bg-black"
              }`}
            ></Button>
          ))}
        </div>
        {trending.map((restaurant, index) => (
          <div
            key={restaurant.id}
            style={style(restaurant)}
            className={`flex w-full flex-none snap-start snap-always flex-col bg-hero-pattern bg-cover bg-center bg-no-repeat`}
            ref={dotsArr[index].ref}
          >
            <div className="ml-auto flex flex-col gap-2 p-4 text-right">
              <p className="text-5xl font-bold text-white">{restaurant.name}</p>
              <p className="text-xl text-gray-800">{restaurant.description}</p>
            </div>
            <div className="mt-auto mb-4 ml-auto mr-4 flex gap-4">
              <Button
                as={Link}
                href={`/restaurants/${restaurant.id}`}
                className="bg-teal-900"
              >
                Go to {restaurant.name}
              </Button>
              <Button
                as={Link}
                href={"/restaurants"}
                variant="secondary"
                className="bg-white"
              >
                Explore Restaurants
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
