import { motion } from 'motion/react';

export function ComparisonSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-black via-[#0D0D0D] to-black border border-[#FF7A00]/30 rounded-lg p-8"
        >
          <h3 className="text-center mb-8 text-white text-2xl md:text-3xl lg:text-4xl">Current Platforms vs Proxima</h3>
          <p className="text-center mb-8 text-gray-400 max-w-2xl mx-auto italic">
            Disrupting multiple industries while solving real-world problems and completely revolutionizing the way people connect on social media.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 text-gray-400 font-semibold uppercase tracking-wider">Current Platforms</h4>
              <ul className="space-y-3">
                {[
                  'Fragmented experience across multiple apps',
                  'Surface-level matching algorithms',
                  'No real-time proximity awareness',
                  'Privacy concerns and data exploitation',
                  'Limited professional networking integration',
                  'Disconnected from local communities',
                  'Transactional interactions lacking authenticity',
                  'No support for social anxiety or fear of rejection',
                  'Introverts face high barriers to connection',
                  'Uncertainty paralyzes connection attempts',
                  'Optional or weak verification – easy for fake, duplicate and burner accounts',
                  'Safety = "block & report" only; venues have no tools to protect users in real time',
                  'Mixed intent (dating / networking / friendship) leads to awkward, high-pressure outreach',
                  'Mostly chat-first apps; little awareness of physical spaces, events or what\'s happening around you',
                  'Businesses are just ad slots; user experience and venue tools are disconnected',
                  'Does not foster real world communities by leveraging local businesses',
                  'Does not have as much depth as Proxima and does not create connections at the depth we will create sustainably',
                  'Monetise attention and personal data; users are the product',
                  'Single-use verticals (only dating OR only networking) with siloed graphs'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-red-400/90 text-sm md:text-base"
                  >
                    <span className="text-red-500 mt-1 flex-shrink-0">✗</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[#FF7A00] font-semibold uppercase tracking-wider">Proxima</h4>
              <ul className="space-y-3">
                {[
                  'All-in-one unified platform',
                  'Deep personality & compatibility matching',
                  'Precision proximity with 7-layers of depth powered by AI',
                  'Privacy-first, GDPR-compliant design',
                  'Seamless social + professional networking',
                  'Hyper-local community engagement',
                  'Fosters genuine, authentic connections',
                  'Reduces fear of rejection with compatibility scores',
                  'Empowers introverts with confidence-building tools',
                  'Eliminates uncertainty in connection attempts',
                  'Mandatory ID + liveness checks with trust scores for every account',
                  'Safe seat alerts, verified host mode, safe escort prompts and anti-stalking radii built into the core experience',
                  'Wave system (Romantic / Professional / Friendly) + mutual opt-in so full profiles only unlock on reciprocity',
                  'Zones, events and proximity waves that adapt behaviour to the venue and time of day (campus, café, nightlife, co-working)',
                  'Venues get a full SaaS dashboard (offers, loyalty, analytics, safety tools) that makes the experience better for users and drives more trusted footfall back into the app',
                  'Privacy-first, GDPR-compliant; venues pay for tools and insights, users pay for value (credits/Plus/Pro) – no selling of personal data',
                  'One verified social graph powering dating, networking, friendship and local discovery, compounding value with every interaction'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-green-400/90 text-sm md:text-base"
                  >
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
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
