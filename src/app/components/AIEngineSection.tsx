import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Users, Cpu, UserCircle, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const aiLayers = [
  {
    number: 1,
    title: 'MBTI Inspired Assessment',
    subtitle: 'FLWSTATE Process',
    description: 'Comprehensive personality profiling using MBTI inspired framework. Analyzes cognitive functions, social preferences, and compatibility dimensions.',
    icon: Brain,
    color: '#FF7A00',
  },
  {
    number: 2,
    title: 'AI-Powered Professional Compatibility',
    subtitle: 'Career & Skills Matching',
    description: 'CV parsing and career trajectory analysis to identify professional synergies, mentorship opportunities, and collaboration potential.',
    icon: Users,
    color: '#FF8C1A',
  },
  {
    number: 3,
    title: 'Machine Learning Compatibility Engine',
    subtitle: 'Deep Pattern Recognition',
    description: 'Neural networks analyze behavioral patterns, interaction history, and user feedback to refine match quality over time.',
    icon: Cpu,
    color: '#FF9E33',
  },
  {
    number: 4,
    title: 'The Sidekick System',
    subtitle: 'Your Personal Connection Assistant',
    description: 'A conversational AI companion that learns your unique connection preferences beyond surface-level data. Share specific interests, aspirations, values, and nuanced preferences that matter to you. Your Sidekick remembers these details and helps find meaningful connections based on what truly matters—not just what shows up on a personality test.',
    icon: UserCircle,
    color: '#FFA940',
  },
  {
    number: 5,
    title: 'Conversation Intelligence System',
    subtitle: 'Natural Language Processing',
    description: 'AI-powered conversation starters, mood analysis, and flow mapping ensure engaging, authentic dialogue between matches. The system adjusts dynamically, reducing its involvement based on the type of relationship being initiated to ensure authenticity.',
    icon: MessageSquare,
    color: '#FFB04D',
  },
  {
    number: 6,
    title: 'Smart Matching & Recommendation Engine',
    subtitle: 'Context-Aware Suggestions',
    description: 'Dynamically adapts recommendations based on time, location, user mode (social/professional/dating), and real-time proximity.',
    icon: Target,
    color: '#FFC266',
  },
  {
    number: 7,
    title: 'Events & Discovery Engine',
    subtitle: 'Social Connection Opportunities',
    description: 'Suggests events and local businesses where users can match and attend based on similar interests. Once at the venue, users can connect with additional compatible people in real-time, turning every outing into a networking opportunity.',
    icon: TrendingUp,
    color: '#FFD480',
  },
];

export function AIEngineSection() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="ai-engine" className="relative py-24 bg-gradient-to-b from-black to-[#0D0D0D] overflow-hidden">
      {/* Animated Background Circuit */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={isInView ? {
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            } : {}}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <div className="w-32 h-32 border border-[#FF7A00] rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Proxima Intelligence Engine</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A 7-Layer AI System Powering Unprecedented Matching Precision
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* 3D Layered Stack Visualization */}
          <div className="relative mb-16">
            <div className="flex flex-col items-center gap-2">
              {aiLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  <motion.div
                    className={`relative bg-gradient-to-r from-black to-[#0D0D0D] border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedLayer === index
                        ? 'border-[#FF7A00] shadow-[0_0_30px_rgba(255,122,0,0.5)]'
                        : 'border-[#FF7A00]/30 hover:border-[#FF7A00]/60'
                    }`}
                    onClick={() => setSelectedLayer(selectedLayer === index ? null : index)}
                    whileHover={{ scale: 1.02, z: 20 }}
                    style={{
                      transform: `translateY(${index * -4}px) translateZ(${index * 10}px)`,
                    }}
                  >
                    <div className="flex items-center gap-6">
                      {/* Layer Number */}
                      <motion.div
                        className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-2"
                        style={{
                          borderColor: layer.color,
                          backgroundColor: `${layer.color}20`,
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-2xl" style={{ color: layer.color }}>
                          {layer.number}
                        </span>
                      </motion.div>

                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${layer.color}20` }}
                      >
                        <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                      </div>

                      {/* Title */}
                      <div className="flex-1">
                        <h3 className="text-white mb-1">{layer.title}</h3>
                        <p className="text-sm" style={{ color: layer.color }}>
                          {layer.subtitle}
                        </p>
                      </div>

                      {/* Expand Indicator */}
                      <motion.div
                        animate={{ rotate: selectedLayer === index ? 180 : 0 }}
                        className="text-[#FF7A00]"
                      >
                        ▼
                      </motion.div>
                    </div>

                    {/* Expanded Description */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: selectedLayer === index ? 'auto' : 0,
                        opacity: selectedLayer === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-[#FF7A00]/30">
                        <p className="text-gray-300">{layer.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-lg p-8">
              <h3 className="mb-4 text-white">How It Works</h3>
              <p className="text-gray-300 mb-4">
                Each layer of our AI system builds upon the previous, creating a comprehensive understanding of user compatibility. The system processes millions of data points in real-time to deliver matches that truly matter.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Continuous learning from user interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Privacy-preserving on-device processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7A00] mt-1">•</span>
                  <span>Real-time adaptation to context and location</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#FF7A00]/5 to-transparent border border-[#FF7A00]/30 rounded-lg p-8 relative overflow-hidden">
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/10 to-transparent"
                animate={isInView ? {
                  opacity: [0.3, 0.6, 0.3],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              
              <div className="relative z-10">
                <h3 className="mb-6 text-white">System Intelligence</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Processing Speed', value: '<100ms', description: 'Real-time matching decisions', width: '95%' },
                    { label: 'Matching Dimensions', value: 'Multi-layer', description: 'Holistic compatibility analysis', width: '85%' },
                    { label: 'Context Modes', value: '3', description: 'Social • Professional • Dating', width: '75%' },
                    { label: 'Intelligence Layers', value: '7', description: 'Integrated AI systems', width: '88%' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <div>
                          <span className="text-gray-300 text-sm block">{stat.label}</span>
                          <span className="text-xs text-gray-500">{stat.description}</span>
                        </div>
                        <span className="text-xl text-[#FF7A00] group-hover:text-[#FFB04D] transition-colors">{stat.value}</span>
                      </div>
                      <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#FF7A00] via-[#FF9E33] to-[#FFB04D] shadow-[0_0_10px_rgba(255,122,0,0.5)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}