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
  variant?: "primary" | "secondary" | "tertiary" | "custom";
};

type Props<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  ButtonProps
>;

const baseStyles = "rounded-xl p-2 font-bold";
const disabledStyles = "bg-gray-500 cursor-not-allowed hover:bg-gray-600";
const resetStyles = "bg-red-700";

const variantStyles = {
  primary: `${baseStyles} border-2 shadow-custom border-black bg-blue-700 hover:bg-blue-600 text-white`,
  secondary: `${baseStyles} border-2 border-black hover:bg-slate-100 shadow-[0_4px_0_black] text-blue-700`,
  tertiary: `${baseStyles} shadow-b-md underline text-blue-700`,
  custom: ``,
};

const Button = <C extends React.ElementType = "button">({
  as,
  children,
  variant = "primary",
  ...props
}: Props<C>) => {
  const Component = as || "button";

  const getStyles = () => {
    const resetStyle = props.type === "reset" ? resetStyles : "";
    const disabledStyle = props.disabled ? disabledStyles : "";
    return `${variantStyles[variant]} ${props.className} ${resetStyle} ${disabledStyle}`;
  };
  const styles = getStyles();

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
};

export default Button;
