import { motion, AnimatePresence } from 'motion/react';
import { User, Camera, Video, Heart, MessageCircle, Send, BarChart3, Target, Briefcase, Code, Palette, TrendingUp, Award, CheckCircle, Zap, Users, Star, ThumbsUp, Eye, Link2, Sparkles, ArrowRight, ChevronRight, Globe, BookOpen, Coffee, Music } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function ProfileSection() {
  const [activeProfile, setActiveProfile] = useState(0);
  const [compatibilityScore, setCompatibilityScore] = useState(0);
  const [showCompatibility, setShowCompatibility] = useState(false);

  // Profile examples
  const profiles = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: 'A',
      role: 'UX Designer @ TechCorp',
      bio: 'Passionate about design thinking and building products that matter',
      color: 'from-blue-500 to-cyan-500',
      compatibility: 87,
      photos: 12,
      videos: 3,
      connections: 143,
      alignments: {
        professional: [
          { category: 'Industry', match: 92, items: ['Tech', 'SaaS', 'Product Design'] },
          { category: 'Skills', match: 88, items: ['Figma', 'User Research', 'Prototyping'] },
          { category: 'Career Goals', match: 85, items: ['Lead Designer', 'Startup Founder', 'Mentorship'] }
        ],
        personal: [
          { category: 'Interests', match: 83, items: ['Design Thinking', 'Coffee Culture', 'Indie Music'] },
          { category: 'Values', match: 90, items: ['Innovation', 'Collaboration', 'Authenticity'] },
          { category: 'Work Style', match: 86, items: ['Remote-first', 'Async Communication', 'Deep Work'] }
        ]
      }
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      avatar: 'S',
      role: 'Software Engineer @ StartupXYZ',
      bio: 'Building climate tech solutions • Former Google engineer',
      color: 'from-green-500 to-emerald-500',
      compatibility: 94,
      photos: 18,
      videos: 5,
      connections: 267,
      alignments: {
        professional: [
          { category: 'Industry', match: 96, items: ['Climate Tech', 'Clean Energy', 'Sustainability'] },
          { category: 'Skills', match: 92, items: ['Python', 'React', 'System Design'] },
          { category: 'Career Goals', match: 94, items: ['Climate Impact', 'Tech Leadership', 'Open Source'] }
        ],
        personal: [
          { category: 'Interests', match: 88, items: ['Environmental Activism', 'Hiking', 'Philosophy'] },
          { category: 'Values', match: 95, items: ['Purpose-driven', 'Sustainability', 'Social Impact'] },
          { category: 'Work Style', match: 91, items: ['Mission-focused', 'Collaborative', 'Transparent'] }
        ]
      }
    }
  ];

  const currentProfile = profiles[activeProfile];
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

  // Animate compatibility score on profile switch - only when visible
  useEffect(() => {
    if (!isInView) return;
    
    setCompatibilityScore(0);
    setShowCompatibility(false);
    const timer = setTimeout(() => {
      setShowCompatibility(true);
      let count = 0;
      const target = currentProfile.compatibility;
      const increment = target / 50;
      const scoreInterval = setInterval(() => {
        count += increment;
        if (count >= target) {
          setCompatibilityScore(target);
          clearInterval(scoreInterval);
        } else {
          setCompatibilityScore(Math.floor(count));
        }
      }, 20);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeProfile, currentProfile.compatibility, isInView]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 122, 0, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)
            `
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

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
            <User className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A00]" />
            <span className="text-xs md:text-sm text-white">Rich Profile System</span>
          </motion.div>

          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Profiles That Tell Your Story</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
            Express yourself with photos, videos, and rich media. Most uniquely, see instant compatibility reports showing professional alignments and shared values when visiting others' profiles. Granular privacy controls let you limit profile visibility by audience, with emotional/psychological insights private by default and mental health tags restricted to trusted spaces only.
          </p>
        </motion.div>

        {/* Main Visualization: Profile + Compatibility Report */}
        <div className="mb-16 md:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* LEFT: Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-white mb-3 text-2xl md:text-3xl">Rich, Visual Profiles</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Share your professional journey and personal interests through photos, videos, and a compelling bio that showcases who you really are.
                </p>
              </div>

              {/* Profile Card Mockup */}
              <div className="bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00]/30 rounded-2xl overflow-hidden">
                {/* Profile Header */}
                <div className="relative h-32 bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A]">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundImage: [
                        'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
                        'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ backgroundSize: '20px 20px' }}
                  />
                </div>

                <div className="relative px-4 md:px-6 pb-6">
                  {/* Avatar */}
                  <motion.div
                    className="relative -mt-16 mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProfile}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${currentProfile.color} border-4 border-black flex items-center justify-center text-white text-3xl md:text-4xl shadow-xl`}
                      >
                        {currentProfile.avatar}
                      </motion.div>
                    </AnimatePresence>

                    {/* Online indicator */}
                    <motion.div
                      className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-black"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Profile Info */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProfile}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h4 className="text-white mb-1">{currentProfile.name}</h4>
                      <p className="text-gray-400 text-sm mb-3">{currentProfile.role}</p>
                      <p className="text-gray-300 text-sm mb-4">{currentProfile.bio}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <motion.div
                            className="text-xl md:text-2xl text-[#FF7A00] mb-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            {currentProfile.photos}
                          </motion.div>
                          <div className="text-xs text-gray-500">Photos</div>
                        </div>
                        <div className="text-center">
                          <motion.div className="text-xl md:text-2xl text-purple-400 mb-1">
                            {currentProfile.videos}
                          </motion.div>
                          <div className="text-xs text-gray-500">Videos</div>
                        </div>
                        <div className="text-center">
                          <motion.div className="text-xl md:text-2xl text-cyan-400 mb-1">
                            {currentProfile.connections}
                          </motion.div>
                          <div className="text-xs text-gray-500">Connections</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          className="bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send className="w-4 h-4" />
                          Message
                        </motion.button>
                        <motion.button
                          className="bg-white/10 border border-white/20 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart className="w-4 h-4" />
                          Like
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-3 gap-1 p-4 pt-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden relative group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                    >
                      {/* Placeholder content */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                        {i % 3 === 0 ? <Video className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-xs">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {Math.floor(Math.random() * 50 + 10)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {Math.floor(Math.random() * 20 + 5)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Profile switcher */}
              <div className="flex justify-center gap-3">
                {profiles.map((profile, i) => (
                  <motion.button
                    key={profile.id}
                    onClick={() => setActiveProfile(i)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      i === activeProfile
                        ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View {profile.name.split(' ')[0]}'s Profile
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Compatibility Report (3D Visualization) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-white mb-3 text-2xl md:text-3xl">Instant Compatibility Analysis</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  When you visit someone's profile, our AI instantly generates a comprehensive compatibility report showing professional alignments and shared values—perfect for networking.
                </p>
              </div>

              {/* 3D Compatibility Score Sphere */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00]/30 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border-2"
                      style={{
                        width: `${120 + i * 40}px`,
                        height: `${120 + i * 40}px`,
                        borderColor: i === 0 ? '#FF7A00' : i === 1 ? '#A855F7' : '#06B6D4'
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        rotate: { duration: 10 + i * 5, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
                        opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }
                      }}
                    />
                  ))}

                  {/* Center compatibility score */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProfile}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                    >
                      <motion.div
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center relative"
                        style={{
                          background: `
                            radial-gradient(circle at 30% 30%, rgba(255, 122, 0, 0.8), transparent 70%),
                            radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.6), transparent 70%),
                            radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.4), transparent 80%)
                          `,
                          boxShadow: `
                            0 0 60px rgba(255, 122, 0, 0.4),
                            0 0 100px rgba(168, 85, 247, 0.3),
                            inset 0 0 40px rgba(6, 182, 212, 0.2)
                          `
                        }}
                        animate={{
                          rotate: [0, 360],
                          boxShadow: [
                            '0 0 60px rgba(255, 122, 0, 0.4), 0 0 100px rgba(168, 85, 247, 0.3)',
                            '0 0 80px rgba(255, 122, 0, 0.6), 0 0 120px rgba(168, 85, 247, 0.5)',
                            '0 0 60px rgba(255, 122, 0, 0.4), 0 0 100px rgba(168, 85, 247, 0.3)'
                          ]
                        }}
                        transition={{
                          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                          boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      >
                        <div className="text-center">
                          <motion.div
                            className="text-5xl md:text-6xl text-white mb-2"
                            key={compatibilityScore}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {compatibilityScore}%
                          </motion.div>
                          <div className="text-xs md:text-sm text-white/80">Match</div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating data points */}
                  {showCompatibility && [...Array(12)].map((_, i) => {
                    const angle = (i * 360) / 12;
                    const radius = 140;
                    const icons = [Target, Briefcase, Code, Palette, TrendingUp, Award, Users, Star, Globe, BookOpen, Coffee, Music];
                    const Icon = icons[i];
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          x: Math.cos((angle * Math.PI) / 180) * radius,
                          y: Math.sin((angle * Math.PI) / 180) * radius
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          y: [
                            Math.sin((angle * Math.PI) / 180) * radius,
                            Math.sin((angle * Math.PI) / 180) * radius + 10,
                            Math.sin((angle * Math.PI) / 180) * radius
                          ]
                        }}
                        transition={{
                          scale: { duration: 0.4, delay: i * 0.05 },
                          opacity: { duration: 0.4, delay: i * 0.05 },
                          y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00]/20 to-purple-500/20 border border-[#FF7A00]/50 flex items-center justify-center text-[#FF7A00] backdrop-blur-sm">
                          <Icon className="w-4 h-4" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Match level indicator */}
                <motion.div
                  className="absolute top-4 right-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full px-3 py-1 flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-400">Excellent Match</span>
                </motion.div>
              </div>

              {/* Detailed Alignment Breakdown */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProfile}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00]/30 rounded-xl p-4 md:p-6"
                >
                  <h4 className="text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#FF7A00]" />
                    Compatibility Breakdown
                  </h4>

                  {/* Professional Alignments */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                      Professional Alignments
                    </div>
                    <div className="space-y-3">
                      {currentProfile.alignments.professional.map((alignment, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">{alignment.category}</span>
                            <span className="text-[#FF7A00] text-sm">{alignment.match}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${alignment.match}%` }}
                              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {alignment.items.map((item, j) => (
                              <span key={j} className="text-xs bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-0.5 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Alignments */}
                  <div>
                    <div className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      Personal Alignments
                    </div>
                    <div className="space-y-3">
                      {currentProfile.alignments.personal.map((alignment, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                          className="bg-black/50 border border-purple-500/20 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">{alignment.category}</span>
                            <span className="text-purple-400 text-sm">{alignment.match}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${alignment.match}%` }}
                              transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                            />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {alignment.items.map((item, j) => (
                              <span key={j} className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h3 className="text-center mb-8 md:mb-12 text-white text-2xl md:text-3xl">Why Proxima Profiles Stand Out</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: BarChart3,
                title: 'Instant Compatibility',
                description: 'AI-generated reports showing professional and personal alignment',
                color: 'from-orange-500 to-red-500',
                gradient: 'from-orange-500/20 to-red-500/20'
              },
              {
                icon: Camera,
                title: 'Rich Media',
                description: 'Express yourself through photos, videos, and interactive content',
                color: 'from-blue-500 to-cyan-500',
                gradient: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                icon: Target,
                title: 'Professional Focus',
                description: 'Optimized for networking with career goals and skill matching',
                color: 'from-purple-500 to-pink-500',
                gradient: 'from-purple-500/20 to-pink-500/20'
              },
              {
                icon: Sparkles,
                title: 'Interactive',
                description: 'Like, comment, and engage with profiles in meaningful ways',
                color: 'from-green-500 to-emerald-500',
                gradient: 'from-green-500/20 to-emerald-500/20'
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-gradient-to-br ${benefit.gradient} border-2 border-[#FF7A00]/30 rounded-xl p-6 hover:border-[#FF7A00] transition-all group`}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="w-6 h-6 text-white" />
                </motion.div>

                <h4 className="text-white mb-2 text-sm md:text-base">{benefit.title}</h4>
                <p className="text-gray-400 text-xs md:text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real Example: Compatibility in Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center mb-8 md:mb-12 text-white text-2xl md:text-3xl">See It In Action: Professional Networking Made Easy</h3>
          
          <div className="bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00] rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Scenario */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white">Marcus visits Sarah's profile</h4>
                    <p className="text-gray-400 text-sm">Both attending a climate tech conference</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white">Instant Insight:</span>
                      <span className="text-gray-400"> 94% compatibility with 96% professional alignment in Climate Tech</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white">Shared Goals:</span>
                      <span className="text-gray-400"> Both want to lead impactful climate solutions and contribute to open source</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white">Values Match:</span>
                      <span className="text-gray-400"> 95% alignment on purpose-driven work and social impact</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#FF7A00]">Result:</span>
                      <span className="text-gray-300"> Marcus messages Sarah about potential collaboration. They're now co-founding a climate tech startup together.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual indicator */}
              <motion.div
                className="flex flex-col items-center justify-center bg-gradient-to-br from-[#FF7A00]/10 to-purple-500/10 border border-[#FF7A00]/30 rounded-xl p-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-6xl text-[#FF7A00] mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  94%
                </motion.div>
                <div className="text-white text-sm mb-1">Match Score</div>
                <div className="flex items-center gap-1 text-green-400 text-xs">
                  <Star className="w-3 h-3 fill-green-400" />
                  <span>Excellent</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-6 pt-6 border-t border-[#FF7A00]/20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-300 text-sm italic">
                "The compatibility report showed me immediately that Sarah and I were aligned on what matters most. We skipped the small talk and dove straight into meaningful collaboration discussions."
              </p>
              <p className="text-gray-500 text-xs mt-2">— Satisfied Proxima User</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}