import Container from "@/components/Container";
import { Loader } from "react-feather";

const Loading = () => {
  return (
    <Container className="flex h-full items-center justify-center">
      <Loader className="animate-spin" size={80} />
    </Container>
  );
};

export default Loading;
