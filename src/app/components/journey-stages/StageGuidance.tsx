import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Brain, MessageCircle, Target, Sparkles, CheckCircle } from 'lucide-react';

export function StageGuidance() {
  const [selectedFramework, setSelectedFramework] = useState(0);

  const frameworks = [
    {
      title: 'Climate Tech Vision',
      icon: Target,
      iceBreakers: [
        'I noticed you\'re working on energy prediction models at Octopus Energy. I\'m exploring circular design in climate tech. Have you thought about how ML could optimize material lifecycles?',
        'Your DeepMind climate modeling background is fascinating! I\'d love to hear about the biggest challenges you faced and how design thinking might help.',
        'I saw you\'re passionate about climate impact over profit. What made you transition from pure research to applied energy work?'
      ],
      conversationFlow: [
        { stage: 'Opening', tip: 'Reference specific project or background detail' },
        { stage: 'Find Common Ground', tip: 'Discuss shared climate tech passion' },
        { stage: 'Explore Collaboration', tip: 'Propose specific ways skills complement' },
        { stage: 'Next Steps', tip: 'Suggest informal video chat or co-working session' }
      ]
    },
    {
      title: 'Skill Complementarity',
      icon: Sparkles,
      iceBreakers: [
        'Your technical ML expertise + my design background could be powerful for climate solutions. Ever thought about co-founding?',
        'I\'ve been trying to make sustainability data more accessible through design. Would love your perspective on the ML side.',
        'Curious: what\'s the biggest UX problem you face with ML tools in your climate work?'
      ],
      conversationFlow: [
        { stage: 'Opening', tip: 'Highlight complementary skills directly' },
        { stage: 'Problem Exploration', tip: 'Ask about challenges in their domain' },
        { stage: 'Value Exchange', tip: 'Offer your expertise to help' },
        { stage: 'Build Relationship', tip: 'Move to regular knowledge-sharing' }
      ]
    },
    {
      title: 'Personal Connection',
      icon: MessageCircle,
      iceBreakers: [
        'Fellow INTJ here! How do you balance deep focus work with the collaborative nature of climate tech?',
        'I saw you\'re into rock climbing. Do you find outdoor activities help with the intensity of ML research?',
        'Both of us seem to value impact over financial returns. What keeps you motivated on tough days?'
      ],
      conversationFlow: [
        { stage: 'Opening', tip: 'Connect on personality or shared interest' },
        { stage: 'Share Vulnerability', tip: 'Open up about your own challenges' },
        { stage: 'Mutual Support', tip: 'Offer to be accountability partner' },
        { stage: 'Deepen Trust', tip: 'Regular check-ins beyond just work topics' }
      ]
    }
  ];

  const currentFramework = frameworks[selectedFramework];
  const Icon = currentFramework.icon;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl text-white">AI Conversation Guidance</h3>
            <p className="text-sm text-gray-400">Personalized ice-breakers and conversation frameworks for Sarah × Alex</p>
          </div>
        </div>

        {/* Framework Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {frameworks.map((framework, index) => {
            const FrameworkIcon = framework.icon;
            return (
              <button
                key={index}
                onClick={() => setSelectedFramework(index)}
                className={`p-6 rounded-xl border transition-all text-left ${
                  selectedFramework === index
                    ? 'bg-[#FF7A00]/20 border-[#FF7A00]'
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }`}
              >
                <FrameworkIcon className={`w-8 h-8 mb-3 ${selectedFramework === index ? 'text-[#FF7A00]' : 'text-gray-500'}`} />
                <div className={`${selectedFramework === index ? 'text-white' : 'text-gray-400'}`}>
                  {framework.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Framework Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFramework}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Ice Breakers */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-[#FF7A00]/30">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-[#FF7A00]" />
                <h4 className="text-white text-lg">AI-Generated Ice Breakers</h4>
              </div>
              <div className="space-y-4">
                {currentFramework.iceBreakers.map((iceBreaker, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900/70 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] group-hover:bg-[#FF7A00] group-hover:text-white transition-all">
                        {i + 1}
                      </div>
                      <p className="text-gray-300 text-sm flex-1">{iceBreaker}</p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-xs text-[#FF7A00] hover:text-[#FF8C1A] transition-colors">
                        Copy to clipboard →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-[#FF7A00]" />
                <h4 className="text-white text-lg">Conversation Framework</h4>
              </div>
              <div className="space-y-4">
                {currentFramework.conversationFlow.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    {i < currentFramework.conversationFlow.length - 1 && (
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-[#FF7A00]/30" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center text-white z-10">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white mb-1">{step.stage}</div>
                        <p className="text-sm text-gray-400">{step.tip}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-r from-[#FF7A00]/10 to-[#FF9E33]/10 border border-[#FF7A00]/30 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <Brain className="w-6 h-6 text-[#FF7A00] flex-shrink-0" />
            <div>
              <div className="text-white mb-2">AI Sidekick Insight</div>
              <p className="text-sm text-gray-300">
                Based on Alex's profile, he values <strong className="text-[#FF7A00]">direct, thoughtful communication</strong> and 
                responds well to <strong className="text-[#FF7A00]">specific technical questions</strong>. He's likely to engage deeply 
                if you reference his research or pose interesting problems. Your ENFP energy can balance his INTJ preference for structure 
                by bringing creative possibilities while respecting his need for logical frameworks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
