import "./globals.css";
import { Inter } from "@next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
