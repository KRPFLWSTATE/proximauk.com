import { motion } from 'motion/react';
import { MessageCircle, Users, MapPin, Building, Mic, MicOff, Volume2, Radio, Signal, Shield, Zap, Activity, TrendingUp, Lock, Eye, Heart, ThumbsUp, Flame, Coffee, Star, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CommunityChat } from './CommunityChat';

const proximityRings = [
  { name: 'Town', range: '0-1km', color: '#FF7A00', users: 12, description: 'Local area • Real-time connections', icon: Users },
  { name: 'District', range: '1-10km', color: '#FF8C1A', users: 47, description: 'Broader area • Neighborhood discovery', icon: MessageCircle },
  { name: 'City', range: '10km+', color: '#FF9E33', users: 156, description: 'City-wide • Location privacy', icon: MapPin },
  { name: 'Proxima Zone', range: 'Business Venue', color: '#FFB04D', users: 892, description: 'Business-specific • Venue discovery', icon: Building },
];

const chatMessages = [
  { user: 'Sarah', message: 'Anyone want to grab coffee? ☕', zone: 'Town', time: '2m ago', personality: 'ENFP' },
  { user: 'Alex', message: 'New to the area, looking for gym recommendations', zone: 'District', time: '5m ago', personality: 'ISTP' },
  { user: 'Jamie', message: 'Tech meetup starting in 30 mins!', zone: 'City', time: '12m ago', personality: 'INFJ' },
];

const voiceChannels = [
  { name: 'Coffee Corner', zone: 'Town', activeUsers: 4, speaking: ['Emma', 'Liam'], totalUsers: 4, distance: '350m', zoneIndex: 0 },
  { name: 'Book Club Chat', zone: 'Town', activeUsers: 3, speaking: ['Sophie'], totalUsers: 3, distance: '720m', zoneIndex: 0 },
  { name: 'Shoreditch Lounge', zone: 'District', activeUsers: 12, speaking: ['Oliver', 'Sophia', 'Noah'], totalUsers: 15, distance: '2.4km', zoneIndex: 1 },
  { name: 'Gaming Session', zone: 'District', activeUsers: 8, speaking: ['Marcus', 'Zoe'], totalUsers: 10, distance: '3.8km', zoneIndex: 1 },
  { name: 'Music Jam', zone: 'District', activeUsers: 6, speaking: ['Alex'], totalUsers: 8, distance: '5.2km', zoneIndex: 1 },
  { name: 'Tech Talks', zone: 'City', activeUsers: 23, speaking: ['Ava', 'James'], totalUsers: 34, distance: '12km', zoneIndex: 2 },
  { name: 'Fitness Crew', zone: 'City', activeUsers: 15, speaking: [], totalUsers: 20, distance: '15km', zoneIndex: 2 },
  { name: 'Startup Founders', zone: 'City', activeUsers: 11, speaking: ['Nina', 'Tom', 'Sarah'], totalUsers: 12, distance: '18km', zoneIndex: 2 },
  { name: 'Proxima Zone', zone: 'Proxima Zone', activeUsers: 45, speaking: ['Lucas'], totalUsers: 156, distance: 'Venue', zoneIndex: 3 },
  { name: 'Night Owls', zone: 'Proxima Zone', activeUsers: 28, speaking: [], totalUsers: 89, distance: 'Venue', zoneIndex: 3 },
];

const liveUsers = [
  { id: 1, x: 50, y: 50, zone: 0, name: 'You', speaking: false },
  { id: 2, x: 55, y: 48, zone: 0, name: 'Emma', speaking: true },
  { id: 3, x: 48, y: 52, zone: 0, name: 'Liam', speaking: true },
  { id: 4, x: 52, y: 55, zone: 0, name: 'Ava', speaking: false },
  { id: 5, x: 65, y: 45, zone: 1, name: 'Oliver', speaking: true },
  { id: 6, x: 40, y: 60, zone: 1, name: 'Sophia', speaking: false },
  { id: 7, x: 70, y: 55, zone: 1, name: 'Noah', speaking: false },
  { id: 8, x: 30, y: 40, zone: 2, name: 'Mia', speaking: false },
  { id: 9, x: 75, y: 35, zone: 2, name: 'Ethan', speaking: false },
  { id: 10, x: 85, y: 50, zone: 3, name: 'Chloe', speaking: false },
];

