import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex items-center justify-center">
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p className="text-lg">
        The page you&apos;re trying to access doesn&apos;t exist
      </p>
    </Container>
  );
}
