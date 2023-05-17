import { CardSkeleton } from "@/components/Card";
import Container from "@/components/Container";

const Loading = () => {
  return (
    <Container className="flex flex-col gap-4 p-2">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </Container>
  );
};

export default Loading;
