import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const baseClassName = "container mx-auto flex flex-col p-4 xl:px-0";

const Container = ({ children, className, ...props }: Props) => {
  const getStyles = () => {
    return {
      base: baseClassName,
      ...(className ? { className } : {}),
    };
  };

  const styles = getStyles();
  return (
    <div className={styles.base + " " + styles.className} {...props}>
      {children}
    </div>
  );
};

export default Container;
