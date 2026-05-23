import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HelpCircle, MapPin } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
}

interface MysteryCardProps {
  venues: Venue[];
  onComplete: (venueId: string) => void;
  color: string;
}

export function MysteryCard({ venues, onComplete, color }: MysteryCardProps) {
  const [revealedCard, setRevealedCard] = useState<'venue1' | 'venue2' | 'mystery' | null>(null);
  const [mysteryVenue] = useState<Venue>({
    id: 'mystery-venue',
    name: 'Attendant Coffee',
    location: 'Fitzrovia',
    rating: 4.9,
    distance: '0.4 mi'
  });
  const [tapCounts, setTapCounts] = useState({ venue1: 0, venue2: 0, mystery: 0 });

  // Auto-tap simulation
  useEffect(() => {
    const intervals = [
      setTimeout(() => setTapCounts(prev => ({ ...prev, venue1: 1 })), 1500),
      setTimeout(() => setTapCounts(prev => ({ ...prev, venue2: 1 })), 2000),
      setTimeout(() => setTapCounts(prev => ({ ...prev, mystery: 1 })), 2500),
      setTimeout(() => setTapCounts(prev => ({ ...prev, mystery: 2 })), 3500),
      setTimeout(() => setTapCounts(prev => ({ ...prev, mystery: 3 })), 4500),
    ];

    return () => intervals.forEach(clearTimeout);
  }, []);

  // Reveal mystery card when 3 taps
  useEffect(() => {
    if (tapCounts.mystery >= 3 && !revealedCard) {
      setTimeout(() => {
        setRevealedCard('mystery');
        
        setTimeout(() => {
          onComplete(mysteryVenue.id);
        }, 3000);
      }, 500);
    }
  }, [tapCounts.mystery, revealedCard, mysteryVenue.id, onComplete]);

  const CardFace = ({ venue, type }: { venue: Venue, type: 'venue1' | 'venue2' | 'mystery' }) => {
    const isMystery = type === 'mystery';
    const isRevealed = revealedCard === type;
    const taps = tapCounts[type];

    return (
      <motion.div
        className="relative"
        whileHover={{ y: -5 }}
        animate={taps > 0 ? { scale: [1, 1.05, 1] } : {}}
      >
        {/* Card */}
        <motion.div
          className="relative w-full h-48 rounded-2xl cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front (face-down) */}
          <div 
            className="absolute inset-0 rounded-2xl border-4 flex items-center justify-center"
            style={{ 
              backfaceVisibility: 'hidden',
              borderColor: isMystery ? '#fbbf24' : color,
              background: isMystery 
                ? 'linear-gradient(135deg, #fbbf2440, #f5940840)' 
                : `linear-gradient(135deg, ${color}40, ${color}20)`
            }}
          >
            {isMystery ? (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <HelpCircle className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                </motion.div>
                <div className="text-yellow-400 font-bold text-lg">Mystery Card</div>
                <div className="text-yellow-400/70 text-xs mt-1">{taps}/3 picks</div>
              </div>
            ) : (
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2" style={{ color }} />
                <div className="text-white font-bold">{venue.name}</div>
                <div className="text-gray-400 text-sm">{venue.location}</div>
              </div>
            )}
          </div>

          {/* Back (revealed) */}
          {isMystery && (
            <div 
              className="absolute inset-0 rounded-2xl border-4 border-yellow-400 flex items-center justify-center p-4"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #fbbf2460, #f5940860)'
              }}
            >
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <div className="text-white font-bold text-xl mb-1">{mysteryVenue.name}</div>
                <div className="text-yellow-400 text-sm mb-2">{mysteryVenue.location}</div>
                <div className="flex items-center justify-center gap-1 text-yellow-400">
                  <span>⭐</span>
                  <span className="font-bold">{mysteryVenue.rating}</span>
                  <span className="text-xs">• {mysteryVenue.distance}</span>
                </div>
                <div className="text-xs text-gray-300 mt-2">Wildcard Winner! 🎉</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tap indicators */}
        {taps > 0 && !isRevealed && (
          <div className="absolute -top-3 -right-3 flex gap-1">
            {Array.from({ length: Math.min(taps, 3) }).map((_, i) => (
              <motion.div
                key={`tap-${type}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="py-8 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl text-white mb-2">🎴 The Mystery Card</h3>
        <p className="text-gray-400 text-sm">Can't decide? Pick the Mystery Card!</p>
        <p className="text-yellow-400 text-xs mt-1">(3 picks needed to reveal)</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <CardFace venue={venues[0]} type="venue1" />
        <CardFace venue={mysteryVenue} type="mystery" />
        <CardFace venue={venues[1]} type="venue2" />
      </div>

      {revealedCard === 'mystery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <div className="text-4xl mb-2">✨</div>
          <div className="text-white text-lg">
            The group chose adventure over safety!
          </div>
        </motion.div>
      )}
    </div>
  );
}
