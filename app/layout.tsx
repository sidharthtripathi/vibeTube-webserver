import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { MountainIcon } from "@/components/ui/MountainIcon";
import { Toaster } from "@/components/ui/toaster";
import { SearchBox } from "@/components/ui/SearchBox";
import { headers } from "next/headers";
import Head from "next/head";
import RecoilRoot from "@/state/RecoilRoot";
import { UserDropdown } from "@/components/UserDropdown";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeTube",
  description: "Youtube like app built using NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className={inter.className}>
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <section className="container mx-auto">
            <header className="flex justify-between items-center p-4  sticky top-0 z-10 bg-card ">
              <Link href={"/"}>
                <MountainIcon />
              </Link>

              <nav className="space-x-8 flex items-center">
                <SearchBox />
                <Link
                  href="/subscriptions"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Subscriptions
                </Link>
                <Link
                  href="/playlist"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Playlist
                </Link>
                <UserDropdown/>
              </nav>
            </header>
            {children}
            <Toaster />
          </section>
        </ThemeProvider>
        </RecoilRoot>
      </body>
      
    </html>
  );
}
