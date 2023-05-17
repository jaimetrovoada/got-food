import Container from "@/components/Container";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container className="w-full max-w-screen-md justify-center">
      {children}
    </Container>
  );
};

export default Layout;
