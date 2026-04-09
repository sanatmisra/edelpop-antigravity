"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "react-use-cart";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Fallback data if Shopify products fail to load or are empty
const FALLBACK_PRODUCTS = [
  {
    id: "prod_salt_pepper",
    title: "Salt & Pepper",
    price: 3.50,
    accent: "bg-salt-pepper",
    borderHover: "hover:border-salt-pepper/50",
    shadowHover: "hover:shadow-salt-pepper/10",
    descriptors: ["Würzig", "Klassisch", "Leicht"],
    image: "/images/products/EdelPop-Packaging-mockup-front-saltpepper.png",
    handle: "salt-pepper"
  },
  {
    id: "prod_cheese_herbs",
    title: "Cheese & Herbs",
    price: 3.50,
    accent: "bg-cheese-herbs",
    borderHover: "hover:border-cheese-herbs/50",
    shadowHover: "hover:shadow-cheese-herbs/10",
    descriptors: ["Cremig", "Würzig", "Herzhaft"],
    image: "/images/products/EdelPop-Packaging-mockup-front-cheese-herb.png",
    handle: "cheese-herb"
  },
  {
    id: "prod_caramel",
    title: "Caramel",
    price: 3.50,
    accent: "bg-caramel",
    borderHover: "hover:border-caramel/50",
    shadowHover: "hover:shadow-caramel/10",
    descriptors: ["Süß", "Knusprig", "Zartschmelzend"],
    image: "/images/products/EdelPop-Packaging-mockup-front-caramel.png",
    handle: "caramel"
  },
];

export function CollectionGrid({ products = [] }: { products?: any[] }) {
  const { addItem } = useCart();
  
  // Map Shopify products to UI data, or use fallback
  const displayProducts = products.length > 0 ? products.slice(0, 3).map((p, i) => ({
    id: p.variants.edges[0]?.node?.id || p.id,
    title: p.title,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    accent: FALLBACK_PRODUCTS[i % 3].accent,
    borderHover: FALLBACK_PRODUCTS[i % 3].borderHover,
    shadowHover: FALLBACK_PRODUCTS[i % 3].shadowHover,
    descriptors: FALLBACK_PRODUCTS[i % 3].descriptors,
    image: p.featuredImage?.url,
    handle: p.handle || FALLBACK_PRODUCTS[i % 3].handle
  })) : FALLBACK_PRODUCTS;

  return (
    <section id="flavors" className="w-full bg-pure-white py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-display font-bold text-charcoal"
          >
            Unsere Flavors.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg text-charcoal/60 max-w-md md:text-right"
          >
            Entdecke die Vielfalt von Edelpop. 100% natürliche Zutaten, 0% schlechtes Gewissen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, i) => (
            <Link href={`/product/${product.handle}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={cn(
                  "group relative bg-light-surf rounded-[2.5rem] p-8 transition-all duration-500 border border-transparent shadow-sm",
                  product.borderHover,
                  product.shadowHover,
                  "hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center h-full"
                )}
              >
                <div className="w-full aspect-[4/5] bg-pure-white rounded-3xl mb-8 relative overflow-hidden flex items-center justify-center">
                   {/* Product Image */}
                   <div className={cn("absolute inset-0 opacity-5", product.accent)}></div>
                   {product.image ? (
                     <img src={product.image} alt={product.title} className="z-10 w-[80%] h-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                   ) : (
                     <div className="z-10 font-display font-bold text-charcoal/20 tracking-widest text-2xl uppercase transform -rotate-12">
                       {product.title} Pack
                     </div>
                   )}
                   
                   {/* Quick Add Button (Visible on hover) */}
                   <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                     <button 
                       onClick={(e) => {
                         e.preventDefault(); // Prevent Link navigation
                         e.stopPropagation();
                         addItem({
                           id: product.id,
                           price: product.price,
                           name: product.title,
                           title: product.title,
                           image: product.image
                         });
                       }}
                       className="bg-charcoal text-pure-white py-3 px-6 rounded-full flex items-center gap-2 font-medium hover:bg-black transition-colors w-full justify-center shadow-xl"
                     >
                       <Plus className="w-5 h-5" /> Add to Cart
                     </button>
                   </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-charcoal mb-2">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-charcoal/50 mb-4 h-6">
                  {product.descriptors.map((desc: string, j: number) => (
                    <span key={j} className="flex items-center">
                      {desc}
                      {j < product.descriptors.length - 1 && <span className="mx-2">·</span>}
                    </span>
                  ))}
                </div>
                
                <span className="font-mono font-medium text-charcoal text-lg mt-auto">
                  €{product.price.toFixed(2)}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
