import { motion } from 'motion/react';
import { MapPin, Heart, MessageCircle, Eye, Clock } from 'lucide-react';

export function StageReflections() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl text-white mb-6 text-center">Proximity Reflections - Location-Based Stories</h3>
        
        {/* Map Visualization */}
        <div className="relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 mb-6" style={{ height: '400px' }}>
          {/* Realistic Map Background */}
          <div className="absolute inset-0 bg-[#1a1d24]">
            {/* Grid pattern to simulate streets */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #2a2e38 1px, transparent 1px),
                  linear-gradient(to bottom, #2a2e38 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
            {/* Major roads */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #3a3e48 2px, transparent 2px),
                  linear-gradient(to bottom, #3a3e48 2px, transparent 2px)
                `,
                backgroundSize: '240px 240px'
              }}
            />
            {/* Map blocks with variation */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="reflectionMapBlocks" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="70" height="70" fill="#2d3139" />
                  <rect x="85" y="5" width="70" height="70" fill="#252830" />
                  <rect x="5" y="85" width="70" height="70" fill="#252830" />
                  <rect x="85" y="85" width="70" height="70" fill="#2d3139" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#reflectionMapBlocks)" />
            </svg>
            {/* Subtle parks/green spaces */}
            <div className="absolute top-[20%] left-[30%] w-20 h-16 bg-green-900/20 rounded-lg" />
            <div className="absolute bottom-[25%] right-[20%] w-16 h-16 bg-green-900/15 rounded-full" />
            {/* Water features */}
            <div className="absolute top-[60%] left-[15%] w-32 h-2 bg-blue-900/20 rounded-full" />
            {/* Orange accent roads - curved paths */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <path 
                d="M 0,200 Q 200,180 400,200 T 800,200" 
                stroke="#FF7A00" 
                strokeWidth="1" 
                fill="none"
                opacity="0.3"
              />
              <path 
                d="M 400,0 Q 380,200 400,400" 
                stroke="#FF7A00" 
                strokeWidth="1" 
                fill="none"
                opacity="0.3"
              />
            </svg>
          </div>
          
          {/* Reflection Pins */}
          <div className="absolute inset-0">
            {[
              { top: '30%', left: '25%', color: 'from-purple-500 to-pink-500', delay: 0 },
              { top: '45%', left: '50%', color: 'from-blue-500 to-cyan-500', delay: 0.2 },
              { top: '60%', left: '35%', color: 'from-green-500 to-emerald-500', delay: 0.4 },
              { top: '35%', left: '65%', color: 'from-orange-500 to-red-500', delay: 0.6 },
              { top: '55%', left: '70%', color: 'from-yellow-500 to-orange-500', delay: 0.8 }
            ].map((pin, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{ top: pin.top, left: pin.left }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: pin.delay, type: 'spring' }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${pin.color} border-2 border-white shadow-lg`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: pin.delay }}
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-white to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Info Overlay */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#FF7A00]/30">
              <div className="text-[#FF7A00] text-sm mb-1">Reflections Nearby</div>
              <div className="text-white text-2xl">12</div>
            </div>
            <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#FF7A00]/30">
              <div className="text-[#FF7A00] text-sm mb-1">Within Radius</div>
              <div className="text-white text-2xl">500m</div>
            </div>
          </div>
        </div>

        {/* Reflection Feed */}
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              user: 'Sarah Chen',
              location: 'Coffee Shop, Shoreditch',
              distance: '50m',
              time: '2 hours ago',
              text: 'Just had the most inspiring conversation about circular design! This cafe is perfect for climate tech discussions ☕🌱',
              likes: 12,
              comments: 3,
              color: 'from-purple-500 to-pink-500'
            },
            {
              user: 'Alex Kumar',
              location: 'Tech Hub, Kings Cross',
              distance: '120m',
              time: '5 hours ago',
              text: 'Finally cracked the energy prediction model! Sometimes you need to step away from the screen and walk around.',
              likes: 24,
              comments: 7,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              user: 'Emma Rodriguez',
              location: 'Park Bench, Camden',
              distance: '280m',
              time: '1 day ago',
              text: 'Best thinking spot in London. If you\'re stuck on a problem, come here and watch the world go by.',
              likes: 18,
              comments: 5,
              color: 'from-green-500 to-emerald-500'
            },
            {
              user: 'Marcus Johnson',
              location: 'Library, Bloomsbury',
              distance: '450m',
              time: '2 days ago',
              text: 'Found an incredible book on sustainable architecture. Leaving it here for the next person who needs inspiration 📚',
              likes: 31,
              comments: 9,
              color: 'from-orange-500 to-red-500'
            }
          ].map((reflection, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border border-gray-800 hover:border-[#FF7A00]/50 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${reflection.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {reflection.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-white mb-1">{reflection.user}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {reflection.location} • {reflection.distance} away
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {reflection.time}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{reflection.text}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF7A00] transition-colors">
                  <Heart className="w-4 h-4" />
                  {reflection.likes}
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF7A00] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {reflection.comments}
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-[#FF7A00] transition-colors ml-auto">
                  <Eye className="w-4 h-4" />
                  View on Map
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-400 text-center mt-6">
          Location-based micro-content pinned to real-world places • Discover stories and insights from your neighborhood
        </p>
      </div>
    </motion.div>
  );
}