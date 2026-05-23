import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Briefcase, Users, Radio, Zap, Shield, MapPin, Eye, EyeOff, Sparkles, Check, X, ArrowRight, Lightbulb, Palette, Brain, Compass, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Simulated user data with realistic behavior
interface ProximityUser {
  id: number;
  compatibility: number;
  personality: 'adventurous' | 'creative' | 'analytical' | 'empathetic' | 'ambitious';
  distance: 'very-close' | 'close' | 'nearby';
  distanceLabel: string;
  distanceMeters: number;
  waveStatus: 'none' | 'sent' | 'mutual';
  name: string;
  bio: string;
  interests: string[];
  matchReason: string;
  avatar: string;
  // For realistic behavior simulation
  angleOffset: number; // Random angle on radar
  driftSpeed: number; // How fast they micro-drift
  driftAngle: number; // Direction of drift
  isEntering: boolean;
  isExiting: boolean;
  pulsePhase: number; // For staggered pulsing
  // For distance stabilization
  previousBand: 'very-close' | 'close' | 'nearby';
  bandStableTime: number; // Timestamp when band was last stable
}

const USER_POOL = [
  { 
    id: 1, 
    compatibility: 92, 
    personality: 'adventurous' as const, 
    name: 'Sarah',
    bio: 'Creative designer who loves coffee and late-night gallery walks',
    interests: ['Design', 'Coffee', 'Art', 'Photography'],
    matchReason: 'Both love creative work & indie music scene',
    avatar: '👩‍🎨'
  },
  { 
    id: 2, 
    compatibility: 88, 
    personality: 'creative' as const, 
    name: 'James',
    bio: 'Tech enthusiast, gamer, and weekend hiker',
    interests: ['Gaming', 'Tech', 'Music', 'Hiking'],
    matchReason: 'Shared interest in technology and outdoor adventures',
    avatar: '👨‍💻'
  },
  { 
    id: 3, 
    compatibility: 85, 
    personality: 'ambitious' as const, 
    name: 'Alex',
    bio: 'Startup founder looking to expand network in London tech scene',
    interests: ['Business', 'Startups', 'Networking', 'Innovation'],
    matchReason: 'Both interested in entrepreneurship and venture capital',
    avatar: '👔'
  },
  { 
    id: 4, 
    compatibility: 95, 
    personality: 'adventurous' as const, 
    name: 'Emma',
    bio: 'Travel photographer capturing London\'s hidden stories',
    interests: ['Photography', 'Travel', 'Nature', 'Stories'],
    matchReason: 'Both love adventure, photography & discovering hidden gems',
    avatar: '📸'
  },
  { 
    id: 5, 
    compatibility: 90, 
    personality: 'empathetic' as const, 
    name: 'Marcus',
    bio: 'Fitness coach passionate about healthy living and community',
    interests: ['Fitness', 'Health', 'Cooking', 'Community'],
    matchReason: 'Both prioritize healthy lifestyle and positive energy',
    avatar: '💪'
  },
  {
    id: 6,
    compatibility: 87,
    personality: 'analytical' as const,
    name: 'Priya',
    bio: 'Marketing director exploring creative collaborations',
    interests: ['Marketing', 'Branding', 'Strategy', 'Design'],
    matchReason: 'Both work in creative industries and value innovation',
    avatar: '💼'
  },
  {
    id: 7,
    compatibility: 93,
    personality: 'creative' as const,
    name: 'Oliver',
    bio: 'Musician and producer exploring London\'s music scene',
    interests: ['Music', 'Production', 'Concerts', 'Vinyl'],
    matchReason: 'Both love live music and discovering new artists',
    avatar: '🎵'
  },
  {
    id: 8,
    compatibility: 89,
    personality: 'empathetic' as const,
    name: 'Zara',
    bio: 'Bookworm and coffee enthusiast seeking reading buddies',
    interests: ['Books', 'Coffee', 'Writing', 'Literature'],
    matchReason: 'Both enjoy quiet cafes and deep conversations',
    avatar: '📚'
  }
];

// Extended demo profiles for cluster details
const EXTENDED_USER_POOL = [
  ...USER_POOL,
  {
    id: 9,
    compatibility: 91,
    personality: 'creative' as const,
    name: 'Sophie',
    bio: 'Fashion designer blending vintage finds with modern streetwear',
    interests: ['Fashion', 'Design', 'Vintage', 'Streetwear'],
    matchReason: 'Both have unique creative vision and love thrifting',
    avatar: '👗'
  },
  {
    id: 10,
    compatibility: 86,
    personality: 'adventurous' as const,
    name: 'Liam',
    bio: 'Rock climber and adventure filmmaker documenting urban exploration',
    interests: ['Climbing', 'Film', 'Adventure', 'Urban Exploration'],
    matchReason: 'Both thrive on adrenaline and capturing moments',
    avatar: '🧗'
  },
  {
    id: 11,
    compatibility: 94,
    personality: 'empathetic' as const,
    name: 'Maya',
    bio: 'Social worker and community organizer passionate about local change',
    interests: ['Community', 'Social Justice', 'Volunteering', 'Activism'],
    matchReason: 'Both care deeply about making a positive impact',
    avatar: '🤝'
  },
  {
    id: 12,
    compatibility: 88,
    personality: 'analytical' as const,
    name: 'David',
    bio: 'Data scientist exploring AI ethics and machine learning applications',
    interests: ['AI', 'Ethics', 'Data', 'Research'],
    matchReason: 'Both fascinated by technology and its societal implications',
    avatar: '🤖'
  },
  {
    id: 13,
    compatibility: 90,
    personality: 'ambitious' as const,
    name: 'Rachel',
    bio: 'Marketing director scaling B2B SaaS startups across Europe',
    interests: ['Marketing', 'SaaS', 'Growth', 'Strategy'],
    matchReason: 'Both driven by growth mindset and scaling businesses',
    avatar: '📈'
  },
  {
    id: 14,
    compatibility: 87,
    personality: 'creative' as const,
    name: 'Kai',
    bio: 'Graphic novelist illustrating stories of queer Asian experiences',
    interests: ['Comics', 'Art', 'Storytelling', 'Illustration'],
    matchReason: 'Both use art to amplify underrepresented voices',
    avatar: '🖼️'
  },
  {
    id: 15,
    compatibility: 92,
    personality: 'adventurous' as const,
    name: 'Isabella',
    bio: 'Travel writer exploring hidden gems across Southeast Asia',
    interests: ['Travel', 'Writing', 'Culture', 'Food'],
    matchReason: 'Both seek authentic cultural experiences off beaten path',
    avatar: '✈️'
  },
  {
    id: 16,
    compatibility: 89,
    personality: 'empathetic' as const,
    name: 'Noah',
    bio: 'Therapist specializing in creative arts and mindfulness practices',
    interests: ['Therapy', 'Mindfulness', 'Art', 'Wellness'],
    matchReason: 'Both value emotional intelligence and self-awareness',
    avatar: '🧘'
  },
  {
    id: 17,
    compatibility: 85,
    personality: 'analytical' as const,
    name: 'Aisha',
    bio: 'Cybersecurity researcher protecting digital privacy and freedom',
    interests: ['Security', 'Privacy', 'Tech', 'Hacking'],
    matchReason: 'Both passionate about digital rights and encryption',
    avatar: '🔒'
  },
  {
    id: 18,
    compatibility: 93,
    personality: 'ambitious' as const,
    name: 'Tom',
    bio: 'VC investor backing climate tech and sustainable energy startups',
    interests: ['Investing', 'Climate', 'Energy', 'Startups'],
    matchReason: 'Both focused on solving global challenges through innovation',
    avatar: '🌱'
  },
  {
    id: 19,
    compatibility: 91,
    personality: 'creative' as const,
    name: 'Luna',
    bio: 'Choreographer fusing contemporary dance with traditional folklore',
    interests: ['Dance', 'Performance', 'Culture', 'Movement'],
    matchReason: 'Both celebrate cultural heritage through creative expression',
    avatar: '💃'
  },
  {
    id: 20,
    compatibility: 88,
    personality: 'adventurous' as const,
    name: 'Felix',
    bio: 'Wildlife photographer documenting endangered species in Africa',
    interests: ['Photography', 'Wildlife', 'Conservation', 'Nature'],
    matchReason: 'Both committed to environmental conservation through media',
    avatar: '📷'
  },
  {
    id: 21,
    compatibility: 86,
    personality: 'empathetic' as const,
    name: 'Olivia',
    bio: 'Pediatric nurse and children\'s book author spreading joy',
    interests: ['Healthcare', 'Children', 'Writing', 'Kindness'],
    matchReason: 'Both dedicated to nurturing and inspiring young minds',
    avatar: '👩‍⚕️'
  },
  {
    id: 22,
    compatibility: 90,
    personality: 'analytical' as const,
    name: 'Ethan',
    bio: 'Quantum computing researcher pushing boundaries of computation',
    interests: ['Quantum', 'Physics', 'Computing', 'Science'],
    matchReason: 'Both excited by cutting-edge science and future tech',
    avatar: '⚛️'
  },
  {
    id: 23,
    compatibility: 94,
    personality: 'ambitious' as const,
    name: 'Amara',
    bio: 'Serial entrepreneur building African fintech infrastructure',
    interests: ['Fintech', 'Africa', 'Entrepreneurship', 'Impact'],
    matchReason: 'Both committed to financial inclusion and economic empowerment',
    avatar: '💳'
  },
  {
    id: 24,
    compatibility: 89,
    personality: 'creative' as const,
    name: 'Jasper',
    bio: 'Sound designer crafting immersive audio for VR experiences',
    interests: ['Audio', 'VR', 'Sound Design', 'Immersive Tech'],
    matchReason: 'Both pioneering new forms of creative storytelling',
    avatar: '🎧'
  },
  {
    id: 25,
    compatibility: 87,
    personality: 'adventurous' as const,
    name: 'Sienna',
    bio: 'Free diver exploring underwater caves and marine ecosystems',
    interests: ['Diving', 'Ocean', 'Adventure', 'Marine Biology'],
    matchReason: 'Both drawn to the mysteries beneath the waves',
    avatar: '🤿'
  }
];

