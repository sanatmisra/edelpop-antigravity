import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edelpop | Besser als Popcorn!",
  description: "Knusprig, dann zart. Kein fettiges Nachgefühl. Das beste Kauerlebnis deines Lebens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${montserrat.variable} antialiased selection:bg-cheese-herbs/30`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
