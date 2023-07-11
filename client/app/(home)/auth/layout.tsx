import Container from "@/components/Container";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Layout;
