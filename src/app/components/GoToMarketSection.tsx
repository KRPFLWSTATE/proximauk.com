import { motion } from 'motion/react';
import { MapPin, TrendingUp, Globe, Heart, GraduationCap, Phone } from 'lucide-react';

const phases = [
  {
    number: 1,
    title: 'Foundation & Verification',
    subtitle: 'London Launch',
    color: '#FF7A00',
    goals: [
      'Launch in Central London (targeted neighborhoods)',
      'Achieve 10,000 verified users',
      'Build trust through mental health partnerships',
      'Establish verification-first brand identity',
    ],
    tactics: [
      'University partnerships (UCL, LSE, Imperial)',
      'Influencer seeding in Shoreditch, Soho, Camden',
      'Mental health organization collaborations',
      'PR campaign: "London\'s safest social app"',
    ],
  },
  {
    number: 2,
    title: 'Education & Validation',
    subtitle: 'UK Expansion',
    color: '#FF8C1A',
    goals: [
      'Expand to Manchester, Birmingham, Edinburgh',
      'Reach 100,000 active users',
      'Prove B2B Zones model with 50 venues',
      'Achieve 15% M-o-M growth',
    ],
    tactics: [
      'City-by-city rollout with local ambassadors',
      'University expansion program',
      'Corporate pilot programs (WeWork, Google Campus)',
      'Event partnerships (festivals, conferences)',
    ],
  },
  {
    number: 3,
    title: 'Scale Through Trust',
    subtitle: 'International Expansion',
    color: '#FF9E33',
    goals: [
      'Launch in Dublin, Amsterdam, Paris, Berlin',
      'Scale to 1M users across Europe',
      'Enterprise Zones partnerships',
      'Series A fundraise (£5-8M)',
    ],
    tactics: [
      'Market-by-market localization',
      'Strategic partnerships with European universities',
      'B2B enterprise sales team',
      'International PR and growth marketing',
    ],
  },
];

const partners = [
  { name: 'Mind.org', type: 'Mental Health', logo: Heart },
  { name: 'Student Minds', type: 'University', logo: GraduationCap },
  { name: 'Nightline', type: 'Support', logo: Phone },
  { name: 'Young Minds', type: 'Youth', logo: Heart },
  { name: 'UCL', type: 'Education', logo: GraduationCap },
  { name: 'Imperial College', type: 'Education', logo: GraduationCap },
];

