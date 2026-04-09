import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getProduct } from "@/lib/shopify";
import { ProductDetails } from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";

// Since we moved specific mockups, let's map them simply by handle.
const IMAGE_MAPPINGS: Record<string, string[]> = {
  "caramel": [
    "/images/products/EdelPop-Packaging-mockup-front-caramel.png",
    "/images/products/EdelPop-Packaging-mockup-back-caramel.png",
    "/images/products/EdelPop-Packaging-mockup-caramel.jpg",
    "/images/products/caramel-front.png",
    "/images/products/caramel-back.png"
  ],
  "cheese-herb": [
    "/images/products/EdelPop-Packaging-mockup-front-cheese-herb.png",
    "/images/products/EdelPop-Packaging-mockup-back-cheese-herb.png",
    "/images/products/EdelPop-Packaging-mockup-cheese-_-herb.jpg",
    "/images/products/cheese-herbs-front.png",
    "/images/products/cheese-herbs-back.png"
  ],
  "salt-pepper": [
    "/images/products/EdelPop-Packaging-mockup-front-saltpepper.png",
    "/images/products/EdelPop-Packaging-mockup-back-salt-pepper.png",
    "/images/products/EdelPop-Packaging-mockup-salt-_-pepper.jpg",
    "/images/products/salt-pepper-front.png",
    "/images/products/salt-pepper-back.png"
  ]
};

// Fallback handles mapping slightly different Shopify handles to our local keys
const resolveLocalHandle = (handle: string) => {
  if (handle.includes("salt")) return "salt-pepper";
  if (handle.includes("cheese")) return "cheese-herb";
  if (handle.includes("caramel")) return "caramel";
  return "salt-pepper"; // default fallback
};

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  
  // Try fetching from Shopify
  const product = await getProduct(resolvedParams.handle);
  
  // If product missing and we're not mimicking one of the 3 main flavors, return 404
  if (!product && !IMAGE_MAPPINGS[resolveLocalHandle(resolvedParams.handle)]) {
    notFound();
  }

  const localKey = resolveLocalHandle(resolvedParams.handle);
  const localImages = IMAGE_MAPPINGS[localKey] || IMAGE_MAPPINGS["salt-pepper"];

  return (
    <main className="min-h-screen flex flex-col w-full relative">
      <div className="bg-pure-white/80 backdrop-blur-md border-b border-charcoal/5 h-16 w-full fixed top-0 z-40" />
      <Navbar />
      
      <div className="flex-1 pt-16">
        <ProductDetails product={product} handle={resolvedParams.handle} localImages={localImages} />
      </div>

      <Footer />
    </main>
  );
}
