import Button from "@/components/Button";
import Container from "@/components/Container";
import Link from "next/link";

const Page = async () => {
  return (
    <Container className="max-w-full items-center justify-center gap-8 text-slate-50">
      <div className="mx-auto max-w-2xl py-32 text-center sm:py-48 lg:py-56">
        <p className="text-4xl font-bold tracking-tight sm:text-6xl">
          Boost Your Restaurant&apos;s Success with Our Platform!
        </p>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          Elevate customer experience by offering direct food ordering through
          our user-friendly app. Maximize convenience, streamline operations,
          and expand your reach. Join us today and revolutionize your
          restaurant&apos;s growth!
        </p>
        <div className="mt-6 flex flex-row justify-center gap-4">
          <Button as={Link} href="/restaurants" variant="secondary">
            Explore
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Page;