// Detailed cluster data with profiles
const CLUSTER_DETAILS = {
  1: {
    name: 'Platform Edge',
    location: '8-12m Northeast',
    avgDistance: '8-12m',
    totalPeople: 18,
    personalities: {
      adventurous: 22,
      creative: 28,
      analytical: 17,
      empathetic: 19,
      ambitious: 14
    },
    topMatches: [4, 9, 15, 20, 25, 1, 10], // IDs from EXTENDED_USER_POOL
    vibe: 'Commuters waiting for trains, checking phones',
    peakTimes: 'Weekday mornings 7-9am, evenings 5-8pm'
  },
  2: {
    name: 'Ticket Gates',
    location: '5-9m East',
    avgDistance: '5-9m',
    totalPeople: 11,
    personalities: {
      adventurous: 9,
      creative: 35,
      analytical: 18,
      empathetic: 27,
      ambitious: 11
    },
    topMatches: [2, 7, 14, 19, 24, 6, 8], // IDs from EXTENDED_USER_POOL
    vibe: 'People scanning Oyster cards, entering/exiting',
    peakTimes: 'Daily 10am-4pm, weekend brunch hours'
  },
  3: {
    name: 'Station Entrance',
    location: '10-15m Southeast',
    avgDistance: '10-15m',
    totalPeople: 14,
    personalities: {
      adventurous: 14,
      creative: 21,
      analytical: 29,
      empathetic: 14,
      ambitious: 22
    },
    topMatches: [3, 12, 13, 17, 22, 23, 5], // IDs from EXTENDED_USER_POOL
    vibe: 'Flow of people arriving and departing',
    peakTimes: 'Lunch hours 12-2pm, after-work 6-9pm'
  }
};

const PERSONALITY_CONFIG = {
  adventurous: { 
    icon: Compass, 
    color: '#ec4899', 
    gradient: 'from-pink-500 to-rose-500',
    label: 'Adventurous',
    emoji: '🗺️',
    bgGlow: 'rgba(236, 72, 153, 0.3)'
  },
  creative: { 
    icon: Palette, 
    color: '#a855f7', 
    gradient: 'from-purple-500 to-fuchsia-500',
    label: 'Creative',
    emoji: '🎨',
    bgGlow: 'rgba(168, 85, 247, 0.3)'
  },
  ambitious: { 
    icon: TrendingUp, 
    color: '#f59e0b', 
    gradient: 'from-amber-500 to-orange-500',
    label: 'Ambitious',
    emoji: '🚀',
    bgGlow: 'rgba(245, 158, 11, 0.3)'
  },
  analytical: { 
    icon: Brain, 
    color: '#3b82f6', 
    gradient: 'from-blue-500 to-cyan-500',
    label: 'Analytical',
    emoji: '🧠',
    bgGlow: 'rgba(59, 130, 246, 0.3)'
  },
  empathetic: { 
    icon: Heart, 
    color: '#10b981', 
    gradient: 'from-emerald-500 to-teal-500',
    label: 'Empathetic',
    emoji: '💙',
    bgGlow: 'rgba(16, 185, 129, 0.3)'
  },
};

const MEET_CODES = [
  { code: 'ORANGE-7', icon: '🟠', shape: '⬟' },
  { code: 'BLUE-3', icon: '🔵', shape: '⬢' },
  { code: 'PURPLE-9', icon: '🟣', shape: '⬠' },
  { code: 'GREEN-5', icon: '🟢', shape: '⬡' },
  { code: 'PINK-4', icon: '🌸', shape: '⬟' },
];

// Helper to create organic bubble shapes
const generateOrganicBubblePath = (size: number, seed: number) => {
  const points = 12;
  const radius = size / 2;
  let path = 'M ';
  
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // Add organic variation using seed
    const variation = Math.sin(seed + i) * 0.15 + Math.cos(seed * 1.3 + i * 0.7) * 0.1;
    const r = radius * (1 + variation);
    const x = Math.cos(angle) * r + size / 2;
    const y = Math.sin(angle) * r + size / 2;
    
    if (i === 0) {
      path += `${x} ${y} `;
    } else {
      // Use quadratic curves for smooth organic shapes
      const prevAngle = ((i - 1) / points) * Math.PI * 2;
      const prevVariation = Math.sin(seed + (i - 1)) * 0.15 + Math.cos(seed * 1.3 + (i - 1) * 0.7) * 0.1;
      const prevR = radius * (1 + prevVariation);
      const prevX = Math.cos(prevAngle) * prevR + size / 2;
      const prevY = Math.sin(prevAngle) * prevR + size / 2;
      
      const cpX = (prevX + x) / 2;
      const cpY = (prevY + y) / 2;
      path += `Q ${cpX} ${cpY} ${x} ${y} `;
    }
  }
  path += 'Z';
  return path;
};

// Helper to determine distance band with hysteresis (prevents rapid fluctuation)
const getStableDistanceBand = (meters: number, previousBand: 'very-close' | 'close' | 'nearby'): 'very-close' | 'close' | 'nearby' => {
  // Add 1m hysteresis threshold to prevent rapid band changes
  const HYSTERESIS = 1.0;
  
  // Determine raw band
  let rawBand: 'very-close' | 'close' | 'nearby';
  if (meters <= 5) rawBand = 'very-close';
  else if (meters <= 12) rawBand = 'close';
  else rawBand = 'nearby';
  
  // If moving to a different band, check if we've crossed the threshold
  if (rawBand !== previousBand) {
    // Only change if we're well into the new band
    if (rawBand === 'very-close' && meters > 5 - HYSTERESIS) return previousBand;
    if (rawBand === 'close') {
      if (meters < 5 + HYSTERESIS && previousBand === 'very-close') return previousBand;
      if (meters > 12 - HYSTERESIS && previousBand === 'nearby') return previousBand;
    }
    if (rawBand === 'nearby' && meters < 12 + HYSTERESIS) return previousBand;
  }
  
  return rawBand;
};

