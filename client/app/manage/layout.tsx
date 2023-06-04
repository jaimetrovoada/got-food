import Container from "@/components/Container";
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}