export function GoToMarketSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Go-To-Market Strategy</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
        </motion.div>

        {/* Three-Phase Timeline */}
        <div className="relative max-w-7xl mx-auto mb-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1: Pre-Seed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#8B4513]/30 via-[#6B2C10]/40 to-[#4B1A08]/50 border-2 border-[#8B4513]/50 rounded-2xl p-6 hover:border-[#FF7A00]/60 transition-all h-full">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-white text-lg mb-2">Pre-Seed: Prove the University Playbook</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-gray-300 text-sm">Months 0-14</p>
                    <span className="px-3 py-1 bg-[#FF7A00] text-white text-xs rounded-full">£70k</span>
                  </div>
                  <p className="text-gray-400 text-xs">Marketing Budget</p>
                </div>

                {/* Numbered items */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">1</span>
                    </div>
                    <p className="text-gray-300 text-sm">LOIs + partnerships with 3 pilot uni, prestige and 250-30 student ambassadors</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">2</span>
                    </div>
                    <p className="text-gray-300 text-sm">Freshers' Launches, society events, free-coffee rewards and mental-health collabs on 5+ campuses</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">3</span>
                    </div>
                    <p className="text-gray-300 text-sm">Light-touch expansion into 2 new universities to refine the CPI and Cost-Per-Retained-User.</p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="bg-black/30 border border-[#FF7A00]/30 rounded-lg p-4">
                  <h4 className="text-[#FF7A00] text-sm mb-2">Outcome:</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">7,000+ active users across 5+ universities; Day-7 retention greater than 30%,  repeatable density playbook</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Seed Phases 1-2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#8B4513]/30 via-[#6B2C10]/40 to-[#4B1A08]/50 border-2 border-[#8B4513]/50 rounded-2xl p-6 hover:border-[#FF7A00]/60 transition-all h-full">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-white text-lg mb-2">Seed Phases 1-2: Foundation & PMF</h3>
                  <p className="text-gray-300 text-sm mb-2">Months 1-6; Part of <span className="text-[#FF7A00]">£1.01m</span> Seed budget</p>
                </div>

                {/* Numbered items */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">1</span>
                    </div>
                    <p className="text-gray-300 text-sm">Hero launch event + ambassador-led activation to lock in strong early retention.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">2</span>
                    </div>
                    <p className="text-gray-300 text-sm">Add 6th campus, hire core growth team, and launch in-app referrals</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">3</span>
                    </div>
                    <p className="text-gray-300 text-sm">Focus paid and offline activity on a few postcodes clusters per campus</p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="bg-black/30 border border-[#FF7A00]/30 rounded-lg p-4">
                  <h4 className="text-[#FF7A00] text-sm mb-2">Outcome:</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">~32k cumulative users by Month 6, CAC trending down and clear product-market-fit signals.</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Seed Phases 3-4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#8B4513]/30 via-[#6B2C10]/40 to-[#4B1A08]/50 border-2 border-[#8B4513]/50 rounded-2xl p-6 hover:border-[#FF7A00]/60 transition-all h-full">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-white text-lg mb-2">Seed Phases 3-4: National Scale & Brand</h3>
                  <p className="text-gray-300 text-sm mb-2">Months 7-16 - Remainder of <span className="text-[#FF7A00]">£1.01m</span> Seed budget</p>
                </div>

                {/* Numbered items */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">1</span>
                    </div>
                    <p className="text-gray-300 text-sm">Expand to 12 campuses in 4-5 cities using ambassadors, referrals and micro-influencers.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">2</span>
                    </div>
                    <p className="text-gray-300 text-sm">Lean into Freshers and New Year peaks as CAC improves to 5-6 pounds with growing density.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF7A00] text-xs">3</span>
                    </div>
                    <p className="text-gray-300 text-sm">Add OOH, PR, "Proxima Day" and an 'Ambassador Summit' to cement national brand.</p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="bg-black/30 border border-[#FF7A00]/30 rounded-lg p-4">
                  <h4 className="text-[#FF7A00] text-sm mb-2">Outcome:</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">~159k cumulative users by Month 16, £8.09 Blended CAC and a data-backed LTV:CAC story for Series A.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-r from-[#FF7A00]/20 via-[#FF7A00]/10 to-[#FF7A00]/20 border border-[#FF7A00]/50 rounded-lg p-5 text-center">
            <p className="text-white text-sm md:text-base leading-relaxed">
              Total GTM spend: <span className="text-[#FF7A00]">£70k</span> (Pre-Seed) + <span className="text-[#FF7A00]">£1.41m</span> (Seed) → <span className="text-[#FF7A00]">~165k</span> users with a blended CAC of <span className="text-[#FF7A00]">~£8.09</span> and Day-7 retention <span className="text-[#FF7A00]">&gt;30%</span> as the quality gate
            </p>
          </div>
        </motion.div>

        {/* Strategic Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border-l-4 border-[#FF7A00] p-8 rounded-r-lg">
            <h4 className="text-white mb-4">Why Partnerships Matter</h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#FF7A00]">
                  <Heart className="w-5 h-5" />
                  <span>Trust Building</span>
                </div>
                <p className="text-gray-400">
                  Mental health partnerships establish Proxima as a force for good, not just another social app.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#FF7A00]">
                  <GraduationCap className="w-5 h-5" />
                  <span>User Acquisition</span>
                </div>
                <p className="text-gray-400">
                  University collaborations provide access to ideal early adopters with high network density.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#FF7A00]">
                  <Globe className="w-5 h-5" />
                  <span>Credibility</span>
                </div>
                <p className="text-gray-400">
                  Association with respected institutions differentiates Proxima from competitors.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Funding Stages Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-2xl p-8 hover:border-[#FF7A00]/60 transition-all">
            <h4 className="text-white text-xl mb-6 text-center">Funding Stages & Growth Strategy</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pre-Seed */}
              <div className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-6 hover:border-[#FF7A00]/50 transition-all">
                <h5 className="text-[#FF7A00] mb-3">Pre-Seed – Build & Insight Phase</h5>
                <p className="text-gray-400 text-sm">
                  Product development, UK proof-of-concept and early user data; no monetisation.
                </p>
              </div>

              {/* Seed */}
              <div className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-6 hover:border-[#FF7A00]/50 transition-all">
                <h5 className="text-[#FF7A00] mb-3">Seed – London Density & Early Revenue</h5>
                <p className="text-gray-400 text-sm">
                  Achieving strong user density and initial monetisation in London and a first UK wedge of students and young professionals.
                </p>
              </div>

              {/* Series A */}
              <div className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-6 hover:border-[#FF7A00]/50 transition-all">
                <h5 className="text-[#FF7A00] mb-3">Series A – Multi-City UK Expansion + International Pilots</h5>
                <p className="text-gray-400 text-sm">
                  Scaling across major UK cities while launching international pilots in carefully chosen hubs (e.g. Dublin, Amsterdam, early European tech corridors and other English-speaking nodes) to validate playbook portability, pricing and cultural fit.
                </p>
              </div>

              {/* Series B */}
              <div className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-6 hover:border-[#FF7A00]/50 transition-all">
                <h5 className="text-[#FF7A00] mb-3">Series B – UK Scale + Early International Expansion</h5>
                <p className="text-gray-400 text-sm">
                  Leveraging proven playbooks to scale across the UK and internationally into 2–3 additional regions, building a multi-country, multi-city network with strong operating leverage.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Executable Strategy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0A0A0A] via-black to-[#0D0D0D] border-2 border-[#FF7A00]/50 rounded-xl p-8 md:p-10 relative overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-5">
              <motion.div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, #FF7A00 0px, transparent 1px, transparent 30px),
                    repeating-linear-gradient(90deg, #FF7A00 0px, transparent 1px, transparent 30px)
                  `,
                  backgroundSize: '30px 30px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 30px']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Glowing particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 2) * 60}%`
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}

            <div className="relative z-10">
              <motion.p
                className="text-gray-300 leading-relaxed mb-6"
                animate={{
                  textShadow: [
                    '0 0 5px rgba(255, 122, 0, 0.2)',
                    '0 0 10px rgba(255, 122, 0, 0.4)',
                    '0 0 5px rgba(255, 122, 0, 0.2)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                So at this point you may be thinking if all of this is practically executable. <span className="text-[#FF7A00] font-semibold">Yes, it's executable.</span> Proxima launches through a <span className="text-orange-400 font-semibold">sequenced feature cadence</span>—each drop engineered to fuel hype, expand marketing creativity, and compound engagement.
              </motion.p>
              
              <motion.p
                className="text-gray-300 leading-relaxed"
                animate={{
                  textShadow: [
                    '0 0 5px rgba(255, 122, 0, 0.2)',
                    '0 0 10px rgba(255, 122, 0, 0.4)',
                    '0 0 5px rgba(255, 122, 0, 0.2)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                While <span className="text-gray-400 line-through">Snapchat, Instagram, LinkedIn, Tinder and Bumble</span> have plateaued, Proxima is a <span className="text-[#FF7A00] font-semibold">perpetual innovation flywheel</span>, architected to keep evolving. Our roadmap is long, our plateau distant, and every release strengthens our mission to <span className="text-orange-400 font-semibold">combat the dystopian drift of shallow, essence-less interaction</span>.
              </motion.p>

              {/* Emphasis bar */}
              <motion.div
                className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}