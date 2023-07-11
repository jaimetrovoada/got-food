interface Props {
  children: React.ReactNode;
}

const List = ({ children }: Props) => {
  return (
    <section className="grid flex-1 grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </section>
  );
};

export default List;
