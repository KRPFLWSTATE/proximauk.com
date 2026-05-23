import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Send, Smile, Meh, Frown, Brain, TrendingUp, AlertCircle } from 'lucide-react';

export function StageChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'sarah',
      text: 'Hey Alex! I saw your work on energy prediction models. Really impressive stuff. I\'m exploring how design could make climate data more accessible. Would love to hear your thoughts!',
      time: '2:34 PM',
      mood: 'curious',
      aiInsight: 'Great opening! References specific work and proposes value exchange.'
    },
    {
      sender: 'alex',
      text: 'Thanks Sarah! That\'s a fascinating angle. One of our biggest challenges is making complex time-series forecasts understandable for non-technical stakeholders. How are you approaching that in your work?',
      time: '2:41 PM',
      mood: 'engaged',
      aiInsight: 'Positive engagement. Alex is asking follow-up questions - strong interest signal.'
    },
    {
      sender: 'sarah',
      text: 'Exactly! I\'ve been working on interactive visualizations that let people "feel" the data rather than just see numbers. For climate stuff, I think there\'s huge potential to combine your ML models with immersive design. Ever thought about co-founding something in this space?',
      time: '2:45 PM',
      mood: 'excited',
      aiInsight: 'Bold move introducing co-founding. Alex\'s INTJ type appreciates direct communication.'
    },
    {
      sender: 'alex',
      text: 'I have actually. Been looking for someone with strong design/UX skills who gets the climate urgency. Your circular design background is exactly what I need. Want to hop on a call this week to explore this further?',
      time: '2:52 PM',
      mood: 'enthusiastic',
      aiInsight: '🎉 Major milestone! Alex initiated next step. This is progressing very well.'
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [showMoodAnalysis, setShowMoodAnalysis] = useState(true);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'curious':
      case 'engaged':
        return <Smile className="w-4 h-4 text-blue-400" />;
      case 'excited':
      case 'enthusiastic':
        return <Smile className="w-4 h-4 text-green-400" />;
      case 'neutral':
        return <Meh className="w-4 h-4 text-gray-400" />;
      default:
        return <Frown className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Chat Window */}
        <div className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl border border-gray-800 overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Chat Header */}
          <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <div>
                  <div className="text-white">Alex Kumar</div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online • London, UK
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowMoodAnalysis(!showMoodAnalysis)}
                className="text-xs text-gray-400 hover:text-[#FF7A00] transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                {showMoodAnalysis ? 'Hide' : 'Show'} AI Insights
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`flex ${message.sender === 'sarah' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'sarah' ? 'bg-[#FF7A00]/20 border-[#FF7A00]/50' : 'bg-gray-800/50 border-gray-700'} border rounded-2xl p-4`}>
                  <p className="text-gray-200 text-sm mb-2">{message.text}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-500">{message.time}</span>
                    <div className="flex items-center gap-2">
                      {getMoodIcon(message.mood)}
                      <span className="text-xs text-gray-400 capitalize">{message.mood}</span>
                    </div>
                  </div>
                  {showMoodAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-700/50"
                    >
                      <div className="flex items-start gap-2">
                        <Brain className="w-3 h-3 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400">{message.aiInsight}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]/50"
              />
              <button className="p-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Analysis Sidebar */}
        <div className="space-y-4">
          {/* Real-Time Mood */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-[#FF7A00]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white">Conversation Health</div>
                <div className="text-xs text-gray-400">Real-time analysis</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Engagement', value: 94, color: 'from-green-500 to-emerald-600' },
                { label: 'Mutual Interest', value: 98, color: 'from-blue-500 to-cyan-600' },
                { label: 'Response Quality', value: 91, color: 'from-purple-500 to-pink-600' }
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">{metric.label}</span>
                    <span className="text-sm text-[#FF7A00]">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${metric.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Insights */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5 text-[#FF7A00]" />
              <div className="text-white">AI Insights</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Smile className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-green-400 mb-1">Positive Signal</div>
                  <p className="text-xs text-gray-300">Alex initiated next step (video call). Very strong interest!</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-blue-400 mb-1">Momentum Building</div>
                  <p className="text-xs text-gray-300">Conversation depth increasing. Both asking follow-up questions.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-[#FF7A00] mb-1">Suggestion</div>
                  <p className="text-xs text-gray-300">Confirm specific time for call within next 24 hours to maintain momentum.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
            <div className="text-white mb-3 text-sm">Quick Replies</div>
            <div className="space-y-2">
              {[
                'Definitely! How about Thursday afternoon?',
                'I\'d love to share some mockups I\'ve been working on',
                'Let\'s schedule 30 min to explore this further'
              ].map((reply, i) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
