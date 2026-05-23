import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
}

interface SpinTheWheelProps {
  venues: Venue[];
  onComplete: (venueId: string) => void;
  color: string;
}

export function SpinTheWheel({ venues, onComplete, color }: SpinTheWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const handleSpin = () => {
    if (spinning || winner) return;

    setSpinning(true);
    
    // Calculate winning rotation (always lands on first venue for demo)
    const spins = 5; // Number of full rotations
    const targetAngle = 0; // Adjust based on wheel segments
    const totalRotation = (spins * 360) + targetAngle;
    
    setRotation(totalRotation);

    // Auto-spin for demo
    setTimeout(() => {
      setSpinning(false);
      setWinner(venues[0].id);
      
      setTimeout(() => {
        onComplete(venues[0].id);
      }, 2000);
    }, 4000);
  };

  // Auto-trigger spin
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSpin();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-8 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl text-white mb-2">🎡 Spin the Wheel of Fate</h3>
        <p className="text-gray-400 text-sm">Let destiny decide...</p>
      </motion.div>

      <div className="relative w-64 h-64 mx-auto mb-6">
        {/* Wheel */}
        <motion.div
          className="absolute inset-0 rounded-full border-8 overflow-hidden"
          style={{ borderColor: color }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          {venues.map((venue, index) => {
            const angle = (360 / venues.length) * index;
            const colors = ['#FF7A00', '#8b5cf6'];
            
            return (
              <div
                key={venue.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `conic-gradient(from ${angle}deg, ${colors[index % 2]} 0deg, ${colors[index % 2]} ${360 / venues.length}deg, transparent ${360 / venues.length}deg)`,
                }}
              >
                <div
                  className="absolute text-white font-bold text-sm"
                  style={{
                    transform: `rotate(${angle + (360 / venues.length / 2)}deg) translateY(-80px)`,
                  }}
                >
                  {venue.name.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Center button */}
        <motion.button
          className="absolute inset-0 m-auto w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-white z-10 cursor-pointer"
          style={{ backgroundColor: color }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={spinning ? { scale: [1, 0.95, 1] } : {}}
          transition={{ repeat: spinning ? Infinity : 0, duration: 0.5 }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.button>

        {/* Pointer */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 z-20"
          style={{
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: `25px solid ${color}`,
          }}
        />
      </div>

      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-3xl mb-2">🎉</div>
          <div className="text-white text-xl">
            {venues.find(v => v.id === winner)?.name}
          </div>
          <div className="text-gray-400 text-sm">wins!</div>
        </motion.div>
      )}
    </div>
  );
}
