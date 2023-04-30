import Button from "@/components/Button";
import Container from "@/components/Container";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="flex h-full items-center justify-center">
      <Button as={Link} href={"/restaurants"}>
        Explore
      </Button>
    </Container>
  );
}
