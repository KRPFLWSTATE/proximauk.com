import { motion } from 'motion/react';
import { Shield, Eye, Brain, AlertTriangle, Camera, UserX, MapPinOff, Cpu } from 'lucide-react';

const safetyLayers = [
  {
    title: 'Verification Gateway',
    icon: Camera,
    color: '#FF7A00',
    features: [
      'AI-powered face scan verification',
      'Government ID authentication',
      'Biometric liveness detection',
      'Age based features and no users under 18',
      'Multi-factor authentication',
      'Periodic re-verification for flagged accounts',
      'Liveness detection prevents spoofing',
      'Temporary quarantine on verification mismatch',
      'Integration with crime databases',
    ],
  },
  {
    title: 'Profile & Privacy Controls',
    icon: Eye,
    color: '#FF8C1A',
    features: [
      'Granular privacy settings by audience (public, connections, mutuals)',
      'Emotional/psychological tags private by default',
      'Mental health insights never visible only mental health organisations can see limited',
      'Sensitive interest groups require mutual opt-in',
      'Default industry details ~80% visible before mutual connection',
      'Stealth mode and ghost mode options',
      'Safe zones (home, work exclusions)',
      'Suppress search results for private/vulnerable users',
      'Check-in always opt-in, never automatic',
    ],
  },
  {
    title: 'Messaging & Communication Safeguards',
    icon: Brain,
    color: '#FF9E33',
    features: [
      'Mutual opt-in required before messaging unlocked',
      'In-mail model: message requests need approval (Waves)',
      'Auto-warnings for external links/contact info sharing',
      'Gradual info reveal based on behavioral thresholds',
      'AI detection of funnel language (WhatsApp, Telegram redirects)',
      'Rate limits on messages for new/untrusted accounts',
      'Time-gated messaging for new users',
      'Rapid activity changes trigger verification prompts',
    ],
  },
  {
    title: 'AI Detection & Pattern Monitoring',
    icon: AlertTriangle,
    color: '#FFB04D',
    features: [
      'Real-time AI/ML scanning for scam keywords',
      'Detection of duplicate messages and mass pitches',
      'Platform fingerprinting blocks known bad actors',
      'Behavioral analytics for shallow convos ending in links',
      'Advanced NLP for nuanced grooming detection',
      'Automated sandboxing/ghosting of flagged users',
      'Context-aware AI: empathic for friends, safety-focused for professional',
      '24/7 human moderation team (When we scale)',
    ],
  },
  {
    title: 'User Empowerment & Reporting',
    icon: Shield,
    color: '#FFC266',
    features: [
      'One-tap reporting everywhere in the app',
      'Emergency/crisis reporting with instant escalation',
      'Panic button: disconnect, block, wipe contact instantly',
      'Immediate block/report with zero friction',
      'Zero-tolerance bans for predatory conduct',
      'Trusted ambassadors with special moderation powers',
      'Automated early warning when conversations hit scam thresholds',
      'High-risk accounts require message approval before delivery',
    ],
  },
  {
    title: 'Education & Transparency',
    icon: UserX,
    color: '#FFD480',
    features: [
      'Clear "no recruitment, no unsolicited offers" policy',
      'Onboarding education on safety rules',
      'Regular push campaigns on scam types and red flags',
      'In-app partner content (helplines, mental health support)',
      'Ambassador/super-user programs for community health',
      'Regular transparency reports on bans and incidents',
      'Community co-design with survivors and professionals',
      'Prompt every user: never share personal/financial info',
    ],
  },
  {
    title: 'Physical & Real-World Safety',
    icon: MapPinOff,
    color: '#FF9E33',
    features: [
      'Reflections: delay before full public visibility',
      'Instant proximity viewing only with physical presence',
      'Cannot place reflections on safezones',
      'Venue presence requires heavy verification',
      'Stealth block option if followed too long in real world',
      'Immediate access to emergency dialing from critical screens',
      'In-app escalation to mental health support partners',
      'Crisis signals trigger automatic support resources',
    ],
  },
];

const keyFeatures = [
  { title: 'AI Face Scan', description: 'Verify identity with facial recognition', icon: Camera },
  { title: 'Mutual Opt-In Messaging', description: 'Both users must approve before DMs unlock', icon: Shield },
  { title: 'Stealth Mode', description: 'Go completely invisible when needed', icon: UserX },
  { title: 'Safe Zones', description: 'Exclude locations from discovery', icon: MapPinOff },
  { title: 'Panic Button', description: 'Instant disconnect and escalation if threatened', icon: AlertTriangle },
  { title: 'On-Device AI', description: 'Privacy-preserving local processing', icon: Cpu },
  { title: 'Scam Detection', description: 'AI-powered real-time threat monitoring', icon: Brain },
  { title: 'Reflection Delay', description: 'Public posts delayed to prevent remote stalking', icon: Eye },
];

export function SafetySection() {
  return (
    <section id="safety" className="relative py-24 bg-gradient-to-b from-black to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Safety by Design Architecture</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Multi-layered security system designed to protect users while enabling genuine connections. We are committed to finding the perfect balance between features and safety. Safety is not "One of our top priorities" it is THE top priority. Our safety in itself will be disruptive.
          </p>
        </motion.div>

        {/* Layered Shield Diagram */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative">
            {/* Center Shield */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,122,0,0.5)',
                      '0 0 40px rgba(255,122,0,0.8)',
                      '0 0 20px rgba(255,122,0,0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Safety Layers */}
            <div className="grid md:grid-cols-2 gap-8">
              {safetyLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="h-full bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-lg p-8 hover:border-[#FF7A00] transition-all group"
                    style={{ borderColor: `${layer.color}50` }}
                  >
                    {/* Connection Line to Center */}
                    <motion.div
                      className="hidden md:block absolute top-1/2 w-px h-20 bg-gradient-to-b to-transparent"
                      style={{
                        [index % 2 === 0 ? 'right' : 'left']: '-4rem',
                        backgroundImage: `linear-gradient(to bottom, ${layer.color}, transparent)`,
                      }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    />

                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2"
                        style={{
                          backgroundColor: `${layer.color}20`,
                          borderColor: layer.color,
                        }}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <layer.icon className="w-7 h-7" style={{ color: layer.color }} />
                      </motion.div>
                      <h3 className="text-white group-hover:text-[#FF7A00] transition-colors">
                        {layer.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {layer.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-2 text-gray-400 text-sm"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: layer.color }}
                          />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-center mb-8 text-white">Key Safety Features</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-black/50 border border-[#FF7A00]/30 rounded-lg p-6 text-center hover:border-[#FF7A00] transition-all group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FF7A00]/10 mb-4 group-hover:bg-[#FF7A00]/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-[#FF7A00]" />
                </motion.div>
                <h4 className="text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Commitments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border-l-4 border-[#FF7A00] p-8 rounded-r-lg"
        >
          <h3 className="text-white mb-6">Our Privacy Commitments</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[#FF7A00] mb-3">What We Do</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {[
                  'End-to-end encryption for all communications',
                  'On-device AI processing for sensitive data',
                  'Transparent data collection policies',
                  'User-controlled data deletion',
                  'GDPR and CCPA compliance',
                  'Regular third-party security audits',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#FF7A00] mb-3">What We Don't Do</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {[
                  'Never sell user data to third parties',
                  'No location tracking when app is closed',
                  'No hidden data collection practices',
                  'No sharing data without consent',
                  'No permanent storage of sensitive biometrics',
                  'No advertisements based on private conversations',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-red-500 mt-1">✗</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
