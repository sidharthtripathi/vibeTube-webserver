import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/theme-provider"
import { DropdownMenuContent,DropdownMenu,DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MountainIcon } from "@/components/ui/MountainIcon";
import { Toaster } from "@/components/ui/toaster";
import { SearchBox } from "@/components/ui/SearchBox";
import { headers } from "next/headers";
import Head from "next/head";
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
  const username = headers().get("username")
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
        <ThemeProvider attribute="class" defaultTheme="dark">
        <section className="container mx-auto">
        <header className="flex justify-between items-center p-4  sticky top-0 z-10 bg-card ">
          <Link href={"/"}>
            <MountainIcon/>
          </Link>
          
          <nav className="space-x-8 flex items-center">
          <SearchBox/>
          <Link href="/subscriptions" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Subscriptions
          </Link>
          <Link href="/playlist" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Playlist
          </Link>
          {
            username ? 
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="size-8">
                  
                   <AvatarFallback>{username.slice(0,2).toUpperCase()}</AvatarFallback>
                 </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={"/upload"}>upload</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link prefetch = {false} href="/api/logout">logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : 
          <Link href="/join" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          join
        </Link>
          }
          
          </nav>
        </header>
        {children}
        <Toaster/>
        </section>
        </ThemeProvider>
        </body>
    </html>
  );
}
