import { getClasses } from "@/lib/helpers";
type Props = React.HTMLAttributes<HTMLFormElement>;

const Form = ({ className, ...props }: Props) => {
  return (
    <form
      {...props}
      className={getClasses(
        "mx-auto flex w-full max-w-screen-sm flex-col gap-6 rounded-lg border border-gray-600/50 bg-zinc-950 p-4 shadow-md",
        className
      )}
    >
      {props.children}
    </form>
  );
};

export default Form;
