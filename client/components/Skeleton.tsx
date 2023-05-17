import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
}

const Skeleton = ({ className, rounded = false }: Props) => {
  const baseStyle =
    "animate-pulse bg-gray-200" + (rounded ? " rounded-lg" : "");
  return <div className={baseStyle + " " + className}></div>;
};

export default Skeleton;
