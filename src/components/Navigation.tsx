import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import EazyLabsLogo from '../../public/EazyLabs logo.png';

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
    { label: "Projects", href: "#portfolio" },
    { label: "AI Estimator", href: "#estimator" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#home"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={EazyLabsLogo} alt="EazyLabs Logo" className="h-12 w-auto" />
          </motion.a>

          <div className="hidden md:flex items-center space-x-6 ml-8">
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
          </motion.div>
        )}
      </div>
    </nav>
  );
};
