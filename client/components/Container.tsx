import { getClasses } from "@/lib/helpers";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={getClasses("px-4 flex-1 p-4", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Container;
