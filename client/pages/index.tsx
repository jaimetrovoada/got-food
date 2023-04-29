import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <Button as={Link} href={"/restaurants"}>
        Explore
      </Button>
    </div>
  );
}
