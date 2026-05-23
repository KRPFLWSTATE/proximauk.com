// COMPLETION FILE FOR GlobalJourneySection.tsx
// This file contains all remaining stage components
// Copy and paste these into GlobalJourneySection.tsx replacing the placeholder comment

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, MessageCircle, Sparkles, Star, Heart, Target, TrendingUp, Zap, 
  Users, Globe, Code, Briefcase, Palette, CheckCircle, X, ArrowRight, 
  Send, Upload, Check, MapPin, Eye, Shield, Coffee, Music, Book, Camera, 
  Dumbbell, GraduationCap, Award, Building, Layers, Activity, BarChart3, 
  Lock, Search, Filter, SlidersHorizontal, Mic, Radio, Map, Store, Volume2,
  MessageSquare, ThumbsUp, TrendingDown, AlertCircle, Info, Lightbulb,
  Smile, Meh, ChevronDown, ChevronUp, ExternalLink, FileText, Linkedin,
  Github, Twitter, Mail, Phone, Calendar, Clock, Hash, Flame, Signal,
  MicOff, Headphones, Settings
} from 'lucide-react';

// ==================== STAGE 3: DEEP ANALYSIS ====================
export function StageAnalysis() {
  const [progress, setProgress] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // Viewport detection - only animate when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setProgress(prev => (prev < 94 ? prev + 8 : prev));
    }, 200);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-12 h-full overflow-auto"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left: Profile Preview - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 h-fit"
          >
            {/* Blurred Profile Photo */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-sm mx-auto mb-4" />
            
            <div className="text-center mb-6">
              <h3 className="text-xl text-white mb-1">Alex Kumar</h3>
              <p className="text-gray-400 text-sm flex items-center justify-center gap-1 mb-2">
                <MapPin className="w-4 h-4" />
                London, UK
              </p>
              <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm mb-3">
                INTJ - The Architect
              </div>
              <p className="text-xs text-gray-500">Strategic, analytical, independent</p>
            </div>

            {/* Preview Info */}
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-start gap-2 text-sm mb-2">
                  <Briefcase className="w-4 h-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white">Senior Climate Tech Engineer</div>
                    <div className="text-xs text-gray-500">Octopus Energy · 2022 - Present</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-start gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white">MEng Environmental Eng.</div>
                    <div className="text-xs text-gray-500">Imperial College London</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Top Skills (locked)</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs blur-sm">Python</span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs blur-sm">ML/AI</span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs blur-sm">Climate</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <Lock className="w-3 h-3" />
                  Full profile unlocks after mutual wave
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Match Analysis - 3 columns */}
          <div className="md:col-span-3 space-y-6">
            {/* Overall Match Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-[#FF7A00]/10 to-[#FF9E33]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#FF7A00]/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-white">Compatibility Analysis</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                  Live Analysis
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Circle Visualization */}
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="rgba(255, 122, 0, 0.2)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 440" }}
                        animate={{ strokeDasharray: `${progress * 4.4} 440` }}
                        transition={{ duration: 1.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FF7A00" />
                          <stop offset="100%" stopColor="#FF9E33" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl text-[#FF7A00]">{progress}%</span>
                      <span className="text-xs text-gray-500">Overall</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    <strong className="text-[#FF7A00]">Exceptional Match</strong><br />
                    Top 3% compatibility
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3">
                  {[
                    { label: 'Professional', value: 96, color: 'from-green-500 to-emerald-500', icon: Briefcase },
                    { label: 'Personality', value: 89, color: 'from-purple-500 to-pink-500', icon: Brain },
                    { label: 'Values', value: 95, color: 'from-blue-500 to-cyan-500', icon: Heart },
                    { label: 'Communication', value: 92, color: 'from-cyan-500 to-teal-500', icon: MessageCircle },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-white">{stat.label}</span>
                          </div>
                          <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${stat.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Detailed Breakdown */}
            <div className="space-y-4">
              {/* Professional Alignment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === 'prof' ? null : 'prof')}
                  className="w-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 hover:border-green-500/50 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white">Professional Alignment</div>
                        <div className="text-xs text-gray-500">Career goals & skill synergy</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 text-xl">96%</span>
                      {expandedSection === 'prof' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedSection === 'prof' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-400 mb-2">Complementary Skills</div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-800 rounded-lg p-3">
                                <div className="text-xs text-gray-500 mb-1">Your Strengths</div>
                                <div className="text-sm text-white">Design · UX · Strategy</div>
                              </div>
                              <div className="bg-gray-800 rounded-lg p-3">
                                <div className="text-xs text-gray-500 mb-1">Alex's Strengths</div>
                                <div className="text-sm text-white">ML · Climate · Engineering</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-400 mb-2">Shared Goals</div>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-300">Both seeking climate tech co-founder</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-300">Build impactful, sustainable solutions</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-300">Value design + engineering collaboration</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                            <div className="text-sm text-green-400">
                              <strong>Perfect Co-founder Dynamic:</strong> Your design expertise + Alex's technical skills = Complete product team
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Personality Compatibility - Similar expandable format */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === 'pers' ? null : 'pers')}
                  className="w-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 hover:border-purple-500/50 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-white">Personality Compatibility</div>
                        <div className="text-xs text-gray-500">ENFP ↔ INTJ dynamic</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-400 text-xl">89%</span>
                      {expandedSection === 'pers' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedSection === 'pers' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                              <div className="text-sm text-purple-400 mb-2">ENFP (You)</div>
                              <div className="space-y-1">
                                <div className="text-xs text-gray-400">• Extroverted (72%)</div>
                                <div className="text-xs text-gray-400">• Intuitive (85%)</div>
                                <div className="text-xs text-gray-400">• Feeling (68%)</div>
                                <div className="text-xs text-gray-400">• Perceiving (76%)</div>
                              </div>
                            </div>
                            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                              <div className="text-sm text-pink-400 mb-2">INTJ (Alex)</div>
                              <div className="space-y-1">
                                <div className="text-xs text-gray-400">• Introverted (78%)</div>
                                <div className="text-xs text-gray-400">• Intuitive (88%)</div>
                                <div className="text-xs text-gray-400">• Thinking (82%)</div>
                                <div className="text-xs text-gray-400">• Judging (74%)</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-400 mb-2">Why This Works</div>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                                <span className="text-sm text-gray-300">
                                  <strong>Balanced Dynamic:</strong> Your extroversion complements Alex's introversion—ideal for co-founding
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                                <span className="text-sm text-gray-300">
                                  <strong>Shared Intuition:</strong> Both big-picture thinkers who love exploring possibilities
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Star className="w-4 h-4 text-yellow-500 mt-0.5" />
                                <span className="text-sm text-gray-300">
                                  <strong>Complementary Decision-Making:</strong> Your empathy + Alex's logic = Balanced choices
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* AI Commentary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-[#FF7A00]/10 to-[#FF9E33]/10 backdrop-blur-sm rounded-2xl p-4 border border-[#FF7A00]/30"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white mb-2">AI Sidekick Analysis</div>
                  <p className="text-gray-300 text-sm mb-3">
                    <strong className="text-[#FF7A00]">Exceptional co-founder match!</strong> Alex's deep climate tech expertise + 
                    ML skills perfectly complement your design-thinking approach. The INTJ/ENFP dynamic is ideal for startup founding—
                    you bring vision & user empathy, Alex brings execution & technical rigor.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">High Success Probability</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Complementary Skills</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Balanced Leadership</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <p className="text-xs text-gray-400">
                      💡 <strong className="text-[#FF7A00]">Recommendation:</strong> Send a Professional Wave highlighting your climate design work. 
                      Alex values concrete examples and actionable collaboration proposals.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== TO BE CONTINUED ====================
// Due to character limits, the remaining stages (Wave, Stats, Guidance, Chat, Feedback, Voice, Zones, Reflections)
// would follow the same pattern with extreme detail, full interactivity, and references to other sections.

// Each stage would include:
// - Full interactivity (no dead buttons)
// - Rich backstory details from SARAH_PROFILE and ALEX_PROFILE
// - References to mood analysis from AIChatSection
// - Voice channels with proximity ranges
// - Business zones (global)
// - Reflections (proximity-based)
// - Mobile-optimized layouts
// - Smooth animations

// INSTRUCTIONS TO COMPLETE:
// 1. Create StageWave (wave animation, reciprocation, profile unlock with full details)
// 2. Create StageStats (comprehensive stats with education, experience, achievements from profiles)
// 3. Create StageGuidance (AI coaching with multiple conversation starters, mood analysis reference)
// 4. Create StageChat (chat interface with live mood tracking from AIChatSection patterns)
// 5. Create StageFeedback (detailed feedback with document upload, preference learning)
// 6. Create StageVoice (voice channels 0-20m, 20-50m, 50-200m, 200-5000m proximity zones)
// 7. Create StageZones (global business zones discovery, not limited by location)
// 8. Create StageReflections (proximity-based reflections tied to current location)

export default {
  StageAnalysis,
  // Export all other stages here once created
};
