interface Props {
  children: React.ReactNode;
}

const CardWrapper = ({ children }: Props) => {
  return (
    <div className="flex max-h-full flex-col gap-2 overflow-hidden rounded-2xl border border-gray-200 border-gray-600/50 bg-neutral-950 p-2 shadow-lg md:p-8">
      {children}
    </div>
  );
};

export default CardWrapper;
