import Button from "@/components/Button";
import Container from "@/components/Container";
import restaurantsService from "@/services/restaurantsService";
import Link from "next/link";
import React from "react";

const Page = async () => {
  return (
    <Container className="flex h-full items-center justify-center">
      <Button as={Link} href={"/restaurants"}>
        Explore
      </Button>
    </Container>
  );
};

export default Page;
