import React from "react";
import ListItem from "../ListItem";
import Skeleton from "../Skeleton";

const Loader = () => {
  return (
    <ListItem>
      <div className="aspect-square w-20 overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <div>
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-3 w-6" />
      </div>
      <Skeleton className="h-4 w-8" />
    </ListItem>
  );
};

export default Loader;
