"use client";

import { motion } from "framer-motion";

export function TextureSplit() {
  return (
    <section className="w-full bg-pure-white py-24 lg:py-32 overflow-hidden border-t border-charcoal/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Macro Texture Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative aspect-square lg:aspect-[4/5] bg-light-surf rounded-3xl overflow-hidden group"
          >
            {/* Visual representation of "porous texture" since we don't have a real macro asset yet */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-light-surf to-charcoal/5"></div>
            
            {/* Dots to mimic porosity/airiness */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #8E8E8E 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.2
              }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="text-charcoal/30 tracking-widest text-sm font-medium uppercase font-display">Macro Texture Element</span>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="flex-1 space-y-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-charcoal leading-tight">
                Löst sich <br /> im Mund auf.
              </h2>
            </motion.div>
            
            <div className="space-y-6 pt-4">
              {[
                "Lotus Samen poppen unter Druck und Hitze – ganz ohne Öl.",
                "Das Ergebnis ist eine offenporige Struktur, die buchstäblich auf der Zunge zergeht.",
                "Weniger Kalorien, kein Beschweren, das beste Kauerlebnis deines Lebens."
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                  className="text-lg lg:text-xl text-charcoal/70"
                >
                  {text}
                </motion.p>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
