"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparisonData = [
  {
    conventional: "Fettig & Schwer",
    edelpop: "Völlig fettfrei gepoppt",
  },
  {
    conventional: "Oft mit Palmöl",
    edelpop: "100% ohne Palmöl",
  },
  {
    conventional: "Bleibt in den Zähnen hängen",
    edelpop: "Löst sich sanft im Mund auf",
  },
  {
    conventional: "Schweres Gefühl danach",
    edelpop: "Leicht, luftig, satisfying",
  },
];

export function TheComparison() {
  return (
    <section className="w-full bg-light-surf py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-display font-bold text-charcoal"
          >
            Die reine Wahrheit.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-charcoal/60"
          >
            Warum wir besser als traditionelles Popcorn sind.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Conventional */}
          <div className="space-y-8 p-10 bg-pure-white rounded-3xl border border-charcoal/5 shadow-sm">
            <h3 className="text-xl font-display font-bold text-charcoal/50 uppercase tracking-widest text-center mb-10">
              Konventionell
            </h3>
            
            <ul className="space-y-8">
              {comparisonData.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-charcoal/60"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium text-lg">{item.conventional}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Edelpop */}
          <div className="space-y-8 p-10 bg-pure-white rounded-3xl border-2 border-cheese-herbs/20 shadow-xl shadow-cheese-herbs/5 relative">
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-cheese-herbs text-pure-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                Der Edelpop Weg
              </span>
            </div>
            <h3 className="text-xl font-display font-bold text-charcoal uppercase tracking-widest text-center mt-2 mb-10">
              Edelpop
            </h3>
            
            <ul className="space-y-8">
              {comparisonData.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-charcoal"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium text-lg">{item.edelpop}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
