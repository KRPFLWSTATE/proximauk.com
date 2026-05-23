import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, TrendingUp, Users, Network, Target, Award, 
  Zap, Lightbulb, Rocket, Link2, Star, CheckCircle 
} from 'lucide-react';

interface NetworkNode {
  id: number;
  name: string;
  role: string;
  strength: number;
  x: number;
  y: number;
  connections: number[];
  category: 'founder' | 'investor' | 'mentor' | 'peer' | 'partner';
}

export function ProfessionalMode() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [networkValue, setNetworkValue] = useState(68);

  // Simulate network value growth
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkValue(prev => Math.min(95, prev + Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes: NetworkNode[] = [
    { id: 1, name: 'You', role: 'Product Lead', strength: 100, x: 200, y: 150, connections: [2, 3, 4, 5, 6], category: 'founder' },
    { id: 2, name: 'Sarah', role: 'VC Partner', strength: 92, x: 120, y: 80, connections: [1, 3, 7], category: 'investor' },
    { id: 3, name: 'James', role: 'Founder', strength: 88, x: 280, y: 90, connections: [1, 2, 4], category: 'peer' },
    { id: 4, name: 'Alex', role: 'Advisor', strength: 85, x: 320, y: 180, connections: [1, 3, 5], category: 'mentor' },
    { id: 5, name: 'Emma', role: 'Designer', strength: 78, x: 260, y: 240, connections: [1, 4, 6], category: 'partner' },
    { id: 6, name: 'Marcus', role: 'Engineer', strength: 82, x: 140, y: 230, connections: [1, 5, 7], category: 'partner' },
    { id: 7, name: 'Priya', role: 'Marketing', strength: 75, x: 80, y: 170, connections: [2, 6], category: 'peer' },
  ];

  const getCategoryColor = (category: NetworkNode['category']) => {
    switch (category) {
      case 'founder': return '#FF7A00';
      case 'investor': return '#3b82f6';
      case 'mentor': return '#8b5cf6';
      case 'peer': return '#10b981';
      case 'partner': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const milestones = [
    { id: 1, title: 'First Customer', date: 'Q1 2024', achieved: true, impact: 'high' },
    { id: 2, title: 'Seed Round', date: 'Q2 2024', achieved: true, impact: 'high' },
    { id: 3, title: 'Team of 10', date: 'Q3 2024', achieved: true, impact: 'medium' },
    { id: 4, title: 'Series A', date: 'Q4 2024', achieved: false, impact: 'high' },
    { id: 5, title: 'Launch v2.0', date: 'Q1 2025', achieved: false, impact: 'medium' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Network Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-3xl border border-blue-500/30 p-6 md:p-8 overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl text-white mb-6 text-center">Your Professional Network</h3>
          
          {/* Network Graph */}
          <div className="relative h-80 bg-black/40 rounded-2xl border border-gray-800 overflow-hidden mb-6">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              {/* Connections */}
              {nodes.map(node => 
                node.connections.map(targetId => {
                  const target = nodes.find(n => n.id === targetId);
                  if (!target || targetId < node.id) return null;
                  
                  return (
                    <motion.line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={activeNode === node.id || activeNode === targetId ? getCategoryColor(node.category) : '#374151'}
                      strokeWidth={activeNode === node.id || activeNode === targetId ? 2 : 1}
                      strokeOpacity={activeNode === node.id || activeNode === targetId ? 0.6 : 0.3}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  );
                })
              )}

              {/* Nodes */}
              {nodes.map((node, index) => (
                <g key={node.id}>
                  {/* Glow */}
                  {(activeNode === node.id || activeNode === null) && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.id === 1 ? 20 : 15}
                      fill={getCategoryColor(node.category)}
                      opacity={0.2}
                      animate={{ 
                        r: [node.id === 1 ? 20 : 15, node.id === 1 ? 28 : 23, node.id === 1 ? 20 : 15],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                  )}
                  
                  {/* Node circle */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.id === 1 ? 12 : 8}
                    fill={getCategoryColor(node.category)}
                    stroke="white"
                    strokeWidth={node.id === 1 ? 3 : 2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: 'spring' }}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                  />

                  {/* Label */}
                  {(activeNode === node.id || node.id === 1) && (
                    <motion.g
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <rect
                        x={node.x - 35}
                        y={node.y - 40}
                        width="70"
                        height="28"
                        rx="4"
                        fill="rgba(0, 0, 0, 0.9)"
                        stroke={getCategoryColor(node.category)}
                        strokeWidth="1"
                      />
                      <text
                        x={node.x}
                        y={node.y - 30}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {node.name}
                      </text>
                      <text
                        x={node.x}
                        y={node.y - 20}
                        textAnchor="middle"
                        fill="#9ca3af"
                        fontSize="8"
                      >
                        {node.role}
                      </text>
                    </motion.g>
                  )}
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                {['founder', 'investor', 'mentor', 'peer', 'partner'].map(cat => (
                  <div key={cat} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getCategoryColor(cat as NetworkNode['category']) }}
                    />
                    <span className="text-gray-400 capitalize">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30"
            >
              <div className="text-blue-400 text-xs mb-1">Total Connections</div>
              <div className="text-2xl text-white">{nodes.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-500/10 rounded-xl p-4 border border-green-500/30"
            >
              <div className="text-green-400 text-xs mb-1">Active This Week</div>
              <div className="text-2xl text-white">12</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30"
            >
              <div className="text-purple-400 text-xs mb-1">Intros Made</div>
              <div className="text-2xl text-white">28</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30"
            >
              <div className="text-orange-400 text-xs mb-1">Network Value</div>
              <div className="text-2xl text-white">{Math.round(networkValue)}%</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Career Path Nodes */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white">Career Milestones</h4>
              <p className="text-xs text-gray-400">Your professional journey</p>
            </div>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative"
              >
                <div className={`
                  flex items-center gap-4 p-4 rounded-xl border transition-all
                  ${milestone.achieved 
                    ? 'bg-cyan-500/10 border-cyan-500/50' 
                    : 'bg-gray-900/50 border-gray-800'
                  }
                `}>
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${milestone.achieved ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-500'}
                  `}>
                    {milestone.achieved ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`text-sm mb-1 ${milestone.achieved ? 'text-white' : 'text-gray-400'}`}>
                      {milestone.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{milestone.date}</span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${milestone.impact === 'high' 
                          ? 'bg-orange-500/20 text-orange-400' 
                          : 'bg-blue-500/20 text-blue-400'
                        }
                      `}>
                        {milestone.impact} impact
                      </span>
                    </div>
                  </div>

                  {milestone.achieved && (
                    <Award className="w-5 h-5 text-cyan-400" />
                  )}
                </div>

                {/* Connector line */}
                {index < milestones.length - 1 && (
                  <div className={`
                    absolute left-9 top-full w-0.5 h-4
                    ${milestone.achieved ? 'bg-cyan-500/50' : 'bg-gray-800'}
                  `} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white">AI Recommendations</h4>
              <p className="text-xs text-gray-400">Grow your network</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { 
                name: 'Connect with Lisa Chen',
                reason: 'Founder at competing startup - potential collaboration',
                action: 'Send Coffee Invite',
                priority: 'high'
              },
              {
                name: 'Attend TechCrunch Meetup',
                reason: '3 investors from your target list attending',
                action: 'RSVP Now',
                priority: 'high'
              },
              {
                name: 'Follow up with David Park',
                reason: 'Last interaction 2 weeks ago - maintain warmth',
                action: 'Send Message',
                priority: 'medium'
              },
              {
                name: 'Introduction Request',
                reason: 'Sarah can intro you to Sequoia partner',
                action: 'Request Intro',
                priority: 'high'
              }
            ].map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-white text-sm mb-1">{rec.name}</div>
                    <div className="text-xs text-gray-400">{rec.reason}</div>
                  </div>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${rec.priority === 'high' 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'bg-blue-500/20 text-blue-400'
                    }
                  `}>
                    {rec.priority}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm transition-all"
                >
                  {rec.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Network Growth Trend */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl text-white mb-1">Network Growth</h4>
            <p className="text-sm text-gray-400">Last 6 months</p>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-2xl">+47%</span>
          </div>
        </div>

        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 600 150" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="0"
                y1={30 * i}
                x2="600"
                y2={30 * i}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
              />
            ))}

            {/* Growth line */}
            <motion.path
              d="M0,120 L100,110 L200,95 L300,85 L400,65 L500,50 L600,30"
              stroke="url(#growthGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />

            {/* Area under curve */}
            <motion.path
              d="M0,120 L100,110 L200,95 L300,85 L400,65 L500,50 L600,30 L600,150 L0,150 Z"
              fill="url(#growthAreaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />

            {/* Data points */}
            {[0, 100, 200, 300, 400, 500, 600].map((x, i) => {
              const y = [120, 110, 95, 85, 65, 50, 30][i];
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                />
              );
            })}

            <defs>
              <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="growthAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f633" />
                <stop offset="100%" stopColor="#3b82f600" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-gray-400 text-xs mb-1">Jan</div>
            <div className="text-white">28</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-xs mb-1">Mar</div>
            <div className="text-white">35</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-xs mb-1">Jun</div>
            <div className="text-white text-lg text-green-400">47</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
