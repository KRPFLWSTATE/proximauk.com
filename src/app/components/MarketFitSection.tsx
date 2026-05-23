import { motion } from 'motion/react';
import { Users, Briefcase, MapPin, Store, TrendingUp } from 'lucide-react';

const opportunities = [
  {
    title: 'Addressing Social Isolation',
    icon: Users,
    stats: [
      { label: 'UK online dating/discovery revenue (2024e)', value: '£300–£400m' },
      { label: 'Adults Affected', value: '45%' },
      { label: '16–29s feel lonely at least "some of the time"', value: '31%' },
      { label: 'Experience chronic loneliness (feel lonely "often" or "always")', value: '7-8%' },
    ],
    description: 'Mental health crisis creating massive demand for authentic connection solutions. Proxima directly tackles loneliness through proximity-based, personality-matched social discovery.',
  },
  {
    title: 'Professional Networking Reinvented',
    icon: Briefcase,
    stats: [
      { label: 'LinkedIn Users (UK)', value: '41-43M' },
      { label: 'High Dissatisfaction', value: 'Performative content' },
      { label: 'User Concerns', value: '"Cringe" & "humblebrags"' },
      { label: 'Fake Jobs & Opportunities', value: 'AI Generated Spam' },
    ],
    description: 'LinkedIn is known for pressure to create performative content, a feed filled with "cringe" and "humblebrags," and a sense that the platform prioritizes a "personal brand" over genuine professional value. Proxima combines CV intelligence with real-time proximity to facilitate organic professional connections at conferences, coworking spaces, and events.',
  },
  {
    title: 'Hyper-Local Service Discovery',
    icon: MapPin,
    stats: [
      { label: 'UK Search Advertising', value: '£16.9B' },
      { label: 'Google searches are local', value: '46%' },
      { label: 'UK adults use a mobile', value: '96%' },
      { label: 'Active connections (127% penetration)', value: '88.4M' },
    ],
    description: 'Users want personalized, real-time recommendations for nearby services. Proxima\'s AI combines personality matching with proximity for superior local discovery.',
  },
  {
    title: 'B2B & Venue Engagement',
    icon: Store,
    stats: [
      { label: 'UK Retail Market', value: '£394B' },
      { label: 'Business Events/Exhibitions Market', value: '£11.5B' },
      { label: 'Corporate Events Market', value: '£33.6B' },
      { label: 'Digital Engagement ROI', value: '340%' },
    ],
    description: 'Businesses need intelligent ways to engage nearby customers. Proxima Zones provides privacy-first, consent-based engagement with measurable ROI.',
  },
];

export function MarketFitSection() {
  return (
    <section id="market" className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Product-Market Fit & Opportunities</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Massive, underserved markets converging at the intersection of proximity, AI, and meaningful connection
          </p>
          
          {/* Pulsating statement about digital world */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <motion.div
              className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1A0A0A] to-black border-2 border-red-500/40 rounded-xl p-8 md:p-10 overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.2)',
                  '0 0 40px rgba(239, 68, 68, 0.4)',
                  '0 0 20px rgba(239, 68, 68, 0.2)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Pulsating glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400 rounded-full"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}

              <div className="relative z-10">
                <motion.p
                  className="text-gray-300 leading-relaxed italic"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.3)',
                      '0 0 20px rgba(239, 68, 68, 0.5)',
                      '0 0 10px rgba(239, 68, 68, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  In today's society, <span className="text-red-400 font-semibold">Millennials, Gen Z, and even Gen X</span> find themselves quietly drifting within the flavourless parameters imposed by social platforms that have long since plateaued. The digital world is now plagued by <span className="text-orange-400 font-semibold">monopolies that have forgotten the passion</span> that once ignited their rise—offering only weak interactions, stripped of essence and depth. No one wakes with excitement thinking, <span className="text-red-300 italic">"I can't wait to open Facebook and explore endless possibilities."</span> The wonder is gone; what remains is a <span className="text-red-400 font-semibold">hollow routine, absent of meaning, purpose, and the magic that true connection deserves</span>.
                </motion.p>
              </div>

              {/* Corner accents */}
              {[
                { top: '0', left: '0', rotate: '0deg' },
                { top: '0', right: '0', rotate: '90deg' },
                { bottom: '0', right: '0', rotate: '180deg' },
                { bottom: '0', left: '0', rotate: '270deg' }
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 border-t-2 border-l-2 border-red-500"
                  style={{
                    ...pos,
                    transform: `rotate(${pos.rotate})`
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="space-y-12">
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#0D0D0D] to-black border border-[#FF7A00]/30 rounded-lg overflow-hidden hover:border-[#FF7A00] transition-all"
            >
              <div className="grid lg:grid-cols-3 gap-8 p-8">
                {/* Title & Icon */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center border-2 border-[#FF7A00]"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <opp.icon className="w-8 h-8 text-[#FF7A00]" />
                    </motion.div>
                    <h3 className="text-white">{opp.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{opp.description}</p>
                </div>

                {/* Stats */}
                <div className="lg:col-span-2">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {opp.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                        className="bg-black/50 border border-[#FF7A00]/30 rounded-lg p-6 text-center hover:border-[#FF7A00] transition-all"
                      >
                        <div className="mb-2 text-[#FF7A00] break-words overflow-hidden" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                          {stat.value}
                        </div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Market Summary */}
        {/* Removed Total Addressable Market section */}
      </div>
    </section>
  );
}