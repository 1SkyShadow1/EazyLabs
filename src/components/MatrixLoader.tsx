
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const MatrixLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setTimeout(() => setShowText(true), 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const matrixChars = ['0', '1', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ'];
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-sm opacity-60"
            style={{
              left: `${(i * 2)}%`,
              animation: `matrixFall ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="block">
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-mono text-green-400 mb-4 glitch-text">
              INITIALIZING...
            </h1>
            <div className="text-green-300 font-mono text-lg">
              <div className="typing-text">ACCESSING NEURAL NETWORK</div>
              <div className="typing-text" style={{ animationDelay: '2s' }}>LOADING CONSCIOUSNESS</div>
              <div className="typing-text" style={{ animationDelay: '4s' }}>ENTERING THE MATRIX</div>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="text-green-400 font-mono mt-4">{progress}%</div>
      </div>

      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        .glitch-text {
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        .typing-text {
          animation: typing 3s steps(40, end) infinite;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid #4ade80;
        }
        
        @keyframes typing {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 0; }
        }
      `}</style>
    </div>
  );
};
