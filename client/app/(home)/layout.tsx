import "@/styles/globals.css";
import { Inter } from "next/font/google";

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
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-screen flex-col overflow-hidden bg-zinc-900 text-slate-200"
        }
      >
        <header className="">
          <nav className="container mx-auto flex flex-row items-center gap-2 px-4 py-2 xl:px-0">
            <h1 className="text-3xl font-bold uppercase">got food?</h1>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Got Food",
  description: "got food app - no hassle food ordering",
};
