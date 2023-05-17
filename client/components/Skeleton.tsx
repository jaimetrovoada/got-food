import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
}

const Skeleton = ({ className, rounded = false, ...props }: Props) => {
  const baseStyle =
    "animate-pulse bg-gray-200" + (rounded ? " rounded-lg" : "");
  return <div className={baseStyle + " " + className} {...props}></div>;
};

export default Skeleton;
