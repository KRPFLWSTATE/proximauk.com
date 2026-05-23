import { useState, useEffect, memo, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomPieChart } from './charts/CustomPieChart';
import { CustomBarChart } from './charts/CustomBarChart';
import { CustomLineChart } from './charts/CustomLineChart';
import { CustomAreaChart } from './charts/CustomAreaChart';
import { CustomRadarChart } from './charts/CustomRadarChart';
import {
  MapPin, Users, TrendingUp, Bell, Zap, Brain, Star, MessageSquare,
  Shield, Trophy, UserCheck, Repeat, Navigation, Hand, Mic, Database,
  Settings, BarChart3, Activity, Clock, Target, AlertCircle, Check,
  X, Send, Edit, Download, Eye, ChevronRight, Coffee, Play, Pause, Medal,
  Maximize2, Minimize2, RefreshCw, Info, DollarSign, Filter, TrendingDown,
  Share2, Save, Upload, FileText, PieChart as PieIcon, Globe, Calendar,
  Heart, DoorOpen, ShieldCheck, Clipboard, Briefcase, UserCog, Smile,
  Frown, Meh, Thermometer, Lock, Unlock, MessageCircle, ArrowUp, ArrowDown,
  Layers, Sparkles, LineChart as LineChartIcon, Award, Flame, Cloud, Sun,
  Moon, Wifi, Battery, Signal, ChevronDown, ChevronUp, MoreHorizontal,
  BarChart2, PieChart, Percent, Hash, TrendingDown as TrendDown, Lightbulb,
  AlertTriangle, CheckCircle, XCircle, MinusCircle, Search, SlidersHorizontal,
  ArrowRight, ExternalLink, Copy, GitCompare, Layers2, SplitSquareHorizontal,
  Store, Image as ImageIcon, Phone, Mail, Link as LinkIcon, Tag
} from 'lucide-react';
import {
  COLORS,
  trafficData,
  dwellTimeData,
  sentimentData,
  intentMixData,
  comfortTrendsData,
  socialImpactData,
  vibeRadarData,
  predictiveTrafficData,
  benchmarkData,
  abTestCampaigns,
  journeyData,
  cohortData,
  demographicData,
  heatmapData,
  revenueSourceData,
  sentimentTopics,
  churnRiskUsers,
  opportunities,
  safetyIncidents
} from '../data/mockDashboardData';

