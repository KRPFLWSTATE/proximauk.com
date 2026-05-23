import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  BellOff, 
  Heart, 
  MapPin, 
  Users, 
  Zap, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  ChevronRight,
  Filter,
  MoreHorizontal,
  CreditCard,
  X,
  Calendar,
  Clock,
  Sparkles,
  Network,
  ArrowLeft,
  Share2,
  Bookmark,
  BarChart3,
  Activity,
  Trophy,
  UserCheck,
  Building2,
  Briefcase,
  Coffee,
  Palette,
  Code
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

// Mock Data for Zones
const MOCK_ZONES = [
  {
    id: '1',
    name: 'Caffè Nero',
    type: 'Coffee & Workspace',
    distance: '120m',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    attendees: 24,
    capacity: 'High',
    events: [
      { 
        id: 'e1',
        title: 'Double Stamps Hour', 
        time: 'Ends in 30m',
        description: 'Earn double loyalty stamps on all purchases for the next 30 minutes. Perfect time to grab your favorite brew!',
        attendees: 18,
        maxAttendees: 50,
        reward: '2x Loyalty Points',
        category: 'Loyalty Reward'
      }
    ],
    rating: 4.5,
    isSubscribed: false,
    notifications: false,
    credits: 12,
  },
  {
    id: '2',
    name: 'Equinox Gym',
    type: 'Fitness Center',
    distance: '350m',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    attendees: 85,
    capacity: 'Busy',
    events: [
      { 
        id: 'e2',
        title: 'HIIT Class Open Spots', 
        time: 'Starts in 15m',
        description: 'Last-minute availability in our popular HIIT class. High-intensity interval training with certified instructors.',
        attendees: 12,
        maxAttendees: 15,
        reward: 'Free Protein Shake',
        category: 'Fitness Class'
      }
    ],
    rating: 4.9,
    isSubscribed: true,
    notifications: true,
    credits: 5,
  },
  {
    id: '3',
    name: 'Pret A Manger',
    type: 'Quick Bite',
    distance: '50m',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    attendees: 12,
    capacity: 'Low',
    events: [],
    rating: 4.3,
    isSubscribed: false,
    notifications: false,
    credits: 8,
  },
  {
    id: '4',
    name: 'WeWork Shoreditch',
    type: 'Coworking',
    distance: '0m (You are here)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    attendees: 143,
    capacity: 'Moderate',
    events: [
      { 
        id: 'e3',
        title: 'Networking Mixer', 
        time: '17:00',
        description: 'Connect with fellow members, entrepreneurs, and professionals. Light refreshments provided.',
        attendees: 34,
        maxAttendees: 60,
        reward: 'Business Card Exchange',
        category: 'Networking'
      }
    ],
    rating: 4.7,
    isSubscribed: true,
    notifications: false,
    credits: 15,
  }
];

