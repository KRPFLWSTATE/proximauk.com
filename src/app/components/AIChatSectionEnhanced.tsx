import { motion } from 'motion/react';
import {
  Sparkles, ArrowRight, CheckCircle, Info, Lightbulb, GitBranch,
  Send, Image, Shield, Activity, Eye, Heart, Zap, Users, Brain,
  Smile, TrendingUp, AlertCircle, Clock, Target
} from 'lucide-react';
import { useRef, useEffect } from 'react';

interface EnhancedGridProps {
  activeTab: 'starters' | 'mood' | 'flow';
  setActiveTab: (tab: 'starters' | 'mood' | 'flow') => void;
  moodScore: number;
  analysisProgress: number;
  activeStarter: number;
  flowStep: number;
  visibleMessages: number;
  chatEndRef: React.RefObject<HTMLDivElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  conversationStarters: any[];
  moodMetrics: any[];
  flowPaths: any[];
  chatMessages: any[];
}

export function EnhancedAIChatGrid({
  activeTab,
  setActiveTab,
  moodScore,
  analysisProgress,
  activeStarter,
  flowStep,
  visibleMessages,
  chatEndRef,
  chatContainerRef,
  conversationStarters,
  moodMetrics,
  flowPaths,
  chatMessages,
}: EnhancedGridProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
      {/* LEFT: AI Chat Interface with Multi-Tab Tools */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Live AI Assistant Interface</h3>
            <motion.div
              className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-green-400">AI Active</span>
            </motion.div>
          </div>

          {/* Chat Container */}
          <div className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="bg-gradient-to-r from-[#FF7A00]/10 to-purple-500/10 border-b border-[#FF7A00]/20 p-2">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'starters', label: 'Starters', icon: Lightbulb },
                  { id: 'mood', label: 'Mood', icon: Activity },
                  { id: 'flow', label: 'Flow', icon: GitBranch },
                ].map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all relative border-2 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white shadow-lg shadow-[#FF7A00]/30 border-[#FF7A00]'
                        : 'bg-black/50 text-gray-400 hover:text-white border-gray-700 hover:border-[#FF7A00]/60 hover:bg-black/70'
                    }`}
                    animate={
                      activeTab !== tab.id
                        ? {
                            boxShadow: [
                              '0 0 0px rgba(255, 122, 0, 0)',
                              '0 0 40px rgba(255, 122, 0, 1), 0 0 80px rgba(255, 122, 0, 0.6), inset 0 0 30px rgba(255, 122, 0, 0.3)',
                              '0 0 0px rgba(255, 122, 0, 0)',
                            ],
                            backgroundColor: [
                              'rgba(0, 0, 0, 0.5)',
                              'rgba(255, 122, 0, 0.2)',
                              'rgba(0, 0, 0, 0.5)',
                            ],
                          }
                        : {
                            boxShadow: [
                              '0 0 30px rgba(255, 122, 0, 0.8), 0 0 60px rgba(255, 122, 0, 0.5)',
                              '0 0 50px rgba(255, 122, 0, 1), 0 0 90px rgba(255, 122, 0, 0.7)',
                              '0 0 30px rgba(255, 122, 0, 0.8), 0 0 60px rgba(255, 122, 0, 0.5)',
                            ],
                          }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={
                        activeTab !== tab.id
                          ? {
                              opacity: [0.4, 1, 0.4],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: 'easeInOut',
                      }}
                    >
                      <tab.icon className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm hidden sm:inline font-semibold">{tab.label}</span>
                    
                    {/* Animated Border Glow */}
                    {activeTab !== tab.id && (
                      <motion.div
                        className="absolute inset-0 rounded-lg border-2 border-[#FF7A00]/0"
                        animate={{
                          borderColor: [
                            'rgba(255, 122, 0, 0)',
                            'rgba(255, 122, 0, 1)',
                            'rgba(255, 122, 0, 0)',
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                    
                    {/* Whole Button Glow Overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.6) 0%, rgba(255, 122, 0, 0.3) 50%, transparent 100%)',
                      }}
                      animate={
                        activeTab !== tab.id
                          ? {
                              opacity: [0, 1, 0],
                              scale: [0.8, 1.1, 0.8],
                            }
                          : {
                              opacity: [0.6, 0.9, 0.6],
                            }
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6" style={{ minHeight: '600px', maxHeight: '800px', overflowY: 'auto' }}>
              {/* Starters Tab */}
              {activeTab === 'starters' && (
                <motion.div
                  key="starters"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A]"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Lightbulb className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white">AI Conversation Starters</h4>
                      <p className="text-xs text-gray-400">Powered by OpenAI GPT-4o</p>
                    </div>
                  </div>

                  {/* Active Starter Display */}
                  <motion.div
                    key={activeStarter}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-[#FF7A00]/10 via-purple-500/5 to-transparent border border-[#FF7A00]/30 rounded-xl p-5 relative overflow-hidden"
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/5 to-purple-500/5"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full">
                            <span className="text-xs text-purple-400">
                              {conversationStarters[activeStarter].personality}
                            </span>
                          </div>
                          <div className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full">
                            <span className="text-xs text-green-400">
                              {conversationStarters[activeStarter].confidence}% Match
                            </span>
                          </div>
                          <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full">
                            <span className="text-xs text-blue-400">
                              {conversationStarters[activeStarter].category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white mb-4 text-lg leading-relaxed">
                        "{conversationStarters[activeStarter].text}"
                      </p>

                      {/* Interest Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {conversationStarters[activeStarter].interests.map((interest: string, i: number) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 bg-[#FF7A00]/20 border border-[#FF7A00]/30 rounded-full text-xs text-[#FF7A00]"
                          >
                            {interest}
                          </motion.span>
                        ))}
                      </div>

                      {/* Context */}
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Info className="w-3 h-3" />
                        <span>{conversationStarters[activeStarter].context}</span>
                      </div>

                      {/* Why It Works */}
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs text-green-400 mb-1">Why This Works</div>
                            <div className="text-xs text-gray-300">
                              {conversationStarters[activeStarter].whyItWorks}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] text-white rounded-lg text-sm"
                        >
                          Use This Starter
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-black/50 border border-[#FF7A00]/30 text-gray-400 rounded-lg text-sm hover:text-white"
                        >
                          Generate New
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* More Suggestions */}
                  <div className="space-y-3">
                    <div className="text-xs text-gray-400 mb-2">Alternative Suggestions</div>
                    {[1, 2, 3].map((i) => {
                      const altIndex = (activeStarter + i) % conversationStarters.length;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-4 hover:border-[#FF7A00]/50 transition-all cursor-pointer group"
                        >
                          <p className="text-gray-300 text-sm mb-2 group-hover:text-white transition-colors line-clamp-2">
                            {conversationStarters[altIndex].text}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 bg-purple-500/20 rounded text-purple-400">
                                {conversationStarters[altIndex].personality}
                              </span>
                              <span className="text-xs text-gray-500">
                                {conversationStarters[altIndex].confidence}%
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Mood Tab */}
              {activeTab === 'mood' && (
                <motion.div
                  key="mood"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Activity className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white">Real-Time Mood Analysis</h4>
                      <p className="text-xs text-gray-400">Emotional intelligence tracking</p>
                    </div>
                  </div>

                  {/* Overall Mood Score */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400">Overall Conversation Mood</span>
                      <motion.span
                        className="text-3xl text-blue-400"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {moodScore}%
                      </motion.span>
                    </div>

                    <div className="h-3 bg-black/50 rounded-full overflow-hidden mb-4">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
                        animate={{ width: `${moodScore}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-red-500/10 rounded">
                        <div className="text-red-400">0-40%</div>
                        <div className="text-gray-500">Needs Work</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-500/10 rounded">
                        <div className="text-yellow-400">41-70%</div>
                        <div className="text-gray-500">Building</div>
                      </div>
                      <div className="text-center p-2 bg-green-500/10 rounded">
                        <div className="text-green-400">71-100%</div>
                        <div className="text-gray-500">Excellent</div>
                      </div>
                    </div>
                  </div>

                  {/* Emotional Dimensions */}
                  <div className="space-y-3">
                    <div className="text-sm text-gray-400 mb-2">Emotional Dimensions</div>
                    {moodMetrics.map((metric: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="bg-black/50 border border-[#FF7A00]/20 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                              <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                            </div>
                            <span className="text-white text-sm">{metric.label}</span>
                          </div>
                          <span className="text-sm" style={{ color: metric.color }}>
                            {metric.value}%
                          </span>
                        </div>

                        <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: metric.color,
                              boxShadow: `0 0 10px ${metric.color}60`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sentiment Timeline */}
                  <div className="bg-black/50 border border-blue-500/30 rounded-xl p-4">
                    <div className="text-sm text-white mb-3">Conversation Velocity</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Msg/Min</div>
                        <div className="text-2xl text-blue-400">2.4</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Avg Response Time</div>
                        <div className="text-2xl text-green-400">45s</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-500/10 to-transparent border-l-4 border-green-500 rounded-r-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-white mb-1">AI Recommendation</h5>
                        <p className="text-sm text-gray-300">
                          Conversation mood is highly positive. Great time to suggest meeting up or
                          exchanging contact information.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Flow Tab */}
              {activeTab === 'flow' && (
                <motion.div
                  key="flow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <GitBranch className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white">AI-Guided Conversation Flow</h4>
                      <p className="text-xs text-gray-400">Intelligent path mapping</p>
                    </div>
                  </div>

                  {/* Flow Steps */}
                  <div className="space-y-4">
                    {flowPaths.map((path: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-xl p-4 transition-all ${
                          flowStep === index
                            ? 'border-[#FF7A00] shadow-lg shadow-[#FF7A00]/30'
                            : 'border-[#FF7A00]/20'
                        }`}
                      >
                        {/* Step Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                              style={{ backgroundColor: path.color }}
                              animate={flowStep === index ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {index + 1}
                            </motion.div>
                            <div>
                              <h5 className="text-white text-sm">{path.stage}</h5>
                              <p className="text-xs text-gray-400">{path.avgTime}</p>
                            </div>
                          </div>
                          <div
                            className="px-2 py-1 rounded-full text-xs"
                            style={{
                              backgroundColor: `${path.color}20`,
                              borderColor: `${path.color}40`,
                              borderWidth: '1px',
                              color: path.color,
                            }}
                          >
                            {path.confidence}%
                          </div>
                        </div>

                        {/* Step Details */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-black/50 rounded-lg p-2">
                            <div className="text-xs text-gray-400 mb-1">Intent</div>
                            <div className="text-xs text-white">{path.intent}</div>
                          </div>
                          <div className="bg-black/50 rounded-lg p-2">
                            <div className="text-xs text-gray-400 mb-1">Response</div>
                            <div className="text-xs text-white">{path.response}</div>
                          </div>
                        </div>

                        {/* Tips & Avoidance */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/30 rounded p-2">
                            <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                            <div className="text-xs text-gray-300">{path.tips}</div>
                          </div>
                          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded p-2">
                            <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                            <div className="text-xs text-gray-300">{path.avoidance}</div>
                          </div>
                        </div>

                        {/* Active Indicator */}
                        {flowStep === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-3 flex items-center gap-2 text-xs text-[#FF7A00]"
                          >
                            <motion.div
                              className="w-2 h-2 bg-[#FF7A00] rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <span>Current conversation stage</span>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Next Step Suggestion */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-[#FF7A00]/10 to-transparent border-l-4 border-[#FF7A00] rounded-r-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-white mb-1">Next Step Recommendation</h5>
                        <p className="text-sm text-gray-300">
                          Transition to deeper topics about shared professional interests. High
                          success probability.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Analysis Progress Bar */}
            <div className="border-t border-[#FF7A00]/20 p-3 bg-black/50">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>AI Analysis Progress</span>
                <span>{analysisProgress}%</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF7A00] via-purple-500 to-blue-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ 
                    duration: 0.5, 
                    ease: 'easeOut'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Live Chat with AI Integration & Auto-Scroll */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 text-white">Live Chat with AI Assistance</h3>

          {/* Chat Container */}
          <div className="bg-gradient-to-b from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-300" />
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#FF7A00]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white">Sarah Chen</h4>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <span>ENFP</span>
                      <span>•</span>
                      <span>15m away</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Brain className="w-5 h-5 text-white/80" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Messages with Auto-Scroll */}
            <div
              ref={chatContainerRef}
              className="p-6 space-y-4"
              style={{ minHeight: '600px', maxHeight: '800px', overflowY: 'auto' }}
            >
              {chatMessages.slice(0, visibleMessages).map((msg: any) => {
                if (msg.type === 'ai-analysis') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center"
                    >
                      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl px-4 py-3 max-w-md">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <Sparkles className="w-4 h-4 text-purple-400" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-xs text-purple-400 mb-1">AI Analysis</div>
                            <div className="text-xs text-gray-300">{msg.content}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                if (msg.type === 'ai-suggestions') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-[#FF7A00]" />
                        <span className="text-xs text-[#FF7A00]">AI Suggested Responses</span>
                      </div>
                      <div className="space-y-2">
                        {msg.suggestions.map((suggestion: any, idx: number) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="w-full text-left bg-black/50 border border-[#FF7A00]/20 rounded-lg p-3 hover:border-[#FF7A00]/50 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm text-gray-300 group-hover:text-white flex-1">
                                {suggestion.text}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-green-400">{suggestion.confidence}%</span>
                                <ArrowRight className="w-4 h-4 text-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  );
                }

                if (msg.type === 'mood-update') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center"
                    >
                      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-full px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Smile className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-gray-300">{msg.content}</span>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                if (msg.type === 'milestone') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center"
                    >
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full px-4 py-2 shadow-lg shadow-purple-500/20">
                        <span className="text-sm text-white">{msg.content}</span>
                      </div>
                    </motion.div>
                  );
                }

                if (msg.type === 'success') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-green-500/10 to-transparent border-l-4 border-green-500 rounded-r-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-sm text-green-400 mb-1">Connection Success!</div>
                          <div className="text-xs text-gray-300">{msg.content}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                // Regular messages
                if (msg.sender === 'them') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%]">
                        <div className="bg-[#1A1A1A] border border-[#FF7A00]/30 rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="text-white text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 ml-2">
                          <span className="text-xs text-gray-500">{msg.time}</span>
                          {msg.sentiment && (
                            <div
                              className={`px-2 py-0.5 rounded text-xs ${
                                msg.sentiment === 'positive'
                                  ? 'bg-green-500/20 text-green-400'
                                  : msg.sentiment === 'high-interest'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : msg.sentiment === 'excited'
                                  ? 'bg-pink-500/20 text-pink-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}
                            >
                              {msg.sentiment.replace('-', ' ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                if (msg.sender === 'me') {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%]">
                        <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg shadow-[#FF7A00]/20">
                          <p className="text-white text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-1 mr-2">
                          {msg.aiAssisted && (
                            <div className="px-2 py-0.5 bg-[#FF7A00]/20 rounded text-xs text-[#FF7A00]">
                              AI-assisted
                            </div>
                          )}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return null;
              })}

              {/* Scroll Anchor */}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-[#FF7A00]/20 p-4 bg-black/80">
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg bg-[#FF7A00]/20 text-[#FF7A00] hover:bg-[#FF7A00]/30 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message... (AI suggestions available)"
                  className="flex-1 bg-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00] transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] rounded-xl text-white shadow-lg shadow-[#FF7A00]/20"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>E2E encrypted • AI-enhanced • MBTI-matched</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}