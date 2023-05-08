import Container from "@/components/Container";

const Loading = () => {
  return (
    <Container className="flex items-center justify-center">
      <span className="animate-spin text-3xl font-bold">loading...</span>
    </Container>
  );
};

export default Loading;
