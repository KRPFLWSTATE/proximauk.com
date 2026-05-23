import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Sparkles, TrendingUp, MapPin, Brain, Zap, Network, Target, Database, Cpu, Radio, Heart, Briefcase, Music, Coffee, Code } from 'lucide-react';

// Real user personas with personality types
const userPersonas = [
  { name: 'Sarah K.', type: 'ENFP', interest: 'Tech', color: '#FF7A00', avatar: 1 },
  { name: 'Marcus T.', type: 'INTJ', interest: 'Business', color: '#FF8C1A', avatar: 2 },
  { name: 'Ava L.', type: 'ESFJ', interest: 'Social', color: '#FFA033', avatar: 3 },
  { name: 'James R.', type: 'INTP', interest: 'Coding', color: '#FFB44D', avatar: 4 },
  { name: 'Zoe M.', type: 'ENFJ', interest: 'Music', color: '#FFC866', avatar: 5 },
  { name: 'Ryan P.', type: 'ISTJ', interest: 'Finance', color: '#FFDC80', avatar: 6 },
];

// Real event examples from different APIs
const eventExamples = [
  { 
    title: 'London Tech Startup Mixer', 
    source: 'Eventbrite', 
    time: 'Tomorrow 7PM',
    distance: '250m',
    attendees: 52,
    matchScore: 94,
    category: 'Tech',
    icon: Code,
    color: '#FF7A00'
  },
  { 
    title: 'Jazz Night at Blue Note', 
    source: 'Ticketmaster', 
    time: 'Friday 9PM',
    distance: '1.2km',
    attendees: 120,
    matchScore: 87,
    category: 'Music',
    icon: Music,
    color: '#FF8C1A'
  },
  { 
    title: 'Coffee & Connections', 
    source: 'Meetup', 
    time: 'Sat 10AM',
    distance: '500m',
    attendees: 28,
    matchScore: 91,
    category: 'Social',
    icon: Coffee,
    color: '#FFA033'
  },
  { 
    title: 'Entrepreneur Network Event', 
    source: 'Luma', 
    time: 'Next Wed 6PM',
    distance: '800m',
    attendees: 65,
    matchScore: 89,
    category: 'Business',
    icon: Briefcase,
    color: '#FFB44D'
  },
];

// API sources
const apiSources = [
  { name: 'Eventbrite', color: '#FF6600', events: 12500 },
  { name: 'Ticketmaster', color: '#026CDF', events: 8200 },
  { name: 'Meetup', color: '#ED1C40', events: 15600 },
  { name: 'Luma', color: '#7B61FF', events: 4800 },
];

// Scoring dimensions
const scoringDimensions = [
  { label: 'Personality Match', value: 40, color: '#FF7A00' },
  { label: 'Interest Alignment', value: 25, color: '#FF8C1A' },
  { label: 'Professional Fit', value: 20, color: '#FFA033' },
  { label: 'Proximity', value: 15, color: '#FFB44D' },
];