const ZonesBusinessDashboardComponent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLive, setIsLive] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [notificationText, setNotificationText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeUsers, setActiveUsers] = useState(47);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [featuredZone, setFeaturedZone] = useState(false);
  const [safeAlerts, setSafeAlerts] = useState(0);
  const [loyaltyActive, setLoyaltyActive] = useState(true);
  const [hostMode, setHostMode] = useState(false);
  const [microEvents, setMicroEvents] = useState<any[]>([]);
  const [selectedHeatmapView, setSelectedHeatmapView] = useState('24h');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [revenue, setRevenue] = useState(2847);
  const [showSettings, setShowSettings] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [exportFormat, setExportFormat] = useState('pdf');
  
  // NEW STATES for missing features
  const [venueVibe, setVenueVibe] = useState<'calm' | 'warm' | 'professional' | 'energetic'>('warm');
  const [vibeScore, setVibeScore] = useState(78);
  const [hostAIActive, setHostAIActive] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [contextCardsActive, setContextCardsActive] = useState(true);
  const [safetyCertified, setSafetyCertified] = useState(true);
  const [venueShieldActive, setVenueShieldActive] = useState(true);
  const [communityProposals, setCommunityProposals] = useState<any[]>([
    { id: 1, text: 'Weekly trivia nights', votes: 23, status: 'pending' },
    { id: 2, text: 'Board game library', votes: 18, status: 'pending' },
    { id: 3, text: 'Live acoustic music Fridays', votes: 31, status: 'approved' }
  ]);
  const [walkByData, setWalkByData] = useState({ approached: 156, entered: 89, conversion: 57 });
  const [comfortScore, setComfortScore] = useState(86);
  
  // ENTERPRISE-LEVEL STATES
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [compareMode, setCompareMode] = useState(false);
  const [isDashboardInView, setIsDashboardInView] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [drillDownView, setDrillDownView] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState(false);
  const [predictiveView, setPredictiveView] = useState(false);
  const [benchmarkMode, setBenchmarkMode] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [abTestActive, setAbTestActive] = useState(false);
  const [segmentView, setSegmentView] = useState<'all' | 'new' | 'returning' | 'vip'>('all');
  const [performanceScore, setPerformanceScore] = useState(87);
  const [npsScore, setNpsScore] = useState(68);
  const [churnRisk, setChurnRisk] = useState(12);
  const [lifetimeValue, setLifetimeValue] = useState(284);
  const [competitorView, setCompetitorView] = useState(false);
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const [insightsPanelOpen, setInsightsPanelOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // BUSINESS PROFILE STATES
  const [businessName, setBusinessName] = useState('Tech Hub Café');
  const [businessBio, setBusinessBio] = useState('A vibrant tech-friendly café in the heart of Shoreditch, perfect for remote work, networking, and creative collaboration.');
  const [businessDescription, setBusinessDescription] = useState('We offer premium coffee, high-speed WiFi, and a welcoming atmosphere for professionals, creatives, and students. Our space features comfortable seating, power outlets at every table, and a rotating menu of specialty drinks and fresh pastries.');
  const [businessCategory, setBusinessCategory] = useState('Café & Coworking');
  const [businessPhone, setBusinessPhone] = useState('+44 20 7946 0958');
  const [businessEmail, setBusinessEmail] = useState('hello@techhubcafe.com');
  const [businessWebsite, setBusinessWebsite] = useState('www.techhubcafe.com');
  const [businessInstagram, setBusinessInstagram] = useState('@techhubcafe');
  const [businessTwitter, setBusinessTwitter] = useState('@techhubcafe');
  const [businessAddress, setBusinessAddress] = useState('42 Shoreditch High Street, London E1 6JE');
  const [businessTags, setBusinessTags] = useState(['Coffee', 'WiFi', 'Coworking', 'Remote Work', 'Pet Friendly']);
  const [businessAmenities, setBusinessAmenities] = useState([
    { id: 1, name: 'High-Speed WiFi', icon: 'Wifi', enabled: true },
    { id: 2, name: 'Power Outlets', icon: 'Battery', enabled: true },
    { id: 3, name: 'Outdoor Seating', icon: 'Sun', enabled: true },
    { id: 4, name: 'Pet Friendly', icon: 'Heart', enabled: true },
    { id: 5, name: 'Wheelchair Accessible', icon: 'DoorOpen', enabled: true },
    { id: 6, name: 'Vegan Options', icon: 'Coffee', enabled: true }
  ]);
  const [businessHours, setBusinessHours] = useState([
    { day: 'Monday', open: '07:00', close: '22:00', closed: false },
    { day: 'Tuesday', open: '07:00', close: '22:00', closed: false },
    { day: 'Wednesday', open: '07:00', close: '22:00', closed: false },
    { day: 'Thursday', open: '07:00', close: '22:00', closed: false },
    { day: 'Friday', open: '07:00', close: '23:00', closed: false },
    { day: 'Saturday', open: '08:00', close: '23:00', closed: false },
    { day: 'Sunday', open: '08:00', close: '21:00', closed: false }
  ]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400');
  const [coverImageUrl, setCoverImageUrl] = useState('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800');
  const [profileSaved, setProfileSaved] = useState(false);

  // ZONE CHAT & VOICE STATES
  const [chatMessage, setChatMessage] = useState('');
  const [selectedVoiceChannel, setSelectedVoiceChannel] = useState<number | null>(null);
  const [hostToolsOpen, setHostToolsOpen] = useState(false);
  const [offerText, setOfferText] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [voiceChannelUsers, setVoiceChannelUsers] = useState<any>({
    1: [
      { id: 1, name: 'Sarah Chen', speaking: false, host: false, avatar: '👩‍💼' },
      { id: 2, name: 'Marcus Rodriguez', speaking: true, host: false, avatar: '👨‍🎨' },
      { id: 3, name: 'Emma Wilson', speaking: false, host: true, avatar: '👩‍🦰' }
    ],
    2: [
      { id: 4, name: 'Alex Turner', speaking: false, host: false, avatar: '👨‍💻' },
      { id: 5, name: 'Priya Patel', speaking: true, host: false, avatar: '👩‍🔬' }
    ],
    3: []
  });
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'user',
      user: 'Sarah Chen',
      avatar: '👩‍💼',
      text: 'Just arrived! Love the vibe here today ☕',
      timestamp: '10:24 AM',
      host: false
    },
    {
      id: 2,
      type: 'user',
      user: 'Marcus Rodriguez',
      avatar: '👨‍🎨',
      text: 'Anyone up for a quick coffee chat? Working on a design project',
      timestamp: '10:28 AM',
      host: false
    },
    {
      id: 3,
      type: 'system',
      text: '🎯 Micro-Event: "Coffee Tasting" starting in 15 minutes!',
      timestamp: '10:30 AM'
    },
    {
      id: 4,
      type: 'host',
      user: 'Emma Wilson',
      avatar: '👩‍🦰',
      text: 'Hey everyone! 👋 We\'re hosting a latte art demo at 11am - join us at the main counter!',
      timestamp: '10:32 AM',
      host: true
    },
    {
      id: 5,
      type: 'offer',
      title: '🔥 Flash Offer',
      text: '25% off all specialty drinks for the next hour!',
      code: 'FLASH25',
      timestamp: '10:35 AM'
    },
    {
      id: 6,
      type: 'user',
      user: 'Alex Turner',
      avatar: '👨‍💻',
      text: 'Perfect timing! Getting another cappuccino',
      timestamp: '10:36 AM',
      host: false
    },
    {
      id: 7,
      type: 'user',
      user: 'Priya Patel',
      avatar: '👩‍🔬',
      text: 'This is my favorite workspace in London! 💙',
      timestamp: '10:41 AM',
      host: false
    },
    {
      id: 8,
      type: 'event',
      title: '📅 Upcoming Event',
      text: 'Founders Roundtable - Thursday 6:15pm',
      attendees: 12,
      timestamp: '10:45 AM'
    }
  ]);
  const [messageIdCounter, setMessageIdCounter] = useState(9);

  // LIVE ZONE VISUALIZATION STATES - GDPR Compliant Density Data
  const [zoneUsers, setZoneUsers] = useState<any[]>([]);
  const [zoneRadius] = useState(180);
  const [zoneUserCount, setZoneUserCount] = useState(0);
  
  // Density areas instead of individual tracking
  const [densityAreas] = useState([
    { id: 1, name: 'Main Seating', x: 35, y: 40, minCount: 8, maxCount: 12, intensity: 0.8, color: '#FF7A00' },
    { id: 2, name: 'Bar Area', x: 65, y: 30, minCount: 3, maxCount: 5, intensity: 0.5, color: '#10b981' },
    { id: 3, name: 'Counter Zone', x: 50, y: 65, minCount: 5, maxCount: 10, intensity: 0.7, color: '#3b82f6' },
    { id: 4, name: 'Entry Area', x: 30, y: 70, minCount: 0, maxCount: 2, intensity: 0.2, color: '#a855f7' }
  ]);

  // Viewport detection for dashboard
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDashboardInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (dashboardRef.current) {
      observer.observe(dashboardRef.current);
    }

    return () => {
      if (dashboardRef.current) {
        observer.unobserve(dashboardRef.current);
      }
    };
  }, []);

  // CONSOLIDATED: Simulate all live updates in single interval - only when visible
  useEffect(() => {
    if (isLive && autoRefresh && isDashboardInView) {
      let tickCount = 0;
      const interval = setInterval(() => {
        tickCount++;
        
        // Update metrics every tick (3 seconds)
        setActiveUsers(prev => Math.max(10, prev + Math.floor(Math.random() * 5) - 2));
        setRevenue(prev => prev + Math.floor(Math.random() * 50));
        setVibeScore(prev => Math.max(60, Math.min(95, prev + Math.floor(Math.random() * 6) - 3)));
        setComfortScore(prev => Math.max(75, Math.min(98, prev + Math.floor(Math.random() * 4) - 2)));
        
        // Update walk-by data less frequently (every 8 seconds ≈ every 2-3 ticks)
        if (tickCount % 3 === 0) {
          setWalkByData(prev => ({
            approached: prev.approached + Math.floor(Math.random() * 3),
            entered: prev.entered + Math.floor(Math.random() * 2),
            conversion: Math.round(((prev.entered + Math.floor(Math.random() * 2)) / (prev.approached + Math.floor(Math.random() * 3))) * 100)
          }));
        }
        
        // Voice activity simulation (every 5 seconds ≈ every 1-2 ticks)
        if (tickCount % 2 === 0) {
          Object.keys(voiceChannelUsers).forEach(channelId => {
            const users = voiceChannelUsers[parseInt(channelId)];
            if (users.length > 0 && Math.random() > 0.7) {
              const randomUser = users[Math.floor(Math.random() * users.length)];
              toggleUserSpeaking(parseInt(channelId), randomUser.id);
              setTimeout(() => {
                toggleUserSpeaking(parseInt(channelId), randomUser.id);
              }, 2000 + Math.random() * 3000);
            }
          });
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive, autoRefresh, isDashboardInView, voiceChannelUsers]);

  // Debug: Log when active tab changes and data availability
  useEffect(() => {
    console.log('%c🎯 ZONES DASHBOARD DEBUG', 'background: #FF7A00; color: white; font-size: 14px; padding: 5px 10px; border-radius: 5px;');
    console.log('%cActive Tab: ' + activeTab, 'color: #10b981; font-weight: bold;');
    console.log('%c📊 Chart Data Available:', 'color: #3b82f6; font-weight: bold;');
    console.table({
      'Traffic Data': trafficData.length + ' points',
      'Dwell Time Data': dwellTimeData.length + ' segments',
      'Sentiment Data': sentimentData.length + ' categories',
      'Vibe Radar Data': vibeRadarData.length + ' metrics',
      'Intent Mix Data': intentMixData.length + ' types',
      'Comfort Trends': comfortTrendsData.length + ' days',
      'Social Impact': socialImpactData.length + ' stages'
    });
    
    // List which charts should be visible on this tab
    if (activeTab === 'overview') {
      console.log('%c📈 OVERVIEW TAB - Visible Charts:', 'color: #FF7A00; font-weight: bold;');
      console.log('  ✓ Real-Time Traffic Area Chart (Orange & Green)');
      console.log('  ✓ Live Zone Activity Map');
    } else if (activeTab === 'analytics') {
      console.log('%c📊 ANALYTICS TAB - Visible Charts:', 'color: #3b82f6; font-weight: bold;');
      console.log('  ✓ Dwell Time Distribution Pie Chart (Red, Orange, Green, Blue)');
      console.log('  ✓ AI Sentiment Analysis Bar Chart (Green & Red bars)');
    } else if (activeTab === 'insights') {
      console.log('%c💡 INSIGHTS TAB - Visible Charts:', 'color: #14b8a6; font-weight: bold;');
      console.log('  ✓ Venue Vibe Index Radar Chart (Teal)');
      console.log('  ✓ Intent Mix Analytics Pie Chart (Green, Blue, Pink, Purple)');
      console.log('  ✓ Comfort Trends Line Chart (Orange & Green lines)');
    }
    
    console.log('%c✅ All charts enhanced with:', 'color: #10b981; font-weight: bold; font-size: 12px;');
    console.log('  • Visible strokes and fills');
    console.log('  • CartesianGrid for better visibility');
    console.log('  • Proper colors against dark background');
    console.log('  • Animation enabled');
    console.log('  • Labels and dots for clarity');
  }, [activeTab]);

  // Host AI suggestions
  useEffect(() => {
    if (hostAIActive && aiSuggestions.length === 0) {
      setTimeout(() => {
        setAiSuggestions([
          '🎯 Peak lunch hour approaching (11:45 AM) - Consider activating Happy Hour promo',
          '👥 15 users nearby showing professional intent - Perfect time for a networking micro-event',
          '☕ Morning crowd prefers calm atmosphere - Current vibe matches well'
        ]);
      }, 1500);
    }
  }, [hostAIActive]);
  
  // Walk-by updates now handled in consolidated interval above

  // Generate AI copy
  const generateAICopy = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const copies = [
        `✨ ${aiPrompt} - Experience the magic today!`,
        `🎉 Just announced: ${aiPrompt}. Join us!`,
        `💫 ${aiPrompt} - Limited time only!`
      ];
      setGeneratedCopy(copies);
      setIsGenerating(false);
    }, 2000);
  };

  // Send notification
  const sendNotification = () => {
    if (!notificationText) return;
    
    const newNotif = {
      id: Date.now(),
      text: notificationText,
      time: new Date().toLocaleTimeString(),
      delivered: Math.floor(Math.random() * 30) + 15,
      opened: Math.floor(Math.random() * 20) + 8
    };
    
    setNotifications(prev => [newNotif, ...prev].slice(0, 5));
    setNotificationText('');
  };

  // Create micro-event
  const createMicroEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'Live Event',
      attendees: Math.floor(Math.random() * 15) + 5,
      active: true
    };
    setMicroEvents(prev => [newEvent, ...prev].slice(0, 3));
  };

  // NEW FUNCTIONS for missing features
  const changeVenueVibe = (newVibe: 'calm' | 'warm' | 'professional' | 'energetic') => {
    setVenueVibe(newVibe);
    setVibeScore(Math.floor(Math.random() * 20) + 70);
  };

  const activateHostAI = () => {
    setHostAIActive(true);
    setAiSuggestions([]);
  };

  const voteProposal = (id: number) => {
    setCommunityProposals(prev => prev.map(p => 
      p.id === id ? { ...p, votes: p.votes + 1 } : p
    ));
  };

  const approveProposal = (id: number) => {
    setCommunityProposals(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'approved' } : p
    ));
  };

  const dismissAISuggestion = (index: number) => {
    setAiSuggestions(prev => prev.filter((_, i) => i !== index));
  };

  // ZONE CHAT & VOICE FUNCTIONS
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: messageIdCounter,
      type: 'host',
      user: 'You (Host)',
      avatar: '🏢',
      text: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      host: true
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessageIdCounter(prev => prev + 1);
    setChatMessage('');
  };

  const sendOffer = () => {
    if (!offerText.trim()) return;
    
    const newMessage = {
      id: messageIdCounter,
      type: 'offer',
      title: '🔥 Special Offer',
      text: offerText,
      code: discountCode || 'SPECIAL',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessageIdCounter(prev => prev + 1);
    setOfferText('');
    setDiscountCode('');
    setHostToolsOpen(false);
  };

  const sendDiscount = () => {
    if (!discountAmount.trim()) return;
    
    const newMessage = {
      id: messageIdCounter,
      type: 'offer',
      title: '💰 Discount Code',
      text: `${discountAmount} off - Use code at checkout!`,
      code: discountCode || `SAVE${discountAmount}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessageIdCounter(prev => prev + 1);
    setDiscountAmount('');
    setDiscountCode('');
    setHostToolsOpen(false);
  };

  const sendEvent = () => {
    if (!eventTitle.trim()) return;
    
    const newMessage = {
      id: messageIdCounter,
      type: 'event',
      title: '📅 New Event',
      text: `${eventTitle}${eventTime ? ` - ${eventTime}` : ''}`,
      attendees: 0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessageIdCounter(prev => prev + 1);
    setEventTitle('');
    setEventTime('');
    setHostToolsOpen(false);
  };

  const joinVoiceChannel = (channelId: number) => {
    setSelectedVoiceChannel(channelId);
  };

  const leaveVoiceChannel = () => {
    setSelectedVoiceChannel(null);
  };

  const toggleUserSpeaking = (channelId: number, userId: number) => {
    setVoiceChannelUsers(prev => ({
      ...prev,
      [channelId]: prev[channelId].map((user: any) => 
        user.id === userId ? { ...user, speaking: !user.speaking } : user
      )
    }));
  };

  // Voice activity now handled in consolidated interval above

  // LIVE ZONE VISUALIZATION - Initialize and animate users
  useEffect(() => {
    // Initialize users with random positions within SQUARE zone
    const initializeUsers = () => {
      const colors = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4'];
      const zoneSize = 35; // Square zone is 70 units (35 from center)
      const initialUsers = Array.from({ length: 8 }, (_, i) => {
        // Random position within square bounds
        const xOffset = (Math.random() - 0.5) * zoneSize * 2;
        const yOffset = (Math.random() - 0.5) * zoneSize * 2;
        return {
          id: i + 1,
          x: 50 + xOffset,
          y: 50 + yOffset,
          targetX: 50 + xOffset,
          targetY: 50 + yOffset,
          color: colors[i % colors.length],
          inZone: true,
          speed: 0.015 + Math.random() * 0.015 // Realistic walking speed (1.4 m/s)
        };
      });
      setZoneUsers(initialUsers);
      setZoneUserCount(initialUsers.length);
    };

    initializeUsers();
  }, []);

  // Animate users continuously with realistic movement - only when visible
  useEffect(() => {
    if (!isLive || !isDashboardInView) return;

    const animationInterval = setInterval(() => {
      setZoneUsers(prevUsers => {
        return prevUsers.map(user => {
          let { x, y, targetX, targetY, inZone, speed } = user;

          // Move towards target
          const dx = targetX - x;
          const dy = targetY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 0.5) {
            // Reached target, set new random target
            const shouldLeave = Math.random() < 0.03; // 3% chance to leave per target reach
            
            const zoneSize = 35;
            const zoneBounds = { minX: 50 - zoneSize, maxX: 50 + zoneSize, minY: 50 - zoneSize, maxY: 50 + zoneSize };
            
            if (shouldLeave && inZone) {
              // Exit through nearest edge
              const edges = [
                { x: zoneBounds.minX - 10, y: y }, // Left
                { x: zoneBounds.maxX + 10, y: y }, // Right
                { x: x, y: zoneBounds.minY - 10 }, // Top
                { x: x, y: zoneBounds.maxY + 10 }  // Bottom
              ];
              const randomExit = edges[Math.floor(Math.random() * edges.length)];
              targetX = randomExit.x;
              targetY = randomExit.y;
            } else if (!inZone && Math.random() < 0.4) {
              // Re-enter zone from edge
              const edge = Math.floor(Math.random() * 4);
              if (edge === 0) { // Enter from left
                targetX = zoneBounds.minX + 2;
                targetY = zoneBounds.minY + Math.random() * (zoneSize * 2);
              } else if (edge === 1) { // Enter from right
                targetX = zoneBounds.maxX - 2;
                targetY = zoneBounds.minY + Math.random() * (zoneSize * 2);
              } else if (edge === 2) { // Enter from top
                targetX = zoneBounds.minX + Math.random() * (zoneSize * 2);
                targetY = zoneBounds.minY + 2;
              } else { // Enter from bottom
                targetX = zoneBounds.minX + Math.random() * (zoneSize * 2);
                targetY = zoneBounds.maxY - 2;
              }
            } else {
              // New target within current area (wander)
              if (inZone) {
                targetX = zoneBounds.minX + Math.random() * (zoneSize * 2);
                targetY = zoneBounds.minY + Math.random() * (zoneSize * 2);
              } else {
                // Wander outside or move further away
                const moveAway = Math.random() < 0.5;
                if (moveAway) {
                  if (x < 50) targetX = Math.max(5, x - 10);
                  else targetX = Math.min(95, x + 10);
                  if (y < 50) targetY = Math.max(5, y - 10);
                  else targetY = Math.min(95, y + 10);
                } else {
                  targetX = 5 + Math.random() * 90;
                  targetY = 5 + Math.random() * 90;
                }
              }
            }
          }

          // Smooth realistic movement
          if (distance > 0.1) {
            x += (dx / distance) * speed;
            y += (dy / distance) * speed;
          }

          // Check if in square zone
          const zoneSize = 35;
          inZone = (x >= 50 - zoneSize && x <= 50 + zoneSize && 
                    y >= 50 - zoneSize && y <= 50 + zoneSize);

          return { ...user, x, y, targetX, targetY, inZone };
        });
      });
    }, 50); // 20fps for smooth animation

    return () => clearInterval(animationInterval);
  }, [isLive, isDashboardInView]);

  // Update zone user count
  useEffect(() => {
    const inZoneCount = zoneUsers.filter(u => u.inZone).length;
    setZoneUserCount(inZoneCount);
  }, [zoneUsers]);

  // ENTERPRISE-LEVEL HELPER FUNCTIONS
  
  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    setExportLoading(true);
    setTimeout(() => {
      alert(`📊 Dashboard exported as ${format.toUpperCase()}! (Production would download file)`);
      setExportLoading(false);
    }, 2000);
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      alert('📊 Compare mode enabled! Select metrics to compare across time periods');
    }
  };

  const openDrillDown = (metric: string) => {
    setDrillDownView(metric);
    setInsightsPanelOpen(true);
  };

  const detectAnomaly = () => {
    const random = Math.random();
    if (random > 0.7) {
      setAnomalyDetected(true);
      setTimeout(() => setAnomalyDetected(false), 5000);
    }
  };

  const selectCampaign = (id: number) => {
    setSelectedCampaign(selectedCampaign === id ? null : id);
  };

  const togglePredictive = () => {
    setPredictiveView(!predictiveView);
  };

  const changeTimeRange = (range: 'today' | 'week' | 'month' | 'year') => {
    setTimeRange(range);
  };

  const changeSegment = (segment: 'all' | 'new' | 'returning' | 'vip') => {
    setSegmentView(segment);
  };

  // Anomaly detection on interval - only when visible
  useEffect(() => {
    if (isLive && isDashboardInView) {
      const interval = setInterval(detectAnomaly, 15000);
      return () => clearInterval(interval);
    }
  }, [isLive, isDashboardInView]);

  // Update performance metrics - only when visible
  useEffect(() => {
    if (isLive && isDashboardInView) {
      const interval = setInterval(() => {
        setPerformanceScore(prev => Math.max(75, Math.min(98, prev + Math.floor(Math.random() * 4) - 2)));
        setNpsScore(prev => Math.max(55, Math.min(85, prev + Math.floor(Math.random() * 6) - 3)));
        setChurnRisk(prev => Math.max(5, Math.min(25, prev + Math.floor(Math.random() * 4) - 2)));
        setLifetimeValue(prev => Math.max(180, Math.min(350, prev + Math.floor(Math.random() * 10) - 5)));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLive, isDashboardInView]);

  return (
    <motion.div
      ref={dashboardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
    >
      {/* Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4 backdrop-blur-md"
        style={{
          boxShadow: '0 0 30px rgba(59,130,246,0.2)'
        }}
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold mb-1">
              🎯 Interactive B2B Dashboard Mockup
            </p>
            <p className="text-gray-300 text-xs">
              This is a fully interactive demonstration of our business platform. All features shown here are functional prototypes. 
              The final production version will include even more advanced capabilities, real-time database integration, and enterprise-grade security. 
              <span className="text-blue-400 font-semibold"> Every button works—click around to explore!</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Container */}
      <motion.div
        className={`relative bg-gradient-to-br from-[#0A0A0A] via-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-xl md:rounded-3xl overflow-hidden transition-all duration-500 ${
          isFullscreen ? 'fixed inset-2 sm:inset-4 z-50' : ''
        }`}
        style={{
          boxShadow: '0 0 100px rgba(255,122,0,0.4), inset 0 0 60px rgba(255,122,0,0.05)'
        }}
        animate={{
          boxShadow: [
            '0 0 100px rgba(255,122,0,0.4), inset 0 0 60px rgba(255,122,0,0.05)',
            '0 0 120px rgba(255,122,0,0.6), inset 0 0 80px rgba(255,122,0,0.08)',
            '0 0 100px rgba(255,122,0,0.4), inset 0 0 60px rgba(255,122,0,0.05)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #FF7A00 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #FF7A00 0px, transparent 1px, transparent 20px)',
              backgroundSize: '20px 20px'
            }}
            animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Scanlines */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 2px, transparent 4px)',
          }}
        />

        {/* Header */}
        <div className="relative z-10 border-b border-[#FF7A00]/20 bg-black/40 backdrop-blur-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] rounded-xl flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,122,0,0.6)',
                      '0 0 40px rgba(255,122,0,0.8)',
                      '0 0 20px rgba(255,122,0,0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Coffee className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-semibold flex items-center gap-2">
                    Tech Hub Café
                    {featuredZone && (
                      <motion.span
                        className="px-2 py-1 bg-amber-500/20 border border-amber-500 text-amber-400 text-xs rounded-full"
                        animate={{
                          boxShadow: [
                            '0 0 15px rgba(245,158,11,0.6)',
                            '0 0 25px rgba(245,158,11,1)',
                            '0 0 15px rgba(245,158,11,0.6)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🏆 FEATURED
                      </motion.span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm">Shoreditch, London • Zone Radius: 180m</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <motion.button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 text-sm font-medium ${
                  isLive 
                    ? 'bg-green-500/20 border-green-500 text-green-400' 
                    : 'bg-gray-500/20 border-gray-500 text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isLive ? {
                  boxShadow: [
                    '0 0 15px rgba(34,197,94,0.6)',
                    '0 0 25px rgba(34,197,94,0.8)',
                    '0 0 15px rgba(34,197,94,0.6)'
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isLive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isLive ? 'LIVE' : 'PAUSED'}
              </motion.button>

              <motion.div
                className="px-4 py-2 bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF7A00] rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(255,122,0,0.4)',
                    '0 0 25px rgba(255,122,0,0.6)',
                    '0 0 15px rgba(255,122,0,0.4)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                title="Real-time active users in your zone"
              >
                <Users className="w-4 h-4" />
                <motion.span
                  key={activeUsers}
                  initial={{ scale: 1.3, color: '#FF7A00' }}
                  animate={{ scale: 1, color: '#FF7A00' }}
                  transition={{ duration: 0.3 }}
                >
                  {activeUsers}
                </motion.span>
                <span className="hidden sm:inline">Live</span>
              </motion.div>

              <motion.div
                className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                title="Today's revenue"
              >
                <DollarSign className="w-4 h-4" />
                <motion.span
                  key={revenue}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  ${revenue}
                </motion.span>
              </motion.div>

              <motion.button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg border flex items-center gap-1 text-sm ${
                  autoRefresh
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Auto-refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              </motion.button>

              <motion.button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:border-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </motion.button>

              <motion.button
                onClick={() => handleExport('pdf')}
                className="p-2 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:border-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Export report"
                disabled={exportLoading}
              >
                {exportLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:border-gray-600"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#FF7A00]/30" data-dashboard-tabs>
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'engage', label: 'Engage', icon: Zap },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'insights', label: 'Insights', icon: Thermometer, badge: 'NEW' },
              { id: 'safety', label: 'Safety & CSR', icon: Shield },
              { id: 'ai', label: 'AI Tools', icon: Brain },
              { id: 'community', label: 'Community', icon: Clipboard, badge: 'NEW' },
              { id: 'chatvoice', label: 'Zone Chat & Voice', icon: MessageCircle, badge: 'NEW' },
              { id: 'zonelive', label: 'Live Zone', icon: Navigation, badge: 'LIVE' },
              { id: 'profile', label: 'Business Profile', icon: Store }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg border flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all relative ${
                    activeTab === tab.id
                      ? 'bg-[#FF7A00] border-[#FF7A00] text-white'
                      : 'bg-black/40 border-gray-700 text-gray-400 hover:border-[#FF7A00]/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={activeTab === tab.id ? {
                    boxShadow: [
                      '0 0 15px rgba(255,122,0,0.6)',
                      '0 0 25px rgba(255,122,0,0.8)',
                      '0 0 15px rgba(255,122,0,0.6)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#FF7A00] text-white text-[10px] rounded-full font-bold">
                      {tab.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 p-4 md:p-6 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: 'Today\'s Visitors', value: '142', change: '+12%', icon: Users, color: '#FF7A00', drill: 'Traffic' },
                  { label: 'Engagement Rate', value: '87%', change: '+5%', icon: TrendingUp, color: '#10b981', drill: 'Engagement' },
                  { label: 'Avg. Dwell Time', value: '18m', change: '+3m', icon: Clock, color: '#3b82f6', drill: 'Dwell Time' },
                  { label: 'Conversion', value: '34%', change: '+8%', icon: Target, color: '#a855f7', drill: 'Revenue' }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      onClick={() => openDrillDown(stat.drill)}
                      className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-gray-800 rounded-xl p-4 backdrop-blur-sm cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: stat.color,
                        boxShadow: `0 0 30px ${stat.color}40`
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        <motion.span
                          className="text-xs text-green-400 font-medium"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {stat.change}
                        </motion.span>
                      </div>
                      <motion.div
                        className="text-2xl font-bold text-white mb-1"
                        key={stat.value}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ENTERPRISE CONTROLS BAR */}
              <motion.div
                className="bg-gradient-to-r from-gray-900/80 via-black/60 to-gray-900/80 border border-[#FF7A00]/20 rounded-xl p-4 backdrop-blur-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Time Range Selector */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="flex gap-1">
                      {(['today', 'week', 'month', 'year'] as const).map((range) => (
                        <motion.button
                          key={range}
                          onClick={() => changeTimeRange(range)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            timeRange === range
                              ? 'bg-[#FF7A00] text-white'
                              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {range === 'today' ? 'Today' : range === 'week' ? '7 Days' : range === 'month' ? '30 Days' : 'Year'}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={toggleCompareMode}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        compareMode
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      Compare
                    </motion.button>

                    <motion.button
                      onClick={togglePredictive}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        predictiveView
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Predictive
                    </motion.button>

                    <motion.button
                      onClick={() => setBenchmarkMode(!benchmarkMode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        benchmarkMode
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Award className="w-3.5 h-3.5" />
                      Benchmark
                    </motion.button>

                    <motion.button
                      onClick={() => setFilterActive(!filterActive)}
                      className="p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Anomaly Alert Banner */}
                <AnimatePresence>
                  {anomalyDetected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-3 flex items-start gap-3"
                    >
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-amber-400 font-semibold text-sm">Unusual Pattern Detected</p>
                        <p className="text-gray-300 text-xs mt-1">
                          Traffic is 23% higher than typical Thursday afternoon. Consider activating promotional campaigns.
                        </p>
                      </div>
                      <motion.button
                        onClick={() => setAnomalyDetected(false)}
                        className="p-1 hover:bg-amber-500/20 rounded"
                        whileHover={{ scale: 1.1 }}
                      >
                        <X className="w-4 h-4 text-amber-400" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* PERFORMANCE SCORE CARD */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm cursor-pointer"
                whileHover={{ borderColor: 'rgba(16,185,129,0.6)', scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.3 }}
                onClick={() => openDrillDown('Performance Overview')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    Zone Performance Score
                  </h4>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="text-4xl font-bold text-emerald-400"
                      key={performanceScore}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                    >
                      {performanceScore}
                    </motion.div>
                    <div className="text-gray-400 text-sm">/100</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Traffic', value: 92, icon: Users, color: '#10b981' },
                    { label: 'Engagement', value: 87, icon: Zap, color: '#3b82f6' },
                    { label: 'Revenue', value: 85, icon: DollarSign, color: '#f59e0b' },
                    { label: 'Satisfaction', value: 89, icon: Star, color: '#a855f7' }
                  ].map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={i}
                        className="bg-black/40 border border-gray-800 rounded-lg p-3 cursor-pointer"
                        whileHover={{ scale: 1.05, borderColor: metric.color }}
                        onClick={() => openDrillDown(metric.label)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4" style={{ color: metric.color }} />
                          <span className="text-xs text-gray-400">{metric.label}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-white">{metric.value}</span>
                          <span className="text-xs text-gray-500">/100</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                          <motion.div
                            className="h-1.5 rounded-full"
                            style={{ backgroundColor: metric.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Interactive Zone Map */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/95 to-black border border-[#FF7A00]/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(255,122,0,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#FF7A00]" />
                      Live Zone Activity
                    </h4>
                    <div className="flex gap-2">
                      {['24h', '7d', '30d'].map((view) => (
                        <button
                          key={view}
                          onClick={() => setSelectedHeatmapView(view)}
                          className={`px-2 py-1 rounded text-xs ${
                            selectedHeatmapView === view
                              ? 'bg-[#FF7A00] text-white'
                              : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative h-64 bg-black/40 rounded-lg border border-[#FF7A00]/20 overflow-hidden">
                    {/* Map visualization */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                      <defs>
                        {/* Gradient definitions for heatmap blobs */}
                        <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="heatMedium" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="heatLow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                          <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      
                      {/* Zone square */}
                      <motion.rect
                        x="100"
                        y="50"
                        width="200"
                        height="200"
                        fill="rgba(255,122,0,0.05)"
                        stroke="#FF7A00"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        animate={{
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      {/* Business center marker */}
                      <motion.circle
                        cx="200"
                        cy="150"
                        r="6"
                        fill="#FF7A00"
                        stroke="white"
                        strokeWidth="2"
                      />

                      {/* Fuzzy Heatmap Blobs - High Activity Areas */}
                      <motion.ellipse
                        cx="180"
                        cy="120"
                        rx="40"
                        ry="35"
                        fill="url(#heatHigh)"
                        animate={{
                          opacity: [0.6, 0.9, 0.6],
                          rx: [40, 45, 40],
                          ry: [35, 40, 35]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <motion.ellipse
                        cx="230"
                        cy="170"
                        rx="50"
                        ry="40"
                        fill="url(#heatHigh)"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          rx: [50, 55, 50],
                          ry: [40, 45, 40]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      />

                      {/* Medium Activity Zones */}
                      <motion.ellipse
                        cx="140"
                        cy="180"
                        rx="35"
                        ry="30"
                        fill="url(#heatMedium)"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          rx: [35, 40, 35],
                          ry: [30, 35, 30]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                      
                      <motion.ellipse
                        cx="260"
                        cy="110"
                        rx="30"
                        ry="25"
                        fill="url(#heatMedium)"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          rx: [30, 35, 30],
                          ry: [25, 30, 25]
                        }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      />

                      {/* Low Activity Zones */}
                      <motion.ellipse
                        cx="150"
                        cy="220"
                        rx="25"
                        ry="20"
                        fill="url(#heatLow)"
                        animate={{
                          opacity: [0.3, 0.5, 0.3],
                          rx: [25, 28, 25],
                          ry: [20, 23, 20]
                        }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      />
                      
                      <motion.ellipse
                        cx="120"
                        cy="100"
                        rx="28"
                        ry="22"
                        fill="url(#heatLow)"
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                          rx: [28, 32, 28],
                          ry: [22, 26, 22]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                      />

                      {/* Subtle pulse from center */}
                      <motion.circle
                        cx="200"
                        cy="150"
                        r="0"
                        fill="none"
                        stroke="#FF7A00"
                        strokeWidth="1"
                        opacity="0"
                        animate={{
                          r: [0, 100],
                          opacity: [0.6, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </svg>

                    {/* Heatmap overlay visualization */}
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 border border-[#FF7A00]/30 rounded p-2 backdrop-blur-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Peak Hour:</span>
                        <span className="text-[#FF7A00] font-semibold">1:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-gray-400">Hot Spot:</span>
                        <span className="text-green-400 font-semibold">Main Seating</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Live Traffic Chart */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/95 to-black border border-[#FF7A00]/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(255,122,0,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#FF7A00]" />
                    Real-Time Traffic
                  </h4>
                  
                  <div style={{ width: '100%', height: '220px', cursor: 'pointer' }} onClick={() => openDrillDown('Traffic')}>
                    <CustomAreaChart
                      data={trafficData}
                      areas={[
                        { dataKey: 'visitors', fill: '#FF7A00', stroke: '#FF7A00', name: 'Visitors' },
                        { dataKey: 'engaged', fill: '#10b981', stroke: '#10b981', name: 'Engaged' }
                      ]}
                      xAxisKey="time"
                      width={600}
                      height={220}
                      showGrid={true}
                      stacked={false}
                      onAreaClick={() => openDrillDown('Traffic')}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity Feed */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-[#FF7A00]/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(255,122,0,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#FF7A00]" />
                  Recent Zone Activity
                </h4>
                
                <div className="space-y-3">
                  {[
                    { icon: Users, text: 'Sarah M. entered your zone', time: '2 min ago', color: '#3b82f6' },
                    { icon: Star, text: 'New 5-star review received', time: '5 min ago', color: '#f59e0b' },
                    { icon: MessageSquare, text: '3 users joined proximity chat', time: '8 min ago', color: '#10b981' },
                    { icon: Trophy, text: 'Featured Zone promotion started', time: '12 min ago', color: '#a855f7' }
                  ].map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-black/40 border border-gray-800 rounded-lg hover:border-[#FF7A00]/50 transition-all cursor-pointer"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: `${activity.color}20`,
                            border: `1px solid ${activity.color}`
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: activity.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.text}</p>
                          <p className="text-gray-500 text-xs">{activity.time}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ENGAGE TAB */}
          {activeTab === 'engage' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Push Notification Builder */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-[#FF7A00]/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(255,122,0,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#FF7A00]" />
                  Push Notification Blast
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Message</label>
                    <textarea
                      value={notificationText}
                      onChange={(e) => setNotificationText(e.target.value)}
                      placeholder="e.g., 🍔 Happy Hour: 25% off all drinks for the next hour!"
                      className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Will reach: <span className="text-[#FF7A00] font-semibold">{activeUsers} users</span>
                    </div>
                    <motion.button
                      onClick={sendNotification}
                      disabled={!notificationText}
                      className={`px-6 py-2 rounded-lg flex items-center gap-2 font-medium ${
                        notificationText
                          ? 'bg-[#FF7A00] text-white hover:bg-[#FF8C1A]'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                      whileHover={notificationText ? { scale: 1.05 } : {}}
                      whileTap={notificationText ? { scale: 0.95 } : {}}
                    >
                      <Send className="w-4 h-4" />
                      Send Now
                    </motion.button>
                  </div>
                </div>

                {/* Sent Notifications */}
                {notifications.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h5 className="text-sm text-gray-400 font-semibold">Recent Sends</h5>
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-black/40 border border-gray-800 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-white text-sm flex-1">{notif.text}</p>
                          <span className="text-xs text-gray-500">{notif.time}</span>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span className="text-green-400">✓ {notif.delivered} delivered</span>
                          <span className="text-blue-400">👁 {notif.opened} opened</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Micro-Events & Featured Zone */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-pink-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(236,72,153,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-pink-400" />
                    Micro-Event Spotlight
                  </h4>
                  
                  <motion.button
                    onClick={createMicroEvent}
                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium mb-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    + Create Live Event
                  </motion.button>

                  <div className="space-y-2">
                    {microEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium text-sm">{event.title}</p>
                            <p className="text-pink-400 text-xs">{event.attendees} interested</p>
                          </div>
                          <motion.div
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-amber-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(245,158,11,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Featured Zone Promotion
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">7-Day Featured Badge</p>
                        <p className="text-amber-400 text-sm">Priority map placement</p>
                      </div>
                      <motion.button
                        onClick={() => setFeaturedZone(!featuredZone)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          featuredZone
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {featuredZone ? 'Active' : 'Activate'}
                      </motion.button>
                    </div>

                    {featuredZone && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-black/40 border border-amber-500/20 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Additional Visibility</span>
                          <span className="text-amber-400 font-semibold">+240%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Loyalty & Welcome Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-fuchsia-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(217,70,239,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Repeat className="w-5 h-5 text-fuchsia-400" />
                      Loyalty Loop Engine
                    </h4>
                    <motion.button
                      onClick={() => setLoyaltyActive(!loyaltyActive)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        loyaltyActive
                          ? 'bg-fuchsia-500 text-white'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {loyaltyActive ? 'ON' : 'OFF'}
                    </motion.button>
                  </div>

                  {loyaltyActive && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-lg">
                        <div>
                          <p className="text-white text-sm font-medium">Returning Visitors</p>
                          <p className="text-fuchsia-400 text-xs">Auto-rewarded today</p>
                        </div>
                        <motion.span
                          className="text-2xl font-bold text-fuchsia-400"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          23
                        </motion.span>
                      </div>

                      <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-gray-400 text-xs mb-2">Active Rewards</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-white">Free Coffee (3rd visit)</span>
                            <span className="text-green-400">8 claimed</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white">10% Discount (5th visit)</span>
                            <span className="text-green-400">5 claimed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-sky-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(14,165,233,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Hand className="w-5 h-5 text-sky-400" />
                    Dynamic Welcome Cards
                  </h4>

                  <div className="p-4 bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                        👋
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Welcome to Tech Hub!</p>
                        <p className="text-sky-400 text-xs">Personalized for each visitor</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-300">
                      <p>📶 WiFi: TechHub_Guest / Pass: coffee2024</p>
                      <p>☕ Today's Special: Pumpkin Spice Latte £3.50</p>
                      <p>🎮 Challenge: Check in 3 times this week for free pastry!</p>
                    </div>

                    <motion.button
                      className="mt-3 w-full px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit className="w-4 h-4 inline mr-2" />
                      Edit Welcome Message
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Segment Selector */}
              <motion.div
                className="bg-gradient-to-r from-gray-900/80 via-black/60 to-gray-900/80 border border-blue-500/20 rounded-xl p-4 backdrop-blur-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Audience Segment:</span>
                    <div className="flex gap-1">
                      {(['all', 'new', 'returning', 'vip'] as const).map((segment) => (
                        <motion.button
                          key={segment}
                          onClick={() => changeSegment(segment)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                            segmentView === segment
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {segment === 'all' ? 'All Users' : segment === 'vip' ? 'VIP' : segment}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Showing: <span className="text-blue-400 font-semibold capitalize">{segmentView}</span> segment data
                  </div>
                </div>
              </motion.div>

              {/* Dwell Time & Sentiment */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/95 to-black border border-[#FF7A00]/30 rounded-xl p-6 relative"
                  whileHover={{ borderColor: 'rgba(255,122,0,0.6)', scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 3D Holographic glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 50%, rgba(255,122,0,0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(255,122,0,0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(255,122,0,0.3) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#FF7A00]" />
                        Dwell Time Distribution
                      </h4>
                      <motion.div
                        className="px-2 py-1 bg-[#FF7A00]/20 border border-[#FF7A00]/40 rounded-md"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <p className="text-[#FF7A00] text-xs font-semibold">Live</p>
                      </motion.div>
                    </div>
                    
                    <div style={{ width: '100%', height: '220px' }} onClick={() => openDrillDown('Dwell Time')}>
                      <CustomPieChart
                        data={dwellTimeData}
                        width={600}
                        height={220}
                        innerRadius={60}
                        outerRadius={90}
                        showLabels={true}
                        onSegmentClick={() => openDrillDown('Dwell Time')}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {dwellTimeData.map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-2 p-2 bg-black/40 rounded-lg border border-gray-800 hover:border-[#FF7A00]/50 transition-all cursor-pointer"
                          whileHover={{ scale: 1.05, x: 3 }}
                        >
                          <motion.div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                            animate={{
                              boxShadow: [
                                `0 0 0px ${item.color}`,
                                `0 0 8px ${item.color}`,
                                `0 0 0px ${item.color}`
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                          <div className="flex-1">
                            <p className="text-xs text-gray-400">{item.name}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-white font-semibold">{item.value}%</p>
                              <motion.span 
                                className="text-xs text-green-400"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {i === 2 ? '+5%' : i === 3 ? '+8%' : '-2%'}
                              </motion.span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Average dwell time insight */}
                    <motion.div 
                      className="mt-4 p-3 bg-gradient-to-r from-[#FF7A00]/10 to-orange-500/10 border border-[#FF7A00]/30 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[#FF7A00] text-xs font-semibold">📊 Average Dwell Time</p>
                        <motion.span 
                          className="text-white font-bold"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          18m 32s
                        </motion.span>
                      </div>
                      <p className="text-gray-300 text-xs">
                        Users stay 23% longer than nearby zones. Peak engagement: 12-2 PM.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/95 to-black border border-blue-500/30 rounded-xl p-6 relative"
                  whileHover={{ borderColor: 'rgba(59,130,246,0.6)', scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 3D Holographic glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    animate={{
                      background: [
                        'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold flex items-center gap-2">
                        <Brain className="w-5 h-5 text-blue-400" />
                        AI Sentiment Analysis
                      </h4>
                      <motion.div
                        className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded-md"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <p className="text-blue-400 text-xs font-semibold">AI-Powered</p>
                      </motion.div>
                    </div>
                    
                    <div style={{ width: '100%', height: '220px' }} onClick={() => openDrillDown('Sentiment Analysis')}>
                      <CustomLineChart
                        data={sentimentData}
                        lines={[
                          { dataKey: 'positive', stroke: '#10b981', name: 'Positive', strokeWidth: 3 },
                          { dataKey: 'negative', stroke: '#ef4444', name: 'Negative', strokeWidth: 3 }
                        ]}
                        xAxisKey="category"
                        width={600}
                        height={220}
                        showGrid={true}
                        showDots={true}
                      />
                    </div>

                    {/* Sentiment breakdown */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <motion.div 
                        className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Positive</span>
                          <motion.span 
                            className="text-green-400 font-bold"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            86%
                          </motion.span>
                        </div>
                        <p className="text-xs text-green-400 mt-1">↑ +3% vs last week</p>
                      </motion.div>
                      <motion.div 
                        className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Negative</span>
                          <span className="text-red-400 font-bold">14%</span>
                        </div>
                        <p className="text-xs text-red-400 mt-1">↓ -3% vs last week</p>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-blue-400 text-xs font-semibold mb-1 flex items-center gap-1">
                        🧠 AI Insight
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          ✨
                        </motion.span>
                      </p>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Customers love your ambiance (92% positive) but food quality needs attention (78% positive). 
                        <span className="text-blue-400 font-semibold"> Action: Highlight atmosphere in marketing, review food menu.</span>
                      </p>
                      <div className="mt-2 flex gap-2">
                        <motion.button
                          className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openDrillDown('Sentiment Analysis')}
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 rounded text-xs font-medium hover:bg-gray-700/50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleExport('csv')}
                        >
                          Export Report
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* CRM Export */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(6,182,212,0.6)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    Enterprise CRM Export
                  </h4>
                  <motion.button
                    onClick={() => handleExport('csv')}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    Export Data
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Visit Patterns', value: 'Anonymized', icon: Activity },
                    { label: 'Time Bands', value: 'Aggregated', icon: Clock },
                    { label: 'Interest Clusters', value: 'Generic', icon: Target },
                    { label: 'Privacy', value: '100% Safe', icon: Shield }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm text-cyan-400 font-semibold">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Community Leaderboard */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-violet-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(139,92,246,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-violet-400" />
                  Community Leaderboard
                </h4>

                <div className="space-y-2">
                  {[
                    { rank: 1, name: 'Your Zone', score: 94, emoji: '🥇', you: true },
                    { rank: 2, name: 'The Mill Cafe', score: 92, emoji: '🥈' },
                    { rank: 3, name: 'Urban Space', score: 89, emoji: '🥉' },
                    { rank: 4, name: 'Creative Hub', score: 87, emoji: '4️⃣' }
                  ].map((venue) => (
                    <motion.div
                      key={venue.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        venue.you 
                          ? 'bg-violet-500/20 border-2 border-violet-500' 
                          : 'bg-black/40 border border-gray-800'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <span className="text-2xl">{venue.emoji}</span>
                      <div className="flex-1">
                        <p className={`font-semibold ${venue.you ? 'text-violet-400' : 'text-white'}`}>
                          {venue.name}
                          {venue.you && <span className="ml-2 text-xs">(You)</span>}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                            <motion.div
                              className="bg-gradient-to-r from-violet-500 to-purple-500 h-1.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${venue.score}%` }}
                              transition={{ duration: 1, delay: venue.rank * 0.1 }}
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-violet-400">{venue.score}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* SAFETY & CSR TAB */}
          {activeTab === 'safety' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Safe Seat Alert & Host Mode */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-rose-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(244,63,94,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Shield className="w-5 h-5 text-rose-400" />
                      Safe Seat Alert
                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-500 text-green-400 text-xs rounded-full">
                        FREE CSR
                      </span>
                    </h4>
                  </div>

                  <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Active Alerts</span>
                      <motion.span
                        className="text-2xl font-bold text-rose-400"
                        animate={safeAlerts > 0 ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {safeAlerts}
                      </motion.span>
                    </div>
                    {safeAlerts > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-rose-500/20 border border-rose-500 rounded-lg"
                      >
                        <p className="text-white text-sm font-semibold mb-1">🚨 Alert: Table 7</p>
                        <p className="text-rose-400 text-xs">User feels uncomfortable - staff notified privately</p>
                        <motion.button
                          onClick={() => setSafeAlerts(0)}
                          className="mt-2 px-3 py-1 bg-rose-500 text-white rounded text-xs"
                          whileHover={{ scale: 1.05 }}
                        >
                          Mark Resolved
                        </motion.button>
                      </motion.div>
                    ) : (
                      <p className="text-green-400 text-sm">✓ All clear - no active alerts</p>
                    )}
                  </div>

                  <motion.button
                    onClick={() => setSafeAlerts(1)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg text-sm hover:border-rose-500 hover:text-rose-400"
                    whileHover={{ scale: 1.02 }}
                  >
                    Simulate Alert (Demo)
                  </motion.button>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-teal-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(20,184,166,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-teal-400" />
                      Verified Host Mode
                    </h4>
                    <motion.button
                      onClick={() => setHostMode(!hostMode)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hostMode
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {hostMode ? 'ON' : 'OFF'}
                    </motion.button>
                  </div>

                  {hostMode ? (
                    <div className="space-y-3">
                      {[
                        { name: 'Emma Chen', role: 'Senior Host', status: 'active' },
                        { name: 'David Park', role: 'Host', status: 'active' },
                        { name: 'Sarah Wilson', role: 'Host', status: 'off-duty' }
                      ].map((host, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg"
                        >
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {host.name[0]}
                            </div>
                            {host.status === 'active' && (
                              <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{host.name}</p>
                            <p className="text-teal-400 text-xs">{host.role}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            host.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-700/50 text-gray-500'
                          }`}>
                            {host.status}
                          </span>
                        </motion.div>
                      ))}

                      <motion.button
                        className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.02 }}
                      >
                        + Add Host
                      </motion.button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm mb-4">Enable Host Mode to designate verified staff members</p>
                      <motion.button
                        onClick={() => setHostMode(true)}
                        className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        Enable Now
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Safe Escort */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(16,185,129,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-emerald-400" />
                  Safe Escort Prompt
                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-500 text-green-400 text-xs rounded-full">
                    FREE CSR
                  </span>
                </h4>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-2xl mb-1">12</p>
                    <p className="text-gray-400 text-xs">Escort Requests (This Month)</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-2xl mb-1">100%</p>
                    <p className="text-gray-400 text-xs">Fulfilled Safely</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-2xl mb-1">4.9★</p>
                    <p className="text-gray-400 text-xs">Safety Rating</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-black/40 border border-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm mb-1">Staff Verified Feature</p>
                      <p className="text-gray-400 text-xs">Only designated, verified staff receive escort requests. All interactions are logged for safety and accountability.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* AI TOOLS TAB */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Proxima Host AI */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(99,102,241,0.6)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-indigo-400" />
                    Proxima Host AI
                    <span className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500 text-indigo-400 text-xs rounded-full">
                      SMART
                    </span>
                  </h4>
                  <motion.button
                    onClick={() => activateHostAI()}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      hostAIActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {hostAIActive ? '✓ Active' : 'Activate'}
                  </motion.button>
                </div>

                {hostAIActive ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <motion.div
                          className="w-3 h-3 bg-indigo-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <p className="text-indigo-400 text-sm font-semibold">AI Co-Pilot Active • Monitoring Live Conditions</p>
                      </div>
                      <p className="text-gray-300 text-xs">
                        Your AI assistant is analyzing venue atmosphere, user intents, and timing to provide smart recommendations.
                      </p>
                    </div>

                    {aiSuggestions.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-gray-400 text-sm font-semibold">🤖 Live Suggestions</p>
                        {aiSuggestions.map((suggestion, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="p-4 bg-black/40 border border-indigo-500/30 rounded-lg group"
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-white text-sm flex-1">{suggestion}</p>
                              <div className="flex gap-2 ml-3">
                                <motion.button
                                  onClick={() => {
                                    dismissAISuggestion(i);
                                    // In production, this would execute the suggested action
                                    if (suggestion.includes('promotion')) {
                                      setActiveTab('engage');
                                    } else if (suggestion.includes('networking')) {
                                      createMicroEvent();
                                    }
                                  }}
                                  className="px-3 py-1 bg-indigo-500 text-white rounded text-xs font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Act
                                </motion.button>
                                <motion.button
                                  onClick={() => dismissAISuggestion(i)}
                                  className="p-1 hover:bg-red-500/20 rounded"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <motion.div
                          className="w-16 h-16 mx-auto mb-4"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain className="w-full h-full text-indigo-400" />
                        </motion.div>
                        <p className="text-gray-400 text-sm">AI analyzing venue conditions...</p>
                        <p className="text-gray-500 text-xs mt-1">Smart suggestions will appear here</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-center">
                        <p className="text-indigo-400 font-bold text-lg">Real-Time</p>
                        <p className="text-gray-400 text-xs mt-1">Analysis</p>
                      </div>
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-center">
                        <p className="text-indigo-400 font-bold text-lg">Zero</p>
                        <p className="text-gray-400 text-xs mt-1">PII Exposure</p>
                      </div>
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-center">
                        <p className="text-indigo-400 font-bold text-lg">Smart</p>
                        <p className="text-gray-400 text-xs mt-1">Timing</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserCog className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm mb-4">
                      Activate your AI co-pilot to receive intelligent, real-time recommendations for micro-events, promotions, and safety support.
                    </p>
                    <motion.button
                      onClick={() => activateHostAI()}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Activate Host AI
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* AI Copy Generator */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(168,85,247,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Ad Copy Generation
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Your Brief</label>
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., new brunch menu, relaxed Sunday vibe"
                      className="w-full bg-black/60 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    onClick={generateAICopy}
                    disabled={!aiPrompt || isGenerating}
                    className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium ${
                      aiPrompt && !isGenerating
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                    whileHover={aiPrompt && !isGenerating ? { scale: 1.02 } : {}}
                    whileTap={aiPrompt && !isGenerating ? { scale: 0.98 } : {}}
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Generate Copy Variants
                      </>
                    )}
                  </motion.button>

                  {generatedCopy.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="text-sm text-gray-400 font-semibold">Generated Versions</h5>
                      {generatedCopy.map((copy, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg group cursor-pointer hover:border-purple-500"
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="text-white text-sm mb-3">{copy}</p>
                          <div className="flex gap-2">
                            <motion.button
                              className="px-3 py-1 bg-purple-500 text-white rounded text-xs"
                              whileHover={{ scale: 1.05 }}
                            >
                              Use This
                            </motion.button>
                            <motion.button
                              className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                              whileHover={{ scale: 1.05 }}
                            >
                              Edit
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* AI Feedback Analyzer */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(59,130,246,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  AI Feedback Analyzer
                </h4>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-400 text-sm font-semibold mb-2">😊 Common Compliments</p>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• "Amazing atmosphere"</li>
                        <li>• "Friendly staff"</li>
                        <li>• "Great coffee"</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm font-semibold mb-2">🔧 Fix-This-First</p>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• Slow service during lunch rush</li>
                        <li>• Limited vegan options</li>
                        <li>• WiFi connectivity issues</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-blue-400 font-medium text-sm mb-1">🧠 AI Recommendation</p>
                        <p className="text-gray-300 text-xs mb-2">Based on 47 recent reviews and feedback, prioritize:</p>
                        <ol className="space-y-1 text-xs text-gray-300 list-decimal list-inside">
                          <li>Add 1-2 staff during 12-2pm peak</li>
                          <li>Expand vegan menu by 3-4 items</li>
                          <li>Upgrade to mesh WiFi system</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    View Full Analysis
                  </motion.button>
                </div>
              </motion.div>

              {/* Voice Zone & Review Booster */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(99,102,241,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Mic className="w-5 h-5 text-indigo-400" />
                    Voice Zone Stand-Out
                  </h4>

                  <div className="space-y-3">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          className="w-2 h-2 bg-indigo-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <p className="text-indigo-400 text-sm font-semibold">3 Active Voice Channels</p>
                      </div>
                      <p className="text-gray-300 text-xs">Your sponsor tag appears in nearby Proximity Chat rooms</p>
                    </div>

                    <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400 mb-2">Preview:</p>
                      <div className="flex items-center gap-2 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded">
                        <Mic className="w-4 h-4 text-indigo-400" />
                        <span className="text-white text-xs">Coffee Chat • </span>
                        <span className="text-indigo-400 text-xs">Hosted by Tech Hub Café</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(34,197,94,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-green-400" />
                    Review Booster Prompt
                  </h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold text-xl">18</p>
                        <p className="text-gray-400 text-xs">Reviews This Week</p>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 font-semibold text-xl">34%</p>
                        <p className="text-gray-400 text-xs">Conversion Rate</p>
                      </div>
                    </div>

                    <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400 mb-2">Prompt Preview:</p>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-xs text-gray-300">
                        "Thanks for visiting! 🌟 If you enjoyed your experience, we'd love a quick review. No pressure - you can always dismiss this."
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        className="flex-1 px-3 py-2 bg-green-500 text-white rounded text-xs font-medium"
                        whileHover={{ scale: 1.02 }}
                      >
                        ✓ Enabled
                      </motion.button>
                      <motion.button
                        className="px-3 py-2 bg-gray-800 text-gray-400 rounded text-xs"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* INSIGHTS TAB - NEW */}
          {activeTab === 'insights' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Venue Vibe Index */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/95 to-black border border-teal-500/30 rounded-xl p-6"
                whileHover={{ borderColor: 'rgba(20,184,166,0.6)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-teal-400" />
                    Venue Vibe Index
                    <span className="px-2 py-0.5 bg-teal-500/20 border border-teal-500 text-teal-400 text-xs rounded-full">
                      LIVE
                    </span>
                  </h4>
                  <motion.div
                    className="text-3xl font-bold text-teal-400"
                    key={vibeScore}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                  >
                    {vibeScore}%
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Calm', emoji: '🧘', value: 'calm', color: '#3b82f6' },
                    { label: 'Warm', emoji: '☕', value: 'warm', color: '#f59e0b' },
                    { label: 'Professional', emoji: '💼', value: 'professional', color: '#6366f1' },
                    { label: 'Energetic', emoji: '⚡', value: 'energetic', color: '#ef4444' }
                  ].map((mood) => (
                    <motion.button
                      key={mood.value}
                      onClick={() => changeVenueVibe(mood.value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        venueVibe === mood.value
                          ? 'border-teal-500 bg-teal-500/20'
                          : 'border-gray-700 bg-black/40 hover:border-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={venueVibe === mood.value ? {
                        boxShadow: [`0 0 0px ${mood.color}`, `0 0 20px ${mood.color}`, `0 0 0px ${mood.color}`]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="text-3xl mb-1">{mood.emoji}</div>
                      <div className={`text-sm font-medium ${venueVibe === mood.value ? 'text-teal-400' : 'text-gray-400'}`}>
                        {mood.label}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg cursor-pointer" onClick={() => openDrillDown('Venue Vibe')}>
                  <div style={{ width: '100%', height: '200px' }}>
                    <CustomRadarChart
                      data={vibeRadarData}
                      width={500}
                      height={200}
                      fill="#14b8a6"
                      stroke="#14b8a6"
                      fillOpacity={0.3}
                      onSegmentClick={() => openDrillDown('Venue Vibe')}
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-black/40 border border-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <p className="text-teal-400 text-sm font-semibold">Current Atmosphere</p>
                  </div>
                  <p className="text-gray-300 text-xs">
                    Your venue feels <span className="text-teal-400 font-semibold">{venueVibe}</span> and welcoming. 
                    {venueVibe === 'warm' && ' Perfect for casual meetings and relaxed conversations.'}
                    {venueVibe === 'calm' && ' Ideal for focused work and quiet productivity.'}
                    {venueVibe === 'professional' && ' Great for business meetings and networking.'}
                    {venueVibe === 'energetic' && ' Vibrant space for social gatherings and events.'}
                  </p>
                </div>
              </motion.div>

              {/* Intent Mix Analytics & Walk-By Drop-Off */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/95 to-black border border-blue-500/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(59,130,246,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    Intent Mix Analytics
                  </h4>

                  <div style={{ width: '100%', height: '220px' }} onClick={() => openDrillDown('User Intent')}>
                    <CustomPieChart
                      data={intentMixData}
                      width={600}
                      height={220}
                      innerRadius={60}
                      outerRadius={90}
                      showLabels={true}
                      onSegmentClick={() => openDrillDown('User Intent')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {intentMixData.map((item, i) => (
                      <motion.div
                        key={i}
                        className="p-3 bg-black/40 border border-gray-800 rounded-lg"
                        whileHover={{ scale: 1.05, borderColor: item.color }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{item.intent}</span>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        </div>
                        <p className="text-lg font-bold text-white">{item.value}%</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/95 to-black border border-amber-500/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(251,146,60,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <DoorOpen className="w-5 h-5 text-amber-400" />
                    Walk-By Drop-Off Insights
                  </h4>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Approached</p>
                        <motion.p 
                          className="text-2xl font-bold text-amber-400"
                          key={walkByData.approached}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {walkByData.approached}
                        </motion.p>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Entered</p>
                        <motion.p 
                          className="text-2xl font-bold text-green-400"
                          key={walkByData.entered}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {walkByData.entered}
                        </motion.p>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Rate</p>
                        <motion.p 
                          className="text-2xl font-bold text-blue-400"
                          key={walkByData.conversion}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {walkByData.conversion}%
                        </motion.p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-400 font-medium text-sm mb-1">💡 Optimization Tip</p>
                          <p className="text-gray-300 text-xs">
                            {walkByData.conversion > 60 
                              ? '🎉 Excellent conversion! Your storefront is highly appealing.'
                              : walkByData.conversion > 40
                              ? '📈 Good conversion. Consider improved signage or window displays to boost entry rate.'
                              : '🔧 Low conversion detected. Review exterior appeal, signage clarity, and welcoming atmosphere.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        openDrillDown('Walk-By Analytics');
                        handleExport('pdf');
                      }}
                    >
                      Generate Full Report
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Preference Fit & Comfort Trends */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/95 to-black border border-rose-500/30 rounded-xl p-6"
                whileHover={{ borderColor: 'rgba(244,63,94,0.6)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    Preference Fit & Comfort Trends
                  </h4>
                  <motion.div
                    className="px-4 py-2 bg-rose-500/20 border border-rose-500 rounded-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-rose-400 font-semibold">{comfortScore}% Match</p>
                  </motion.div>
                </div>

                <div style={{ width: '100%', height: '200px' }}>
                  <CustomLineChart
                    data={comfortTrendsData}
                    lines={[
                      { dataKey: 'promised', stroke: '#f59e0b', name: 'Promised Vibe', strokeWidth: 3 },
                      { dataKey: 'actual', stroke: '#10b981', name: 'Actual Experience', strokeWidth: 3 }
                    ]}
                    xAxisKey="day"
                    width={600}
                    height={200}
                    showGrid={true}
                    showDots={true}
                    fillArea={false}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Smile className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Comfort Positive</span>
                    </div>
                    <p className="text-xl font-bold text-green-400">92%</p>
                  </div>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Meh className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-400">Neutral</span>
                    </div>
                    <p className="text-xl font-bold text-yellow-400">6%</p>
                  </div>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Frown className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-gray-400">Discomfort</span>
                    </div>
                    <p className="text-xl font-bold text-red-400">2%</p>
                  </div>
                </div>
              </motion.div>

              {/* Social Impact Funnel */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(16,185,129,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Social Impact Funnel
                </h4>

                <div className="space-y-3">
                  {socialImpactData.map((stage, i) => (
                    <motion.div
                      key={i}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{stage.stage}</span>
                        <span className="text-emerald-400 font-bold">{stage.value}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <motion.div
                          className="h-3 rounded-full"
                          style={{ backgroundColor: stage.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.value}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
                    <p className="text-emerald-400 text-2xl font-bold">+23%</p>
                    <p className="text-xs text-gray-400 mt-1">Dwell Time</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
                    <p className="text-emerald-400 text-2xl font-bold">64%</p>
                    <p className="text-xs text-gray-400 mt-1">Offer Use</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
                    <p className="text-emerald-400 text-2xl font-bold">45%</p>
                    <p className="text-xs text-gray-400 mt-1">Repeat Rate</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
                    <p className="text-emerald-400 text-2xl font-bold">+18%</p>
                    <p className="text-xs text-gray-400 mt-1">Revenue</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* COMMUNITY TAB - NEW */}
          {activeTab === 'community' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Community Board */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-violet-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(139,92,246,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Clipboard className="w-5 h-5 text-violet-400" />
                  Community Board
                  <span className="px-2 py-0.5 bg-violet-500/20 border border-violet-500 text-violet-400 text-xs rounded-full">
                    INTERACTIVE
                  </span>
                </h4>

                <div className="space-y-3">
                  {communityProposals.map((proposal) => (
                    <motion.div
                      key={proposal.id}
                      className={`p-4 rounded-lg border-2 ${
                        proposal.status === 'approved'
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-violet-500/10 border-violet-500/30'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{proposal.text}</p>
                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={() => voteProposal(proposal.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-violet-500/20 border border-violet-500 text-violet-400 rounded-full text-xs font-medium hover:bg-violet-500/30"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              👍 {proposal.votes} votes
                            </motion.button>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              proposal.status === 'approved'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                              {proposal.status}
                            </span>
                          </div>
                        </div>
                        {proposal.status === 'pending' && (
                          <motion.button
                            onClick={() => approveProposal(proposal.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Approve
                          </motion.button>
                        )}
                        {proposal.status === 'approved' && (
                          <Check className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const newProposal = {
                      id: Date.now(),
                      text: 'Guest suggestion',
                      votes: 1,
                      status: 'pending'
                    };
                    setCommunityProposals(prev => [...prev, newProposal]);
                  }}
                >
                  <Clipboard className="w-5 h-5" />
                  View New Suggestions
                </motion.button>
              </motion.div>

              {/* Venue Context Cards Manager */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{ borderColor: 'rgba(147,51,234,0.6)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    Venue Context Cards
                  </h4>
                  <motion.button
                    onClick={() => setContextCardsActive(!contextCardsActive)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      contextCardsActive
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {contextCardsActive ? '✓ Active' : 'Activate'}
                  </motion.button>
                </div>

                {contextCardsActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <p className="text-purple-400 text-sm font-semibold mb-3">Active Context Cards in Chat</p>
                      <div className="space-y-2">
                        {[
                          { icon: '🎉', text: 'Happy Hour: 25% off drinks until 7pm' },
                          { icon: '📶', text: 'WiFi: TechHub_Guest / Pass: coffee2024' },
                          { icon: '🎤', text: 'Live music tonight at 8pm' }
                        ].map((card, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 bg-black/40 border border-purple-500/20 rounded-lg"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(147,51,234,0.5)' }}
                          >
                            <span className="text-2xl">{card.icon}</span>
                            <span className="text-white text-sm">{card.text}</span>
                            <motion.button
                              className="ml-auto p-1 hover:bg-red-500/20 rounded"
                              whileHover={{ scale: 1.1 }}
                            >
                              <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      + Add New Context Card
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* Safety Certification */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(34,197,94,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                      Safety-Certified Badge
                    </h4>
                    {safetyCertified && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Check className="w-6 h-6 text-green-400" />
                      </motion.div>
                    )}
                  </div>

                  {safetyCertified ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <p className="text-green-400 font-bold text-lg">CERTIFIED</p>
                            <p className="text-gray-400 text-xs">Valid until Dec 2025</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs">
                          Your venue meets all Proxima safety standards and displays the trusted certification badge to users.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">Trust Score</p>
                          <p className="text-xl font-bold text-green-400">4.9/5.0</p>
                        </div>
                        <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">Safety Incidents</p>
                          <p className="text-xl font-bold text-green-400">0</p>
                        </div>
                      </div>

                      <motion.button
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExport('pdf')}
                      >
                        Download Certificate
                      </motion.button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm mb-4">Complete safety training to get certified</p>
                      <motion.button
                        onClick={() => setSafetyCertified(true)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        Start Training
                      </motion.button>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(239,68,68,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      Venue Shield
                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-500 text-green-400 text-xs rounded-full">
                        FREE
                      </span>
                    </h4>
                    <motion.button
                      onClick={() => setVenueShieldActive(!venueShieldActive)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        venueShieldActive
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {venueShieldActive ? 'ON' : 'OFF'}
                    </motion.button>
                  </div>

                  {venueShieldActive && (
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-400 text-sm">Risk Detection Status</span>
                          <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <p className="text-white font-semibold mb-1">🛡️ All Clear</p>
                        <p className="text-gray-400 text-xs">No unusual patterns detected. Monitoring 24/7.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2 bg-black/40 border border-gray-800 rounded text-center">
                          <p className="text-green-400 font-bold text-lg">0</p>
                          <p className="text-gray-400 text-xs">Alerts</p>
                        </div>
                        <div className="p-2 bg-black/40 border border-gray-800 rounded text-center">
                          <p className="text-blue-400 font-bold text-lg">24/7</p>
                          <p className="text-gray-400 text-xs">Monitor</p>
                        </div>
                        <div className="p-2 bg-black/40 border border-gray-800 rounded text-center">
                          <p className="text-purple-400 font-bold text-lg">AI</p>
                          <p className="text-gray-400 text-xs">Powered</p>
                        </div>
                      </div>

                      <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-2">Protected Areas</p>
                        <div className="flex gap-2 flex-wrap">
                          {['Main Floor', 'Patio', 'Restrooms', 'Entry'].map((area, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                              ✓ {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* BUSINESS PROFILE TAB */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Save Notification */}
              <AnimatePresence>
                {profileSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="bg-green-500/20 border border-green-500 rounded-xl p-4 flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-white font-semibold">Profile Saved Successfully!</p>
                      <p className="text-gray-300 text-sm">Your business profile is now live on Proxima.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                    <Store className="w-6 h-6 text-[#FF7A00]" />
                    Business Profile Editor
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Manage how your business appears to Proxima users
                  </p>
                </div>
                <motion.button
                  onClick={() => {
                    setProfileSaved(true);
                    setTimeout(() => setProfileSaved(false), 3000);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white rounded-xl font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,122,0,0.6)',
                      '0 0 30px rgba(255,122,0,0.8)',
                      '0 0 20px rgba(255,122,0,0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </motion.button>
              </div>

              {/* Cover & Profile Images */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-[#FF7A00]/30 rounded-xl overflow-hidden"
                whileHover={{ borderColor: 'rgba(255,122,0,0.6)' }}
              >
                {/* Cover Image */}
                <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden group">
                  <img 
                    src={coverImageUrl} 
                    alt="Cover" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <motion.button
                    className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const newUrl = prompt('Enter new cover image URL:', coverImageUrl);
                      if (newUrl) setCoverImageUrl(newUrl);
                    }}
                  >
                    <Upload className="w-4 h-4" />
                    Change Cover
                  </motion.button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Profile Image */}
                <div className="relative px-6 pb-6">
                  <div className="relative -mt-16 mb-4 group">
                    <motion.div
                      className="w-32 h-32 rounded-2xl border-4 border-black overflow-hidden bg-gray-800"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={profileImageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.button
                      className="absolute bottom-2 right-2 p-2 bg-[#FF7A00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const newUrl = prompt('Enter new profile image URL:', profileImageUrl);
                        if (newUrl) setProfileImageUrl(newUrl);
                      }}
                    >
                      <ImageIcon className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>

                  {/* Business Name & Category */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">Business Name</label>
                      {editingField === 'name' ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="flex-1 px-4 py-2 bg-black/40 border border-[#FF7A00] rounded-lg text-white focus:outline-none focus:border-[#FF7A00]"
                            autoFocus
                          />
                          <motion.button
                            onClick={() => setEditingField(null)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Check className="w-5 h-5" />
                          </motion.button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group">
                          <h2 className="text-white text-2xl font-bold">{businessName}</h2>
                          <motion.button
                            onClick={() => setEditingField('name')}
                            className="p-2 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="w-4 h-4 text-[#FF7A00]" />
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">Category</label>
                      {editingField === 'category' ? (
                        <div className="flex gap-2">
                          <select
                            value={businessCategory}
                            onChange={(e) => setBusinessCategory(e.target.value)}
                            className="flex-1 px-4 py-2 bg-black/40 border border-[#FF7A00] rounded-lg text-white focus:outline-none"
                          >
                            <option>Café & Coworking</option>
                            <option>Restaurant</option>
                            <option>Bar & Lounge</option>
                            <option>Coworking Space</option>
                            <option>Coffee Shop</option>
                            <option>Nightclub</option>
                            <option>Event Venue</option>
                          </select>
                          <motion.button
                            onClick={() => setEditingField(null)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Check className="w-5 h-5" />
                          </motion.button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group">
                          <span className="text-[#FF7A00] font-medium">{businessCategory}</span>
                          <motion.button
                            onClick={() => setEditingField('category')}
                            className="p-2 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="w-4 h-4 text-[#FF7A00]" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bio & Description */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-blue-500/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(59,130,246,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                      Short Bio
                      <span className="text-xs text-gray-500">({businessBio.length}/160)</span>
                    </h4>
                    {editingField !== 'bio' && (
                      <motion.button
                        onClick={() => setEditingField('bio')}
                        className="p-2 bg-gray-800 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </motion.button>
                    )}
                  </div>
                  {editingField === 'bio' ? (
                    <div className="space-y-2">
                      <textarea
                        value={businessBio}
                        onChange={(e) => setBusinessBio(e.target.value.slice(0, 160))}
                        className="w-full h-24 px-4 py-2 bg-black/40 border border-blue-500 rounded-lg text-white focus:outline-none resize-none"
                        placeholder="A brief description of your business..."
                      />
                      <motion.button
                        onClick={() => setEditingField(null)}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Done
                      </motion.button>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm">{businessBio}</p>
                  )}
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-purple-500/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(147,51,234,0.6)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                      Full Description
                    </h4>
                    {editingField !== 'description' && (
                      <motion.button
                        onClick={() => setEditingField('description')}
                        className="p-2 bg-gray-800 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="w-4 h-4 text-purple-400" />
                      </motion.button>
                    )}
                  </div>
                  {editingField === 'description' ? (
                    <div className="space-y-2">
                      <textarea
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        className="w-full h-32 px-4 py-2 bg-black/40 border border-purple-500 rounded-lg text-white focus:outline-none resize-none"
                        placeholder="Detailed description of what makes your business special..."
                      />
                      <motion.button
                        onClick={() => setEditingField(null)}
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Done
                      </motion.button>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm">{businessDescription}</p>
                  )}
                </motion.div>
              </div>

              {/* Contact Information */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-green-500/30 rounded-xl p-6"
                whileHover={{ borderColor: 'rgba(34,197,94,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-400" />
                  Contact Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Phone Number</label>
                    {editingField === 'phone' ? (
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          value={businessPhone}
                          onChange={(e) => setBusinessPhone(e.target.value)}
                          className="flex-1 px-4 py-2 bg-black/40 border border-green-500 rounded-lg text-white focus:outline-none"
                        />
                        <motion.button
                          onClick={() => setEditingField(null)}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <span className="text-white">{businessPhone}</span>
                        <motion.button
                          onClick={() => setEditingField('phone')}
                          className="opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4 text-green-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Email Address</label>
                    {editingField === 'email' ? (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={businessEmail}
                          onChange={(e) => setBusinessEmail(e.target.value)}
                          className="flex-1 px-4 py-2 bg-black/40 border border-green-500 rounded-lg text-white focus:outline-none"
                        />
                        <motion.button
                          onClick={() => setEditingField(null)}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <span className="text-white">{businessEmail}</span>
                        <motion.button
                          onClick={() => setEditingField('email')}
                          className="opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4 text-green-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Website</label>
                    {editingField === 'website' ? (
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={businessWebsite}
                          onChange={(e) => setBusinessWebsite(e.target.value)}
                          className="flex-1 px-4 py-2 bg-black/40 border border-green-500 rounded-lg text-white focus:outline-none"
                        />
                        <motion.button
                          onClick={() => setEditingField(null)}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <span className="text-white">{businessWebsite}</span>
                        <motion.button
                          onClick={() => setEditingField('website')}
                          className="opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4 text-green-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Address</label>
                    {editingField === 'address' ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={businessAddress}
                          onChange={(e) => setBusinessAddress(e.target.value)}
                          className="flex-1 px-4 py-2 bg-black/40 border border-green-500 rounded-lg text-white focus:outline-none"
                        />
                        <motion.button
                          onClick={() => setEditingField(null)}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <span className="text-white">{businessAddress}</span>
                        <motion.button
                          onClick={() => setEditingField('address')}
                          className="opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4 text-green-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-pink-500/30 rounded-xl p-6"
                whileHover={{ borderColor: 'rgba(236,72,153,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-pink-400" />
                  Social Media
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Instagram */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block flex items-center gap-2">
                      <span className="text-pink-400">📷</span> Instagram
                    </label>
                    {editingField === 'instagram' ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={businessInstagram}
                          onChange={(e) => setBusinessInstagram(e.target.value)}
                          className="flex-1 px-4 py-2 bg-black/40 border border-pink-500 rounded-lg text-white focus:outline-none"
                          placeholder="@username"
                        />
                        <motion.button
                          onClick={() => setEditingField(null)}
                          className="px-3 py-2 bg-pink-500 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <span className="text-white">{businessInstagram}</span>
                        <motion.button
                          onClick={() => setEditingField('instagram')}
                          className="opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4 text-pink-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Twitter/X */}
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block flex items-center gap-2">
                      <span className="text-blue-400">🐦</span> Twitter/X
                    </label>
                    {editingField === 'twitter' ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={businessTwitter}
                          onChange={(e) => setBusinessTwitter(e.target.value)}
                          className="flex-1 px-4 py-2 bg-black/40 border border-blue-500 rounded-lg text-white focus:outline-none"
                          placeholder="@username"
                        />
                        <motion.button
                          onClick={() => setEditingField(null)}
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <span className="text-white">{businessTwitter}</span>
                        <motion.button
                          onClick={() => setEditingField('twitter')}
                          className="opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Edit className="w-4 h-4 text-blue-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Tags & Amenities */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tags */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-amber-500/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(245,158,11,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-amber-400" />
                    Tags & Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {businessTags.map((tag, i) => (
                      <motion.div
                        key={i}
                        className="px-3 py-1.5 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-full text-sm flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                        <motion.button
                          onClick={() => setBusinessTags(businessTags.filter((_, idx) => idx !== i))}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    onClick={() => {
                      const newTag = prompt('Add a new tag:');
                      if (newTag) setBusinessTags([...businessTags, newTag]);
                    }}
                    className="w-full px-4 py-2 bg-amber-500/20 border border-amber-500 text-amber-400 rounded-lg font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Tag className="w-4 h-4" />
                    Add Tag
                  </motion.button>
                </motion.div>

                {/* Amenities */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-cyan-500/30 rounded-xl p-6"
                  whileHover={{ borderColor: 'rgba(6,182,212,0.6)' }}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-cyan-400" />
                    Amenities
                  </h4>
                  <div className="space-y-2">
                    {businessAmenities.map((amenity) => (
                      <motion.div
                        key={amenity.id}
                        className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          amenity.enabled
                            ? 'bg-cyan-500/10 border-cyan-500/30'
                            : 'bg-gray-900/40 border-gray-800'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          setBusinessAmenities(businessAmenities.map(a =>
                            a.id === amenity.id ? { ...a, enabled: !a.enabled } : a
                          ));
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${amenity.enabled ? 'text-cyan-400' : 'text-gray-500'}`}>
                            {amenity.name}
                          </span>
                          <motion.div
                            animate={{ scale: amenity.enabled ? 1 : 0.8 }}
                            className={`w-5 h-5 rounded ${
                              amenity.enabled ? 'bg-cyan-500' : 'bg-gray-700'
                            } flex items-center justify-center`}
                          >
                            {amenity.enabled && <Check className="w-3 h-3 text-white" />}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Business Hours */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-violet-500/30 rounded-xl p-6"
                whileHover={{ borderColor: 'rgba(139,92,246,0.6)' }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-violet-400" />
                  Business Hours
                </h4>
                <div className="space-y-3">
                  {businessHours.map((day, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-black/40 border border-gray-800 rounded-lg"
                      whileHover={{ borderColor: 'rgba(139,92,246,0.3)' }}
                    >
                      <div className="w-24">
                        <span className="text-white font-medium">{day.day}</span>
                      </div>
                      {day.closed ? (
                        <div className="flex-1 flex items-center justify-between">
                          <span className="text-gray-500">Closed</span>
                          <motion.button
                            onClick={() => {
                              const newHours = [...businessHours];
                              newHours[i] = { ...newHours[i], closed: false };
                              setBusinessHours(newHours);
                            }}
                            className="px-3 py-1 bg-violet-500 text-white rounded text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            Open
                          </motion.button>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center gap-3">
                          <input
                            type="time"
                            value={day.open}
                            onChange={(e) => {
                              const newHours = [...businessHours];
                              newHours[i] = { ...newHours[i], open: e.target.value };
                              setBusinessHours(newHours);
                            }}
                            className="px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                          />
                          <span className="text-gray-400">-</span>
                          <input
                            type="time"
                            value={day.close}
                            onChange={(e) => {
                              const newHours = [...businessHours];
                              newHours[i] = { ...newHours[i], close: e.target.value };
                              setBusinessHours(newHours);
                            }}
                            className="px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                          />
                          <motion.button
                            onClick={() => {
                              const newHours = [...businessHours];
                              newHours[i] = { ...newHours[i], closed: true };
                              setBusinessHours(newHours);
                            }}
                            className="px-3 py-1 bg-red-500/20 border border-red-500 text-red-400 rounded text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            Close
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => {
                    const confirmed = confirm('Apply these hours to all days?');
                    if (confirmed) {
                      const template = businessHours[0];
                      setBusinessHours(businessHours.map(day => ({
                        ...day,
                        open: template.open,
                        close: template.close,
                        closed: template.closed
                      })));
                    }
                  }}
                  className="w-full mt-4 px-4 py-2 bg-violet-500/20 border border-violet-500 text-violet-400 rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Copy Monday Hours to All Days
                </motion.button>
              </motion.div>

              {/* Preview Card */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border-2 border-[#FF7A00]/40 rounded-xl p-6"
                animate={{
                  borderColor: [
                    'rgba(255,122,0,0.4)',
                    'rgba(255,122,0,0.8)',
                    'rgba(255,122,0,0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#FF7A00]" />
                  Live Preview
                  <span className="px-2 py-0.5 bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF7A00] text-xs rounded-full">
                    How users see your business
                  </span>
                </h4>
                
                {/* Mock Business Card Preview */}
                <motion.div
                  className="bg-gradient-to-br from-black/60 to-gray-900/80 border border-gray-700 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
                    <img src={coverImageUrl} alt="Cover" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl border-4 border-black -mt-12 overflow-hidden bg-gray-800">
                        <img src={profileImageUrl} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 mt-2">
                        <h3 className="text-white font-bold text-lg">{businessName}</h3>
                        <p className="text-[#FF7A00] text-sm">{businessCategory}</p>
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg text-sm font-semibold h-fit"
                        whileHover={{ scale: 1.05 }}
                      >
                        Follow
                      </motion.button>
                    </div>
                    <p className="text-gray-300 text-sm mt-4">{businessBio}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {businessTags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Currently</p>
                        <p className="text-green-400 font-semibold text-sm">Open • 47 nearby</p>
                      </div>
                      <div className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Vibe</p>
                        <p className="text-amber-400 font-semibold text-sm">Warm & Social</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ZONE CHAT & VOICE TAB */}
          {activeTab === 'chatvoice' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Zone Chat & Voice Channels</h2>
                  <p className="text-gray-400">Real-time communication with guests in your venue</p>
                </div>
                <motion.div
                  className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg flex items-center gap-2"
                  animate={{
                    boxShadow: [
                      '0 0 15px rgba(34,197,94,0.4)',
                      '0 0 25px rgba(34,197,94,0.6)',
                      '0 0 15px rgba(34,197,94,0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-4 h-4" />
                  <span className="font-semibold">{chatMessages.length} Messages</span>
                </motion.div>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* ZONE CHAT SECTION */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-[#FF7A00]/30 rounded-xl overflow-hidden"
                  whileHover={{ borderColor: 'rgba(255,122,0,0.5)' }}
                >
                  {/* Chat Header */}
                  <div className="bg-black/60 border-b border-[#FF7A00]/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#FF7A00]/20 rounded-lg">
                          <MessageCircle className="w-5 h-5 text-[#FF7A00]" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Zone Chat</h3>
                          <p className="text-xs text-gray-400">{activeUsers} users in zone</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => setHostToolsOpen(!hostToolsOpen)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          hostToolsOpen
                            ? 'bg-[#FF7A00] text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Zap className="w-4 h-4" />
                        Host Tools
                      </motion.button>
                    </div>
                  </div>

                  {/* Host Tools Panel */}
                  <AnimatePresence>
                    {hostToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-black/40 border-b border-[#FF7A00]/20 overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                          <h4 className="text-white font-semibold text-sm mb-3">📢 Broadcast to Zone Chat</h4>
                          
                          {/* Send Offer */}
                          <div className="p-3 bg-gray-900/60 border border-orange-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Tag className="w-4 h-4 text-orange-400" />
                              <span className="text-white font-medium text-sm">Send Offer</span>
                            </div>
                            <input
                              type="text"
                              value={offerText}
                              onChange={(e) => setOfferText(e.target.value)}
                              placeholder="e.g., 20% off all drinks!"
                              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded text-white text-sm mb-2 focus:border-orange-500 focus:outline-none"
                            />
                            <input
                              type="text"
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value)}
                              placeholder="Code (optional)"
                              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded text-white text-sm mb-2 focus:border-orange-500 focus:outline-none"
                            />
                            <motion.button
                              onClick={sendOffer}
                              disabled={!offerText.trim()}
                              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={offerText.trim() ? { scale: 1.02 } : {}}
                              whileTap={offerText.trim() ? { scale: 0.98 } : {}}
                            >
                              🔥 Send Offer
                            </motion.button>
                          </div>

                          {/* Send Discount */}
                          <div className="p-3 bg-gray-900/60 border border-green-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Percent className="w-4 h-4 text-green-400" />
                              <span className="text-white font-medium text-sm">Create & Push Discount</span>
                            </div>
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                                placeholder="e.g., 15% or £5"
                                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                              />
                              <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="Code (e.g., SAVE15)"
                                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                              />
                              
                              {/* Quick discount presets */}
                              <div className="flex gap-2 flex-wrap">
                                <motion.button
                                  onClick={() => {
                                    setDiscountAmount('10%');
                                    setDiscountCode('SAVE10');
                                  }}
                                  className="px-2 py-1 bg-green-500/20 border border-green-500/40 text-green-400 rounded text-xs hover:bg-green-500/30"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  10% Off
                                </motion.button>
                                <motion.button
                                  onClick={() => {
                                    setDiscountAmount('20%');
                                    setDiscountCode('SAVE20');
                                  }}
                                  className="px-2 py-1 bg-green-500/20 border border-green-500/40 text-green-400 rounded text-xs hover:bg-green-500/30"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  20% Off
                                </motion.button>
                                <motion.button
                                  onClick={() => {
                                    setDiscountAmount('£5');
                                    setDiscountCode('FIVEPOUNDS');
                                  }}
                                  className="px-2 py-1 bg-green-500/20 border border-green-500/40 text-green-400 rounded text-xs hover:bg-green-500/30"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  £5 Off
                                </motion.button>
                              </div>
                            </div>
                            <motion.button
                              onClick={sendDiscount}
                              disabled={!discountAmount.trim()}
                              className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={discountAmount.trim() ? { scale: 1.02 } : {}}
                              whileTap={discountAmount.trim() ? { scale: 0.98 } : {}}
                              animate={discountAmount.trim() ? {
                                boxShadow: [
                                  '0 0 20px rgba(34,197,94,0.4)',
                                  '0 0 30px rgba(34,197,94,0.6)',
                                  '0 0 20px rgba(34,197,94,0.4)'
                                ]
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              💰 Push Discount to Chat
                            </motion.button>
                          </div>

                          {/* Send Event */}
                          <div className="p-3 bg-gray-900/60 border border-purple-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-purple-400" />
                              <span className="text-white font-medium text-sm">Announce Event</span>
                            </div>
                            <input
                              type="text"
                              value={eventTitle}
                              onChange={(e) => setEventTitle(e.target.value)}
                              placeholder="Event name"
                              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded text-white text-sm mb-2 focus:border-purple-500 focus:outline-none"
                            />
                            <input
                              type="text"
                              value={eventTime}
                              onChange={(e) => setEventTime(e.target.value)}
                              placeholder="Time (e.g., Today at 3pm)"
                              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded text-white text-sm mb-2 focus:border-purple-500 focus:outline-none"
                            />
                            <motion.button
                              onClick={sendEvent}
                              disabled={!eventTitle.trim()}
                              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={eventTitle.trim() ? { scale: 1.02 } : {}}
                              whileTap={eventTitle.trim() ? { scale: 0.98 } : {}}
                            >
                              📅 Announce Event
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Chat Messages */}
                  <div className="h-[500px] overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[#FF7A00]/30">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {/* User Message */}
                        {msg.type === 'user' && (
                          <div className="flex gap-3">
                            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">
                              {msg.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-semibold text-sm">{msg.user}</span>
                                {msg.host && (
                                  <span className="px-2 py-0.5 bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF7A00] rounded text-xs font-semibold">
                                    HOST
                                  </span>
                                )}
                                <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{msg.text}</p>
                            </div>
                          </div>
                        )}

                        {/* Host Message */}
                        {msg.type === 'host' && (
                          <motion.div
                            className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg p-3"
                            whileHover={{ borderColor: 'rgba(255,122,0,0.6)' }}
                          >
                            <div className="flex gap-3">
                              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg">
                                {msg.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-semibold text-sm">{msg.user}</span>
                                  <span className="px-2 py-0.5 bg-[#FF7A00] text-white rounded text-xs font-bold">
                                    HOST
                                  </span>
                                  <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                                </div>
                                <p className="text-gray-200 text-sm">{msg.text}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Offer Message */}
                        {msg.type === 'offer' && (
                          <motion.div
                            className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-lg p-4"
                            animate={{
                              boxShadow: [
                                '0 0 20px rgba(249,115,22,0.3)',
                                '0 0 30px rgba(249,115,22,0.5)',
                                '0 0 20px rgba(249,115,22,0.3)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-orange-300 font-bold text-sm">{msg.title}</h4>
                              <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                            </div>
                            <p className="text-white text-sm mb-3">{msg.text}</p>
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1.5 bg-orange-500 text-white rounded-lg font-mono text-sm font-bold">
                                {msg.code}
                              </div>
                              <motion.button
                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Copy Code
                              </motion.button>
                            </div>
                          </motion.div>
                        )}

                        {/* Event Message */}
                        {msg.type === 'event' && (
                          <motion.div
                            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-lg p-4"
                            whileHover={{ borderColor: 'rgba(168,85,247,0.8)' }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-purple-300 font-bold text-sm">{msg.title}</h4>
                              <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                            </div>
                            <p className="text-white text-sm mb-3">{msg.text}</p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 text-purple-300 text-sm">
                                <Users className="w-4 h-4" />
                                <span>{msg.attendees || 0} interested</span>
                              </div>
                              <motion.button
                                className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-sm font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                I'm Interested
                              </motion.button>
                            </div>
                          </motion.div>
                        )}

                        {/* System Message */}
                        {msg.type === 'system' && (
                          <div className="flex justify-center">
                            <div className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-full text-gray-400 text-xs">
                              {msg.text} • {msg.timestamp}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Composer */}
                  <div className="bg-black/60 border-t border-[#FF7A00]/20 p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                        placeholder="Send message as host..."
                        className="flex-1 px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg text-white text-sm focus:border-[#FF7A00] focus:outline-none"
                      />
                      <motion.button
                        onClick={sendChatMessage}
                        disabled={!chatMessage.trim()}
                        className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        whileHover={chatMessage.trim() ? { scale: 1.05 } : {}}
                        whileTap={chatMessage.trim() ? { scale: 0.95 } : {}}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* VOICE CHANNELS SECTION */}
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-purple-500/30 rounded-xl overflow-hidden"
                  whileHover={{ borderColor: 'rgba(168,85,247,0.5)' }}
                >
                  {/* Voice Header */}
                  <div className="bg-black/60 border-b border-purple-500/20 p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Mic className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Voice Channels</h3>
                        <p className="text-xs text-gray-400">Zone audio spaces</p>
                      </div>
                    </div>
                  </div>

                  {/* Voice Channels List */}
                  <div className="p-4 space-y-3">
                    {[
                      { id: 1, name: '🎯 Main Lounge', description: 'General hangout space' },
                      { id: 2, name: '💼 Coworking Quiet', description: 'For focused collaboration' },
                      { id: 3, name: '🎨 Creative Corner', description: 'Design & creative chats' }
                    ].map((channel) => (
                      <motion.div
                        key={channel.id}
                        className={`bg-gray-900/60 border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedVoiceChannel === channel.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-700 hover:border-purple-500/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-sm mb-1">{channel.name}</h4>
                            <p className="text-gray-400 text-xs">{channel.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <Users className="w-4 h-4" />
                              <span>{voiceChannelUsers[channel.id]?.length || 0}</span>
                            </div>
                            {selectedVoiceChannel === channel.id ? (
                              <motion.button
                                onClick={() => leaveVoiceChannel()}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Leave
                              </motion.button>
                            ) : (
                              <motion.button
                                onClick={() => joinVoiceChannel(channel.id)}
                                className="px-3 py-1 bg-purple-500 text-white rounded-lg text-xs font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Join
                              </motion.button>
                            )}
                          </div>
                        </div>

                        {/* Users in Channel */}
                        {voiceChannelUsers[channel.id] && voiceChannelUsers[channel.id].length > 0 && (
                          <div className="space-y-2 pt-3 border-t border-gray-800">
                            {voiceChannelUsers[channel.id].map((user: any) => (
                              <motion.div
                                key={user.id}
                                className="flex items-center gap-3 p-2 bg-black/40 rounded-lg"
                                animate={user.speaking ? {
                                  boxShadow: [
                                    '0 0 0px rgba(168,85,247,0.3)',
                                    '0 0 15px rgba(168,85,247,0.8)',
                                    '0 0 0px rgba(168,85,247,0.3)'
                                  ]
                                } : {}}
                                transition={{ duration: 0.5, repeat: user.speaking ? Infinity : 0 }}
                              >
                                <div className="relative">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                                    {user.avatar}
                                  </div>
                                  {user.speaking && (
                                    <motion.div
                                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black flex items-center justify-center"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                      <Activity className="w-2 h-2 text-white" />
                                    </motion.div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-medium text-sm">{user.name}</span>
                                    {user.host && (
                                      <span className="px-1.5 py-0.5 bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF7A00] rounded text-xs font-bold">
                                        HOST
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">
                                      {user.speaking ? '🎤 Speaking...' : '🔇 Muted'}
                                    </span>
                                    {/* Green Equalizer Animation */}
                                    {user.speaking && (
                                      <div className="flex items-center gap-0.5">
                                        {[0, 1, 2, 3].map((bar) => (
                                          <motion.div
                                            key={bar}
                                            className="w-0.5 bg-green-400 rounded-full"
                                            animate={{
                                              height: ['4px', '12px', '6px', '10px', '4px']
                                            }}
                                            transition={{
                                              duration: 0.8,
                                              repeat: Infinity,
                                              delay: bar * 0.1,
                                              ease: "easeInOut"
                                            }}
                                          />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {selectedVoiceChannel === channel.id && (
                                  <motion.button
                                    onClick={() => toggleUserSpeaking(channel.id, user.id)}
                                    className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    {user.speaking ? (
                                      <Mic className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <Mic className="w-4 h-4 text-gray-500" />
                                    )}
                                  </motion.button>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Empty Channel */}
                        {(!voiceChannelUsers[channel.id] || voiceChannelUsers[channel.id].length === 0) && (
                          <div className="pt-3 border-t border-gray-800 text-center">
                            <p className="text-gray-500 text-xs">No one here yet</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Voice Stats */}
                  <div className="p-4 bg-black/40 border-t border-purple-500/20">
                    <h4 className="text-white font-semibold text-sm mb-3">Voice Activity Stats</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Total Users</p>
                        <p className="text-xl font-bold text-purple-400">
                          {Object.values(voiceChannelUsers).reduce((acc: number, users: any) => acc + users.length, 0)}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Active Speakers</p>
                        <p className="text-xl font-bold text-green-400">
                          {Object.values(voiceChannelUsers).reduce((acc: number, users: any) => 
                            acc + users.filter((u: any) => u.speaking).length, 0
                          )}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Avg. Session</p>
                        <p className="text-xl font-bold text-blue-400">18m</p>
                      </div>
                      <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Peak Today</p>
                        <p className="text-xl font-bold text-orange-400">8</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4"
                  whileHover={{ borderColor: 'rgba(59,130,246,0.6)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Info className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold">Zone Chat Tips</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Use host tools to send targeted offers, discounts, and event announcements directly in the chat. 
                    Messages appear naturally in the conversation flow.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
                  whileHover={{ borderColor: 'rgba(168,85,247,0.6)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Mic className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-white font-semibold">Voice Channel Benefits</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Voice channels foster organic connections. Your business name appears as a sponsor tag, 
                    raising awareness without interrupting conversations.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4"
                  whileHover={{ borderColor: 'rgba(34,197,94,0.6)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold">Engagement Boost</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Venues using chat & voice see 3.2x higher engagement and 2.8x longer average dwell times 
                    compared to those without.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* LIVE ZONE VISUALIZATION TAB */}
          {activeTab === 'zonelive' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Live Zone Activity Heatmap</h2>
                  <p className="text-gray-400">Privacy-first density visualization • GDPR Compliant</p>
                </div>
                <motion.div
                  className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg flex items-center gap-2"
                  animate={{
                    boxShadow: [
                      '0 0 15px rgba(34,197,94,0.4)',
                      '0 0 25px rgba(34,197,94,0.6)',
                      '0 0 15px rgba(34,197,94,0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-4 h-4" />
                  <span className="font-semibold">LIVE</span>
                </motion.div>
              </div>

              {/* Main Zone Visualization */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-900/60 to-black/80 border-2 border-[#FF7A00]/30 rounded-2xl overflow-hidden"
                style={{ height: '600px' }}
                animate={{
                  borderColor: [
                    'rgba(255,122,0,0.3)',
                    'rgba(255,122,0,0.6)',
                    'rgba(255,122,0,0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, #FF7A00 0px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, #FF7A00 0px, transparent 1px, transparent 30px)',
                      backgroundSize: '30px 30px'
                    }}
                  />
                </div>

                {/* Location Label */}
                <div className="absolute top-4 left-4 bg-black/90 border border-[#FF7A00]/50 rounded-lg px-4 py-2 z-20">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FF7A00]" />
                    <span className="text-white font-semibold text-sm">Tech Hub Café</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Shoreditch, London</p>
                </div>

                {/* Stats Card - Aggregated Ranges */}
                <motion.div
                  className="absolute top-4 right-4 bg-black/90 border border-[#FF7A00]/50 rounded-lg px-4 py-3 z-20"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,122,0,0.3)',
                      '0 0 30px rgba(255,122,0,0.5)',
                      '0 0 20px rgba(255,122,0,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#FF7A00]" />
                      <span className="text-white text-sm font-semibold">Zone Activity</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Total: <span className="text-[#FF7A00] font-bold">25-35 people</span>
                    </div>
                    <div className="text-xs text-emerald-400">
                      ↑ Moderate Activity
                    </div>
                  </div>
                </motion.div>

                {/* SVG Zone Visualization */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                  {/* Zone Boundary Square */}
                  <motion.rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    fill="rgba(255,122,0,0.08)"
                    stroke="#FF7A00"
                    strokeWidth="0.3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />

                  {/* Animated Pulse Squares */}
                  {[0, 1, 2].map((i) => (
                    <motion.rect
                      key={`pulse-${i}`}
                      x="50"
                      y="50"
                      width="0"
                      height="0"
                      fill="none"
                      stroke="#FF7A00"
                      strokeWidth="0.4"
                      opacity="0"
                      style={{ transformOrigin: 'center' }}
                      animate={{
                        x: [50, 5],
                        y: [50, 5],
                        width: [0, 90],
                        height: [0, 90],
                        opacity: [0.8, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut"
                      }}
                    />
                  ))}

                  {/* Glowing Zone Border */}
                  <motion.rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    fill="none"
                    stroke="#FF7A00"
                    strokeWidth="0.6"
                    filter="url(#glow)"
                    animate={{
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />

                  {/* Define glow filter */}
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Business Center Point */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="2"
                    fill="#FF7A00"
                    animate={{
                      r: [2, 2.5, 2],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />

                  {/* Center Glow */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="3"
                    fill="#FF7A00"
                    opacity="0"
                    animate={{
                      r: [3, 6],
                      opacity: [0.6, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />

                  {/* Radius Line */}
                  <motion.line
                    x1="50"
                    y1="50"
                    x2="90"
                    y2="50"
                    stroke="#FF7A00"
                    strokeWidth="0.15"
                    strokeDasharray="0.5,0.5"
                    opacity="0.4"
                  />

                  {/* GDPR-Compliant Density Heat Zones */}
                  <defs>
                    {densityAreas.map((area) => (
                      <radialGradient key={`gradient-${area.id}`} id={`density-gradient-${area.id}`}>
                        <stop offset="0%" stopColor={area.color} stopOpacity={area.intensity * 0.8} />
                        <stop offset="40%" stopColor={area.color} stopOpacity={area.intensity * 0.5} />
                        <stop offset="70%" stopColor={area.color} stopOpacity={area.intensity * 0.2} />
                        <stop offset="100%" stopColor={area.color} stopOpacity="0" />
                      </radialGradient>
                    ))}
                  </defs>

                  {/* Density Blobs - No Individual Tracking */}
                  {densityAreas.map((area, index) => (
                    <motion.g key={area.id}>
                      {/* Main density blob */}
                      <motion.ellipse
                        cx={area.x}
                        cy={area.y}
                        rx="12"
                        ry="10"
                        fill={`url(#density-gradient-${area.id})`}
                        animate={{
                          rx: [12, 13, 12],
                          ry: [10, 11, 10],
                          opacity: [area.intensity * 0.9, area.intensity, area.intensity * 0.9]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Pulsing ring around density zone */}
                      <motion.ellipse
                        cx={area.x}
                        cy={area.y}
                        rx="8"
                        ry="7"
                        fill="none"
                        stroke={area.color}
                        strokeWidth="0.3"
                        opacity="0"
                        animate={{
                          rx: [8, 16],
                          ry: [7, 14],
                          opacity: [area.intensity * 0.6, 0]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeOut"
                        }}
                      />

                      {/* Activity indicator particles */}
                      {area.intensity > 0.3 && [...Array(3)].map((_, i) => {
                        const angle = (i * 120) * (Math.PI / 180);
                        const distance = 8;
                        return (
                          <motion.circle
                            key={`particle-${area.id}-${i}`}
                            cx={area.x}
                            cy={area.y}
                            r="0.5"
                            fill={area.color}
                            animate={{
                              cx: [area.x, area.x + Math.cos(angle) * distance, area.x],
                              cy: [area.y, area.y + Math.sin(angle) * distance, area.y],
                              opacity: [0, area.intensity, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3 + i * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        );
                      })}
                    </motion.g>
                  ))}

                  {/* Flow indicators between zones - No individual paths */}
                  {densityAreas.map((area1, i) => 
                    densityAreas.slice(i + 1).map((area2, j) => {
                      if (area1.intensity > 0.4 && area2.intensity > 0.4) {
                        const midX = (area1.x + area2.x) / 2;
                        const midY = (area1.y + area2.y) / 2;
                        return (
                          <motion.g key={`flow-${i}-${j}`}>
                            <motion.line
                              x1={area1.x}
                              y1={area1.y}
                              x2={area2.x}
                              y2={area2.y}
                              stroke="#FF7A00"
                              strokeWidth="0.15"
                              strokeDasharray="1,2"
                              opacity="0"
                              animate={{
                                opacity: [0, 0.3, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                            />
                            {/* Flow arrow */}
                            <motion.circle
                              cx={midX}
                              cy={midY}
                              r="0.8"
                              fill="#FF7A00"
                              opacity="0"
                              animate={{
                                opacity: [0, 0.6, 0],
                                scale: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                            />
                          </motion.g>
                        );
                      }
                      return null;
                    })
                  )}
                </svg>

                {/* Area-Based Activity Labels - GDPR Compliant */}
                {densityAreas.map((area, index) => (
                  <motion.div
                    key={`label-${area.id}`}
                    className="absolute bg-black/90 border border-gray-700 rounded-lg px-3 py-2 text-xs z-10 backdrop-blur-sm"
                    style={{
                      left: `${area.x}%`,
                      top: `${area.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.1,
                      borderColor: area.color,
                      boxShadow: `0 0 20px ${area.color}40`
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: area.color }}
                        animate={{
                          boxShadow: [
                            `0 0 0px ${area.color}`,
                            `0 0 8px ${area.color}`,
                            `0 0 0px ${area.color}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-white font-semibold">{area.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {area.maxCount > 2 ? (
                        <>
                          <Users className="w-3 h-3 text-gray-400" />
                          <span style={{ color: area.color }} className="font-bold">
                            {area.minCount}-{area.maxCount} people
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500 text-xs">Low activity</span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {area.intensity > 0.7 ? '🔥 High' : area.intensity > 0.4 ? '📊 Moderate' : '📉 Low'}
                    </div>
                  </motion.div>
                ))}

                {/* Radius Label */}
                <motion.div
                  className="absolute top-1/2 right-[8%] bg-black/90 border border-[#FF7A00]/50 rounded px-3 py-1.5 text-xs text-white z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3 h-3 text-[#FF7A00]" />
                    <span>180m radius</span>
                  </div>
                </motion.div>

                {/* Bottom Stats Bar - Aggregated Privacy-Safe Metrics */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black/95 border-t-2 border-[#FF7A00]/30 backdrop-blur-md p-4"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Total Range</div>
                      <motion.div
                        className="text-lg md:text-xl font-bold text-[#FF7A00]"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        25-35
                      </motion.div>
                      <div className="text-xs text-gray-500">people</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Peak Zone</div>
                      <div className="text-lg md:text-xl font-bold text-green-400">Seating</div>
                      <div className="text-xs text-gray-500">8-12 people</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Avg. Dwell</div>
                      <div className="text-lg md:text-xl font-bold text-blue-400">18m</div>
                      <div className="text-xs text-gray-500">smoothed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Activity Level</div>
                      <div className="text-lg md:text-xl font-bold text-purple-400">Moderate</div>
                      <div className="text-xs text-gray-500">4 hot zones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-1">Coverage</div>
                      <div className="text-lg md:text-xl font-bold text-cyan-400">180m</div>
                      <div className="text-xs text-gray-500">radius</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Info Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5"
                  whileHover={{ 
                    borderColor: 'rgba(59,130,246,0.6)',
                    boxShadow: '0 0 30px rgba(59,130,246,0.3)' 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold">UK GDPR Compliant</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    <strong>Density-based visualization</strong> shows area activity, not individual people. No single person can be tracked or identified. 
                    All data is aggregated, anonymized, and displayed with time delays.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5"
                  whileHover={{ 
                    borderColor: 'rgba(168,85,247,0.6)',
                    boxShadow: '0 0 30px rgba(168,85,247,0.3)' 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Layers className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-white font-semibold">Area-Based Heatmap</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    See <strong>crowd behavior patterns</strong> through soft density zones, not individual dots. 
                    Shows "warm zones" vs "quiet zones" with smoothed, delayed updates to prevent real-time tracking.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5"
                  whileHover={{ 
                    borderColor: 'rgba(249,115,22,0.6)',
                    boxShadow: '0 0 30px rgba(249,115,22,0.3)' 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Target className="w-5 h-5 text-orange-400" />
                    </div>
                    <h4 className="text-white font-semibold">Anti-Stalking Design</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    <strong>No trails, paths, or individual routes.</strong> Shows flow increases ("activity near counter") 
                    but never tracks movements. Ranges like "5-10 people" prevent singling out individuals.
                  </p>
                </motion.div>
              </div>

              {/* Zone Controls */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-gray-700 rounded-xl p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#FF7A00]" />
                    Privacy-Safe Zone Settings
                  </h3>
                  <div className="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    GDPR Compliant
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">Density Updates</span>
                      <motion.div
                        className={`w-12 h-6 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-600'} cursor-pointer`}
                        onClick={() => setIsLive(!isLive)}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-md"
                          animate={{ x: isLive ? 26 : 2, y: 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.div>
                    </div>
                    <p className="text-gray-400 text-xs">
                      {isLive ? 'Aggregated density view with 30s delay' : 'Updates paused'}
                    </p>
                  </div>

                  <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <div className="text-white text-sm font-medium mb-2">Zone Radius</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-[#FF7A00] text-lg font-bold">{zoneRadius}m</div>
                      <Navigation className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Geofence boundary (fixed)</p>
                  </div>

                  <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <div className="text-white text-sm font-medium mb-2">Data Protection</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-green-400 text-lg font-bold">100%</div>
                      <ShieldCheck className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">No individual tracking</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </div>

        {/* SETTINGS MODAL */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-6 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Settings className="w-6 h-6 text-[#FF7A00]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Dashboard Settings</h3>
                      <p className="text-gray-400 text-sm">Customize your experience</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {/* Auto Refresh */}
                  <div className="flex items-center justify-between p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Auto-Refresh Data</p>
                      <p className="text-gray-400 text-sm">Automatically update metrics every 3 seconds</p>
                    </div>
                    <motion.button
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        autoRefresh ? 'bg-[#FF7A00]' : 'bg-gray-700'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: autoRefresh ? 26 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>

                  {/* Live Mode */}
                  <div className="flex items-center justify-between p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Live Mode</p>
                      <p className="text-gray-400 text-sm">Real-time data streaming</p>
                    </div>
                    <motion.button
                      onClick={() => setIsLive(!isLive)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        isLive ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: isLive ? 26 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>

                  {/* Export Format */}
                  <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <p className="text-white font-medium mb-3">Default Export Format</p>
                    <div className="flex gap-2">
                      {['pdf', 'csv', 'excel'].map((format) => (
                        <motion.button
                          key={format}
                          onClick={() => setExportFormat(format as any)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            exportFormat === format
                              ? 'bg-[#FF7A00] text-white'
                              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {format.toUpperCase()}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <p className="text-white font-medium mb-2">Time Zone</p>
                    <p className="text-gray-400 text-sm">GMT +0 (London)</p>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between p-4 bg-black/40 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-gray-400 text-sm">Alert me of important events</p>
                    </div>
                    <motion.button
                      className="w-12 h-6 rounded-full bg-[#FF7A00]"
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: 26 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800 flex gap-3">
                  <motion.button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-2 bg-[#FF7A00] text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Settings
                  </motion.button>
                  <motion.button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DRILL-DOWN INSIGHTS PANEL */}
        <AnimatePresence>
          {insightsPanelOpen && drillDownView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setInsightsPanelOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#FF7A00] rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF7A00] rounded-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{drillDownView} Deep Dive</h3>
                      <p className="text-gray-400 text-sm">Detailed metrics and insights</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setInsightsPanelOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </motion.button>
                </div>

                {/* Dynamic Drill-Down Content */}
                {drillDownView === 'Traffic' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Peak Hour', value: '12-1 PM', change: '+15%' },
                        { label: 'Avg. Duration', value: '42min', change: '+8%' },
                        { label: 'Return Rate', value: '68%', change: '+12%' },
                        { label: 'New Visitors', value: '34%', change: '+5%' }
                      ].map((metric, i) => (
                        <div key={i} className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                          <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                          <p className="text-xs text-green-400">{metric.change}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Hourly Traffic Pattern</h4>
                      <div style={{ width: '100%', height: '200px' }}>
                        <CustomAreaChart
                          data={trafficData}
                          areas={[
                            { dataKey: 'visitors', fill: '#FF7A00', stroke: '#FF7A00', name: 'Visitors' }
                          ]}
                          xAxisKey="time"
                          width={700}
                          height={200}
                          showGrid={true}
                          stacked={false}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'Engagement' && (
                  <div className="space-y-6">
                    <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Engagement Breakdown</h4>
                      <div className="space-y-3">
                        {[
                          { action: 'Notification Opens', count: 156, rate: 87 },
                          { action: 'Offer Redemptions', count: 89, rate: 64 },
                          { action: 'Profile Views', count: 234, rate: 92 },
                          { action: 'Social Connections', count: 67, rate: 78 }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{item.action}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-white font-semibold">{item.count}</span>
                              <div className="w-32 bg-gray-800 rounded-full h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-[#FF7A00] to-orange-600 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.rate}%` }}
                                  transition={{ duration: 1, delay: i * 0.1 }}
                                />
                              </div>
                              <span className="text-gray-400 text-sm w-12">{item.rate}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'Revenue' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {revenueSourceData.slice(0, 4).map((source, i) => (
                        <div key={i} className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                          <p className="text-xs text-gray-400 mb-2">{source.source}</p>
                          <p className="text-2xl font-bold text-[#FF7A00] mb-1">${source.amount}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{source.percentage}% of total</span>
                            <span className="text-green-400">ROI: {source.roi}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Revenue Attribution</h4>
                      <div style={{ width: '100%', height: '250px' }}>
                        <CustomBarChart
                          data={revenueSourceData}
                          bars={[
                            { dataKey: 'amount', fill: '#FF7A00', name: 'Revenue' }
                          ]}
                          width={700}
                          height={250}
                          showGrid={true}
                          showLabels={false}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'Satisfaction' && (
                  <div className="space-y-6">
                    <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Customer Satisfaction Topics</h4>
                      <div className="space-y-3">
                        {sentimentTopics.map((topic, i) => (
                          <div key={i} className="p-3 bg-black/40 border border-gray-800 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium text-sm">{topic.topic}</span>
                              <span className="text-gray-400 text-xs">{topic.mentions} mentions</span>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-green-400">Positive</span>
                                  <span className="text-green-400">{topic.positive}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5">
                                  <div 
                                    className="bg-green-500 h-1.5 rounded-full"
                                    style={{ width: `${topic.positive}%` }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-red-400">Negative</span>
                                  <span className="text-red-400">{topic.negative}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5">
                                  <div 
                                    className="bg-red-500 h-1.5 rounded-full"
                                    style={{ width: `${topic.negative}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'Sentiment Analysis' && (
                  <div className="space-y-6">
                    <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Detailed Sentiment Breakdown</h4>
                      <div style={{ width: '100%', height: '300px' }}>
                        <CustomLineChart
                          data={sentimentData}
                          lines={[
                            { dataKey: 'positive', stroke: '#10b981', name: 'Positive', strokeWidth: 3 },
                            { dataKey: 'negative', stroke: '#ef4444', name: 'Negative', strokeWidth: 3 }
                          ]}
                          xAxisKey="category"
                          width={700}
                          height={300}
                          showGrid={true}
                          showDots={true}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'Walk-By Analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Approached</p>
                        <p className="text-3xl font-bold text-blue-400">{walkByData.approached}</p>
                      </div>
                      <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Entered</p>
                        <p className="text-3xl font-bold text-green-400">{walkByData.entered}</p>
                      </div>
                      <div className="p-4 bg-black/40 border border-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Conversion</p>
                        <p className="text-3xl font-bold text-[#FF7A00]">{walkByData.conversion}%</p>
                      </div>
                    </div>

                    <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Conversion Funnel</h4>
                      <div className="space-y-2">
                        {[
                          { stage: 'Walked By Zone', value: 100, color: '#3b82f6' },
                          { stage: 'Approached Entrance', value: (walkByData.approached / 200 * 100).toFixed(0), color: '#10b981' },
                          { stage: 'Entered Venue', value: (walkByData.entered / 200 * 100).toFixed(0), color: '#FF7A00' }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-300">{item.stage}</span>
                              <span className="text-white font-semibold">{item.value}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                              <motion.div
                                className="h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Default view for other metrics */}
                {!['Traffic', 'Engagement', 'Revenue', 'Satisfaction', 'Sentiment Analysis', 'Walk-By Analytics'].includes(drillDownView) && (
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-[#FF7A00] mx-auto mb-4" />
                    <p className="text-gray-400">Detailed analytics for <span className="text-white font-semibold">{drillDownView}</span></p>
                    <p className="text-gray-500 text-sm mt-2">More insights coming soon...</p>
                  </div>
                )}

                {/* Export Actions */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-800">
                  <motion.button
                    onClick={() => handleExport('pdf')}
                    className="flex-1 px-4 py-2 bg-[#FF7A00] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={exportLoading}
                  >
                    {exportLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Export PDF
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => handleExport('csv')}
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText className="w-4 h-4" />
                    Export CSV
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const ZonesBusinessDashboard = memo(ZonesBusinessDashboardComponent);
