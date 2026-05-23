import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Users, TrendingUp, Bell, Zap, Brain, Star, MessageSquare, 
  Shield, Trophy, UserCheck, Repeat, Navigation, Hand, Mic, Database,
  Settings, BarChart3, Activity, Clock, Target, AlertCircle, Check,
  X, Send, Edit, Download, Eye, ChevronRight, Coffee, Play, Pause, Medal,
  Filter, Calendar, DollarSign, Heart, Share2, Gift, Sparkles, Radio,
  Waves, TrendingDown, Maximize2, Minimize2, RefreshCw, Save, Upload,
  Smartphone, Globe, Instagram, Facebook, Twitter, Linkedin, Mail,
  UserPlus, MessageCircle, ThumbsUp, ArrowUp, ArrowDown, Zap as ZapIcon,
  PieChart as PieIcon, FileText, Image as ImageIcon, Video, Music,
  Lock, Unlock, AlertTriangle, CheckCircle, Info, HelpCircle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const COLORS = ['#FF7A00', '#10b981', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'];

export function ZonesBusinessDashboardEnhanced() {
  // All existing states
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

  // NEW Enhanced States
  const [revenue, setRevenue] = useState(2847);
  const [conversionRate, setConversionRate] = useState(34);
  const [avgSpend, setAvgSpend] = useState(28.50);
  const [returnVisitors, setReturnVisitors] = useState(68);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [campaignActive, setCampaignActive] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [mediaUploads, setMediaUploads] = useState<any[]>([]);
  const [contestActive, setContestActive] = useState(false);
  const [prizes, setPrizes] = useState<any[]>([
    { id: 1, name: 'Free Coffee', claimed: 12, total: 50 },
    { id: 2, name: '20% Off', claimed: 28, total: 100 },
    { id: 3, name: 'VIP Pass', claimed: 5, total: 10 }
  ]);
  const [loyaltyTiers, setLoyaltyTiers] = useState([
    { name: 'Bronze', users: 142, minPoints: 0, color: '#cd7f32' },
    { name: 'Silver', users: 87, minPoints: 100, color: '#c0c0c0' },
    { name: 'Gold', users: 34, minPoints: 500, color: '#ffd700' },
    { name: 'Platinum', users: 12, minPoints: 1000, color: '#a855f7' }
  ]);
  const [peakHours, setPeakHours] = useState([
    { hour: '8-9AM', traffic: 45, revenue: 320 },
    { hour: '12-1PM', traffic: 120, revenue: 1240 },
    { hour: '5-6PM', traffic: 98, revenue: 890 },
    { hour: '7-8PM', traffic: 76, revenue: 680 }
  ]);
  const [competitorData, setCompetitorData] = useState([
    { name: 'Your Zone', traffic: 142, engagement: 87, revenue: 2847 },
    { name: 'Competitor A', traffic: 98, engagement: 72, revenue: 1950 },
    { name: 'Competitor B', traffic: 134, engagement: 65, revenue: 2340 }
  ]);
  const [demographics, setDemographics] = useState({
    age: [
      { range: '18-24', percentage: 28, color: '#3b82f6' },
      { range: '25-34', percentage: 42, color: '#10b981' },
      { range: '35-44', percentage: 20, color: '#f59e0b' },
      { range: '45+', percentage: 10, color: '#a855f7' }
    ],
    interests: [
      { name: 'Tech', score: 92 },
      { name: 'Food', score: 88 },
      { name: 'Music', score: 75 },
      { name: 'Sports', score: 65 },
      { name: 'Art', score: 70 },
      { name: 'Business', score: 85 }
    ]
  });

  // Analytics data
  const trafficData = [
    { time: '9AM', visitors: 12, engaged: 8, revenue: 145 },
    { time: '10AM', visitors: 28, engaged: 22, revenue: 280 },
    { time: '11AM', visitors: 45, engaged: 38, revenue: 450 },
    { time: '12PM', visitors: 68, engaged: 61, revenue: 720 },
    { time: '1PM', visitors: 72, engaged: 65, revenue: 850 },
    { time: '2PM', visitors: 54, engaged: 48, revenue: 520 },
    { time: '3PM', visitors: 38, engaged: 32, revenue: 340 },
    { time: '4PM', visitors: 42, engaged: 36, revenue: 380 },
    { time: '5PM', visitors: 58, engaged: 52, revenue: 640 }
  ];

  const dwellTimeData = [
    { name: '<5min', value: 15, color: '#ef4444' },
    { name: '5-15min', value: 35, color: '#f59e0b' },
    { name: '15-30min', value: 28, color: '#10b981' },
    { name: '30min+', value: 22, color: '#3b82f6' }
  ];

  const sentimentData = [
    { category: 'Service', positive: 85, negative: 15 },
    { category: 'Ambiance', positive: 92, negative: 8 },
    { category: 'Food', positive: 78, negative: 22 },
    { category: 'Value', positive: 88, negative: 12 }
  ];

  // NEW: Enhanced mock data
  const liveUsers = [
    { id: 1, name: 'Sarah M.', avatar: '👩‍💻', status: 'active', dwellTime: '12m', spend: 15.50, interests: ['Tech', 'Coffee'], visits: 23 },
    { id: 2, name: 'John D.', avatar: '👨‍💼', status: 'active', dwellTime: '25m', spend: 42.00, interests: ['Business', 'Food'], visits: 8 },
    { id: 3, name: 'Emma W.', avatar: '👩‍🎨', status: 'browsing', dwellTime: '8m', spend: 0, interests: ['Art', 'Music'], visits: 15 },
    { id: 4, name: 'Mike R.', avatar: '👨‍🔬', status: 'active', dwellTime: '18m', spend: 28.75, interests: ['Tech', 'Science'], visits: 42 },
    { id: 5, name: 'Lisa K.', avatar: '👩‍🏫', status: 'checkout', dwellTime: '35m', spend: 55.25, interests: ['Education', 'Books'], visits: 67 }
  ];

  const socialPosts = [
    { platform: 'Instagram', reach: 12400, engagement: 892, likes: 1240 },
    { platform: 'Facebook', reach: 8900, engagement: 445, likes: 670 },
    { platform: 'Twitter', reach: 5600, engagement: 334, likes: 420 },
    { platform: 'LinkedIn', reach: 3200, engagement: 256, likes: 180 }
  ];

  // Simulate live updates with more data
  useEffect(() => {
    if (isLive && autoRefresh) {
      const interval = setInterval(() => {
        setActiveUsers(prev => Math.max(10, prev + Math.floor(Math.random() * 5) - 2));
        setRevenue(prev => prev + Math.floor(Math.random() * 50));
        setConversionRate(prev => Math.max(20, Math.min(95, prev + Math.floor(Math.random() * 3) - 1)));
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [isLive, autoRefresh, refreshInterval]);

  // Generate AI copy
  const generateAICopy = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const copies = [
        `✨ ${aiPrompt} - Experience the magic today at ${avgSpend.toFixed(2)}!`,
        `🎉 Just announced: ${aiPrompt}. Join ${activeUsers} others now!`,
        `💫 ${aiPrompt} - Limited time! ${conversionRate}% of visitors love this!`,
        `🚀 Trending now: ${aiPrompt}. Don't miss out on the buzz!`,
        `⚡ ${aiPrompt} - Your perfect moment starts here!`
      ];
      setGeneratedCopy(copies);
      setIsGenerating(false);
    }, 2000);
  };

  // Send notification
  const sendNotification = () => {
    if (!notificationText) return;
    
    const delivered = Math.floor(Math.random() * (activeUsers * 0.8)) + Math.floor(activeUsers * 0.4);
    const opened = Math.floor(delivered * 0.6);
    
    const newNotif = {
      id: Date.now(),
      text: notificationText,
      time: new Date().toLocaleTimeString(),
      delivered,
      opened,
      clicked: Math.floor(opened * 0.4),
      converted: Math.floor(opened * 0.15)
    };
    
    setNotifications(prev => [newNotif, ...prev].slice(0, 10));
    setNotificationText('');
  };

  // Create micro-event
  const createMicroEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'Live Event',
      attendees: Math.floor(Math.random() * 15) + 5,
      active: true,
      duration: '30m',
      engagement: Math.floor(Math.random() * 30) + 70
    };
    setMicroEvents(prev => [newEvent, ...prev].slice(0, 5));
  };

  // NEW: Save template
  const saveTemplate = (content: string) => {
    const template = {
      id: Date.now(),
      name: `Template ${savedTemplates.length + 1}`,
      content,
      created: new Date().toLocaleDateString(),
      uses: 0
    };
    setSavedTemplates(prev => [template, ...prev].slice(0, 10));
  };

  // NEW: Launch campaign
  const launchCampaign = () => {
    setCampaignActive(true);
    setTimeout(() => setCampaignActive(false), 10000);
  };

  // NEW: Export report
  const exportReport = () => {
    alert('📊 Report exported! (Mock functionality - in production this would download a PDF/CSV)');
  };

  return (
    <motion.div
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
        className={`relative bg-gradient-to-br from-[#0A0A0A] via-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-3xl overflow-hidden transition-all duration-500 ${
          isFullscreen ? 'fixed inset-4 z-50' : ''
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
        <div className=\"absolute inset-0 opacity-10\">
          <motion.div
            className=\"w-full h-full\"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #FF7A00 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #FF7A00 0px, transparent 1px, transparent 20px)',
              backgroundSize: '20px 20px'
            }}
            animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: \"linear\" }}
          />
        </div>

        {/* Scanlines */}
        <div 
          className=\"absolute inset-0 opacity-5 pointer-events-none\"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 2px, transparent 4px)',
          }}
        />

        {/* Header */}
        <div className=\"relative z-10 border-b border-[#FF7A00]/20 bg-black/40 backdrop-blur-md p-4 md:p-6\">
          <div className=\"flex flex-col md:flex-row md:items-center md:justify-between gap-4\">
            <div>
              <div className=\"flex items-center gap-3 mb-2\">
                <motion.div
                  className=\"w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] rounded-xl flex items-center justify-center relative\"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,122,0,0.6)',
                      '0 0 40px rgba(255,122,0,0.8)',
                      '0 0 20px rgba(255,122,0,0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    transform: 'perspective(1000px) rotateY(0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                  whileHover={{
                    rotateY: 15,
                    rotateX: 10,
                    scale: 1.1
                  }}
                >
                  <Coffee className=\"w-6 h-6 text-white\" />
                  {/* 3D glow effect */}
                  <motion.div
                    className=\"absolute inset-0 rounded-xl\"
                    animate={{
                      boxShadow: [
                        'inset 0 0 20px rgba(255,122,0,0.3)',
                        'inset 0 0 30px rgba(255,122,0,0.5)',
                        'inset 0 0 20px rgba(255,122,0,0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className=\"text-white text-xl md:text-2xl font-semibold flex items-center gap-2\">
                    Tech Hub Café
                    <AnimatePresence>
                      {featuredZone && (
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className=\"px-2 py-1 bg-amber-500/20 border border-amber-500 text-amber-400 text-xs rounded-full\"
                          style={{
                            boxShadow: '0 0 20px rgba(245,158,11,0.6)'
                          }}
                        >
                          🏆 FEATURED
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </h3>
                  <p className=\"text-gray-400 text-sm\">Shoreditch, London • Zone Radius: 180m • Sector: F&B Tech</p>
                </div>
              </div>
            </div>

            <div className=\"flex items-center gap-2 flex-wrap\">
              {/* Live indicator */}
              <motion.button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 text-sm font-medium ${\n                  isLive \n                    ? 'bg-green-500/20 border-green-500 text-green-400' \n                    : 'bg-gray-500/20 border-gray-500 text-gray-400'\n                }`}
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
                {isLive ? <Play className=\"w-4 h-4\" /> : <Pause className=\"w-4 h-4\" />}
                {isLive ? 'LIVE' : 'PAUSED'}
              </motion.button>

              {/* Active users */}
              <motion.div
                className=\"px-4 py-2 bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF7A00] rounded-lg flex items-center gap-2 text-sm font-medium cursor-pointer\"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(255,122,0,0.4)',
                    '0 0 25px rgba(255,122,0,0.6)',
                    '0 0 15px rgba(255,122,0,0.4)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className=\"w-4 h-4\" />
                <motion.span
                  key={activeUsers}
                  initial={{ scale: 1.3, color: '#FF7A00' }}
                  animate={{ scale: 1, color: '#FF7A00' }}
                  transition={{ duration: 0.3 }}
                >
                  {activeUsers}
                </motion.span>
                <span className=\"hidden sm:inline\">Live</span>
              </motion.div>

              {/* Revenue counter */}
              <motion.div
                className=\"px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg flex items-center gap-2 text-sm font-medium\"
                whileHover={{ scale: 1.05 }}
              >
                <DollarSign className=\"w-4 h-4\" />
                <motion.span
                  key={revenue}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  ${revenue}
                </motion.span>
              </motion.div>

              {/* Auto refresh toggle */}
              <motion.button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg border flex items-center gap-1 text-sm ${\n                  autoRefresh\n                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'\n                    : 'bg-gray-800/50 border-gray-700 text-gray-400'\n                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title=\"Auto-refresh data\"
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              </motion.button>

              {/* Fullscreen toggle */}
              <motion.button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className=\"p-2 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:border-gray-600\"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title=\"Toggle fullscreen\"
              >
                {isFullscreen ? <Minimize2 className=\"w-5 h-5\" /> : <Maximize2 className=\"w-5 h-5\" />}
              </motion.button>

              {/* Export */}
              <motion.button
                onClick={exportReport}
                className=\"p-2 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:border-gray-600\"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title=\"Export report\"
              >
                <Download className=\"w-5 h-5\" />
              </motion.button>

              {/* Settings */}
              <motion.button
                className=\"p-2 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700/50 hover:border-gray-600\"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                title=\"Settings\"
              >
                <Settings className=\"w-5 h-5\" />
              </motion.button>
            </div>
          </div>

          {/* Enhanced Tabs with sub-indicators */}
          <div className=\"flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#FF7A00]/30\">
            {[
              { id: 'overview', label: 'Overview', icon: Activity, badge: null },
              { id: 'engage', label: 'Engage', icon: Zap, badge: notifications.length },
              { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
              { id: 'customers', label: 'Customers', icon: Users, badge: activeUsers },
              { id: 'revenue', label: 'Revenue', icon: DollarSign, badge: null },
              { id: 'marketing', label: 'Marketing', icon: Sparkles, badge: campaignActive ? '🔥' : null },
              { id: 'safety', label: 'Safety & CSR', icon: Shield, badge: safeAlerts },
              { id: 'ai', label: 'AI Tools', icon: Brain, badge: '✨' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-all ${\n                    activeTab === tab.id\n                      ? 'bg-[#FF7A00] border-[#FF7A00] text-white'\n                      : 'bg-black/40 border-gray-700 text-gray-400 hover:border-[#FF7A00]/50'\n                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
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
                  <Icon className=\"w-4 h-4\" />
                  {tab.label}
                  {tab.badge !== null && tab.badge !== 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className=\"absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold\"
                      style={{
                        boxShadow: '0 0 10px rgba(239,68,68,0.8)'
                      }}
                    >
                      {typeof tab.badge === 'number' ? (tab.badge > 9 ? '9+' : tab.badge) : tab.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}"