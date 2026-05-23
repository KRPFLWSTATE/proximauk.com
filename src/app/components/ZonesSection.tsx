import { motion } from 'motion/react';
import { Store, Settings, Users as UsersIcon, BarChart3, Shield, Eye, Award, Coffee, Briefcase, Music, Sparkles, Heart } from 'lucide-react';
import { ZonesFeatureShowcase } from './ZonesFeatureShowcase';
import { ZonesBusinessDashboard } from './ZonesBusinessDashboard';
import { ConsumerZoneFeed as CZoneFeed } from './ConsumerZoneFeed';
import { useInView } from '../hooks/useInView';

const dashboardFeatures = [
  {
    title: 'Define Zone',
    icon: Store,
    description: 'Set geographical boundaries for your business location with precision mapping',
    metrics: ['Custom radius', 'Multi-location support', 'Floor-level targeting'],
  },
  {
    title: 'Customize Experience',
    icon: Settings,
    description: 'Create branded experiences, offers, and content for users entering your zone',
    metrics: ['Custom messaging', 'Promotional content', 'Brand integration'],
  },
  {
    title: 'Engage Users',
    icon: UsersIcon,
    description: 'Send targeted notifications, offers, and interactions to nearby Proxima users',
    metrics: ['Push notifications', 'In-app messaging', 'Gamification'],
  },
  {
    title: 'Analyze Data',
    icon: BarChart3,
    description: 'Track foot traffic, engagement rates, conversion metrics, and ROI in real-time',
    metrics: ['Visitor analytics', 'Engagement rates', 'Revenue tracking'],
  },
];

const userExperienceFeatures = [
  { title: 'Consent', description: 'Users opt-in to receive zone notifications', icon: Shield },
  { title: 'Control', description: 'Full control over which zones can reach them', icon: Settings },
  { title: 'Value', description: 'Only receive relevant, personalized offers', icon: Award },
];

