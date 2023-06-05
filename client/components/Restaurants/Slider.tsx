import { IRestaurant } from "@/types";
import Slide from "./Slide";

interface Props {
  trending: IRestaurant[];
}

const TrendingSlider = ({ trending }: Props) => {
  return (
    <div className="flex flex-1 snap-x snap-mandatory scroll-py-4 flex-nowrap gap-2 overflow-x-auto scroll-smooth rounded-3xl p-2 scrollbar-thin">
      {trending.map((restaurant) => (
        <Slide key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default TrendingSlider;
