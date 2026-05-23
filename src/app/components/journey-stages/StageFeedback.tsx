import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ThumbsUp, X, Check, Brain, TrendingUp, TrendingDown } from 'lucide-react';

export function StageFeedback() {
  const [feedbackStep, setFeedbackStep] = useState(0);
  const [ratings, setRatings] = useState({
    matchQuality: 0,
    profileAccuracy: 0,
    conversationFlow: 0
  });

  const feedbackSteps = [
    {
      title: 'How was your match with Alex?',
      description: 'Your feedback helps our AI improve future recommendations',
      type: 'rating',
      key: 'matchQuality'
    },
    {
      title: 'Was Alex\'s profile accurate?',
      description: 'Did the profile match your conversation experience?',
      type: 'rating',
      key: 'profileAccuracy'
    },
    {
      title: 'How did the conversation go?',
      description: 'Rate the quality and flow of your interaction',
      type: 'rating',
      key: 'conversationFlow'
    },
    {
      title: 'Tell us more',
      description: 'What worked well? What could be better?',
      type: 'text'
    }
  ];

  const currentStep = feedbackSteps[feedbackStep];

  const handleRating = (value: number) => {
    if (currentStep.type === 'rating' && currentStep.key) {
      setRatings({ ...ratings, [currentStep.key]: value });
      setTimeout(() => {
        if (feedbackStep < feedbackSteps.length - 1) {
          setFeedbackStep(feedbackStep + 1);
        }
      }, 500);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF9E33]/20 border border-[#FF7A00]/40 rounded-full mb-6">
            <Brain className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00]">Help AI Sidekick Learn</span>
          </div>
          <h3 className="text-3xl text-white mb-4">Your Feedback Matters</h3>
          <p className="text-gray-400">Every rating makes our matching algorithm smarter</p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            {feedbackSteps.map((step, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                  i <= feedbackStep ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9E33]' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            Step {feedbackStep + 1} of {feedbackSteps.length}
          </div>
        </div>

        {/* Feedback Content */}
        <motion.div
          key={feedbackStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-8 md:p-12 border border-gray-800"
        >
          <h4 className="text-2xl text-white mb-3 text-center">{currentStep.title}</h4>
          <p className="text-gray-400 text-center mb-8">{currentStep.description}</p>

          {currentStep.type === 'rating' && (
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  className="group relative"
                >
                  <Star
                    className={`w-12 h-12 md:w-16 md:h-16 transition-all ${
                      currentStep.key && ratings[currentStep.key as keyof typeof ratings] >= value
                        ? 'text-[#FF7A00] fill-[#FF7A00]'
                        : 'text-gray-600 hover:text-[#FF7A00]/50'
                    }`}
                  />
                  <motion.div
                    className="absolute -inset-2 bg-[#FF7A00]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                    whileHover={{ scale: 1.1 }}
                  />
                </button>
              ))}
            </div>
          )}

          {currentStep.type === 'text' && (
            <div className="space-y-4">
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]/50 min-h-[150px]"
                placeholder="Share your thoughts..."
              />
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all">
                  Skip
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#FF7A00]/50">
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* AI Impact Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-white">What Gets Better</div>
                <div className="text-xs text-gray-400">When you provide feedback</div>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                'More accurate future matches',
                'Better profile recommendations',
                'Improved conversation suggestions',
                'Smarter ice-breaker generation'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white">Your Impact</div>
                <div className="text-xs text-gray-400">Community contribution</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Feedback Given</span>
                  <span className="text-sm text-[#FF7A00]">12 matches</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">AI Improvement</span>
                  <span className="text-sm text-[#FF7A00]">+8.3%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600" style={{ width: '83%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