export function ConsumerZoneFeed() {
  const [zones, setZones] = useState(MOCK_ZONES);
  const [searchQuery, setSearchQuery] = useState('');
  const [userCredits, setUserCredits] = useState(125);
  const [insightLoading, setInsightLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'myZones'>('discover');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showZoneDetail, setShowZoneDetail] = useState(false);
  const [showAttendeeInsights, setShowAttendeeInsights] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showNetworkingDetail, setShowNetworkingDetail] = useState(false);
  const [eventJoined, setEventJoined] = useState<string[]>([]);
  const [view, setView] = useState<'feed' | 'zoneDetail' | 'eventDetail' | 'attendeeInsights' | 'networkingDetail'>('feed');

  const toggleSubscribe = (id: string) => {
    setZones(prev => prev.map(zone => {
      if (zone.id === id) {
        const newState = !zone.isSubscribed;
        toast(newState ? `Subscribed to ${zone.name}` : `Unsubscribed from ${zone.name}`, {
          description: newState ? "You'll now receive loyalty updates." : "Updates paused.",
        });
        return { ...zone, isSubscribed: newState };
      }
      return zone;
    }));
  };

  const toggleNotifications = (id: string) => {
    setZones(prev => prev.map(zone => {
      if (zone.id === id) {
        const newState = !zone.notifications;
        toast(newState ? "Notifications Enabled" : "Notifications Disabled", {
          description: `Alerts for ${zone.name} are now ${newState ? 'on' : 'off'}.`,
        });
        return { ...zone, notifications: newState };
      }
      return zone;
    }));
  };

  const generateInsight = (id: string) => {
    if (userCredits < 5) {
      toast.error("Insufficient Credits", { description: "You need 5 credits to generate an insight." });
      return;
    }
    
    setInsightLoading(id);
    setTimeout(() => {
      setUserCredits(prev => prev - 5);
      setInsightLoading(null);
      toast.success("Insight Generated", { description: "Peak hours analysis: 14:00 - 16:00. Quietest now." });
    }, 1500);
  };

  const filteredZones = zones.filter(z => 
    z.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openZoneDetail = (zoneId: string) => {
    setSelectedZone(zoneId);
    setView('zoneDetail');
    toast.info('Loading zone details...');
  };

  const closeToFeed = () => {
    setView('feed');
    setTimeout(() => {
      setSelectedZone(null);
      setSelectedEvent(null);
    }, 300);
  };

  const openEventDetail = (event: any) => {
    setSelectedEvent(event);
    setView('eventDetail');
  };

  const openAttendeeInsights = () => {
    const zone = zones.find(z => z.id === selectedZone);
    if (!zone) return;
    
    const distance = zone.distance;
    if (distance !== '0m (You are here)') {
      toast.error("Location Required", { 
        description: "You must be physically at the venue to view attendee insights." 
      });
      return;
    }
    
    if (userCredits < 5) {
      toast.error("Insufficient Credits", { description: "You need 5 credits to analyze attendees." });
      return;
    }
    
    setUserCredits(prev => prev - 5);
    setView('attendeeInsights');
  };

  const openNetworkingDetail = () => {
    setView('networkingDetail');
  };

  const toggleEventJoin = (eventId: string) => {
    if (eventJoined.includes(eventId)) {
      setEventJoined(prev => prev.filter(id => id !== eventId));
      toast.info("Left event");
    } else {
      setEventJoined(prev => [...prev, eventId]);
      toast.success("Joined event!", { description: "You'll receive notifications about this event" });
    }
  };

  const handleShareZone = (zoneName: string) => {
    toast.success(`Sharing ${zoneName}...`);
  };

  const handleBookmark = (zoneName: string) => {
    toast.success(`${zoneName} bookmarked!`);
  };

  const selectedZoneData = zones.find(z => z.id === selectedZone);
  const tabZones = activeTab === 'myZones' 
    ? filteredZones.filter(z => z.isSubscribed)
    : filteredZones;

  return (
    <div className="relative py-12 md:py-24 my-12 border-t border-[#333]/30 border-b border-[#333]/30">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF7A00] opacity-[0.03] blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-sm mb-6"
          >
            <Users className="w-4 h-4" />
            <span>Consumer Experience Away From Zone</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Explore & Connect in <span className="text-[#FF7A00]">Real-Time</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            The Proxima Zone feed puts the world's zones in your pocket. Discover venues, unlock exclusive micro-events, and engage with brands directly through a hyper-local feed.
          </motion.p>
        </div>

        {/* Interactive Interface Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-black border-2 border-[#333] rounded-[48px] overflow-hidden shadow-2xl" style={{ width: '375px', height: '812px', margin: '0 auto' }}>
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50 border-b-2 border-x-2 border-[#333]">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#222] rounded-full" />
            </div>

            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-11 pt-2 px-6 flex items-center justify-between text-white text-xs z-40 bg-black">
              <span className="font-semibold">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border border-white rounded-sm relative">
                  <div className="absolute inset-0.5 bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* App Container */}
            <div className="relative h-full flex flex-col bg-black pt-11">
              
              {/* App Header with Tabs - Only show on feed view */}
              {view === 'feed' && (
                <div className="px-4 pt-4 pb-3 bg-black border-b border-[#222]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF7A00] to-orange-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-bold text-lg">Proxima</span>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex gap-2 bg-[#0A0A0A] p-1 rounded-xl border border-[#222]">
                    <button
                      onClick={() => setActiveTab('discover')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'discover'
                          ? 'bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/20'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Discover Zones
                    </button>
                    <button
                      onClick={() => setActiveTab('myZones')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'myZones'
                          ? 'bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/20'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      My Zones
                    </button>
                  </div>
                </div>
              )}

              {/* Search & Filters - Only on feed */}
              {view === 'feed' && (
                <div className="px-4 py-3 border-b border-[#222] bg-black">
                  <div className="flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3 py-2">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search zones or brands..." 
                      className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-gray-600"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => toast.info('Filter options opened')}>
                      <Filter className="w-4 h-4 text-gray-500 hover:text-white transition-colors" />
                    </button>
                  </div>
                  
                  {/* Quick Filters */}
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                    {['Nearby', 'Trending', 'Food & Drink', 'Coworking', 'Social'].map((filter, i) => (
                      <button 
                        key={filter}
                        onClick={() => toast.info(`Filtered by: ${filter}`)}
                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                          i === 0 
                            ? 'bg-[#FF7A00] text-white font-medium shadow-lg shadow-[#FF7A00]/20' 
                            : 'bg-[#111] text-gray-400 border border-[#222] hover:border-[#FF7A00]/50 hover:text-white'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feed Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <AnimatePresence mode="wait">
                  {view === 'feed' && (
                    <motion.div
                      key="feed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 pb-6"
                    >
                      {tabZones.length === 0 && activeTab === 'myZones' && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-400 text-sm">No subscribed zones yet</p>
                          <p className="text-gray-600 text-xs mt-1">Explore and subscribe to zones you love</p>
                          <button
                            onClick={() => setActiveTab('discover')}
                            className="mt-4 px-4 py-2 bg-[#FF7A00] text-white text-sm rounded-xl hover:bg-orange-600 transition-colors"
                          >
                            Discover Zones
                          </button>
                        </div>
                      )}
                      
                      {tabZones.map((zone) => (
                        <motion.div
                          key={zone.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden hover:border-[#FF7A00]/30 transition-all"
                        >
                          {/* Zone Card */}
                          <div 
                            onClick={() => openZoneDetail(zone.id)}
                            className="cursor-pointer"
                          >
                            {/* Image Header */}
                            <div className="h-36 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                              <img 
                                src={zone.image} 
                                alt={zone.name}
                                className="w-full h-full object-cover"
                              />
                              
                              {/* Top Actions */}
                              <div className="absolute top-2 right-2 z-20 flex gap-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBookmark(zone.name);
                                  }}
                                  className="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-black/80 transition-all"
                                >
                                  <Bookmark className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShareZone(zone.name);
                                  }}
                                  className="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-black/80 transition-all"
                                >
                                  <Share2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Bottom Info */}
                              <div className="absolute bottom-2 left-3 z-20 right-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-white font-bold text-base">{zone.name}</h3>
                                    <div className="text-gray-300 text-xs flex items-center gap-1.5 mt-0.5">
                                      <MapPin className="w-3 h-3" /> {zone.distance} • {zone.type}
                                    </div>
                                  </div>
                                  {zone.events.length > 0 && (
                                    <Badge className="bg-[#FF7A00] hover:bg-[#E66E00] text-white border-none text-[10px] px-2 h-5 shadow-lg shadow-[#FF7A00]/30">
                                      Live Event
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Zone Stats & Actions */}
                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                  <div className="text-center">
                                    <div className="text-white font-semibold text-sm">{zone.attendees}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wide">Active</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="flex items-center gap-0.5">
                                      <Star className="w-3 h-3 text-[#FF7A00] fill-[#FF7A00]" />
                                      <span className="text-white font-semibold text-sm">{zone.rating}</span>
                                    </div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wide">Vibe</div>
                                  </div>
                                </div>
                                
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubscribe(zone.id);
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                    zone.isSubscribed
                                      ? 'bg-white text-black hover:bg-gray-200'
                                      : 'bg-[#FF7A00] text-white hover:bg-orange-600 shadow-lg shadow-[#FF7A00]/20'
                                  }`}
                                >
                                  <Bell className={`w-3 h-3 ${zone.isSubscribed ? 'fill-black' : ''}`} />
                                  {zone.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                              </div>

                              {/* Micro Event Preview */}
                              {zone.events.length > 0 && (
                                <div className="mt-3 p-2.5 rounded-xl bg-[#111] border border-[#222] flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-4 h-4 text-[#FF7A00]" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-white text-xs font-medium truncate">{zone.events[0].title}</div>
                                    <div className="text-gray-500 text-[10px]">{zone.events[0].time}</div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Zone Detail View */}
                  {view === 'zoneDetail' && selectedZoneData && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="pb-6"
                    >
                      {/* Detail Header */}
                      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-lg border-b border-[#222] -mx-4 px-4 py-3 mb-4">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={closeToFeed}
                            className="flex items-center gap-2 text-white hover:text-[#FF7A00] transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back</span>
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleShareZone(selectedZoneData.name)}
                              className="p-2 rounded-xl bg-[#111] border border-[#222] text-gray-400 hover:text-white hover:border-[#FF7A00]/50 transition-all"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleNotifications(selectedZoneData.id)}
                              className={`p-2 rounded-xl border transition-all ${
                                selectedZoneData.notifications
                                  ? 'bg-[#FF7A00] border-[#FF7A00] text-white'
                                  : 'bg-[#111] border-[#222] text-gray-400 hover:text-white hover:border-[#FF7A00]/50'
                              }`}
                            >
                              <Bell className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Hero Image */}
                      <div className="h-48 -mx-4 mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        <img 
                          src={selectedZoneData.image} 
                          alt={selectedZoneData.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                          <h2 className="text-white font-bold text-2xl mb-1">{selectedZoneData.name}</h2>
                          <div className="text-gray-300 text-sm flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {selectedZoneData.distance} away • {selectedZoneData.type}
                          </div>
                        </div>
                      </div>

                      {/* Subscribe Button */}
                      <button
                        onClick={() => toggleSubscribe(selectedZoneData.id)}
                        className={`w-full py-3 rounded-xl font-semibold text-sm mb-4 flex items-center justify-center gap-2 transition-all ${
                          selectedZoneData.isSubscribed
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-[#FF7A00] text-white hover:bg-orange-600 shadow-lg shadow-[#FF7A00]/30'
                        }`}
                      >
                        <Bell className={`w-4 h-4 ${selectedZoneData.isSubscribed ? 'fill-black' : ''}`} />
                        {selectedZoneData.isSubscribed ? 'Subscribed to Zone' : 'Subscribe to Zone'}
                      </button>

                      {/* Zone Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-center">
                          <Users className="w-5 h-5 text-[#FF7A00] mx-auto mb-1" />
                          <div className="text-white font-bold">{selectedZoneData.attendees}</div>
                          <div className="text-gray-500 text-[10px]">Active Now</div>
                        </div>
                        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-center">
                          <Star className="w-5 h-5 text-[#FF7A00] mx-auto mb-1 fill-[#FF7A00]" />
                          <div className="text-white font-bold">{selectedZoneData.rating}</div>
                          <div className="text-gray-500 text-[10px]">Zone Vibe</div>
                        </div>
                        <button 
                          onClick={openNetworkingDetail}
                          className="bg-[#0A0A0A] border border-[#222] hover:border-[#FF7A00]/50 rounded-xl p-3 text-center transition-all"
                        >
                          <Network className="w-5 h-5 text-[#FF7A00] mx-auto mb-1" />
                          <div className="text-white font-bold">8.7</div>
                          <div className="text-gray-500 text-[10px]">Network</div>
                        </button>
                      </div>

                      {/* Events Section */}
                      {selectedZoneData.events.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#FF7A00]" />
                            Live Events
                          </h3>
                          <div className="space-y-2">
                            {selectedZoneData.events.map((event, idx) => (
                              <button
                                key={idx}
                                onClick={() => openEventDetail(event)}
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-xl p-3 hover:border-[#FF7A00]/50 transition-all text-left"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-5 h-5 text-[#FF7A00]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white font-medium text-sm mb-1">{event.title}</div>
                                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {event.time}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {event.attendees}/{event.maxAttendees}
                                      </span>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-gray-600" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Zone Vibe & Networking */}
                      <div className="mb-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                          Zone Insights
                        </h3>
                        <div className="space-y-2">
                          <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-xs">Networking Potential</span>
                              <span className="text-[#FF7A00] font-semibold text-sm">High</span>
                            </div>
                            <div className="w-full bg-[#111] h-2 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#FF7A00] to-orange-600 w-[85%]" />
                            </div>
                          </div>
                          
                          <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3">
                            <div className="text-gray-400 text-xs mb-2">Current Vibe</div>
                            <div className="flex gap-2 flex-wrap">
                              {['Professional', 'Social', 'Creative'].map((vibe) => (
                                <span key={vibe} className="px-2 py-1 bg-[#FF7A00]/10 text-[#FF7A00] text-xs rounded-lg border border-[#FF7A00]/20">
                                  {vibe}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={openAttendeeInsights}
                            className="w-full bg-[#0A0A0A] border border-[#222] rounded-xl p-3 hover:border-[#FF7A00]/50 transition-all text-left"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-white text-sm font-medium mb-1">See Who's Here</div>
                                <div className="text-gray-500 text-xs">Anonymous data • Only at venue • -5c</div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-600" />
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 mb-4">
                        <button
                          onClick={() => toast.success('Opening feedback form...')}
                          className="w-full bg-[#0A0A0A] border border-[#222] rounded-xl p-3 hover:border-[#FF7A00]/50 transition-all flex items-center gap-3"
                        >
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                          <span className="text-white text-sm font-medium">Send Private Feedback</span>
                        </button>

                        <button
                          onClick={() => generateInsight(selectedZoneData.id)}
                          disabled={!!insightLoading}
                          className="w-full bg-[#0A0A0A] border border-[#222] rounded-xl p-3 hover:border-[#FF7A00]/50 transition-all flex items-center gap-3 relative"
                        >
                          {insightLoading === selectedZoneData.id ? (
                            <>
                              <div className="w-5 h-5 border-2 border-[#FF7A00]/30 border-t-[#FF7A00] rounded-full animate-spin" />
                              <span className="text-white text-sm font-medium">Analyzing Zone Data...</span>
                            </>
                          ) : (
                            <>
                              <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
                              <span className="text-white text-sm font-medium">Get AI Insights</span>
                              <span className="ml-auto text-xs text-gray-500">-5c</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Event Detail View */}
                  {view === 'eventDetail' && selectedEvent && (
                    <motion.div
                      key="eventDetail"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="pb-6"
                    >
                      {/* Header */}
                      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-lg border-b border-[#222] -mx-4 px-4 py-3 mb-4">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setView('zoneDetail')}
                            className="flex items-center gap-2 text-white hover:text-[#FF7A00] transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Event Details</span>
                          </button>
                          <button
                            onClick={() => toast.success(`Sharing ${selectedEvent.title}...`)}
                            className="p-2 rounded-xl bg-[#111] border border-[#222] text-gray-400 hover:text-white hover:border-[#FF7A00]/50 transition-all"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Event Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-orange-600 flex items-center justify-center shadow-lg shadow-[#FF7A00]/30">
                          <Zap className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      <h2 className="text-white font-bold text-2xl mb-2 text-center">{selectedEvent.title}</h2>
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <Badge className="bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/20">
                          {selectedEvent.category}
                        </Badge>
                      </div>

                      <p className="text-gray-400 text-sm mb-6 text-center">{selectedEvent.description}</p>

                      {/* Event Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 text-center">
                          <Clock className="w-6 h-6 text-[#FF7A00] mx-auto mb-2" />
                          <div className="text-white font-semibold">{selectedEvent.time}</div>
                          <div className="text-gray-500 text-xs">Time</div>
                        </div>
                        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 text-center">
                          <Users className="w-6 h-6 text-[#FF7A00] mx-auto mb-2" />
                          <div className="text-white font-semibold">{selectedEvent.attendees}/{selectedEvent.maxAttendees}</div>
                          <div className="text-gray-500 text-xs">Participants</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-xs">Capacity</span>
                          <span className="text-white text-sm font-semibold">
                            {Math.round((selectedEvent.attendees / selectedEvent.maxAttendees) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-[#111] h-3 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FF7A00] to-orange-600 transition-all duration-500" 
                            style={{ width: `${(selectedEvent.attendees / selectedEvent.maxAttendees) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Reward */}
                      <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4 mb-6 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/10 flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-[#FF7A00]" />
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">Event Reward</div>
                          <div className="text-white font-semibold">{selectedEvent.reward}</div>
                        </div>
                      </div>

                      {/* Join Button */}
                      <button
                        onClick={() => toggleEventJoin(selectedEvent.id)}
                        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                          eventJoined.includes(selectedEvent.id)
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-[#FF7A00] text-white hover:bg-orange-600 shadow-lg shadow-[#FF7A00]/30'
                        }`}
                      >
                        <UserCheck className="w-5 h-5" />
                        {eventJoined.includes(selectedEvent.id) ? 'Joined' : 'Join Event'}
                      </button>
                    </motion.div>
                  )}

                  {/* Attendee Insights View */}
                  {view === 'attendeeInsights' && selectedZoneData && (
                    <motion.div
                      key="attendeeInsights"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="pb-6"
                    >
                      {/* Header */}
                      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-lg border-b border-[#222] -mx-4 px-4 py-3 mb-4">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setView('zoneDetail')}
                            className="flex items-center gap-2 text-white hover:text-[#FF7A00] transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Attendee Insights</span>
                          </button>
                          <div className="px-2 py-1 bg-[#FF7A00]/10 text-[#FF7A00] text-xs rounded-lg border border-[#FF7A00]/20">
                            Live Data
                          </div>
                        </div>
                      </div>

                      {/* Privacy Notice */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-xl p-4 mb-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-[#FF7A00]" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm mb-1">Privacy Protected</div>
                            <div className="text-gray-400 text-xs">All data is anonymized. Individual profiles are not revealed. Only visible when physically at venue.</div>
                          </div>
                        </div>
                      </div>

                      {/* Total Attendees */}
                      <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-6 mb-4 text-center">
                        <div className="text-5xl font-bold text-white mb-2">{selectedZoneData.attendees}</div>
                        <div className="text-gray-400 text-sm">People Currently Here</div>
                      </div>

                      {/* Industry Breakdown */}
                      <div className="mb-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#FF7A00]" />
                          Industry Breakdown
                        </h3>
                        <div className="space-y-2">
                          {[
                            { name: 'Tech & Startups', icon: Code, percentage: 35, count: Math.floor(selectedZoneData.attendees * 0.35) },
                            { name: 'Creative & Design', icon: Palette, percentage: 25, count: Math.floor(selectedZoneData.attendees * 0.25) },
                            { name: 'Business & Finance', icon: Briefcase, percentage: 20, count: Math.floor(selectedZoneData.attendees * 0.20) },
                            { name: 'Food & Hospitality', icon: Coffee, percentage: 20, count: Math.floor(selectedZoneData.attendees * 0.20) }
                          ].map((industry) => {
                            const Icon = industry.icon;
                            return (
                              <div key={industry.name} className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-[#FF7A00]" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white text-sm font-medium">{industry.name}</div>
                                    <div className="text-gray-500 text-xs">{industry.count} people</div>
                                  </div>
                                  <div className="text-[#FF7A00] font-semibold text-sm">{industry.percentage}%</div>
                                </div>
                                <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#FF7A00] to-orange-600" 
                                    style={{ width: `${industry.percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Common Interests */}
                      <div className="mb-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                          Common Interests
                        </h3>
                        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4">
                          <div className="flex gap-2 flex-wrap">
                            {['Networking', 'Coworking', 'Innovation', 'Entrepreneurship', 'Tech', 'Design', 'Remote Work', 'Sustainability'].map((interest) => (
                              <span key={interest} className="px-3 py-1.5 bg-[#FF7A00]/10 text-[#FF7A00] text-xs rounded-lg border border-[#FF7A00]/20">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Peak Hours */}
                      <div className="mb-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[#FF7A00]" />
                          Peak Activity Hours
                        </h3>
                        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4">
                          <div className="flex items-end justify-between gap-1 h-24">
                            {[20, 35, 60, 85, 95, 90, 70, 40].map((height, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div 
                                  className="w-full bg-gradient-to-t from-[#FF7A00] to-orange-600 rounded-t transition-all"
                                  style={{ height: `${height}%` }}
                                />
                                <span className="text-[10px] text-gray-500">{8 + i * 2}h</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 text-center">
                            <div className="text-gray-400 text-xs">Peak Time</div>
                            <div className="text-white font-semibold">14:00 - 16:00</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Networking Detail View */}
                  {view === 'networkingDetail' && selectedZoneData && (
                    <motion.div
                      key="networkingDetail"
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="pb-6"
                    >
                      {/* Header */}
                      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-lg border-b border-[#222] -mx-4 px-4 py-3 mb-4">
                        <button
                          onClick={() => setView('zoneDetail')}
                          className="flex items-center gap-2 text-white hover:text-[#FF7A00] transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          <span className="text-sm font-medium">Networking Potential</span>
                        </button>
                      </div>

                      {/* Score */}
                      <div className="text-center mb-6">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#FF7A00] to-orange-600 flex items-center justify-center shadow-lg shadow-[#FF7A00]/30 mb-4">
                          <div>
                            <div className="text-5xl font-bold text-white">8.7</div>
                            <div className="text-white/80 text-xs">out of 10</div>
                          </div>
                        </div>
                        <h2 className="text-white font-bold text-xl mb-2">High Networking Potential</h2>
                        <p className="text-gray-400 text-sm">Great time to connect with professionals</p>
                      </div>

                      {/* Factors */}
                      <div className="space-y-3 mb-6">
                        <h3 className="text-white font-semibold mb-3">Score Factors</h3>
                        {[
                          { label: 'Active Professionals', value: 92, icon: Users },
                          { label: 'Industry Diversity', value: 85, icon: Building2 },
                          { label: 'Engagement Level', value: 88, icon: Activity },
                          { label: 'Event Activity', value: 78, icon: Zap }
                        ].map((factor) => {
                          const Icon = factor.icon;
                          return (
                            <div key={factor.label} className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center">
                                  <Icon className="w-4 h-4 text-[#FF7A00]" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-white text-sm font-medium">{factor.label}</div>
                                </div>
                                <div className="text-[#FF7A00] font-semibold">{factor.value}%</div>
                              </div>
                              <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#FF7A00] to-orange-600 transition-all" 
                                  style={{ width: `${factor.value}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Recommendations */}
                      <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                          Networking Tips
                        </h3>
                        <ul className="space-y-2">
                          {[
                            'Join the active micro-event to meet like-minded professionals',
                            'Peak networking hours are 14:00-16:00',
                            'High concentration of tech and creative professionals present',
                            'Professional vibe makes it ideal for meaningful connections'
                          ].map((tip, i) => (
                            <li key={i} className="flex gap-2 text-gray-400 text-sm">
                              <span className="text-[#FF7A00] flex-shrink-0">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#333] bg-[#111] text-gray-400">250m</Badge>
              <span>Proximity Range</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#333] bg-[#111] text-gray-400">Live</Badge>
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#333] bg-[#111] text-gray-400">Privacy</Badge>
              <span>Anonymized & Secure</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}