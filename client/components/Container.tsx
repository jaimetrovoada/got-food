import { getClasses } from "@/lib/helpers";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <main
      className={getClasses(
        "overflow-y-auto p-4 px-4 [grid-area:main]",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default Container;
