import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Calendar, MapPin, TrendingUp, Coffee, 
  Flame, Book, User
} from 'lucide-react';
import { LoveGarden } from './LoveGarden';

export function RomanticMode() {
  const [pulseValue, setPulseValue] = useState(75);
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
      {/* Futuristic Merger Transformation */}
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
            className="text-xl md:text-2xl text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Connection Established
            </span>
          </motion.h3>
          
          {/* Sleek Futuristic Fusion */}
          <div className="relative h-[400px] md:h-[450px] flex items-center justify-center">
            
            {/* Warm animated heatmap background */}
            <div className="absolute inset-0">
              {/* Base warm gradient layer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(236, 72, 153, 0.25), rgba(255, 122, 0, 0.2), rgba(249, 115, 22, 0.15), transparent 70%)'
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.5, 0.7, 0.4]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Pulsing warm center glow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div
                  className="w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4), rgba(236, 72, 153, 0.3) 40%, transparent 70%)',
                    filter: 'blur(50px)'
                  }}
                />
              </motion.div>

              {/* Horizontal warm sweep */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 122, 0, 0.3) 30%, rgba(236, 72, 153, 0.3) 70%, transparent)',
                  filter: 'blur(30px)'
                }}
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              {/* Warm bokeh particles */}
              {[...Array(8)].map((_, i) => {
                const positions = [
                  { x: '20%', y: '30%' },
                  { x: '80%', y: '25%' },
                  { x: '15%', y: '70%' },
                  { x: '85%', y: '65%' },
                  { x: '30%', y: '50%' },
                  { x: '70%', y: '55%' },
                  { x: '45%', y: '20%' },
                  { x: '55%', y: '80%' }
                ];
                const pos = positions[i];
                
                return (
                  <motion.div
                    key={`bokeh-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: '60px',
                      height: '60px',
                      background: i % 2 === 0 
                        ? 'radial-gradient(circle, rgba(255, 122, 0, 0.25), transparent 70%)' 
                        : 'radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%)',
                      filter: 'blur(20px)'
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.6, 0.3],
                      x: [0, (i % 2 === 0 ? 10 : -10), 0],
                      y: [0, (i % 3 === 0 ? 10 : -10), 0]
                    }}
                    transition={{
                      duration: 5 + (i * 0.5),
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: 'easeInOut'
                    }}
                  />
                );
              })}

              {/* Warm energy field with breathing effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 100% 50% at 50% 50%, rgba(249, 115, 22, 0.15), rgba(236, 72, 153, 0.1), transparent)',
                  mixBlendMode: 'screen'
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scaleY: [1, 1.15, 1]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Profile Node 1 - Left (Pink) - Gravitational Dance */}
            <motion.div
              className="absolute"
              style={{ 
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
              initial={{ 
                x: -300, 
                y: -80,
                z: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 0.7,
                opacity: 0
              }}
              animate={{ 
                // Gravitational orbital dance - elliptical path
                x: [
                  -300,           // Start far left (0s)
                  -180,           // Approach (2s)
                  -60,            // First pass swing up (4s)
                  60,             // Cross center during orbit (5s)
                  -40,            // Second pass swing down (6.5s)
                  20,             // Tighter spiral (7.5s)
                  -10,            // Very close pass (8.5s)
                  0               // Final merge (10s)
                ],
                y: [
                  -80,            // Start high
                  -40,            // Approach
                  -80,            // Swing up on first pass
                  30,             // Cross below center
                  60,             // Swing down on second pass
                  -30,            // Up again tighter
                  20,             // Close oscillation
                  0               // Center merge
                ],
                // 3D depth simulation
                z: [
                  -200,           // Start far back
                  -100,           // Coming forward
                  50,             // Pass in front (closest approach)
                  -80,            // Back during orbit
                  40,             // Forward again tighter
                  -30,            // Back
                  20,             // Very close forward
                  0               // Merge at center depth
                ],
                // 3D rotations for gravitational tumbling
                rotateY: [
                  -45,            // Start tilted
                  -30,            // Rotating as approaching
                  20,             // Flip during first pass
                  -40,            // Tumble back
                  30,             // Forward tilt
                  -20,            // Small oscillation
                  10,             // Settling
                  0               // Face forward at merge
                ],
                rotateX: [
                  25,             // Start tilted up
                  15,             // Leveling
                  -30,            // Dip during pass
                  20,             // Rise back
                  -15,            // Gentle oscillation
                  8,              // Almost level
                  -5,             // Final adjustment
                  0               // Level at merge
                ],
                rotateZ: [
                  0, 15, -20, 10, -15, 8, -3, 0
                ],
                // Scale changes simulate approaching/receding
                scale: [
                  0.7,            // Small when far
                  0.85,           // Growing as approaching
                  1.1,            // Large during close pass
                  0.9,            // Smaller when farther in orbit
                  1.05,           // Larger again on approach
                  0.95,           // Slight pull back
                  1.02,           // Very close
                  0               // Shrink to nothing as merging
                ],
                opacity: [
                  0,              // Fade in
                  1, 1, 1, 1, 1, 1, 
                  0               // Fade out at merge
                ]
              }}
              transition={{ 
                duration: 10,
                times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1],
                ease: [0.45, 0.05, 0.55, 0.95]  // Custom ease for gravitational feel
              }}
            >
              {/* Gravitational trail */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 200% 100%, rgba(236, 72, 153, 0.4), transparent 70%)',
                  filter: 'blur(25px)',
                  transform: 'translateX(-40px)',
                  pointerEvents: 'none'
                }}
                animate={{
                  opacity: [0, 0.6, 0.8, 0.6, 0.8, 0.5, 0.3, 0],
                  scaleX: [1, 1.5, 2, 1.8, 1.6, 1.3, 1, 0.5]
                }}
                transition={{ 
                  duration: 10,
                  times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1]
                }}
              />

              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Hex ring with pulsing */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon 
                      points="50 10, 90 30, 90 70, 50 90, 10 70, 10 30" 
                      fill="none" 
                      stroke="#ec4899" 
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  </svg>
                </motion.div>

                {/* Core with intensity glow */}
                <motion.div 
                  className="relative w-14 h-14 rounded-full flex items-center justify-center border"
                  style={{
                    background: 'rgba(236, 72, 153, 0.15)',
                    borderColor: '#ec4899'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(236, 72, 153, 0.4)',
                      '0 0 30px rgba(236, 72, 153, 0.6)',
                      '0 0 40px rgba(236, 72, 153, 0.8)',
                      '0 0 35px rgba(236, 72, 153, 0.7)',
                      '0 0 45px rgba(236, 72, 153, 0.9)',
                      '0 0 40px rgba(236, 72, 153, 0.8)',
                      '0 0 50px rgba(236, 72, 153, 1)',
                      '0 0 50px rgba(236, 72, 153, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 10,
                    times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1]
                  }}
                >
                  <User className="w-6 h-6 text-pink-400" />
                </motion.div>

                {/* Gravitational particles orbiting */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`pink-orbit-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-pink-400"
                    style={{
                      boxShadow: '0 0 4px #ec4899'
                    }}
                    animate={{
                      x: [
                        Math.cos(i * 120 * Math.PI / 180) * 35,
                        Math.cos((i * 120 + 360) * Math.PI / 180) * 35
                      ],
                      y: [
                        Math.sin(i * 120 * Math.PI / 180) * 35,
                        Math.sin((i * 120 + 360) * Math.PI / 180) * 35
                      ],
                      opacity: [0, 0.8, 1, 1, 1, 0.8, 0.5, 0]
                    }}
                    transition={{
                      duration: 10,
                      times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1],
                      ease: 'linear'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Profile Node 2 - Right (Orange) - Gravitational Dance */}
            <motion.div
              className="absolute"
              style={{ 
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
              initial={{ 
                x: 300, 
                y: 80,
                z: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 0.7,
                opacity: 0
              }}
              animate={{ 
                // Gravitational orbital dance - mirror elliptical path
                x: [
                  300,            // Start far right
                  180,            // Approach
                  60,             // First pass swing down (mirror)
                  -60,            // Cross center during orbit
                  40,             // Second pass swing up (mirror)
                  -20,            // Tighter spiral
                  10,             // Very close pass
                  0               // Final merge
                ],
                y: [
                  80,             // Start low (opposite)
                  40,             // Approach
                  80,             // Swing down on first pass
                  -30,            // Cross above center
                  -60,            // Swing up on second pass
                  30,             // Down again tighter
                  -20,            // Close oscillation
                  0               // Center merge
                ],
                // 3D depth simulation (slightly offset timing for realism)
                z: [
                  -200,           // Start far back
                  -80,            // Coming forward (slightly different)
                  -50,            // Pass behind (opposite phase)
                  60,             // Forward during orbit
                  -40,            // Back again
                  30,             // Forward tighter
                  -20,            // Back slightly
                  0               // Merge at center depth
                ],
                // 3D rotations (mirror the left node)
                rotateY: [
                  45,             // Start tilted opposite
                  30,             // Rotating as approaching
                  -20,            // Flip during first pass
                  40,             // Tumble back
                  -30,            // Forward tilt
                  20,             // Small oscillation
                  -10,            // Settling
                  0               // Face forward at merge
                ],
                rotateX: [
                  -25,            // Start tilted down (opposite)
                  -15,            // Leveling
                  30,             // Rise during pass
                  -20,            // Dip back
                  15,             // Gentle oscillation
                  -8,             // Almost level
                  5,              // Final adjustment
                  0               // Level at merge
                ],
                rotateZ: [
                  0, -15, 20, -10, 15, -8, 3, 0
                ],
                // Scale changes (slightly offset for depth realism)
                scale: [
                  0.7,            // Small when far
                  0.88,           // Growing as approaching
                  0.9,            // Smaller when behind during pass
                  1.1,            // Large when in front
                  1.05,           // Larger again
                  0.95,           // Slight pull back
                  1.02,           // Very close
                  0               // Shrink to nothing as merging
                ],
                opacity: [
                  0,              // Fade in
                  1, 1, 1, 1, 1, 1,
                  0               // Fade out at merge
                ]
              }}
              transition={{ 
                duration: 10,
                times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1],
                ease: [0.45, 0.05, 0.55, 0.95]  // Custom ease for gravitational feel
              }}
            >
              {/* Gravitational trail */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 200% 100%, rgba(255, 122, 0, 0.4), transparent 70%)',
                  filter: 'blur(25px)',
                  transform: 'translateX(40px)',
                  pointerEvents: 'none'
                }}
                animate={{
                  opacity: [0, 0.6, 0.8, 0.6, 0.8, 0.5, 0.3, 0],
                  scaleX: [1, 1.5, 2, 1.8, 1.6, 1.3, 1, 0.5]
                }}
                transition={{ 
                  duration: 10,
                  times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1]
                }}
              />

              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Hex ring with pulsing */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon 
                      points="50 10, 90 30, 90 70, 50 90, 10 70, 10 30" 
                      fill="none" 
                      stroke="#FF7A00" 
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  </svg>
                </motion.div>

                {/* Core with intensity glow */}
                <motion.div 
                  className="relative w-14 h-14 rounded-full flex items-center justify-center border"
                  style={{
                    background: 'rgba(255, 122, 0, 0.15)',
                    borderColor: '#FF7A00'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 122, 0, 0.4)',
                      '0 0 30px rgba(255, 122, 0, 0.6)',
                      '0 0 40px rgba(255, 122, 0, 0.8)',
                      '0 0 35px rgba(255, 122, 0, 0.7)',
                      '0 0 45px rgba(255, 122, 0, 0.9)',
                      '0 0 40px rgba(255, 122, 0, 0.8)',
                      '0 0 50px rgba(255, 122, 0, 1)',
                      '0 0 50px rgba(255, 122, 0, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 10,
                    times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1]
                  }}
                >
                  <User className="w-6 h-6 text-orange-400" />
                </motion.div>

                {/* Gravitational particles orbiting */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`orange-orbit-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-orange-400"
                    style={{
                      boxShadow: '0 0 4px #FF7A00'
                    }}
                    animate={{
                      x: [
                        Math.cos(i * 120 * Math.PI / 180) * 35,
                        Math.cos((i * 120 - 360) * Math.PI / 180) * 35
                      ],
                      y: [
                        Math.sin(i * 120 * Math.PI / 180) * 35,
                        Math.sin((i * 120 - 360) * Math.PI / 180) * 35
                      ],
                      opacity: [0, 0.8, 1, 1, 1, 0.8, 0.5, 0]
                    }}
                    transition={{
                      duration: 10,
                      times: [0, 0.2, 0.4, 0.5, 0.65, 0.75, 0.85, 1],
                      ease: 'linear'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Gravitational connection beams during passes */}
            {[0, 1, 2].map((passIndex) => (
              <motion.div
                key={`grav-beam-${passIndex}`}
                className="absolute origin-center"
                style={{
                  height: '2px',
                  background: `linear-gradient(to right, 
                    rgba(236, 72, 153, 0.6), 
                    rgba(255, 150, 100, 0.8) 50%, 
                    rgba(255, 122, 0, 0.6)
                  )`,
                  filter: 'blur(1.5px)',
                  boxShadow: '0 0 15px rgba(246, 97, 76, 0.6)'
                }}
                animate={{
                  width: [0, 0, 180, 140, 200, 120, 0],
                  x: [-90, -90, -90, -70, -100, -60, 0],
                  opacity: [0, 0, 0.9, 0.7, 1, 0.6, 0],
                  rotate: [0, 0, 15 * passIndex, -10 * passIndex, 20 * passIndex, -5 * passIndex, 0]
                }}
                transition={{
                  duration: 10,
                  times: [0, 0.35 + passIndex * 0.15, 0.4 + passIndex * 0.15, 0.5 + passIndex * 0.1, 0.65 + passIndex * 0.08, 0.75 + passIndex * 0.05, 1],
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Energy particles flowing during gravitational interaction */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`grav-particle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? 
                    'radial-gradient(circle, #ec4899, transparent)' :
                    'radial-gradient(circle, #FF7A00, transparent)',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#ec4899' : '#FF7A00'}`
                }}
                animate={{
                  x: [
                    -120 + (i % 3) * 20,
                    -60 + Math.sin(i) * 30,
                    0,
                    60 - Math.sin(i) * 30,
                    120 - (i % 3) * 20
                  ],
                  y: [
                    Math.sin(i * 0.7) * 40,
                    Math.sin(i * 0.7 + 1) * 50,
                    Math.sin(i * 0.7 + 2) * 20,
                    Math.sin(i * 0.7 + 3) * 50,
                    Math.sin(i * 0.7 + 4) * 40
                  ],
                  opacity: [0, 0, 0.8, 1, 0.8, 0.5, 0],
                  scale: [0, 0, 1.2, 1.5, 1.2, 0.8, 0]
                }}
                transition={{
                  duration: 10,
                  times: [0, 0.35, 0.4, 0.55, 0.7, 0.82, 1],
                  delay: i * 0.08,
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Unified Node - appears after gravitational collapse */}
            <motion.div
              className="absolute"
              style={{ 
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
              initial={{ scale: 0, opacity: 0, rotateZ: 0 }}
              animate={{ 
                scale: [0, 0, 0, 0, 0, 0, 0, 0, 1.5, 1.2, 1],
                opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1, 1],
                rotateZ: [0, 0, 0, 0, 0, 0, 0, 0, 180, 360, 360]
              }}
              transition={{ 
                duration: 10,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.75, 0.85, 0.92, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Gravitational collapse shockwave */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2.5, 4],
                  opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0.4, 0]
                }}
                transition={{
                  duration: 10,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.75, 0.85, 0.92, 1]
                }}
              >
                <div 
                  className="w-32 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4), rgba(236, 72, 153, 0.3), transparent 70%)',
                    filter: 'blur(15px)'
                  }}
                />
              </motion.div>

              {/* Unified couple ring */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Dual-color rotating ring */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="coupleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#FF7A00" />
                      </linearGradient>
                    </defs>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="url(#coupleGradient)" 
                      strokeWidth="2"
                      opacity="0.8"
                    />
                  </svg>
                </motion.div>

                {/* Pulsing center */}
                <motion.div 
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(255, 122, 0, 0.2))',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #ec4899, #FF7A00) 1'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(236, 72, 153, 0.4), 0 0 30px rgba(255, 122, 0, 0.4)',
                      '0 0 50px rgba(236, 72, 153, 0.6), 0 0 50px rgba(255, 122, 0, 0.6)',
                      '0 0 30px rgba(236, 72, 153, 0.4), 0 0 30px rgba(255, 122, 0, 0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-8 h-8 text-pink-400" />
                    <Heart className="w-6 h-6 text-orange-400 fill-orange-400" />
                    <User className="w-8 h-8 text-orange-400" />
                  </div>
                </motion.div>

                {/* Orbiting love particles */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={`love-particle-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#ec4899' : '#FF7A00',
                      boxShadow: `0 0 8px ${i % 2 === 0 ? '#ec4899' : '#FF7A00'}`
                    }}
                    animate={{
                      x: [
                        Math.cos(i * 60 * Math.PI / 180) * 50,
                        Math.cos((i * 60 + 360) * Math.PI / 180) * 50
                      ],
                      y: [
                        Math.sin(i * 60 * Math.PI / 180) * 50,
                        Math.sin((i * 60 + 360) * Math.PI / 180) * 50
                      ],
                      opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                      scale: [0, 0, 0, 0, 0, 0, 0, 0, 1.2, 1]
                    }}
                    transition={{
                      x: { duration: 6, repeat: Infinity, ease: 'linear' },
                      y: { duration: 6, repeat: Infinity, ease: 'linear' },
                      opacity: { duration: 10, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.75, 0.85, 1] },
                      scale: { duration: 10, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.75, 0.85, 1] }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Rest of sections */}
      <div className="space-y-6">
        {/* Merged: Relationship Pulse + Next Date Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-pink-500/30 p-6 md:p-8 overflow-hidden"
        >
          {/* Relationship Pulse Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-white">Relationship Pulse & Date Planner</h4>
              <p className="text-xs text-gray-400">Quality tracker + AI-powered suggestions</p>
            </div>
          </div>

          {/* Pulse Chart */}
          <div className="relative h-32 mb-6">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <line x1="0" y1="80" x2="400" y2="80" stroke="#374151" strokeWidth="1" strokeDasharray="4,4" />
              
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
                  <stop offset="50%" stopColor="#FF7A00" />
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
          <div className="grid grid-cols-3 gap-3 mb-8">
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

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent mb-8" />

          {/* Next Date Suggestion */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="text-white">Next Date Suggestion</h4>
              <p className="text-xs text-gray-400">Choose your vibe</p>
            </div>
          </div>

          {/* Date Vibe Selector */}
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

        {/* Love Garden - Living Relationship Ecosystem */}
        <LoveGarden />
      </div>
    </motion.div>
  );
}
