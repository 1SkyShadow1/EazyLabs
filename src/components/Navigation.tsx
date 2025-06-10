
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageTranslator } from "./LanguageTranslator";
import { CurrencyConverter } from "./CurrencyConverter";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "AI Estimator", href: "#estimator" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg bg-black/60 border-b border-green-400/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-orbitron font-bold text-green-400 matrix-glow"
          >
            EAZY<span className="text-white">LABS</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: '0 0 8px #00ff41'
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animation = 'matrix-glitch 0.5s ease-in-out';
                }}
                onAnimationEnd={(e) => {
                  e.currentTarget.style.animation = '';
                }}
                className="liquid-glass-nav font-rajdhani font-medium text-green-300 hover:text-green-400 transition-all duration-300 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-400/20 hover:border-green-400/50 relative overflow-hidden group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-green-400/5 animate-liquid-glass"></div>
              </motion.a>
            ))}
          </div>

          {/* AI Features */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="no-translate">
              <CurrencyConverter />
            </div>
            <div className="no-translate">
              <LanguageTranslator />
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-green-400 backdrop-blur-sm bg-green-400/10 border border-green-400/30 p-2 rounded-lg hover:bg-green-400/20 transition-all liquid-glass-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4 backdrop-blur-lg bg-black/80 rounded-lg mb-4 border border-green-400/30"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-green-300 hover:text-green-400 transition-colors duration-300 px-4 py-2 hover:bg-green-400/10 rounded font-rajdhani font-medium"
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile AI Features */}
            <div className="px-4 space-y-4 border-t border-green-400/20 pt-4 no-translate">
              <div className="flex flex-col space-y-2">
                <span className="text-green-400 text-sm font-tech">CURRENCY</span>
                <CurrencyConverter />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-green-400 text-sm font-tech">LANGUAGE</span>
                <LanguageTranslator />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .matrix-glow {
          text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41;
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        
        .liquid-glass-nav {
          backdrop-filter: blur(10px);
          background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 255, 65, 0.05));
          border: 1px solid rgba(0, 255, 65, 0.2);
          transition: all 0.3s ease;
        }
        
        .liquid-glass-nav:hover {
          backdrop-filter: blur(15px);
          background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 65, 0.1));
          border: 1px solid rgba(0, 255, 65, 0.4);
          box-shadow: 0 8px 32px rgba(0, 255, 65, 0.2);
        }
        
        @keyframes pulse-glow {
          from { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41; }
          to { text-shadow: 0 0 15px #00ff41, 0 0 25px #00ff41, 0 0 35px #00ff41; }
        }
      `}</style>
    </motion.nav>
  );
};
