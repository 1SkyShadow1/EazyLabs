
import { useEffect, useRef } from 'react';

interface BinaryColumn {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  characters: string[];
  fadeStart: number;
  type: 'binary' | 'chinese';
}

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const columnsRef = useRef<BinaryColumn[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize columns with Matrix characters
      const columnWidth = 20;
      const columnCount = Math.floor(canvas.width / columnWidth);
      columnsRef.current = [];
      
      for (let i = 0; i < columnCount; i++) {
        columnsRef.current.push({
          x: i * columnWidth,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.3,
          characters: generateMatrixString(),
          fadeStart: 0,
          type: Math.random() > 0.5 ? 'binary' : 'chinese'
        });
      }
    };

    const generateMatrixString = () => {
      const binaryChars = ['0', '1'];
      const chineseChars = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ン', '田', '中', '山', '木', '水', '火', '土', '金', '電'];
      const chars = Math.random() > 0.6 ? binaryChars : chineseChars;
      const length = Math.floor(Math.random() * 20) + 10;
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]);
    };

    const animate = () => {
      // Clear with slight fade for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columnsRef.current.forEach((column) => {
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'center';
        
        column.characters.forEach((char, index) => {
          const y = column.y + (index * 18);
          if (y > -30 && y < canvas.height + 50) {
            let brightness;
            let color;
            
            if (index === 0) {
              // Head - bright white
              brightness = 1;
              color = `rgba(255, 255, 255, ${column.opacity})`;
              ctx.shadowColor = 'rgba(255, 255, 255, 1)';
              ctx.shadowBlur = 12;
            } else if (index < 3) {
              // Near head - bright green
              brightness = 0.95 - (index * 0.1);
              color = `rgba(0, 255, 65, ${column.opacity * brightness})`;
              ctx.shadowColor = 'rgba(0, 255, 65, 0.9)';
              ctx.shadowBlur = 8;
            } else if (index < 8) {
              // Mid section - medium green
              brightness = 0.8 - (index * 0.08);
              color = `rgba(0, 255, 65, ${column.opacity * brightness})`;
              ctx.shadowColor = 'rgba(0, 255, 65, 0.6)';
              ctx.shadowBlur = 4;
            } else {
              // Tail - darker green
              brightness = Math.max(0.1, 0.6 - (index * 0.04));
              color = `rgba(0, 200, 50, ${column.opacity * brightness})`;
              ctx.shadowColor = 'rgba(0, 200, 50, 0.3)';
              ctx.shadowBlur = 2;
            }
            
            ctx.fillStyle = color;
            ctx.fillText(char, column.x, y);
            ctx.shadowBlur = 0;
          }
        });

        // Move column down
        column.y += column.speed;

        // Reset when off screen
        if (column.y > canvas.height + column.characters.length * 18) {
          column.y = Math.random() * -800 - 100;
          column.speed = Math.random() * 2 + 0.5;
          column.opacity = Math.random() * 0.8 + 0.3;
          column.characters = generateMatrixString();
          column.type = Math.random() > 0.5 ? 'binary' : 'chinese';
        }

        // Random character changes (slower for better readability)
        if (Math.random() < 0.003) {
          const randomIndex = Math.floor(Math.random() * column.characters.length);
          const binaryChars = ['0', '1'];
          const chineseChars = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', '田', '中', '山'];
          const chars = column.type === 'binary' ? binaryChars : chineseChars;
          column.characters[randomIndex] = chars[Math.floor(Math.random() * chars.length)];
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        background: '#000000'
      }}
    />
  );
};
