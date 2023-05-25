interface Props {
  children: React.ReactNode;
}

const CardWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 border-black bg-white p-2 shadow-custom md:p-8">
      {children}
    </div>
  );
};

export default CardWrapper;
