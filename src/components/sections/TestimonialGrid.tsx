"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Endlich ein Snack, nach dem ich mich nicht voll und träge fühle. Edelpop ist mein neuer Go-To fürs Home Office.",
    author: "Sarah M.",
    bgClass: "bg-salt-pepper/10",
  },
  {
    quote: "Die Konsistenz ist unglaublich! Es kracht am Anfang und dann schmilzt es einfach dahin. Besser als Popcorn.",
    author: "Jonas K.",
    bgClass: "bg-cheese-herbs/10",
  },
  {
    quote: "Caramel ist der Wahnsinn. Ich habe direkt die Family Box bestellt, weil die erste Tüte nach 10 Minuten leer war.",
    author: "Lisa T.",
    bgClass: "bg-caramel/10",
  },
];

export function TestimonialGrid() {
  return (
    <section className="w-full bg-light-surf py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-display font-bold text-charcoal uppercase tracking-wide"
          >
            REAL SNACKING MOMENTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-charcoal/60"
          >
            Don't just take our word for it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`p-10 rounded-3xl ${t.bgClass} flex flex-col h-full items-start relative overflow-hidden`}
            >
              {/* Quote Mark */}
              <div className="absolute top-4 right-8 text-[120px] font-serif text-charcoal/5 leading-none select-none">
                "
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-cheese-herbs text-cheese-herbs" />
                ))}
              </div>
              
              <p className="text-xl font-medium text-charcoal leading-relaxed mb-8 flex-1 relative z-10">
                "{t.quote}"
              </p>
              
              <div className="font-display font-bold tracking-widest text-sm text-charcoal/70 uppercase">
                {t.author}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
