"use server";

import { createCart } from "@/lib/shopify";

export async function createCheckoutAction(items: any[]) {
  if (!items || items.length === 0) {
    return { error: "Cart is empty" };
  }

  // Map react-use-cart items to Shopify CartInput lines
  // We need variant IDs (merchandiseId). 
  // In our app, we stored the variant ID in 'item.id'
  const lines = items.map((item) => ({
    merchandiseId: item.id,
    quantity: item.quantity,
  }));

  try {
    const checkoutUrl = await createCart(lines);
    
    if (!checkoutUrl) {
      return { error: "Failed to create checkout session" };
    }

    return { url: checkoutUrl };
  } catch (error) {
    console.error("Checkout action error:", error);
    return { error: "An unexpected error occurred during checkout" };
  }
}
