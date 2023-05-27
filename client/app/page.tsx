import Button from "@/components/Button";
import Container from "@/components/Container";
import Link from "next/link";

const Page = async () => {
  return (
    <Container className="items-center justify-center gap-8">
      <div className="text-center">
        <p className="mb-4 text-3xl font-bold">
          Boost Your Restaurant&apos;s Success with Our Platform!
        </p>
        <p className="mx-auto w-full max-w-2xl text-xl text-gray-700">
          Elevate customer experience by offering direct food ordering through
          our user-friendly app. Maximize convenience, streamline operations,
          and expand your reach. Join us today and revolutionize your
          restaurant&apos;s growth!
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <Button as={Link} href="/restaurants">
          Explore
        </Button>
        <Button as={Link} variant="secondary" href="/auth/register">
          Sign Up
        </Button>
      </div>
    </Container>
  );
};

export default Page;
