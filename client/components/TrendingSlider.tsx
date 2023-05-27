"use client";

import useOnScreen from "@/lib/hooks/useOnScreen";
import { IRestaurant } from "@/types";
import React from "react";
import Button from "./Button";
import TrendingSlide from "./TrendingSlide";

interface Props {
  trending: IRestaurant[];
}

const TrendingSlider = ({ trending }: Props) => {
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

  return (
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
          />
        ))}
      </div>
      {trending.map((restaurant, index) => (
        <TrendingSlide
          key={restaurant.id}
          ref={dotsArr[index].ref}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default TrendingSlider;
