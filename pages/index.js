import Head from "next/head";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>NIKEX | Home</title>
        <link rel="icon" href="/nike-logo.png" />
      </Head>
      <main className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <ProductSection />
      </main>
    </>
  );
}
