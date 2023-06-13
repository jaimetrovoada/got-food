import React from "react";
import Card from "../Card";
import Skeleton from "../Skeleton";

const Loader = () => {
  return (
    <Card className="flex flex-row items-center justify-between gap-2 p-2">
      <Skeleton className="h-full w-1/3 rounded-2xl" />
      <div className="flex flex-1 flex-col gap-2 p-2">
        <Skeleton className="h-4 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </Card>
  );
};

export default Loader;
