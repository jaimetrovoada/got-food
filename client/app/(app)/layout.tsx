import "@/app/globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { getUser } from "@/lib/auth.service";
import AppUi from "@/components/AppUi";
import { getClasses } from "@/lib/helpers";

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
    <html lang="en" className="overflow-hidden">
      <body
        className={getClasses(
          "container mx-auto h-screen overflow-hidden bg-zinc-900 text-slate-200",
          inter.className
        )}
      >
        <Providers>
          <AppUi user={user}>{children}</AppUi>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Got Food",
  description: "got food app - no hassle food ordering",
};

export const dynamic = "force-dynamic";
