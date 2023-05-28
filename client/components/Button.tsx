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

interface VariantStyles {
  primary: string;
  secondary: string;
  tertiary: string;
  custom: string;
}

const baseStyles: VariantStyles = {
  primary: "rounded-xl p-2 font-bold",
  secondary: "rounded-xl p-2 font-bold",
  tertiary: "font-bold",
  custom: "",
};

const disabledStyles: VariantStyles = {
  primary: "disabled:bg-gray-500 disabled:cursor-not-allowed",
  secondary:
    "disabled:cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500",
  tertiary: "disabled:cursor-not-allowed disabled:text-gray-500",
  custom: "disabled:cursor-not-allowed",
};

const resetStyles: VariantStyles = {
  primary: "bg-red-700 text-white shadow-lg",
  secondary: "border border-red-400 shadow-lg text-red-400",
  tertiary: "text-red-400 underline",
  custom: "",
};

const normalStyles: VariantStyles = {
  primary: "shadow-lg bg-blue-600 text-white",
  secondary: "border border-blue-600 shadow-lg text-blue-600",
  tertiary: "underline text-blue-600",
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
    let style =
      props.type === "reset" ? resetStyles[variant] : normalStyles[variant];

    style += " " + baseStyles[variant];
    style += " " + disabledStyles[variant];
    style += " " + props.className;

    return style;
  };
  const styles = getStyles();

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
};

export default Button;
