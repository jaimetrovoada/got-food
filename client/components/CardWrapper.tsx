interface Props {
  children: React.ReactNode;
}

const CardWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 border-black bg-white p-8 shadow-custom">
      {children}
    </div>
  );
};

export default CardWrapper;
