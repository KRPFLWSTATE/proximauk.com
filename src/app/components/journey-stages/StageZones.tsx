import { motion } from 'motion/react';
import { Store, MapPin, Users, TrendingUp, Calendar } from 'lucide-react';

export function StageZones() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl text-white mb-6 text-center">Business Zones - Global Map View</h3>
        
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
                <pattern id="mapBlocks" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="70" height="70" fill="#2d3139" />
                  <rect x="85" y="5" width="70" height="70" fill="#252830" />
                  <rect x="5" y="85" width="70" height="70" fill="#252830" />
                  <rect x="85" y="85" width="70" height="70" fill="#2d3139" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapBlocks)" />
            </svg>
            {/* Subtle city landmarks */}
            <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-gray-700/30 rounded-sm" />
            <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gray-700/20 rounded-sm" />
            <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-gray-700/25 rounded-sm" />
            {/* Orange accent roads */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF7A00]/20 to-transparent"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#FF7A00]/20 to-transparent"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </div>
          
          {/* Zone Markers */}
          <div className="absolute inset-0">
            {/* Zone 1 */}
            <motion.div
              className="absolute top-1/4 left-1/3 cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-[#FF7A00]/80 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Store className="w-8 h-8 text-white" />
              </motion.div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-3 py-1 rounded-lg text-white text-xs">
                Starbucks Coffee
              </div>
            </motion.div>

            {/* Zone 2 */}
            <motion.div
              className="absolute top-1/2 left-1/2 cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-[#FF7A00]/80 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Store className="w-8 h-8 text-white" />
              </motion.div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-3 py-1 rounded-lg text-white text-xs">
                Equinox Gym
              </div>
            </motion.div>

            {/* Zone 3 */}
            <motion.div
              className="absolute top-2/3 left-2/3 cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-[#FF7A00]/80 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Store className="w-8 h-8 text-white" />
              </motion.div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-3 py-1 rounded-lg text-white text-xs">
                Pret A Manger
              </div>
            </motion.div>
          </div>

          {/* Info Overlay */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#FF7A00]/30">
              <div className="text-[#FF7A00] text-sm mb-1">Active Zones Nearby</div>
              <div className="text-white text-2xl">3</div>
            </div>
            <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#FF7A00]/30">
              <div className="text-[#FF7A00] text-sm mb-1">Members in Zones</div>
              <div className="text-white text-2xl">47</div>
            </div>
          </div>
        </div>

        {/* Zone Details */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: 'Starbucks Coffee',
              location: 'Shoreditch High Street',
              members: 34,
              distance: '0.3 km',
              nextEvent: 'Morning Networking, 8 AM',
              category: 'Coffee Shop'
            },
            {
              name: 'Equinox Gym',
              location: 'Kings Cross',
              members: 28,
              distance: '0.5 km',
              nextEvent: 'Fitness Meetup, 6 PM',
              category: 'Fitness'
            },
            {
              name: 'Pret A Manger',
              location: 'Camden Town',
              members: 19,
              distance: '0.8 km',
              nextEvent: 'Lunch & Learn, 12:30 PM',
              category: 'Cafe'
            }
          ].map((zone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border border-gray-800 hover:border-[#FF7A00]/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF7A00]/20 flex items-center justify-center">
                  <Store className="w-6 h-6 text-[#FF7A00]" />
                </div>
                <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">{zone.category}</span>
              </div>
              <h4 className="text-white mb-2">{zone.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {zone.location} • {zone.distance}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  {zone.members} active members
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Next event: {zone.nextEvent}
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 text-[#FF7A00] rounded-lg transition-all">
                Join Zone
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-400 text-center mt-6">
          Geofenced business communities visualized on interactive map • Join zones to connect with local professionals
        </p>
      </div>
    </motion.div>
  );
}