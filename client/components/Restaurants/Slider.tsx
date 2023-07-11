interface Props {
  children: React.ReactNode;
}

const TrendingSlider = ({ children }: Props) => {
  return (
    <div className="flex flex-1 snap-x snap-mandatory scroll-py-4 flex-nowrap gap-2 overflow-x-auto scroll-smooth rounded-3xl p-2 scrollbar-thin">
      {children}
    </div>
  );
};

export default TrendingSlider;
