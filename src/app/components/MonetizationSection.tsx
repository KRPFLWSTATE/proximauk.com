import { motion } from 'motion/react';
import { Users, Building } from 'lucide-react';

export function MonetizationSection() {
  return (
    <section className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Fair, Transparent Revenue – Powered by Credits</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Proxima uses a simple credit system that keeps things fair: users pay for value, businesses pay for tools, and all core safety features stay completely free.
          </p>
          <p className="text-[#FF7A00]/80 max-w-3xl mx-auto text-sm mt-4">
            Seed stage pricing shown below. Pricing increases from Series A onwards.
          </p>
        </motion.div>

        {/* B2C Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-[#FF7A00]" />
            <h3 className="text-white text-2xl md:text-3xl">B2C Membership Plans</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-2xl p-8 hover:border-[#FF7A00] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="text-gray-400 mb-2">Free</div>
                <div className="text-white text-4xl mb-2">£0</div>
                <div className="text-gray-500 text-sm mb-6">per month</div>
                <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg px-4 py-3 mb-6">
                  <div className="text-[#FF7A00] font-semibold">2,000 credits / month</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Try Proxima with a safe, low-friction starter tier</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Access to core AI features in limited quantities</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Perfect for new users exploring the app</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Plus Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gradient-to-br from-[#0D0D0D] to-black border-2 border-[#FF7A00] rounded-2xl p-8 hover:shadow-[0_0_50px_rgba(255,122,0,0.3)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-3xl" />
              <div className="absolute -top-3 -right-3 bg-[#FF7A00] text-white text-xs px-3 py-1 rounded-full">Popular</div>
              <div className="relative z-10">
                <div className="text-[#FF7A00] mb-2">Plus</div>
                <div className="text-white text-4xl mb-2">£5.99</div>
                <div className="text-gray-500 text-sm mb-6">per month</div>
                <div className="bg-[#FF7A00]/20 border border-[#FF7A00] rounded-lg px-4 py-3 mb-6">
                  <div className="text-[#FF7A00] font-semibold">10,000 credits / month</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Heavier usage of AI features and smarter matching</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>More Waves, more Sidekick guidance, more event matches</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Ideal for regular users</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-2xl p-8 hover:border-[#FF7A00] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="text-gray-400 mb-2">Pro</div>
                <div className="text-white text-4xl mb-2">£11.99</div>
                <div className="text-gray-500 text-sm mb-6">per month</div>
                <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg px-4 py-3 mb-6">
                  <div className="text-[#FF7A00] font-semibold">22,000 credits / month</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Full access to Proxima's AI toolkit</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Best limits for Waves, deep compatibility reports and Sidekick</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0" />
                    <span>Includes premium tools like AI CV optimisation</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-gray-500 text-sm mb-12">
            Credits reset every month. Unused credits don't roll over, keeping the system clean and predictable.
          </p>

          {/* B2C Credit Packs */}
          <div className="mb-8">
            <h4 className="text-white text-xl mb-6">Credit Packs (One-Time Purchase)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Tempt Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-4 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex flex-col mb-3">
                  <div className="text-white font-semibold mb-2">Tempt Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£1.99</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">2,000 credits</div>
                <p className="text-gray-500 text-xs">Perfect for occasional boosts.</p>
              </motion.div>

              {/* Crave Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-4 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex flex-col mb-3">
                  <div className="text-white font-semibold mb-2">Crave Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£3.39</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">5,000 credits</div>
                <p className="text-gray-500 text-xs">Great value starter pack.</p>
              </motion.div>

              {/* Hunger Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-4 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex flex-col mb-3">
                  <div className="text-white font-semibold mb-2">Hunger Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£7.99</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">16,000 credits</div>
                <p className="text-gray-500 text-xs">For power users in their social flow.</p>
              </motion.div>

              {/* Obsess Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-4 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex flex-col mb-3">
                  <div className="text-white font-semibold mb-2">Obsess Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£14.99</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">30,000 credits</div>
                <p className="text-gray-500 text-xs">Best value for super-active users.</p>
              </motion.div>

              {/* Surge Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-4 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex flex-col mb-3">
                  <div className="text-white font-semibold mb-2">Surge Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£29.99</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">60,000 credits</div>
                <p className="text-gray-500 text-xs">Ultimate credit pack for heavy users.</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-green-900/20 to-transparent border-l-4 border-green-500 p-4 rounded-r-lg"
          >
            <p className="text-green-400 text-sm">
              Core safety tools like Safe Seat Alerts and Safe Escort Prompts always cost <span className="font-semibold">0 credits</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* B2B Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Building className="w-8 h-8 text-[#FF7A00]" />
            <h3 className="text-white text-2xl md:text-3xl">B2B Enterprise Plans – For Venues & Local Businesses</h3>
          </div>

          <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
            Business credits work differently to consumer credits, powering venue-specific features like zone management, analytics dashboards, and promotional tools.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Small Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-2xl p-6 hover:border-[#FF7A00] transition-all group"
            >
              <div className="text-gray-400 text-sm mb-2">Enterprise Small</div>
              <div className="text-white text-3xl mb-2">£49</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg px-3 py-2 mb-4">
                <div className="text-[#FF7A00] text-sm font-semibold">1,500 credits / month</div>
              </div>
              <div className="text-white text-sm mb-3">Designed for cafés, small bars and boutiques.</div>
              <p className="text-gray-500 text-xs">Precise geo-fence around the property (≈20m radius), ideal for intimate spaces.</p>
            </motion.div>

            {/* Medium Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gradient-to-br from-[#0D0D0D] to-black border-2 border-[#FF7A00] rounded-2xl p-6 hover:shadow-[0_0_50px_rgba(255,122,0,0.3)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-3xl" />
              <div className="absolute -top-3 -right-3 bg-[#FF7A00] text-white text-xs px-3 py-1 rounded-full">Popular</div>
              <div className="relative z-10">
                <div className="text-[#FF7A00] text-sm mb-2">Enterprise Medium</div>
                <div className="text-white text-3xl mb-2">£89</div>
                <div className="text-gray-500 text-sm mb-4">per month</div>
                <div className="bg-[#FF7A00]/20 border border-[#FF7A00] rounded-lg px-3 py-2 mb-4">
                  <div className="text-[#FF7A00] text-sm font-semibold">4,000 credits / month</div>
                </div>
                <div className="text-white text-sm mb-3">For busy restaurants, gyms and co-working floors.</div>
                <p className="text-gray-400 text-xs">Geo-fence sized to match the unit or floor.</p>
              </div>
            </motion.div>

            {/* Large Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-2xl p-6 hover:border-[#FF7A00] transition-all group"
            >
              <div className="text-gray-400 text-sm mb-2">Enterprise Large</div>
              <div className="text-white text-3xl mb-2">£179</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg px-3 py-2 mb-4">
                <div className="text-[#FF7A00] text-sm font-semibold">10,000 credits / month</div>
              </div>
              <div className="text-white text-sm mb-3">For large venues like supermarkets, big gyms, and malls.</div>
              <p className="text-gray-500 text-xs">Covers the full store or multi-room footprint with custom configuration.</p>
            </motion.div>
          </div>

          <p className="text-center text-gray-500 text-sm mb-12">
            Outside any zone, Proxima enforces a strict ~20m discovery radius to keep users safe from stalking behaviour.
          </p>

          {/* B2B Credit Packs */}
          <div className="mb-8">
            <h4 className="text-white text-xl mb-6">B2B Credit Packs (One-Time Purchase, Permanent)</h4>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Catalyst Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-6 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">Catalyst Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£100</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">5,000 credits</div>
                <p className="text-gray-500 text-xs">Great for testing campaigns and seasonal activity.</p>
              </motion.div>

              {/* Ignite Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-6 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">Ignite Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£250</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">15,000 credits</div>
                <p className="text-gray-500 text-xs">For venues running ongoing offers and events.</p>
              </motion.div>

              {/* Voltage Pack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-6 hover:border-[#FF7A00] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">Voltage Pack</div>
                  <div className="text-[#FF7A00] font-semibold">£500</div>
                </div>
                <div className="text-gray-400 text-sm mb-2">50,000 credits</div>
                <p className="text-gray-500 text-xs">For high-traffic locations and enterprise zones.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Safety Reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#FF7A00]/10 via-transparent to-[#FF7A00]/10 border-t border-b border-[#FF7A00]/30 py-8 text-center"
        >
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            Users are never charged for safety. Credits power optional AI features and business tools, not core protection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}