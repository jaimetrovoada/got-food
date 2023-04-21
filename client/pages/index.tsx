import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button as={Link} href={"/restaurants"}>
        Explore
      </Button>
    </>
  );
}