export function ProximityChatSection() {
  const [activeZone, setActiveZone] = useState(0);
  const [latency, setLatency] = useState(0);
  const [audioQuality, setAudioQuality] = useState(0);
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
      setLatency(Math.floor(Math.random() * 30) + 45);
      setAudioQuality(Math.floor(Math.random() * 5) + 95);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Radar Animation Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: '800px', height: '800px' }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-[#FF7A00] rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.75,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF8C1A]/20 border border-[#FF7A00]/40 rounded-full mb-6">
            <Radio className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00]">Real-Time Proximity Intelligence</span>
            <motion.div
              className="w-2 h-2 bg-[#FF7A00] rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Proximity Chat – Discord on the Go</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-4xl mx-auto text-lg">
            Revolutionary location-based communication combining <span className="text-[#FF7A00]">real-time voice & text channels</span>, 
            <span className="text-[#FF7A00]"> AI-powered matching</span>, and <span className="text-[#FF7A00]">sub-100ms latency</span>. 
            Join conversations that adapt dynamically to your exact proximity. Mutual opt-in required before direct messaging unlocks, with AI detection of scam patterns and rate limits protecting against unsolicited outreach.
          </p>
        </motion.div>

        {/* Performance Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Zap, label: 'Latency', value: `${latency}ms`, color: '#FF7A00', suffix: 'avg' },
            { icon: Activity, label: 'Audio Quality', value: `${audioQuality}%`, color: '#4ADE80', suffix: 'clarity' },
            { icon: Users, label: 'Active Nearby', value: '1,107', color: '#60A5FA', suffix: 'users' },
            { icon: Shield, label: 'Privacy Mode', value: 'E2E', color: '#A78BFA', suffix: 'encrypted' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 border border-[#FF7A00]/30 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#FF7A00]/20 to-transparent border border-[#FF7A00]/30">
                  <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                </div>
                <span className="text-xs text-gray-400">{metric.label}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl text-white" style={{ color: metric.color }}>{metric.value}</span>
                <span className="text-xs text-gray-500 mb-1">{metric.suffix}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Proximity Zones Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Live Proximity Zones</h3>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs text-gray-400">Real-time updates</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {proximityRings.map((ring, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveZone(index)}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative cursor-pointer bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-2xl p-6 transition-all overflow-hidden ${
                  activeZone === index 
                    ? 'border-[#FF7A00] shadow-lg shadow-[#FF7A00]/20' 
                    : 'border-[#FF7A00]/20 hover:border-[#FF7A00]/50'
                }`}
              >
                {/* Background Glow */}
                {activeZone === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/10 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Zone Icon & Header */}
                <div className="relative z-10 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="p-3 rounded-xl border-2 bg-gradient-to-br from-black to-[#0D0D0D]"
                      style={{ borderColor: ring.color }}
                    >
                      <ring.icon className="w-6 h-6" style={{ color: ring.color }} />
                    </div>
                    <motion.div
                      className="px-3 py-1 rounded-full border"
                      style={{ 
                        borderColor: ring.color,
                        backgroundColor: `${ring.color}15`
                      }}
                      animate={activeZone === index ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs" style={{ color: ring.color }}>{ring.range}</span>
                    </motion.div>
                  </div>

                  <h4 className="text-white mb-1" style={{ color: activeZone === index ? ring.color : 'white' }}>
                    {ring.name}
                  </h4>
                  <p className="text-xs text-gray-500">{ring.description}</p>
                </div>

                {/* Live Stats */}
                <div className="relative z-10 space-y-3">
                  {/* User Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Active Users</span>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="text-xl"
                        style={{ color: ring.color }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {ring.users}
                      </motion.div>
                      <Users className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>

                  {/* Activity Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Activity</span>
                      <span className="text-xs" style={{ color: ring.color }}>
                        {Math.round((ring.users / 892) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: ring.color,
                          boxShadow: `0 0 10px ${ring.color}60`
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(ring.users / 892) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                      />
                    </div>
                  </div>

                  {/* Voice Channels Count */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#FF7A00]/10">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3 h-3" style={{ color: ring.color }} />
                      <span className="text-xs text-gray-400">Channels</span>
                    </div>
                    <span className="text-xs" style={{ color: ring.color }}>
                      {voiceChannels.filter(ch => ch.zone === ring.name).length}
                    </span>
                  </div>

                  {/* Pulse Indicator */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ring.color }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    <span className="text-xs text-gray-500">
                      {voiceChannels.filter(ch => ch.zone === ring.name && ch.speaking.length > 0).length} active conversations
                    </span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {activeZone === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <div 
                      className="w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: ring.color }}
                    />
                  </motion.div>
                )}

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 20px ${ring.color}20`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Active Zone Details Banner */}
          <motion.div
            key={activeZone}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gradient-to-r from-black via-[#0D0D0D] to-black border border-[#FF7A00]/30 rounded-xl p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-xl border-2"
                  style={{ 
                    borderColor: proximityRings[activeZone].color,
                    backgroundColor: `${proximityRings[activeZone].color}15`
                  }}
                >
                  <Radio className="w-5 h-5" style={{ color: proximityRings[activeZone].color }} />
                </div>
                <div>
                  <h4 className="text-white mb-1">
                    Viewing: <span style={{ color: proximityRings[activeZone].color }}>{proximityRings[activeZone].name} Zone</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    {proximityRings[activeZone].range} • {voiceChannels.filter(ch => ch.zone === proximityRings[activeZone].name).length} voice channels • 
                    {voiceChannels.filter(ch => ch.zone === proximityRings[activeZone].name && ch.speaking.length > 0).length} active now
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.div
                  className="px-4 py-2 rounded-lg border"
                  style={{ 
                    borderColor: proximityRings[activeZone].color,
                    backgroundColor: `${proximityRings[activeZone].color}10`
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 0 0px ${proximityRings[activeZone].color}`,
                      `0 0 20px ${proximityRings[activeZone].color}40`,
                      `0 0 0px ${proximityRings[activeZone].color}`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" style={{ color: proximityRings[activeZone].color }} />
                    <span className="text-sm" style={{ color: proximityRings[activeZone].color }}>
                      {proximityRings[activeZone].users} online
                    </span>
                  </div>
                </motion.div>

                <button 
                  className="px-4 py-2 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white rounded-lg text-sm hover:shadow-lg hover:shadow-[#FF7A00]/30 transition-all"
                >
                  Explore Zone
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main 2-Column Layout - Voice & Chat */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* LEFT COLUMN: Voice Channels (Discord-style) - EXPANDED */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-white">Voice Channels</h3>
                  <motion.div
                    className="px-3 py-1 bg-[#4ADE80]/20 border border-[#4ADE80]/40 rounded-full"
                    animate={{ boxShadow: ['0 0 0px #4ADE80', '0 0 20px #4ADE80', '0 0 0px #4ADE80'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xs text-[#4ADE80]">Live Audio</span>
                  </motion.div>
                </div>
                <Mic className="w-5 h-5 text-[#4ADE80]" />
              </div>

              {/* Expanded Voice Channels List */}
              <div className="space-y-4">
                {voiceChannels.filter(channel => channel.name !== 'Gaming Session' && channel.name !== 'Music Jam').slice(0, 3).map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl p-5 hover:border-[#FF7A00] transition-all group relative overflow-hidden"
                  >
                    {/* Glow Effect for Active Channels */}
                    {channel.speaking.length > 0 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-transparent"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Channel Header */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${channel.speaking.length > 0 ? 'bg-[#4ADE80]/20 border-[#4ADE80]' : 'bg-[#FF7A00]/20 border-[#FF7A00]/40'} border`}>
                          <Volume2 className={`w-5 h-5 ${channel.speaking.length > 0 ? 'text-[#4ADE80]' : 'text-[#FF7A00]'}`} />
                        </div>
                        <div>
                          <h4 className="text-white">{channel.name}</h4>
                          <p className="text-xs text-gray-400">{channel.zone} • {channel.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/30">
                          {channel.activeUsers}/{channel.totalUsers}
                        </span>
                      </div>
                    </div>

                    {/* Speaking Users with Enhanced Equalizers */}
                    <div className="space-y-3 mb-4 relative z-10">
                      {channel.speaking.map((speaker, i) => (
                        <div key={i} className="flex items-center gap-3 bg-black/40 rounded-lg p-3 border border-[#4ADE80]/30">
                          <motion.div
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#22C55E] flex items-center justify-center flex-shrink-0"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            <Mic className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-sm text-white flex-1">{speaker}</span>
                          
                          {/* Enhanced Live Waveform Equalizer */}
                          <div className="flex gap-1 items-end h-8">
                            {[...Array(12)].map((_, j) => (
                              <motion.div
                                key={j}
                                className="w-1 bg-gradient-to-t from-[#4ADE80] to-[#22C55E] rounded-full"
                                animate={{
                                  height: [
                                    Math.random() * 8 + 8,
                                    Math.random() * 20 + 12,
                                    Math.random() * 8 + 8
                                  ],
                                }}
                                transition={{
                                  duration: 0.3 + Math.random() * 0.2,
                                  repeat: Infinity,
                                  delay: j * 0.05,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Volume Indicator */}
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Volume2 className="w-4 h-4 text-[#4ADE80]" />
                          </motion.div>
                        </div>
                      ))}
                      
                      {channel.speaking.length === 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-black/20 rounded-lg p-3">
                          <MicOff className="w-4 h-4" />
                          <span>No one speaking • {channel.activeUsers} listening</span>
                        </div>
                      )}
                    </div>

                    {/* Idle Equalizer for Channels Without Speakers */}
                    {channel.speaking.length === 0 && channel.activeUsers > 0 && (
                      <div className="flex gap-1 items-end h-6 mb-4 justify-center opacity-30">
                        {[...Array(20)].map((_, j) => (
                          <motion.div
                            key={j}
                            className="w-0.5 bg-gradient-to-t from-[#FF7A00] to-[#FF8C1A] rounded-full"
                            animate={{
                              height: [2, 4, 2],
                            }}
                            transition={{
                              duration: 2 + Math.random(),
                              repeat: Infinity,
                              delay: j * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Join Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity relative z-10"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Mic className="w-4 h-4" />
                        <span>Join Channel</span>
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* RIGHT COLUMN: Live Chat Interface - EXPANDED */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 text-white">Live Community Chat</h3>

              {/* Chat Container */}
              <CommunityChat activeZone={activeZone} proximityRings={proximityRings} />
            </motion.div>
          </div>
        </div>

        {/* AI Personality Match - Full Width Enhanced Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-purple-500/10 via-black to-transparent border border-purple-500/30 rounded-2xl p-6 overflow-hidden relative"
        >
          {/* Background Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Eye className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-white mb-1">AI Personality Match Engine</h4>
                  <p className="text-sm text-gray-400">Real-time compatibility analysis across nearby channels</p>
                </div>
              </div>
              <motion.div
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full"
                animate={{ boxShadow: ['0 0 0px #a78bfa', '0 0 20px #a78bfa', '0 0 0px #a78bfa'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-purple-400">92% Match Found</span>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left: Top Match Details */}
              <div className="bg-black/50 border border-purple-500/20 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A]" />
                  <div className="flex-1">
                    <h5 className="text-white">Coffee Corner</h5>
                    <p className="text-xs text-gray-400">Immediate Zone • 15m away</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {/* Compatibility Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Compatibility</span>
                      <span className="text-sm text-purple-400">92%</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '92%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Matching Users */}
                  <div className="flex items-center justify-between pt-3 border-t border-purple-500/10">
                    <span className="text-xs text-gray-400">Matching Users</span>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-black bg-gradient-to-br from-purple-400 to-purple-600"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-purple-400">3 ENFP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Personality Breakdown */}
              <div className="bg-black/50 border border-purple-500/20 rounded-xl p-5">
                <h5 className="text-white mb-4">Personality Traits Match</h5>
                <div className="space-y-3">
                  {[
                    { trait: 'Extroversion', value: 95, color: '#a78bfa' },
                    { trait: 'Openness', value: 88, color: '#c084fc' },
                    { trait: 'Agreeableness', value: 91, color: '#e879f9' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">{item.trait}</span>
                        <span className="text-xs" style={{ color: item.color }}>{item.value}%</span>
                      </div>
                      <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.15 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Shared Interests */}
              <div className="bg-black/50 border border-purple-500/20 rounded-xl p-5">
                <h5 className="text-white mb-4">Shared Interests</h5>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Coffee', 'Books', 'Tech', 'Art', 'Travel'].map((interest, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-purple-500/10">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Signal className="w-3 h-3 text-purple-400" />
                    <span>AI Recommendation</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    High match probability for meaningful conversation. Best time to join: Now
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>View All Compatible Channels (7 matches)</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: TrendingUp,
              title: '3x Higher Engagement',
              description: 'Real-world connections create lasting relationships vs traditional social apps',
              color: '#4ADE80'
            },
            {
              icon: Zap,
              title: 'Sub-100ms Latency',
              description: 'Voice quality at 48kHz with AI noise cancellation - feels like face-to-face',
              color: '#FF7A00'
            },
            {
              icon: Shield,
              title: 'Privacy-First Design',
              description: 'Anonymous mode, E2E encryption, and zero-knowledge proximity proofs',
              color: '#A78BFA'
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/20 rounded-2xl p-6 hover:border-[#FF7A00]/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-black to-[#0D0D0D] border w-fit mb-4" style={{ borderColor: feature.color }}>
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h4 className="text-white mb-2" style={{ color: feature.color }}>{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Voice Channels & Privacy Zones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-center mb-8 text-white">Voice Channels & Privacy Zones</h3>
          <div className="max-w-4xl mx-auto">
            {/* Radial Visualization */}
            <div className="relative aspect-square max-w-lg mx-auto mb-8">
              {[
                { name: 'Town', range: '0-1km', color: '#FF7A00', description: 'Voice channel + precise location shown', privacy: 'visible' },
                { name: 'District', range: '1-10km', color: '#FF8C1A', description: 'Voice channel + precise location shown', privacy: 'visible' },
                { name: 'City', range: '10km+', color: '#FF9E33', description: 'Voice channel only - location hidden for privacy', privacy: 'hidden' },
                { name: 'Proxima Zone', range: 'Subject to Business Venue Size', color: '#FFB04D', description: 'Business zone - precise location shown', privacy: 'business' },
              ].map((zone, index) => {
                const size = 100 - index * 20;
                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center"
                    style={{
                      width: `${size}%`,
                      height: `${size}%`,
                      borderColor: zone.color,
                      backgroundColor: `${zone.color}10`,
                      borderStyle: 'dashed',
                      borderDasharray: index === 3 ? '8 4' : '12 6',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {index === 0 && (
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-[#FF7A00] mx-auto mb-2 shadow-[0_0_30px_#FF7A00]" />
                        <p className="text-xs text-white">You</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Compass Distance Markers */}
              {[
                { label: 'N', top: '5%', left: '50%', translate: '-translate-x-1/2' },
                { label: 'S', bottom: '5%', left: '50%', translate: '-translate-x-1/2' },
                { label: 'E', top: '50%', right: '5%', translate: '-translate-y-1/2' },
                { label: 'W', top: '50%', left: '5%', translate: '-translate-y-1/2' },
              ].map((marker, idx) => (
                <div
                  key={idx}
                  className={`absolute ${marker.translate} text-xs text-[#FF7A00] font-semibold`}
                  style={{
                    top: marker.top,
                    bottom: marker.bottom,
                    left: marker.left,
                    right: marker.right,
                  }}
                >
                  {marker.label}
                </div>
              ))}
            </div>

            {/* Zone Legend */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: 'Town', range: '0-1km', color: '#FF7A00', description: 'Voice & chat thread access', privacy: 'visible' },
                { name: 'District', range: '1-10km', color: '#FF8C1A', description: 'Voice channel & chat thread access', privacy: 'visible' },
                { name: 'City', range: '10km+', color: '#FF9E33', description: 'Voice channel only - location hidden. City-based chats coming soon.', privacy: 'hidden' },
                { name: 'Proxima Zone', range: 'Subject to Business Venue Size', color: '#FFB04D', description: 'Business-specific voice & chat access', privacy: 'business' },
              ].map((zone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`text-center p-4 border rounded-lg ${
                    zone.privacy === 'hidden' 
                      ? 'bg-black/70 border-[#FF9E33]/50' 
                      : zone.privacy === 'business'
                      ? 'bg-[#FFB04D]/10 border-[#FFB04D]/50'
                      : 'bg-black/50 border-[#FF7A00]/30'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: zone.color, boxShadow: `0 0 10px ${zone.color}` }}
                  />
                  <h4 className="text-white mb-1">{zone.name}</h4>
                  <p className="text-xs" style={{ color: zone.color }}>{zone.range}</p>
                  <p className="text-xs text-gray-400 mt-2">{zone.description}</p>
                  <div className="mt-2 text-[10px] text-red-400 font-semibold">
                    🔒 Anti-Stalking Protection
                  </div>
                  {zone.privacy === 'business' && (
                    <div className="mt-1 text-[10px] text-[#FFB04D] font-semibold">
                      🏢 Business Exception
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-6">
              Privacy first: Town zone (0-1km) shows location for real-time connection. District zone (1-10km) provides voice & chat with moderate privacy. City zone (10km+) offers voice and chat channels with full location privacy to prevent stalking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}