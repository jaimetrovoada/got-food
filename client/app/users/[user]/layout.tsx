import UserLayout from "@/components/UserLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <UserLayout>{children}</UserLayout>;
}
