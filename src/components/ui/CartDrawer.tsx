"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "react-use-cart";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { createCheckoutAction } from "@/app/actions/checkout";
import { Loader2 } from "lucide-react";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createCheckoutAction(items);
      
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result.url) {
        // Redirect to Shopify checkout
        window.location.href = result.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-pure-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <h2 className="text-xl font-display font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart {totalUniqueItems > 0 && `(${totalUniqueItems})`}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-light-surf rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-charcoal/50 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="font-medium">Your cart is empty.</p>
                  <Button onClick={onClose} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-2xl bg-light-surf/50">
                      <div className="w-20 h-20 bg-pure-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain p-2" />
                        ) : (
                          <div className="w-full h-full bg-charcoal/5" />
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-sm">{item.title}</h3>
                            <p className="text-xs text-charcoal/50 mt-1">{item.variantDetails}</p>
                          </div>
                          <span className="font-medium font-mono text-sm leading-none mt-1">
                            €{((item.price * (item.quantity ?? 1))).toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-pure-white rounded-full border border-charcoal/10 px-2 py-1 shadow-sm">
                            <button 
                              onClick={() => updateItemQuantity(item.id, (item.quantity ?? 1) - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-light-surf rounded-full transition-colors font-medium text-lg leading-none"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateItemQuantity(item.id, (item.quantity ?? 1) + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-light-surf rounded-full transition-colors font-medium text-lg leading-none"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-charcoal/40 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="p-6 border-t border-charcoal/10 bg-light-surf/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-charcoal/70">Subtotal</span>
                  <span className="text-xl font-bold font-mono">€{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-charcoal/50 text-center mb-6">
                  Shipping & taxes calculated at checkout.
                </p>
                {error && (
                  <p className="text-sm text-red-500 text-center mb-4 font-medium">{error}</p>
                )}
                <Button 
                  className="w-full text-lg shadow-xl shadow-charcoal/5" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    "Checkout via Shopify"
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
