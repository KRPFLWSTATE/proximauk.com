import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Headphones, Volume2, Users, MessageCircle, Radio, Send } from 'lucide-react';

export function StageVoice() {
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'voice' | 'chat'>('voice');
  const [chatMessage, setChatMessage] = useState('');

  const participants = [
    { id: 1, name: 'Sarah Chen', avatar: 'S', speaking: true, muted: false },
    { id: 2, name: 'Alex Kumar', avatar: 'A', speaking: false, muted: false },
    { id: 3, name: 'Emma Rodriguez', avatar: 'E', speaking: false, muted: true },
    { id: 4, name: 'Marcus Johnson', avatar: 'M', speaking: false, muted: false }
  ];

  const chatMessages = [
    { user: 'Emma', text: 'Great point about renewable energy!', time: '3:42 PM' },
    { user: 'Marcus', text: '+1 to that', time: '3:43 PM' },
    { user: 'Alex', text: 'I can share some research papers after this', time: '3:44 PM' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl text-white mb-2">Climate Tech Founders - London</h3>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Radio className="w-4 h-4 text-green-500" />
              Voice Channel • Within 500m • 4 members
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
              Live
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Voice/Chat Area */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl border border-gray-800 overflow-hidden">
            {/* Tab Switcher */}
            <div className="bg-gray-900/50 px-6 py-3 border-b border-gray-800 flex gap-4">
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'voice'
                    ? 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/50'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Mic className="w-4 h-4" />
                Voice
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'chat'
                    ? 'bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/50'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Text Chat
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6" style={{ height: '400px' }}>
              <AnimatePresence mode="wait">
                {activeTab === 'voice' && (
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center"
                  >
                    {/* Voice Visualizer */}
                    <div className="text-center">
                      <div className="flex justify-center gap-2 mb-8">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 bg-gradient-to-t from-[#FF7A00] to-[#FF9E33] rounded-full"
                            animate={{
                              height: [20, Math.random() * 80 + 20, 20]
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-white mb-2">Sarah Chen is speaking...</p>
                      <p className="text-sm text-gray-400">
                        "I think combining ML predictions with interactive visualizations could revolutionize how we communicate climate data"
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col"
                  >
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {chatMessages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-800/50 rounded-xl p-3"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-[#FF7A00]">{msg.user}</span>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                          </div>
                          <p className="text-sm text-gray-300">{msg.text}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Send a message..."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]/50"
                      />
                      <button className="p-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white hover:scale-105 transition-transform">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-800 flex justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${
                  isMuted
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>
              <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
                <Headphones className="w-6 h-6 text-white" />
              </button>
              <button className="px-6 py-4 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all">
                Leave Channel
              </button>
            </div>
          </div>

          {/* Participants & Info */}
          <div className="space-y-4">
            {/* Participants List */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-[#FF7A00]" />
                <div>
                  <div className="text-white">Participants</div>
                  <div className="text-xs text-gray-400">{participants.length} members</div>
                </div>
              </div>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                        {participant.avatar}
                      </div>
                      {participant.speaking && (
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-[#FF7A00]"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{participant.name}</div>
                      {participant.speaking && (
                        <div className="text-xs text-[#FF7A00]">Speaking...</div>
                      )}
                    </div>
                    <div>
                      {participant.muted ? (
                        <MicOff className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Channel Info */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
              <div className="text-white mb-4">Channel Info</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Topic</span>
                  <span className="text-white">Climate Tech</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">London, UK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Proximity</span>
                  <span className="text-white">Within 500m</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Created</span>
                  <span className="text-white">2h ago</span>
                </div>
              </div>
            </div>

            {/* Feature Highlight */}
            <div className="bg-gradient-to-r from-[#FF7A00]/10 to-[#FF9E33]/10 border border-[#FF7A00]/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Radio className="w-5 h-5 text-[#FF7A00] flex-shrink-0" />
                <div>
                  <div className="text-white text-sm mb-1">Proximity Voice</div>
                  <p className="text-xs text-gray-400">
                    Connect with people physically nearby through audio + text. Perfect for spontaneous collaborations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
