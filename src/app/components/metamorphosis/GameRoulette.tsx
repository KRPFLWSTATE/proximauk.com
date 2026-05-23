import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Dices } from 'lucide-react';

interface GameRouletteProps {
  onComplete: (game: 'wheel' | 'tap' | 'mystery') => void;
  targetGame?: 'wheel' | 'tap' | 'mystery'; // The game to land on
}

const GAMES = [
  { id: 'wheel' as const, name: 'Wheel of Fate', icon: '🎡', color: '#FF7A00' },
  { id: 'tap' as const, name: 'Tap Battle', icon: '⚡', color: '#8b5cf6' },
  { id: 'mystery' as const, name: 'Mystery Card', icon: '🎴', color: '#fbbf24' },
];

export function GameRoulette({ onComplete, targetGame }: GameRouletteProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    let intervalSpeed = 400; // Start slower (was 200ms)
    let elapsedTime = 0;
    const totalDuration = 4500; // Longer duration (was 3000ms)

    const interval = setInterval(() => {
      elapsedTime += intervalSpeed;
      
      if (elapsedTime >= totalDuration) {
        clearInterval(interval);
        setSpinning(false);
        
        // Select final game (use targetGame if provided, otherwise random)
        const finalGame = targetGame ? GAMES.find(g => g.id === targetGame)! : GAMES[Math.floor(Math.random() * GAMES.length)];
        setCurrentIndex(GAMES.findIndex(g => g.id === finalGame.id));
        
        setTimeout(() => {
          onComplete(finalGame.id);
        }, 1500); // Increased from 1000ms to showcase final selection longer
      } else {
        setCurrentIndex(prev => (prev + 1) % GAMES.length);
        
        // Gradually slow down over time for smoother effect
        if (elapsedTime > totalDuration * 0.7) {
          intervalSpeed = 800; // Very slow at the end
        } else if (elapsedTime > totalDuration * 0.5) {
          intervalSpeed = 600; // Medium slow
        } else if (elapsedTime > totalDuration * 0.3) {
          intervalSpeed = 500; // Slightly slower
        }
      }
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [onComplete, targetGame]);

  return (
    <div className="py-8 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ rotate: spinning ? 360 : 0 }}
          transition={{ duration: 1, repeat: spinning ? Infinity : 0, ease: 'linear' }}
          className="inline-block mb-4"
        >
          <Dices className="w-16 h-16 text-[#FF7A00]" />
        </motion.div>
        <h3 className="text-2xl text-white mb-2">🎲 Selecting Mini-Game...</h3>
        <p className="text-gray-400 text-sm">Let fate decide the challenge!</p>
      </motion.div>

      <div className="relative max-w-md mx-auto h-48 overflow-hidden">
        {/* Display games in roulette style */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {GAMES.map((game, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={game.id}
                className="absolute w-full"
                animate={{
                  y: offset * 80,
                  scale: isActive && !spinning ? 1.2 : isActive ? 1 : 0.8,
                  opacity: Math.abs(offset) <= 1 ? 1 : 0,
                }}
                transition={{ 
                  type: 'spring', 
                  damping: 25, 
                  stiffness: 200,
                  duration: 0.3 
                }}
              >
                <div
                  className="mx-auto max-w-xs h-20 rounded-2xl border-4 flex items-center justify-center gap-4 px-6"
                  style={{
                    borderColor: isActive ? game.color : '#4b5563',
                    backgroundColor: `${game.color}${isActive ? '40' : '20'}`,
                  }}
                >
                  <span className="text-4xl">{game.icon}</span>
                  <div>
                    <div className="text-white font-bold text-lg">{game.name}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selection indicators */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center gap-8 pointer-events-none z-10">
          <div 
            className="w-1 h-24 bg-gradient-to-b from-transparent via-[#FF7A00] to-transparent"
            style={{ boxShadow: '0 0 20px #FF7A00' }}
          />
          <div 
            className="w-1 h-24 bg-gradient-to-b from-transparent via-[#FF7A00] to-transparent"
            style={{ boxShadow: '0 0 20px #FF7A00' }}
          />
        </div>
      </div>

      {!spinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-8"
        >
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-white text-lg">
            Game Selected: <span style={{ color: GAMES[currentIndex].color }}>{GAMES[currentIndex].name}</span>!
          </div>
        </motion.div>
      )}
    </div>
  );
}