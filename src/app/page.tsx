import { Navbar } from "@/components/ui/Navbar";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/sections/Hero";
import { TextureSplit } from "@/components/sections/TextureSplit";
import { TheComparison } from "@/components/sections/TheComparison";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  // Fetch products from Shopify Storefront API
  const products = await getProducts();

  return (
    <main className="min-h-screen flex flex-col w-full relative">
      <Navbar />
      <Marquee />
      <Hero />
      <TextureSplit />
      <TheComparison />
      <CollectionGrid products={products} />
      <TestimonialGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
