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
  kind?: "primary" | "secondary" | "tertiary" | "custom";
};

type Props<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  ButtonProps
>;

const baseStyles = "rounded-xl p-2 font-bold";

const getBaseStyles = (type: string) => {
  return {
    primary: `${baseStyles} border-2 shadow-custom border-black ${
      type === "reset" ? "bg-red-700" : "bg-blue-700"
    } hover:bg-blue-600 text-white`,
    secondary: `${baseStyles} border-2 border-black hover:bg-slate-100 shadow-[0_4px_0_black] text-blue-700`,
    tertiary: `${baseStyles} shadow-b-md underline text-blue-700`,
    custom: `${baseStyles}`,
  };
};
const Button = <C extends React.ElementType = "button">({
  as,
  children,
  kind = "primary",
  ...props
}: Props<C>) => {
  const Component = as || "button";

  const baseStyles = getBaseStyles(props.type);
  const getStyles = () => {
    return {
      base: baseStyles[kind],
      ...(props.className ? { className: props.className } : {}),
    };
  };
  const styles = getStyles();

  return (
    <Component {...props} className={styles.base + " " + styles.className}>
      {children}
    </Component>
  );
};

export default Button;
