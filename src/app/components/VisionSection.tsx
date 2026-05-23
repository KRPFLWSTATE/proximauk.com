import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Glasses, 
  MapPin, 
  Users, 
  Zap, 
  Store, 
  TrendingUp,
  Eye,
  Sparkles,
  Radio,
  Calendar,
  MessageSquare,
  Navigation,
  Layers,
  Target,
  Heart,
  Briefcase,
  Coffee,
  Music,
  ShoppingBag,
  Award
} from 'lucide-react';

export function VisionSection() {
  const [currentScene, setCurrentScene] = useState(0);
  const [hoveredPerson, setHoveredPerson] = useState<number | null>(null);
  const [activeFlare, setActiveFlare] = useState<number | null>(null);
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

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(interval);
  }, [isInView]);

  // AR Scene: People with profiles visible
  const arPeople = [
    {
      name: "Alex Chen",
      role: "Senior Product Designer",
      compatibility: 94,
      interests: ["Design", "Photography", "Coffee"],
      x: 20,
      y: 45,
      icon: Briefcase,
      color: "#FF7A00"
    },
    {
      name: "Sarah Martinez",
      role: "Music Producer",
      compatibility: 87,
      interests: ["Music", "Tech", "Events"],
      x: 60,
      y: 35,
      icon: Music,
      color: "#FF9500"
    },
    {
      name: "Jordan Lee",
      role: "Startup Founder",
      compatibility: 91,
      interests: ["Entrepreneurship", "AI", "Running"],
      x: 80,
      y: 55,
      icon: Award,
      color: "#FFAA00"
    }
  ];

  // Business Flares
  const businessFlares = [
    {
      name: "Brew & Bytes Café",
      message: "30% off for techies! Code: PROXIMA",
      distance: "0.2 mi",
      type: "Coffee",
      x: 15,
      y: 20,
      icon: Coffee,
      color: "#FF7A00"
    },
    {
      name: "TechHub Co-Working",
      message: "Free day pass for new members",
      distance: "0.4 mi",
      type: "Workspace",
      x: 70,
      y: 15,
      icon: Briefcase,
      color: "#FF8C1A"
    },
    {
      name: "The Vinyl Lounge",
      message: "Live jazz tonight at 8 PM",
      distance: "0.6 mi",
      type: "Entertainment",
      x: 50,
      y: 25,
      icon: Music,
      color: "#FFA500"
    }
  ];

  // Proxima Zones
  const proximaZones = [
    { 
      name: "Tech Networking Zone", 
      activeUsers: 23, 
      x: 30, 
      y: 60, 
      size: 150,
      color: "rgba(255, 122, 0, 0.2)"
    },
    { 
      name: "Creative Minds Hub", 
      activeUsers: 17, 
      x: 65, 
      y: 50, 
      size: 120,
      color: "rgba(255, 149, 0, 0.2)"
    }
  ];

  // AR Events overlay
  const arEvents = [
    {
      name: "Design Meetup",
      time: "2:00 PM Today",
      attendees: 45,
      compatibility: 92,
      x: 35,
      y: 70
    },
    {
      name: "Startup Pitch Night",
      time: "7:00 PM Today",
      attendees: 78,
      compatibility: 88,
      x: 75,
      y: 65
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-20 md:py-32 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 122, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 122, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
        
        {/* Animated scanning lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255, 122, 0, 0.1) 50%, transparent 100%)',
          }}
          animate={{
            y: ['-100%', '200%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          {/* AR Glasses Icon Animation */}
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <Glasses className="w-16 h-16 md:w-20 md:h-20 text-[#FF7A00]" />
              <motion.div
                className="absolute inset-0 blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <Glasses className="w-16 h-16 md:w-20 md:h-20 text-[#FF7A00]" />
              </motion.div>
            </div>
          </motion.div>

          <h2 className="mb-6 text-white text-3xl md:text-4xl lg:text-5xl">
            Vision: The Near Horizon
          </h2>
          <p className="text-[#FF7A00] text-xl md:text-2xl mb-4">
            A 5-15 Year Speculation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-8" />
          <p className="text-gray-300 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
            Imagine walking through your city wearing AR glasses. The physical and digital worlds merge seamlessly. 
            Every person, place, and opportunity becomes instantly visible and intelligently connected.
          </p>
        </motion.div>

        {/* Wearable Integration Journey - A Day in the Life */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <div className="max-w-7xl mx-auto">
            {/* Central Wearable Device Showcase */}
            <div className="text-center mb-12">
              <motion.div
                className="inline-block"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative">
                  {/* AR Glasses */}
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Glasses className="w-32 h-32 md:w-40 md:h-40 text-[#FF7A00]" />
                    <motion.div
                      className="absolute inset-0 blur-2xl opacity-50"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Glasses className="w-32 h-32 md:w-40 md:h-40 text-[#FF7A00]" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Connection lines to features */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-[#FF7A00] to-transparent origin-left"
                      style={{
                        rotate: `${i * 60}deg`,
                      }}
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scaleX: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              <motion.p
                className="text-[#FF7A00] mt-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your Gateway to an Enhanced Reality
              </motion.p>
            </div>

            {/* Timeline Journey - 4 Scenes Throughout the Day */}
            <div className="space-y-16">
              {[
                {
                  time: "7:00 AM",
                  title: "Morning Commute",
                  scene: "Morning",
                  description: "Start your day with intelligent awareness",
                  features: [
                    {
                      icon: Users,
                      title: "Smart Recognition",
                      detail: "AR glasses identify compatible people within 50m",
                      position: { x: 15, y: 40 },
                      color: "#FF7A00"
                    },
                    {
                      icon: Coffee,
                      title: "Route Optimization",
                      detail: "See cafés with available seats + your favorite order ready",
                      position: { x: 75, y: 35 },
                      color: "#FF8C1A"
                    },
                    {
                      icon: Zap,
                      title: "Live Updates",
                      detail: "Haptic wrist buzz alerts you to high-match nearby",
                      position: { x: 45, y: 60 },
                      color: "#FFA500"
                    }
                  ],
                  gradient: "from-orange-950/30 via-gray-900 to-gray-950"
                },
                {
                  time: "12:30 PM",
                  title: "Lunch Networking",
                  scene: "Afternoon",
                  description: "Convert random encounters into meaningful connections",
                  features: [
                    {
                      icon: MessageSquare,
                      title: "Instant Icebreakers",
                      detail: "AI suggests conversation starters based on mutual interests",
                      position: { x: 25, y: 45 },
                      color: "#FF7A00"
                    },
                    {
                      icon: Store,
                      title: "Business Flares",
                      detail: "Exclusive lunch deals appear as AR overlays",
                      position: { x: 65, y: 38 },
                      color: "#FF9500"
                    },
                    {
                      icon: Award,
                      title: "Compatibility Score",
                      detail: "See 89% match before you even approach someone",
                      position: { x: 50, y: 65 },
                      color: "#FFAA00"
                    }
                  ],
                  gradient: "from-blue-950/20 via-gray-900 to-gray-950"
                },
                {
                  time: "6:00 PM",
                  title: "Evening Event",
                  scene: "Evening",
                  description: "Navigate social spaces with confidence",
                  features: [
                    {
                      icon: Calendar,
                      title: "Event Overlay",
                      detail: "See who's attending before you arrive + their profiles",
                      position: { x: 20, y: 42 },
                      color: "#FF7A00"
                    },
                    {
                      icon: Radio,
                      title: "Proxima Zones",
                      detail: "Join voice channels automatically when entering zones",
                      position: { x: 70, y: 40 },
                      color: "#FF8C1A"
                    },
                    {
                      icon: Navigation,
                      title: "Smart Pathfinding",
                      detail: "AR arrows guide you to people you'd connect with",
                      position: { x: 48, y: 68 },
                      color: "#FFA500"
                    }
                  ],
                  gradient: "from-purple-950/20 via-gray-900 to-gray-950"
                },
                {
                  time: "9:00 PM",
                  title: "Late Night Social",
                  scene: "Night",
                  description: "Stay connected as the city lights up",
                  features: [
                    {
                      icon: Music,
                      title: "Live Entertainment",
                      detail: "AR shows live music venues with your music taste match",
                      position: { x: 30, y: 45 },
                      color: "#FF7A00"
                    },
                    {
                      icon: ShoppingBag,
                      title: "Night Market",
                      detail: "Exclusive after-hours deals visible only through AR",
                      position: { x: 60, y: 38 },
                      color: "#FF9500"
                    },
                    {
                      icon: Heart,
                      title: "Connection Map",
                      detail: "See your daily connection stats + new relationships formed",
                      position: { x: 45, y: 70 },
                      color: "#FFAA00"
                    }
                  ],
                  gradient: "from-indigo-950/30 via-gray-900 to-gray-950"
                }
              ].map((scene, sceneIndex) => (
                <motion.div
                  key={sceneIndex}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: sceneIndex * 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {sceneIndex < 3 && (
                    <motion.div
                      className="absolute left-1/2 top-full w-0.5 h-16 bg-gradient-to-b from-[#FF7A00] to-transparent -translate-x-1/2 z-0"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  )}

                  {/* Scene Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF8C1A]/20 border border-[#FF7A00]/40 rounded-full mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-[#FF7A00]"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[#FF7A00] text-sm">{scene.time}</span>
                      </div>
                      <span className="text-white">{scene.title}</span>
                    </motion.div>
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">{scene.description}</p>
                  </div>

                  {/* AR View Container */}
                  <div className={`relative aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br ${scene.gradient} rounded-3xl border-4 border-[#FF7A00]/30 overflow-hidden shadow-2xl`}>
                    {/* Animated Grid Overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255, 122, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 122, 0, 0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '30px 30px',
                        }}
                      />
                    </div>

                    {/* AR Scanning Line */}
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
                      animate={{ y: ['0%', '100%'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: sceneIndex * 0.5
                      }}
                    />

                    {/* Feature Overlays */}
                    <AnimatePresence>
                      {scene.features.map((feature, featureIndex) => {
                        const Icon = feature.icon;
                        const isHovered = hoveredPerson === (sceneIndex * 10 + featureIndex);
                        
                        return (
                          <motion.div
                            key={featureIndex}
                            className="absolute cursor-pointer"
                            style={{
                              left: `${feature.position.x}%`,
                              top: `${feature.position.y}%`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.8 + featureIndex * 0.2,
                              type: "spring",
                              stiffness: 200
                            }}
                            onHoverStart={() => setHoveredPerson(sceneIndex * 10 + featureIndex)}
                            onHoverEnd={() => setHoveredPerson(null)}
                          >
                            {/* Feature Icon with Pulse */}
                            <motion.div
                              className="relative"
                              animate={{
                                scale: isHovered ? 1.2 : 1
                              }}
                            >
                              <motion.div
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md border-2"
                                style={{
                                  backgroundColor: `${feature.color}30`,
                                  borderColor: feature.color
                                }}
                                animate={{
                                  boxShadow: [
                                    `0 0 20px ${feature.color}60`,
                                    `0 0 40px ${feature.color}90`,
                                    `0 0 20px ${feature.color}60`
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                              </motion.div>

                              {/* Expanding Ring */}
                              <motion.div
                                className="absolute inset-0 rounded-full border-2"
                                style={{ borderColor: feature.color }}
                                animate={{
                                  scale: [1, 2, 1],
                                  opacity: [0.8, 0, 0.8]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: featureIndex * 0.4
                                }}
                              />
                            </motion.div>

                            {/* Feature Details Popup */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 md:w-72 z-50"
                                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="bg-black/95 backdrop-blur-xl border-2 rounded-2xl p-5 shadow-2xl" style={{ borderColor: feature.color }}>
                                    <div className="flex items-start gap-3 mb-3">
                                      <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${feature.color}20` }}
                                      >
                                        <Icon className="w-5 h-5" style={{ color: feature.color }} />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="text-white mb-2">{feature.title}</h4>
                                        <p className="text-gray-300 text-xs leading-relaxed">{feature.detail}</p>
                                      </div>
                                    </div>
                                    
                                    {/* Real-time indicator */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                                      <motion.div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: feature.color }}
                                        animate={{
                                          scale: [1, 1.3, 1],
                                          opacity: [1, 0.5, 1]
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                      />
                                      <span className="text-xs text-gray-400">Active Now</span>
                                    </div>
                                  </div>
                                  
                                  {/* Connection line */}
                                  <div 
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b to-transparent"
                                    style={{ backgroundImage: `linear-gradient(to bottom, ${feature.color}, transparent)` }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* Scene-specific Elements */}
                    {/* Central User POV Indicator */}
                    <motion.div
                      className="absolute bottom-8 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="w-4 h-4 rounded-full bg-[#FF7A00] border-2 border-white"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(255, 122, 0, 0.8)',
                              '0 0 40px rgba(255, 122, 0, 1)',
                              '0 0 20px rgba(255, 122, 0, 0.8)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#FF7A00]"
                          animate={{
                            scale: [1, 2.5, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-black/80 backdrop-blur-sm border border-[#FF7A00]/50 rounded-lg px-3 py-1">
                          <span className="text-white text-xs">You</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* AR Frame Corner Markers */}
                    {[
                      { x: '4', y: '4', rotate: '0' },
                      { x: 'right-4', y: '4', rotate: '90' },
                      { x: '4', y: 'bottom-4', rotate: '-90' },
                      { x: 'right-4', y: 'bottom-4', rotate: '180' }
                    ].map((corner, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-6 h-6"
                        style={{
                          [corner.x.includes('right') ? 'right' : 'left']: corner.x.replace('right-', '').replace('4', '1rem'),
                          [corner.y.includes('bottom') ? 'bottom' : 'top']: corner.y.replace('bottom-', '').replace('4', '1rem'),
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        <div 
                          className="w-full h-full border-l-2 border-t-2 border-[#FF7A00]"
                          style={{ transform: `rotate(${corner.rotate}deg)` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Integration Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-[#FF7A00]/20 via-[#FF8C1A]/20 to-[#FFA500]/20 border border-[#FF7A00]/40 rounded-2xl p-8 md:p-12">
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-6">
                  {[
                    { icon: Glasses, label: "AR Glasses" },
                    { icon: Radio, label: "Smart Watch" },
                    { icon: Zap, label: "Haptic Feedback" },
                    { icon: Eye, label: "AI Processing" }
                  ].map((device, i) => {
                    const Icon = device.icon;
                    return (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center gap-2"
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7A00]/30 to-[#FF8C1A]/30 border border-[#FF7A00]/50 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-[#FF7A00]" />
                        </div>
                        <span className="text-white text-sm">{device.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <h4 className="text-white text-xl md:text-2xl mb-3">Seamless Integration, Everywhere You Go</h4>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Proxima's wearable ecosystem works silently in the background, enhancing every interaction without ever getting in the way. 
                  Your digital and physical worlds merge into one continuous experience.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Timeline - Key Features in AR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-center mb-12 text-white text-2xl md:text-3xl">
            A Day Through AR-Enhanced Reality
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                time: "Morning",
                title: "Instant Connections",
                description: "See compatibility scores of people you pass. Your AR glasses highlight potential friends and business contacts in real-time.",
                icon: Users,
                color: "#FF7A00"
              },
              {
                time: "Afternoon",
                title: "Smart Navigation",
                description: "Business flares guide you to relevant opportunities. See discounts, events, and networking zones overlaid on your world.",
                icon: Navigation,
                color: "#FF8C1A"
              },
              {
                time: "Evening",
                title: "Event Discovery",
                description: "AI suggests events based on your personality and nearby attendees. See who's going and your compatibility before you arrive.",
                icon: Calendar,
                color: "#FFA500"
              },
              {
                time: "Night",
                title: "Zone Activation",
                description: "Enter Proxima Zones and instantly join conversations. Virtual spaces blend seamlessly with physical locations.",
                icon: Radio,
                color: "#FFAA00"
              }
            ].map((moment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl p-6 h-full hover:border-[#FF7A00]/60 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${moment.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <moment.icon className="w-6 h-6" style={{ color: moment.color }} />
                    </motion.div>
                    <div>
                      <div className="text-xs text-[#FF7A00] mb-1">{moment.time}</div>
                      <h4 className="text-white text-lg">{moment.title}</h4>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {moment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Implementation Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FF7A00]/10 via-black to-transparent border border-[#FF7A00]/30 rounded-2xl p-8 md:p-12 mb-20"
        >
          <h3 className="text-center mb-8 text-white text-2xl md:text-3xl">
            Built for the AR Future
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Spatial Computing",
                description: "Real-time 3D positioning using advanced GPS, AR anchors, and environmental mapping",
                icon: Layers,
                stats: ["<10cm accuracy", "60fps tracking", "Low latency"]
              },
              {
                title: "AI-Powered Overlays",
                description: "Intelligent filtering shows only relevant people, places, and opportunities based on your context",
                icon: Sparkles,
                stats: ["Smart filtering", "Context-aware", "Privacy-first"]
              },
              {
                title: "Universal Compatibility",
                description: "Works with Meta Ray-Ban, Apple Vision Pro, and upcoming AR glasses from major manufacturers",
                icon: Glasses,
                stats: ["Cross-platform", "Lightweight", "Battery efficient"]
              }
            ].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] mb-4"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-white mb-3 text-xl">{tech.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {tech.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {tech.stats.map((stat, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded-full"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Real-World Scenario - Interactive Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-center mb-4 text-white text-2xl md:text-3xl">
            Sarah's Story: A Tuesday in 2030
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Follow Sarah as she navigates her day with Proxima AR
          </p>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                time: "8:30 AM",
                location: "Coffee Shop",
                story: "Sarah enters her favorite café wearing her AR glasses. Three orange glows appear—fellow startup founders with 90%+ compatibility scores. She starts a conversation with Alex about their shared interest in sustainable tech.",
                highlight: "3 high-quality connections made",
                icon: Coffee
              },
              {
                time: "1:00 PM",
                location: "Walking to Lunch",
                story: "A business flare catches her attention: 'TechHub Co-working - Free day pass for new members, 0.4 mi away.' The virtual beacon shows it's hosting a product design meetup at 2 PM with 15 attendees matching her profile.",
                highlight: "Discovered unexpected opportunity",
                icon: Store
              },
              {
                time: "5:00 PM",
                location: "Networking Event",
                story: "At the event, Sarah's AR glasses show compatibility scores and shared interests above each attendee. She navigates directly to people working on AI ethics—her passion project. No awkward small talk needed.",
                highlight: "8 meaningful conversations",
                icon: Users
              },
              {
                time: "8:00 PM",
                location: "Virtual Zone",
                story: "Sarah enters a Proxima Zone near her apartment—a virtual gathering space for tech founders. Even though people are scattered across the neighborhood, they all appear in her AR view, chatting in real-time.",
                highlight: "Virtual + physical worlds merged",
                icon: Radio
              }
            ].map((scene, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="relative">
                  {/* Timeline connector */}
                  {index < 3 && (
                    <div className="hidden md:block absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-[#FF7A00] to-transparent" />
                  )}
                  
                  <div className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl p-6 md:p-8 hover:border-[#FF7A00]/60 transition-all">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(255, 122, 0, 0.3)',
                            '0 0 30px rgba(255, 122, 0, 0.5)',
                            '0 0 20px rgba(255, 122, 0, 0.3)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <scene.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#FF7A00] text-sm">{scene.time}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400 text-sm">{scene.location}</span>
                        </div>
                        <p className="text-gray-300 mb-3 leading-relaxed">
                          {scene.story}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF7A00]/20 border border-[#FF7A00]/30 rounded-lg">
                          <Zap className="w-4 h-4 text-[#FF7A00]" />
                          <span className="text-[#FF7A00] text-sm">{scene.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Vision Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-[#FF7A00]/20 via-black to-[#FF7A00]/20 border-2 border-[#FF7A00]/50 rounded-2xl p-8 md:p-12"
        >
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-[#FF7A00]" />
          </motion.div>
          
          <h3 className="text-white text-2xl md:text-3xl lg:text-4xl mb-6">
            The Physical World, Enhanced
          </h3>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            This isn't science fiction—it's the natural evolution of Proxima. Every feature we're building today 
            is designed to seamlessly transition into AR. The social graph, personality matching, proximity intelligence, 
            and event systems are already AR-ready. When mass-market AR glasses arrive, Proxima will be there, 
            transforming how humans connect in the physical world.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <motion.div
              className="flex items-center gap-2 text-[#FF7A00]"
              whileHover={{ scale: 1.1 }}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm md:text-base">AR-Ready Architecture</span>
            </motion.div>
            <span className="text-gray-600">•</span>
            <motion.div
              className="flex items-center gap-2 text-[#FF7A00]"
              whileHover={{ scale: 1.1 }}
            >
              <Layers className="w-5 h-5" />
              <span className="text-sm md:text-base">Spatial Computing Core</span>
            </motion.div>
            <span className="text-gray-600">•</span>
            <motion.div
              className="flex items-center gap-2 text-[#FF7A00]"
              whileHover={{ scale: 1.1 }}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm md:text-base">Future-Proof Platform</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
