import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { RomanticMode } from './metamorphosis/RomanticMode';
import { FriendlyMode } from './metamorphosis/FriendlyMode';
import { useInView } from '../hooks/useInView';

type Mode = 'romantic' | 'friendly';

interface ModeConfig {
  id: Mode;
  title: string;
  subtitle: string;
  icon: typeof Heart;
  color: string;
  gradient: string;
}

const MODES: ModeConfig[] = [
  {
    id: 'friendly',
    title: 'Friendly',
    subtitle: 'From Collector to Conductor',
    icon: Users,
    color: '#10b981',
    gradient: 'from-green-500 via-emerald-500 to-lime-500'
  },
  {
    id: 'romantic',
    title: 'Romantic',
    subtitle: 'From Search to Shared Journey',
    icon: Heart,
    color: '#FF7A00',
    gradient: 'from-red-500 via-pink-500 to-orange-500'
  }
];

const MetamorphosisSectionComponent = () => {
  const [activeMode, setActiveMode] = useState<Mode>('friendly');
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const currentMode = MODES.find(m => m.id === activeMode)!;

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Dynamic Background - Changes based on active mode */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          key={activeMode}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, ${currentMode.color}40 0%, transparent 50%)`,
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 50%, ${currentMode.color}30 0%, transparent 50%)`,
            }}
          />
        </motion.div>
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${currentMode.color} 1px, transparent 1px), linear-gradient(to bottom, ${currentMode.color} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
          animate={isInView ? { 
            backgroundPosition: ['0px 0px', '60px 60px'] 
          } : {}}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[60px] opacity-20"
        style={{ backgroundColor: currentMode.color }}
        animate={isInView ? { 
          scale: [1, 1.2, 1], 
          opacity: [0.2, 0.3, 0.2] 
        } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[60px] opacity-20"
        style={{ backgroundColor: currentMode.color }}
        animate={isInView ? { 
          scale: [1.2, 1, 1.2], 
          opacity: [0.3, 0.2, 0.3] 
        } : {}}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF9E33]/20 border border-[#FF7A00]/40 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00]">The App Designed Not to Be Deleted</span>
            <motion.div 
              className="w-2 h-2 bg-[#FF7A00] rounded-full"
              animate={isInView ? { 
                scale: [1, 1.5, 1], 
                opacity: [1, 0.5, 1] 
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h2 id="metamorphosis-title" className="text-3xl md:text-4xl lg:text-5xl mb-4">
            The <span className="text-[#FF7A00]">Operating System</span> for Your Social Life
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Proxima evolves with you. From single to coupled, from networking to building, from plans to memories—
            <span className="text-[#FF7A00]"> the app transforms to serve your life's changing contexts.</span>
          </p>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 md:gap-6 mb-12 flex-wrap"
        >
          {MODES.map((mode, index) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            
            return (
              <motion.button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className={`
                  relative px-6 md:px-8 py-4 md:py-6 rounded-2xl transition-all duration-500
                  ${isActive 
                    ? `bg-gradient-to-br ${mode.gradient} shadow-2xl` 
                    : 'bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700'
                  }
                `}>
                  {/* Glow Effect */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} rounded-2xl blur-xl opacity-50`}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`
                      w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center
                      ${isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-800'}
                      transition-all duration-300
                    `}>
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm md:text-base mb-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {mode.title}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {mode.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeMode"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Mode Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {activeMode === 'romantic' && <RomanticMode key="romantic" />}
            {activeMode === 'friendly' && <FriendlyMode key="friendly" />}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-4">
            {/* Romantic Dashboard CTA Button */}
            <motion.button
              onClick={() => {
                setActiveMode('romantic');
                // Scroll to the metamorphosis title
                setTimeout(() => {
                  const titleElement = document.getElementById('metamorphosis-title');
                  if (titleElement) {
                    titleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#FF1493] via-[#FF69B4] to-[#FF1493] text-white rounded-full hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF69B4] via-[#FF1493] to-[#FF69B4]"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Don't Miss the Romantic Dashboard – See Love Garden
                <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Zap className="w-4 h-4 text-[#FF7A00]" />
              <span>Intelligent adaptation powered by AI</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
              <span>Grows more valuable as your life evolves</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const MetamorphosisSection = memo(MetamorphosisSectionComponent);
export default MetamorphosisSection;