import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Sun, Sparkles, MessageCircle, MapPin, Heart,
  Clock, Timer, Lock, Unlock, ChevronDown, ChevronUp
} from 'lucide-react';
import { isMobile, getOptimalAnimationCount } from '../../utils/mobile-performance';

interface WhisperBlossom {
  id: number;
  x: number;
  y: number;
  message: string;
  isBloomed: boolean;
  plantedBy: string;
  plantedDate: string;
  color: string;
}

interface AnimalDialog {
  message: string;
  show: boolean;
  timestamp: number;
}

export function LoveGarden() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedWhisper, setSelectedWhisper] = useState<number | null>(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [newWhisperText, setNewWhisperText] = useState('');
  const [plantPosition, setPlantPosition] = useState({ x: 50, y: 60 });
  const [justPlanted, setJustPlanted] = useState(false);
  const [hoveredAnimal, setHoveredAnimal] = useState<string | null>(null);
  const [animalDialogs, setAnimalDialogs] = useState<Record<string, AnimalDialog>>({});
  
  // Garden nutrients (0-100)
  const [nutrients, setNutrients] = useState({
    qualityTime: 75,
    communication: 82,
    affirmation: 68
  });

  // Whisper Blossoms
  const [whispers, setWhispers] = useState<WhisperBlossom[]>([
    { id: 1, x: 30, y: 65, message: "I love how you make me laugh every day", isBloomed: true, plantedBy: "Sarah", plantedDate: "Dec 1", color: "#ec4899" },
    { id: 2, x: 70, y: 55, message: "You handled that difficult call with such grace", isBloomed: true, plantedBy: "James", plantedDate: "Dec 3", color: "#FF7A00" },
    { id: 3, x: 50, y: 70, message: "That sweater looks amazing on you", isBloomed: false, plantedBy: "Sarah", plantedDate: "Dec 5", color: "#a855f7" },
  ]);

  // Calculate garden health early (before useEffect hooks that depend on it)
  const gardenHealth = (nutrients.qualityTime + nutrients.communication + nutrients.affirmation) / 3;
  const isHealthy = gardenHealth > 70;

  // Mobile detection (memoized)
  const isMobileDevice = useMemo(() => isMobile(), []);

  // Memoized star positions for performance (fewer on mobile)
  const starPositions = useMemo(() => {
    const starCount = getOptimalAnimationCount(30);
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: Math.random() > 0.7 ? 1.5 : 1
    }));
  }, []);

  // Animal dialogs content
  const animalMessages = {
    sheep1: [
      "Love grows best in little moments 🌸",
      "Togetherness makes everything better 💕",
      "Every day with you is a gift 🎁"
    ],
    sheep2: [
      "Small gestures, big impact 💝",
      "You two are perfect together ✨",
      "Keep nurturing your bond 🌱"
    ],
    hedgehog1: [
      "Every moment shared is a treasure 💎",
      "Love is the little things 🌟",
      "Your garden is beautiful! 🌺"
    ],
    hedgehog2: [
      "Stay close, grow together 🌿",
      "Cherish each day 💫",
      "Love blooms with care 🌷"
    ],
    squirrel1: [
      "Collecting memories together! 🥜",
      "Love is an adventure! 🌳",
      "Every moment counts! ⏰"
    ],
    squirrel2: [
      "Building a life together! 🏡",
      "Growing stronger every day! 💪",
      "Your love inspires me! ✨"
    ]
  };

  // Show random animal dialog (memoized with useCallback)
  const showAnimalDialog = useCallback((animalId: string) => {
    const messages = animalMessages[animalId as keyof typeof animalMessages];
    if (messages) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setAnimalDialogs(prev => ({
        ...prev,
        [animalId]: {
          message: randomMessage,
          show: true,
          timestamp: Date.now()
        }
      }));

      setTimeout(() => {
        setAnimalDialogs(prev => ({
          ...prev,
          [animalId]: { ...prev[animalId], show: false }
        }));
      }, 4000);
    }
  }, []);

  // Random animal dialogs
  useEffect(() => {
    if (!isHealthy) return;
    
    const interval = setInterval(() => {
      const animalIds = Object.keys(animalMessages);
      const randomAnimal = animalIds[Math.floor(Math.random() * animalIds.length)];
      showAnimalDialog(randomAnimal);
    }, 12000);

    return () => clearInterval(interval);
  }, [isHealthy]);

  // Get time of day for day/night cycle
  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate nutrient changes (throttled for performance)
  useEffect(() => {
    const interval = setInterval(() => {
      setNutrients(prev => ({
        qualityTime: Math.max(60, Math.min(90, prev.qualityTime + (Math.random() - 0.5) * 3)),
        communication: Math.max(60, Math.min(95, prev.communication + (Math.random() - 0.5) * 2)),
        affirmation: Math.max(50, Math.min(85, prev.affirmation + (Math.random() - 0.5) * 2))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sky gradient based on time of day
  const skyGradients = {
    morning: 'from-orange-200/30 via-yellow-100/20 to-blue-200/30',
    afternoon: 'from-blue-300/30 via-cyan-200/20 to-blue-100/30',
    evening: 'from-orange-400/40 via-pink-300/30 to-purple-400/40',
    night: 'from-indigo-900/50 via-purple-900/40 to-blue-900/50'
  };

  const sunPosition = {
    morning: { x: '20%', y: '20%', size: 40, opacity: 0.8 },
    afternoon: { x: '50%', y: '15%', size: 50, opacity: 1 },
    evening: { x: '80%', y: '25%', size: 45, opacity: 0.7 },
    night: { x: '70%', y: '20%', size: 30, opacity: 0.5 }
  };

  const currentSun = sunPosition[timeOfDay];

  // Plant a new whisper with animation (memoized)
  const plantWhisper = useCallback(() => {
    if (newWhisperText.trim()) {
      const newWhisper: WhisperBlossom = {
        id: Date.now(),
        x: 40 + Math.random() * 20,
        y: 55 + Math.random() * 15,
        message: newWhisperText,
        isBloomed: false,
        plantedBy: "You",
        plantedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        color: ['#ec4899', '#FF7A00', '#a855f7', '#3b82f6', '#10b981'][Math.floor(Math.random() * 5)]
      };
      setWhispers(prev => [...prev, newWhisper]);
      setNewWhisperText('');
      setShowPlantModal(false);
      setJustPlanted(true);
      setTimeout(() => setJustPlanted(false), 3000);
    }
  }, [newWhisperText]);

  // Bloom a whisper (memoized)
  const bloomWhisper = useCallback((id: number) => {
    setWhispers(prev => prev.map(w => 
      w.id === id ? { ...w, isBloomed: true } : w
    ));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-pink-500/20 overflow-hidden"
    >
      {/* Header */}
      <div 
        className="p-6 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-green-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h4 className="text-white">Love Garden</h4>
              <p className="text-xs text-gray-400">Grows stronger when you're together</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400">
              {Math.round(gardenHealth)}% {isHealthy ? 'Thriving' : 'Growing'}
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Garden Canvas */}
            <div className="px-6 pb-6">
              {/* Proximity Message */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-xl border border-pink-500/20"
              >
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span>
                    Your garden thrives the more you two are closer together. 
                    <span className="text-pink-400"> Every moment shared makes it bloom brighter.</span>
                  </span>
                </div>
              </motion.div>

              <div 
                className={`relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b ${skyGradients[timeOfDay]} border border-gray-700/50`}
                style={{ 
                  transition: 'background 2s ease-in-out'
                }}
              >
                {/* Sky Background */}
                <div className="absolute inset-0">
                  {/* Sun/Moon */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      left: currentSun.x,
                      top: currentSun.y,
                      width: currentSun.size,
                      height: currentSun.size,
                      opacity: nutrients.communication / 100,
                      background: timeOfDay === 'night' 
                        ? 'radial-gradient(circle, #f0f0f0, #d4d4d4)'
                        : 'radial-gradient(circle, #fbbf24, #f59e0b)',
                      boxShadow: timeOfDay === 'night'
                        ? '0 0 30px rgba(255, 255, 255, 0.5)'
                        : `0 0 40px rgba(251, 191, 36, ${nutrients.communication / 100})`,
                      filter: 'blur(1px)'
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [(nutrients.communication / 100) * 0.9, nutrients.communication / 100, (nutrients.communication / 100) * 0.9]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Clouds */}
                  {['morning', 'afternoon'].includes(timeOfDay) && [...Array(4)].map((_, i) => (
                    <motion.div
                      key={`cloud-${i}`}
                      className="absolute"
                      style={{
                        top: `${15 + i * 10}%`
                      }}
                      animate={{
                        x: ['-15%', '115%']
                      }}
                      transition={{
                        duration: 40 + i * 10,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 8
                      }}
                    >
                      <svg width="80" height="40" viewBox="0 0 200 100">
                        <ellipse cx="50" cy="60" rx="35" ry="25" fill="rgba(255, 255, 255, 0.15)" />
                        <ellipse cx="80" cy="55" rx="40" ry="30" fill="rgba(255, 255, 255, 0.2)" />
                        <ellipse cx="110" cy="60" rx="35" ry="25" fill="rgba(255, 255, 255, 0.15)" />
                        <ellipse cx="140" cy="65" rx="30" ry="20" fill="rgba(255, 255, 255, 0.1)" />
                      </svg>
                    </motion.div>
                  ))}

                  {/* Optimized Stars (night only) */}
                  {timeOfDay === 'night' && starPositions.map((star) => (
                    <motion.div
                      key={`star-${star.id}`}
                      className="absolute bg-white rounded-full"
                      style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        boxShadow: '0 0 3px rgba(255, 255, 255, 0.9)'
                      }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}

                  {/* Birds flying */}
                  {isHealthy && ['morning', 'afternoon', 'evening'].includes(timeOfDay) && [...Array(3)].map((_, i) => (
                    <motion.div
                      key={`bird-${i}`}
                      className="absolute"
                      style={{
                        top: `${20 + i * 15}%`
                      }}
                      animate={{
                        x: ['110%', '-15%']
                      }}
                      transition={{
                        duration: 25 + i * 5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 10
                      }}
                    >
                      <motion.svg 
                        width="24" 
                        height="16" 
                        viewBox="0 0 40 20"
                        animate={{
                          rotateZ: [0, -5, 0, 5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <motion.path
                          d="M10,10 Q15,5 20,10"
                          stroke={timeOfDay === 'evening' ? '#fbbf24' : '#374151'}
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          animate={{
                            d: [
                              "M10,10 Q15,5 20,10",
                              "M10,10 Q15,8 20,10",
                              "M10,10 Q15,5 20,10"
                            ]
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity
                          }}
                        />
                        <motion.path
                          d="M20,10 Q25,5 30,10"
                          stroke={timeOfDay === 'evening' ? '#fbbf24' : '#374151'}
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          animate={{
                            d: [
                              "M20,10 Q25,5 30,10",
                              "M20,10 Q25,8 30,10",
                              "M20,10 Q25,5 30,10"
                            ]
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.1
                          }}
                        />
                      </motion.svg>
                    </motion.div>
                  ))}

                  {/* Fireflies (if healthy) - fewer on mobile */}
                  {isHealthy && ['evening', 'night'].includes(timeOfDay) && [...Array(getOptimalAnimationCount(8))].map((_, i) => (
                    <motion.div
                      key={`firefly-${i}`}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #fbbf24, transparent)',
                        boxShadow: '0 0 8px #fbbf24',
                        filter: 'blur(1px)'
                      }}
                      animate={{
                        x: [
                          `${15 + i * 7}%`,
                          `${25 + i * 6}%`,
                          `${10 + i * 8}%`,
                          `${15 + i * 7}%`
                        ],
                        y: [
                          `${25 + i * 4}%`,
                          `${15 + i * 5}%`,
                          `${30 + i * 3}%`,
                          `${25 + i * 4}%`
                        ],
                        opacity: [0, 0.8, 1, 0.8, 0]
                      }}
                      transition={{
                        duration: 6 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}

                  {/* Rain (for quality time) */}
                  {nutrients.qualityTime > 80 && [...Array(20)].map((_, i) => (
                    <motion.div
                      key={`rain-${i}`}
                      className="absolute w-0.5 h-4 bg-gradient-to-b from-blue-300/60 to-transparent"
                      style={{
                        left: `${(i * 5) % 100}%`,
                        top: '-20px'
                      }}
                      animate={{
                        y: [0, 520]
                      }}
                      transition={{
                        duration: 1 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'linear'
                      }}
                    />
                  ))}
                </div>

                {/* Ground Layer */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%]">
                  {/* Ground gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b transition-all duration-2000`}
                    style={{
                      background: `linear-gradient(to bottom, 
                        rgba(34, 197, 94, ${isHealthy ? 0.3 : 0.2}), 
                        rgba(22, 163, 74, ${isHealthy ? 0.4 : 0.25}), 
                        rgba(21, 128, 61, ${isHealthy ? 0.5 : 0.3})
                      )`
                    }}
                  />

                  {/* Ground texture (SVG grass) */}
                  <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isHealthy ? "#22c55e" : "#86efac"} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={isHealthy ? "#16a34a" : "#4ade80"} stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    {[...Array(30)].map((_, i) => {
                      const x = i * 40;
                      const height = 60 + Math.random() * 40;
                      const curve = 10 + Math.random() * 15;
                      return (
                        <motion.path
                          key={`grass-${i}`}
                          d={`M${x},100 Q${x + curve},${100 - height} ${x + 5},100`}
                          fill="url(#grassGrad)"
                          opacity={0.7}
                          animate={{
                            d: [
                              `M${x},100 Q${x + curve},${100 - height} ${x + 5},100`,
                              `M${x},100 Q${x + curve + 3},${100 - height - 2} ${x + 5},100`,
                              `M${x},100 Q${x + curve},${100 - height} ${x + 5},100`
                            ]
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: Math.random() * 2
                          }}
                        />
                      );
                    })}
                  </svg>

                  {/* Bushes */}
                  {[
                    { x: '15%', size: 1 },
                    { x: '85%', size: 0.8 }
                  ].map((bush, idx) => (
                    <svg 
                      key={`bush-${idx}`}
                      className="absolute bottom-16" 
                      style={{ left: bush.x, transform: `scale(${bush.size})` }}
                      width="60" 
                      height="40" 
                      viewBox="0 0 100 60"
                    >
                      <motion.ellipse
                        cx="30" cy="40" rx="25" ry="20"
                        fill={isHealthy ? "#15803d" : "#4ade80"}
                        opacity="0.8"
                        animate={{ ry: [20, 22, 20] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                      />
                      <motion.ellipse
                        cx="50" cy="35" rx="30" ry="25"
                        fill={isHealthy ? "#16a34a" : "#4ade80"}
                        opacity="0.9"
                        animate={{ ry: [25, 27, 25] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                      />
                      <motion.ellipse
                        cx="70" cy="40" rx="25" ry="20"
                        fill={isHealthy ? "#15803d" : "#4ade80"}
                        opacity="0.8"
                        animate={{ ry: [20, 22, 20] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                      />
                    </svg>
                  ))}

                  {/* Multiple Trees - Oak style */}
                  {[
                    { x: '8%', scale: 1.2, id: 'oak-left' },
                    { x: '92%', scale: 1, id: 'oak-right' }
                  ].map((tree, idx) => (
                    <svg 
                      key={tree.id}
                      className="absolute bottom-0" 
                      style={{ left: tree.x, transform: `scale(${tree.scale})` }}
                      width="80" 
                      height="140" 
                      viewBox="0 0 120 200"
                    >
                      <defs>
                        <linearGradient id={`trunkGrad-oak-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#92400e" />
                          <stop offset="100%" stopColor="#78350f" />
                        </linearGradient>
                        <radialGradient id={`foliageGrad-oak-${idx}`}>
                          <stop offset="0%" stopColor={isHealthy ? "#16a34a" : "#86efac"} />
                          <stop offset="100%" stopColor={isHealthy ? "#15803d" : "#4ade80"} />
                        </radialGradient>
                      </defs>
                      <path
                        d="M55,200 L55,120 Q55,115 57,110 L60,90"
                        stroke={`url(#trunkGrad-oak-${idx})`}
                        strokeWidth="14"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M60,110 Q50,100 40,95"
                        stroke="#92400e"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M60,120 Q70,110 80,105"
                        stroke="#92400e"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <motion.ellipse
                        cx="60" cy="70" rx="45" ry="50"
                        fill={`url(#foliageGrad-oak-${idx})`}
                        opacity="0.85"
                        animate={{
                          ry: [50, 53, 50],
                          rx: [45, 47, 45]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                      />
                      <motion.ellipse
                        cx="40" cy="90" rx="30" ry="35"
                        fill={`url(#foliageGrad-oak-${idx})`}
                        opacity="0.75"
                        animate={{
                          ry: [35, 37, 35]
                        }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                      />
                      <motion.ellipse
                        cx="80" cy="95" rx="30" ry="35"
                        fill={`url(#foliageGrad-oak-${idx})`}
                        opacity="0.75"
                        animate={{
                          ry: [35, 38, 35]
                        }}
                        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                      />
                    </svg>
                  ))}

                  {/* Pine Trees */}
                  {[
                    { x: '25%', scale: 0.9, id: 'pine-left' },
                    { x: '75%', scale: 1.1, id: 'pine-right' }
                  ].map((tree, idx) => (
                    <svg 
                      key={tree.id}
                      className="absolute bottom-0" 
                      style={{ left: tree.x, transform: `scale(${tree.scale})` }}
                      width="60" 
                      height="120" 
                      viewBox="0 0 100 180"
                    >
                      <defs>
                        <linearGradient id={`pineGrad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={isHealthy ? "#15803d" : "#4ade80"} />
                          <stop offset="100%" stopColor={isHealthy ? "#166534" : "#22c55e"} />
                        </linearGradient>
                      </defs>
                      <rect x="45" y="140" width="10" height="60" fill="#78350f" rx="2" />
                      <motion.polygon
                        points="50,40 20,90 80,90"
                        fill={`url(#pineGrad-${idx})`}
                        opacity="0.9"
                        animate={{
                          points: [
                            "50,40 20,90 80,90",
                            "50,38 18,90 82,90",
                            "50,40 20,90 80,90"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                      />
                      <motion.polygon
                        points="50,70 25,110 75,110"
                        fill={`url(#pineGrad-${idx})`}
                        opacity="0.85"
                        animate={{
                          points: [
                            "50,70 25,110 75,110",
                            "50,68 23,110 77,110",
                            "50,70 25,110 75,110"
                          ]
                        }}
                        transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                      />
                      <motion.polygon
                        points="50,100 30,140 70,140"
                        fill={`url(#pineGrad-${idx})`}
                        opacity="0.8"
                        animate={{
                          points: [
                            "50,100 30,140 70,140",
                            "50,98 28,140 72,140",
                            "50,100 30,140 70,140"
                          ]
                        }}
                        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                      />
                    </svg>
                  ))}

                  {/* Center Milestone Tree (larger) */}
                  <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-56 opacity-70" viewBox="0 0 180 230">
                    <defs>
                      <linearGradient id="mainTrunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#92400e" />
                        <stop offset="100%" stopColor="#78350f" />
                      </linearGradient>
                      <radialGradient id="mainFoliageGrad">
                        <stop offset="0%" stopColor={isHealthy ? "#16a34a" : "#86efac"} />
                        <stop offset="100%" stopColor={isHealthy ? "#15803d" : "#4ade80"} />
                      </radialGradient>
                    </defs>
                    <path
                      d="M85,230 L85,120 Q85,115 87,105 L90,80"
                      stroke="url(#mainTrunkGrad)"
                      strokeWidth="18"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M90,130 Q70,115 55,110"
                      stroke="#92400e"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M90,140 Q110,125 125,120"
                      stroke="#92400e"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <motion.ellipse
                      cx="90" cy="75" rx="55" ry="60"
                      fill="url(#mainFoliageGrad)"
                      opacity="0.9"
                      animate={{
                        ry: [60, 64, 60],
                        rx: [55, 58, 55]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.ellipse
                      cx="90" cy="95" rx="48" ry="52"
                      fill="url(#mainFoliageGrad)"
                      opacity="0.85"
                      animate={{
                        ry: [52, 55, 52]
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                  </svg>

                  {/* Mushrooms near trees */}
                  {[
                    { x: '12%', y: '8%', size: 0.8, color: '#ef4444' },
                    { x: '15%', y: '12%', size: 0.6, color: '#f97316' },
                    { x: '88%', y: '10%', size: 0.9, color: '#ec4899' },
                    { x: '85%', y: '14%', size: 0.7, color: '#a855f7' }
                  ].map((mushroom, idx) => (
                    <motion.div
                      key={`mushroom-${idx}`}
                      className="absolute bottom-0"
                      style={{
                        left: mushroom.x,
                        bottom: mushroom.y,
                        transform: `scale(${mushroom.size})`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: mushroom.size, opacity: 1 }}
                      transition={{ duration: 1, delay: idx * 0.3 }}
                    >
                      <svg width="16" height="20" viewBox="0 0 40 50">
                        {/* Cap */}
                        <motion.ellipse
                          cx="20" cy="15" rx="18" ry="12"
                          fill={mushroom.color}
                          opacity="0.85"
                          animate={{ ry: [12, 13, 12] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                        />
                        <ellipse cx="20" cy="15" rx="14" ry="9" fill={`${mushroom.color}33`} />
                        {/* Spots */}
                        <circle cx="14" cy="12" r="2.5" fill="rgba(255, 255, 255, 0.6)" />
                        <circle cx="24" cy="10" r="2" fill="rgba(255, 255, 255, 0.5)" />
                        <circle cx="20" cy="18" r="1.5" fill="rgba(255, 255, 255, 0.4)" />
                        {/* Stem */}
                        <rect x="16" y="15" width="8" height="20" rx="4" fill="#f5f5f5" opacity="0.9" />
                        <ellipse cx="20" cy="35" rx="6" ry="3" fill="#e5e5e5" opacity="0.8" />
                      </svg>
                    </motion.div>
                  ))}

                  {/* Wildflowers scattered in grass */}
                  {isHealthy && [
                    { x: '18%', y: '18%', color: '#fbbf24', size: 0.7 },
                    { x: '28%', y: '15%', color: '#ec4899', size: 0.8 },
                    { x: '42%', y: '20%', color: '#a855f7', size: 0.6 },
                    { x: '58%', y: '16%', color: '#3b82f6', size: 0.75 },
                    { x: '68%', y: '22%', color: '#f97316', size: 0.65 },
                    { x: '78%', y: '17%', color: '#10b981', size: 0.7 }
                  ].map((flower, idx) => (
                    <motion.div
                      key={`wildflower-${idx}`}
                      className="absolute"
                      style={{
                        left: flower.x,
                        bottom: flower.y,
                        transform: `scale(${flower.size})`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: flower.size, 
                        opacity: 1,
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        scale: { duration: 0.8, delay: idx * 0.2 },
                        opacity: { duration: 0.8, delay: idx * 0.2 },
                        rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }
                      }}
                    >
                      <svg width="12" height="14" viewBox="0 0 30 35">
                        {/* Petals */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <ellipse
                            key={i}
                            cx="15" cy="12" rx="4" ry="6"
                            fill={flower.color}
                            opacity="0.8"
                            style={{ transformOrigin: '15px 15px' }}
                            transform={`rotate(${angle} 15 15)`}
                          />
                        ))}
                        {/* Center */}
                        <circle cx="15" cy="15" r="3" fill="#fbbf24" opacity="0.9" />
                        {/* Stem */}
                        <line x1="15" y1="18" x2="15" y2="35" stroke="#16a34a" strokeWidth="1.5" />
                      </svg>
                    </motion.div>
                  ))}

                  {/* Squirrels climbing trees */}
                  {isHealthy && [
                    { x: '8%', id: 'squirrel1', direction: 1 },
                    { x: '92%', id: 'squirrel2', direction: -1 }
                  ].map((squirrel, idx) => (
                    <motion.div
                      key={squirrel.id}
                      className="absolute bottom-0 cursor-pointer"
                      style={{
                        left: squirrel.x,
                        zIndex: 5
                      }}
                      animate={{
                        y: [0, -60, -100, -60, 0]
                      }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 9
                      }}
                      onMouseEnter={() => {
                        setHoveredAnimal(squirrel.id);
                        showAnimalDialog(squirrel.id);
                      }}
                      onMouseLeave={() => setHoveredAnimal(null)}
                    >
                      <motion.svg
                        width="28"
                        height="32"
                        viewBox="0 0 50 60"
                        animate={{
                          scaleX: hoveredAnimal === squirrel.id ? [squirrel.direction, squirrel.direction * 1.1] : squirrel.direction
                        }}
                      >
                        {/* Bushy tail */}
                        <motion.path
                          d="M25,35 Q15,25 12,15 Q18,20 25,22"
                          fill="#8B4513"
                          opacity="0.9"
                          animate={{
                            d: [
                              "M25,35 Q15,25 12,15 Q18,20 25,22",
                              "M25,35 Q14,26 10,16 Q17,21 25,23",
                              "M25,35 Q15,25 12,15 Q18,20 25,22"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Body */}
                        <ellipse cx="25" cy="38" rx="8" ry="11" fill="#A0522D" />
                        {/* Head */}
                        <ellipse cx="25" cy="28" rx="6" ry="7" fill="#CD853F" />
                        {/* Ear */}
                        <ellipse cx="22" cy="24" rx="2" ry="3" fill="#A0522D" />
                        <ellipse cx="28" cy="24" rx="2" ry="3" fill="#A0522D" />
                        {/* Eye */}
                        <circle cx="24" cy="28" r="1.5" fill="#000" />
                        {/* Acorn (holding) */}
                        <ellipse cx="30" cy="42" rx="3" ry="4" fill="#8B4513" />
                        <rect x="29" y="38" width="2" height="3" fill="#654321" />
                      </motion.svg>

                      {/* Dialog bubble */}
                      {animalDialogs[squirrel.id]?.show && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-black/95 backdrop-blur-md rounded-xl p-3 border border-orange-500/40 shadow-xl"
                          style={{ zIndex: 20 }}
                        >
                          <div className="text-xs text-white text-center leading-relaxed">
                            {animalDialogs[squirrel.id].message}
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95" />
                        </motion.div>
                      )}

                      {/* Heart sparkles when hovered */}
                      {hoveredAnimal === squirrel.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], y: -30 }}
                          transition={{ duration: 1.5 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2"
                        >
                          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Sheep grazing */}
                  {isHealthy && [
                    { x: '20%', id: 'sheep1', positions: [20, 28, 35, 28, 20] },
                    { x: '65%', id: 'sheep2', positions: [65, 72, 78, 72, 65] }
                  ].map((sheep) => (
                    <motion.div
                      key={sheep.id}
                      className="absolute bottom-12 cursor-pointer"
                      animate={{
                        left: sheep.positions.map(p => `${p}%`)
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      onMouseEnter={() => {
                        setHoveredAnimal(sheep.id);
                        showAnimalDialog(sheep.id);
                      }}
                      onMouseLeave={() => setHoveredAnimal(null)}
                    >
                      <motion.svg
                        width="40"
                        height="32"
                        viewBox="0 0 70 50"
                        animate={{
                          scale: hoveredAnimal === sheep.id ? 1.15 : 1
                        }}
                      >
                        {/* Fluffy body */}
                        <ellipse cx="35" cy="28" rx="20" ry="15" fill="#f5f5f5" opacity="0.95" />
                        <circle cx="25" cy="22" r="8" fill="#ffffff" opacity="0.9" />
                        <circle cx="45" cy="22" r="8" fill="#ffffff" opacity="0.9" />
                        <circle cx="35" cy="18" r="9" fill="#ffffff" opacity="0.95" />
                        <circle cx="35" cy="32" r="8" fill="#f5f5f5" opacity="0.9" />
                        
                        {/* Head */}
                        <ellipse cx="50" cy="24" rx="8" ry="9" fill="#e5e5e5" />
                        
                        {/* Ears */}
                        <ellipse cx="48" cy="18" rx="3" ry="5" fill="#d4d4d4" />
                        <ellipse cx="54" cy="18" rx="3" ry="5" fill="#d4d4d4" />
                        
                        {/* Face details */}
                        <circle cx="52" cy="24" r="1.5" fill="#000" />
                        <circle cx="48" cy="26" r="1" fill="#ffc0cb" />
                        
                        {/* Legs */}
                        <rect x="27" y="38" width="3" height="10" fill="#d4d4d4" rx="1.5" />
                        <rect x="35" y="38" width="3" height="10" fill="#d4d4d4" rx="1.5" />
                        <rect x="43" y="38" width="3" height="10" fill="#d4d4d4" rx="1.5" />
                        
                        {/* Tail */}
                        <motion.circle
                          cx="18"
                          cy="30"
                          r="4"
                          fill="#ffffff"
                          animate={{
                            x: [0, -2, 0, 2, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.svg>

                      {/* Grass eating animation */}
                      <motion.div
                        className="absolute top-8 left-1/2 text-green-500 text-xs"
                        animate={{
                          opacity: [0, 0.5, 0],
                          y: [0, -5, -10]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        🌱
                      </motion.div>

                      {/* Dialog bubble */}
                      {animalDialogs[sheep.id]?.show && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-black/95 backdrop-blur-md rounded-xl p-3 border border-pink-500/40 shadow-xl"
                          style={{ zIndex: 20 }}
                        >
                          <div className="text-xs text-white text-center leading-relaxed">
                            {animalDialogs[sheep.id].message}
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95" />
                        </motion.div>
                      )}

                      {/* Heart sparkles when hovered */}
                      {hoveredAnimal === sheep.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], y: -25 }}
                          transition={{ duration: 1.5 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2"
                        >
                          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Hedgehogs waddling */}
                  {isHealthy && [
                    { x: '35%', id: 'hedgehog1' },
                    { x: '55%', id: 'hedgehog2' }
                  ].map((hedgehog, idx) => {
                    const currentScaleX = idx === 0 ? [1, 1, 1, -1, -1, -1, 1] : [-1, -1, -1, 1, 1, 1, -1];
                    
                    return (
                      <motion.div
                        key={hedgehog.id}
                        className="absolute bottom-10 cursor-pointer"
                        style={{
                          left: hedgehog.x,
                          zIndex: 5
                        }}
                        animate={{
                          x: idx === 0 ? [0, 40, 80, 40, 0] : [0, -40, -80, -40, 0]
                        }}
                        transition={{
                          duration: 24,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: idx * 12
                        }}
                        onMouseEnter={() => {
                          setHoveredAnimal(hedgehog.id);
                          showAnimalDialog(hedgehog.id);
                        }}
                        onMouseLeave={() => setHoveredAnimal(null)}
                      >
                        <motion.svg
                          width="30"
                          height="24"
                          viewBox="0 0 60 40"
                          animate={{
                            y: [0, -2, 0, -2, 0],
                            scale: hoveredAnimal === hedgehog.id ? 1.2 : 1,
                            scaleX: currentScaleX
                          }}
                          transition={{
                            y: { duration: 0.8, repeat: Infinity },
                            scale: { duration: 0.2 },
                            scaleX: { duration: 24, repeat: Infinity, ease: 'easeInOut', delay: idx * 12 }
                          }}
                        >
                        {/* Spiky back */}
                        {[...Array(12)].map((_, i) => (
                          <motion.line
                            key={`spike-${i}`}
                            x1={15 + i * 3}
                            y1="20"
                            x2={13 + i * 3}
                            y2="10"
                            stroke="#8B4513"
                            strokeWidth="2"
                            strokeLinecap="round"
                            animate={{
                              y1: [20, 19, 20],
                              y2: [10, 9, 10]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.05
                            }}
                          />
                        ))}
                        
                        {/* Body */}
                        <ellipse cx="30" cy="25" rx="18" ry="10" fill="#D2691E" opacity="0.9" />
                        
                        {/* Face */}
                        <ellipse cx="45" cy="26" rx="8" ry="7" fill="#F4A460" />
                        
                        {/* Nose */}
                        <circle cx="50" cy="27" r="2" fill="#000" />
                        
                        {/* Eye */}
                        <circle cx="46" cy="24" r="1.5" fill="#000" />
                        
                        {/* Tiny feet */}
                        <ellipse cx="24" cy="33" rx="3" ry="2" fill="#8B4513" />
                        <ellipse cx="36" cy="33" rx="3" ry="2" fill="#8B4513" />
                      </motion.svg>

                      {/* Dialog bubble */}
                      {animalDialogs[hedgehog.id]?.show && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-black/95 backdrop-blur-md rounded-xl p-3 border border-purple-500/40 shadow-xl"
                          style={{ zIndex: 20 }}
                        >
                          <div className="text-xs text-white text-center leading-relaxed">
                            {animalDialogs[hedgehog.id].message}
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95" />
                        </motion.div>
                      )}

                      {/* Heart sparkles when hovered */}
                      {hoveredAnimal === hedgehog.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], y: -20 }}
                          transition={{ duration: 1.5 }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2"
                        >
                          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                        </motion.div>
                      )}
                    </motion.div>
                    );
                  })}

                  {/* Butterflies (if healthy) - fewer on mobile */}
                  {isHealthy && [...Array(getOptimalAnimationCount(4))].map((_, i) => (
                    <motion.div
                      key={`butterfly-${i}`}
                      className="absolute"
                      style={{
                        left: `${20 + i * 20}%`,
                        bottom: `${40 + i * 10}%`
                      }}
                      animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -20, -10, 0],
                      }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 2
                      }}
                    >
                      <motion.svg
                        width="20"
                        height="16"
                        viewBox="0 0 40 32"
                        animate={{
                          rotateZ: [-10, 10, -10]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <motion.ellipse
                          cx="12" cy="16" rx="10" ry="14"
                          fill="#ec4899"
                          opacity="0.8"
                          animate={{
                            rx: [10, 8, 10],
                            ry: [14, 16, 14]
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity
                          }}
                        />
                        <motion.ellipse
                          cx="28" cy="16" rx="10" ry="14"
                          fill="#a855f7"
                          opacity="0.8"
                          animate={{
                            rx: [10, 8, 10],
                            ry: [14, 16, 14]
                          }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            delay: 0.15
                          }}
                        />
                        <ellipse cx="20" cy="16" rx="2" ry="8" fill="#374151" />
                      </motion.svg>
                    </motion.div>
                  ))}

                  {/* Dragonflies hovering */}
                  {isHealthy && getOptimalAnimationCount(2) >= 2 && [
                    { x: '30%', y: '45%', delay: 0 },
                    { x: '70%', y: '38%', delay: 3 }
                  ].map((dragonfly, idx) => (
                    <motion.div
                      key={`dragonfly-${idx}`}
                      className="absolute"
                      style={{
                        left: dragonfly.x,
                        bottom: dragonfly.y
                      }}
                      animate={{
                        x: [0, 15, -10, 20, 0],
                        y: [0, -10, -5, -15, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: dragonfly.delay
                      }}
                    >
                      <svg width="24" height="8" viewBox="0 0 60 20">
                        {/* Wings */}
                        <motion.ellipse
                          cx="20" cy="10" rx="12" ry="6"
                          fill="#60a5fa"
                          opacity="0.4"
                          animate={{ rx: [12, 14, 12], opacity: [0.4, 0.6, 0.4] }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                        />
                        <motion.ellipse
                          cx="40" cy="10" rx="12" ry="6"
                          fill="#60a5fa"
                          opacity="0.4"
                          animate={{ rx: [12, 14, 12], opacity: [0.4, 0.6, 0.4] }}
                          transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
                        />
                        {/* Body */}
                        <rect x="28" y="8" width="4" height="12" rx="2" fill="#3b82f6" />
                        <circle cx="30" cy="8" r="2" fill="#1e40af" />
                      </svg>
                    </motion.div>
                  ))}

                  {/* Bees visiting flowers */}
                  {isHealthy && getOptimalAnimationCount(3) >= 2 && [
                    { path: ['40%', '45%', '50%', '45%', '40%'], yPath: ['25%', '28%', '22%', '30%', '25%'], delay: 0 },
                    { path: ['55%', '60%', '58%', '62%', '55%'], yPath: ['30%', '26%', '32%', '28%', '30%'], delay: 2 }
                  ].map((bee, idx) => (
                    <motion.div
                      key={`bee-${idx}`}
                      className="absolute"
                      animate={{
                        left: bee.path,
                        bottom: bee.yPath
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: bee.delay
                      }}
                    >
                      <motion.svg
                        width="16"
                        height="12"
                        viewBox="0 0 40 30"
                        animate={{ rotateZ: [-5, 5, -5] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                      >
                        {/* Wings */}
                        <motion.ellipse
                          cx="15" cy="12" rx="8" ry="5"
                          fill="#f0f0f0"
                          opacity="0.6"
                          animate={{ ry: [5, 7, 5] }}
                          transition={{ duration: 0.15, repeat: Infinity }}
                        />
                        <motion.ellipse
                          cx="25" cy="12" rx="8" ry="5"
                          fill="#f0f0f0"
                          opacity="0.6"
                          animate={{ ry: [5, 7, 5] }}
                          transition={{ duration: 0.15, repeat: Infinity, delay: 0.075 }}
                        />
                        {/* Body */}
                        <ellipse cx="20" cy="15" rx="6" ry="4" fill="#fbbf24" />
                        <rect x="17" y="13" width="6" height="2" fill="#000" opacity="0.8" />
                        <rect x="17" y="16" width="6" height="2" fill="#000" opacity="0.8" />
                      </motion.svg>
                    </motion.div>
                  ))}

                  {/* Ladybugs on bushes */}
                  {isHealthy && [
                    { x: '15%', y: '26%', delay: 0 },
                    { x: '85%', y: '24%', delay: 4 }
                  ].map((ladybug, idx) => (
                    <motion.div
                      key={`ladybug-${idx}`}
                      className="absolute"
                      style={{
                        left: ladybug.x,
                        bottom: ladybug.y
                      }}
                      animate={{
                        x: [0, 8, 16, 8, 0],
                        y: [0, 2, 0, -2, 0]
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: ladybug.delay
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 25 25">
                        {/* Body */}
                        <ellipse cx="12.5" cy="14" rx="10" ry="8" fill="#dc2626" />
                        {/* Head */}
                        <circle cx="12.5" cy="8" r="4" fill="#000" />
                        {/* Spots */}
                        <circle cx="9" cy="12" r="2" fill="#000" />
                        <circle cx="16" cy="12" r="2" fill="#000" />
                        <circle cx="10" cy="17" r="1.5" fill="#000" />
                        <circle cx="15" cy="17" r="1.5" fill="#000" />
                        {/* Wing line */}
                        <line x1="12.5" y1="10" x2="12.5" y2="20" stroke="#000" strokeWidth="1" />
                      </svg>
                    </motion.div>
                  ))}

                  {/* Rabbits hopping (if healthy) */}
                  {isHealthy && [...Array(2)].map((_, i) => (
                    <motion.div
                      key={`rabbit-${i}`}
                      className="absolute bottom-12"
                      style={{
                        left: i === 0 ? '10%' : '80%'
                      }}
                      animate={{
                        x: i === 0 ? [0, 60, 120, 180, 240] : [0, -60, -120, -180, -240],
                        y: [0, -15, 0, -12, 0]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 7
                      }}
                    >
                      <svg width="24" height="20" viewBox="0 0 40 32">
                        <motion.ellipse
                          cx="12" cy="8" rx="3" ry="8"
                          fill="#d4d4d4"
                          animate={{
                            ry: [8, 7, 8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                        <motion.ellipse
                          cx="18" cy="8" rx="3" ry="8"
                          fill="#d4d4d4"
                          animate={{
                            ry: [8, 7, 8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.1
                          }}
                        />
                        <ellipse cx="15" cy="20" rx="8" ry="7" fill="#e5e5e5" />
                        <ellipse cx="15" cy="14" rx="6" ry="5" fill="#f5f5f5" />
                        <circle cx="22" cy="22" r="3" fill="#ffffff" />
                      </svg>
                    </motion.div>
                  ))}

                  {/* Floating heart sparkles when healthy - fewer on mobile */}
                  {isHealthy && [...Array(getOptimalAnimationCount(6))].map((_, i) => (
                    <motion.div
                      key={`heart-sparkle-${i}`}
                      className="absolute"
                      style={{
                        left: `${15 + i * 15}%`,
                        bottom: `${20 + (i % 3) * 15}%`
                      }}
                      animate={{
                        y: [0, -40, -80],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: 'easeOut'
                      }}
                    >
                      <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                    </motion.div>
                  ))}

                  {/* Whisper Blossoms */}
                  {whispers.map((whisper) => (
                    <motion.div
                      key={whisper.id}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${whisper.x}%`,
                        bottom: `${whisper.y}%`,
                        willChange: 'transform'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.15, y: -5 }}
                      onClick={() => {
                        if (whisper.isBloomed) {
                          setSelectedWhisper(whisper.id === selectedWhisper ? null : whisper.id);
                        }
                      }}
                    >
                      {/* Stem */}
                      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2" viewBox="0 0 10 60" style={{ height: '60px' }}>
                        <motion.line
                          x1="5" y1="60" x2="5" y2="0"
                          stroke="#16a34a"
                          strokeWidth="2"
                          strokeLinecap="round"
                          animate={{
                            x2: [5, 5.5, 5],
                            y2: whisper.isBloomed ? [0, -2, 0] : 0
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </svg>

                      {/* Flower */}
                      <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        animate={{
                          rotate: whisper.isBloomed ? [0, 5, -5, 0] : 0,
                          y: whisper.isBloomed ? [0, -2, 0] : 0
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {whisper.isBloomed ? (
                          <svg width="36" height="36" viewBox="0 0 100 100">
                            <defs>
                              <radialGradient id={`flowerGrad-${whisper.id}`}>
                                <stop offset="0%" stopColor={whisper.color} stopOpacity="1" />
                                <stop offset="100%" stopColor={whisper.color} stopOpacity="0.7" />
                              </radialGradient>
                            </defs>
                            {[0, 72, 144, 216, 288].map((angle, i) => (
                              <motion.ellipse
                                key={`petal-${i}`}
                                cx="50"
                                cy="28"
                                rx="14"
                                ry="22"
                                fill={`url(#flowerGrad-${whisper.id})`}
                                style={{ transformOrigin: '50px 50px' }}
                                transform={`rotate(${angle} 50 50)`}
                                initial={{ scale: 0 }}
                                animate={{ 
                                  scale: [0, 1.1, 1],
                                  opacity: [0, 1, 0.95]
                                }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                              />
                            ))}
                            <circle cx="50" cy="50" r="10" fill="#fbbf24" opacity="0.95">
                              <animate attributeName="r" values="10;11;10" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <motion.circle
                              cx="50" cy="50" r="20"
                              fill="none"
                              stroke={whisper.color}
                              strokeWidth="2"
                              opacity="0"
                              animate={{
                                r: [15, 28],
                                opacity: [0.6, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </svg>
                        ) : (
                          <motion.div className="relative">
                            <svg width="26" height="34" viewBox="0 0 80 100">
                              <defs>
                                <linearGradient id={`budGrad-${whisper.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor={whisper.color} stopOpacity="0.7" />
                                  <stop offset="100%" stopColor={whisper.color} stopOpacity="0.5" />
                                </linearGradient>
                              </defs>
                              <motion.path
                                d="M40,100 Q28,70 28,50 Q28,20 40,8 Q52,20 52,50 Q52,70 40,100"
                                fill={`url(#budGrad-${whisper.id})`}
                                stroke={whisper.color}
                                strokeWidth="1.5"
                                animate={{
                                  d: [
                                    "M40,100 Q28,70 28,50 Q28,20 40,8 Q52,20 52,50 Q52,70 40,100",
                                    "M40,100 Q30,70 30,50 Q30,20 40,8 Q50,20 50,50 Q50,70 40,100",
                                    "M40,100 Q28,70 28,50 Q28,20 40,8 Q52,20 52,50 Q52,70 40,100"
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </svg>
                            <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/90" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Whisper bubble (when selected) */}
                      {whisper.isBloomed && selectedWhisper === whisper.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-52 bg-black/95 backdrop-blur-md rounded-2xl p-4 border border-pink-500/40 shadow-xl"
                          style={{ zIndex: 10 }}
                        >
                          <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                            <span>From {whisper.plantedBy} • {whisper.plantedDate}</span>
                          </div>
                          <div className="text-sm text-white mb-3 leading-relaxed">
                            "{whisper.message}"
                          </div>
                          <div className="flex items-center justify-center gap-1 text-xs text-pink-400">
                            <Sparkles className="w-3 h-3" />
                            Whisper Blossom
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Plant New Whisper Button (floating) */}
                  <motion.button
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-full text-white text-sm flex items-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.08, y: -3, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPlantModal(true)}
                    animate={{
                      boxShadow: [
                        '0 5px 20px rgba(236, 72, 153, 0.3)',
                        '0 5px 25px rgba(236, 72, 153, 0.5)',
                        '0 5px 20px rgba(236, 72, 153, 0.3)'
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Plant a Whisper
                  </motion.button>

                  {/* Just Planted Notification */}
                  <AnimatePresence>
                    {justPlanted && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500/90 to-purple-500/90 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm shadow-xl"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Whisper planted! It will bloom with love 💕</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Nutrients Dashboard */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {/* Quality Time */}
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/30"
                  whileHover={{ scale: 1.03, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <div className="text-xs text-gray-300">Quality Time</div>
                  </div>
                  <div className="relative h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${nutrients.qualityTime}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-blue-400">{Math.round(nutrients.qualityTime)}%</div>
                  <div className="text-[10px] text-gray-500 mt-1">Waters the garden</div>
                </motion.div>

                {/* Communication */}
                <motion.div
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/30"
                  whileHover={{ scale: 1.03, borderColor: 'rgba(234, 179, 8, 0.5)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <div className="text-xs text-gray-300">Communication</div>
                  </div>
                  <div className="relative h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${nutrients.communication}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-yellow-400">{Math.round(nutrients.communication)}%</div>
                  <div className="text-[10px] text-gray-500 mt-1">Brightens the sun</div>
                </motion.div>

                {/* Affirmation */}
                <motion.div
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-4 border border-pink-500/30"
                  whileHover={{ scale: 1.03, borderColor: 'rgba(236, 72, 153, 0.5)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <div className="text-xs text-gray-300">Affirmation</div>
                  </div>
                  <div className="relative h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${nutrients.affirmation}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-pink-400">{Math.round(nutrients.affirmation)}%</div>
                  <div className="text-[10px] text-gray-500 mt-1">Grows whisper blossoms</div>
                </motion.div>
              </div>

              {/* Unlock Whisper Instructions */}
              {whispers.some(w => !w.isBloomed) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20"
                >
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-white mb-2">Unlock Whisper Blossoms Together</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-purple-400" />
                          <span>Take a 10-min walk together</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-3 h-3 text-pink-400" />
                          <span>Share a 20-second hug</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-3 h-3 text-blue-400" />
                          <span>Answer a Pulse question together</span>
                        </div>
                      </div>
                      <motion.button
                        className="mt-3 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-xs text-purple-300 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const lockedWhisper = whispers.find(w => !w.isBloomed);
                          if (lockedWhisper) bloomWhisper(lockedWhisper.id);
                        }}
                      >
                        <Unlock className="w-3 h-3 inline mr-1" />
                        Unlock Now (Demo)
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plant Whisper Modal */}
      <AnimatePresence>
        {showPlantModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPlantModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/30 p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-white">Plant a Whisper</h4>
                  <p className="text-xs text-gray-400">Share a moment of appreciation</p>
                </div>
              </div>

              <textarea
                value={newWhisperText}
                onChange={(e) => setNewWhisperText(e.target.value)}
                placeholder="I love how you..."
                className="w-full h-28 bg-black/40 border border-gray-700 rounded-xl p-4 text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                maxLength={150}
              />

              <div className="text-xs text-gray-500 mt-2 mb-4">
                {newWhisperText.length}/150 characters
              </div>

              <div className="flex gap-3">
                <motion.button
                  className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white text-sm transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPlantModal(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-xl text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  whileHover={{ scale: newWhisperText.trim() ? 1.02 : 1, boxShadow: newWhisperText.trim() ? '0 10px 30px rgba(236, 72, 153, 0.4)' : undefined }}
                  whileTap={{ scale: newWhisperText.trim() ? 0.98 : 1 }}
                  onClick={plantWhisper}
                  disabled={!newWhisperText.trim()}
                >
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Plant Whisper
                </motion.button>
              </div>

              <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-xs text-gray-400 flex items-start gap-2">
                  <Lock className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Your partner will need to unlock this whisper by completing a shared moment together. It will bloom with your love! 💕</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Memoize component for performance
export default memo(LoveGarden);
