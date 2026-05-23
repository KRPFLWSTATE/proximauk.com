import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Sparkles, TrendingUp, Coffee, 
  Music, Camera, Star, Flame, Moon, Sun, Wine, Book 
} from 'lucide-react';

export function RomanticMode() {
  const [pulseValue, setPulseValue] = useState(75);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [dateVibe, setDateVibe] = useState<'cozy' | 'adventurous' | 'intellectual'>('cozy');

  // Simulate pulse fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseValue(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(60, Math.min(95, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const memories = [
    { id: 1, title: 'First Date', location: 'Dishoom, Shoreditch', date: 'Jan 14, 2024', image: '🍽️', quality: 95 },
    { id: 2, title: 'Jazz Night', location: 'Ronnie Scott\'s', date: 'Feb 8, 2024', image: '🎷', quality: 88 },
    { id: 3, title: 'Park Picnic', location: 'Hyde Park', date: 'Mar 20, 2024', image: '🌳', quality: 92 },
    { id: 4, title: 'Museum Date', location: 'Tate Modern', date: 'Apr 5, 2024', image: '🎨', quality: 85 },
  ];

  const dateVibes = [
    { id: 'cozy' as const, name: 'Cozy', icon: Coffee, color: '#FF7A00', bg: 'from-orange-900/40 to-amber-900/40' },
    { id: 'adventurous' as const, name: 'Adventurous', icon: Flame, color: '#ef4444', bg: 'from-red-900/40 to-orange-900/40' },
    { id: 'intellectual' as const, name: 'Intellectual', icon: Book, color: '#3b82f6', bg: 'from-blue-900/40 to-indigo-900/40' },
  ];

  const datesSuggestion = {
    cozy: { name: 'Jazz & Wine Bar', location: 'The Piano Works, Farringdon', vibe: 'Intimate, live music, candlelit' },
    adventurous: { name: 'Indoor Climbing', location: 'The Castle, Stoke Newington', vibe: 'Active, challenging, exciting' },
    intellectual: { name: 'Philosophy Cafe', location: 'The School of Life, Bloomsbury', vibe: 'Deep conversation, thought-provoking' }
  };

  const currentSuggestion = datesSuggestion[dateVibe];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Epic Orb Fusion Transformation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-3xl border border-pink-500/30 p-6 md:p-8 overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 pointer-events-none" />
        
        <div className="relative z-10">
          <motion.h3 
            className="text-2xl md:text-3xl text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              The Moment of Transformation
            </span>
          </motion.h3>
          
          {/* Sleek Futuristic Fusion Container */}
          <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
            
            {/* Subtle background glow */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.1), rgba(255, 122, 0, 0.05), transparent)',
                filter: 'blur(40px)'
              }}
            />

            {/* Ambient swirling particles */}
            {[...Array(30)].map((_, i) => {
              const angle = (i * 12) * Math.PI / 180;
              const radius = 200 + (i % 3) * 50;
              return (
                <motion.div
                  key={`ambient-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#ec4899' : '#f97316',
                    boxShadow: `0 0 10px ${i % 2 === 0 ? '#ec4899' : '#f97316'}`
                  }}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI) * radius,
                      Math.cos(angle) * radius
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI) * radius,
                      Math.sin(angle) * radius
                    ],
                    opacity: [0, 0.6, 0.8, 0.6, 0],
                    scale: [0, 1, 1.5, 1, 0]
                  }}
                  transition={{
                    duration: 10,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              );
            })}

            {/* ============ SARAH'S VIBRANT GRANULAR ORB (Pink/Rose) ============ */}
            <motion.div
              className="absolute"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ 
                x: -400, 
                y: -50,
                z: -800,
                rotateY: -60,
                rotateX: 20,
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                x: [-400, -200, -80, -40, 0],
                y: [-50, -30, -10, 0, 0],
                z: [-800, -400, -200, -100, 0],
                rotateY: [-60, -40, -20, -10, 0],
                rotateX: [20, 10, 5, 0, 0],
                opacity: [0, 1, 1, 1, 1],
                scale: [0.5, 0.8, 1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                times: [0, 0.3, 0.6, 0.8, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Outer energy field - massive pulsing aura */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '220px',
                  height: '220px',
                  marginLeft: '-35px',
                  marginTop: '-35px',
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4), rgba(244, 63, 94, 0.2) 50%, transparent 70%)',
                  filter: 'blur(30px)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Middle glow layer - rotating */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '180px',
                  height: '180px',
                  marginLeft: '-15px',
                  marginTop: '-15px',
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(244, 63, 94, 0.3) 60%, transparent)',
                  filter: 'blur(15px)'
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Main vibrant granular orb */}
              <motion.div
                className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden"
                style={{ 
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(251, 207, 232, 0.9), transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(244, 63, 94, 0.8), transparent 60%),
                    linear-gradient(135deg, #ec4899, #f43f5e 50%, #fb7185)
                  `,
                  boxShadow: `
                    0 0 80px rgba(236, 72, 153, 0.9),
                    inset 0 0 40px rgba(255, 255, 255, 0.3),
                    inset -10px -10px 30px rgba(244, 63, 94, 0.6),
                    inset 10px 10px 30px rgba(251, 113, 133, 0.4)
                  `,
                  border: '2px solid rgba(251, 207, 232, 0.4)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 80px rgba(236, 72, 153, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.3), inset -10px -10px 30px rgba(244, 63, 94, 0.6)',
                    '0 0 120px rgba(236, 72, 153, 1), inset 0 0 60px rgba(255, 255, 255, 0.4), inset -10px -10px 40px rgba(244, 63, 94, 0.8)',
                    '0 0 80px rgba(236, 72, 153, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.3), inset -10px -10px 30px rgba(244, 63, 94, 0.6)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {/* Inner granular particles - layer 1 (swirling) */}
                {[...Array(40)].map((_, i) => {
                  const angle = (i * 9) * Math.PI / 180;
                  const radius = 35 + (i % 3) * 10;
                  return (
                    <motion.div
                      key={`sarah-particle-${i}`}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: 'rgba(251, 207, 232, 0.8)',
                        boxShadow: '0 0 4px rgba(251, 207, 232, 0.8)',
                        left: '50%',
                        top: '50%'
                      }}
                      animate={{
                        x: [
                          Math.cos(angle) * radius,
                          Math.cos(angle + Math.PI / 4) * (radius + 5),
                          Math.cos(angle + Math.PI / 2) * radius,
                          Math.cos(angle + Math.PI * 3/4) * (radius + 5),
                          Math.cos(angle + Math.PI) * radius,
                          Math.cos(angle) * radius
                        ],
                        y: [
                          Math.sin(angle) * radius,
                          Math.sin(angle + Math.PI / 4) * (radius + 5),
                          Math.sin(angle + Math.PI / 2) * radius,
                          Math.sin(angle + Math.PI * 3/4) * (radius + 5),
                          Math.sin(angle + Math.PI) * radius,
                          Math.sin(angle) * radius
                        ],
                        opacity: [0.6, 1, 0.8, 1, 0.6, 0.6]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: 'linear'
                      }}
                    />
                  );
                })}

                {/* Swirling energy streams inside orb */}
                {[0, 1, 2].map((stream) => (
                  <motion.div
                    key={`sarah-stream-${stream}`}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(${stream * 120}deg, transparent, rgba(251, 207, 232, 0.3) 50%, transparent)`,
                    }}
                    animate={{
                      rotate: [stream * 120, stream * 120 + 360]
                    }}
                    transition={{
                      duration: 4 + stream,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                ))}

                {/* Avatar in center */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl z-10">
                  👩
                </div>
              </motion.div>

              {/* Orbiting hearts around the orb */}
              {[0, 1, 2, 3, 4].map((i) => {
                const orbitRadius = 80;
                return (
                  <motion.div
                    key={`sarah-orbit-${i}`}
                    className="absolute"
                    style={{ left: '50%', top: '50%' }}
                    animate={{
                      x: [
                        Math.cos((i * 72) * Math.PI / 180) * orbitRadius,
                        Math.cos((i * 72 + 360) * Math.PI / 180) * orbitRadius
                      ],
                      y: [
                        Math.sin((i * 72) * Math.PI / 180) * orbitRadius,
                        Math.sin((i * 72 + 360) * Math.PI / 180) * orbitRadius
                      ]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: 'linear'
                    }}
                  >
                    <Heart className="w-5 h-5 text-pink-300 fill-pink-300" style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))' }} />
                  </motion.div>
                );
              })}

              {/* Deformation effect when approaching (starts at 4s) */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse 120% 100% at 100% 50%, rgba(236, 72, 153, 0.4), transparent 60%)',
                  filter: 'blur(20px)'
                }}
                initial={{ opacity: 0, scaleX: 1 }}
                animate={{ 
                  opacity: [0, 0, 0.8, 1, 0],
                  scaleX: [1, 1, 1.3, 1.5, 1]
                }}
                transition={{ duration: 8, times: [0, 0.5, 0.65, 0.75, 1] }}
              />
            </motion.div>

            {/* ============ JAMES'S VIBRANT GRANULAR ORB (Orange/Amber) ============ */}
            <motion.div
              className="absolute"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ 
                x: 400, 
                y: -50,
                z: -800,
                rotateY: 60,
                rotateX: 20,
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                x: [400, 200, 80, 40, 0],
                y: [-50, -30, -10, 0, 0],
                z: [-800, -400, -200, -100, 0],
                rotateY: [60, 40, 20, 10, 0],
                rotateX: [20, 10, 5, 0, 0],
                opacity: [0, 1, 1, 1, 1],
                scale: [0.5, 0.8, 1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                times: [0, 0.3, 0.6, 0.8, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Outer energy field - massive pulsing aura */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '220px',
                  height: '220px',
                  marginLeft: '-35px',
                  marginTop: '-35px',
                  background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4), rgba(251, 146, 60, 0.2) 50%, transparent 70%)',
                  filter: 'blur(30px)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />

              {/* Middle glow layer - rotating */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '180px',
                  height: '180px',
                  marginLeft: '-15px',
                  marginTop: '-15px',
                  background: 'radial-gradient(circle, rgba(249, 115, 22, 0.6), rgba(251, 146, 60, 0.3) 60%, transparent)',
                  filter: 'blur(15px)'
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Main vibrant granular orb */}
              <motion.div
                className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden"
                style={{ 
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(254, 215, 170, 0.9), transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(234, 88, 12, 0.8), transparent 60%),
                    linear-gradient(135deg, #f97316, #fb923c 50%, #fdba74)
                  `,
                  boxShadow: `
                    0 0 80px rgba(249, 115, 22, 0.9),
                    inset 0 0 40px rgba(255, 255, 255, 0.3),
                    inset -10px -10px 30px rgba(234, 88, 12, 0.6),
                    inset 10px 10px 30px rgba(251, 146, 60, 0.4)
                  `,
                  border: '2px solid rgba(254, 215, 170, 0.4)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 80px rgba(249, 115, 22, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.3), inset -10px -10px 30px rgba(234, 88, 12, 0.6)',
                    '0 0 120px rgba(249, 115, 22, 1), inset 0 0 60px rgba(255, 255, 255, 0.4), inset -10px -10px 40px rgba(234, 88, 12, 0.8)',
                    '0 0 80px rgba(249, 115, 22, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.3), inset -10px -10px 30px rgba(234, 88, 12, 0.6)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                {/* Inner granular particles - layer 1 (swirling counter-clockwise) */}
                {[...Array(40)].map((_, i) => {
                  const angle = (i * 9) * Math.PI / 180;
                  const radius = 35 + (i % 3) * 10;
                  return (
                    <motion.div
                      key={`james-particle-${i}`}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: 'rgba(254, 215, 170, 0.8)',
                        boxShadow: '0 0 4px rgba(254, 215, 170, 0.8)',
                        left: '50%',
                        top: '50%'
                      }}
                      animate={{
                        x: [
                          Math.cos(angle) * radius,
                          Math.cos(angle - Math.PI / 4) * (radius + 5),
                          Math.cos(angle - Math.PI / 2) * radius,
                          Math.cos(angle - Math.PI * 3/4) * (radius + 5),
                          Math.cos(angle - Math.PI) * radius,
                          Math.cos(angle) * radius
                        ],
                        y: [
                          Math.sin(angle) * radius,
                          Math.sin(angle - Math.PI / 4) * (radius + 5),
                          Math.sin(angle - Math.PI / 2) * radius,
                          Math.sin(angle - Math.PI * 3/4) * (radius + 5),
                          Math.sin(angle - Math.PI) * radius,
                          Math.sin(angle) * radius
                        ],
                        opacity: [0.6, 1, 0.8, 1, 0.6, 0.6]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: 'linear'
                      }}
                    />
                  );
                })}

                {/* Swirling energy streams inside orb */}
                {[0, 1, 2].map((stream) => (
                  <motion.div
                    key={`james-stream-${stream}`}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(${stream * 120}deg, transparent, rgba(254, 215, 170, 0.3) 50%, transparent)`,
                    }}
                    animate={{
                      rotate: [stream * 120, stream * 120 - 360]
                    }}
                    transition={{
                      duration: 4 + stream,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                ))}

                {/* Avatar in center */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl z-10">
                  👨
                </div>
              </motion.div>

              {/* Orbiting hearts around the orb */}
              {[0, 1, 2, 3, 4].map((i) => {
                const orbitRadius = 80;
                return (
                  <motion.div
                    key={`james-orbit-${i}`}
                    className="absolute"
                    style={{ left: '50%', top: '50%' }}
                    animate={{
                      x: [
                        Math.cos((i * 72) * Math.PI / 180) * orbitRadius,
                        Math.cos((i * 72 - 360) * Math.PI / 180) * orbitRadius
                      ],
                      y: [
                        Math.sin((i * 72) * Math.PI / 180) * orbitRadius,
                        Math.sin((i * 72 - 360) * Math.PI / 180) * orbitRadius
                      ]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: 'linear'
                    }}
                  >
                    <Heart className="w-5 h-5 text-orange-300 fill-orange-300" style={{ filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.8))' }} />
                  </motion.div>
                );
              })}

              {/* Deformation effect when approaching (starts at 4s) */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse 120% 100% at 0% 50%, rgba(249, 115, 22, 0.4), transparent 60%)',
                  filter: 'blur(20px)'
                }}
                initial={{ opacity: 0, scaleX: 1 }}
                animate={{ 
                  opacity: [0, 0, 0.8, 1, 0],
                  scaleX: [1, 1, 1.3, 1.5, 1]
                }}
                transition={{ duration: 8, times: [0, 0.5, 0.65, 0.75, 1] }}
              />
            </motion.div>

            {/* ============ FUSION TENDRILS & BRIDGES (4s-6s) ============ */}
            {[...Array(8)].map((_, i) => {
              const yOffset = (i - 3.5) * 8;
              return (
                <motion.div
                  key={`tendril-${i}`}
                  className="absolute h-1 origin-center"
                  style={{
                    background: `linear-gradient(to right, 
                      rgba(236, 72, 153, ${0.8 - i * 0.08}), 
                      rgba(255, 100, 150, 0.6) 30%,
                      rgba(255, 150, 100, 0.6) 70%,
                      rgba(249, 115, 22, ${0.8 - i * 0.08})
                    )`,
                    filter: 'blur(2px)',
                    boxShadow: `0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(249, 115, 22, 0.6)`,
                    top: `calc(50% + ${yOffset}px)`
                  }}
                  initial={{ width: 0, x: 0, opacity: 0 }}
                  animate={{
                    width: [0, 0, 180, 220, 250, 0],
                    x: [-90, -90, -90, -110, -125, 0],
                    opacity: [0, 0, 0.9, 1, 0.8, 0],
                    scaleY: [1, 1, 1, 1.5, 2, 0]
                  }}
                  transition={{
                    duration: 8,
                    times: [0, 0.5, 0.6, 0.7, 0.8, 1],
                    delay: i * 0.05,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}

            {/* Particle flow through bridges */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`bridge-particle-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? 
                    'radial-gradient(circle, rgba(236, 72, 153, 1), rgba(236, 72, 153, 0))' :
                    'radial-gradient(circle, rgba(249, 115, 22, 1), rgba(249, 115, 22, 0))',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#ec4899' : '#f97316'}`
                }}
                initial={{ x: -100, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [-100, -50, 0, 50, 100],
                  y: [
                    Math.sin(i * 0.5) * 30,
                    Math.sin(i * 0.5 + 1) * 20,
                    Math.sin(i * 0.5 + 2) * 10,
                    Math.sin(i * 0.5 + 3) * 20,
                    Math.sin(i * 0.5 + 4) * 30
                  ],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0, 1.5, 1, 1.5, 0]
                }}
                transition={{
                  duration: 2,
                  delay: 4 + (i * 0.08),
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* ============ FUSION VORTEX (6s-8s) ============ */}
            <motion.div
              className="absolute"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, 0, 1, 1, 0.3],
                scale: [0, 0, 2, 3, 1],
                rotate: [0, 0, 360, 720, 1080]
              }}
              transition={{
                duration: 8,
                times: [0, 0.7, 0.75, 0.85, 1],
                ease: 'easeOut'
              }}
            >
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                return (
                  <motion.div
                    key={`vortex-arm-${i}`}
                    className="absolute w-2 h-40 origin-bottom rounded-full"
                    style={{
                      background: `linear-gradient(to top, 
                        ${i % 2 === 0 ? 'rgba(236, 72, 153, 0.8)' : 'rgba(249, 115, 22, 0.8)'}, 
                        transparent
                      )`,
                      filter: 'blur(4px)',
                      transform: `rotate(${i * 30}deg)`,
                      transformOrigin: 'bottom center'
                    }}
                    animate={{
                      scaleY: [0, 1.5, 1, 0.8],
                      opacity: [0, 1, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      delay: 6 + (i * 0.03),
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Swirling particles in vortex */}
            {[...Array(60)].map((_, i) => {
              const angle = (i * 6) * Math.PI / 180;
              const spiralRadius = (i / 60) * 100;
              return (
                <motion.div
                  key={`vortex-particle-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#ec4899' : '#f97316',
                    boxShadow: `0 0 6px ${i % 2 === 0 ? '#ec4899' : '#f97316'}`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    x: [
                      0,
                      Math.cos(angle) * spiralRadius,
                      Math.cos(angle + Math.PI * 2) * 20,
                      0
                    ],
                    y: [
                      0,
                      Math.sin(angle) * spiralRadius,
                      Math.sin(angle + Math.PI * 2) * 20,
                      0
                    ],
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.5, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: 6 + (i * 0.02),
                    ease: 'easeInOut'
                  }}
                />
              );
            })}

            {/* ============ UNIFIED ORB (8s-10s) ============ */}
            <motion.div
              className="absolute"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ scale: 0, opacity: 0, rotateZ: 0 }}
              animate={{
                scale: [0, 0, 1.5, 1.3, 1],
                opacity: [0, 0, 1, 1, 1],
                rotateZ: [0, 0, 360, 360, 360]
              }}
              transition={{
                duration: 10,
                times: [0, 0.75, 0.85, 0.92, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Massive energy burst */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '300px',
                  height: '300px',
                  marginLeft: '-75px',
                  marginTop: '-75px',
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(249, 115, 22, 0.5) 40%, transparent 70%)',
                  filter: 'blur(50px)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 0, 3, 1.5, 1.2],
                  opacity: [0, 0, 1, 0.6, 0.4]
                }}
                transition={{
                  duration: 10,
                  times: [0, 0.75, 0.78, 0.9, 1]
                }}
              />

              {/* Unified orb - combining both colors */}
              <motion.div
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, rgba(254, 215, 170, 0.9), transparent 40%),
                    radial-gradient(circle at 80% 80%, rgba(251, 207, 232, 0.9), transparent 40%),
                    conic-gradient(from 0deg, 
                      #ec4899 0deg, 
                      #f43f5e 60deg,
                      #fb7185 120deg,
                      #f97316 180deg,
                      #fb923c 240deg,
                      #fdba74 300deg,
                      #ec4899 360deg
                    )
                  `,
                  boxShadow: `
                    0 0 100px rgba(236, 72, 153, 1),
                    0 0 100px rgba(249, 115, 22, 1),
                    inset 0 0 60px rgba(255, 255, 255, 0.4),
                    inset -15px -15px 40px rgba(234, 88, 12, 0.6),
                    inset 15px 15px 40px rgba(244, 63, 94, 0.6)
                  `,
                  border: '3px solid rgba(255, 200, 200, 0.6)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 100px rgba(236, 72, 153, 1), 0 0 100px rgba(249, 115, 22, 1), inset 0 0 60px rgba(255, 255, 255, 0.4)',
                    '0 0 140px rgba(236, 72, 153, 1), 0 0 140px rgba(249, 115, 22, 1), inset 0 0 80px rgba(255, 255, 255, 0.5)',
                    '0 0 100px rgba(236, 72, 153, 1), 0 0 100px rgba(249, 115, 22, 1), inset 0 0 60px rgba(255, 255, 255, 0.4)'
                  ],
                  rotate: [0, 360]
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
                }}
              >
                {/* Merged particles swirling */}
                {[...Array(80)].map((_, i) => {
                  const angle = (i * 4.5) * Math.PI / 180;
                  const radius = 30 + (i % 4) * 12;
                  const color = i % 2 === 0 ? 'rgba(251, 207, 232, 0.9)' : 'rgba(254, 215, 170, 0.9)';
                  return (
                    <motion.div
                      key={`unified-particle-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        left: '50%',
                        top: '50%'
                      }}
                      animate={{
                        x: [
                          Math.cos(angle) * radius,
                          Math.cos(angle + Math.PI) * radius,
                          Math.cos(angle) * radius
                        ],
                        y: [
                          Math.sin(angle) * radius,
                          Math.sin(angle + Math.PI) * radius,
                          Math.sin(angle) * radius
                        ],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: 8 + (i * 0.02),
                        ease: 'linear'
                      }}
                    />
                  );
                })}

                {/* DNA helix-like intertwining streams */}
                {[0, 1].map((helix) => (
                  <motion.div
                    key={`helix-${helix}`}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30) * Math.PI / 180;
                      const radius = 50;
                      return (
                        <motion.div
                          key={`helix-${helix}-dot-${i}`}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: helix === 0 ? '#ec4899' : '#f97316',
                            boxShadow: `0 0 10px ${helix === 0 ? '#ec4899' : '#f97316'}`,
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: [
                              Math.cos(angle + helix * Math.PI) * radius,
                              Math.cos(angle + helix * Math.PI + Math.PI * 2) * radius,
                              Math.cos(angle + helix * Math.PI) * radius
                            ],
                            y: [
                              Math.sin(angle + helix * Math.PI) * radius,
                              Math.sin(angle + helix * Math.PI + Math.PI * 2) * radius,
                              Math.sin(angle + helix * Math.PI) * radius
                            ],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: 8 + i * 0.1,
                            ease: 'linear'
                          }}
                        />
                      );
                    })}
                  </motion.div>
                ))}

                {/* Both avatars merged */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0, 1], scale: [0, 0, 1] }}
                  transition={{ duration: 10, times: [0, 0.8, 1] }}
                >
                  <div className="flex items-center gap-1 text-4xl md:text-5xl">
                    <span>👩</span>
                    <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-1" />
                    <span>👨</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Pulsing love waves */}
              {[0, 1, 2, 3].map((wave) => (
                <motion.div
                  key={`love-wave-${wave}`}
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: wave % 2 === 0 ? 'rgba(236, 72, 153, 0.6)' : 'rgba(249, 115, 22, 0.6)',
                    width: '176px',
                    height: '176px',
                    marginLeft: '-12px',
                    marginTop: '-12px'
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{
                    scale: [1, 1, 2.5, 3],
                    opacity: [0, 0, 0.8, 0]
                  }}
                  transition={{
                    duration: 10,
                    times: [0, 0.8, 0.95, 1],
                    delay: wave * 0.15,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </motion.div>

            {/* ============ COUPLE CARD EMERGENCE (10s+) ============ */}
            <motion.div
              className="absolute top-[450px]"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ 
                scale: 0, 
                y: -200,
                z: -800,
                rotateX: -90,
                opacity: 0 
              }}
              animate={{ 
                scale: [0, 0, 0.3, 1.1, 1],
                y: [-200, -200, -100, 20, 0],
                z: [-800, -800, -400, 100, 0],
                rotateX: [-90, -90, -45, 10, 0],
                opacity: [0, 0, 0.5, 1, 1]
              }}
              transition={{ 
                duration: 12,
                times: [0, 0.83, 0.87, 0.95, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Card glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.5), rgba(249, 115, 22, 0.4))',
                  filter: 'blur(50px)',
                  width: 'calc(100% + 60px)',
                  height: 'calc(100% + 60px)',
                  marginLeft: '-30px',
                  marginTop: '-30px'
                }}
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Main Card */}
              <div 
                className="relative max-w-md mx-auto backdrop-blur-xl rounded-3xl border-2 p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(249, 115, 22, 0.25))',
                  borderColor: 'rgba(251, 113, 133, 0.6)',
                  boxShadow: '0 20px 60px rgba(236, 72, 153, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Sparkles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`card-sparkle-${i}`}
                    className="absolute"
                    style={{
                      top: `${15 + i * 12}%`,
                      left: `${8 + (i % 2) * 84}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 10 + (i * 0.2),
                      ease: 'easeInOut'
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-pink-300" />
                  </motion.div>
                ))}

                {/* Profiles merged together */}
                <motion.div 
                  className="flex items-center justify-center gap-4 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 0, 1.2, 1] }}
                  transition={{ duration: 12, times: [0, 0.9, 0.95, 1] }}
                >
                  <motion.div
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-4 shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                      borderColor: '#fda4af',
                      boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)'
                    }}
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 10 }}
                  >
                    👩
                  </motion.div>

                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: 10,
                      ease: 'easeInOut'
                    }}
                  >
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-rose-400 fill-rose-400" />
                  </motion.div>

                  <motion.div
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-4 shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #f97316, #fb923c)',
                      borderColor: '#fed7aa',
                      boxShadow: '0 0 30px rgba(249, 115, 22, 0.6)'
                    }}
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 10.5 }}
                  >
                    👨
                  </motion.div>
                </motion.div>

                {/* Names and date */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: [0, 0, 1], y: [20, 20, 0] }}
                  transition={{ duration: 12, times: [0, 0.92, 1] }}
                >
                  <div className="text-2xl md:text-3xl text-white mb-3 tracking-wide">
                    <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 bg-clip-text text-transparent">
                      Sarah & James
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-rose-300">
                    <Heart className="w-4 h-4 fill-rose-300" />
                    <span>Together since Jan 14, 2024</span>
                    <Heart className="w-4 h-4 fill-rose-300" />
                  </div>
                </motion.div>

                {/* Status badge */}
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0, 1], scale: [0, 0, 1] }}
                  transition={{ duration: 12, times: [0, 0.94, 1] }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(249, 115, 22, 0.3))',
                      borderColor: 'rgba(251, 113, 133, 0.5)'
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-pink-300" />
                    <span className="text-sm text-pink-200">Couple Dashboard Unlocked</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Rest of the romantic mode sections remain unchanged */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Relationship Pulse */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-pink-500/30 p-6 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h4 className="text-white">Relationship Pulse</h4>
              <p className="text-xs text-gray-400">Quality time tracker</p>
            </div>
          </div>

          {/* Pulse Visualization */}
          <div className="relative h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              {/* Baseline */}
              <line x1="0" y1="80" x2="400" y2="80" stroke="#374151" strokeWidth="1" strokeDasharray="4,4" />
              
              {/* Pulse Wave */}
              <motion.path
                d={`M0,80 L50,${100 - pulseValue * 0.6} L100,80 L150,${100 - (pulseValue - 5) * 0.6} L200,80 L250,${100 - (pulseValue + 3) * 0.6} L300,80 L350,${100 - (pulseValue - 2) * 0.6} L400,80`}
                stroke="url(#pulseGradient)"
                strokeWidth="3"
                fill="none"
                animate={{ 
                  d: `M0,80 L50,${100 - pulseValue * 0.6} L100,80 L150,${100 - (pulseValue - 5) * 0.6} L200,80 L250,${100 - (pulseValue + 3) * 0.6} L300,80 L350,${100 - (pulseValue - 2) * 0.6} L400,80`
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Glow under line */}
              <motion.path
                d={`M0,80 L50,${100 - pulseValue * 0.6} L100,80 L150,${100 - (pulseValue - 5) * 0.6} L200,80 L250,${100 - (pulseValue + 3) * 0.6} L300,80 L350,${100 - (pulseValue - 2) * 0.6} L400,80 L400,100 L0,100 Z`}
                fill="url(#pulseGlowGradient)"
                animate={{ 
                  d: `M0,80 L50,${100 - pulseValue * 0.6} L100,80 L150,${100 - (pulseValue - 5) * 0.6} L200,80 L250,${100 - (pulseValue + 3) * 0.6} L300,80 L350,${100 - (pulseValue - 2) * 0.6} L400,80 L400,100 L0,100 Z`
                }}
                transition={{ duration: 0.5 }}
              />
              
              <defs>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="pulseGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec489933" />
                  <stop offset="100%" stopColor="#ec489900" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-pink-400 text-xs mb-1">Health</div>
              <div className="text-white">{Math.round(pulseValue)}%</div>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-pink-400 text-xs mb-1">Dates</div>
              <div className="text-white">12</div>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center">
              <div className="text-pink-400 text-xs mb-1">Streak</div>
              <div className="text-white">28d</div>
            </div>
          </div>
        </motion.div>

        {/* Memory Bank Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="text-white">Memory Bank</h4>
              <p className="text-xs text-gray-400">Shared timeline</p>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => setSelectedMemory(memory.id === selectedMemory ? null : memory.id)}
                className="relative cursor-pointer group"
              >
                <div className={`
                  bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-xl p-4 border transition-all
                  ${selectedMemory === memory.id ? 'border-orange-500/50 scale-105' : 'border-gray-800 hover:border-gray-700'}
                `}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{memory.image}</div>
                    <div className="flex-1">
                      <div className="text-white text-sm mb-1">{memory.title}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {memory.location}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{memory.date}</div>
                  </div>
                  
                  {selectedMemory === memory.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">Memory Quality</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-yellow-500">{memory.quality}%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Date Vibe Selector & Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-pink-500/30 p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h4 className="text-white">Next Date Suggestion</h4>
            <p className="text-xs text-gray-400">AI-powered date planner</p>
          </div>
        </div>

        {/* Vibe Selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {dateVibes.map((vibe) => {
            const Icon = vibe.icon;
            return (
              <motion.button
                key={vibe.id}
                onClick={() => setDateVibe(vibe.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all
                  ${dateVibe === vibe.id ? 'border-orange-500/50 bg-gradient-to-br ' + vibe.bg : 'border-gray-800 bg-black/20'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: vibe.color }} />
                <div className={`text-xs ${dateVibe === vibe.id ? 'text-white' : 'text-gray-400'}`}>{vibe.name}</div>
                
                {dateVibe === vibe.id && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `radial-gradient(circle, ${vibe.color}40, transparent)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Date Suggestion Card */}
        <motion.div
          key={dateVibe}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-xl p-6 border border-orange-500/30"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h5 className="text-white mb-1">{currentSuggestion.name}</h5>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                {currentSuggestion.location}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/50"
            >
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </motion.button>
          </div>
          
          <p className="text-sm text-gray-400 mb-4">{currentSuggestion.vibe}</p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg text-white"
          >
            Book This Date
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
