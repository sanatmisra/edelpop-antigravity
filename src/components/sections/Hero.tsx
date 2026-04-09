"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";

const videos = [
  "/videos/Bag_pours_makhana_202604092232.mp4",
  "/videos/Flavors_drifting_in_202604092241.mp4", 
];

export function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 6000); // Wait 6 seconds before changing video
    return () => clearInterval(interval);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-16 bg-charcoal">
      
      {/* Video Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.video
            key={currentVideoIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            src={videos[currentVideoIndex]}
            autoPlay
            loop
            muted
            playsInline
          />
        </AnimatePresence>
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center pb-20">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="overflow-hidden">
            <motion.h1 
              variants={titleVariants}
              className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]"
            >
              KNUSPRIG.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              variants={titleVariants}
              className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]"
            >
              LUFTIG. EDEL.
            </motion.h1>
          </div>
          
          <motion.p
            variants={titleVariants}
            className="text-lg md:text-2xl font-medium text-white/80 max-w-2xl mx-auto mt-6"
          >
            Besser als Popcorn. Snacken ohne das schwere Gefühl danach.
          </motion.p>
          
          <motion.div variants={titleVariants} className="pt-8">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-12 py-5 text-xl font-display font-bold rounded-full bg-warm-red hover:bg-warm-red/90 text-pure-white transition-all shadow-2xl shadow-warm-red/20 hover:scale-105 active:scale-95"
            >
              SHOP OUR FLAVORS
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentVideoIndex(i)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                i === currentVideoIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
