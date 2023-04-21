import Link from "next/link";
import React from "react";

type AsProp<C extends React.ElementType> = {
  as?: C extends "button" | typeof Link ? C : never;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type ButtonProps = {
  kind?: "primary" | "secondary" | "tertiary";
};

type Props<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  ButtonProps
>;

const defaultStyles = "rounded-xl p-2 font-bold";

const buttonStyles = {
  primary: `${defaultStyles} border bg-blue-700 hover:bg-blue-600 shadow-md text-white`,
  secondary: `${defaultStyles} border border-blue-700 hover:bg-slate-100 shadow-md text-blue-700`,
  tertiary: `${defaultStyles} shadow-b-md underline text-blue-700`,
};
const Button = <C extends React.ElementType = "button">({
  as,
  children,
  kind = "primary",
  ...props
}: Props<C>) => {
  const Component = as || "button";

  return (
    <Component
      {...props}
      className={`${props.className || ""} ${buttonStyles[kind]} ${
        props.type === "reset" ? "bg-red-500" : ""
      }`}
    >
      {children}
    </Component>
  );
};

export default Button;
