import { motion } from 'motion/react';
import { UserPlus, Compass, MessageCircle, Coffee, RefreshCw } from 'lucide-react';

const journeySteps = [
  {
    title: 'Sign Up',
    description: 'Sarah creates her profile in London, completes her MBTI assessment, uploads her CV, and adds other data points to set her preferences for social connections.',
    icon: UserPlus,
    detail: 'AI analyzes personality, interests, professional background, and compatibility parameters',
  },
  {
    title: 'Discover',
    description: 'Walking through Shoreditch, Sarah receives proximity alerts for compatible people nearby who share her interests.',
    icon: Compass,
    detail: 'Real-time GPS + BLE fusion identifies matches within 50m',
  },
  {
    title: 'Connect',
    description: 'She sends a Wave to Alex, a designer working at a nearby café. Alex waves back, and they start chatting.',
    icon: MessageCircle,
    detail: 'AI conversation starters help break the ice naturally',
  },
  {
    title: 'Meet',
    description: 'They meet at the café for coffee, discovering shared passions for art and tech. A genuine friendship begins.',
    icon: Coffee,
    detail: 'In-person connection facilitated by intelligent matching',
  },
  {
    title: 'Update the Sidekick',
    description: 'After their meeting, Sarah\'s AI Sidekick asks "How did it go?" She shares what went well and areas for improvement—like preferring quieter venues for first meetings.',
    icon: RefreshCw,
    detail: 'Sidekick learns from feedback to improve future matching and recommendations',
  },
];

export function UserJourneySection() {
  return (
    <section id="journey" className="relative py-24 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #FF7A00 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">User Journey – A Day in the Life</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet Sarah, a 28-year-old professional in London discovering meaningful connections through Proxima
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF7A00]/50 via-[#FF7A00] to-[#FF7A00]/50" />

          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-16 md:mb-24 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'
              }`}
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'}`}>
                <div className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-lg p-8 hover:border-[#FF7A00] transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center group-hover:bg-[#FF7A00]/20 transition-all border-2 border-[#FF7A00]"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-8 h-8 text-[#FF7A00]" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-[#FF7A00] mb-1">Step {index + 1}</div>
                      <h3 className="text-white">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{step.description}</p>
                  <div className="bg-[#FF7A00]/5 border-l-2 border-[#FF7A00] pl-4 py-2">
                    <p className="text-sm text-gray-400 italic">{step.detail}</p>
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <motion.div
                className="hidden md:block absolute left-1/2 top-8 w-4 h-4 bg-[#FF7A00] rounded-full -translate-x-1/2 shadow-[0_0_20px_#FF7A00]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              />

              {/* Flowing Line Animation */}
              {index < journeySteps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 top-12"
                  style={{ width: '2px', height: '100px' }}
                >
                  <motion.div
                    className="w-full bg-gradient-to-b from-[#FF7A00] to-transparent"
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
