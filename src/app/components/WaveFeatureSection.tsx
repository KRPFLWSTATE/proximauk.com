import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Briefcase, Users, Lock, Check, X, Sparkles, Search, MapPin, Eye, EyeOff, Zap, Shield, UserPlus, ArrowRight, Radio, MessageSquare } from 'lucide-react';

const waveTypes = [
  {
    id: 'romantic',
    name: 'Romantic',
    icon: Heart,
    color: '#ec4899',
    rgb: '236,72,153',
    gradient: 'from-pink-500 via-rose-500 to-pink-600',
    description: 'Express romantic interest with confidence and privacy',
    emoji: '💕',
    example: 'Coffee date?'
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    color: '#3b82f6',
    rgb: '59,130,246',
    gradient: 'from-blue-500 via-indigo-500 to-blue-600',
    description: 'Network and collaborate without pressure',
    emoji: '💼',
    example: 'Let\'s connect!'
  },
  {
    id: 'friendly',
    name: 'Friendly',
    icon: Users,
    color: '#10b981',
    rgb: '16,185,129',
    gradient: 'from-emerald-500 via-green-500 to-emerald-600',
    description: 'Make new friends in your area',
    emoji: '🤝',
    example: 'Wanna hang?'
  }
];

export function WaveFeatureSection() {
  const [selectedWave, setSelectedWave] = useState('romantic');
  const [isMatched, setIsMatched] = useState(false);
  const [showProximity, setShowProximity] = useState(true);
  const [animateWave, setAnimateWave] = useState(false);
  const [user1Sent, setUser1Sent] = useState(false);
  const [user2Sent, setUser2Sent] = useState(false);

  const currentWave = waveTypes.find(w => w.id === selectedWave) || waveTypes[0];

  const sendWave = () => {
    setAnimateWave(true);
    setUser1Sent(true);
    setTimeout(() => setAnimateWave(false), 1000);
  };

  const reciprocate = () => {
    setUser2Sent(true);
    setTimeout(() => {
      setIsMatched(true);
    }, 800);
  };

  const resetDemo = () => {
    setUser1Sent(false);
    setUser2Sent(false);
    setIsMatched(false);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF7A00]/5 via-black to-black" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,122,0,0.03) 2px, rgba(255,122,0,0.03) 4px)',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 40px']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF8C1A]/20 border border-[#FF7A00]/50 rounded-full mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,122,0,0.3)',
                '0 0 30px rgba(255,122,0,0.5)',
                '0 0 20px rgba(255,122,0,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#FF7A00]" />
            <span className="text-[#FF7A00] uppercase tracking-wider text-sm">Connection Made Simple</span>
            <Sparkles className="w-4 h-4 text-[#FF7A00]" />
          </motion.div>

          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">
            Waves: The Pressure-Free Way to Connect
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 max-w-4xl mx-auto text-lg mb-2">
            Three types of waves. One simple gesture. Zero pressure. Express your intent—romantic, professional, or friendly—and only connect when both parties reciprocate. Your privacy is protected until mutual interest is confirmed.
          </p>
        </motion.div>

        {/* Wave Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {waveTypes.map((wave, i) => {
              const Icon = wave.icon;
              const isSelected = selectedWave === wave.id;
              
              return (
                <motion.button
                  key={wave.id}
                  onClick={() => {
                    setSelectedWave(wave.id);
                    resetDemo();
                  }}
                  className={`relative p-6 rounded-2xl border-2 backdrop-blur-md transition-all ${
                    isSelected
                      ? 'border-[#FF7A00] bg-[#FF7A00]/10'
                      : 'border-gray-800 bg-gray-900/40 hover:border-gray-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  style={isSelected ? {
                    boxShadow: `0 0 40px rgba(${wave.rgb}, 0.4), inset 0 0 30px rgba(${wave.rgb}, 0.1)`
                  } : {}}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${wave.gradient} flex items-center justify-center`}
                    animate={isSelected ? {
                      boxShadow: [
                        `0 0 20px rgba(${wave.rgb}, 0.6)`,
                        `0 0 35px rgba(${wave.rgb}, 0.8)`,
                        `0 0 20px rgba(${wave.rgb}, 0.6)`
                      ],
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-white font-semibold text-xl mb-2">{wave.name}</h3>
                  <p className="text-gray-400 text-sm">{wave.description}</p>

                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(${wave.rgb}, 0.1), transparent 70%)`
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Demo: Reciprocal Matching */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl md:text-3xl mb-3">How Reciprocal Matching Works</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Privacy protected until mutual interest is confirmed. Try the interactive demo below.
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-gray-900/60 to-black/80 border-2 border-[#FF7A00]/30 rounded-3xl p-6 md:p-10 backdrop-blur-md"
            style={{
              boxShadow: '0 0 60px rgba(255,122,0,0.2), inset 0 0 40px rgba(255,122,0,0.05)'
            }}
          >
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10 rounded-3xl overflow-hidden">
              <motion.div
                className="w-full h-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, ${currentWave.color} 0px, transparent 1px, transparent 15px), repeating-linear-gradient(90deg, ${currentWave.color} 0px, transparent 1px, transparent 15px)`,
                  backgroundSize: '15px 15px'
                }}
                animate={{ backgroundPosition: ['0px 0px', '15px 15px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              {/* User 1 */}
              <motion.div
                className="relative"
                animate={user1Sent && !isMatched ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-3xl">
                        👤
                      </div>
                      {user1Sent && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ backgroundColor: currentWave.color }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <h4 className="text-white font-semibold mb-2">You</h4>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-500 text-sm">Profile Hidden</span>
                    </div>

                    <motion.button
                      onClick={sendWave}
                      disabled={user1Sent}
                      className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${
                        user1Sent
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : `bg-gradient-to-r ${currentWave.gradient} text-white hover:scale-105`
                      }`}
                      whileHover={!user1Sent ? { scale: 1.05 } : {}}
                      whileTap={!user1Sent ? { scale: 0.95 } : {}}
                      style={!user1Sent ? {
                        boxShadow: `0 0 20px rgba(${currentWave.rgb}, 0.5)`
                      } : {}}
                    >
                      {user1Sent ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" />
                          Wave Sent
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {currentWave.emoji} Send {currentWave.name} Wave
                        </span>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Wave Animation */}
              <div className="relative h-32 flex items-center justify-center">
                <AnimatePresence>
                  {animateWave && (
                    <motion.div
                      className="absolute"
                      initial={{ x: -100, opacity: 0, scale: 0.5 }}
                      animate={{ x: 100, opacity: [0, 1, 1, 0], scale: [0.5, 1.5, 1.5, 0.5] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <div 
                        className="text-6xl filter drop-shadow-lg"
                        style={{
                          filter: `drop-shadow(0 0 20px ${currentWave.color})`
                        }}
                      >
                        {currentWave.emoji}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {user1Sent && !user2Sent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-gray-700 border-t-[#FF7A00] rounded-full mx-auto mb-2"
                    />
                    <p className="text-gray-500 text-sm">Waiting for response...</p>
                  </motion.div>
                )}

                {isMatched && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-center"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: currentWave.color }}
                      animate={{
                        boxShadow: [
                          `0 0 30px rgba(${currentWave.rgb}, 0.8)`,
                          `0 0 50px rgba(${currentWave.rgb}, 1)`,
                          `0 0 30px rgba(${currentWave.rgb}, 0.8)`
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <p className="text-white font-semibold text-lg">It's a Match!</p>
                    <p className="text-gray-400 text-sm">Profiles now visible</p>
                  </motion.div>
                )}

                {!user1Sent && (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center border-2 border-dashed border-gray-700">
                      <ArrowRight className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-gray-600 text-sm">Send a wave to start</p>
                  </div>
                )}
              </div>

              {/* User 2 */}
              <motion.div
                className="relative"
                animate={user2Sent && !isMatched ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 rounded-2xl p-6 text-center transition-all ${
                    isMatched ? 'border-green-500' : user1Sent ? 'border-[#FF7A00]' : 'border-gray-700'
                  }`}
                  style={user1Sent && !isMatched ? {
                    boxShadow: `0 0 30px rgba(255,122,0,0.4)`
                  } : {}}
                  >
                    <div className="relative inline-block mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-3xl">
                        {isMatched ? '😊' : '👤'}
                      </div>
                      {user1Sent && !isMatched && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          style={{ backgroundColor: currentWave.color }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            {currentWave.emoji}
                          </motion.div>
                        </motion.div>
                      )}
                      {user2Sent && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ backgroundColor: currentWave.color }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    
                    <h4 className="text-white font-semibold mb-2">
                      {isMatched ? 'Sarah M.' : 'Other User'}
                    </h4>
                    
                    {isMatched ? (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Profile Unlocked</span>
                        </div>
                        <p className="text-gray-400 text-sm">Software Engineer • Coffee lover</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-500 text-sm">Profile Hidden</span>
                      </div>
                    )}

                    {user1Sent && !user2Sent ? (
                      <div className="space-y-2">
                        <motion.button
                          onClick={reciprocate}
                          className={`w-full px-4 py-3 rounded-xl font-medium bg-gradient-to-r ${currentWave.gradient} text-white`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            boxShadow: `0 0 20px rgba(${currentWave.rgb}, 0.5)`
                          }}
                          animate={{
                            boxShadow: [
                              `0 0 20px rgba(${currentWave.rgb}, 0.5)`,
                              `0 0 35px rgba(${currentWave.rgb}, 0.8)`,
                              `0 0 20px rgba(${currentWave.rgb}, 0.5)`
                            ]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" />
                            Wave Back
                          </span>
                        </motion.button>
                        <button
                          onClick={resetDemo}
                          className="w-full px-4 py-2 rounded-xl font-medium bg-gray-700 text-gray-400 hover:bg-gray-600"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <X className="w-4 h-4" />
                            Decline
                          </span>
                        </button>
                      </div>
                    ) : user2Sent && !isMatched ? (
                      <div className="bg-gray-700 px-4 py-3 rounded-xl text-gray-400">
                        Wave sent back...
                      </div>
                    ) : isMatched ? (
                      <motion.button
                        className="w-full px-4 py-3 rounded-xl font-medium bg-green-600 text-white"
                        whileHover={{ scale: 1.05 }}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Start Chatting
                        </span>
                      </motion.button>
                    ) : (
                      <div className="bg-gray-800 px-4 py-3 rounded-xl text-gray-600">
                        Waiting for wave...
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Reset button */}
            {(user1Sent || user2Sent || isMatched) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <button
                  onClick={resetDemo}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg text-sm transition-all"
                >
                  Reset Demo
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Proximity vs Search-Based Waves */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl md:text-3xl mb-3">Two Ways to Send Waves</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Connect with people nearby or discover new connections across the platform
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-900 border-2 border-gray-800 rounded-full p-1">
              <button
                onClick={() => setShowProximity(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  showProximity
                    ? 'bg-[#FF7A00] text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Proximity
              </button>
              <button
                onClick={() => setShowProximity(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !showProximity
                    ? 'bg-[#FF7A00] text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Search
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {showProximity ? (
                <motion.div
                  key="proximity"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#FF7A00]/10 to-orange-900/10 border-2 border-[#FF7A00]/30 rounded-2xl p-6 backdrop-blur-md"
                  style={{
                    boxShadow: '0 0 40px rgba(255,122,0,0.2)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-orange-600 rounded-xl flex items-center justify-center">
                      <Radio className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Proximity-Based</h4>
                      <p className="text-orange-400 text-sm">People around you</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    See users within your zone or nearby locations. Perfect for spontaneous connections and real-world interactions.
                  </p>

                  {/* Proximity visualization */}
                  <div className="relative h-64 bg-black/40 rounded-xl border border-[#FF7A00]/20 overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 250">
                      {/* You in center */}
                      <motion.circle
                        cx="150"
                        cy="125"
                        r="8"
                        fill="#FF7A00"
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(255,122,0,0.6)',
                            '0 0 20px rgba(255,122,0,1)',
                            '0 0 10px rgba(255,122,0,0.6)'
                          ]
                        }}
                      />
                      <text x="150" y="145" textAnchor="middle" fill="white" fontSize="10">You</text>

                      {/* Proximity circle */}
                      <motion.circle
                        cx="150"
                        cy="125"
                        r="80"
                        fill="none"
                        stroke="#FF7A00"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: '150px 125px' }}
                      />

                      {/* Nearby users */}
                      {[
                        { x: 100, y: 80, color: '#ec4899', emoji: '💕' },
                        { x: 190, y: 90, color: '#3b82f6', emoji: '💼' },
                        { x: 120, y: 160, color: '#10b981', emoji: '🤝' },
                        { x: 200, y: 150, color: '#ec4899', emoji: '💕' }
                      ].map((user, i) => (
                        <motion.g key={i}>
                          <motion.circle
                            cx={user.x}
                            cy={user.y}
                            r="6"
                            fill={user.color}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                          />
                          <motion.text
                            x={user.x}
                            y={user.y - 12}
                            textAnchor="middle"
                            fontSize="14"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                          >
                            {user.emoji}
                          </motion.text>
                          
                          {/* Connecting line animation */}
                          <motion.line
                            x1="150"
                            y1="125"
                            x2={user.x}
                            y2={user.y}
                            stroke={user.color}
                            strokeWidth="1"
                            strokeDasharray="2 2"
                            opacity="0"
                            animate={{
                              opacity: [0, 0.5, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5
                            }}
                          />
                        </motion.g>
                      ))}
                    </svg>

                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 border border-[#FF7A00]/30 rounded-lg p-2 backdrop-blur-sm">
                      <p className="text-xs text-gray-400">
                        <MapPin className="w-3 h-3 inline mr-1 text-[#FF7A00]" />
                        4 compatible people within 20m
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="w-4 h-4 text-[#FF7A00]" />
                      Instant, real-world connections
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-[#FF7A00]" />
                      Location-verified users
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-blue-500/10 to-indigo-900/10 border-2 border-blue-500/30 rounded-2xl p-6 backdrop-blur-md"
                  style={{
                    boxShadow: '0 0 40px rgba(59,130,246,0.2)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Search & Discover</h4>
                      <p className="text-blue-400 text-sm">Platform-wide</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    Browse profiles across the entire platform. Filter by interests, profession, location, and more—just like social media.
                  </p>

                  {/* Search visualization */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search by name, interests, profession..."
                        className="w-full bg-black/60 border border-blue-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Search results */}
                    <div className="space-y-2">
                      {[
                        { name: 'Alex Chen', role: 'Product Designer', interests: 'Design, Coffee', color: '#3b82f6', emoji: '💼' },
                        { name: 'Emma Wilson', role: 'Marketing Lead', interests: 'Branding, Travel', color: '#10b981', emoji: '🤝' },
                        { name: 'Sarah Park', role: 'Software Engineer', interests: 'Tech, Gaming', color: '#ec4899', emoji: '💕' }
                      ].map((person, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-black/40 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all cursor-pointer group"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${person.color}40`, border: `2px solid ${person.color}` }}
                          >
                            {person.emoji}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-medium text-sm">{person.name}</h5>
                            <p className="text-gray-500 text-xs">{person.role}</p>
                            <p className="text-gray-600 text-xs">{person.interests}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 rounded-lg text-sm font-medium"
                            style={{ backgroundColor: person.color, color: 'white' }}
                          >
                            Wave {person.emoji}
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <UserPlus className="w-4 h-4 text-blue-400" />
                      Expand your network globally
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-blue-400" />
                      Privacy-protected matching
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Benefits Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Shield,
                  title: 'Privacy First',
                  desc: 'Full details remain hidden until both parties reciprocate. No awkward rejections.',
                  color: '#10b981'
                },
                {
                  icon: Zap,
                  title: 'Instant Icebreaker',
                  desc: 'Skip the anxiety. Express intent clearly and move forward with confidence.',
                  color: '#f59e0b'
                },
                {
                  icon: Lock,
                  title: 'No Pressure Zone',
                  desc: 'Decline without notification. The other person never knows if you didn\'t reciprocate.',
                  color: '#ec4899'
                },
                {
                  icon: Eye,
                  title: 'Mutual Interest Only',
                  desc: 'Profiles unlock only when both users wave back. Zero one-sided visibility.',
                  color: '#3b82f6'
                }
              ].map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-gray-800 rounded-xl p-5 backdrop-blur-sm hover:border-[#FF7A00]/50 transition-all group"
                    whileHover={{ x: 5, boxShadow: '0 0 30px rgba(255,122,0,0.2)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${benefit.color}20`, border: `2px solid ${benefit.color}40` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: benefit.color }} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Future Expansion Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-2 border-purple-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-md overflow-hidden"
            style={{
              boxShadow: '0 0 60px rgba(168,85,247,0.2)'
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(168,85,247,0.3) 50%, transparent 60%)',
                backgroundSize: '200% 200%'
              }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-white text-2xl md:text-3xl mb-4 font-semibold">
                More Wave Types Coming Soon
              </h3>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                We're actively developing additional wave categories to cover more connection scenarios—from study partners to workout buddies, creative collaborators to event companions.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {['🎓 Study', '💪 Fitness', '🎨 Creative', '🎵 Music', '🍕 Food', '✈️ Travel'].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-300 text-sm backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: 'rgba(168,85,247,0.3)',
                      borderColor: 'rgba(168,85,247,0.6)'
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-6">
                The wave system is designed to evolve with our community's needs
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}