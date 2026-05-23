import { motion } from 'motion/react';
import { Brain, Target, Globe, Search, Radio, Users, Signal, Activity, Settings, Sparkles } from 'lucide-react';

export function StageHome() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Global Journey Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] rounded-2xl p-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-white">Global Connection Journey</span>
          </div>
          <p className="text-white/90 text-sm">
            Watch Sarah find her perfect co-founder match <strong>3,450 miles away</strong> in London
          </p>
        </motion.div>

        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl border-4 border-gray-700">
            <div className="bg-black rounded-[2.5rem] overflow-hidden">
              {/* Status Bar */}
              <div className="bg-gradient-to-b from-gray-900 to-black px-6 py-3 flex justify-between items-center text-xs text-gray-400">
                <span>9:41</span>
                <div className="flex gap-1 items-center">
                  <Signal className="w-3 h-3" />
                  <Activity className="w-3 h-3" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">S</div>
                    <div>
                      <div className="text-white">Sarah Chen</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1"><Brain className="w-3 h-3" />ENFP · Designer</div>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-800 transition-colors"><Settings className="w-5 h-5 text-gray-400" /></button>
                </div>

                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-gradient-to-r from-[#FF7A00]/20 to-[#FF9E33]/20 border border-[#FF7A00]/50 rounded-2xl p-4 mb-4">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-2"><Target className="w-3 h-3" />Currently seeking:</div>
                  <div className="text-white text-sm mb-2">Career opportunities · Worldwide</div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded text-xs">Climate Tech</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Co-founder</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Global Search</span>
                  </div>
                </motion.div>

                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { value: '47', label: 'Global Matches', color: 'text-[#FF7A00]' },
                    { value: '8', label: 'Mutual Interest', color: 'text-green-400' },
                    { value: '94%', label: 'Top Match', color: 'text-blue-400' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <div className={`${stat.color} text-xl`}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="absolute bottom-24 right-6">
                  <div className="relative">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-2 bg-[#FF7A00] rounded-full blur-xl opacity-50" />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Sparkles className="w-7 h-7 text-white" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs animate-pulse">8</div>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Nav */}
                <div className="absolute bottom-6 left-6 right-6 bg-gray-900/80 backdrop-blur-lg rounded-2xl p-3">
                  <div className="flex justify-around items-center">
                    {[
                      { icon: Globe, label: 'Global', active: true },
                      { icon: Search, label: 'Search', active: false },
                      { icon: Brain, label: 'Sidekick', active: false },
                      { icon: Radio, label: 'Nearby', active: false },
                      { icon: Users, label: 'Profile', active: false }
                    ].map((nav, i) => {
                      const Icon = nav.icon;
                      return (
                        <button key={i} className={`flex flex-col items-center gap-1 ${nav.active ? 'text-[#FF7A00]' : 'text-gray-500 hover:text-gray-300'}`}>
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{nav.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-br from-[#FF7A00]/20 to-[#FF9E33]/20 rounded-[4rem] blur-2xl -z-10" />
        </div>
      </div>
    </motion.div>
  );
}
