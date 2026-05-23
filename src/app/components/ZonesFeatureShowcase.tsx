import { motion } from 'motion/react';
import { 
  MapPin, Users, TrendingUp, Bell, Zap, Brain, Star, MessageSquare, 
  Shield, Trophy, UserCheck, Repeat, Navigation, Hand, Sparkles, Gift, 
  Database, Award, FileText, Mic, Activity, Settings, MessageCircle, 
  BarChart3, Heart, DoorOpen, ShieldCheck, AlertTriangle, Clipboard
} from 'lucide-react';
import { ZonesBusinessDashboard } from './ZonesBusinessDashboard';

const features = [
  {
    num: '1',
    icon: Bell,
    title: 'Push Notification Offer Blast',
    desc: 'Send targeted, consent-based offers to opted-in users currently inside your zone. Messages are filtered and rate-limited to stay valuable, not spammy.',
    tags: ['Targeted', 'Consent-Based', 'Real-Time'],
    gradient: 'from-orange-500 to-red-500',
    rgb: '249, 115, 22'
  },
  {
    num: '2',
    icon: FileText,
    title: 'Sponsored Reflection',
    desc: 'A geo-pinned, branded "reflection card" that appears inside your zone. Fits naturally within the Reflections feed rather than feeling like a banner ad.',
    tags: ['Branded', 'Native', 'Storytelling'],
    gradient: 'from-purple-500 to-pink-500',
    rgb: '168, 85, 247'
  },
  {
    num: '3',
    icon: Brain,
    title: 'AI Ad Copy Generation',
    desc: 'Type a simple brief and AI produces 2–3 versions of polished, on-brand copy tuned to your local audience\'s personality and mood profile.',
    tags: ['AI', 'Marketing', 'Automation'],
    gradient: 'from-cyan-500 to-blue-500',
    rgb: '6, 182, 212'
  },
  {
    num: '4',
    icon: Zap,
    title: 'Discount Code and Credits Broadcast',
    desc: 'Deliver context-aware discount codes and APP credits to users in or near your zone based on their interests and mode (social/professional/dating).',
    tags: ['Context-Aware', 'Value', 'Conversion'],
    gradient: 'from-yellow-500 to-orange-500',
    rgb: '234, 179, 8'
  },
  {
    num: '5',
    icon: TrendingUp,
    title: 'Proximity Heatmap (24h)',
    desc: 'View anonymised movement patterns and dwell time around your venue over the last 24 hours. See peak times and under-utilised periods without seeing any identities.',
    tags: ['Analytics', 'Privacy-Safe', 'Insights'],
    gradient: 'from-green-500 to-emerald-500',
    rgb: '34, 197, 94'
  },
  {
    num: '6',
    icon: Sparkles,
    title: 'AI Feedback Analyzer',
    desc: 'Turns feedback from Proxima and linked review platforms into structured themes: compliments, issues, sentiment trends, and "fix-this-first" priorities.',
    tags: ['AI', 'Insights', 'Improvement'],
    gradient: 'from-indigo-500 to-purple-500',
    rgb: '99, 102, 241'
  },
  {
    num: '7',
    icon: Star,
    title: 'Review Booster Prompt',
    desc: 'Politely prompt happy users (opt-in only) to leave a review on your chosen platforms. Users can dismiss or disable entirely if they prefer.',
    tags: ['Opt-In', 'Growth', 'Reputation'],
    gradient: 'from-amber-500 to-yellow-500',
    rgb: '245, 158, 11'
  },
  {
    num: '8',
    icon: MessageCircle,
    title: 'Zone Chat and Voice Stand-Out',
    desc: 'Your business name appears as a subtle sponsor tag in nearby chat and voice channels (e.g., "Hosted by Brew & Connect"). Raises awareness across all communication features without interrupting the conversation flow.',
    tags: ['Subtle', 'Awareness', 'Chat & Voice'],
    gradient: 'from-pink-500 to-rose-500',
    rgb: '236, 72, 153'
  },
  {
    num: '9',
    icon: Database,
    title: 'Enterprise CRM Export',
    desc: 'Export aggregated, privacy-safe behavioural data (visit frequency, time-of-day, interest clusters) for CRM or BI tools. No names, no direct identifiers.',
    tags: ['Privacy-Safe', 'Enterprise', 'Data'],
    gradient: 'from-slate-500 to-gray-600',
    rgb: '100, 116, 139'
  },
  {
    num: '10',
    icon: Award,
    title: 'Featured Zone (7 Days)',
    desc: 'Get a prominent "Featured" badge and priority placement on discovery maps and zone lists for a full week. Ideal for launches, rebrands, or seasonal campaigns.',
    tags: ['Visibility', 'Campaign', 'Priority'],
    gradient: 'from-orange-500 to-red-500',
    rgb: '249, 115, 22'
  },
  {
    num: '11',
    icon: UserCheck,
    title: 'Verified Host Mode',
    desc: 'Mark specific staff as "Hosts" visible to users as safe points of contact. They can welcome visitors, moderate social energy, and coordinate micro-events.',
    tags: ['Curated', 'Safety', 'Community'],
    gradient: 'from-blue-500 to-cyan-500',
    rgb: '59, 130, 246'
  },
  {
    num: '12',
    icon: Shield,
    title: 'Safe Seat Alert',
    desc: 'If a user feels uncomfortable, they trigger a discreet alert. Staff receive a private notification to check on that area calmly. No public drama, just quiet help.',
    tags: ['Safety', 'Discreet', 'Trust'],
    gradient: 'from-green-500 to-teal-500',
    rgb: '34, 197, 94',
    badge: 'FREE'
  },
  {
    num: '13',
    icon: Trophy,
    title: 'Community Leaderboard',
    desc: 'Monthly ranking highlighting venues with highest user-rated scores for friendliness, safety, and experience quality. Incentivises genuine welcoming spaces.',
    tags: ['Reputation', 'Quality', 'Gamification'],
    gradient: 'from-yellow-500 to-orange-500',
    rgb: '234, 179, 8'
  },
  {
    num: '14',
    icon: Repeat,
    title: 'Loyalty Loop Engine',
    desc: 'Automatically recognises returning visitors and unlocks small rewards (extra credits, discounts, early event access) without heavy discount cycles.',
    tags: ['Retention', 'Rewards', 'Automation'],
    gradient: 'from-violet-500 to-purple-500',
    rgb: '139, 92, 246'
  },
  {
    num: '15',
    icon: Navigation,
    title: 'Safe Escort Prompt',
    desc: 'Users feeling uneasy leaving can request a staff escort to the door or nearby pickup spot. Request goes only to verified staff. Pure trust and safety feature.',
    tags: ['Safety', 'Trust', 'Care'],
    gradient: 'from-emerald-500 to-green-500',
    rgb: '16, 185, 129',
    badge: 'FREE'
  },
  {
    num: '16',
    icon: Gift,
    title: 'Dynamic Welcome Cards',
    desc: 'When users enter and opt in, they see a dynamic card with today\'s specials, Wi-Fi info, house rules, quiet spots, and ongoing events. Frictionless onboarding.',
    tags: ['Onboarding', 'Guidance', 'UX'],
    gradient: 'from-orange-500 to-amber-500',
    rgb: '255, 122, 0',
    badge: 'NEW'
  },
  {
    num: '17',
    icon: Users,
    title: 'Micro-Event Spotlight',
    desc: 'Create tiny, time-boxed micro-events in real time (latte art demo in 10 min, founders\' table now, Q&A at 6:15pm). Only zone visitors see these spontaneous opportunities.',
    tags: ['Real-Time', 'Engagement', 'Community'],
    gradient: 'from-pink-500 to-orange-500',
    rgb: '236, 72, 153',
    badge: 'NEW'
  },
  {
    num: '18',
    icon: Activity,
    title: 'Venue Vibe Index',
    desc: 'Real-time anonymous pulse of how your space feels — calm for work, warm for community, or professional. Driven by opt-in signals, protecting the atmosphere you promise.',
    tags: ['Atmosphere', 'Real-Time', 'Trust'],
    gradient: 'from-teal-500 to-cyan-500',
    rgb: '20, 184, 166',
    badge: 'NEW'
  },
  {
    num: '19',
    icon: Settings,
    title: 'Proxima Host AI',
    desc: 'Staff-side co-pilot that helps venues respond to live conditions with wisdom — timing welcomes, activating micro-events, supporting safety without exposing private data.',
    tags: ['AI', 'Operations', 'Smart'],
    gradient: 'from-indigo-500 to-blue-500',
    rgb: '99, 102, 241',
    badge: 'NEW'
  },
  {
    num: '20',
    icon: MessageCircle,
    title: 'Venue Context Cards',
    desc: 'Lightweight layer of venue context inside Proximity Chat — specials, house notes, micro-events, and friendly openers. Makes in-venue interaction effortless.',
    tags: ['Context', 'Chat', 'Engagement'],
    gradient: 'from-purple-500 to-pink-500',
    rgb: '147, 51, 234'
  },
  {
    num: '21',
    icon: BarChart3,
    title: 'Intent Mix Analytics',
    desc: 'Anonymous insight into why people gather — social, professional, or networking. Available only for approved venues. Never reveals individuals, helps tune programming.',
    tags: ['Analytics', 'Privacy-Safe', 'Insight'],
    gradient: 'from-blue-500 to-cyan-500',
    rgb: '59, 130, 246'
  },
  {
    num: '22',
    icon: Heart,
    title: 'Preference Fit & Comfort Trends',
    desc: 'Privacy-safe measure of how well your lived atmosphere matches what you promise. Protects comfort and helps maintain your venue\'s authentic identity.',
    tags: ['Comfort', 'Consistency', 'Trust'],
    gradient: 'from-rose-500 to-pink-500',
    rgb: '244, 63, 94'
  },
  {
    num: '23',
    icon: DoorOpen,
    title: 'Walk-By Drop-Off Insights',
    desc: 'Anonymous awareness of moments where people approached but didn\'t enter. Reveals improvement opportunities without tracking anyone personally.',
    tags: ['Conversion', 'Anonymous', 'Improve'],
    gradient: 'from-amber-500 to-orange-500',
    rgb: '251, 146, 60'
  },
  {
    num: '24',
    icon: TrendingUp,
    title: 'Social Impact Funnel',
    desc: 'Clear anonymised lens showing how healthy engagement translates to better dwell time, offer use, and repeat visits. Comfort and safety embedded in measurement.',
    tags: ['Impact', 'Metrics', 'Growth'],
    gradient: 'from-emerald-500 to-green-500',
    rgb: '16, 185, 129'
  },
  {
    num: '25',
    icon: ShieldCheck,
    title: 'Safety-Certified Venue Badge',
    desc: 'Trust badge for venues completing recognised safety training and meeting Proxima standards. Signals a reliably respectful environment to users.',
    tags: ['Safety', 'Trust', 'Certification'],
    gradient: 'from-green-500 to-emerald-500',
    rgb: '34, 197, 94',
    badge: 'NEW'
  },
  {
    num: '26',
    icon: AlertTriangle,
    title: 'Venue Shield (Safety Alerts)',
    desc: 'Privacy-safe safety layer detecting unusual risk patterns. Enables quiet staff-led support with area-based alerts. No identity exposure, just structured help.',
    tags: ['Safety', 'Discreet', 'Protection'],
    gradient: 'from-red-500 to-orange-500',
    rgb: '239, 68, 68',
    badge: 'FREE'
  },
  {
    num: '27',
    icon: Clipboard,
    title: 'Community Board',
    desc: 'Collaborative board where guests suggest micro-events and venue improvements. Helps spaces grow into trusted local hubs with community-driven ideas.',
    tags: ['Community', 'Collaboration', 'Ideas'],
    gradient: 'from-violet-500 to-purple-500',
    rgb: '139, 92, 246',
    badge: 'NEW'
  }
];

