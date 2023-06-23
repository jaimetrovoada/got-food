import "@/styles/globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { getUser } from "@/lib/auth.service";
import Header from "@/components/Header";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-dynamic flex-col bg-zinc-900 text-slate-200"
        }
      >
        <Providers>
          <Header user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Got Food",
  description: "got food app - no hassle food ordering",
};
