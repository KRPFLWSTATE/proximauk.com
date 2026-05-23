import { motion } from 'motion/react';
import { DollarSign, Shield, Cpu, MapPin, TrendingUp, Lock, Globe } from 'lucide-react';

const marketSizes = [
  { label: 'Global TAM', value: '£22-28bn', icon: Globe, color: '#FF7A00' },
  { label: 'UK TAM', value: '£2.0-2.5bn', icon: MapPin, color: '#FF8C1A' },
  { label: 'Global SAM', value: '£8-11bn', icon: TrendingUp, color: '#FF9E33' },
  { label: 'UK SAM', value: '£1.0-1.5bn', icon: DollarSign, color: '#FFB04D' },
  { label: 'Global SOM', value: '£100-150m', icon: Lock, color: '#FFC266' },
  { label: 'UK SOM', value: '£30-45m', icon: Shield, color: '#FFD480' },
];

const techMoat = [
  {
    title: 'Sensor Fusion AI',
    description: '6 AI models processing GPS, UWB, BLE, Wi-Fi, IMU, and barometer data',
    advantage: 'Patent-pending precision proximity',
  },
  {
    title: 'MBTI Integration',
    description: 'FLWSTATE personality assessment with multi-context matching',
    advantage: 'Unique compatibility algorithm',
  },
  {
    title: 'GDPR Compliance',
    description: 'Privacy-first architecture with on-device AI processing',
    advantage: 'Trust advantage over competitors',
  },
  {
    title: 'Multi-Use Platform',
    description: 'Unified solution for social, professional, and local discovery',
    advantage: 'Network effects across contexts',
  },
  {
    title: 'B2B Zones Platform',
    description: 'Enterprise location intelligence infrastructure',
    advantage: 'Dual revenue streams',
  },
  {
    title: 'AR Integration',
    description: 'Real-world overlay technology for discovery',
    advantage: 'Future-proof positioning',
  },
];

export function MarketSizeSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0D0D0D] to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Market Size & Technology Moat</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Massive market opportunity protected by proprietary technology and network effects
          </p>
        </motion.div>

        {/* Market Size Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {marketSizes.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-lg p-8 text-center hover:border-[#FF7A00] transition-all group"
                style={{ borderColor: `${market.color}50` }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 border-2"
                  style={{
                    backgroundColor: `${market.color}20`,
                    borderColor: market.color,
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <market.icon className="w-8 h-8" style={{ color: market.color }} />
                </motion.div>

                <div className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: market.color }}>
                  {market.value}
                </div>

                <p className="text-gray-400 text-sm">{market.label}</p>

                {/* Pulse Animation */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-100"
                  style={{ borderColor: market.color }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Moat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-center mb-12 text-white">Our Technology Moat</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techMoat.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-lg p-6 hover:border-[#FF7A00] transition-all group"
              >
                <h4 className="text-white mb-3 group-hover:text-[#FF7A00] transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <div className="bg-[#FF7A00]/10 border-l-2 border-[#FF7A00] pl-3 py-2">
                  <p className="text-xs text-[#FF7A00]">✓ {item.advantage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitive Advantage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#FF7A00]/20 to-transparent border-2 border-[#FF7A00] rounded-lg p-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-[#FF7A00]" />
            <div>
              <h3 className="text-white mb-1">Defensible Competitive Advantages</h3>
              <p className="text-gray-400">Multiple layers of protection against competition</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[#FF7A00] mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>7-layer AI system (12+ months to replicate)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Post Funding patent applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Proprietary matching algorithms</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#FF7A00] mb-4">Network Effects</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Value increases with user density</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Multi-context usage drives retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>B2B Zones create stickiness</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#FF7A00] mb-4">Brand Trust</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Privacy-first positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>GDPR compliance from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Mental health partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}