import "@/styles/globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { getUser } from "@/lib/auth.service";
import userService from "@/lib/user.service";
import AppUi from "@/components/AppUi";

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
  const [res, err] = await userService.getRestaurants(user.id);
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-dynamic flex-col overflow-hidden bg-zinc-900 text-slate-200"
        }
      >
        <Providers>
          <AppUi user={user} restaurants={res}>{children}</AppUi>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Got Food",
  description: "got food app - no hassle food ordering",
};