export function EventsSection() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'matching' | 'scoring'>('discovery');
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // New scroll-lock tab handler
  const handleTabChange = (newTab: 'discovery' | 'matching' | 'scoring') => {
    if (newTab === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Immediately update tab (no scroll logic needed with absolute positioning)
    setActiveTab(newTab);
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Animated background - 3D grid */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FF7A00 1px, transparent 1px),
              linear-gradient(to bottom, #FF7A00 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotateX(60deg) translateZ(-500px)',
            transformOrigin: 'center center'
          }}
          animate={{
            backgroundPositionY: ['0px', '60px']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full"
            animate={{
              boxShadow: ['0 0 20px rgba(255, 122, 0, 0.3)', '0 0 40px rgba(255, 122, 0, 0.5)', '0 0 20px rgba(255, 122, 0, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00] text-xs md:text-base">Revolutionary AI Event Discovery</span>
          </motion.div>
          
          <h2 className="mb-4 md:mb-6 text-white px-4 text-3xl md:text-4xl lg:text-5xl">Events Feature – Multi-API Intelligence System</h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-4 md:mb-8" />
          <p className="text-gray-300 max-w-4xl mx-auto text-sm md:text-lg leading-relaxed px-4">
            The world's first AI-powered event discovery platform that aggregates events from Eventbrite, Ticketmaster, Meetup, and Luma, 
            then uses personality-based matching to connect you with events and people you'll actually click with.
          </p>
        </motion.div>

        {/* Rebuilt Tab Navigation with Anti-Jump System */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16">
          {[
            { id: 'discovery', label: 'Multi-API Discovery', icon: Database, shortLabel: 'Discovery' },
            { id: 'matching', label: 'AI Matching Engine', icon: Brain, shortLabel: 'Matching' },
            { id: 'scoring', label: 'Smart Scoring', icon: Target, shortLabel: 'Scoring' }
          ].map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as 'discovery' | 'matching' | 'scoring')}
              disabled={isTransitioning}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg border-2 transition-all relative text-xs md:text-base ${
                activeTab === tab.id
                  ? 'bg-[#FF7A00] border-[#FF7A00] text-white'
                  : 'bg-black/50 border-[#FF7A00]/30 text-gray-400 hover:border-[#FF7A00]/60 hover:text-white cursor-pointer'
              } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
              animate={
                activeTab !== tab.id && !isTransitioning
                  ? {
                      boxShadow: [
                        '0 0 0px rgba(255, 122, 0, 0)',
                        '0 0 40px rgba(255, 122, 0, 1), 0 0 80px rgba(255, 122, 0, 0.6), inset 0 0 30px rgba(255, 122, 0, 0.3)',
                        '0 0 0px rgba(255, 122, 0, 0)',
                      ],
                      backgroundColor: [
                        'rgba(0, 0, 0, 0.5)',
                        'rgba(255, 122, 0, 0.2)',
                        'rgba(0, 0, 0, 0.5)',
                      ],
                    }
                  : activeTab === tab.id
                  ? {
                      boxShadow: [
                        '0 0 30px rgba(255, 122, 0, 0.8), 0 0 60px rgba(255, 122, 0, 0.5)',
                        '0 0 50px rgba(255, 122, 0, 1), 0 0 90px rgba(255, 122, 0, 0.7)',
                        '0 0 30px rgba(255, 122, 0, 0.8), 0 0 60px rgba(255, 122, 0, 0.5)',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.5,
                ease: 'easeInOut',
              }}
              whileHover={!isTransitioning ? { scale: 1.05 } : {}}
              whileTap={!isTransitioning ? { scale: 0.95 } : {}}
            >
              <motion.div
                animate={
                  activeTab !== tab.id && !isTransitioning
                    ? {
                        opacity: [0.4, 1, 0.4],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: 'easeInOut',
                }}
              >
                <tab.icon className="w-4 md:w-5 h-4 md:h-5" />
              </motion.div>
              <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
              <span className="sm:hidden whitespace-nowrap">{tab.shortLabel}</span>
              
              {/* Animated Border Glow */}
              {activeTab !== tab.id && !isTransitioning && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-[#FF7A00]/0"
                  animate={{
                    borderColor: [
                      'rgba(255, 122, 0, 0)',
                      'rgba(255, 122, 0, 1)',
                      'rgba(255, 122, 0, 0)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              )}
              
              {/* Whole Button Glow Overlay */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.6) 0%, rgba(255, 122, 0, 0.3) 50%, transparent 100%)',
                }}
                animate={
                  activeTab !== tab.id && !isTransitioning
                    ? {
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.1, 0.8],
                      }
                    : activeTab === tab.id
                    ? {
                        opacity: [0.6, 0.9, 0.6],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: 'easeInOut',
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* FIXED HEIGHT Container - Prevents all scroll jumps */}
        <div ref={containerRef} className="relative" style={{ minHeight: '1400px' }}>
          <AnimatePresence mode="wait" initial={false}>
            {/* Tab 1: Multi-API Event Discovery - REDESIGNED */}
            {activeTab === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full"
                layout="position"
              >
                <div className="space-y-8 md:space-y-12 px-4">
                  <h3 className="text-center mb-6 md:mb-8 text-white text-lg md:text-2xl">Live Event Aggregation from Multiple Sources</h3>
                  
                  {/* Data Pipeline Visualization - Vertical Flow */}
                  <div className="max-w-5xl mx-auto">
                    {/* API Sources Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 relative">
                      {/* Connection web background */}
                      <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" style={{ pointerEvents: 'none' }}>
                        {apiSources.map((_, i) => 
                          apiSources.slice(i + 1).map((_, j) => {
                            const x1 = (i % 4) * 25 + 12.5;
                            const x2 = ((i + j + 1) % 4) * 25 + 12.5;
                            const y1 = Math.floor(i / 4) * 50 + 25;
                            const y2 = Math.floor((i + j + 1) / 4) * 50 + 25;
                            return (
                              <motion.line
                                key={`${i}-${j}`}
                                x1={`${x1}%`}
                                y1={`${y1}%`}
                                x2={`${x2}%`}
                                y2={`${y2}%`}
                                stroke="#FF7A00"
                                strokeWidth="1"
                                strokeDasharray="4,4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ 
                                  pathLength: 1, 
                                  opacity: [0.2, 0.5, 0.2],
                                  strokeDashoffset: [0, -8]
                                }}
                                transition={{ 
                                  pathLength: { duration: 1, delay: i * 0.2 },
                                  opacity: { duration: 2, repeat: Infinity },
                                  strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' }
                                }}
                              />
                            );
                          })
                        )}
                      </svg>

                      {apiSources.map((api, i) => (
                        <motion.div
                          key={api.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="relative"
                        >
                          <motion.div
                            className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-xl p-4 md:p-6 text-center relative overflow-hidden"
                            style={{ borderColor: api.color }}
                            whileHover={{ scale: 1.05, boxShadow: `0 10px 40px ${api.color}40`, zIndex: 10 }}
                            animate={{
                              borderColor: [api.color, `${api.color}80`, api.color]
                            }}
                            transition={{
                              borderColor: { duration: 2, repeat: Infinity }
                            }}
                          >
                            {/* Animated gradient overlay */}
                            <motion.div
                              className="absolute inset-0 opacity-10"
                              style={{
                                background: `radial-gradient(circle at center, ${api.color}, transparent 70%)`
                              }}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                              }}
                              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                            />

                            {/* Pulse indicator */}
                            <motion.div
                              className="absolute top-3 right-3 w-2 h-2 rounded-full z-10"
                              style={{ backgroundColor: api.color }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            />
                            
                            <div className="relative z-10">
                              <div className="text-white mb-2 text-sm md:text-base">{api.name}</div>
                              <motion.div 
                                className="text-gray-400 text-xs md:text-sm mb-3"
                                animate={{
                                  color: ['#9CA3AF', api.color, '#9CA3AF']
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                              >
                                {api.events.toLocaleString()} events
                              </motion.div>
                              
                              {/* Live data bars */}
                              <div className="flex gap-1 justify-center">
                                {[...Array(5)].map((_, j) => (
                                  <motion.div
                                    key={j}
                                    className="w-1 md:w-1.5 rounded-full"
                                    style={{ backgroundColor: api.color }}
                                    animate={{
                                      height: ['8px', '24px', '8px'],
                                      opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{
                                      duration: 1.2,
                                      repeat: Infinity,
                                      delay: j * 0.15 + i * 0.2
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                          
                          {/* Flowing particles down */}
                          {[...Array(3)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="absolute left-1/2 w-1 h-1 rounded-full -bottom-8"
                              style={{ 
                                backgroundColor: api.color,
                                boxShadow: `0 0 8px ${api.color}`
                              }}
                              animate={{
                                y: [0, 40],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: j * 0.5 + i * 0.2
                              }}
                            />
                          ))}
                        </motion.div>
                      ))}
                    </div>

                    {/* Aggregation Arrow */}
                    <motion.div
                      className="flex flex-col items-center mb-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-[#FF7A00]" />
                      </motion.div>
                      <div className="text-center mt-2">
                        <div className="text-[#FF7A00] text-sm md:text-base">Aggregating</div>
                        <div className="text-gray-400 text-xs md:text-sm">41,100+ events</div>
                      </div>
                    </motion.div>

                    {/* AI Processing Hub */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="relative mb-8"
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 122, 0, 0.3), transparent 70%)',
                          filter: 'blur(20px)'
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      <div className="bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] rounded-2xl p-6 md:p-8 border-4 border-black relative overflow-hidden">
                        {/* Animated background pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }}
                          animate={{
                            backgroundPosition: ['0px 0px', '20px 20px']
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Scan line effect */}
                        <motion.div
                          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                          animate={{
                            top: ['0%', '100%']
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                          <motion.div
                            animate={{
                              rotate: [0, 360]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            className="flex-shrink-0 relative"
                          >
                            {/* Orbiting particles */}
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                style={{
                                  left: '50%',
                                  top: '50%'
                                }}
                                animate={{
                                  x: [0, Math.cos(i * 120 * Math.PI / 180) * 40],
                                  y: [0, Math.sin(i * 120 * Math.PI / 180) * 40],
                                  opacity: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.66
                                }}
                              />
                            ))}
                            
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                              <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            </div>
                          </motion.div>
                          
                          <div className="flex-1 text-center md:text-left">
                            <h4 className="text-white mb-2 text-lg md:text-xl">Proxima AI Engine</h4>
                            <p className="text-white/90 text-sm md:text-base">
                              Processing events through personality-based matching algorithm
                            </p>
                            
                            {/* Processing status */}
                            <motion.div 
                              className="mt-2 text-xs text-white/80 flex items-center gap-2 justify-center md:justify-start"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <motion.div
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              <span>Processing 41,100+ events in real-time</span>
                            </motion.div>
                          </div>
                          
                          <div className="flex gap-2">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 md:w-2 h-12 md:h-16 bg-white/30 rounded-full"
                                animate={{
                                  scaleY: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.12
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Output particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute -bottom-8 w-1 h-1 rounded-full bg-[#FF7A00]"
                          style={{
                            left: `${20 + i * 10}%`,
                            boxShadow: '0 0 8px #FF7A00'
                          }}
                          animate={{
                            y: [0, 40],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Results Section */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-center mb-6"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full">
                        <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                        <span className="text-[#FF7A00] text-sm md:text-base">Matched Events</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Live Event Feed */}
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
                      {eventExamples.map((event, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="relative"
                          style={{ transformStyle: 'preserve-3d' }}
                          onMouseEnter={() => setSelectedEvent(i)}
                        >
                          <motion.div
                            className="bg-gradient-to-br from-black via-[#0D0D0D] to-black border-2 border-[#FF7A00]/30 rounded-lg overflow-hidden cursor-pointer"
                            whileHover={{ 
                              scale: 1.05, 
                              rotateY: 5,
                              borderColor: event.color,
                              boxShadow: `0 20px 60px ${event.color}40`
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Source badge */}
                            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/80 border border-[#FF7A00]/50 rounded-full text-xs text-[#FF7A00]">
                              {event.source}
                            </div>

                            {/* Event icon background */}
                            <div className="relative h-32 bg-gradient-to-br from-[#FF7A00]/20 to-transparent flex items-center justify-center overflow-hidden">
                              <motion.div
                                animate={{
                                  rotate: [0, 360],
                                  scale: [1, 1.2, 1]
                                }}
                                transition={{
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              >
                                <event.icon className="w-16 h-16 text-[#FF7A00]/40" />
                              </motion.div>
                              
                              {/* Animated particles */}
                              {[...Array(5)].map((_, j) => (
                                <motion.div
                                  key={j}
                                  className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                  }}
                                  animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                    y: [0, -20]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: j * 0.4
                                  }}
                                />
                              ))}
                            </div>

                            <div className="p-6">
                              <h4 className="text-white mb-3">{event.title}</h4>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.distance}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-[#FF7A00]" />
                                  <span className="text-sm text-gray-400">{event.attendees} attending</span>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-xs text-gray-500 mb-1">AI Match</div>
                                  <motion.div
                                    className="text-xl text-[#FF7A00]"
                                    animate={{
                                      scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: i * 0.2
                                    }}
                                  >
                                    {event.matchScore}%
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: AI Matching Engine - REDESIGNED */}
            {activeTab === 'matching' && (
              <motion.div
                key="matching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full"
                layout="position"
              >
                <div className="space-y-8 md:space-y-12 px-4 relative">
                  {/* Neural Network Background */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                    <svg className="absolute w-full h-full">
                      {/* Animated neural network nodes */}
                      {[...Array(20)].map((_, i) => {
                        const x = (i % 5) * 25 + Math.random() * 10;
                        const y = Math.floor(i / 5) * 25 + Math.random() * 10;
                        return (
                          <motion.circle
                            key={i}
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="2"
                            fill="#FF7A00"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0.2, 0.8, 0.2],
                              r: [2, 3, 2]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        );
                      })}
                      {/* Connection lines */}
                      {[...Array(15)].map((_, i) => {
                        const x1 = Math.random() * 100;
                        const y1 = Math.random() * 100;
                        const x2 = Math.random() * 100;
                        const y2 = Math.random() * 100;
                        return (
                          <motion.line
                            key={i}
                            x1={`${x1}%`}
                            y1={`${y1}%`}
                            x2={`${x2}%`}
                            y2={`${y2}%`}
                            stroke="#FF7A00"
                            strokeWidth="0.5"
                            strokeDasharray="4,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                              pathLength: 1,
                              opacity: [0.1, 0.3, 0.1],
                              strokeDashoffset: [0, -8]
                            }}
                            transition={{
                              pathLength: { duration: 2, delay: i * 0.1 },
                              opacity: { duration: 4, repeat: Infinity, delay: i * 0.3 },
                              strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' }
                            }}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Floating Data Particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-[#FF7A00] text-xs opacity-40 pointer-events-none"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                      animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 0.6, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    >
                      {['AI', '94%', 'MATCH', 'ENFP', 'INTJ', '⚡', '🎯', '💡'][i % 8]}
                    </motion.div>
                  ))}

                  <h3 className="text-center mb-6 md:mb-8 text-white text-lg md:text-2xl relative z-10">Real-Time Personality-Based Event Matching</h3>

                  <div className="max-w-6xl mx-auto relative z-10">
                    {/* Featured Event Card at Top with 3D Tilt */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8 md:mb-12 relative"
                      style={{ perspective: '1000px' }}
                    >
                      {/* Radiating pulses from event */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4), transparent 70%)',
                          filter: 'blur(40px)'
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      <motion.div
                        className="bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] rounded-2xl p-1 relative"
                        whileHover={{ 
                          rotateY: 5, 
                          rotateX: 5,
                          scale: 1.02,
                          boxShadow: '0 30px 80px rgba(255, 122, 0, 0.5)'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-black rounded-xl p-6 md:p-8 relative overflow-hidden">
                          {/* Animated scan lines */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF7A00]/20 to-transparent h-20"
                            animate={{
                              y: ['-100%', '200%']
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          />

                          {/* Data stream particles */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: '10%'
                              }}
                              animate={{
                                y: [0, 200],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                          ))}

                          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                            <motion.div
                              animate={{
                                rotate: [0, 360]
                              }}
                              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                              className="flex-shrink-0 relative"
                            >
                              {/* Orbital rings */}
                              <motion.div
                                className="absolute inset-0 border-2 border-[#FF7A00]/30 rounded-2xl"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <motion.div
                                className="absolute inset-0 border-2 border-[#FF7A00]/30 rounded-2xl"
                                animate={{
                                  scale: [1.2, 1, 1.2],
                                  opacity: [0.6, 0.3, 0.6]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />

                              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center shadow-[0_0_40px_rgba(255,122,0,0.6)] relative z-10">
                                <Code className="w-10 h-10 md:w-12 md:h-12 text-white" />
                              </div>
                            </motion.div>
                            
                            <div className="flex-1 text-center md:text-left">
                              <h4 className="text-white mb-2 text-lg md:text-xl">London Tech Startup Mixer</h4>
                              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm text-gray-300">
                                <motion.span 
                                  className="flex items-center gap-1"
                                  whileHover={{ scale: 1.1, color: '#FF7A00' }}
                                >
                                  <Calendar className="w-4 h-4" />
                                  Tomorrow 7PM
                                </motion.span>
                                <motion.span 
                                  className="flex items-center gap-1"
                                  whileHover={{ scale: 1.1, color: '#FF7A00' }}
                                >
                                  <MapPin className="w-4 h-4" />
                                  250m away
                                </motion.span>
                                <motion.span 
                                  className="flex items-center gap-1"
                                  whileHover={{ scale: 1.1, color: '#FF7A00' }}
                                >
                                  <Users className="w-4 h-4" />
                                  52 attending
                                </motion.span>
                              </div>
                            </div>
                            
                            <div className="text-center relative">
                              {/* Circular progress ring */}
                              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  fill="none"
                                  stroke="#FF7A00"
                                  strokeWidth="2"
                                  strokeDasharray="283"
                                  strokeDashoffset="0"
                                  opacity="0.2"
                                />
                                <motion.circle
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  fill="none"
                                  stroke="#FF7A00"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  initial={{ strokeDashoffset: 283 }}
                                  animate={{ strokeDashoffset: 283 - (283 * 0.94) }}
                                  transition={{ duration: 2, ease: 'easeOut' }}
                                  strokeDasharray="283"
                                />
                              </svg>

                              <div className="text-sm text-gray-400 mb-1">AI Match Score</div>
                              <motion.div
                                className="text-5xl md:text-6xl text-[#FF7A00]"
                                animate={{
                                  scale: [1, 1.1, 1],
                                  textShadow: [
                                    '0 0 20px rgba(255, 122, 0, 0.5)',
                                    '0 0 40px rgba(255, 122, 0, 0.8)',
                                    '0 0 20px rgba(255, 122, 0, 0.5)'
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                94%
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Connection beams radiating down to users */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bottom-0 w-0.5 h-20 bg-gradient-to-b from-[#FF7A00] to-transparent"
                          style={{
                            left: `${15 + i * 15}%`,
                            filter: 'blur(1px)'
                          }}
                          animate={{
                            opacity: [0, 0.6, 0],
                            scaleY: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Compatible Users Grid */}
                    <div className="mb-8 relative">
                      {/* Central AI Matching Hub */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 hidden lg:flex items-center justify-center z-0 pointer-events-none"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#FF7A00]/30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#FF7A00]/30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center">
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>

                      <div className="text-center mb-6 relative z-10">
                        <motion.div 
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full mb-2"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(255, 122, 0, 0.2)',
                              '0 0 40px rgba(255, 122, 0, 0.4)',
                              '0 0 20px rgba(255, 122, 0, 0.2)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Users className="w-4 h-4 text-[#FF7A00]" />
                          <span className="text-[#FF7A00] text-sm md:text-base">Compatible Attendees</span>
                        </motion.div>
                        <p className="text-gray-400 text-sm">People you'll actually connect with</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 relative">
                        {userPersonas.map((user, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            whileHover={{ 
                              scale: 1.08, 
                              y: -8,
                              rotateY: 10,
                              z: 50
                            }}
                            className="relative"
                            style={{ perspective: '1000px' }}
                          >
                            {/* Connection line to center hub (desktop only) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 hidden lg:block" style={{ overflow: 'visible' }}>
                              <motion.line
                                x1="50%"
                                y1="50%"
                                x2="50%"
                                y2="-200%"
                                stroke={user.color}
                                strokeWidth="1"
                                strokeDasharray="4,4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ 
                                  pathLength: 1,
                                  opacity: [0.2, 0.5, 0.2],
                                  strokeDashoffset: [0, -8]
                                }}
                                transition={{
                                  pathLength: { duration: 1, delay: i * 0.15 },
                                  opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                                  strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: 'linear' }
                                }}
                              />
                            </svg>

                            {/* Floating particles around card */}
                            {[...Array(3)].map((_, j) => (
                              <motion.div
                                key={j}
                                className="absolute w-1 h-1 rounded-full pointer-events-none"
                                style={{ 
                                  backgroundColor: user.color,
                                  left: '50%',
                                  top: '50%'
                                }}
                                animate={{
                                  x: [0, Math.cos(j * 120 * Math.PI / 180) * 30],
                                  y: [0, Math.sin(j * 120 * Math.PI / 180) * 30],
                                  opacity: [0, 0.8, 0],
                                  scale: [0, 1.5, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.1 + j * 0.3
                                }}
                              />
                            ))}

                            <motion.div 
                              className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-xl p-4 text-center relative overflow-hidden"
                              style={{ borderColor: user.color }}
                              whileHover={{
                                boxShadow: `0 20px 60px ${user.color}60`
                              }}
                            >
                              {/* Animated glow */}
                              <motion.div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  background: `radial-gradient(circle at center, ${user.color}, transparent)`
                                }}
                                animate={{
                                  opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                              />

                              {/* Diagonal scan line */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"
                                animate={{
                                  x: ['-100%', '200%'],
                                  y: ['-100%', '200%']
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: i * 0.4
                                }}
                              />
                              
                              <div className="relative z-10">
                                {/* Avatar */}
                                <motion.div
                                  className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white border-2 text-lg md:text-xl relative"
                                  style={{
                                    background: `linear-gradient(135deg, ${user.color}, ${user.color}dd)`,
                                    borderColor: user.color
                                  }}
                                  animate={{
                                    boxShadow: [
                                      `0 0 0px ${user.color}`,
                                      `0 0 30px ${user.color}`,
                                      `0 0 0px ${user.color}`
                                    ]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                >
                                  {/* Rotating ring around avatar */}
                                  <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-dashed"
                                    style={{ borderColor: user.color }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                  />
                                  {user.name.charAt(0)}
                                </motion.div>
                                
                                <div className="text-white text-sm md:text-base mb-1">{user.name}</div>
                                <motion.div 
                                  className="text-xs px-2 py-1 rounded-full mx-auto mb-1 inline-block"
                                  style={{
                                    backgroundColor: `${user.color}20`,
                                    color: user.color
                                  }}
                                  whileHover={{
                                    backgroundColor: `${user.color}40`,
                                    scale: 1.1
                                  }}
                                >
                                  {user.type}
                                </motion.div>
                                <div className="text-xs text-gray-500">{user.interest}</div>
                                
                                {/* Match percentage with progress bar */}
                                <div className="mt-2">
                                  <motion.div
                                    className="text-xs mb-1"
                                    style={{ color: user.color }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.5 }}
                                  >
                                    {85 + i * 2}% match
                                  </motion.div>
                                  <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: user.color }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${85 + i * 2}%` }}
                                      transition={{ duration: 1, delay: i * 0.1 + 0.7 }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                            
                            {/* Connection indicator */}
                            <motion.div
                              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-black z-20"
                              style={{ backgroundColor: user.color }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            />

                            {/* Data transfer indicator */}
                            <motion.div
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-0 pointer-events-none"
                              style={{ color: user.color }}
                              animate={{
                                y: [-20, -40],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3 + 1
                              }}
                            >
                              ⚡
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* AI Processing Steps */}
                    <div className="space-y-4 md:space-y-6 relative">
                      {/* Processing flow arrows */}
                      <div className="absolute left-8 top-32 bottom-8 w-0.5 bg-gradient-to-b from-[#FF7A00] via-[#FF7A00]/50 to-transparent hidden md:block" />

                      <div className="text-center mb-6 md:mb-8">
                        <motion.div 
                          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full mb-4 text-sm md:text-base"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(255, 122, 0, 0.3)',
                              '0 0 40px rgba(255, 122, 0, 0.6)',
                              '0 0 20px rgba(255, 122, 0, 0.3)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <Brain className="w-4 md:w-5 h-4 md:h-5 text-[#FF7A00]" />
                          </motion.div>
                          <span className="text-[#FF7A00]">AI Processing in Real-Time</span>
                        </motion.div>
                      </div>

                      {/* Processing steps */}
                      {[
                        { 
                          icon: Database, 
                          title: 'Event Data Aggregation',
                          desc: 'Pulling from Eventbrite, Ticketmaster, Meetup, Luma',
                          progress: 100,
                          particles: 8
                        },
                        { 
                          icon: Brain, 
                          title: 'Personality Analysis',
                          desc: 'Analyzing MBTI compatibility for 52 attendees',
                          progress: 85,
                          particles: 6
                        },
                        { 
                          icon: Target, 
                          title: 'Interest Mapping',
                          desc: 'Matching tech interests with event topics',
                          progress: 94,
                          particles: 7
                        },
                        { 
                          icon: Network, 
                          title: 'Social Graph Analysis',
                          desc: 'Finding mutual connections and compatibility',
                          progress: 78,
                          particles: 5
                        }
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          whileHover={{ 
                            scale: 1.02,
                            x: 5,
                            boxShadow: '0 20px 60px rgba(255, 122, 0, 0.3)'
                          }}
                          className="bg-gradient-to-r from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-lg p-4 md:p-6 relative overflow-hidden"
                          style={{ perspective: '1000px' }}
                        >
                          {/* Progress background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/10 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: step.progress / 100 }}
                            transition={{ duration: 1, delay: i * 0.15 }}
                            style={{ transformOrigin: 'left' }}
                          />

                          {/* Animated grid pattern */}
                          <motion.div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: 'linear-gradient(#FF7A00 1px, transparent 1px), linear-gradient(90deg, #FF7A00 1px, transparent 1px)',
                              backgroundSize: '20px 20px'
                            }}
                            animate={{
                              backgroundPosition: ['0px 0px', '20px 20px']
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          />

                          {/* Data particles flowing */}
                          {[...Array(step.particles)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                              style={{
                                left: '10%',
                                top: '50%'
                              }}
                              animate={{
                                x: [0, 300],
                                y: [0, Math.random() * 40 - 20],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: j * 0.2 + i * 0.3
                              }}
                            />
                          ))}

                          <div className="relative z-10 flex items-center gap-4">
                            <motion.div
                              className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                              animate={{
                                rotate: [0, 10, -10, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            >
                              {/* Shimmer effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                  x: ['-100%', '200%']
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.5
                                }}
                              />
                              <step.icon className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10" />
                            </motion.div>

                            <div className="flex-1">
                              <h5 className="text-white mb-1 text-sm md:text-base">{step.title}</h5>
                              <p className="text-gray-400 text-xs md:text-sm">{step.desc}</p>
                              
                              {/* Mini progress bar */}
                              <div className="mt-2 h-1 bg-black/50 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A]"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${step.progress}%` }}
                                  transition={{ duration: 1.5, delay: i * 0.2 }}
                                />
                              </div>
                            </div>

                            <div className="text-center">
                              <motion.div
                                className="text-xl md:text-2xl text-[#FF7A00] mb-1"
                                animate={{
                                  scale: [1, 1.15, 1],
                                  textShadow: [
                                    '0 0 10px rgba(255, 122, 0, 0.5)',
                                    '0 0 20px rgba(255, 122, 0, 0.8)',
                                    '0 0 10px rgba(255, 122, 0, 0.5)'
                                  ]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              >
                                {step.progress}%
                              </motion.div>
                              <motion.div 
                                className="text-xs text-gray-500"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                ACTIVE
                              </motion.div>
                            </div>
                          </div>

                          {/* Step number indicator */}
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/50 flex items-center justify-center text-xs text-[#FF7A00]">
                            {i + 1}
                          </div>
                        </motion.div>
                      ))}

                      {/* Final output indicator */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex items-center justify-center gap-3 py-4"
                      >
                        <motion.div
                          className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#FF7A00]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] rounded-full text-white text-sm relative overflow-hidden"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(255, 122, 0, 0.5)',
                              '0 0 40px rgba(255, 122, 0, 0.8)',
                              '0 0 20px rgba(255, 122, 0, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="relative z-10 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Perfect Match Found
                          </span>
                        </motion.div>
                        <motion.div
                          className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#FF7A00]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Smart Scoring */}
            {activeTab === 'scoring' && (
              <motion.div
                key="scoring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full"
                layout="position"
              >
                <div className="space-y-8 md:space-y-12">
                  <h3 className="text-center mb-8 md:mb-12 text-white px-4">Multi-Dimensional Event Scoring System</h3>

                  <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Left: Scoring breakdown */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00] rounded-lg p-6 md:p-8">
                        <div className="text-center mb-6 md:mb-8">
                          <div className="text-4xl md:text-6xl text-[#FF7A00] mb-2">94%</div>
                          <div className="text-gray-400 text-sm md:text-base">Overall Match Score</div>
                          <div className="text-xs md:text-sm text-gray-500 mt-2">London Tech Startup Mixer</div>
                        </div>

                        {/* Scoring dimensions */}
                        <div className="space-y-4">
                          {scoringDimensions.map((dim, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-xs md:text-sm">{dim.label}</span>
                                <span className="text-[#FF7A00] text-sm md:text-base">{dim.value}%</span>
                              </div>
                              
                              <div className="h-3 bg-black/50 rounded-full overflow-hidden relative">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ 
                                    background: `linear-gradient(90deg, ${dim.color}, ${dim.color}dd)`
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dim.value}%` }}
                                  transition={{ duration: 1, delay: i * 0.15 }}
                                />
                                
                                {/* Animated shimmer */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  animate={{
                                    x: ['-100%', '200%']
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3
                                  }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Total calculation */}
                        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t-2 border-[#FF7A00]/30">
                          <div className="flex items-center justify-between text-white">
                            <span className="text-sm md:text-base">Weighted Total</span>
                            <motion.span 
                              className="text-xl md:text-2xl text-[#FF7A00]"
                              animate={{
                                scale: [1, 1.1, 1]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                            >
                              94%
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      {/* Key insights */}
                      <div className="space-y-2 md:space-y-3">
                        {[
                          { icon: Heart, text: 'ENFP personality highly compatible with event vibe' },
                          { icon: Briefcase, text: 'Professional interests align with 12 attendees' },
                          { icon: Users, text: '3 mutual connections attending' },
                          { icon: MapPin, text: 'Only 250m away - perfect proximity' }
                        ].map((insight, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                            className="flex items-center gap-2 md:gap-3 bg-black/50 border border-[#FF7A00]/30 rounded-lg p-3 md:p-4"
                          >
                            <insight.icon className="w-4 md:w-5 h-4 md:h-5 text-[#FF7A00] flex-shrink-0" />
                            <span className="text-gray-300 text-xs md:text-sm">{insight.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Comparison with other platforms */}
                    <div>
                      <div className="text-center mb-6 md:mb-8 text-gray-400 text-sm md:text-base px-4">
                        How Other Platforms Score This Event
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        {[
                          { platform: 'Eventbrite', score: 0, reason: 'No personality matching - just shows all events' },
                          { platform: 'Facebook Events', score: 30, reason: 'Basic friend attendance - no compatibility analysis' },
                          { platform: 'Meetup', score: 45, reason: 'Category matching only - misses personality fit' },
                          { platform: 'Ticketmaster', score: 0, reason: 'No recommendations - just ticket sales' },
                          { platform: 'Proxima', score: 94, reason: 'Full AI analysis: personality + interests + professional + proximity' }
                        ].map((comp, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`border-2 rounded-lg p-4 md:p-6 ${
                              comp.platform === 'Proxima'
                                ? 'bg-gradient-to-br from-[#FF7A00]/20 to-transparent border-[#FF7A00] shadow-[0_0_40px_rgba(255,122,0,0.3)]'
                                : 'bg-black/50 border-gray-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-sm md:text-base ${comp.platform === 'Proxima' ? 'text-white' : 'text-gray-400'}`}>
                                {comp.platform}
                              </span>
                              
                              <div className="flex items-center gap-2 md:gap-3">
                                {comp.score > 0 && (
                                  <div className="h-2 w-16 md:w-24 bg-black/50 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full bg-gradient-to-r from-gray-500 to-gray-400"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${comp.score}%` }}
                                      transition={{ duration: 1, delay: i * 0.15 }}
                                      style={{
                                        background: comp.platform === 'Proxima'
                                          ? 'linear-gradient(90deg, #FF7A00, #FF8C1A)'
                                          : 'linear-gradient(90deg, #555, #666)'
                                      }}
                                    />
                                  </div>
                                )}
                                <span className={`text-lg md:text-xl ${
                                  comp.platform === 'Proxima' ? 'text-[#FF7A00]' : 'text-gray-500'
                                }`}>
                                  {comp.score}%
                                </span>
                              </div>
                            </div>
                            
                            <p className={`text-xs md:text-sm ${
                              comp.platform === 'Proxima' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {comp.reason}
                            </p>

                            {comp.platform === 'Proxima' && (
                              <motion.div
                                className="mt-3 flex items-center gap-2 text-xs text-[#FF7A00]"
                                animate={{
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity
                                }}
                              >
                                <Sparkles className="w-4 h-4" />
                                <span>Revolutionary AI-powered matching</span>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Journey Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-20"
        >
          <div className="text-center mb-8 md:mb-12 px-4">
            <h3 className="text-white mb-3 md:mb-4">Complete User Journey</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Watch how Sarah discovers the perfect event nearby, gets matched with compatible attendees, 
              and navigates to the venue—all powered by AI
            </p>
          </div>

          {/* Journey Steps with Animated Map Visualization */}
          <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-4 md:p-8 border border-[#FF7A00]/20 overflow-hidden">
            {/* Map-style background grid */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #FF7A00 1px, transparent 1px),
                    linear-gradient(to bottom, #FF7A00 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '40px 40px']
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* GPS Scanning effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.1), transparent 70%)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Journey Path - Desktop */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Animated Journey Path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
                {/* Main path curve */}
                <motion.path
                  d="M 100 400 Q 250 350, 300 250 T 500 200 Q 650 150, 700 250 T 900 300"
                  stroke="#FF7A00"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                {/* Glowing path overlay */}
                <motion.path
                  d="M 100 400 Q 250 350, 300 250 T 500 200 Q 650 150, 700 250 T 900 300"
                  stroke="#FF7A00"
                  strokeWidth="6"
                  fill="none"
                  filter="blur(4px)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />



                {/* Glow filter */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Journey Step Markers */}
              {[
                { 
                  step: 1, 
                  title: 'Open App', 
                  desc: 'Sarah opens Proxima',
                  location: 'London Bridge',
                  icon: Sparkles,
                  x: 100,
                  y: 400,
                  time: '2:30 PM'
                },
                { 
                  step: 2, 
                  title: 'AI Scanning', 
                  desc: '41,100+ events analyzed',
                  location: 'Scanning...',
                  icon: Brain,
                  x: 300,
                  y: 250,
                  time: '2:31 PM'
                },
                { 
                  step: 3, 
                  title: 'Match Found', 
                  desc: 'Tech Mixer - 94% match',
                  location: '250m away',
                  icon: Target,
                  x: 500,
                  y: 200,
                  time: '2:32 PM'
                },
                { 
                  step: 4, 
                  title: 'View Details', 
                  desc: '12 compatible people',
                  location: 'RSVP sent',
                  icon: Users,
                  x: 700,
                  y: 250,
                  time: '2:33 PM'
                },
                { 
                  step: 5, 
                  title: 'Arrived', 
                  desc: 'At venue',
                  location: 'Tech Hub Shoreditch',
                  icon: MapPin,
                  x: 900,
                  y: 300,
                  time: '2:36 PM'
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${(step.x / 1000) * 100}%`,
                    top: `${(step.y / 500) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.6 }}
                >
                  {/* Pulsing location marker */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FF7A00]/30"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    style={{ width: '60px', height: '60px', left: '-15px', top: '-15px' }}
                  />

                  {/* Main marker */}
                  <motion.div
                    className="relative z-10 cursor-pointer"
                    whileHover={{ scale: 1.2, zIndex: 50 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon circle */}
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center shadow-lg border-2 border-white/20"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(255, 122, 0, 0.5)',
                          '0 0 40px rgba(255, 122, 0, 0.8)',
                          '0 0 20px rgba(255, 122, 0, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Always-visible text label */}
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-center min-w-[140px]"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.6 + 0.3 }}
                    >
                      <div className="text-xs text-[#FF7A00] mb-1">{step.time}</div>
                      <div className="text-white text-sm mb-1">{step.title}</div>
                      <div className="text-gray-400 text-xs mb-0.5">{step.desc}</div>
                      <div className="text-gray-500 text-xs italic">{step.location}</div>
                    </motion.div>

                    {/* Enhanced info card on hover with additional details */}
                    <motion.div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/95 border-2 border-[#FF7A00] rounded-lg p-3 min-w-[220px] opacity-0 hover:opacity-100 transition-opacity pointer-events-none shadow-xl"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="text-xs text-[#FF7A00] mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {step.time}
                      </div>
                      <div className="text-white mb-1">{step.title}</div>
                      <div className="text-gray-300 text-xs mb-2">{step.desc}</div>
                      <div className="text-gray-400 text-xs italic border-t border-[#FF7A00]/30 pt-2">
                        📍 {step.location}
                      </div>
                      
                      {/* Arrow pointer */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#FF7A00]" />
                    </motion.div>

                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black text-xs flex items-center justify-center font-bold shadow-md">
                      {step.step}
                    </div>
                  </motion.div>

                  {/* GPS signal rings */}
                  {i === 0 && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#FF7A00]/50"
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                        style={{ width: '60px', height: '60px', left: '-24px', top: '-24px' }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#FF7A00]/50"
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                          ease: 'easeOut'
                        }}
                        style={{ width: '60px', height: '60px', left: '-24px', top: '-24px' }}
                      />
                    </>
                  )}
                </motion.div>
              ))}

              {/* Sarah's avatar traveling along path */}
              <motion.div
                className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center text-white shadow-lg z-20 pointer-events-none"
                initial={{ left: '10%', top: '80%', opacity: 0 }}
                whileInView={{
                  left: ['10%', '30%', '50%', '70%', '90%'],
                  top: ['80%', '50%', '40%', '50%', '60%'],
                  opacity: [0, 1, 1, 1, 1]
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 5,
                  delay: 1,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: "easeInOut"
                }}
              >
                <div className="text-sm">👩</div>
                
                {/* Name tag */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-purple-500 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                  Sarah
                </div>
              </motion.div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="block lg:hidden space-y-6">
              {[
                { 
                  step: 1, 
                  title: 'Open App', 
                  desc: 'Sarah opens Proxima near London Bridge',
                  icon: Sparkles,
                  action: 'AI analyzes location & personality',
                  time: '2:30 PM'
                },
                { 
                  step: 2, 
                  title: 'AI Discovery', 
                  desc: 'Scanning 41,100+ events from all sources',
                  icon: Brain,
                  action: '94% match found nearby',
                  time: '2:31 PM'
                },
                { 
                  step: 3, 
                  title: 'Perfect Match', 
                  desc: 'Tech Startup Mixer - 250m away',
                  icon: Target,
                  action: 'Push notification sent',
                  time: '2:32 PM'
                },
                { 
                  step: 4, 
                  title: 'View Details', 
                  desc: '12 compatible attendees, 3 mutual friends',
                  icon: Users,
                  action: 'RSVP & get directions',
                  time: '2:33 PM'
                },
                { 
                  step: 5, 
                  title: 'Navigate', 
                  desc: 'Real-time walking directions',
                  icon: MapPin,
                  action: '3 min walk to venue',
                  time: '2:36 PM'
                }
              ].map((journey, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-4 relative"
                >
                  {/* Vertical connector and marker */}
                  <div className="flex flex-col items-center relative">
                    {/* GPS rings on first step */}
                    {i === 0 && (
                      <>
                        <motion.div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-[#FF7A00]/30"
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                        <motion.div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-[#FF7A00]/30"
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5
                          }}
                        />
                      </>
                    )}

                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center text-white z-10 relative shadow-lg border-2 border-white/20"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(255, 122, 0, 0.5)',
                          '0 0 30px rgba(255, 122, 0, 0.8)',
                          '0 0 20px rgba(255, 122, 0, 0.5)'
                        ]
                      }}
                    >
                      <journey.icon className="w-6 h-6" />
                      
                      {/* Step number */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black text-xs flex items-center justify-center font-bold">
                        {journey.step}
                      </div>
                    </motion.div>
                    
                    {i < 4 && (
                      <motion.div
                        className="w-0.5 h-full bg-gradient-to-b from-[#FF7A00] to-[#FF7A00]/30 relative"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                        style={{ transformOrigin: 'top' }}
                      >
                        {/* Traveling dot */}
                        <motion.div
                          className="absolute w-2 h-2 bg-[#FF7A00] rounded-full left-1/2 -translate-x-1/2"
                          animate={{
                            top: ['0%', '100%']
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Content card */}
                  <motion.div 
                    className="flex-1 bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-lg p-4 mb-4 relative overflow-hidden"
                    whileHover={{
                      borderColor: '#FF7A00',
                      boxShadow: '0 10px 40px rgba(255, 122, 0, 0.3)'
                    }}
                  >
                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/10 to-transparent"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-[#FF7A00]">{journey.time}</div>
                        <div className="text-xs text-gray-500">Step {journey.step}/5</div>
                      </div>
                      <h4 className="text-white mb-2">{journey.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{journey.desc}</p>
                      <div className="text-xs text-gray-500 italic flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#FF7A00]" />
                        {journey.action}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Success badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center mt-6"
              >
                <div className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] rounded-full text-white flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  <span>Journey Complete!</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
