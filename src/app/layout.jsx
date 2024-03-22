import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rendimientos",
  description: "Lectura de Rendimientos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
