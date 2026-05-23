import { motion, AnimatePresence } from 'motion/react';
import { MapPin, MessageCircle, Camera, Heart, Lightbulb, AlertCircle, Calendar, Compass as CompassIcon, Users, Eye, ThumbsUp, Share2, TrendingUp, Globe, Zap, Layers, Activity, Radio, Network, Send, Star, ChevronRight, Sparkles, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';

const reflectionTypes = [
  { 
    name: 'Thought', 
    icon: Lightbulb, 
    color: '#FF7A00',
    description: 'General observations & musings',
    example: 'This coffee shop has the perfect view for sunrise meditation',
    count: 3247
  },
  { 
    name: 'Memory', 
    icon: Heart, 
    color: '#FF8C1A',
    description: 'Personal experiences tied to a place',
    example: 'Where I proposed to my partner - most magical moment ever!',
    count: 1893
  },
  { 
    name: 'Tip', 
    icon: CompassIcon, 
    color: '#FF9E33',
    description: 'Helpful recommendations & advice',
    example: 'Order the house special - chef makes it fresh daily',
    count: 4521
  },
  { 
    name: 'Alert', 
    icon: AlertCircle, 
    color: '#FFB04D',
    description: 'Important warnings & notices',
    example: 'Bridge closed for construction - use alternate route',
    count: 892
  },
  { 
    name: 'Story', 
    icon: MessageCircle, 
    color: '#FFC266',
    description: 'Longer narrative content',
    example: 'The hidden history of this 100-year-old building...',
    count: 2134
  },
  { 
    name: 'Moment', 
    icon: Camera, 
    color: '#FFD480',
    description: 'Captured experiences',
    example: 'Amazing street performance happening right now!',
    count: 5678
  },
  { 
    name: 'Event', 
    icon: Calendar, 
    color: '#FF7A00',
    description: 'Event-related information',
    example: 'Weekly farmers market every Saturday 8am-2pm',
    count: 1456
  },
  { 
    name: 'Discovery', 
    icon: MapPin, 
    color: '#FF8C1A',
    description: 'Hidden gems & local secrets',
    example: 'Secret rooftop garden access through the alley',
    count: 3789
  },
];

const platformComparison = [
  { platform: 'Instagram', focus: 'Follower-based photos', limitation: 'No persistent location content' },
  { platform: 'Snapchat', focus: 'Snap Map ephemeral', limitation: 'Content disappears quickly' },
  { platform: 'BeReal', focus: 'Time-based posts', limitation: 'No location intelligence' },
  { platform: 'Twitter/X', focus: 'Text feed sharing', limitation: 'No geographic anchoring' },
  { platform: 'Proxima', focus: 'Geo-pinned persistent Reflections', limitation: '✓ Location + Personality + Discovery' },
];

// Sample reflections with engagement data and images
const sampleReflections = [
  { 
    type: 'Thought', 
    author: 'Sarah M.', 
    content: 'This coffee shop has the perfect vibe for creative work', 
    likes: 24, 
    location: 'Downtown Cafe', 
    time: '2m ago',
    comments: 8,
    avatar: '🎨',
    personality: 'ENFP'
  },
  { 
    type: 'Discovery', 
    author: 'Mike R.', 
    content: 'Found a secret garden behind the old library!', 
    likes: 89, 
    location: 'Central Library', 
    time: '15m ago',
    comments: 23,
    avatar: '🔍',
    personality: 'ISTP'
  },
  { 
    type: 'Memory', 
    author: 'Emma L.', 
    content: 'Where we celebrated our anniversary 💕', 
    likes: 156, 
    location: 'Riverside Park', 
    time: '1h ago',
    comments: 45,
    avatar: '💝',
    personality: 'INFJ'
  },
  { 
    type: 'Tip', 
    author: 'Alex K.', 
    content: 'Best tacos in the city - try the al pastor!', 
    likes: 67, 
    location: 'La Cocina', 
    time: '3h ago',
    comments: 12,
    avatar: '🌮',
    personality: 'ESTP'
  },
  { 
    type: 'Event', 
    author: 'City Events', 
    content: 'Live music tonight at 8 PM', 
    likes: 234, 
    location: 'Main Plaza', 
    time: '5h ago',
    comments: 67,
    avatar: '🎵'
  },
  { 
    type: 'Alert', 
    author: 'Transit Updates', 
    content: 'Street closure due to parade', 
    likes: 412, 
    location: '5th Avenue', 
    time: '6h ago',
    comments: 89,
    avatar: '🚧'
  },
];

// Animated user avatars moving on map
const liveUsers = [
  { id: 1, name: 'John', x: 20, y: 30, color: '#FF7A00' },
  { id: 2, name: 'Lisa', x: 60, y: 45, color: '#FF8C1A' },
  { id: 3, name: 'Mark', x: 35, y: 70, color: '#FF9E33' },
  { id: 4, name: 'Anna', x: 75, y: 25, color: '#FFB04D' },
];

export function ReflectionsSection() {
  const [selectedReflection, setSelectedReflection] = useState<number | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [activeNotifications, setActiveNotifications] = useState<number[]>([]);

  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Simulate new notifications - only when visible
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * sampleReflections.length);
      setActiveNotifications(prev => [...prev, randomIndex]);
      setTimeout(() => {
        setActiveNotifications(prev => prev.filter(i => i !== randomIndex));
      }, 2000);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-[#0D0D0D] to-black overflow-hidden">
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FF7A00]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Light rays */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute h-full w-px opacity-10"
            style={{
              left: `${20 + i * 20}%`,
              background: `linear-gradient(to bottom, transparent, #FF7A00, transparent)`
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scaleY: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Title with Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full px-4 py-2 mb-6 relative overflow-hidden"
            animate={{
              boxShadow: ['0 0 20px rgba(255,122,0,0.2)', '0 0 30px rgba(255,122,0,0.4)', '0 0 20px rgba(255,122,0,0.2)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/20 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <Layers className="w-5 h-5 text-[#FF7A00] relative z-10" />
            <span className="text-[#FF7A00] uppercase tracking-wider text-sm relative z-10">The Social Layer</span>
            <Sparkles className="w-4 h-4 text-[#FF7A00] relative z-10" />
          </motion.div>
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Reflections: The Social Layer of the Physical World</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 max-w-4xl mx-auto text-lg mb-2">
            A revolutionary, location-based social content platform that allows users to leave geo-pinned text content, turning every location into a dynamic social experience. Reflections have a 24-hour delay before full public visibility, and instant proximity-based viewing requires physical presence—cannot be viewed remotely from home, preventing stalking and ensuring real-world safety.
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm">
            Massive, untapped potential for gamification and monetization, representing a first-mover opportunity in a new category of social networking.
          </p>
        </motion.div>

        {/* Core Experience Badge with Data Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-black via-[#0D0D0D] to-black border border-[#FF7A00]/50 rounded-full px-8 py-4 relative">
            {/* Data stream animation */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            
            <div className="flex items-center gap-2 relative">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF7A00]"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white font-mono text-sm">CREATE</span>
            </div>
            <motion.div 
              className="w-px h-6 bg-[#FF7A00]/30"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="flex items-center gap-2 relative">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF7A00]"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.66 }}
              />
              <span className="text-white font-mono text-sm">DISCOVER</span>
            </div>
            <motion.div 
              className="w-px h-6 bg-[#FF7A00]/30"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.33 }}
            />
            <div className="flex items-center gap-2 relative">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF7A00]"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.33 }}
              />
              <span className="text-white font-mono text-sm">ENGAGE</span>
            </div>
          </div>
        </motion.div>

        {/* Main Interactive 3D Visualization */}
        <div className="mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* 3D Layered Map Container */}
            <div className="relative h-[700px] perspective-1000">
              {/* Layer 1: Background Map (deepest) */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0D0D] to-black border border-[#FF7A00]/30 rounded-2xl overflow-hidden"
                style={{
                  transform: 'translateZ(-50px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1628636726007-a11e5c98d836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjB0aGFtZXMlMjByaXZlciUyMGFlcmlhbHxlbnwxfHx8fDE3NjE4NzU4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="London Thames Aerial View"
                    className="w-full h-full object-cover opacity-20"
                  />
                  
                  {/* Animated Grid with perspective */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(#FF7A00 1px, transparent 1px), linear-gradient(90deg, #FF7A00 1px, transparent 1px)',
                      backgroundSize: '50px 50px'
                    }}
                  />
                  
                  {/* Multi-layer gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-radial from-[#FF7A00]/10 via-transparent to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Animated Network Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {sampleReflections.map((_, i) => {
                    const positions = [
                      { x1: 15, y1: 10, x2: 70, y2: 15 },
                      { x1: 70, y1: 15, x2: 25, y2: 35 },
                      { x1: 25, y1: 35, x2: 80, y2: 45 },
                      { x1: 10, y1: 65, x2: 60, y2: 75 },
                      { x1: 60, y1: 75, x2: 25, y2: 35 },
                    ];
                    
                    const pos = positions[i % positions.length];
                    
                    return (
                      <motion.line
                        key={`line-${i}`}
                        x1={`${pos.x1}%`}
                        y1={`${pos.y1}%`}
                        x2={`${pos.x2}%`}
                        y2={`${pos.y2}%`}
                        stroke="#FF7A00"
                        strokeWidth="1"
                        opacity="0"
                        animate={{
                          opacity: [0, 0.3, 0],
                          strokeDasharray: ["0, 1000", "1000, 0", "0, 1000"]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "linear"
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Pulsing Discovery Zones */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`zone-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF7A00]/20"
                    style={{
                      width: `${200 + i * 100}px`,
                      height: `${200 + i * 100}px`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.1, 0.4],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}

                {/* Animated Live Users on Map */}
                {liveUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    className="absolute z-20"
                    style={{
                      left: `${user.x}%`,
                      top: `${user.y}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 1],
                      opacity: [0, 1, 1],
                      x: [0, Math.sin(user.id) * 20, 0],
                      y: [0, Math.cos(user.id) * 20, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      {/* User avatar */}
                      <motion.div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs cursor-pointer"
                        style={{
                          backgroundColor: `${user.color}30`,
                          borderColor: user.color,
                          boxShadow: `0 0 15px ${user.color}50`
                        }}
                        whileHover={{ scale: 1.3 }}
                      >
                        <Users className="w-4 h-4" style={{ color: user.color }} />
                      </motion.div>
                      
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: user.color }}
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.6, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Floating Reflection Cards with Enhanced Visuals */}
                {sampleReflections.map((reflection, index) => {
                  const positions = [
                    { top: '8%', left: '12%', rotate: -3 },
                    { top: '12%', left: '68%', rotate: 2 },
                    { top: '32%', left: '22%', rotate: 1 },
                    { top: '42%', left: '78%', rotate: -2 },
                    { top: '52%', left: '8%', rotate: 3 },
                    { top: '60%', left: '58%', rotate: -1 },
                  ];
                  
                  const typeData = reflectionTypes.find(t => t.name === reflection.type);
                  const isActive = activeNotifications.includes(index);
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute z-30"
                      style={positions[index]}
                      initial={{ opacity: 0, scale: 0, rotate: 0 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        rotate: positions[index].rotate
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15, type: "spring" }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 0, 
                        zIndex: 100,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => setSelectedReflection(index)}
                    >
                      <motion.div
                        className="bg-gradient-to-br from-black/95 via-black/90 to-black/85 backdrop-blur-md border rounded-xl p-3 w-72 cursor-pointer shadow-2xl relative overflow-hidden"
                        style={{
                          borderColor: typeData?.color,
                          boxShadow: `0 15px 50px ${typeData?.color}30`
                        }}
                        animate={{
                          y: [0, -8, 0],
                          boxShadow: isActive 
                            ? [`0 15px 50px ${typeData?.color}30`, `0 20px 60px ${typeData?.color}60`, `0 15px 50px ${typeData?.color}30`]
                            : `0 15px 50px ${typeData?.color}30`
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* New Notification Indicator */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              className="absolute -top-1 -right-1 z-50"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                            >
                              <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                                <span className="text-white text-[10px]">NEW</span>
                              </div>
                              <motion.div
                                className="absolute inset-0 bg-red-500 rounded-full"
                                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Animated gradient background */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `radial-gradient(circle at 50% 0%, ${typeData?.color}, transparent)`
                          }}
                          animate={{
                            opacity: [0.1, 0.3, 0.1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        />
                        
                        {/* Card Header */}
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                          {/* Avatar with emoji */}
                          <motion.div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2"
                            style={{ 
                              backgroundColor: `${typeData?.color}20`, 
                              borderColor: typeData?.color 
                            }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {reflection.avatar}
                          </motion.div>
                          
                          <div className="flex-1">
                            <div className="text-white text-sm flex items-center gap-1">
                              {reflection.author}
                              {reflection.personality && (
                                <span className="text-[#FF7A00] text-[10px] ml-1">• {reflection.personality}</span>
                              )}
                              {index < 2 && (
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                            <div className="text-gray-500 text-[10px] flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {reflection.time}
                            </div>
                          </div>
                          
                          {/* Type badge */}
                          <div
                            className="px-2 py-0.5 rounded-full text-[9px] border"
                            style={{
                              backgroundColor: `${typeData?.color}20`,
                              borderColor: `${typeData?.color}50`,
                              color: typeData?.color
                            }}
                          >
                            {reflection.type}
                          </div>
                        </div>
                        
                        {/* Card Content */}
                        <p className="text-gray-200 text-sm mb-3 relative z-10 leading-relaxed">{reflection.content}</p>
                        
                        {/* Engagement Stats */}
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                          <motion.div 
                            className="flex items-center gap-1 text-xs"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Heart className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-gray-400">{reflection.likes}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 text-xs"
                            whileHover={{ scale: 1.1 }}
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-gray-400">{reflection.comments}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-1 text-xs ml-auto"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Share2 className="w-3.5 h-3.5 text-gray-500" />
                          </motion.div>
                        </div>
                        
                        {/* Location Badge */}
                        <div 
                          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border relative z-10"
                          style={{
                            backgroundColor: `${typeData?.color}10`,
                            borderColor: `${typeData?.color}30`
                          }}
                        >
                          <MapPin className="w-3 h-3" style={{ color: typeData?.color }} />
                          <span className="text-gray-400">{reflection.location}</span>
                          <ChevronRight className="w-3 h-3 text-gray-600 ml-auto" />
                        </div>

                        {/* Data stream particles */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`particle-${i}`}
                            className="absolute w-1 h-1 rounded-full"
                            style={{ backgroundColor: typeData?.color }}
                            animate={{
                              x: [0, (i - 1) * 40],
                              y: [-20, -60],
                              opacity: [0, 0.8, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.4,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Enhanced Pin Indicator with Glow */}
                      <motion.div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20"
                        animate={{
                          y: [0, 4, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div 
                          className="w-8 h-8 rounded-full border-2 flex items-center justify-center relative"
                          style={{ 
                            backgroundColor: `${typeData?.color}40`,
                            borderColor: typeData?.color,
                            boxShadow: `0 0 25px ${typeData?.color}70`
                          }}
                        >
                          <MapPin className="w-4 h-4" style={{ color: typeData?.color }} />
                          
                          {/* Glow rings */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2"
                            style={{ borderColor: typeData?.color }}
                            animate={{
                              scale: [1, 2],
                              opacity: [0.6, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                        
                        {/* Pin shadow */}
                        <motion.div
                          className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-black/50 blur-sm"
                          animate={{
                            scaleX: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      </motion.div>

                      {/* Connection beam to ground */}
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 origin-top"
                        style={{
                          background: `linear-gradient(to bottom, ${typeData?.color}, transparent)`,
                          opacity: 0.5
                        }}
                        animate={{
                          scaleY: [0.8, 1, 0.8],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Live Activity Dashboard */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-black/95 backdrop-blur-md border border-[#FF7A00]/40 rounded-xl p-4 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  style={{
                    boxShadow: '0 10px 40px rgba(255,122,0,0.3)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-green-500 relative"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-green-500"
                        animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                    <span className="text-white text-sm font-mono flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#FF7A00]" />
                      LIVE ACTIVITY
                    </span>
                    <motion.div
                      className="ml-auto text-xs text-gray-500 flex items-center gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Radio className="w-3 h-3" />
                      Real-time
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-gradient-to-b from-[#FF7A00]/10 to-transparent rounded-lg p-2 border border-[#FF7A00]/20">
                      <motion.div 
                        className="text-[#FF7A00] text-2xl mb-1"
                        key={Math.floor(Date.now() / 1000)}
                        initial={{ scale: 1.3, color: '#FFD480' }}
                        animate={{ scale: 1, color: '#FF7A00' }}
                        transition={{ duration: 0.5 }}
                      >
                        1.2k
                      </motion.div>
                      <div className="text-gray-400 text-[9px] uppercase tracking-wide">Reflections Today</div>
                    </div>
                    <div className="bg-gradient-to-b from-[#FF7A00]/10 to-transparent rounded-lg p-2 border border-[#FF7A00]/20">
                      <motion.div 
                        className="text-[#FF7A00] text-2xl mb-1"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        847
                      </motion.div>
                      <div className="text-gray-400 text-[9px] uppercase tracking-wide">Views</div>
                    </div>
                    <div className="bg-gradient-to-b from-[#FF7A00]/10 to-transparent rounded-lg p-2 border border-[#FF7A00]/20">
                      <motion.div 
                        className="text-[#FF7A00] text-2xl mb-1"
                        animate={{ 
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        3.4k
                      </motion.div>
                      <div className="text-gray-400 text-[9px] uppercase tracking-wide">Interactions</div>
                    </div>
                    <div className="bg-gradient-to-b from-[#FF7A00]/10 to-transparent rounded-lg p-2 border border-[#FF7A00]/20">
                      <motion.div className="text-[#FF7A00] text-2xl mb-1">89</motion.div>
                      <div className="text-gray-400 text-[9px] uppercase tracking-wide">New Discoveries</div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Heat Map with 3D depth */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full blur-2xl"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 90 + 5}%`,
                        width: `${Math.random() * 150 + 80}px`,
                        height: `${Math.random() * 150 + 80}px`,
                        background: `radial-gradient(circle, ${reflectionTypes[i % reflectionTypes.length].color}30, transparent)`,
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, Math.sin(i) * 20, 0],
                        y: [0, Math.cos(i) * 20, 0]
                      }}
                      transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Scanning effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 45%, rgba(255,122,0,0.1) 50%, transparent 55%)'
                  }}
                  animate={{
                    y: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Reflection Types - Enhanced Interactive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-center mb-8 text-white">8 Types of Reflections</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reflectionTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onHoverStart={() => setHoveredType(type.name)}
                onHoverEnd={() => setHoveredType(null)}
                className="bg-gradient-to-b from-black/90 to-black/70 border rounded-lg p-4 group cursor-pointer relative overflow-hidden"
                style={{
                  borderColor: hoveredType === type.name ? type.color : `${type.color}50`,
                  boxShadow: hoveredType === type.name ? `0 0 30px ${type.color}40` : 'none'
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0"
                  style={{ 
                    background: `radial-gradient(circle at ${hoveredType === type.name ? '50%' : '0%'} ${hoveredType === type.name ? '50%' : '0%'}, ${type.color}15, transparent)`
                  }}
                  animate={{
                    opacity: hoveredType === type.name ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon with Enhanced Glow */}
                <motion.div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-3 relative border-2"
                  style={{
                    backgroundColor: `${type.color}15`,
                    borderColor: hoveredType === type.name ? type.color : `${type.color}50`,
                  }}
                  animate={{
                    boxShadow: hoveredType === type.name 
                      ? [`0 0 20px ${type.color}60`, `0 0 40px ${type.color}80`, `0 0 20px ${type.color}60`]
                      : `0 0 0px ${type.color}00`
                  }}
                  transition={{ duration: 1, repeat: hoveredType === type.name ? Infinity : 0 }}
                >
                  <type.icon className="w-7 h-7 relative z-10" style={{ color: type.color }} />
                  
                  {/* Multiple orbiting particles */}
                  {hoveredType === type.name && [...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: type.color,
                        transformOrigin: '0 0',
                        x: 25 + i * 5,
                        y: -0.75,
                        top: '50%',
                        left: '50%'
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </motion.div>

                <h4 className="text-white mb-1 relative z-10">{type.name}</h4>
                <p className="text-gray-500 text-xs mb-3 relative z-10">{type.description}</p>
                
                {/* Live Count */}
                <motion.div
                  className="flex items-center gap-1 mb-3 relative z-10"
                  animate={{
                    scale: hoveredType === type.name ? [1, 1.05, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="text-[#FF7A00] text-lg">{type.count.toLocaleString()}</div>
                  <div className="text-gray-600 text-[9px] uppercase">Views</div>
                  <TrendingUp className="w-3 h-3 text-green-500 ml-auto" />
                </motion.div>
                
                {/* Example Content */}
                <motion.div
                  className="bg-black/50 rounded p-2 border relative z-10"
                  style={{ borderColor: `${type.color}30` }}
                  animate={{
                    borderColor: hoveredType === type.name ? `${type.color}60` : `${type.color}30`,
                    backgroundColor: hoveredType === type.name ? `${type.color}10` : 'rgba(0,0,0,0.5)'
                  }}
                >
                  <p className="text-gray-400 text-[10px] italic leading-relaxed">"{type.example}"</p>
                </motion.div>

                {/* Corner Bracket Accents */}
                <motion.div
                  className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
                  style={{ borderColor: type.color }}
                  animate={{
                    opacity: hoveredType === type.name ? 1 : 0.3
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
                  style={{ borderColor: type.color }}
                  animate={{
                    opacity: hoveredType === type.name ? 1 : 0.3
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
                  style={{ borderColor: type.color }}
                  animate={{
                    opacity: hoveredType === type.name ? 1 : 0.3
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
                  style={{ borderColor: type.color }}
                  animate={{
                    opacity: hoveredType === type.name ? 1 : 0.3
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-Time Social Engagement Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-r from-[#FF7A00]/10 via-[#FF7A00]/5 to-[#FF7A00]/10 border-y border-[#FF7A00]/30 py-12 relative overflow-hidden"
        >
          {/* Background network visualization */}
          <div className="absolute inset-0 opacity-10">
            <Network className="absolute top-4 left-4 w-20 h-20 text-[#FF7A00]" />
            <Network className="absolute bottom-4 right-4 w-20 h-20 text-[#FF7A00]" />
          </div>

          <div className="text-center mb-8 relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-[#FF7A00]" />
              <h3 className="text-white">Real-Time Social Engagement</h3>
              <Zap className="w-6 h-6 text-[#FF7A00]" />
            </motion.div>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Text-based commenting system fosters community around each location. Real-time loading, user attribution, and concise character limits ensure valuable content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {/* Comment Thread Visual */}
            <motion.div
              className="bg-black/50 border border-[#FF7A00]/30 rounded-lg p-6 relative overflow-hidden"
              whileHover={{ borderColor: '#FF7A00', scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-[#FF7A00]" />
                <h4 className="text-white">Live Comments</h4>
                <motion.div
                  className="ml-auto w-2 h-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-r from-black/70 to-black/50 rounded-lg p-3 border border-gray-800 relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ x: 5, borderColor: '#FF7A00' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div 
                        className="w-7 h-7 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/50 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-xs">👤</span>
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-xs text-white">User {i}</div>
                        <div className="text-[9px] text-gray-600">Just now</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Great spot! Will definitely visit again soon.</p>
                    
                    {/* Typing indicator for last comment */}
                    {i === 3 && (
                      <motion.div
                        className="absolute bottom-1 right-2 flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="w-1 h-1 rounded-full bg-[#FF7A00]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: dot * 0.2
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Add comment button */}
              <motion.button
                className="w-full mt-3 py-2 rounded-lg border border-[#FF7A00]/30 text-xs text-gray-400 flex items-center justify-center gap-2"
                whileHover={{
                  borderColor: '#FF7A00',
                  backgroundColor: 'rgba(255,122,0,0.1)',
                  color: '#FF7A00'
                }}
              >
                <Send className="w-3 h-3" />
                Add Comment
              </motion.button>
            </motion.div>

            {/* Engagement Metrics */}
            <motion.div
              className="bg-black/50 border border-[#FF7A00]/30 rounded-lg p-6"
              whileHover={{ borderColor: '#FF7A00', scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
                <h4 className="text-white">Engagement Stats</h4>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Views', value: 2847, icon: Eye, color: '#60A5FA' },
                  { label: 'Likes', value: 892, icon: ThumbsUp, color: '#F87171' },
                  { label: 'Shares', value: 234, icon: Share2, color: '#34D399' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                      </div>
                      <motion.span
                        className="text-[#FF7A00]"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        {stat.value.toLocaleString()}
                      </motion.span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: stat.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(stat.value / 3000) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Impact */}
            <motion.div
              className="bg-black/50 border border-[#FF7A00]/30 rounded-lg p-6"
              whileHover={{ borderColor: '#FF7A00', scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#FF7A00]" />
                <h4 className="text-white">Community</h4>
              </div>
              <div className="space-y-3">
                <motion.div 
                  className="bg-gradient-to-br from-[#FF7A00]/10 to-transparent rounded-lg p-3 border border-[#FF7A00]/30 relative overflow-hidden"
                  whileHover={{ borderColor: '#FF7A00' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  />
                  <div className="text-3xl text-[#FF7A00] mb-1 relative z-10">12.4k</div>
                  <div className="text-xs text-gray-400 relative z-10">Active Contributors</div>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-[#FF7A00]/10 to-transparent rounded-lg p-3 border border-[#FF7A00]/30"
                  whileHover={{ borderColor: '#FF7A00' }}
                >
                  <div className="text-3xl text-[#FF7A00] mb-1">847</div>
                  <div className="text-xs text-gray-400">Locations Mapped</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Platform Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center mb-8 text-white">Why Reflections Stands Apart</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {platformComparison.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className={`p-6 rounded-lg border-2 relative overflow-hidden ${
                  item.platform === 'Proxima'
                    ? 'bg-gradient-to-br from-[#FF7A00]/20 to-transparent border-[#FF7A00]'
                    : 'bg-black/50 border-gray-700'
                }`}
                style={{
                  boxShadow: item.platform === 'Proxima' ? '0 0 40px rgba(255,122,0,0.3)' : 'none'
                }}
              >
                {item.platform === 'Proxima' && (
                  <>
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(255,122,0,0.1), transparent)',
                          'radial-gradient(circle at 100% 100%, rgba(255,122,0,0.1), transparent)',
                          'radial-gradient(circle at 0% 0%, rgba(255,122,0,0.1), transparent)',
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16"
                      style={{
                        background: 'radial-gradient(circle at top right, rgba(255,122,0,0.3), transparent)'
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </>
                )}
                <h4 className={`mb-3 ${item.platform === 'Proxima' ? 'text-[#FF7A00]' : 'text-gray-400'}`}>
                  {item.platform}
                </h4>
                <p className={`text-sm mb-2 ${item.platform === 'Proxima' ? 'text-white' : 'text-gray-500'}`}>
                  {item.focus}
                </p>
                <p className={`text-xs ${item.platform === 'Proxima' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.limitation}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