export function ProximityRadarSection() {
  // Intersection Observer to pause animations when off-screen (10-15% performance boost)
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1, rootMargin: '100px' });
  
  const [viewMode, setViewMode] = useState<'default' | 'high-density'>('default');
  const [selectedBubble, setSelectedBubble] = useState<number | null>(null);
  const [mutualWaveUser, setMutualWaveUser] = useState<number | null>(null);
  const [users, setUsers] = useState<ProximityUser[]>([]);
  const [proximityDistance, setProximityDistance] = useState<number>(12);
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [bubbleRadius, setBubbleRadius] = useState(25); // Default to 25m
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [clusterPersonalityFilter, setClusterPersonalityFilter] = useState<string | null>(null);
  const animationFrameRef = useRef<number>();
  const clusterAnimationRef = useRef<number>();

  // Initialize users with realistic positioning
  const createUser = (baseUser: typeof USER_POOL[0], distanceBand?: 'very-close' | 'close' | 'nearby') => {
    const distance = distanceBand || (['very-close', 'close', 'nearby'][Math.floor(Math.random() * 3)] as 'very-close' | 'close' | 'nearby');
    const distanceMeters = 
      distance === 'very-close' ? 2 + Math.random() * 3 :
      distance === 'close' ? 7 + Math.random() * 4 :
      15 + Math.random() * 8;
    
    return {
      ...baseUser,
      distance,
      distanceLabel: distance === 'very-close' ? 'Very close' : distance === 'close' ? 'Close' : 'Nearby',
      distanceMeters,
      waveStatus: 'none' as const,
      angleOffset: Math.random() * 360,
      driftSpeed: 0.05 + Math.random() * 0.1, // Slower drift for stability
      driftAngle: Math.random() * 360,
      isEntering: true,
      isExiting: false,
      pulsePhase: Math.random() * Math.PI * 2,
      previousBand: distance,
      bandStableTime: Date.now()
    };
  };

  // Initialize with 3-4 users
  useEffect(() => {
    const initialCount = 3 + Math.floor(Math.random() * 2);
    const shuffled = [...USER_POOL].sort(() => Math.random() - 0.5);
    const initialUsers = shuffled.slice(0, initialCount).map(u => createUser(u));
    setUsers(initialUsers);
  }, []);

  // Simulate realistic user behavior
  useEffect(() => {
    if (isStealthMode || !isInView) return; // No updates in stealth mode or when off-screen

    const behaviorInterval = setInterval(() => {
      setUsers(prev => {
        // Randomly add or remove users
        const action = Math.random();
        
        if (action < 0.15 && prev.length < 5) {
          // Add a new user (entering range)
          const availableUsers = USER_POOL.filter(u => !prev.find(p => p.id === u.id));
          if (availableUsers.length > 0) {
            const newUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
            return [...prev, createUser(newUser)];
          }
        } else if (action > 0.90 && prev.length > 2) {
          // Remove a user (exiting range)
          const exitIndex = Math.floor(Math.random() * prev.length);
          return prev.map((u, i) => 
            i === exitIndex ? { ...u, isExiting: true } : u
          );
        }
        
        return prev;
      });
    }, 12000); // Every 12 seconds for less chaos

    return () => clearInterval(behaviorInterval);
  }, [isStealthMode, isInView]);

  // Pause mutual wave proximity updates when off-screen
  useEffect(() => {
    if (mutualWaveUser !== null && isInView) {
      const interval = setInterval(() => {
        setProximityDistance(prev => {
          const change = Math.random() > 0.65 ? -0.8 : 0.3; // Bias toward getting closer
          const newDist = prev + change;
          return Math.max(0.5, Math.min(15, newDist));
        });
      }, 2000); // Every 2 seconds

      return () => clearInterval(interval);
    }
  }, [mutualWaveUser, isInView]);

  // Remove exiting users after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsers(prev => prev.filter(u => !u.isExiting));
    }, 600);
    return () => clearTimeout(timeout);
  }, [users]);

  // Micro-drift animation for bubbles - only when visible
  useEffect(() => {
    if (!isInView) return; // Pause when not visible
    
    let lastTime = Date.now();
    
    const drift = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setUsers(prev => prev.map(user => {
        // Slowly change distance (more gradual)
        const distanceChange = (Math.random() - 0.5) * 0.3 * delta;
        const newDistanceMeters = Math.max(0.5, Math.min(24, user.distanceMeters + distanceChange));
        
        // Get stable distance band (with hysteresis)
        const newBand = getStableDistanceBand(newDistanceMeters, user.previousBand);
        const bandChanged = newBand !== user.previousBand;
        
        return {
          ...user,
          distanceMeters: newDistanceMeters,
          distance: newBand,
          distanceLabel: newBand === 'very-close' ? 'Very close' : newBand === 'close' ? 'Close' : 'Nearby',
          angleOffset: user.angleOffset + user.driftSpeed * delta * 10, // Slower angle drift
          driftAngle: user.driftAngle + (Math.random() - 0.5) * 0.3,
          pulsePhase: user.pulsePhase + delta,
          isEntering: false,
          previousBand: newBand,
          bandStableTime: bandChanged ? now : user.bandStableTime
        };
      }));

      animationFrameRef.current = requestAnimationFrame(drift);
    };

    animationFrameRef.current = requestAnimationFrame(drift);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView]);

  const handleBubbleTap = (userId: number) => {
    if (mutualWaveUser !== null || isStealthMode) return;
    setSelectedBubble(selectedBubble === userId ? null : userId);
  };

  const handleWave = (userId: number) => {
    const isMutual = Math.random() > 0.35; // 65% chance of mutual
    
    if (isMutual) {
      setMutualWaveUser(userId);
      setSelectedBubble(null);
      setProximityDistance(12);
    } else {
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, waveStatus: 'sent' } : u
      ));
      setTimeout(() => {
        setSelectedBubble(null);
      }, 1500);
    }
  };

  const handleCancelMutualWave = () => {
    setMutualWaveUser(null);
    setProximityDistance(12);
  };

  const toggleStealthMode = () => {
    setIsStealthMode(!isStealthMode);
    if (!isStealthMode) {
      setSelectedBubble(null);
      setMutualWaveUser(null);
    }
  };

  const selectedUser = users.find(u => u.id === selectedBubble);
  const mutualUser = users.find(u => u.id === mutualWaveUser);
  const meetCode = mutualUser ? MEET_CODES[mutualUser.id % MEET_CODES.length] : null;

  const getDistanceBand = () => {
    if (proximityDistance <= 1) return 'Within 1m';
    if (proximityDistance <= 2) return 'Within 2m';
    if (proximityDistance <= 5) return 'Within 5m';
    return `~${Math.round(proximityDistance)}m away`;
  };

  const getProximityProgress = () => {
    return Math.max(0, Math.min(100, ((15 - proximityDistance) / 15) * 100));
  };

  // Calculate bubble position on radar (spread out properly)
  const getBubblePosition = (user: ProximityUser, radarSize: number) => {
    const centerOffset = radarSize / 2;
    
    // Distance from center based on band (not exact meters)
    const distanceMultiplier = 
      user.distance === 'very-close' ? 0.30 :
      user.distance === 'close' ? 0.55 : 0.82;
    
    const baseRadius = (radarSize * 0.45) * distanceMultiplier;
    
    // Add micro-drift (smaller for stability)
    const driftX = Math.cos(user.driftAngle) * 2;
    const driftY = Math.sin(user.driftAngle) * 2;
    
    const angle = (user.angleOffset * Math.PI) / 180;
    const x = Math.cos(angle) * baseRadius + centerOffset + driftX;
    const y = Math.sin(angle) * baseRadius + centerOffset + driftY;
    
    return { x, y };
  };

  // Get bubble size based on distance band only
  const getBubbleSize = (distance: 'very-close' | 'close' | 'nearby') => {
    return distance === 'very-close' ? 85 : distance === 'close' ? 70 : 55;
  };

  // Animated density clusters
  const [clusterTime, setClusterTime] = useState(0);
  
  useEffect(() => {
    // Pause cluster animations when off-screen
    if (!isInView || viewMode !== 'high-density') return;
    
    let lastTime = Date.now();
    
    const animateClusters = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      setClusterTime(prev => prev + delta * 0.5); // Faster cluster drift for visibility
      
      clusterAnimationRef.current = requestAnimationFrame(animateClusters);
    };
    
    clusterAnimationRef.current = requestAnimationFrame(animateClusters);
    
    return () => {
      if (clusterAnimationRef.current) {
        cancelAnimationFrame(clusterAnimationRef.current);
      }
    };
  }, [viewMode, isInView]);

  // Recalculate cluster positions based on clusterTime (reactive)
  const densityClusters = [
    { 
      id: 1, 
      label: 'Platform Edge', 
      count: 18, 
      baseX: 35, 
      baseY: 30, 
      size: 90,
      driftSpeed: 0.5
    },
    { 
      id: 2, 
      label: 'Ticket Gates', 
      count: 11, 
      baseX: 65, 
      baseY: 40, 
      size: 70,
      driftSpeed: 0.7
    },
    { 
      id: 3, 
      label: 'Station Entrance', 
      count: 14, 
      baseX: 50, 
      baseY: 70, 
      size: 80,
      driftSpeed: 0.6
    },
  ].map(cluster => ({
    ...cluster,
    x: cluster.baseX + Math.sin(clusterTime * cluster.driftSpeed) * 3,
    y: cluster.baseY + Math.cos(clusterTime * cluster.driftSpeed * 0.8) * 3
  }));

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Matte black background with radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black" />

      {/* London Map - ONLY shown in mutual wave mode */}
      <AnimatePresence>
        {mutualWaveUser !== null && (
          <motion.div
            className="absolute inset-0 opacity-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              {/* Realistic London street grid - Covent Garden zoomed to ~50m radius */}
              {/* Main roads */}
              <path d="M 200 400 L 1000 400" stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round" />
              <path d="M 600 100 L 600 700" stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round" />
              <path d="M 300 200 L 900 600" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" />
              <path d="M 900 200 L 300 600" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" />
              
              {/* Smaller streets */}
              <path d="M 200 300 L 1000 300" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
              <path d="M 200 500 L 1000 500" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
              <path d="M 400 100 L 400 700" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
              <path d="M 800 100 L 800 700" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
              
              {/* Building blocks with more detail */}
              {[...Array(30)].map((_, i) => {
                const col = i % 6;
                const row = Math.floor(i / 6);
                return (
                  <rect
                    key={i}
                    x={150 + col * 170}
                    y={120 + row * 130}
                    width={130 + Math.random() * 20}
                    height={85 + Math.random() * 20}
                    fill="#0f0f0f"
                    stroke="#2a2a2a"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                );
              })}
              
              {/* Landmarks */}
              <circle cx="600" cy="400" r="20" fill="#FF7A00" opacity="0.6" />
              <text x="600" y="450" fill="#FF7A00" fontSize="14" textAnchor="middle" opacity="0.8">
                You are here
              </text>
              
              {/* Street names */}
              <text x="200" y="390" fill="#444" fontSize="11" opacity="0.6">Long Acre</text>
              <text x="610" y="120" fill="#444" fontSize="11" opacity="0.6">Drury Lane</text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#FF7A00]" />
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl">20m Privacy Radar</h2>
            <Radio className="w-8 h-8 text-[#FF7A00]" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
            Experience awareness without tracking. Our privacy-first radar shows you compatible people nearby using soft presence bubbles—never exact pins. Control your visibility instantly, connect when mutual.
          </p>
        </motion.div>

        {/* Visibility Banner */}
        <AnimatePresence>
          {!isStealthMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/50 rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-sm">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">You're visible in your Safe Bubble</span>
                <button
                  onClick={toggleStealthMode}
                  className="text-xs text-green-400 hover:text-green-300 underline transition-colors"
                >
                  Go Stealth
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stealth Mode Banner */}
        <AnimatePresence>
          {isStealthMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-600 rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-sm">
                <EyeOff className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">You're hidden • Stealth Mode Active</span>
                <button
                  onClick={toggleStealthMode}
                  className="text-xs text-[#FF7A00] hover:text-orange-400 underline transition-colors"
                >
                  Go Visible
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setViewMode('default')}
            className={`px-6 py-3 rounded-xl border-2 transition-all ${
              viewMode === 'default'
                ? 'bg-[#FF7A00] border-[#FF7A00] text-white'
                : 'bg-black/50 border-gray-700 text-gray-400 hover:border-[#FF7A00]/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5" />
              <span>Default Mode</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('high-density')}
            className={`px-6 py-3 rounded-xl border-2 transition-all ${
              viewMode === 'high-density'
                ? 'bg-[#FF7A00] border-[#FF7A00] text-white'
                : 'bg-black/50 border-gray-700 text-gray-400 hover:border-[#FF7A00]/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>High-Density Mode</span>
            </div>
          </button>
        </motion.div>

        {/* Main Interactive Radar Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#0f0f0f] to-black border-2 border-[#FF7A00]/30 rounded-3xl overflow-hidden p-8 md:p-12">
            
            {/* Stealth Mode Overlay */}
            <AnimatePresence>
              {isStealthMode && viewMode === 'default' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-6 border-4 border-gray-600"
                    >
                      <EyeOff className="w-12 h-12 text-gray-400" />
                    </motion.div>
                    <h3 className="text-white text-2xl mb-3">You're Hidden</h3>
                    <p className="text-gray-400 mb-6 max-w-sm">
                      Your bubble has collapsed. You won't appear to anyone nearby until you go visible again.
                    </p>
                    <button
                      onClick={toggleStealthMode}
                      className="px-8 py-3 bg-gradient-to-r from-[#FF7A00] to-orange-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-[#FF7A00]/50 transition-all"
                    >
                      Go Visible
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DEFAULT MODE */}
            <AnimatePresence mode="wait">
              {viewMode === 'default' && (
                <motion.div
                  key="default-mode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Radar SVG Container */}
                  <div className="relative w-full max-w-2xl mx-auto aspect-square">
                    <svg className="w-full h-full" viewBox="0 0 600 600">
                      <defs>
                        {/* Advanced blur filters for organic foggy bubbles */}
                        <filter id="organicBlur" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
                          <feGaussianBlur stdDeviation="3" />
                        </filter>
                        
                        <filter id="organicGlow" x="-100%" y="-100%" width="300%" height="300%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5" />
                          <feGaussianBlur stdDeviation="15" />
                        </filter>

                        {/* Gradients for presence bubbles */}
                        {users.map(user => (
                          <radialGradient key={`grad-${user.id}`} id={`bubbleGrad-${user.id}`}>
                            <stop offset="0%" stopColor={PERSONALITY_CONFIG[user.personality].color} stopOpacity="0.6" />
                            <stop offset="40%" stopColor={PERSONALITY_CONFIG[user.personality].color} stopOpacity="0.4" />
                            <stop offset="70%" stopColor={PERSONALITY_CONFIG[user.personality].color} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={PERSONALITY_CONFIG[user.personality].color} stopOpacity="0" />
                          </radialGradient>
                        ))}
                      </defs>

                      {/* Distance Rings (subtle, not rotating) */}
                      {[
                        { radius: 270, label: `${bubbleRadius}m`, opacity: 0.3 },
                        { radius: 180, label: '12m', opacity: 0.25 },
                        { radius: 90, label: '5m', opacity: 0.2 }
                      ].map((ring, i) => (
                        <g key={i}>
                          <motion.circle
                            cx="300"
                            cy="300"
                            r={ring.radius}
                            fill="none"
                            stroke="#FF7A00"
                            strokeWidth="1.5"
                            opacity={ring.opacity}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: ring.opacity, scale: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                          />
                          <motion.text
                            x="300"
                            y={300 - ring.radius - 10}
                            fill="#666"
                            fontSize="11"
                            textAnchor="middle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.5 + i * 0.15 }}
                          >
                            {ring.label}
                          </motion.text>
                        </g>
                      ))}

                      {/* Center - User (You) with breathing ripples */}
                      <g>
                        {/* Breathing ripple rings */}
                        {[0, 1].map(i => (
                          <motion.circle
                            key={`ripple-${i}`}
                            cx="300"
                            cy="300"
                            r="15"
                            fill="none"
                            stroke="#FF7A00"
                            strokeWidth="2"
                            opacity="0"
                            animate={{
                              r: [15, 40],
                              opacity: [0.5, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: i * 2,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                        
                        {/* User dot */}
                        <motion.circle
                          cx="300"
                          cy="300"
                          r="12"
                          fill="url(#userGradient)"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        />
                        <defs>
                          <radialGradient id="userGradient">
                            <stop offset="0%" stopColor="#FF7A00" />
                            <stop offset="100%" stopColor="#ff9933" />
                          </radialGradient>
                        </defs>

                        <text
                          x="300"
                          y="330"
                          fill="#FF7A00"
                          fontSize="12"
                          textAnchor="middle"
                          opacity="0.8"
                        >
                          You
                        </text>
                      </g>

                      {/* Presence Bubbles - Organic, foggy, drifting */}
                      <AnimatePresence>
                        {users.map((user, index) => {
                          const PersonalityIcon = PERSONALITY_CONFIG[user.personality].icon;
                          const personalityColor = PERSONALITY_CONFIG[user.personality].color;
                          const pos = getBubblePosition(user, 600);
                          const size = getBubbleSize(user.distance);
                          const organicPath = generateOrganicBubblePath(size, user.id * 3.7);
                          const isSelected = selectedBubble === user.id;
                          const pulseIntensity = 0.15 + Math.sin(user.pulsePhase) * 0.1;

                          return (
                            <motion.g
                              key={user.id}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: user.isExiting ? 0 : (isSelected ? 0.95 : 0.75),
                                scale: user.isExiting ? 0 : (user.isEntering ? 1 : 1),
                                x: pos.x - size / 2,
                                y: pos.y - size / 2
                              }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ 
                                opacity: { duration: 0.6 },
                                scale: { duration: 0.6 },
                                x: { duration: 0 },
                                y: { duration: 0 }
                              }}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleBubbleTap(user.id)}
                            >
                              {/* Outer glow (large, very soft) */}
                              <circle
                                cx={size / 2}
                                cy={size / 2}
                                r={size * 0.85}
                                fill={`url(#bubbleGrad-${user.id})`}
                                filter="url(#organicGlow)"
                                opacity={pulseIntensity}
                              />

                              {/* Main organic bubble shape */}
                              <path
                                d={organicPath}
                                fill={`url(#bubbleGrad-${user.id})`}
                                filter="url(#organicBlur)"
                                opacity="0.7"
                              />

                              {/* Secondary layer for depth */}
                              <circle
                                cx={size / 2}
                                cy={size / 2}
                                r={size * 0.37}
                                fill={personalityColor}
                                opacity="0.4"
                                filter="url(#organicBlur)"
                              />

                              {/* Compatibility badge */}
                              <g transform={`translate(${size * 0.2}, ${size * 0.15})`}>
                                <rect
                                  x="-15"
                                  y="-10"
                                  width="30"
                                  height="20"
                                  rx="10"
                                  fill="#000"
                                  opacity="0.9"
                                />
                                <text
                                  x="0"
                                  y="4"
                                  fill={personalityColor}
                                  fontSize="11"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  {user.compatibility}%
                                </text>
                              </g>

                              {/* Distance label */}
                              <g transform={`translate(${size / 2}, ${size + 15})`}>
                                <rect
                                  x="-35"
                                  y="-10"
                                  width="70"
                                  height="20"
                                  rx="10"
                                  fill="#000"
                                  opacity="0.9"
                                />
                                <text
                                  x="0"
                                  y="4"
                                  fill={personalityColor}
                                  fontSize="10"
                                  textAnchor="middle"
                                >
                                  {user.distanceLabel}
                                </text>
                              </g>

                              {/* Personality icon */}
                              <foreignObject
                                x={size * 0.7}
                                y={size * 0.15}
                                width="24"
                                height="24"
                              >
                                <div className="w-6 h-6 rounded-full bg-black/90 flex items-center justify-center border"
                                  style={{ borderColor: personalityColor }}
                                >
                                  <PersonalityIcon className="w-3 h-3" style={{ color: personalityColor }} />
                                </div>
                              </foreignObject>

                              {/* Pulsing outer ring */}
                              <motion.circle
                                cx={size / 2}
                                cy={size / 2}
                                r={size * 0.5}
                                fill="none"
                                stroke={personalityColor}
                                strokeWidth="2"
                                opacity="0"
                                animate={{
                                  r: [size * 0.5, size * 0.7],
                                  opacity: [0.5, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.4,
                                  ease: "easeOut"
                                }}
                              />
                            </motion.g>
                          );
                        })}
                      </AnimatePresence>
                    </svg>

                    {/* Safe Bubble Label (top) */}
                    <motion.div
                      className="absolute top-[3%] left-1/2 -translate-x-1/2 bg-black/90 border-2 border-[#FF7A00] rounded-xl px-6 py-3 backdrop-blur-sm"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-white font-semibold text-sm md:text-base">Safe Bubble • {bubbleRadius}m</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                    </motion.div>

                    {/* Active count (bottom) */}
                    <motion.div
                      className="absolute bottom-[3%] left-1/2 -translate-x-1/2 bg-black/90 border border-[#FF7A00]/50 rounded-lg px-6 py-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      <div className="text-center">
                        <div className="text-3xl text-[#FF7A00] font-bold">
                          {users.length}
                        </div>
                        <div className="text-xs text-gray-400">Compatible nearby</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Selected Bubble Card */}
                  <AnimatePresence>
                    {selectedBubble !== null && selectedUser && (
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black border-2 rounded-2xl overflow-hidden"
                          style={{ borderColor: PERSONALITY_CONFIG[selectedUser.personality].color }}
                        >
                          {/* Card Header */}
                          <div className="relative p-6 border-b"
                            style={{ 
                              borderColor: `${PERSONALITY_CONFIG[selectedUser.personality].color}30`,
                              background: `linear-gradient(135deg, ${PERSONALITY_CONFIG[selectedUser.personality].bgGlow}, transparent)`
                            }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <motion.div 
                                  className="text-5xl"
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                  {selectedUser.avatar}
                                </motion.div>
                                <div>
                                  <div className="text-white font-semibold text-xl">{selectedUser.name}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${PERSONALITY_CONFIG[selectedUser.personality].gradient} text-white flex items-center gap-1`}>
                                      <span>{PERSONALITY_CONFIG[selectedUser.personality].emoji}</span>
                                      <span>{PERSONALITY_CONFIG[selectedUser.personality].label}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">{selectedUser.distanceLabel}</div>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedBubble(null)}
                                className="text-gray-400 hover:text-white transition-colors p-1"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Compatibility Meter */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                <span>Compatibility Match</span>
                                <motion.span 
                                  className="font-bold"
                                  style={{ color: PERSONALITY_CONFIG[selectedUser.personality].color }}
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                >
                                  {selectedUser.compatibility}%
                                </motion.span>
                              </div>
                              <div className="h-2.5 bg-black/50 rounded-full overflow-hidden border border-gray-800">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ 
                                    background: `linear-gradient(90deg, ${PERSONALITY_CONFIG[selectedUser.personality].color}, ${PERSONALITY_CONFIG[selectedUser.personality].color}dd)`
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${selectedUser.compatibility}%` }}
                                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                />
                              </div>
                            </div>

                            {/* Match Reason */}
                            <motion.div 
                              className="flex items-start gap-2 text-sm text-gray-300 bg-black/40 rounded-lg p-3 border border-white/5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Sparkles className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                              <span>{selectedUser.matchReason}</span>
                            </motion.div>
                          </div>

                          {/* Card Body */}
                          <div className="p-6">
                            <motion.div 
                              className="mb-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                                <span>About</span>
                              </div>
                              <div className="text-sm text-gray-300 leading-relaxed">{selectedUser.bio}</div>
                            </motion.div>

                            <motion.div 
                              className="mb-6"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="text-xs text-gray-400 mb-3">Shared Interests</div>
                              <div className="flex flex-wrap gap-2">
                                {selectedUser.interests.map((interest, i) => (
                                  <motion.div 
                                    key={i} 
                                    className="px-3 py-1.5 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-full text-xs text-[#FF7A00] hover:bg-[#FF7A00]/20 transition-colors cursor-default"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {interest}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>

                            {/* Wave Button */}
                            <motion.button
                              onClick={() => handleWave(selectedUser.id)}
                              className="w-full py-4 bg-gradient-to-r from-[#FF7A00] to-orange-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF7A00]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={{ scale: selectedUser.waveStatus === 'sent' ? 1 : 1.02 }}
                              whileTap={{ scale: selectedUser.waveStatus === 'sent' ? 1 : 0.98 }}
                              disabled={selectedUser.waveStatus === 'sent'}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              {selectedUser.waveStatus === 'sent' ? (
                                <>
                                  <Check className="w-5 h-5" />
                                  <span>Wave Sent</span>
                                </>
                              ) : (
                                <>
                                  <Zap className="w-5 h-5" />
                                  <span>Send Wave</span>
                                </>
                              )}
                            </motion.button>

                            <div className="text-xs text-gray-500 text-center mt-3">
                              Both need to wave for mutual connection
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mutual Wave State */}
                  <AnimatePresence>
                    {mutualWaveUser !== null && mutualUser && (
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="max-w-md mx-auto bg-gradient-to-br from-green-900/20 to-black border-2 border-green-500 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20">
                          {/* Mutual Wave Header */}
                          <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-transparent border-b border-green-500/30">
                            <div className="flex items-center justify-center gap-2 mb-4">
                              <motion.div
                                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                              >
                                <Zap className="w-7 h-7 text-green-400" />
                              </motion.div>
                              <span className="text-white font-bold text-xl">Mutual Wave!</span>
                              <motion.div
                                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.3 }}
                              >
                                <Zap className="w-7 h-7 text-green-400" />
                              </motion.div>
                            </div>

                            <div className="flex items-center gap-4 justify-center">
                              <div className="text-4xl">
                                {mutualUser.avatar}
                              </div>
                              <div className="text-center">
                                <div className="text-white font-semibold text-lg">{mutualUser.name}</div>
                                <div className="text-sm text-gray-400">wants to connect</div>
                              </div>
                            </div>
                          </div>

                          {/* Proximity Ring Meter */}
                          <div className="p-6">
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Finding each other...</span>
                                <motion.span 
                                  className="text-sm font-semibold"
                                  style={{ 
                                    color: proximityDistance <= 2 ? '#10b981' : proximityDistance <= 5 ? '#FF7A00' : '#6b7280'
                                  }}
                                  key={Math.floor(proximityDistance)}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {getDistanceBand()}
                                </motion.span>
                              </div>

                              {/* Circular Progress Ring */}
                              <div className="relative w-56 h-56 mx-auto">
                                <svg className="w-full h-full transform -rotate-90">
                                  {/* Background ring */}
                                  <circle
                                    cx="112"
                                    cy="112"
                                    r="100"
                                    fill="none"
                                    stroke="#1f1f1f"
                                    strokeWidth="12"
                                  />
                                  {/* Progress ring */}
                                  <motion.circle
                                    cx="112"
                                    cy="112"
                                    r="100"
                                    fill="none"
                                    stroke="url(#proximityGradient)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 100}`}
                                    animate={{ 
                                      strokeDashoffset: 2 * Math.PI * 100 * (1 - getProximityProgress() / 100)
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                  />
                                  <defs>
                                    <linearGradient id="proximityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#FF7A00" />
                                      <stop offset="50%" stopColor="#fbbf24" />
                                      <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                  </defs>
                                </svg>

                                {/* Center content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <div className="text-5xl mb-2">
                                    {proximityDistance <= 2 ? '🎯' : proximityDistance <= 5 ? '📍' : '🔍'}
                                  </div>
                                  <div className="text-3xl font-bold text-white">{Math.round(proximityDistance * 10) / 10}m</div>
                                  <div className="text-xs text-gray-400 mt-1.5">
                                    {proximityDistance <= 1 ? '🔥 Almost there!' : 
                                     proximityDistance <= 2 ? '✨ Very close!' : 
                                     proximityDistance <= 5 ? '👀 Getting closer' : 
                                     '🚶 Keep moving'}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Meet Code */}
                            <div className="mb-6">
                              <div className="text-xs text-gray-400 text-center mb-3">
                                Show this code to find each other
                              </div>
                              <div className="bg-gradient-to-br from-[#FF7A00] to-orange-600 rounded-2xl p-6 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,122,0,0.5)]">
                                <motion.div 
                                  className="text-5xl mb-3 flex items-center justify-center gap-2"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <span>{meetCode?.icon}</span>
                                  <span>{meetCode?.shape}</span>
                                </motion.div>
                                <div className="text-4xl font-bold text-white tracking-widest drop-shadow-lg">
                                  {meetCode?.code}
                                </div>
                                <div className="text-xs text-orange-100 mt-2 opacity-90">
                                  Look for someone showing this code on Proxima
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                              <motion.button
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/50 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Check className="w-5 h-5" />
                                <span>Found Them!</span>
                              </motion.button>
                              <button
                                onClick={handleCancelMutualWave}
                                className="w-full py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 font-semibold flex items-center justify-center gap-2 hover:bg-gray-700/50 transition-all"
                              >
                                <X className="w-5 h-5" />
                                <span>Cancel Connection</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* HIGH-DENSITY MODE */}
              {viewMode === 'high-density' && (
                <motion.div
                  key="high-density-mode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Radar Circle with Clusters */}
                  <div className="relative w-full max-w-2xl mx-auto aspect-square mb-8">
                    <svg className="w-full h-full" viewBox="0 0 600 600">
                      <defs>
                        {/* Particle glow filters */}
                        <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
                          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1" />
                        </filter>
                        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                        </filter>
                        <radialGradient id="userGradient">
                          <stop offset="0%" stopColor="#FF7A00" />
                          <stop offset="100%" stopColor="#ff9933" />
                        </radialGradient>
                        {/* Density-based gradients - heatmap colors */}
                        <radialGradient id="lowDensity">
                          <stop offset="0%" stopColor="rgba(139, 92, 246, 1)" />
                          <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                        </radialGradient>
                        <radialGradient id="medDensity">
                          <stop offset="0%" stopColor="rgba(236, 72, 153, 1)" />
                          <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                        </radialGradient>
                        <radialGradient id="highDensity">
                          <stop offset="0%" stopColor="rgba(255, 122, 0, 1)" />
                          <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
                        </radialGradient>
                      </defs>

                      {/* Distance Rings */}
                      {[270, 180, 90].map((r, i) => (
                        <circle
                          key={r}
                          cx="300"
                          cy="300"
                          r={r}
                          fill="none"
                          stroke="#FF7A00"
                          strokeWidth="1.5"
                          opacity="0.2"
                        />
                      ))}

                      {/* Center - User */}
                      <circle cx="300" cy="300" r="12" fill="url(#userGradient)" />

                      {/* Particle-Based Density Clusters - Realistic 25m radius visualization */}
                      <AnimatePresence>
                        {densityClusters.map((cluster, clusterIndex) => {
                          const centerX = (cluster.x / 100) * 600;
                          const centerY = (cluster.y / 100) * 600;
                          
                          // Fog of Activity Mode - Density-based visualization
                          const densityLevel = cluster.count >= 15 ? 'high' : cluster.count >= 12 ? 'medium' : 'low';
                          
                          // Color scheme based on density
                          const colorScheme = {
                            high: { 
                              primary: 'rgba(255, 122, 0, 0.55)', // Deep amber
                              secondary: 'rgba(255, 140, 50, 0.35)',
                              glow: '#FF7A00',
                              label: 'Very Busy Zone',
                              border: '#FF7A00'
                            },
                            medium: { 
                              primary: 'rgba(236, 72, 153, 0.50)', // Mid orange/pink
                              secondary: 'rgba(246, 100, 170, 0.30)',
                              glow: '#ec4899',
                              label: 'High Activity',
                              border: '#ec4899'
                            },
                            low: { 
                              primary: 'rgba(139, 92, 246, 0.45)', // Light orange/purple
                              secondary: 'rgba(160, 120, 250, 0.25)',
                              glow: '#8b5cf6',
                              label: 'Active Crowd',
                              border: '#8b5cf6'
                            }
                          }[densityLevel];
                          
                          return (
                            <g key={cluster.id}>
                              {/* LAYER 1: Underlying Heatmap (Soft gradient floor) */}
                              <motion.ellipse
                                cx={centerX}
                                cy={centerY}
                                rx={cluster.size * 1.3}
                                ry={cluster.size * 1.1}
                                fill={colorScheme.secondary}
                                opacity={0.25}
                                filter="url(#softBlur)"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                  opacity: [0.25, 0.35, 0.25],
                                  scale: 1
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                  scale: { duration: 0.8, delay: clusterIndex * 0.1 }
                                }}
                              />
                              
                              {/* LAYER 2: Main Cluster Bubble (Breathing blob) */}
                              <motion.circle
                                cx={centerX}
                                cy={centerY}
                                r={cluster.size * 0.85}
                                fill={colorScheme.primary}
                                opacity={0.6}
                                filter="url(#softBlur)"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: [0.6, 0.75, 0.6],
                                  scale: 1,
                                  r: [cluster.size * 0.85, cluster.size * 0.95, cluster.size * 0.85]
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ 
                                  opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                                  scale: { duration: 0.7, delay: clusterIndex * 0.1 },
                                  r: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                                }}
                              />
                              
                              {/* LAYER 3: Outer Glow Ring (2-4px intensity indicator) */}
                              <motion.circle
                                cx={centerX}
                                cy={centerY}
                                r={cluster.size * 0.9}
                                fill="none"
                                stroke={colorScheme.glow}
                                strokeWidth="3"
                                opacity={0.5}
                                filter="url(#particleGlow)"
                                initial={{ opacity: 0, r: cluster.size * 0.5 }}
                                animate={{
                                  opacity: [0.5, 0.8, 0.5],
                                  r: cluster.size * 0.9
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                  opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
                                  r: { duration: 0.7, delay: clusterIndex * 0.1 }
                                }}
                              />
                              
                              {/* LAYER 4: Ambient Radar Pulse (Ripple animation) */}
                              <motion.circle
                                cx={centerX}
                                cy={centerY}
                                r={cluster.size * 0.3}
                                fill="none"
                                stroke={colorScheme.glow}
                                strokeWidth="1.5"
                                opacity={0}
                                initial={{ r: cluster.size * 0.3, opacity: 0 }}
                                animate={{
                                  r: cluster.size * 1.5,
                                  opacity: [0, 0.6, 0]
                                }}
                                transition={{ 
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                  delay: clusterIndex * 0.8
                                }}
                              />
                              
                              {/* LAYER 5: Central Hotspot (Pulsing core) */}
                              <motion.circle
                                cx={centerX}
                                cy={centerY}
                                r={cluster.size * 0.28}
                                fill={colorScheme.glow}
                                opacity={0.7}
                                filter="url(#particleGlow)"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: [0.7, 0.95, 0.7],
                                  scale: 1
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ 
                                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                                  scale: { duration: 0.6, delay: clusterIndex * 0.1 }
                                }}
                              />

                              {/* Interactive overlay - clickable area */}
                              <circle
                                cx={centerX}
                                cy={centerY}
                                r={cluster.size * 1.1}
                                fill="transparent"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedCluster(cluster.id);
                                  setClusterPersonalityFilter(null);
                                }}
                              />

                              {/* Reinforcement Label (Activity descriptor) */}
                              <foreignObject
                                x={centerX - 60}
                                y={centerY - 60}
                                width="120"
                                height="60"
                                className="pointer-events-none"
                              >
                                <div className="flex flex-col items-center justify-center h-full">
                                  <motion.div 
                                    className="bg-black/95 border-2 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 backdrop-blur-md text-center transition-all pointer-events-auto shadow-2xl"
                                    style={{ 
                                      borderColor: colorScheme.border,
                                      boxShadow: `0 0 20px ${colorScheme.glow}50, 0 4px 15px rgba(0,0,0,0.5)`
                                    }}
                                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                    transition={{ 
                                      duration: 0.5, 
                                      delay: clusterIndex * 0.15 + 0.5,
                                      type: "spring",
                                      stiffness: 200
                                    }}
                                    whileHover={{ 
                                      scale: 1.1, 
                                      boxShadow: `0 0 30px ${colorScheme.glow}70, 0 6px 20px rgba(0,0,0,0.6)`,
                                      borderColor: colorScheme.glow
                                    }}
                                    onClick={() => {
                                      setSelectedCluster(cluster.id);
                                      setClusterPersonalityFilter(null);
                                    }}
                                  >
                                    <div className="text-white font-bold text-[10px] sm:text-xs md:text-sm leading-tight">
                                      {colorScheme.label}
                                    </div>
                                    <div 
                                      className="text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 font-semibold opacity-95"
                                      style={{ color: colorScheme.glow }}
                                    >
                                      {cluster.count} nearby
                                    </div>
                                  </motion.div>
                                </div>
                              </foreignObject>
                            </g>
                          );
                        })}
                      </AnimatePresence>
                    </svg>

                    {/* Header */}
                    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-black/90 border-2 border-purple-500 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-white font-semibold text-xs sm:text-sm md:text-base">High-Density Cluster Mode</span>
                      </div>
                    </div>

                    {/* Total count */}
                    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 bg-black/90 border border-purple-500/50 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl text-purple-400 font-bold">~40-60</div>
                        <div className="text-[10px] sm:text-xs text-gray-400">People in range</div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Cluster Detail Panel */}
                  <AnimatePresence>
                    {selectedCluster && CLUSTER_DETAILS[selectedCluster as keyof typeof CLUSTER_DETAILS] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="mt-8 max-w-4xl mx-auto"
                      >
                        {(() => {
                          const clusterData = CLUSTER_DETAILS[selectedCluster as keyof typeof CLUSTER_DETAILS];
                          const filteredProfiles = clusterData.topMatches
                            .map(id => EXTENDED_USER_POOL.find(u => u.id === id))
                            .filter((u): u is typeof EXTENDED_USER_POOL[0] => u !== undefined)
                            .filter(u => !clusterPersonalityFilter || u.personality === clusterPersonalityFilter);

                          return (
                            <div className="bg-gradient-to-br from-purple-950/40 via-gray-900/60 to-black border-2 border-purple-500/50 rounded-2xl overflow-hidden backdrop-blur-xl">
                              {/* Header */}
                              <div className="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-3 sm:p-4 md:p-6 border-b border-purple-500/30">
                                <motion.button
                                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
                                  onClick={() => setSelectedCluster(null)}
                                  whileHover={{ scale: 1.1, rotate: 90 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </motion.button>

                                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 pr-8">
                                  <div className="p-2 sm:p-2.5 md:p-3 bg-purple-500/20 rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                                    <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{clusterData.name}</h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                                      <div className="flex items-center gap-1 sm:gap-1.5 text-purple-300">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="truncate">{clusterData.location}</span>
                                      </div>
                                      <div className="flex items-center gap-1 sm:gap-1.5 text-blue-300">
                                        <Radio className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="whitespace-nowrap">{clusterData.avgDistance} away</span>
                                      </div>
                                      <div className="flex items-center gap-1 sm:gap-1.5 text-green-300">
                                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="whitespace-nowrap">{clusterData.totalPeople} people</span>
                                      </div>
                                    </div>
                                    <p className="text-gray-300 mt-2 sm:mt-3 text-xs sm:text-sm italic line-clamp-2">"{clusterData.vibe}"</p>
                                    <p className="text-gray-400 mt-1 text-[10px] sm:text-xs">📅 Peak: {clusterData.peakTimes}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Personality Breakdown */}
                              <div className="p-3 sm:p-4 md:p-6 border-b border-purple-500/20">
                                <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                  Personality Mix
                                </h4>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                                  {(Object.entries(clusterData.personalities) as [keyof typeof PERSONALITY_CONFIG, number][]).map(([type, percentage]) => {
                                    const config = PERSONALITY_CONFIG[type];
                                    const isActive = clusterPersonalityFilter === type;
                                    const PersonalityIcon = config.icon;

                                    return (
                                      <motion.button
                                        key={type}
                                        onClick={() => setClusterPersonalityFilter(isActive ? null : type)}
                                        className={`relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                                          isActive 
                                            ? 'border-[#FF7A00] bg-gradient-to-br from-[#FF7A00]/20 to-[#FF7A00]/5' 
                                            : 'border-gray-700 hover:border-gray-500 bg-gray-900/50'
                                        }`}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        {isActive && (
                                          <motion.div
                                            className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-[#FF7A00] rounded-full p-0.5 sm:p-1"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                          >
                                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                                          </motion.div>
                                        )}
                                        <PersonalityIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 sm:mb-2" style={{ color: config.color }} />
                                        <div className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1" style={{ color: config.color }}>
                                          {percentage}%
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-gray-400 truncate">{config.emoji} {config.label}</div>
                                      </motion.button>
                                    );
                                  })}
                                </div>
                                {clusterPersonalityFilter && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg"
                                  >
                                    <p className="text-xs sm:text-sm text-gray-300">
                                      Filtering by <span className="text-[#FF7A00] font-semibold">{PERSONALITY_CONFIG[clusterPersonalityFilter as keyof typeof PERSONALITY_CONFIG].label}</span> personalities • {filteredProfiles.length} matches
                                    </p>
                                  </motion.div>
                                )}
                              </div>

                              {/* People in Cluster */}
                              <div className="p-3 sm:p-4 md:p-6">
                                <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center justify-between text-sm sm:text-base">
                                  <span className="flex items-center gap-1.5 sm:gap-2">
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                                    <span className="truncate">{clusterPersonalityFilter ? 'Filtered Matches' : 'Top Matches in Cluster'}</span>
                                  </span>
                                  <span className="text-xs sm:text-sm text-gray-400 shrink-0">{filteredProfiles.length} people</span>
                                </h4>

                                <div className="grid md:grid-cols-2 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                                    {filteredProfiles.map((user, index) => {
                                      const config = PERSONALITY_CONFIG[user.personality];
                                      const PersonalityIcon = config.icon;

                                      return (
                                        <div
                                          key={user.id}
                                          className="bg-gradient-to-br from-gray-900 to-black border rounded-xl p-3 sm:p-4 hover:border-[#FF7A00] transition-all group cursor-pointer"
                                          style={{ borderColor: `${config.color}40` }}
                                          onClick={() => {
                                            setSelectedBubble(user.id);
                                          }}
                                        >
                                          {/* Profile Header */}
                                          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="text-2xl sm:text-3xl md:text-4xl">
                                              {user.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-center justify-between mb-1">
                                                <h5 className="text-white font-semibold truncate text-sm sm:text-base">{user.name}</h5>
                                                <div 
                                                  className="text-base sm:text-lg md:text-xl font-bold shrink-0 ml-2"
                                                  style={{ color: config.color }}
                                                >
                                                  {user.compatibility}%
                                                </div>
                                              </div>
                                              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-gradient-to-r ${config.gradient} text-white`}>
                                                <span>{config.emoji}</span>
                                                <span className="truncate">{config.label}</span>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Bio */}
                                          <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{user.bio}</p>

                                          {/* Interests */}
                                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                                            {user.interests.slice(0, 3).map((interest, i) => (
                                              <span
                                                key={i}
                                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800/50 rounded-md text-[10px] sm:text-xs text-gray-300 truncate"
                                              >
                                                {interest}
                                              </span>
                                            ))}
                                            {user.interests.length > 3 && (
                                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800/50 rounded-md text-[10px] sm:text-xs text-gray-500">
                                                +{user.interests.length - 3}
                                              </span>
                                            )}
                                          </div>

                                          {/* Match Reason */}
                                          <div className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-purple-950/30 rounded-lg border border-purple-500/20">
                                            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 shrink-0 mt-0.5" />
                                            <p className="text-[10px] sm:text-xs text-gray-300 italic line-clamp-2">{user.matchReason}</p>
                                          </div>

                                          {/* Action Hint */}
                                          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-800 hidden sm:flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs text-gray-500">Tap to view & wave</span>
                                            <ArrowRight className="w-4 h-4 text-[#FF7A00]" />
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>

                                {/* Footer Actions */}
                                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-purple-500/20 flex justify-end">
                                  <button
                                    className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
                                    onClick={() => setSelectedCluster(null)}
                                  >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Close</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Top Matches Stack */}
                  <div className="max-w-md mx-auto">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-white font-semibold text-lg">Top Matches in Crowd</h4>
                      <div className="text-xs text-gray-400">By compatibility</div>
                    </div>

                    <div className="space-y-3">
                      {USER_POOL.slice(0, 5).sort((a, b) => b.compatibility - a.compatibility).map((user, index) => {
                        const PersonalityIcon = PERSONALITY_CONFIG[user.personality].icon;
                        const personalityColor = PERSONALITY_CONFIG[user.personality].color;
                        const personalityGradient = PERSONALITY_CONFIG[user.personality].gradient;
                        const personalityEmoji = PERSONALITY_CONFIG[user.personality].emoji;
                        const distanceBands = ['Very close', 'Close', 'Nearby'];
                        const stableDistance = distanceBands[index % 3]; // Stable assignment

                        return (
                          <button
                            key={user.id}
                            className="w-full bg-gradient-to-br from-gray-900 to-black border rounded-xl p-4 hover:border-[#FF7A00] transition-all text-left group"
                            style={{ borderColor: `${personalityColor}40` }}
                            onClick={() => setSelectedBubble(user.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-3xl">
                                  {user.avatar}
                                </div>
                                <div>
                                  <div className="text-white font-semibold mb-1.5">{user.name}</div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <div className={`px-2 py-0.5 rounded-full text-xs bg-gradient-to-r ${personalityGradient} text-white flex items-center gap-1`}>
                                      <span>{personalityEmoji}</span>
                                      <span>{PERSONALITY_CONFIG[user.personality].label}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {stableDistance}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-2xl font-bold" style={{ color: personalityColor }}>
                                    {user.compatibility}%
                                  </div>
                                  <div className="text-xs text-gray-500">match</div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#FF7A00] transition-colors" />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                      Tap any match to view on radar and send wave
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Privacy Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Shield,
              title: 'No Exact Tracking',
              description: 'Distance bands only—no GPS pins, no compass hints, no "2 o\'clock" directions',
              color: '#10b981'
            },
            {
              icon: Eye,
              title: 'Instant Stealth Mode',
              description: 'Go invisible anytime with one tap. Your bubble collapses—nobody can see you',
              color: '#8b5cf6'
            },
            {
              icon: Radio,
              title: 'Human Handshake',
              description: 'Meet codes work everywhere—tube stations, concerts, cafes. No maps needed',
              color: '#FF7A00'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border-2 rounded-xl p-6 text-center group hover:scale-105 transition-transform"
              style={{ borderColor: `${feature.color}40` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ borderColor: feature.color }}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4" style={{ color: feature.color }} />
              </motion.div>
              <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Stealth Button */}
        <motion.button
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
          onClick={toggleStealthMode}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isStealthMode ? "Go Visible" : "Go Stealth"}
        >
          <AnimatePresence mode="wait">
            {isStealthMode ? (
              <motion.div
                key="visible"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <Eye className="w-7 h-7 text-[#FF7A00]" />
              </motion.div>
            ) : (
              <motion.div
                key="stealth"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <EyeOff className="w-7 h-7 text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black/90 border border-gray-600 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {isStealthMode ? "Go Visible" : "Go Stealth"}
          </div>
        </motion.button>
      </div>
    </section>
  );
}
