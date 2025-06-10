import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EazyLabsLogo from '../../public/EazyLabs logo.png';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Glassmorphism overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <img
          src={EazyLabsLogo}
          alt="EazyLabs Logo"
          className="mx-auto mb-6 max-w-xs md:max-w-sm drop-shadow-[0_0_30px_rgba(0,255,65,0.7)]"
          style={{ filter: 'brightness(1.2) drop-shadow(0 0 20px #00ff41)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent drop-shadow-2xl font-orbitron">
              EVANS NCUBE
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-green-300 max-w-3xl mx-auto drop-shadow-lg font-rajdhani font-medium"
          >
            Multilingual Full-Stack Developer crafting next-generation digital experiences
            with AI-powered solutions and immersive design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => {
                const button = document.querySelector('.matrix-button-1') as HTMLElement;
                if (button) button.style.animation = 'matrix-glitch 0.5s ease-in-out';
              }}
            >
              <Button
                size="lg"
                className="matrix-button-1 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black px-8 py-3 rounded-lg font-orbitron font-bold transform transition-all duration-300 shadow-2xl shadow-green-400/50 hover:shadow-green-400/75 liquid-glass-button"
              >
                <a href="#portfolio">VIEW MY WORK</a>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => {
                const button = document.querySelector('.matrix-button-2') as HTMLElement;
                if (button) button.style.animation = 'matrix-glitch 0.5s ease-in-out';
              }}
            >
              <Button
                variant="outline"
                size="lg"
                className="matrix-button-2 border-green-400 text-green-400 hover:bg-green-400/10 hover:text-green-300 px-8 py-3 rounded-lg font-orbitron font-bold transform transition-all duration-300 backdrop-blur-sm bg-black/20 shadow-2xl hover:shadow-green-400/25 liquid-glass-button"
              >
                <a href="#estimator">GET PROJECT ESTIMATE</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="text-green-300 mt-12 backdrop-blur-sm bg-black/20 rounded-lg p-6 mx-auto max-w-2xl border border-green-400/20 liquid-glass-card"
          >
            <p className="mb-2 font-space">Python • JavaScript • TypeScript • C • C++ • Java • SQL • React • Node.js • Django • Flask • Express • MongoDB • PostgreSQL • Docker • Kubernetes • AWS • Git</p>
            <p className="font-exo">Background in Hospitality • Marketing • Visual Arts</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-green-400 drop-shadow-lg" size={32} />
        </motion.div>
      </motion.div>

      <style>{`
        .liquid-glass-button {
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 65, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .liquid-glass-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .liquid-glass-button:hover::before {
          left: 100%;
        }
        
        .liquid-glass-card {
          backdrop-filter: blur(15px);
          background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 255, 65, 0.05));
          border: 1px solid rgba(0, 255, 65, 0.2);
          transition: all 0.3s ease;
        }
        
        .liquid-glass-card:hover {
          backdrop-filter: blur(20px);
          background: linear-gradient(135deg, rgba(0, 255, 65, 0.15), rgba(0, 255, 65, 0.08));
          border: 1px solid rgba(0, 255, 65, 0.3);
          box-shadow: 0 8px 32px rgba(0, 255, 65, 0.2);
        }
      `}</style>
    </section>
  );
};
