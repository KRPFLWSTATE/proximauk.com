import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, MessageCircle, Sparkles, Star, Heart, Target, TrendingUp, Zap, 
  Users, Globe, Code, Briefcase, Palette, CheckCircle, X, ArrowRight, 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Send, Upload,
  Check, MapPin, Eye, Shield, Coffee, Music, Book, Camera, Dumbbell,
  GraduationCap, Award, Building, Layers, Activity, BarChart3, Lock,
  Search, Filter, SlidersHorizontal, Mic, Radio, Map, Store, Volume2,
  MessageSquare, ThumbsUp, TrendingDown, AlertCircle, Info, Lightbulb,
  Smile, Meh, ChevronDown, ChevronUp, ExternalLink, FileText, Linkedin,
  Github, Twitter, Mail, Phone, Calendar, Clock, Hash, Flame, Signal, Settings,
  MicOff, Headphones, UserPlus, Image, Frown, Laugh, Users2, MessageSquarePlus,
  Podcast, CloudRain, Wind, Leaf, Rocket, TestTube, PieChart, Network, Compass,
  Link2, Merge, Timer, Zap as ZapIcon, TrendingUp as TrendingUpIcon, Boxes,
  WifiOff, Cpu, Gauge, BarChart2, LineChart
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Import modular stage components
import { StageHome } from './journey-stages/StageHome';
import { StageFeed } from './journey-stages/StageFeed';
import { StageAnalysis } from './journey-stages/StageAnalysis';
import { StageWave } from './journey-stages/StageWave';
import { StageStats } from './journey-stages/StageStats';
import { StageGuidance } from './journey-stages/StageGuidance';
import { StageChat } from './journey-stages/StageChat';
import { StageFeedback } from './journey-stages/StageFeedback';
import { StageVoice } from './journey-stages/StageVoice';
import { StageZones } from './journey-stages/StageZones';
import { StageReflections } from './journey-stages/StageReflections';

// Extended stage definitions
type StageId = 'home' | 'feed' | 'analysis' | 'wave' | 'stats' | 'guidance' | 'chat' | 'feedback' | 'voice' | 'zones' | 'reflections';

interface Stage {
  id: StageId;
  title: string;
  duration: number;
}

const STAGES: Stage[] = [
  { id: 'home', title: 'App Home', duration: 10 },
  { id: 'feed', title: 'Global Feed', duration: 14 },
  { id: 'analysis', title: 'AI Analysis', duration: 14 },
  { id: 'wave', title: 'Wave & Unlock', duration: 12 },
  { id: 'stats', title: 'Full Stats', duration: 16 },
  { id: 'guidance', title: 'AI Guidance', duration: 12 },
  { id: 'chat', title: 'Conversation', duration: 20 },
  { id: 'feedback', title: 'Feedback Loop', duration: 14 },
  { id: 'voice', title: 'Voice Channels', duration: 12 },
  { id: 'zones', title: 'Business Zones', duration: 12 },
  { id: 'reflections', title: 'Reflections', duration: 12 },
];

