import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, Radio, Lock, Layers, Camera, MapPinned, FileText, Brain } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    title: 'Proximity Mapping',
    icon: MapPin,
    description: 'Real-time GPS, UWB, BLE, and Wi-Fi fusion for precise location awareness. Know who\'s around you with unprecedented accuracy.',
  },
  {
    title: 'Personality Matching',
    icon: Users,
    description: 'MBTI-inspired FLWSTATE Process analyzes compatibility across social, professional, and romantic contexts for meaningful connections.',
  },
  {
    title: 'Wave Feature',
    icon: Radio,
    description: 'Send proximity signals (Romantic, Professional or Friendly) to express interest, reducing the pressure of interaction and fear of rejection by serving as a bridge. Mutual waves unlock conversations and deeper location accuracy, serving as a bridge for interaction while respecting privacy and consent. For romantic waves you do run the risk of getting friendzoned',
  },
  {
    title: 'Privacy Controls',
    icon: Lock,
    description: 'Stealth mode, safe zones, ghost mode, and granular visibility settings. Common zones like home or gym can be set to have no map visibility at all. Ultra-accurate map location is only shown within 0-25 meters proximity. You control who sees you, when, and where.',
  },
  {
    title: 'Multi-Use All-in-One Solution',
    icon: Layers,
    description: 'Seamlessly switch between Social, Professional, and Dating contexts for ultimate convenience. One app, infinite possibilities—eliminating the need for multiple platforms.',
  },
  {
    title: 'AR Overlays',
    icon: Camera,
    description: 'Future integration: Point your camera to discover people, events, and places around you with augmented reality visualization, enhanced further with wearables integration. Although we are jumping into the virtual world through our phones, we are transitioning from observing a flat, 2D digital world through the screen of a phone to inhabiting a shared spatial dimension where AR wearables fuse digital information and interactions directly onto our physical reality—and Proxima is the bridge for that.',
  },
  {
    title: 'Local Service Discovery',
    icon: MapPinned,
    description: 'Find nearby services, venues, and businesses with AI-powered recommendations tailored to your preferences.',
  },
  {
    title: 'CV Upload',
    icon: FileText,
    description: 'Professional AI parses your CV to suggest relevant networking opportunities and career connections. Adds valuable professional data points to enhance matching accuracy.',
  },
  {
    title: 'Ultimate AI Sidekick',
    icon: Brain,
    description: 'A conversational AI companion that learns your unique connection preferences beyond surface-level data. Share specific interests, aspirations, values, and nuanced preferences that matter to you. Your Sidekick remembers these details and helps find meaningful connections based on what truly matters—not just what shows up on a personality test.',
  },
];

