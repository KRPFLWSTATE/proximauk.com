import { motion } from 'motion/react';
import { MapPin, Signal, Lock, Shield, Send, Star } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

interface CommunityChatProps {
  activeZone: number;
  proximityRings: any[];
}

export function CommunityChat({ activeZone, proximityRings }: CommunityChatProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [reactions, setReactions] = useState<Record<number, Record<string, number>>>({});
  const [chatResetTime, setChatResetTime] = useState<number>(() => {
    // Initialize chat reset timer
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('proxima_chat_reset_time');
      if (stored) {
        const resetTime = parseInt(stored, 10);
        const now = Date.now();
        // Check if 24 hours have passed
        if (now - resetTime >= 24 * 60 * 60 * 1000) {
          const newResetTime = now;
          localStorage.setItem('proxima_chat_reset_time', newResetTime.toString());
          return newResetTime;
        }
        return resetTime;
      } else {
        const newResetTime = Date.now();
        localStorage.setItem('proxima_chat_reset_time', newResetTime.toString());
        return newResetTime;
      }
    }
    return Date.now();
  });

  // Calculate time until reset - Memoized for performance
  const timeUntilReset = useMemo(() => {
    const elapsed = Date.now() - chatResetTime;
    const remaining = 24 * 60 * 60 * 1000 - elapsed;
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    return { hours, minutes, remaining };
  }, [chatResetTime]);

  // Check for 24-hour reset
  useEffect(() => {
    const checkReset = setInterval(() => {
      const now = Date.now();
      const elapsed = now - chatResetTime;
      
      if (elapsed >= 24 * 60 * 60 * 1000) {
        // Reset chat
        setVisibleMessages(0);
        setReactions({});
        setHasStarted(false);
        const newResetTime = now;
        setChatResetTime(newResetTime);
        localStorage.setItem('proxima_chat_reset_time', newResetTime.toString());
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkReset);
  }, [chatResetTime]);

  // Viewport detection - Start animation only when in view
  useEffect(() => {
    // Performance: Use IntersectionObserver for efficient viewport detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setIsInView(true);
            setHasStarted(true); // Prevent re-triggering
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible (faster trigger)
        rootMargin: '100px', // Start 100px before section enters viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasStarted]);

  // Comprehensive community messages with depth
  const communityMessages = [
    // AI Sidekick
    {
      id: 0,
      type: 'ai',
      content: '☕ Perfect Saturday vibe! 3 local cafes nearby have fresh pastries. The Shoreditch community is buzzing today!',
      time: 'Just now',
    },
    // Small Local Business - Coffee Shop
    {
      id: 1,
      type: 'business',
      user: 'Brick Lane Coffee Co.',
      businessType: 'Local Cafe',
      avatar: '☕',
      message: '🎉 Weekend Special! Buy 2 flat whites, get a croissant free. Valid today until 5pm. Come say hi to the Proxima community!',
      location: '150m away',
      zone: 'Town',
      time: '5min ago',
      personality: null,
      verified: true,
      reactions: { '❤️': 12, '🔥': 8, '☕': 15 }
    },
    // Community Response to Business
    {
      id: 2,
      user: 'Maya',
      avatar: '👩‍💻',
      message: '@Brick Lane Coffee Co. On my way! Bringing my laptop, anyone else working there today?',
      zone: 'Town',
      time: '4min ago',
      personality: 'ENFP',
      reactions: { '👍': 5, '💻': 3 }
    },
    // Thread continuation
    {
      id: 3,
      user: 'James',
      avatar: '👨‍🎨',
      message: "@Maya I'll be there in 10! Need to finish this design. Their wifi is solid 💪",
      zone: 'Town',
      time: '3min ago',
      personality: 'INFP',
      reactions: { '👍': 4 }
    },
    // Small Family Business - Bakery
    {
      id: 4,
      type: 'business',
      user: "Rosa's Sourdough Kitchen",
      businessType: 'Family Bakery',
      avatar: '🥖',
      message: 'Good morning neighbors! Fresh loaves just out of the oven. My grandmother\'s recipe 🧡 Stop by for a warm slice - first 10 people get free butter!',
      location: '280m away',
      zone: 'Town',
      time: '8min ago',
      personality: null,
      verified: true,
      reactions: { '🥖': 18, '❤️': 14, '😋': 9 }
    },
    // Community Response with Character
    {
      id: 5,
      user: 'Sophie',
      avatar: '🏃‍♀️',
      message: "@Rosa's Sourdough Kitchen Your focaccia yesterday was LIFE-CHANGING. Bringing my running group by after our Victoria Park 5k at 4pm! 🏃‍♀️",
      zone: 'Town',
      time: '7min ago',
      personality: 'ESTP',
      reactions: { '🏃': 6, '💪': 4, '🥖': 3 }
    },
    {
      id: 6,
      user: 'Alex',
      avatar: '🧗',
      message: '@Sophie Count me in for the run! Been eyeing that bakery for weeks. Perfect excuse 😄',
      zone: 'Town',
      time: '6min ago',
      personality: 'ISTP',
      reactions: { '👍': 3, '🏃': 2 }
    },
    // Local recommendation thread with depth
    {
      id: 7,
      user: 'Priya',
      avatar: '🎭',
      message: 'New to Shoreditch from Mumbai! Any recommendations for authentic Indian food? Missing home 🏠 Also looking for a good yoga studio!',
      zone: 'Town',
      time: '12min ago',
      personality: 'INFJ',
      reactions: { '❤️': 7, '🍛': 5, '🧘': 4 }
    },
    {
      id: 8,
      user: 'Marcus',
      avatar: '🍜',
      message: '@Priya Welcome to the neighborhood! Try Dishoom on Boundary St - not traditional but amazing. For PROPER authentic, Tayyabs in Whitechapel is 🔥 Their lamb chops are legendary',
      zone: 'Town',
      time: '11min ago',
      personality: 'ESFP',
      reactions: { '🔥': 8, '👍': 6, '🍛': 4 }
    },
    {
      id: 9,
      user: 'Aisha',
      avatar: '👩‍🍳',
      message: '@Priya Also check out Gunpowder on Commercial St! The Kerala fish curry is incredible. And for yoga, there\'s a small studio above the bookshop on Redchurch - super peaceful 🧘‍♀️',
      zone: 'Town',
      time: '10min ago',
      personality: 'ISFJ',
      reactions: { '🍛': 9, '❤️': 5, '🧘': 6 }
    },
    // Small Humble Business - Bookshop
    {
      id: 10,
      type: 'business',
      user: 'Pages & Poetry',
      businessType: 'Independent Bookshop',
      avatar: '📚',
      message: 'Quiet Sunday reading session at 2pm today. Bring your favorite book, we\'ll provide the tea ☕ All welcome, no purchase necessary. Just come hang with fellow book lovers 💚',
      location: '390m away',
      zone: 'Town',
      time: '14min ago',
      personality: null,
      verified: true,
      reactions: { '📚': 11, '☕': 8, '💚': 13 }
    },
    // Tech/Startup conversation with character
    {
      id: 11,
      user: 'Dev',
      avatar: '💻',
      message: 'Anyone at TechHub today? Stuck on a React Native bug that\'s driving me CRAZY. Will trade debugging help for coffee 🚀☕',
      zone: 'Town',
      time: '16min ago',
      personality: 'INTP',
      reactions: { '💻': 7, '🚀': 4, '😅': 5 }
    },
    {
      id: 12,
      user: 'Luna',
      avatar: '👩‍💼',
      message: '@Dev I\'m here until 6pm! Happy to help. React Native is my jam. Come to the 3rd floor, I\'m by the window. Wearing the orange headphones 🎧',
      zone: 'Town',
      time: '15min ago',
      personality: 'ENTJ',
      reactions: { '🙌': 5, '💪': 3, '🎧': 2 }
    },
    // Arts & Culture with personality
    {
      id: 13,
      user: 'Zara',
      avatar: '🎨',
      message: 'Pop-up art exhibition opening at Box Park tonight! Featuring 8 local artists (including yours truly 😊). Free entry, wine, and good vibes. 7pm start 🍷✨',
      zone: 'Town',
      time: '18min ago',
      personality: 'ENFP',
      reactions: { '🎨': 11, '🍷': 8, '✨': 6, '😊': 5 }
    },
    {
      id: 14,
      user: 'Oliver',
      avatar: '📸',
      message: '@Zara YES! I\'ll be there with my camera. Can I shoot some content for your Instagram? Your last exhibition was gorgeous',
      zone: 'Town',
      time: '17min ago',
      personality: 'ISFP',
      reactions: { '📸': 5, '🙌': 4 }
    },
    // Notable Business - Music Venue
    {
      id: 15,
      type: 'business',
      user: 'The Book Club',
      businessType: 'Bar & Events',
      avatar: '🎵',
      message: '🎵 Live Jazz tonight at 9pm! £8 entry includes a welcome drink. Featuring the incredible Sarah Thompson Quartet. Table bookings filling fast - DM or walk in!',
      location: '720m away',
      zone: 'Town',
      time: '20min ago',
      personality: null,
      verified: true,
      reactions: { '🎵': 14, '🍺': 10, '❤️': 9, '.sax': 7 }
    },
    // Small Wholesome Business - Plant Shop
    {
      id: 16,
      type: 'business',
      user: 'Green Thumb & Co.',
      businessType: 'Plant Shop',
      avatar: '🌱',
      message: '🌿 Plant parent struggling? Free plant clinic every Sunday! Bring your sad plant, we\'ll help diagnose & nurse it back to health. No judgment, we\'ve all killed a succulent 😅🪴',
      location: '610m away',
      zone: 'Town',
      time: '22min ago',
      personality: null,
      verified: true,
      reactions: { '🌱': 16, '❤️': 12, '😅': 8, '🪴': 10 }
    },
    // Community vibes with deep character
    {
      id: 17,
      user: 'Liam',
      avatar: '🎸',
      message: 'Love how alive this area feels on weekends! Been here 3 years and still discovering new spots every week. This community is SPECIAL 🧡',
      zone: 'Town',
      time: '25min ago',
      personality: 'ENFJ',
      reactions: { '🧡': 15, '🙌': 8, '✨': 6 }
    },
    {
      id: 18,
      user: 'Emma',
      avatar: '🌟',
      message: '@Liam Same! Moved from Manchester last year and never looked back. Not just another London neighborhood - this is HOME ❤️',
      zone: 'Town',
      time: '24min ago',
      personality: 'ESFJ',
      reactions: { '❤️': 12, '🙌': 7, '🏠': 5 }
    },
    // Character-driven interaction
    {
      id: 19,
      user: 'Kai',
      avatar: '🎮',
      message: 'Street food market at Old Spitalfields is POPPING today! Just got the best Korean fried chicken of my life. Queue is worth it 🍗🔥',
      zone: 'Town',
      time: '27min ago',
      personality: 'ESTP',
      reactions: { '🍗': 14, '🔥': 9, '😋': 8 }
    },
    // Small Humble Business - Tailor
    {
      id: 20,
      type: 'business',
      user: 'Mr. Chen\'s Alterations',
      businessType: 'Family Tailor',
      avatar: '✂️',
      message: '40 years in Shoreditch! Small repair? Bring it by. I fix for free if takes less than 5 minutes. Community first 💙 Open till 6pm today.',
      location: '450m away',
      zone: 'Town',
      time: '30min ago',
      personality: null,
      verified: true,
      reactions: { '❤️': 22, '🙏': 18, '💙': 15, '✂️': 9 }
    },
  ];

  // Auto-scroll effect - Only starts when in view
  useEffect(() => {
    if (!isInView) return; // Don't start until visible

    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev < communityMessages.length) {
          // Only auto-scroll if user hasn't taken manual control
          if (!userHasScrolled) {
            setTimeout(() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                  top: chatContainerRef.current.scrollHeight,
                  behavior: 'smooth'
                });
              }
            }, 100);
          }
          return prev + 1;
        }
        return prev;
      });
    }, 1200); // 1.2 seconds between messages (was 2.5s - now much faster!)
    
    return () => clearInterval(interval);
  }, [isInView, communityMessages.length, userHasScrolled]); // Added userHasScrolled dependency

  const handleReaction = (messageId: number, emoji: string) => {
    setReactions(prev => {
      const messageReactions = prev[messageId] || {};
      const currentCount = messageReactions[emoji] || 0;
      return {
        ...prev,
        [messageId]: {
          ...messageReactions,
          [emoji]: currentCount + 1
        }
      };
    });
  };

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] p-3 sm:p-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <div>
              <h4 className="text-white text-sm sm:text-base">Shoreditch District</h4>
              <p className="text-white/80 text-xs">892 people • {proximityRings[activeZone].name} zone</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white text-xs">Live</span>
          </div>
        </div>
      </div>

      {/* Messages with Auto-Scroll */}
      <div
        ref={chatContainerRef}
        className="p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto"
        style={{ minHeight: '500px', maxHeight: '700px' }}
        onScroll={() => setUserHasScrolled(true)}
      >
        {communityMessages.slice(0, visibleMessages).map((msg) => {
          // AI Sidekick Message
          if (msg.type === 'ai') {
            return (
              <div
                key={msg.id}
                className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-3 sm:p-4"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Signal className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs sm:text-sm text-blue-400">AI Sidekick</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Local Intel
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 break-words">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          }

          // Business Post
          if (msg.type === 'business') {
            return (
              <div
                key={msg.id}
                className="bg-gradient-to-br from-[#FF7A00]/20 via-[#FF8C1A]/10 to-transparent border-2 border-[#FF7A00]/50 rounded-xl p-3 sm:p-5 relative overflow-hidden group"
              >
                <div className="relative z-10">
                  {/* Business Header */}
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="text-2xl sm:text-3xl flex-shrink-0">{msg.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white text-sm sm:text-base truncate">{msg.user}</span>
                          {msg.verified && (
                            <div className="px-2 py-0.5 bg-[#FF7A00] rounded-full flex items-center gap-1 flex-shrink-0">
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                              <span className="text-[9px] sm:text-[10px] text-white">VERIFIED</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF7A00]/30 text-[#FF7A00] border border-[#FF7A00]/50">
                            {msg.businessType}
                          </span>
                          <span className="text-xs text-gray-500">{msg.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Message */}
                  <p className="text-gray-200 text-sm sm:text-base mb-3 sm:mb-4 break-words">{msg.message}</p>

                  {/* Business CTA & Reactions */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(msg.reactions || {}).map(([emoji, count]) => {
                        const userReactionCount = reactions[msg.id]?.[emoji] || 0;
                        const totalCount = (count as number) + userReactionCount;
                        return (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(msg.id, emoji)}
                            className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-black/50 border border-[#FF7A00]/30 rounded-full hover:border-[#FF7A00] hover:scale-105 active:scale-95 transition-all"
                          >
                            <span className="text-sm sm:text-base">{emoji}</span>
                            <span className="text-xs text-[#FF7A00]">{totalCount}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white rounded-lg text-xs sm:text-sm hover:scale-105 active:scale-95 transition-transform">
                      Visit Now
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Regular User Message - NO LOCATION DISPLAY
          return (
            <div
              key={msg.id}
              className="bg-black/50 border border-[#FF7A00]/20 rounded-xl p-3 sm:p-4 hover:border-[#FF7A00]/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="text-xl sm:text-2xl flex-shrink-0">{msg.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm sm:text-base">{msg.user}</span>
                      {msg.personality && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          {msg.personality}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 sm:mt-1 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/30">
                        {msg.zone}
                      </span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-2 sm:mb-3 break-words">{msg.message}</p>
              
              {/* Interactive Reactions */}
              <div className="flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity">
                {['👍', '❤️', '🔥', '🙌', '💪'].map((emoji) => {
                  const count = (msg.reactions?.[emoji] || 0) + (reactions[msg.id]?.[emoji] || 0);
                  return (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(msg.id, emoji)}
                      className="flex items-center gap-1 px-2 py-1 bg-black/50 border border-[#FF7A00]/20 rounded-lg text-xs hover:border-[#FF7A00]/50 hover:scale-110 active:scale-90 transition-all"
                    >
                      <span>{emoji}</span>
                      {count > 0 && <span className="text-[#FF7A00] text-xs">{count}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Scroll Anchor */}
        <div ref={chatEndRef} />

        {/* Typing Indicators */}
        {visibleMessages >= communityMessages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 px-2 sm:px-4"
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#FF7A00] rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">4 people typing...</span>
          </motion.div>
        )}
      </div>

      {/* Privacy & Safety Footer */}
      <div className="border-t border-[#FF7A00]/20 p-2 sm:p-3 bg-black/50">
        <div className="flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <Lock className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs">End-to-end encrypted</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-3 h-3 text-purple-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs">Anonymous mode</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-[10px] sm:text-xs">Resets in {timeUntilReset.hours}h {timeUntilReset.minutes}m</span>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 sm:p-4 bg-black/80 border-t border-[#FF7A00]/20">
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Send a message to nearby users..."
            className="flex-1 bg-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FF7A00] transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 sm:p-3 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white rounded-xl transition-all shadow-lg shadow-[#FF7A00]/20 flex-shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}