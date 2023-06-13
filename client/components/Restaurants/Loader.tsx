import Card from "../Card";
import Skeleton from "../Skeleton";

const Loader = () => {
  return (
    <Card className="group flex flex-col items-start justify-between shadow-lg">
      <Skeleton className="h-40 w-full rounded-t-2xl" />
      <div className="flex w-full flex-col gap-4 px-4 py-2">
        <Skeleton className="h-4 w-1/3 rounded-2xl" />

        <div className="flex flex-col gap-4 px-3">
          <Skeleton className="h-4 w-1/4 rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </Card>
  );
};

export default Loader;
