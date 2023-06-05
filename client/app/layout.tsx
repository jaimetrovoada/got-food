import "@/styles/globals.css";
import { Providers } from "./providers";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import { getUser } from "@/lib/auth";
import Header from "@/components/Header";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <Header user={user} />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Got Food",
  description: "got food app - no hassle food ordering",
};
