"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useCart } from "react-use-cart";
import { CartDrawer } from "./CartDrawer";
import { Button } from "./Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 h-16 z-40 transition-all duration-300 ease-in-out flex items-center px-6 lg:px-12",
          scrolled
            ? "bg-pure-white/80 backdrop-blur-md border-b border-charcoal/5 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-1">
            <a href="/" className="inline-block transition-transform hover:scale-105">
              <img src="/images/logo/logo-alternate.svg" alt="Edelpop Logo" className="h-[28px] md:h-8 w-auto" />
            </a>
          </div>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <a href="#flavors" className="text-sm font-medium hover:text-charcoal/60 transition-colors tracking-wide">
              FLAVORS
            </a>
            <a href="#story" className="text-sm font-medium hover:text-charcoal/60 transition-colors tracking-wide">
              OUR STORY
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-6 flex-1">
            <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-full text-xs tracking-wider">
              SHOP ALL
            </Button>
            
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-charcoal rounded-full" />
              )}
            </button>
          </div>

        </div>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
