import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EazyLabsLogo from '../../public/EazyLabs logo.png';

export const MatrixWelcome = ({ onEnter }: { onEnter: () => void }) => {
  const [showButton, setShowButton] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showPills, setShowPills] = useState(false);
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);

  const welcomeText = 'WELCOME TO THE MATRIX';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < welcomeText.length) {
        setTypedText(welcomeText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        setTimeout(() => setShowButton(true), 1000);
        setTimeout(() => setShowPills(true), 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handlePillChoice = (pill: 'red' | 'blue') => {
    setSelectedPill(pill);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  const matrixChars = ['0', '1', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ'];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-y-auto">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-tech text-sm opacity-40"
            style={{
              left: `${(i * 3.33)}%`,
              animation: `matrixFall ${4 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 15 }).map((_, j) => (
              <div key={j} className="block leading-relaxed">
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Welcome Content */}
      <div className="relative z-10 text-center px-4 py-8 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
        <img
          src={EazyLabsLogo}
          alt="EazyLabs Logo"
          className="mx-auto mb-4 max-w-[200px] md:max-w-sm drop-shadow-[0_0_30px_rgba(0,255,65,0.7)]"
          style={{ filter: 'brightness(1.2) drop-shadow(0 0 20px #00ff41)' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 md:mb-16"
        >
          <h1 className="text-4xl md:text-8xl font-orbitron font-bold text-green-400 mb-4 md:mb-8 tracking-wider">
            {typedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="mb-8 md:mb-12"
          >
            <p className="text-lg md:text-2xl text-green-300 font-rajdhani mb-2 md:mb-4">
              INITIALIZING NEURAL INTERFACE...
            </p>
            <p className="text-base md:text-lg text-green-200 font-exo">
              PREPARE TO CHOOSE YOUR REALITY
            </p>
          </motion.div>
        </motion.div>

        {/* Pills Choice */}
        {showPills && !selectedPill && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-green-300 font-rajdhani text-base md:text-lg mb-6 md:mb-8">
              This is your last chance. After this, there is no going back.
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 items-center">
              {/* Red Pill */}
              <motion.div className="text-center">
                <motion.button
                  onClick={() => handlePillChoice('red')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 md:w-20 h-8 md:h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-lg hover:shadow-red-500/50 transition-all duration-300 animate-pill-glow border-2 border-red-400"
                >
                </motion.button>
                <p className="text-red-400 font-space text-sm mt-2 md:mt-4">RED PILL</p>
                <p className="text-red-300 font-exo text-xs">Truth & Reality</p>
              </motion.div>

              <div className="text-green-400 font-orbitron text-xl md:text-2xl">OR</div>

              {/* Blue Pill */}
              <motion.div className="text-center">
                <motion.button
                  onClick={() => handlePillChoice('blue')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 md:w-20 h-8 md:h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 animate-blue-pill-glow border-2 border-blue-400"
                >
                </motion.button>
                <p className="text-blue-400 font-space text-sm mt-2 md:mt-4">BLUE PILL</p>
                <p className="text-blue-300 font-exo text-xs">Blissful Ignorance</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Selected Pill Animation */}
        {selectedPill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className={`text-xl md:text-2xl font-orbitron mb-4 ${selectedPill === 'red' ? 'text-red-400' : 'text-blue-400'}`}>
              {selectedPill === 'red' ? 'WELCOME TO THE REAL WORLD' : 'RETURNING TO THE SIMULATION'}
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`w-12 md:w-16 h-6 md:h-8 mx-auto rounded-full ${selectedPill === 'red' ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-blue-500 to-blue-700'}`}
            />
          </motion.div>
        )}

        {/* Enter Button */}
        {showButton && !showPills && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            <button
              onClick={onEnter}
              className="group relative px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-orbitron font-bold text-black bg-gradient-to-r from-green-400 to-green-600 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/50"
            >
              <span className="relative z-10">ENTER THE MATRIX</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <p className="text-green-300 font-rajdhani text-xs md:text-sm mt-2 md:mt-4 opacity-70">
              Click to access the digital frontier
            </p>
          </motion.div>
        )}

        {/* Animated circles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-48 md:w-64 h-48 md:h-64 border border-green-400/20 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
