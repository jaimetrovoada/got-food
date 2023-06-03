import Card from "@/components/Card";
import Container from "@/components/Container";
import Skeleton from "@/components/Skeleton";

const Loading = () => {
  return (
    <Container className="flex flex-col gap-8 pt-4">
      <div>
        <p className="mb-4 text-3xl font-bold capitalize">
          what&apos;s trending
        </p>
      </div>
      <div>
        <p className="mb-4 text-3xl font-bold">All</p>
        <section className="grid flex-1 grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group flex flex-col items-start justify-between shadow-lg">
            <Skeleton className="h-40 w-full rounded-t-2xl" />
            <div className="flex w-full flex-col gap-4 px-4 py-2">
              <Skeleton className="h-4 w-1/3 rounded-2xl" />

              <div className="flex flex-col gap-4 px-3">
                <Skeleton className="h-4 w-1/4 rounded-2xl" />
                <Skeleton className="h-12 w-full rounded-2xl" />
              </div>
            </div>
          </Card>
          <Card className="group flex flex-col items-start justify-between shadow-lg">
            <Skeleton className="h-40 w-full rounded-t-2xl" />
            <div className="flex w-full flex-col gap-4 px-4 py-2">
              <Skeleton className="h-4 w-1/3 rounded-2xl" />

              <div className="flex flex-col gap-4 px-3">
                <Skeleton className="h-4 w-1/4 rounded-2xl" />
                <Skeleton className="h-12 w-full rounded-2xl" />
              </div>
            </div>
          </Card>
          <Card className="group flex flex-col items-start justify-between shadow-lg">
            <Skeleton className="h-40 w-full rounded-t-2xl" />
            <div className="flex w-full flex-col gap-4 px-4 py-2">
              <Skeleton className="h-4 w-1/3 rounded-2xl" />

              <div className="flex flex-col gap-4 px-3">
                <Skeleton className="h-4 w-1/4 rounded-2xl" />
                <Skeleton className="h-12 w-full rounded-2xl" />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
};

export default Loading;
