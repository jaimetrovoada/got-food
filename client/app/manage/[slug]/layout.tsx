import ManageLayout from "@/components/ManageLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <ManageLayout>{children}</ManageLayout>;
}
