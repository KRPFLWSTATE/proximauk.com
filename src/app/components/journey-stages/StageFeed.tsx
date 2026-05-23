import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Search, Brain, MapPin, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export function StageFeed() {
  const [searchMode, setSearchMode] = useState<'browse' | 'search' | 'ai'>('browse');
  const [selectedProfile, setSelectedProfile] = useState(1);

  const profiles = [
    {
      id: 1, name: 'Alex Kumar', location: 'London, UK', distance: '3,450 miles', personality: 'INTJ', match: 94,
      role: 'Climate Tech Engineer', company: 'Octopus Energy',
      tagline: 'Seeking design-minded co-founder for climate tech startup',
      skills: ['Python', 'ML', 'Climate Tech'], interests: ['Climate Science', 'Rock Climbing']
    },
    {
      id: 2, name: 'Emma Rodriguez', location: 'Manchester, UK', distance: '3,511 miles', personality: 'ENFP', match: 89,
      role: 'UX Researcher', company: 'Monzo',
      tagline: 'Creative researcher exploring ethical tech design',
      skills: ['User Research', 'Workshops'], interests: ['Design Ethics', 'Photography']
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          {/* Search Options */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button 
              onClick={() => setSearchMode('browse')}
              className={`p-4 rounded-xl border transition-all ${searchMode === 'browse' ? 'bg-[#FF7A00]/20 border-[#FF7A00]' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-[#FF7A00]" />
              <div className="text-white text-sm">Browse Global</div>
            </button>
            <button 
              onClick={() => setSearchMode('search')}
              className={`p-4 rounded-xl border transition-all ${searchMode === 'search' ? 'bg-[#FF7A00]/20 border-[#FF7A00]' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
            >
              <Search className="w-6 h-6 mx-auto mb-2 text-[#FF7A00]" />
              <div className="text-white text-sm">Search by Name</div>
            </button>
            <button 
              onClick={() => setSearchMode('ai')}
              className={`p-4 rounded-xl border transition-all ${searchMode === 'ai' ? 'bg-[#FF7A00]/20 border-[#FF7A00]' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
            >
              <Brain className="w-6 h-6 mx-auto mb-2 text-[#FF7A00]" />
              <div className="text-white text-sm">Ask AI Sidekick</div>
            </button>
          </div>

          {/* Search Input */}
          {searchMode === 'search' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, company, location..." 
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#FF7A00]/50"
                />
              </div>
            </motion.div>
          )}

          {/* AI Sidekick Input */}
          {searchMode === 'ai' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <div className="bg-gradient-to-r from-[#FF7A00]/10 to-[#FF9E33]/10 border border-[#FF7A00]/30 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Brain className="w-6 h-6 text-[#FF7A00] flex-shrink-0" />
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Ask me anything: 'Find climate tech co-founders in Europe' or 'Show designers interested in sustainability'..." 
                      className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <button className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg hover:bg-[#FF8C1A] transition-colors">
                    Ask
                  </button>
                </div>
                <div className="text-xs text-gray-400">
                  AI Sidekick will search globally and filter by your criteria
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {profiles.map((profile, index) => (
              <motion.div key={profile.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border transition-all cursor-pointer ${selectedProfile === profile.id ? 'border-[#FF7A00] shadow-lg shadow-[#FF7A00]/20' : 'border-gray-800 hover:border-[#FF7A00]/50'}`}
                onClick={() => setSelectedProfile(profile.id)}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-sm flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white">{profile.name}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{profile.distance} away</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{profile.role} at {profile.company}</div>
                    <div className="inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">{profile.personality}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl text-[#FF7A00]">{profile.match}%</span>
                    <span className="text-gray-400 text-sm">Overall Match</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E33]" initial={{ width: 0 }} animate={{ width: `${profile.match}%` }} transition={{ duration: 1 }} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{profile.tagline}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">{skill}</span>
                  ))}
                </div>
                <button className="w-full py-2 bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 text-[#FF7A00] rounded-lg transition-all flex items-center justify-center gap-2">
                  View Full Profile <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#FF7A00]/10 to-[#FF9E33]/10 rounded-2xl p-6 border border-[#FF7A00]/50 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white block">AI Sidekick Analysis</span>
                <span className="text-xs text-gray-400">Scanning 47 global matches</span>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 mb-4">
              <p className="text-gray-300 text-sm mb-3">
                <strong className="text-[#FF7A00]">Top recommendation:</strong> Alex Kumar in London has exceptional alignment with your climate tech goals and complementary skill set.
              </p>
              {[
                'Perfect co-founder match (96% professional)',
                'Complementary INTJ/ENFP dynamic',
                'Shared climate impact values',
                'Remote collaboration compatible'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
