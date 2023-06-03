import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Skeleton from "@/components/Skeleton";
import { ArrowUp } from "react-feather";

const Loading = () => {
  return (
    <Container className="relative overflow-hidden p-4">
      <section className="mb-24 flex flex-col gap-4 overflow-hidden">
        <div className="grid w-full flex-1 grid-flow-row grid-cols-1 gap-2 overflow-auto p-2 pb-4 scrollbar md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="flex flex-row items-center justify-between gap-2 p-2">
            <Skeleton className="h-full w-1/3 rounded-2xl" />
            <div className="flex flex-1 flex-col gap-2 p-2">
              <Skeleton className="h-4 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </Card>
          <Card className="flex flex-row items-center justify-between gap-2 p-2">
            <Skeleton className="h-full w-1/3 rounded-2xl" />
            <div className="flex flex-1 flex-col gap-2 p-2">
              <Skeleton className="h-4 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </Card>
          <Card className="flex flex-row items-center justify-between gap-2 p-2">
            <Skeleton className="h-full w-1/3 rounded-2xl" />
            <div className="flex flex-1 flex-col gap-2 p-2">
              <Skeleton className="h-4 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </Card>
          <Card className="flex flex-row items-center justify-between gap-2 p-2">
            <Skeleton className="h-full w-1/3 rounded-2xl" />
            <div className="flex flex-1 flex-col gap-2 p-2">
              <Skeleton className="h-4 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </Card>
        </div>
      </section>
      <section
        className="container fixed left-1/2 bottom-0 z-10 flex h-20 w-full -translate-x-1/2 flex-col rounded-t-2xl border-2 border-b-0 border-black/50 bg-white 
         transition-all
      "
      >
        <div className="relative flex h-full flex-col p-4">
          <Button className="absolute -top-4 left-1/2 flex h-8 w-8 translate-x-1/2 items-center justify-center">
            <ArrowUp />
          </Button>
          <h1 className="text-lg font-bold">Total = $0</h1>
        </div>
      </section>
    </Container>
  );
};

export default Loading;
