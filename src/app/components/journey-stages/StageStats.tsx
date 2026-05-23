import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Link2, Target, Rocket, MapPin, Briefcase, GraduationCap, Award, Code, Palette, Users2, TrendingUp, BarChart3, Building, Zap } from 'lucide-react';

export function StageStats() {
  const [activeSection, setActiveSection] = useState<'overview' | 'collab' | 'alignment'>('overview');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-sm" />
            <div>
              <h3 className="text-2xl text-white mb-1">Alex Kumar - Full Profile</h3>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                London, UK • INTJ • Climate Tech Engineer
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl text-[#FF7A00] mb-1">94%</div>
            <div className="text-xs text-gray-500">Co-founder Match</div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6 border-b border-gray-800">
          {[
            { id: 'overview', label: 'Full Overview', icon: Eye },
            { id: 'collab', label: 'Collaboration Opportunities', icon: Link2 },
            { id: 'alignment', label: 'Deep Alignment', icon: Target }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-all ${
                  activeSection === tab.id 
                    ? 'border-[#FF7A00] text-[#FF7A00]' 
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Experience */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-5 h-5 text-[#FF7A00]" />
                  <h4 className="text-white text-lg">Professional Experience</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Senior ML Engineer', company: 'Octopus Energy', period: '2021 - Present', desc: 'Building predictive models for renewable energy optimization' },
                    { title: 'ML Researcher', company: 'DeepMind', period: '2018 - 2021', desc: 'Research on climate modeling and prediction systems' }
                  ].map((exp, i) => (
                    <div key={i} className="border-l-2 border-[#FF7A00]/30 pl-4">
                      <div className="text-white">{exp.title}</div>
                      <div className="text-sm text-gray-400">{exp.company} • {exp.period}</div>
                      <p className="text-xs text-gray-500 mt-1">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Skills */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-5 h-5 text-[#FF7A00]" />
                    <h4 className="text-white text-lg">Education</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-white">PhD, Computer Science</div>
                      <div className="text-sm text-gray-400">MIT • 2018</div>
                    </div>
                    <div>
                      <div className="text-white">MS, Artificial Intelligence</div>
                      <div className="text-sm text-gray-400">Stanford • 2014</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-5 h-5 text-[#FF7A00]" />
                    <h4 className="text-white text-lg">Technical Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'TensorFlow', 'PyTorch', 'Kubernetes', 'Climate Modeling', 'Time Series Analysis'].map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded-full text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeSection === 'collab' && (
            <motion.div key="collab" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Co-Founder Potential',
                    score: 98,
                    icon: Rocket,
                    opportunities: [
                      'Alex brings technical depth in ML/AI while Sarah provides design & UX expertise',
                      'Complementary skill sets create complete founding team',
                      'Both have 5+ years senior IC experience, ready for leadership',
                      'Proven track record at top-tier companies (Octopus Energy, DeepMind)'
                    ]
                  },
                  {
                    title: 'Climate Tech Venture',
                    score: 96,
                    icon: TrendingUp,
                    opportunities: [
                      'Alex\'s energy prediction models + Sarah\'s circular design = powerful combo',
                      'Both passionate about climate impact over profit maximization',
                      'Network overlap in UK climate tech ecosystem',
                      'Complementary technical + design approach to sustainability'
                    ]
                  },
                  {
                    title: 'Advisory/Mentorship',
                    score: 91,
                    icon: Users2,
                    opportunities: [
                      'Alex could advise on ML integration in design tools',
                      'Sarah could guide on human-centered climate solutions',
                      'Mutual learning in complementary domains',
                      'Both interested in teaching and knowledge sharing'
                    ]
                  },
                  {
                    title: 'Project Collaboration',
                    score: 94,
                    icon: Zap,
                    opportunities: [
                      'Hackathon partnership on climate tech solutions',
                      'Joint research on sustainable tech design',
                      'Open-source contributions to climate tools',
                      'Speaking engagements at climate tech conferences'
                    ]
                  }
                ].map((opp, i) => {
                  const Icon = opp.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border border-gray-800"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#FF7A00]" />
                          </div>
                          <h4 className="text-white">{opp.title}</h4>
                        </div>
                        <span className="text-2xl text-[#FF7A00]">{opp.score}%</span>
                      </div>
                      <div className="space-y-2">
                        {opp.opportunities.map((item, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <Rocket className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeSection === 'alignment' && (
            <motion.div key="alignment" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Career Goals', value: 95, color: 'from-blue-500 to-cyan-600' },
                  { label: 'Work Style', value: 92, color: 'from-purple-500 to-pink-600' },
                  { label: 'Values Alignment', value: 98, color: 'from-green-500 to-emerald-600' },
                  { label: 'Communication', value: 91, color: 'from-orange-500 to-red-600' },
                  { label: 'Innovation Drive', value: 94, color: 'from-yellow-500 to-orange-600' },
                  { label: 'Team Dynamics', value: 89, color: 'from-indigo-500 to-purple-600' }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border border-gray-800"
                  >
                    <div className="text-center">
                      <div className="text-4xl text-[#FF7A00] mb-2">{metric.value}%</div>
                      <div className="text-sm text-gray-400 mb-3">{metric.label}</div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full bg-gradient-to-r ${metric.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
