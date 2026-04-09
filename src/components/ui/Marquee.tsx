"use client";

import { motion } from "framer-motion";

const textToRepeat = "✨ LIGHTER THAN AIR · 🌱 NO PALM OIL · 🍿 BESSER ALS POPCORN · 🚚 FREE SHIPPING ON BUNDLES · ";

export function Marquee() {
  return (
    <div className="w-full mt-16 overflow-hidden bg-light-surf py-3 border-y border-charcoal/5 flex items-center whitespace-nowrap relative z-10">
      <motion.div
        className="flex space-x-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <span className="text-sm font-medium tracking-widest text-charcoal/80 uppercase shrink-0">
          {textToRepeat.repeat(4)}
        </span>
      </motion.div>
    </div>
  );
}
