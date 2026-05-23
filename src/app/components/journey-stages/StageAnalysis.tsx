import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

export function StageAnalysis() {
  const [activeCategory, setActiveCategory] = useState<'professional' | 'personality' | 'values' | 'communication' | 'lifestyle' | 'goals'>('professional');

  const metrics = {
    professional: {
      overall: 96,
      tailoredTo: 'Sarah (Designer) → Alex (Engineer)',
      breakdown: [
        { label: 'Skill Complementarity', value: 98, insight: 'Sarah\'s design expertise perfectly complements Alex\'s technical skills' },
        { label: 'Career Stage Alignment', value: 96, insight: 'Both senior ICs ready to transition to founding' },
        { label: 'Industry Overlap', value: 95, insight: 'Climate tech is core focus for both' },
        { label: 'Remote Work Compatibility', value: 94, insight: 'Both prefer async collaboration and autonomy' }
      ]
    },
    personality: {
      overall: 89,
      tailoredTo: 'Sarah (ENFP) → Alex (INTJ)',
      breakdown: [
        { label: 'Thinking Style Match', value: 92, insight: 'Both are intuitive thinkers but approach differently' },
        { label: 'Energy Balance', value: 87, insight: 'Sarah\'s extraversion balances Alex\'s focus time' },
        { label: 'Decision Making', value: 88, insight: 'Sarah explores possibilities, Alex provides structure' },
        { label: 'Conflict Resolution', value: 89, insight: 'Compatible approaches to disagreement' }
      ]
    },
    values: {
      overall: 95,
      tailoredTo: 'Core Values Comparison',
      breakdown: [
        { label: 'Impact Over Profit', value: 98, insight: 'Both prioritize climate impact above financial returns' },
        { label: 'Ethical Technology', value: 96, insight: 'Shared commitment to responsible innovation' },
        { label: 'Work-Life Integration', value: 92, insight: 'Similar views on sustainable productivity' },
        { label: 'Diversity & Inclusion', value: 94, insight: 'Both advocate for inclusive tech communities' }
      ]
    },
    communication: {
      overall: 91,
      tailoredTo: 'Communication Style Analysis',
      breakdown: [
        { label: 'Message Depth Preference', value: 94, insight: 'Both prefer thoughtful, detailed exchanges' },
        { label: 'Response Cadence', value: 89, insight: 'Similar response times (1-2 hours)' },
        { label: 'Feedback Style', value: 90, insight: 'Direct but empathetic communication' },
        { label: 'Meeting Preference', value: 91, insight: 'Both value focused, agenda-driven meetings' }
      ]
    },
    lifestyle: {
      overall: 87,
      tailoredTo: 'Lifestyle & Interests',
      breakdown: [
        { label: 'Activity Level', value: 85, insight: 'Both maintain active outdoor hobbies' },
        { label: 'Social Battery', value: 86, insight: 'Sarah recharges socially, Alex needs solo time' },
        { label: 'Travel Openness', value: 90, insight: 'Both open to international collaboration' },
        { label: 'Learning Style', value: 88, insight: 'Continuous learners with similar pace' }
      ]
    },
    goals: {
      overall: 93,
      tailoredTo: 'Short & Long-term Goals',
      breakdown: [
        { label: '1-Year Goals', value: 95, insight: 'Both aiming to launch climate tech venture' },
        { label: '5-Year Vision', value: 92, insight: 'Aligned on building sustainable, impactful company' },
        { label: 'Personal Growth', value: 91, insight: 'Both prioritize mentorship and skill development' },
        { label: 'Legacy Ambition', value: 94, insight: 'Shared desire to create lasting climate solutions' }
      ]
    }
  };

  const currentMetric = metrics[activeCategory];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl text-white mb-2">Deep Compatibility Analysis</h3>
            <p className="text-sm text-gray-400">Tailored insights for Sarah × Alex collaboration potential</p>
          </div>
          <div className="text-right">
            <div className="text-3xl text-[#FF7A00]">92%</div>
            <div className="text-xs text-gray-500">Overall Match</div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {Object.keys(metrics).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as any)}
              className={`p-3 rounded-xl border transition-all text-sm ${
                activeCategory === key 
                  ? 'bg-[#FF7A00]/20 border-[#FF7A00] text-white' 
                  : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700'
              }`}
            >
              <div className="capitalize mb-1">{key}</div>
              <div className={`text-lg ${activeCategory === key ? 'text-[#FF7A00]' : 'text-gray-500'}`}>
                {metrics[key as keyof typeof metrics].overall}%
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-6 border border-[#FF7A00]/30"
        >
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl text-[#FF7A00]">{currentMetric.overall}%</span>
              <span className="text-gray-400">{currentMetric.tailoredTo}</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E33]" 
                initial={{ width: 0 }} 
                animate={{ width: `${currentMetric.overall}%` }} 
                transition={{ duration: 1.2 }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentMetric.breakdown.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/50 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-lg text-[#FF7A00]">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">{item.insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
