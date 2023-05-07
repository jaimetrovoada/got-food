import LayoutWrapper from "@/components/LayoutWrapper";
import "@/styles/globals.css";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Got Food",
  description: "got food app - no hassle food ordering",
};
