import { motion, AnimatePresence } from 'motion/react';
import { Brain, MessageCircle, Sparkles, Star, Heart, Target, TrendingUp, Zap, Users, Globe, Book, Coffee, Music, Code, Briefcase, Palette, Dumbbell, Award, ArrowRight, ChevronRight, RefreshCw, CheckCircle, X, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function SidekickSection() {
  const [activeConversation, setActiveConversation] = useState(0);
  const [learningNodes, setLearningNodes] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // Conversation examples showing AI learning
  const conversations = [
    {
      id: 1,
      user: 'Emma',
      avatar: 'E',
      color: 'from-purple-500 to-pink-500',
      messages: [
        { type: 'user', text: "I love indie music festivals, especially small intimate venues" },
        { type: 'sidekick', text: "Got it! I'll prioritize matching you with people who attend underground music scenes and value authentic experiences over mainstream events. Any specific genres?" },
        { type: 'user', text: "Indie folk and alternative rock. Also I prefer daytime events" },
        { type: 'sidekick', text: "Perfect! ✨ Updated your profile: Indie folk/alt-rock enthusiast + daytime event preference. I'll find people who share this vibe!" }
      ],
      learned: ['Indie music taste', 'Small venue preference', 'Daytime events', 'Authentic experiences']
    },
    {
      id: 2,
      user: 'Marcus',
      avatar: 'M',
      color: 'from-blue-500 to-cyan-500',
      messages: [
        { type: 'user', text: "I'm looking for people interested in climate tech startups and sustainability" },
        { type: 'sidekick', text: "Excellent focus area! Are you more interested in connecting with fellow founders, potential collaborators, or investors in this space?" },
        { type: 'user', text: "Founders and engineers building solutions. Not interested in just casual networking" },
        { type: 'sidekick', text: "Understood! 🎯 I'll match you with action-oriented builders in climate tech, filtering out surface-level networkers. Your purpose is clear!" }
      ],
      learned: ['Climate tech focus', 'Founder mindset', 'Deep collaboration', 'Purpose-driven connections']
    },
    {
      id: 3,
      user: 'Sophia',
      avatar: 'S',
      color: 'from-green-500 to-emerald-500',
      messages: [
        { type: 'user', text: "I'm interested in philosophy, particularly existentialism and ethics" },
        { type: 'sidekick', text: "Fascinating! Do you prefer discussing theoretical concepts or applying philosophical thinking to real-world situations?" },
        { type: 'user', text: "Both! I love deep conversations but also how philosophy shapes daily decisions" },
        { type: 'sidekick', text: "Love it! 💭 I'll find people who value intellectual depth AND practical wisdom. This nuance makes your preferences unique!" }
      ],
      learned: ['Philosophical mindset', 'Theory + Practice', 'Deep conversations', 'Ethical thinking']
    }
  ];

  const currentConvo = conversations[activeConversation];
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

  // Auto-cycle through conversations - only when visible
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveConversation((prev) => (prev + 1) % conversations.length);
      setLearningNodes((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Interest categories with icons
  const interestCategories = [
    { icon: Music, label: 'Music', color: 'text-pink-400' },
    { icon: Code, label: 'Tech', color: 'text-blue-400' },
    { icon: Book, label: 'Philosophy', color: 'text-purple-400' },
    { icon: Briefcase, label: 'Startups', color: 'text-orange-400' },
    { icon: Palette, label: 'Art', color: 'text-yellow-400' },
    { icon: Dumbbell, label: 'Fitness', color: 'text-green-400' },
    { icon: Globe, label: 'Travel', color: 'text-cyan-400' },
    { icon: Coffee, label: 'Coffee', color: 'text-amber-400' }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FF7A00 1px, transparent 1px),
              linear-gradient(to bottom, #FF7A00 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A00]/20 to-purple-500/20 border border-[#FF7A00]/50 rounded-full px-4 md:px-6 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A00]" />
            <span className="text-xs md:text-sm text-white">AI-Powered Personalization</span>
          </motion.div>

          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Your AI Sidekick: Beyond Surface-Level Matching</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
            A conversational AI companion that learns your unique connection preferences beyond personality tests. Share your nuanced interests, aspirations, and values—your Sidekick remembers and finds matches that truly matter. Context-aware AI differs by situation: empathic and supportive for personal connections, safety-focused for professional networking, automatically prompting users with crisis resources and safety reminders after mutual connections are established.
          </p>

          {/* Mental Health & AI Development Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4 md:p-5"
          >
            <p className="text-cyan-300 text-xs md:text-sm leading-relaxed">
              <span className="text-cyan-400">Note on Mental Health & AI Development:</span> As we scale, Proxima will hire in-house psychologists to work in collaboration with partnered and consulting mental health organizations to fine-tune the AI Sidekick and other areas of the app, including training support staff and moderators. We are currently evaluating <span className="text-cyan-400">Serena.chat AI</span> as a suitable model for powering the Sidekick. Our focus is specifically on <span className="text-cyan-400">social anxieties</span> and connection-related, loneliness support—we do not address other areas of mental health beyond this scope as it requires specialist care and carries many risks for the users.
            </p>
          </motion.div>
        </motion.div>

        {/* Main 3D Holographic Sphere Visualization */}
        <div className="mb-16 md:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* LEFT: 3D Sphere with Neural Network */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[600px]"
            >
              {/* Glass container */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/80 to-black/80 backdrop-blur-xl border-2 border-[#FF7A00]/30 rounded-2xl overflow-hidden">
                
                {/* Central 3D Sphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64">
                  {/* Outer glow rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2"
                      style={{
                        borderColor: i === 0 ? '#FF7A00' : i === 1 ? '#A855F7' : '#06B6D4'
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}

                  {/* Main sphere with gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.8), transparent 50%),
                        radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6), transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(255, 122, 0, 0.9), transparent 70%)
                      `,
                      boxShadow: `
                        0 0 60px rgba(255, 122, 0, 0.5),
                        0 0 120px rgba(168, 85, 247, 0.3),
                        inset 0 0 60px rgba(6, 182, 212, 0.2)
                      `
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    {/* Brain icon in center */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <Brain className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Neural network nodes orbiting */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8;
                    const radius = 140;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const Icon = interestCategories[i].icon;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          x: x,
                          y: y
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          rotate: {
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.2
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.3
                          }
                        }}
                      >
                        <motion.div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-black to-gray-900 border-2 border-[#FF7A00]/50 flex items-center justify-center ${interestCategories[i].color} cursor-pointer backdrop-blur-sm`}
                          whileHover={{ scale: 1.3, borderColor: '#FF7A00' }}
                        >
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.div>

                        {/* Connection line to center */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-px h-32 md:h-36 bg-gradient-to-b from-[#FF7A00]/50 to-transparent origin-bottom"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${-angle}deg)`
                          }}
                          animate={{
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      </motion.div>
                    );
                  })}

                  {/* Particle effects */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                      style={{
                        top: '50%',
                        left: '50%'
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 400],
                        y: [0, (Math.random() - 0.5) * 400],
                        opacity: [1, 0],
                        scale: [1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-[#FF7A00]/30 rounded-lg p-3 md:p-4">
                  <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                    <div>
                      <motion.div
                        className="text-lg md:text-2xl text-[#FF7A00] mb-1"
                        key={learningNodes}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {247 + learningNodes}
                      </motion.div>
                      <div className="text-xs text-gray-400">Data Points</div>
                    </div>
                    <div>
                      <motion.div
                        className="text-lg md:text-2xl text-purple-400 mb-1"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        94%
                      </motion.div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div>
                      <motion.div className="text-lg md:text-2xl text-cyan-400 mb-1">
                        Real-time
                      </motion.div>
                      <div className="text-xs text-gray-400">Learning</div>
                    </div>
                  </div>
                </div>

                {/* Learning indicator */}
                <motion.div
                  className="absolute top-4 right-4 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1 flex items-center gap-2"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  />
                  <span className="text-xs text-green-400 hidden sm:inline">Learning Active</span>
                </motion.div>
              </div>

              {/* Category labels */}
              <div className="absolute -bottom-12 left-0 right-0 hidden md:flex flex-wrap justify-center gap-2">
                {interestCategories.slice(0, 4).map((cat, i) => (
                  <motion.div
                    key={i}
                    className={`text-xs ${cat.color} bg-black/50 border border-[#FF7A00]/20 rounded-full px-3 py-1 backdrop-blur-sm`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    {cat.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Conversational Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-white mb-3">Teach Your Sidekick What Matters</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Unlike static personality tests, your AI Sidekick engages in natural conversations to understand your unique preferences, then continuously refines its understanding based on your feedback.
                </p>
              </div>

              {/* Conversation window */}
              <div className="bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00]/30 rounded-xl overflow-hidden">
                {/* User selector */}
                <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${currentConvo.color} flex items-center justify-center text-white border-2 border-white`}
                        key={activeConversation}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {currentConvo.avatar}
                      </motion.div>
                      <div>
                        <div className="text-white text-sm md:text-base">{currentConvo.user}'s Conversation</div>
                        <div className="text-white/70 text-xs flex items-center gap-1">
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span className="hidden sm:inline">Learning in progress...</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* User switcher */}
                    <div className="flex gap-1 md:gap-2">
                      {conversations.map((convo, i) => (
                        <motion.button
                          key={convo.id}
                          onClick={() => setActiveConversation(i)}
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${
                            i === activeConversation ? 'border-white' : 'border-white/30'
                          } bg-gradient-to-br ${convo.color}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="text-white text-xs">{convo.avatar}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 md:p-6 space-y-3 md:space-y-4 max-h-[400px] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {currentConvo.messages.map((message, i) => (
                      <motion.div
                        key={`${activeConversation}-${i}`}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.2 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-start gap-2 max-w-[85%]">
                          {message.type === 'sidekick' && (
                            <motion.div
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center flex-shrink-0"
                              animate={{
                                boxShadow: [
                                  '0 0 20px rgba(255, 122, 0, 0.3)',
                                  '0 0 30px rgba(255, 122, 0, 0.6)',
                                  '0 0 20px rgba(255, 122, 0, 0.3)'
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Brain className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                                : 'bg-gradient-to-r from-[#FF7A00]/20 to-purple-500/20 text-gray-100 border border-[#FF7A00]/30'
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* What was learned */}
                <div className="bg-black/50 border-t border-[#FF7A00]/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-400">Preferences Learned:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="wait">
                      {currentConvo.learned.map((item, i) => (
                        <motion.div
                          key={`${activeConversation}-learned-${i}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="bg-[#FF7A00]/20 border border-[#FF7A00]/50 rounded-full px-3 py-1 text-xs text-[#FF7A00] flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          {item}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Key features */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: RefreshCw, label: 'Continuously Learning', color: 'text-cyan-400' },
                  { icon: Target, label: 'Nuanced Understanding', color: 'text-purple-400' },
                  { icon: Shield, label: 'Privacy Protected', color: 'text-green-400' },
                  { icon: TrendingUp, label: 'Gets Smarter Over Time', color: 'text-orange-400' }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-3 flex items-center gap-3"
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span className="text-sm text-gray-300">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* How It Works: Feedback Loop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h3 className="text-center mb-8 md:mb-12 text-white">The Self-Improvement Loop</h3>
          
          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                step: '1',
                title: 'You Share',
                description: 'Tell your Sidekick about interests, values, deal-breakers',
                icon: MessageCircle,
                color: 'from-blue-500 to-cyan-500',
                gradient: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                step: '2',
                title: 'AI Learns',
                description: 'Natural language processing extracts nuanced preferences',
                icon: Brain,
                color: 'from-purple-500 to-pink-500',
                gradient: 'from-purple-500/20 to-pink-500/20'
              },
              {
                step: '3',
                title: 'You Connect',
                description: 'Get highly personalized matches based on what matters',
                icon: Users,
                color: 'from-green-500 to-emerald-500',
                gradient: 'from-green-500/20 to-emerald-500/20'
              },
              {
                step: '4',
                title: 'Feedback Refines',
                description: 'Your interactions teach the AI to improve future matches',
                icon: TrendingUp,
                color: 'from-orange-500 to-red-500',
                gradient: 'from-orange-500/20 to-red-500/20'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${item.gradient} border-2 border-[#FF7A00]/30 rounded-xl p-6 h-full hover:border-[#FF7A00] transition-all group`}>
                  {/* Step number */}
                  <motion.div
                    className={`absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br ${item.color} border-2 border-black flex items-center justify-center text-white text-sm`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.step}
                  </motion.div>

                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 mt-2`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h4 className="text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>

                {/* Arrow connector */}
                {i < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-3 z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-6 h-6 text-[#FF7A00]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real Example: Before vs After */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center mb-8 md:mb-12 text-white">The Difference: Generic vs. Personalized</h3>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Before: Generic matching */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-xl p-6 md:p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500 rounded-full px-3 py-1 text-xs text-red-400 flex items-center gap-1">
                <X className="w-3 h-3" />
                Generic
              </div>

              <h4 className="text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                Traditional Apps
              </h4>

              <div className="space-y-4 mb-6">
                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-sm">
                      J
                    </div>
                    <div>
                      <div className="text-white text-sm">John, 28</div>
                      <div className="text-gray-500 text-xs">2.3km away</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• Likes: Music, Travel, Coffee</div>
                    <div>• Personality: ENFP</div>
                    <div className="text-gray-600">Generic categories, no depth</div>
                  </div>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-sm">
                      L
                    </div>
                    <div>
                      <div className="text-white text-sm">Lisa, 26</div>
                      <div className="text-gray-500 text-xs">1.8km away</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• Likes: Food, Movies, Fitness</div>
                    <div>• Personality: INTJ</div>
                    <div className="text-gray-600">Surface-level data only</div>
                  </div>
                </div>
              </div>

              <div className="text-gray-500 text-sm italic">
                "Everyone likes music and travel. These matches tell me nothing about compatibility."
              </div>
            </motion.div>

            {/* After: Sidekick personalized */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#FF7A00]/10 to-purple-500/10 border-2 border-[#FF7A00] rounded-xl p-6 md:p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-green-500/20 border border-green-500 rounded-full px-3 py-1 text-xs text-green-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Personalized
              </div>

              <h4 className="text-white mb-4 flex items-center gap-2">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 122, 0, 0.3)',
                      '0 0 30px rgba(255, 122, 0, 0.6)',
                      '0 0 20px rgba(255, 122, 0, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="w-4 h-4 text-white" />
                </motion.div>
                With AI Sidekick
              </h4>

              <div className="space-y-4 mb-6">
                <motion.div
                  className="bg-black/50 border border-[#FF7A00]/50 rounded-lg p-4"
                  whileHover={{ borderColor: '#FF7A00', scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                        A
                      </div>
                      <div>
                        <div className="text-white text-sm">Alex, 27</div>
                        <div className="text-[#FF7A00] text-xs">1.5km away • 96% match</div>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="text-gray-300 text-xs space-y-1.5">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                      <span>Shares your passion for <span className="text-[#FF7A00]">indie folk music at intimate venues</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Values <span className="text-purple-400">authentic experiences</span> over mainstream events</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Also prefers <span className="text-cyan-400">daytime activities</span> and meaningful conversations</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-black/50 border border-[#FF7A00]/50 rounded-lg p-4"
                  whileHover={{ borderColor: '#FF7A00', scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm">
                        S
                      </div>
                      <div>
                        <div className="text-white text-sm">Sam, 29</div>
                        <div className="text-[#FF7A00] text-xs">2.1km away • 94% match</div>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="text-gray-300 text-xs space-y-1.5">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                      <span>Building <span className="text-[#FF7A00]">climate tech solutions</span> just like you mentioned</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Looking for <span className="text-green-400">deep collaboration</span>, not surface networking</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Shares your <span className="text-blue-400">founder mindset</span> and values</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="text-gray-300 text-sm italic bg-gradient-to-r from-[#FF7A00]/10 to-transparent border-l-2 border-[#FF7A00] pl-4 py-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                "These matches understand what I actually care about. The AI learned exactly what makes connections meaningful for me."
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-[#FF7A00]/20 to-purple-500/20 border-2 border-[#FF7A00] rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#FF7A00] mx-auto mb-4" />
            <h4 className="text-white mb-3">Your Connection Preferences, Your Way</h4>
            <p className="text-gray-400 text-sm md:text-base mb-6">
              No more filling out endless forms or being limited by predetermined categories. Just talk to your Sidekick like you would a friend, and watch it learn what truly matters to you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}