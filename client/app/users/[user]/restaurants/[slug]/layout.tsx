import UserRestaurantLayout from "@/components/UserRestaurantLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <UserRestaurantLayout>{children}</UserRestaurantLayout>;
}
