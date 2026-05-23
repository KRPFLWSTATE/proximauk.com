import { motion } from 'motion/react';
import { CheckCircle2, Code, Brain, FileCheck, MapPin, Calendar, Users, Mic, MessageCircle, UserCircle, Building2 } from 'lucide-react';

const milestones = [
  { title: 'Events Feature', status: 'complete', icon: Calendar, description: 'Full event creation, discovery, and management system implemented' },
  { title: 'Personality Test & CV Matching', status: 'complete', icon: Users, description: 'Complete onboarding with personality assessment and CV intelligence with tutorials' },
  { title: 'Voice Feature', status: 'complete', icon: Mic, description: 'Voice messaging and audio communication capabilities integrated' },
  { title: 'AI Chat Intelligence Engine', status: 'complete', icon: MessageCircle, description: 'Advanced AI-powered conversation analysis and recommendations' },
  { title: 'Profile Sections & Compatibility', status: 'complete', icon: UserCircle, description: 'Comprehensive profile system with detailed compatibility reports' },
  { title: 'MVP Developed', status: 'complete', icon: Code, description: 'Fully functional core app with proximity detection' },
  { title: 'AI Matching Implemented', status: 'complete', icon: Brain, description: 'MBTI-based compatibility system operational' },
  { title: 'Reflections Feature Live', status: 'complete', icon: MapPin, description: 'Geo-pinned content creation and discovery' },
  { title: 'Company Registered & Banking', status: 'complete', icon: Building2, description: 'Legal entity established with business banking setup' },
  { title: 'Multiple Patent Applications', status: 'complete', icon: FileCheck, description: 'Patent applications drafted for several core areas of the app' },
];

export function ProgressSection() {
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
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Progress So Far</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Substantial progress achieved across product development, legal setup, and intellectual property protection.
          </p>
        </motion.div>

        {/* Progress So Far */}
        <div className="mb-20">
          <h3 className="text-center mb-12 text-white">Progress So Far</h3>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-lg p-6 w-full ${
                  milestone.status === 'complete'
                    ? 'border-green-500/50'
                    : 'border-[#FF7A00]/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      milestone.status === 'complete'
                        ? 'bg-green-500/20'
                        : 'bg-[#FF7A00]/20'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <milestone.icon
                      className={`w-6 h-6 ${
                        milestone.status === 'complete' ? 'text-green-500' : 'text-[#FF7A00]'
                      }`}
                    />
                  </motion.div>
                  {milestone.status === 'complete' && (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )}
                  {milestone.status === 'in-progress' && (
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <h4 className="text-white mb-2">{milestone.title}</h4>
                <p className="text-gray-400 text-sm">{milestone.description}</p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      milestone.status === 'complete'
                        ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                        : 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/30'
                    }`}
                  >
                    {milestone.status === 'complete' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