export function ZonesSection() {
  return (
    <section className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Proxima Zones – Virtual Hotspots</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
            Transform physical locations into interactive social hubs. Businesses draw digital boundaries to create temporary, hyper-local networks where opted-in users connect in real-time. Venue/zone presence requires heavy verification and business checks, with different rules for franchises and enterprise packages. Trusted zone admins are empowered to screen and remove predatory commercial posts or event listings.
          </p>
        </motion.div>

        {/* HERO VISUALIZATION: Zone Creation in Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-center mb-4 text-white">Define Your Virtual Real Estate</h3>
          <p className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
            Watch how businesses create their Proxima Zone in seconds—drawing a digital boundary around their venue to unlock engagement possibilities. Businesses will be able to customise these with branding to appear distinct.
          </p>
          
          <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00]/30 rounded-2xl overflow-hidden p-4 md:p-8">
            {/* Animated Map Background */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, #FF7A00 0px, transparent 1px, transparent 30px),
                    repeating-linear-gradient(90deg, #FF7A00 0px, transparent 1px, transparent 30px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              />
            </div>

            {/* Map View Container */}
            <div className="relative h-[400px] md:h-[600px] bg-black/40 rounded-xl border border-[#FF7A00]/20 overflow-hidden">
              {/* Map Labels */}
              <div className="absolute top-4 left-4 bg-black/80 border border-[#FF7A00]/50 rounded px-3 py-2 text-xs md:text-sm text-white z-10">
                📍 Shoreditch, London
              </div>
              
              <div className="absolute top-4 right-4 bg-black/80 border border-[#FF7A00]/50 rounded px-3 py-2 text-xs md:text-sm text-white z-10 flex items-center gap-2">
                <Shield className="w-3 h-3 text-green-400" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="hidden sm:inline">Privacy-Safe Zone</span>
                <span className="sm:hidden">GDPR ✓</span>
              </div>

              {/* Street Names */}
              <div className="absolute top-1/4 left-8 text-xs text-gray-600 rotate-90 origin-left hidden md:block">Old Street</div>
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-xs text-gray-600 hidden md:block">Brick Lane</div>

              {/* ANIMATED ZONE BOUNDARY BEING DRAWN */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
                {/* Zone Boundary Circle - Animates drawing */}
                <motion.circle
                  cx="400"
                  cy="300"
                  r="180"
                  fill="rgba(255, 122, 0, 0.1)"
                  stroke="#FF7A00"
                  strokeWidth="3"
                  strokeDasharray="1130"
                  initial={{ strokeDashoffset: 1130 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                {/* Glowing boundary effect */}
                <motion.circle
                  cx="400"
                  cy="300"
                  r="180"
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth="8"
                  filter="blur(8px)"
                  opacity="0"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Radius indicator */}
                <motion.line
                  x1="400"
                  y1="300"
                  x2="580"
                  y2="300"
                  stroke="#FF7A00"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1 }}
                />

                {/* Business Center Icon */}
                <motion.circle
                  cx="400"
                  cy="300"
                  r="12"
                  fill="#FF7A00"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.circle
                  cx="400"
                  cy="300"
                  r="16"
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth="2"
                  opacity="0.5"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* GDPR-COMPLIANT DENSITY ZONES - No Individual Tracking */}
                <defs>
                  {/* Gradients for heat zones */}
                  <radialGradient id="density-orange">
                    <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="density-blue">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="density-purple">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="density-green">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Density Blob 1 - Main Seating Area (High Activity) */}
                <motion.ellipse
                  cx="280"
                  cy="240"
                  rx="70"
                  ry="60"
                  fill="url(#density-orange)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 3 }}
                  animate={{
                    rx: [70, 75, 70],
                    ry: [60, 65, 60],
                    opacity: [0.7, 0.9, 0.7]
                  }}
                  style={{ transition: 'all 2s infinite' }}
                />
                
                {/* Pulsing ring for high activity */}
                <motion.ellipse
                  cx="280"
                  cy="240"
                  rx="50"
                  ry="45"
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{
                    rx: [50, 85],
                    ry: [45, 75],
                    opacity: [0.6, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 3 }}
                />

                {/* Density Blob 2 - Counter Zone (Moderate Activity) */}
                <motion.ellipse
                  cx="500"
                  cy="280"
                  rx="55"
                  ry="50"
                  fill="url(#density-blue)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 3.3 }}
                  animate={{
                    rx: [55, 60, 55],
                    ry: [50, 55, 50],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  style={{ transition: 'all 2.5s infinite' }}
                />

                {/* Density Blob 3 - Lounge Area (Moderate Activity) */}
                <motion.ellipse
                  cx="350"
                  cy="360"
                  rx="60"
                  ry="50"
                  fill="url(#density-purple)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 3.6 }}
                  animate={{
                    rx: [60, 65, 60],
                    ry: [50, 55, 50],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  style={{ transition: 'all 2.8s infinite' }}
                />

                {/* Density Blob 4 - Entry Area (Low Activity) */}
                <motion.ellipse
                  cx="320"
                  cy="180"
                  rx="40"
                  ry="35"
                  fill="url(#density-green)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 3.9 }}
                  animate={{
                    rx: [40, 43, 40],
                    ry: [35, 38, 35],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  style={{ transition: 'all 3s infinite' }}
                />

                {/* Activity Particles - Show flow not individual paths */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45) * (Math.PI / 180);
                  const startX = 400 + Math.cos(angle) * 50;
                  const startY = 300 + Math.sin(angle) * 50;
                  const endX = 400 + Math.cos(angle) * 150;
                  const endY = 300 + Math.sin(angle) * 150;
                  return (
                    <motion.circle
                      key={i}
                      r="2"
                      fill="#FF7A00"
                      initial={{ cx: startX, cy: startY, opacity: 0 }}
                      animate={{
                        cx: [startX, endX, startX],
                        cy: [startY, endY, startY],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: 3.5 + i * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}

                {/* Flow indicators between zones */}
                <motion.path
                  d="M 280 240 Q 390 260 500 280"
                  fill="none"
                  stroke="#FF7A00"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  opacity="0"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 4 }}
                />
                
                <motion.path
                  d="M 350 360 Q 365 300 280 240"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  opacity="0"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 4.5 }}
                />
              </svg>

              {/* Business Icon at Center */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] rounded-full p-3 md:p-4 shadow-xl border-2 border-white">
                  <Store className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/90 border border-[#FF7A00] rounded px-2 md:px-3 py-1 text-xs md:text-sm text-white whitespace-nowrap">
                  Tech Hub Café
                </div>
              </motion.div>

              {/* Radius Label */}
              <motion.div
                className="absolute top-1/2 right-1/4 bg-black/90 border border-[#FF7A00]/50 rounded px-2 py-1 text-xs text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                Radius: 180m
              </motion.div>

              {/* GDPR-Compliant Area Labels with Ranges */}
              <motion.div
                className="absolute top-[32%] left-[22%] bg-black/90 border border-[#FF7A00]/70 rounded-lg px-3 py-2 text-xs z-20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 3.2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#FF7A00]"
                    animate={{
                      boxShadow: [
                        '0 0 0px #FF7A00',
                        '0 0 8px #FF7A00',
                        '0 0 0px #FF7A00'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white font-semibold">Main Seating</span>
                </div>
                <div className="text-[#FF7A00] font-bold">12-18 people</div>
                <div className="text-gray-400 text-xs">🔥 High activity</div>
              </motion.div>

              <motion.div
                className="absolute top-[38%] right-[22%] bg-black/90 border border-blue-500/70 rounded-lg px-3 py-2 text-xs z-20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 3.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{
                      boxShadow: [
                        '0 0 0px #3b82f6',
                        '0 0 8px #3b82f6',
                        '0 0 0px #3b82f6'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <span className="text-white font-semibold">Counter</span>
                </div>
                <div className="text-blue-400 font-bold">5-10 people</div>
                <div className="text-gray-400 text-xs">📊 Moderate</div>
              </motion.div>

              <motion.div
                className="absolute bottom-[28%] left-[32%] bg-black/90 border border-purple-500/70 rounded-lg px-3 py-2 text-xs z-20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 3.8 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-purple-500"
                    animate={{
                      boxShadow: [
                        '0 0 0px #a855f7',
                        '0 0 8px #a855f7',
                        '0 0 0px #a855f7'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <span className="text-white font-semibold">Lounge</span>
                </div>
                <div className="text-purple-400 font-bold">8-12 people</div>
                <div className="text-gray-400 text-xs">📊 Moderate</div>
              </motion.div>

              <motion.div
                className="absolute top-[22%] left-[32%] bg-black/90 border border-green-500/70 rounded-lg px-3 py-2 text-xs z-20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 4.1 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{
                      boxShadow: [
                        '0 0 0px #10b981',
                        '0 0 8px #10b981',
                        '0 0 0px #10b981'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                  />
                  <span className="text-white font-semibold">Entry</span>
                </div>
                <div className="text-green-400 font-bold">Low activity</div>
                <div className="text-gray-400 text-xs">📉 1-3 people</div>
              </motion.div>

              {/* Live Stats Overlay - Updated for GDPR */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#FF7A00] rounded-lg p-3 md:p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 4.3 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Activity Range</div>
                    <motion.div
                      className="text-lg md:text-2xl text-[#FF7A00]"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      25-40
                    </motion.div>
                    <div className="text-xs text-gray-500">people</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Hot Zones</div>
                    <motion.div className="text-lg md:text-2xl text-[#FF7A00]">4</motion.div>
                    <div className="text-xs text-gray-500">areas</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Coverage</div>
                    <motion.div className="text-lg md:text-2xl text-[#FF7A00]">180m</motion.div>
                    <div className="text-xs text-gray-500">radius</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Privacy</div>
                    <motion.div className="text-lg md:text-2xl text-green-500 flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      100%
                    </motion.div>
                    <div className="text-xs text-gray-500">compliant</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Control Instruction */}
            <motion.div
              className="mt-4 text-center text-sm text-gray-400 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 4.5 }}
            >
              <Shield className="w-3 h-3 text-green-400" />
              <div className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
              <span className="hidden sm:inline">Privacy-safe zone activated – density-based view, no individual tracking</span>
              <span className="sm:hidden">GDPR Compliant</span>
            </motion.div>
          </div>
        </motion.div>

        {/* NEW: THE ZONE ARSENAL - 17 Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-center mb-4 text-white text-2xl md:text-3xl">The Zone Arsenal: 27 Innovative B2B Features</h3>
          <p className="text-center text-gray-400 mb-12 md:mb-16 max-w-3xl mx-auto text-sm md:text-base">
            Proxima Zones isn't just another business tool—it's a complete ecosystem of innovative features that transform how businesses engage with customers. Each feature is engineered with stunning visual demonstrations below.
          </p>

          {/* Interactive Phone Mockup - User Journey */}
          <div className="relative max-w-5xl mx-auto mb-16">
            <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black border-2 border-[#FF7A00]/30 rounded-2xl p-8 md:p-12">
              {/* 3D Phone Mockup */}
              <motion.div
                className="relative mx-auto"
                style={{
                  width: '320px',
                  height: '640px',
                  perspective: '1000px'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Phone Frame */}
                <motion.div
                  className="relative w-full h-full bg-gray-900 rounded-[40px] shadow-2xl border-4 border-gray-800"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 50px 100px rgba(255, 122, 0, 0.3)'
                  }}
                  animate={{
                    rotateY: [0, -5, 0],
                    rotateX: [0, 2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />
                  
                  {/* Screen */}
                  <div className="absolute inset-3 bg-black rounded-[32px] overflow-hidden">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-black/50 backdrop-blur-sm flex items-center justify-between px-6 text-white text-xs z-20">
                      <span>9:41</span>
                      <div className="flex gap-1 items-center">
                        <div className="w-4 h-3 border border-white rounded-sm" />
                        <div className="w-1 h-3 bg-white rounded-sm" />
                      </div>
                    </div>

                    {/* Step 1: Map View with Zone */}
                    <motion.div
                      className="absolute inset-0 bg-gray-800"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 1, 0, 0, 0, 0, 1] }}
                      transition={{ duration: 12, repeat: Infinity, times: [0, 0.25, 0.3, 0.5, 0.7, 0.95, 1] }}
                    >
                      {/* Map Grid */}
                      <div className="absolute inset-0 opacity-30">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `repeating-linear-gradient(0deg, #444 0px, transparent 1px, transparent 20px),
                                            repeating-linear-gradient(90deg, #444 0px, transparent 1px, transparent 20px)`,
                            backgroundSize: '20px 20px'
                          }}
                        />
                      </div>
                      
                      {/* User location dot */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
                      </motion.div>

                      {/* Zone Circle */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 1] }}
                        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 11 }}
                      >
                        <div className="w-48 h-48 rounded-full border-2 border-[#FF7A00] bg-[#FF7A00]/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF7A00] rounded-full p-3">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>

                      {/* Zone Label */}
                      <motion.div
                        className="absolute top-16 left-1/2 -translate-x-1/2 bg-black/90 border border-[#FF7A00] rounded-lg px-3 py-2 text-white text-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -10] }}
                        transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 9 }}
                      >
                        Tech Hub Café
                      </motion.div>
                    </motion.div>

                    {/* Step 2: Notification Popup */}
                    <motion.div
                      className="absolute top-16 left-4 right-4 z-30"
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ 
                        y: [-100, -100, 0, 0, -100],
                        opacity: [0, 0, 1, 1, 0]
                      }}
                      transition={{ 
                        duration: 12, 
                        repeat: Infinity,
                        times: [0, 0.25, 0.3, 0.45, 0.5]
                      }}
                    >
                      <div className="bg-gradient-to-br from-gray-900 to-black border border-[#FF7A00] rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-start gap-3">
                          <div className="bg-gradient-to-br from-[#FF7A00] to-orange-600 rounded-xl p-2">
                            <Store className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm mb-1">Tech Hub Café</div>
                            <div className="text-gray-300 text-xs">You're nearby! Check out today's special offers</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3: Zone Details View */}
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
                      transition={{ duration: 12, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 0.9, 0.95, 1] }}
                    >
                      <div className="pt-16 px-4">
                        {/* Zone Header */}
                        <div className="text-center mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#FF7A00] to-orange-600 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                            <Store className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-white font-semibold text-lg mb-1">Tech Hub Café</h3>
                          <p className="text-gray-400 text-xs">180m • 12 users active</p>
                        </div>

                        {/* Offers */}
                        <div className="space-y-3">
                          <motion.div
                            className="bg-gradient-to-br from-gray-900 to-black border border-[#FF7A00]/50 rounded-xl p-4"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ 
                              x: [-20, -20, 0, 0],
                              opacity: [0, 0, 1, 1]
                            }}
                            transition={{ 
                              duration: 12,
                              repeat: Infinity,
                              times: [0, 0.55, 0.6, 1]
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Coffee className="w-4 h-4 text-[#FF7A00]" />
                              <span className="text-white text-sm font-semibold">Free Coffee Upgrade</span>
                            </div>
                            <p className="text-gray-400 text-xs">Valid for the next 30 minutes</p>
                          </motion.div>

                          <motion.div
                            className="bg-gradient-to-br from-gray-900 to-black border border-[#FF7A00]/50 rounded-xl p-4"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ 
                              x: [-20, -20, 0, 0],
                              opacity: [0, 0, 1, 1]
                            }}
                            transition={{ 
                              duration: 12,
                              repeat: Infinity,
                              times: [0, 0.6, 0.65, 1],
                              delay: 0.1
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <UsersIcon className="w-4 h-4 text-[#FF7A00]" />
                              <span className="text-white text-sm font-semibold">Connect with 5 users</span>
                            </div>
                            <p className="text-gray-400 text-xs">Match score: 85% or higher</p>
                          </motion.div>

                          <motion.div
                            className="bg-gradient-to-br from-gray-900 to-black border border-[#FF7A00]/50 rounded-xl p-4"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ 
                              x: [-20, -20, 0, 0],
                              opacity: [0, 0, 1, 1]
                            }}
                            transition={{ 
                              duration: 12,
                              repeat: Infinity,
                              times: [0, 0.65, 0.7, 1],
                              delay: 0.2
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                              <span className="text-white text-sm font-semibold">Daily Challenge</span>
                            </div>
                            <p className="text-gray-400 text-xs">Complete for bonus points</p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Floating Labels */}
                  <motion.div
                    className="absolute -right-20 top-24 bg-black/90 border border-[#FF7A00] rounded-lg px-3 py-2 text-white text-xs whitespace-nowrap hidden lg:block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: [0, 1, 1, 0], x: [-20, 0, 0, -20] }}
                    transition={{ duration: 12, repeat: Infinity, times: [0.25, 0.3, 0.45, 0.5] }}
                  >
                    Opt-in notification
                  </motion.div>

                  <motion.div
                    className="absolute -left-20 top-64 bg-black/90 border border-[#FF7A00] rounded-lg px-3 py-2 text-white text-xs whitespace-nowrap hidden lg:block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: [0, 0, 1, 1, 0], x: [20, 20, 0, 0, 20] }}
                    transition={{ duration: 12, repeat: Infinity, times: [0.5, 0.55, 0.6, 0.85, 0.9] }}
                  >
                    Personalized offers
                  </motion.div>
                </motion.div>

                {/* Journey Steps Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                  {['Approaching', 'Notification', 'Engage'].map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: [0.3, 0.3, 1, 1, 0.3],
                      }}
                      transition={{ 
                        duration: 12,
                        repeat: Infinity,
                        times: [0, i * 0.25, i * 0.25 + 0.05, (i + 1) * 0.25, 1],
                        delay: i * 0.1
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                      <span className="text-gray-400 text-xs hidden sm:inline">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <ZonesFeatureShowcase />
        </motion.div>

        {/* BUSINESS DASHBOARD - Full Control Center */}
        <ZonesBusinessDashboard />

        <CZoneFeed />

        {/* Privacy & User Control */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-[#0D0D0D] to-black border-2 border-[#FF7A00]/30 rounded-xl p-6 md:p-8">
            <Shield className="w-12 h-12 md:w-16 md:h-16 text-[#FF7A00] mx-auto mb-4 md:mb-6" />
            <h3 className="text-white mb-3 md:mb-4">Privacy First, Always</h3>
            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
              Businesses never see individual user data—only aggregated, anonymized analytics. Users maintain complete control over visibility and notifications.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                <span>End-to-end encrypted user data</span>
              </div>
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                <span>Transparent data usage policies</span>
              </div>
              <div className="flex items-start gap-2">
                <Settings className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                <span>Granular permission controls</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                <span>GDPR & CCPA compliant</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}