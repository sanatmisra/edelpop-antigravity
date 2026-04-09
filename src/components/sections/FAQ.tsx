"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Was sind Lotus Samen und woher kommen sie?",
    answer: "Lotus Samen sind die essbaren Samen der Wasserlilie. Wir beziehen unsere Samen aus nachhaltigem Anbau in Indien, wo sie seit Jahrhunderten als wertvolles Nahrungsmittel geschätzt werden. Sie werden vorsichtig geerntet und in der Sonne getrocknet.",
  },
  {
    question: "Warum ist Edelpop besser als Popcorn?",
    answer: "Im Gegensatz zu Mais-Popcorn haben Lotus Samen keine harten Schalen, die in den Zähnen hängen bleiben. Wenn sie gepoppt werden, entsteht eine viel feinere, offenporige Struktur, die sich sanft im Mund auflöst. Außerdem poppen wir ohne Öl, was Edelpop besonders leicht macht.",
  },
  {
    question: "Sind eure Snacks vegan und glutenfrei?",
    answer: "Ja! Alle unsere aktuellen Sorten sind 100% vegan, glutenfrei und frei von Palmöl. Wir verwenden ausschließlich natürliche Gewürze und Zutaten.",
  },
  {
    question: "Wie lange dauern der Versand und die Lieferung?",
    answer: "Innerhalb Deutschlands versenden wir in der Regel innerhalb von 1-3 Werktagen. Bei den Family Boxen und Variety Packs ist der Versand für dich komplett kostenlos.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-pure-white py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal mb-4">
            Du fragst, wir antworten.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-charcoal/10 pb-4"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                >
                  <span className="text-lg lg:text-xl font-medium text-charcoal group-hover:text-charcoal/70 transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 ml-4 rounded-full p-2 bg-light-surf text-charcoal/50 group-hover:text-charcoal transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-charcoal/70 text-lg leading-relaxed pt-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
