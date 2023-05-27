import { IRestaurant } from "@/types";
import TrendingSlide from "./TrendingSlide";

interface Props {
  trending: IRestaurant[];
}

const TrendingSlider = ({ trending }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-1 snap-x snap-mandatory scroll-py-4 flex-nowrap gap-2 overflow-x-auto scroll-smooth scrollbar-thin">
        {trending.map((restaurant) => (
          <TrendingSlide key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSlider;
