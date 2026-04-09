"use client";

import { useState } from "react";
import { useCart } from "react-use-cart";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetails({ product, handle, localImages }: { product: any, handle: string, localImages: string[] }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  // If Shopify returned no product, we use fallback data
  const title = product?.title || handle.replace("-", " ").toUpperCase();
  const price = product ? parseFloat(product.priceRange.minVariantPrice.amount) : 3.50;
  const description = product?.descriptionHtml || "<p>Knusprig, luftig, edel. Der perfekte Snack ohne schlechtes Gewissen.</p>";

  const handleAddToCart = () => {
    addItem({
      id: product?.id || `fallback_${handle}`,
      price: price,
      name: title,
      title: title,
      image: localImages[0]
    }, quantity);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* Left: Image Gallery */}
      <div className="space-y-6">
        <div className="aspect-square bg-light-surf rounded-[2.5rem] p-8 flex items-center justify-center relative overflow-hidden border border-charcoal/5 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={localImages[activeImage]}
              alt={`${title} Image ${activeImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </AnimatePresence>
        </div>
        
        {/* Thumbnails */}
        {localImages.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {localImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl bg-light-surf border-2 transition-all p-2 ${
                  idx === activeImage ? 'border-charcoal' : 'border-transparent hover:border-charcoal/20'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-center space-y-8">
        <div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-charcoal mb-4 text-balance">
            {title}
          </h1>
          <span className="text-2xl font-mono text-charcoal/70">
            €{price.toFixed(2)}
          </span>
        </div>

        <div 
          className="prose prose-lg text-charcoal/70 max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="pt-8 border-t border-charcoal/10 space-y-6">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-light-surf rounded-full border border-charcoal/10 px-4 py-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-pure-white rounded-full transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium w-6 text-center font-mono">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-pure-white rounded-full transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-charcoal/50">
              Inkl. MwSt.<br/>Versand wird im Checkout berechnet.
            </p>
          </div>

          <Button 
            size="lg" 
            className="w-full text-lg py-6 shadow-xl"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            In den Warenkorb
          </Button>

        </div>
      </div>
      
    </div>
  );
}
