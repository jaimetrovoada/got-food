import Button from "@/components/Button";
import Container from "@/components/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex items-center justify-center">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button as={Link} href="/">
            Go back home
          </Button>
        </div>
      </div>
    </Container>
  );
}
