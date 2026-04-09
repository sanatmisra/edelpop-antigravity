export function Footer() {
  return (
    <footer className="w-full bg-charcoal text-pure-white py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-1">
            <div className="font-display font-bold text-2xl tracking-[0.2em]">
              EDELPOP
            </div>
            <p className="text-pure-white/60 text-sm leading-relaxed max-w-xs">
              Knusprig, luftig, edel. Wir revolutionieren das Snacking mit gepoppten Lotus Samen. Besser als Popcorn, leichter als Luft.
            </p>
          </div>
          
          {/* Shop */}
          <div className="space-y-6">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-pure-white/40">Shop</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Alle Flavors</a></li>
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Variety Packs</a></li>
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Family Boxen</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="space-y-6">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-pure-white/40">Unternehmen</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Unsere Story</a></li>
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          
          {/* Legal & Social */}
          <div className="space-y-6">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs text-pure-white/40">Rechtliches</h4>
            <ul className="space-y-4 mb-8">
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-sm text-pure-white/70 hover:text-white transition-colors">AGB</a></li>
            </ul>
            
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-charcoal transition-all text-xs font-bold w-10 h-10 flex items-center justify-center">
                IG
              </a>
              <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-charcoal transition-all text-xs font-bold w-10 h-10 flex items-center justify-center">
                X
              </a>
            </div>
          </div>

        </div>
        
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-pure-white/40">
          <p>© {new Date().getFullYear()} Edelpop GmbH. Alle Rechte vorbehalten.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ in Germany.</p>
        </div>

      </div>
    </footer>
  );
}