export function ZonesFeatureShowcase() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7A00]/20 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h3
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ textShadow: "0 0 30px rgba(255,122,0,0.8)" }}
            animate={{
              textShadow: [
                "0 0 30px rgba(255,122,0,0.8)",
                "0 0 50px rgba(255,122,0,1)",
                "0 0 30px rgba(255,122,0,0.8)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            27 Game-Changing Features
          </motion.h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Each feature engineered to maximize value, trust, and engagement while maintaining privacy and user control
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.num}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="group relative"
                style={{ perspective: '2000px', willChange: 'transform' }}
              >
                <motion.div
                  className="relative rounded-2xl p-6 h-full backdrop-blur-md border-2 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(${feature.rgb}, 0.05) 0%, rgba(0,0,0,0.9) 50%, rgba(10,10,10,0.95) 100%)`,
                    borderColor: `rgba(${feature.rgb}, 0.3)`,
                    boxShadow: `0 20px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(${feature.rgb}, 0.2)`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                  }}
                  whileHover={{
                    borderColor: `rgba(${feature.rgb}, 0.8)`,
                    rotateY: 8,
                    z: 100,
                    scale: 1.03,
                    boxShadow: `0 30px 80px -15px rgba(0,0,0,0.9), 0 0 60px rgba(${feature.rgb}, 0.6)`
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Subtle holographic shimmer - static */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 rounded-2xl pointer-events-none opacity-40"
                  />

                  {/* Main icon with optimized animations */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center relative`}
                      style={{
                        boxShadow: `0 0 30px rgba(${feature.rgb}, 0.6), inset 0 0 20px rgba(255,255,255,0.3)`,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform'
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotateY: 180,
                        boxShadow: `0 0 60px rgba(${feature.rgb}, 1), inset 0 0 30px rgba(255,255,255,0.5)`,
                        transition: { duration: 0.4 }
                      }}
                    >
                      <Icon className="w-7 h-7 text-white filter drop-shadow-lg" />
                    </motion.div>
                    <span 
                      className="text-sm font-mono"
                      style={{ 
                        color: `rgb(${feature.rgb})`,
                        textShadow: `0 0 15px rgba(${feature.rgb}, 1)` 
                      }}
                    >
                      #{feature.num}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <h5 className="text-white font-semibold" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
                      {feature.title}
                    </h5>
                    {feature.badge && (
                      <span 
                        className={`px-2 py-1 ${feature.badge === 'NEW' ? 'bg-[#FF7A00]/20 border-[#FF7A00] text-[#FF7A00]' : 'bg-green-500/20 border-green-500 text-green-400'} border rounded text-xs font-medium backdrop-blur-sm`}
                        style={{
                          boxShadow: `0 0 20px ${feature.badge === 'NEW' ? 'rgba(255,122,0,0.5)' : 'rgba(34,197,94,0.5)'}`
                        }}
                      >
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 relative z-10">
                    {feature.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {feature.tags.map((tag) => (
                      <motion.span 
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs backdrop-blur-sm"
                        style={{
                          backgroundColor: `rgba(${feature.rgb}, 0.15)`,
                          borderWidth: '1px',
                          borderColor: `rgba(${feature.rgb}, 0.4)`,
                          color: `rgb(${feature.rgb})`
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: `rgba(${feature.rgb}, 0.3)`,
                          boxShadow: `0 0 20px rgba(${feature.rgb}, 0.7)`,
                          borderColor: `rgba(${feature.rgb}, 0.9)`,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Optimized floating particles - reduced from 12 to 5 */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl hidden sm:block" data-particles>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          left: `${15 + i * 18}%`,
                          top: `${30 + (i % 2) * 40}%`,
                          backgroundColor: `rgba(${feature.rgb}, 0.6)`,
                          boxShadow: `0 0 8px rgba(${feature.rgb}, 0.8)`,
                          willChange: 'transform, opacity'
                        }}
                        animate={{
                          y: [0, -80],
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Single corner glow - optimized */}
                  <motion.div 
                    className="absolute top-0 right-0 w-40 h-40 blur-3xl rounded-full pointer-events-none"
                    style={{ 
                      backgroundColor: `rgba(${feature.rgb}, 0.15)`,
                      willChange: 'opacity'
                    }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Hover glow */}
                  <div 
                    className="absolute bottom-0 left-0 w-40 h-40 blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: `rgba(${feature.rgb}, 0.3)` }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Business Dashboard Demo */}
    </section>
  );
}