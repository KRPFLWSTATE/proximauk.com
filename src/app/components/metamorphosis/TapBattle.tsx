import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
}

interface TapBattleProps {
  venues: Venue[];
  onComplete: (venueId: string) => void;
  color: string;
}

export function TapBattle({ venues, onComplete, color }: TapBattleProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [tapCounts, setTapCounts] = useState<{[key: string]: number}>({
    [venues[0].id]: 0,
    [venues[1].id]: 0
  });
  const [battleActive, setBattleActive] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // Auto-start battle
  useEffect(() => {
    const timer = setTimeout(() => {
      setBattleActive(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!battleActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setBattleActive(false);
          determineWinner();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [battleActive, timeLeft]);

  // Auto-tap simulation
  useEffect(() => {
    if (!battleActive) return;

    const interval = setInterval(() => {
      // Random taps for both venues
      const venue1Taps = Math.floor(Math.random() * 3) + 1;
      const venue2Taps = Math.floor(Math.random() * 3) + 1;

      setTapCounts(prev => ({
        ...prev,
        [venues[0].id]: prev[venues[0].id] + venue1Taps,
        [venues[1].id]: prev[venues[1].id] + venue2Taps,
      }));
    }, 200);

    return () => clearInterval(interval);
  }, [battleActive, venues]);

  const determineWinner = () => {
    const venue1Count = tapCounts[venues[0].id];
    const venue2Count = tapCounts[venues[1].id];
    
    // Venue 1 wins for demo
    const winnerId = venue1Count >= venue2Count ? venues[0].id : venues[1].id;
    setWinner(winnerId);

    setTimeout(() => {
      onComplete(winnerId);
    }, 2000);
  };

  const getTugBarPosition = () => {
    const total = tapCounts[venues[0].id] + tapCounts[venues[1].id];
    if (total === 0) return 50;
    return (tapCounts[venues[0].id] / total) * 100;
  };

  return (
    <div className="py-8 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl text-white mb-2">⚡ Rapid-Fire Tap Battle</h3>
        <p className="text-gray-400 text-sm">Tap faster to win!</p>
      </motion.div>

      {/* Timer */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-block text-5xl font-bold text-white"
          animate={{ scale: timeLeft <= 3 ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }}
          style={{ color: timeLeft <= 3 ? '#ef4444' : color }}
        >
          {timeLeft}s
        </motion.div>
      </div>

      {/* Tug-of-war bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <div className="text-white text-sm font-bold">{venues[0].name}</div>
          <div className="text-white text-sm font-bold">{venues[1].name}</div>
        </div>
        
        <div className="relative h-16 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-700">
          {/* Dynamic bar */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF7A00] to-[#FF7A00]/80 flex items-center justify-start px-4"
            animate={{ width: `${getTugBarPosition()}%` }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <span className="text-white font-bold">{tapCounts[venues[0].id]}</span>
          </motion.div>

          <motion.div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-purple-600 to-purple-600/80 flex items-center justify-end px-4"
            animate={{ width: `${100 - getTugBarPosition()}%` }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <span className="text-white font-bold">{tapCounts[venues[1].id]}</span>
          </motion.div>

          {/* Center line */}
          <div className="absolute inset-y-0 left-1/2 w-1 bg-white/50 -translate-x-1/2" />
        </div>
      </div>

      {/* Tap indicators */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.id}
            className="relative h-32 rounded-xl border-4 flex items-center justify-center cursor-pointer"
            style={{ 
              borderColor: index === 0 ? '#FF7A00' : '#8b5cf6',
              backgroundColor: `${index === 0 ? '#FF7A00' : '#8b5cf6'}20`
            }}
            whileTap={{ scale: 0.95 }}
            animate={battleActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3, repeat: battleActive ? Infinity : 0 }}
          >
            <Zap className="w-12 h-12" style={{ color: index === 0 ? '#FF7A00' : '#8b5cf6' }} />
          </motion.div>
        ))}
      </div>

      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-white text-xl">
            Team {venues.find(v => v.id === winner)?.name} Wins!
          </div>
        </motion.div>
      )}
    </div>
  );
}
