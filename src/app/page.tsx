import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Generator from "@/components/Generator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <header>
        <h1 className="fixed top--0 left-0 right-0  border-b border-black py-4 text-center text-4xl font-bold">
          LinkedIn Genius
        </h1>
      </header>
      <Generator />
    </main>
  );
}