export function SolutionSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section id="solution" className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Solution & Core Features</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Proxima unifies real-time proximity intelligence with deep personality insights to create meaningful connections across every aspect of your life. We are positioned at the right place at the right time, with more than enough momentum thanks to the AI boom propelling us forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: '1500px' }}>
          {features.map((feature, index) => {
            const isHovered = selectedFeature === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="relative h-full"
                  animate={isHovered ? { 
                    rotateY: 5, 
                    rotateX: -5,
                    scale: 1.05,
                    z: 50
                  } : { 
                    rotateY: 0, 
                    rotateX: 0,
                    scale: 1,
                    z: 0
                  }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card
                    className="bg-gradient-to-br from-black via-[#0D0D0D] to-black border-[#FF7A00]/30 p-6 h-full cursor-pointer hover:border-[#FF7A00] transition-all group relative overflow-hidden"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      boxShadow: isHovered ? '0 20px 60px rgba(255, 122, 0, 0.3), 0 0 40px rgba(255, 122, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.5)'
                    }}
                    onMouseEnter={() => setSelectedFeature(index)}
                    onMouseLeave={() => setSelectedFeature(null)}
                  >
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden" style={{ transform: 'translateZ(-20px)' }}>
                      {/* Proximity Mapping - Radar waves */}
                      {index === 0 && (
                        <>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF7A00]/30"
                              animate={{
                                scale: [0, 2.5],
                                opacity: [0.6, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeOut"
                              }}
                              style={{ width: '100px', height: '100px' }}
                            />
                          ))}
                          <motion.div
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#FF7A00] rounded-full -translate-x-1/2 -translate-y-1/2"
                            animate={{
                              boxShadow: ['0 0 10px #FF7A00', '0 0 30px #FF7A00', '0 0 10px #FF7A00']
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </>
                      )}

                      {/* Personality Matching - Connecting dots */}
                      {index === 1 && (
                        <>
                          {[...Array(6)].map((_, i) => {
                            const angle = (i * 60 * Math.PI) / 180;
                            const x = 50 + 35 * Math.cos(angle);
                            const y = 50 + 35 * Math.sin(angle);
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full bg-[#FF7A00]"
                                style={{ 
                                  left: `${x}%`, 
                                  top: `${y}%`,
                                  boxShadow: '0 0 15px #FF7A00'
                                }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3
                                }}
                              />
                            );
                          })}
                          <svg className="absolute inset-0 w-full h-full opacity-30">
                            {[...Array(6)].map((_, i) => {
                              const angle1 = (i * 60 * Math.PI) / 180;
                              const angle2 = ((i + 1) * 60 * Math.PI) / 180;
                              const x1 = 50 + 35 * Math.cos(angle1);
                              const y1 = 50 + 35 * Math.sin(angle1);
                              const x2 = 50 + 35 * Math.cos(angle2);
                              const y2 = 50 + 35 * Math.sin(angle2);
                              return (
                                <motion.line
                                  key={i}
                                  x1={`${x1}%`}
                                  y1={`${y1}%`}
                                  x2={`${x2}%`}
                                  y2={`${y2}%`}
                                  stroke="#FF7A00"
                                  strokeWidth="1"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                                />
                              );
                            })}
                          </svg>
                        </>
                      )}

                      {/* Wave Feature - Ripple effect */}
                      {index === 2 && (
                        <>
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FF7A00]"
                              animate={{
                                scale: [0, 3],
                                opacity: [0.8, 0],
                                rotate: [0, 180]
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeOut"
                              }}
                              style={{ width: '80px', height: '80px' }}
                            />
                          ))}
                        </>
                      )}

                      {/* Privacy Controls - Shield layers */}
                      {index === 3 && (
                        <>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 border-2 border-[#FF7A00]/20 rounded-lg"
                              animate={{
                                scale: [0.8 + i * 0.1, 1 + i * 0.1],
                                opacity: [0.3, 0.6, 0.3]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                              style={{ margin: `${i * 10}px` }}
                            />
                          ))}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-[#FF7A00]/40 rounded-full"
                            animate={{
                              rotate: [0, 360]
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </>
                      )}

                      {/* Multi-Use Mode - Layered cards */}
                      {index === 4 && (
                        <>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2 w-24 h-32 border-2 border-[#FF7A00]/30 rounded-lg"
                              style={{
                                transform: `translate(-50%, -50%) translateZ(${i * 10}px) rotateY(${i * 15}deg)`
                              }}
                              animate={{
                                rotateY: [i * 15, i * 15 + 360],
                                opacity: [0.3, 0.6, 0.3]
                              }}
                              transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: i * 0.7
                              }}
                            />
                          ))}
                        </>
                      )}

                      {/* AR Overlays - Viewfinder markers */}
                      {index === 5 && (
                        <>
                          {/* Corner brackets */}
                          {[
                            { top: '10%', left: '10%', rotate: 0 },
                            { top: '10%', right: '10%', rotate: 90 },
                            { bottom: '10%', right: '10%', rotate: 180 },
                            { bottom: '10%', left: '10%', rotate: 270 }
                          ].map((pos, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-8 h-8 border-t-2 border-l-2 border-[#FF7A00]"
                              style={{ 
                                ...pos,
                                transform: `rotate(${pos.rotate}deg)`
                              }}
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.9, 1.1, 0.9]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#FF7A00] rounded-full"
                            animate={{
                              boxShadow: ['0 0 5px #FF7A00', '0 0 20px #FF7A00', '0 0 5px #FF7A00']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </>
                      )}

                      {/* Local Service Discovery - Map pins */}
                      {index === 6 && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-[#FF7A00] rounded-full"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 2) * 30}%`
                              }}
                              animate={{
                                y: [-5, 5, -5],
                                opacity: [0.4, 1, 0.4],
                                scale: [0.8, 1.2, 0.8]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            >
                              <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-[#FF7A00] to-transparent"
                                style={{ transformOrigin: 'bottom' }}
                              />
                            </motion.div>
                          ))}
                        </>
                      )}

                      {/* CV Upload - Document scanning */}
                      {index === 7 && (
                        <>
                          <motion.div
                            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-[#FF7A00]"
                            animate={{
                              y: [0, 150],
                              opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute left-1/4 right-1/4 h-px bg-[#FF7A00]/30"
                              style={{ top: `${30 + i * 15}%` }}
                              animate={{
                                scaleX: [0, 1],
                                opacity: [0, 0.6]
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 2.5,
                                delay: i * 0.1
                              }}
                            />
                          ))}
                        </>
                      )}

                      {/* Ultimate AI Sidekick - Neural network & AI brain */}
                      {index === 8 && (
                        <>
                          {/* Neural network nodes */}
                          {[...Array(12)].map((_, i) => {
                            const angle = (i * 30 * Math.PI) / 180;
                            const radius = 40;
                            const x = 50 + radius * Math.cos(angle);
                            const y = 50 + radius * Math.sin(angle);
                            return (
                              <motion.div
                                key={`node-${i}`}
                                className="absolute w-2 h-2 rounded-full bg-[#FF7A00]"
                                style={{ 
                                  left: `${x}%`, 
                                  top: `${y}%`,
                                  boxShadow: '0 0 10px #FF7A00'
                                }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.15
                                }}
                              />
                            );
                          })}
                          
                          {/* Synaptic connections */}
                          <svg className="absolute inset-0 w-full h-full opacity-30">
                            {[...Array(12)].map((_, i) => {
                              const angle1 = (i * 30 * Math.PI) / 180;
                              const angle2 = ((i + 1) * 30 * Math.PI) / 180;
                              const radius = 40;
                              const x1 = 50 + radius * Math.cos(angle1);
                              const y1 = 50 + radius * Math.sin(angle1);
                              const x2 = 50 + radius * Math.cos(angle2);
                              const y2 = 50 + radius * Math.sin(angle2);
                              return (
                                <motion.line
                                  key={`synapse-${i}`}
                                  x1={`${x1}%`}
                                  y1={`${y1}%`}
                                  x2={`${x2}%`}
                                  y2={`${y2}%`}
                                  stroke="#FF7A00"
                                  strokeWidth="1"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ 
                                    pathLength: [0, 1, 0],
                                    opacity: [0, 0.6, 0]
                                  }}
                                  transition={{ 
                                    duration: 2.5, 
                                    repeat: Infinity, 
                                    delay: i * 0.1 
                                  }}
                                />
                              );
                            })}
                            {/* Connections to center */}
                            {[0, 3, 6, 9].map((i) => {
                              const angle = (i * 30 * Math.PI) / 180;
                              const radius = 40;
                              const x = 50 + radius * Math.cos(angle);
                              const y = 50 + radius * Math.sin(angle);
                              return (
                                <motion.line
                                  key={`center-${i}`}
                                  x1="50%"
                                  y1="50%"
                                  x2={`${x}%`}
                                  y2={`${y}%`}
                                  stroke="#FF7A00"
                                  strokeWidth="1.5"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: [0, 1, 0] }}
                                  transition={{ 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    delay: i * 0.2 
                                  }}
                                />
                              );
                            })}
                          </svg>

                          {/* Central AI brain core */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#FF7A00] bg-[#FF7A00]/10"
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                '0 0 10px #FF7A00',
                                '0 0 30px #FF7A00, 0 0 40px #FF7A00',
                                '0 0 10px #FF7A00'
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />

                          {/* Thinking/learning particles */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={`particle-${i}`}
                              className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                              style={{
                                left: '50%',
                                top: '50%'
                              }}
                              animate={{
                                x: [0, (Math.cos((i * 45 * Math.PI) / 180) * 60)],
                                y: [0, (Math.sin((i * 45 * Math.PI) / 180) * 60)],
                                opacity: [1, 0],
                                scale: [1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: "easeOut"
                              }}
                            />
                          ))}

                          {/* Data streams flowing in */}
                          {[...Array(4)].map((_, i) => {
                            const positions = [
                              { x: 10, y: 20 },
                              { x: 90, y: 30 },
                              { x: 15, y: 80 },
                              { x: 85, y: 75 }
                            ];
                            const pos = positions[i];
                            return (
                              <motion.div
                                key={`stream-${i}`}
                                className="absolute w-0.5 h-8 bg-gradient-to-b from-[#FF7A00] to-transparent"
                                style={{
                                  left: `${pos.x}%`,
                                  top: `${pos.y}%`
                                }}
                                animate={{
                                  opacity: [0, 1, 0],
                                  scaleY: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.4
                                }}
                              />
                            );
                          })}

                          {/* Conversation bubbles */}
                          {[0, 1].map((i) => (
                            <motion.div
                              key={`bubble-${i}`}
                              className="absolute w-6 h-6 rounded-full border-2 border-[#FF7A00]/40"
                              style={{
                                left: i === 0 ? '25%' : '70%',
                                top: i === 0 ? '35%' : '60%'
                              }}
                              animate={{
                                scale: [0, 1, 1, 0],
                                opacity: [0, 0.6, 0.6, 0],
                                y: [0, -15]
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 1.2
                              }}
                            >
                              {/* Smaller bubble dots */}
                              <motion.div
                                className="absolute w-1.5 h-1.5 bg-[#FF7A00] rounded-full"
                                style={{ bottom: '-4px', left: i === 0 ? '20%' : '70%' }}
                                animate={{
                                  opacity: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: i * 1.2
                                }}
                              />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>

                    {/* Glow overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/20 via-transparent to-transparent"
                      animate={{
                        opacity: isHovered ? 0.3 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Main content */}
                    <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                      {/* 3D Floating Icon */}
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF7A00]/20 to-[#FF7A00]/5 mb-4 relative"
                        animate={isHovered ? {
                          rotateY: [0, 360],
                          scale: [1, 1.15, 1]
                        } : {
                          rotateY: 0,
                          scale: 1
                        }}
                        transition={{ 
                          rotateY: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" },
                          scale: { duration: 0.4 }
                        }}
                        style={{ 
                          transformStyle: 'preserve-3d',
                          boxShadow: isHovered ? '0 10px 30px rgba(255, 122, 0, 0.4)' : 'none'
                        }}
                      >
                        <feature.icon 
                          className="w-8 h-8 text-[#FF7A00]" 
                          style={{ 
                            filter: isHovered ? 'drop-shadow(0 0 8px #FF7A00)' : 'none',
                            transform: 'translateZ(10px)'
                          }}
                        />
                        
                        {/* Icon glow ring */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-[#FF7A00]"
                          animate={{
                            scale: isHovered ? [1, 1.3, 1] : 1,
                            opacity: isHovered ? [0.5, 0, 0.5] : 0
                          }}
                          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                        />
                      </motion.div>

                      {/* Title with animated underline */}
                      <div className="mb-3 relative">
                        <h3 className="text-white relative inline-block">
                          {feature.title}
                        </h3>
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF7A00] to-transparent"
                          animate={{
                            width: isHovered ? '100%' : '0%'
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Description with stagger animation */}
                      <AnimatePresence mode="wait">
                        {isHovered ? (
                          <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 10, rotateX: -20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: -10, rotateX: 20 }}
                            transition={{ duration: 0.3 }}
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {feature.description}
                            </p>
                            
                            {/* Feature badge */}
                            <motion.div
                              className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                            >
                              <div className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full" />
                              <span className="text-xs text-[#FF7A00]">Core Feature</span>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.p
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-gray-500 text-sm"
                          >
                            Hover to explore
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF7A00]/30 rounded-tl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF7A00]/30 rounded-br-lg" />
                    
                    {/* Particle effects on hover */}
                    {isHovered && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              y: [0, -20]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-[#FF7A00]/10 to-transparent border-l-4 border-[#FF7A00] p-8 rounded-r-lg"
        >
          <h3 className="mb-4 text-white">Why Proxima Stands Out</h3>
          <p className="text-gray-300 mb-4">
            Unlike fragmented solutions, Proxima combines cutting-edge proximity technology with personality-driven AI to deliver a unified experience. Whether you're looking for friends, dates, business connections, or local experiences, Proxima adapts to your needs in real-time.
          </p>
          <div className="flex flex-wrap gap-2">
            {['6-Layer AI System', 'Privacy-First Design', 'Multi-Context Matching', 'Real-Time Proximity'].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded-full text-sm border border-[#FF7A00]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}