import { motion } from 'motion/react';
import { Store, Settings, Users as UsersIcon, BarChart3, Shield, Eye, Award, Coffee, Briefcase, Music, Sparkles, Heart } from 'lucide-react';
import { ZonesFeatureShowcase } from './ZonesFeatureShowcase';

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
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="hidden sm:inline">Drawing Zone...</span>
                <span className="sm:hidden">Active</span>
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

              {/* Animated User Avatars Appearing in Zone */}
              {[
                { x: '35%', y: '40%', delay: 3, name: 'Alex', color: 'from-blue-500 to-cyan-500' },
                { x: '55%', y: '35%', delay: 3.2, name: 'Maria', color: 'from-purple-500 to-pink-500' },
                { x: '45%', y: '55%', delay: 3.4, name: 'James', color: 'from-green-500 to-emerald-500' },
                { x: '60%', y: '50%', delay: 3.6, name: 'Sophie', color: 'from-orange-500 to-red-500' },
                { x: '40%', y: '45%', delay: 3.8, name: 'David', color: 'from-indigo-500 to-purple-500' }
              ].map((user, i) => (
                <motion.div
                  key={i}
                  className="absolute z-20"
                  style={{ left: user.x, top: user.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: user.delay }}
                >
                  {/* Ping effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${user.color} opacity-50`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    style={{ width: '40px', height: '40px', left: '-12px', top: '-12px' }}
                  />
                  
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${user.color} border-2 border-white flex items-center justify-center text-white text-xs md:text-sm cursor-pointer hover:scale-110 transition-transform`}>
                    {user.name[0]}
                  </div>
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-0.5 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    {user.name}
                  </div>
                </motion.div>
              ))}

              {/* Connection Lines Between Users */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.line
                  x1="35" y1="40" x2="55" y2="35"
                  stroke="#FF7A00"
                  strokeWidth="0.2"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 4 }}
                />
                <motion.line
                  x1="45" y1="55" x2="60" y2="50"
                  stroke="#FF7A00"
                  strokeWidth="0.2"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 4.2 }}
                />
              </svg>

              {/* Live Stats Overlay */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-black/90 border border-[#FF7A00] rounded-lg p-3 md:p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 4 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Active Users</div>
                    <motion.div
                      className="text-lg md:text-2xl text-[#FF7A00]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                      >
                        5
                      </motion.span>
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Connections</div>
                    <motion.div className="text-lg md:text-2xl text-[#FF7A00]">3</motion.div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Coverage</div>
                    <motion.div className="text-lg md:text-2xl text-[#FF7A00]">180m</motion.div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Opt-In Rate</div>
                    <motion.div className="text-lg md:text-2xl text-green-500">87%</motion.div>
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
              <div className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
              <span className="hidden sm:inline">Zone created and activated – users can now opt-in to connect</span>
              <span className="sm:hidden">Zone Active</span>
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
          <h3 className="text-center mb-4 text-white text-2xl md:text-3xl">The Zone Arsenal: 17 Innovative B2B Features</h3>
          <p className="text-center text-gray-400 mb-12 md:mb-16 max-w-3xl mx-auto text-sm md:text-base">
            Proxima Zones isn't just another business tool—it's a complete ecosystem of innovative features that transform how businesses engage with customers. Each feature is engineered with stunning visual demonstrations below.
          </p>

          <ZonesFeatureShowcase />
        </motion.div>

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