const GlobalJourneySectionComponent = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStage = STAGES[currentStageIndex];

  useEffect(() => {
    if (isPlaying && currentStage) {
      timerRef.current = setTimeout(() => {
        if (currentStageIndex < STAGES.length - 1) {
          setCurrentStageIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, currentStage.duration * 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStageIndex, isPlaying, currentStage]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleRestart = () => {
    setCurrentStageIndex(0);
    setIsPlaying(true);
  };
  const handleStageSelect = (index: number) => {
    setCurrentStageIndex(index);
    setIsPlaying(false);
  };
  const handleNext = () => currentStageIndex < STAGES.length - 1 && setCurrentStageIndex(prev => prev + 1);
  const handlePrev = () => currentStageIndex > 0 && setCurrentStageIndex(prev => prev - 1);

  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #FF7A00 1px, transparent 1px), linear-gradient(to bottom, #FF7A00 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A00] rounded-full blur-[60px] opacity-20" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00] rounded-full blur-[60px] opacity-20" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF9E33]/20 border border-[#FF7A00]/40 rounded-full mb-6">
            <Network className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00]">Proximity + Global: Unlimited Connection Possibilities</span>
            <motion.div className="w-2 h-2 bg-[#FF7A00] rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">Connect <span className="text-[#FF7A00]">Locally or Globally</span></h2>
          <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Proxima is not limited by distance. Find meaningful connections <span className="text-[#FF7A00]">in your neighborhood or across continents</span>. 
            Our AI analyzes personality, career alignment, values, and communication styles to match you with people who truly matter.
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Stage Progress */}
          <div className="mb-8">
            {/* Playback Controls */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <button 
                onClick={handleRestart} 
                className="p-3 rounded-full bg-gray-800/80 backdrop-blur-sm text-white hover:bg-gray-700 transition-all border border-gray-700 hover:border-[#FF7A00]/50"
                title="Restart Journey"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={handlePlayPause} 
                className="p-4 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white hover:scale-105 transition-all shadow-lg shadow-[#FF7A00]/50"
                title={isPlaying ? "Pause Auto-Play" : "Start Auto-Play"}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="text-gray-400 text-sm">
                {isPlaying ? (
                  <span className="flex items-center gap-2">
                    <motion.div 
                      className="w-2 h-2 bg-[#FF7A00] rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Playing
                  </span>
                ) : 'Paused'}
              </div>
            </div>

            {/* Journey Tabs with Progress */}
            <div className="flex justify-center gap-2 flex-wrap">
              {STAGES.map((stage, index) => {
                const isActive = index === currentStageIndex;
                const isCompleted = index < currentStageIndex;
                const isUpcoming = index > currentStageIndex;
                
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(index)}
                    className="relative group"
                  >
                    {/* Tab Container */}
                    <div className={`
                      relative px-4 py-3 rounded-lg text-xs md:text-sm transition-all duration-300
                      ${isActive ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white scale-105' : ''}
                      ${isCompleted ? 'bg-[#FF7A00]/20 text-gray-300 hover:bg-[#FF7A00]/30' : ''}
                      ${isUpcoming ? 'bg-gray-800/80 text-gray-500 hover:bg-gray-700/80' : ''}
                      border ${isActive ? 'border-[#FF7A00]' : isCompleted ? 'border-[#FF7A00]/30' : 'border-gray-700'}
                      overflow-hidden
                    `}>
                      {/* Glow Effect for Active Tab */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/50 to-[#FF9E33]/50 blur-xl"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center gap-2">
                        <span className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-xs
                          ${isActive ? 'bg-white text-[#FF7A00]' : ''}
                          ${isCompleted ? 'bg-[#FF7A00] text-white' : ''}
                          ${isUpcoming ? 'bg-gray-700 text-gray-500' : ''}
                        `}>
                          {isCompleted ? <Check className="w-3 h-3" /> : index + 1}
                        </span>
                        <span>{stage.title}</span>
                      </div>

                      {/* Progress Bar */}
                      {isActive && isPlaying && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-white rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: stage.duration, ease: 'linear' }}
                        />
                      )}
                      
                      {/* Completed Indicator */}
                      {isCompleted && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF7A00]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visualization Container */}
          <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-[#FF7A00]/30 overflow-hidden backdrop-blur-sm min-h-[600px] md:min-h-[700px]">
            <AnimatePresence mode="wait">
              {currentStage.id === 'home' && <StageHome key="home" />}
              {currentStage.id === 'feed' && <StageFeed key="feed" />}
              {currentStage.id === 'analysis' && <StageAnalysis key="analysis" />}
              {currentStage.id === 'wave' && <StageWave key="wave" />}
              {currentStage.id === 'stats' && <StageStats key="stats" />}
              {currentStage.id === 'guidance' && <StageGuidance key="guidance" />}
              {currentStage.id === 'chat' && <StageChat key="chat" />}
              {currentStage.id === 'feedback' && <StageFeedback key="feedback" />}
              {currentStage.id === 'voice' && <StageVoice key="voice" />}
              {currentStage.id === 'zones' && <StageZones key="zones" />}
              {currentStage.id === 'reflections' && <StageReflections key="reflections" />}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex justify-center items-center gap-4 mt-6 flex-wrap">
                <button onClick={handlePrev} disabled={currentStageIndex === 0} className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-300 text-sm border border-gray-700">
                  Stage {currentStageIndex + 1} of {STAGES.length}
                </div>
                <button onClick={handleNext} disabled={currentStageIndex === STAGES.length - 1} className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#FF7A00]/50">
            Join Waitlist to Experience AI-Powered Matching
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
          <p className="text-gray-500 text-sm mt-4">The most powerful connection platform ever built</p>
        </motion.div>
      </div>
    </section>
  );
};

export const GlobalJourneySection = memo(GlobalJourneySectionComponent);
export default GlobalJourneySection;