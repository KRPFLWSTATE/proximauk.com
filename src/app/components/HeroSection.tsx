import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Monitor, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Best on Desktop Banner - Mobile & Tablet Only */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#FF7A00]/20 via-[#FF7A00]/30 to-[#FF7A00]/20 backdrop-blur-md border-b border-[#FF7A00]/50 lg:hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Monitor className="w-5 h-5 text-[#FF7A00]" />
          </motion.div>
          <p className="text-white flex items-center gap-2 text-sm sm:text-base text-center">
            <Sparkles className="w-4 h-4 text-[#FF7A00] animate-pulse flex-shrink-0" />
            <span>Please Use a Computer to Experience the Full Interactive Experience</span>
            <Sparkles className="w-4 h-4 text-[#FF7A00] animate-pulse flex-shrink-0" />
          </p>
        </div>
      </motion.div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1655993810480-c15dccf9b3a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwbmV0d29yayUyMGNvbm5lY3Rpb258ZW58MXx8fHwxNzYxMDYxOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Network background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      {/* Orange Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A00] rounded-full blur-[60px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00] rounded-full blur-[60px] opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      {/* Additional Floating Particles - Optimized count */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#FF7A00] rounded-full hidden sm:block"
          style={{
            left: `${20 + i * 25}%`,
            top: `${25 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative px-6 py-2 bg-gradient-to-r from-[#FF7A00]/20 via-[#FF7A00]/30 to-[#FF7A00]/20 rounded-full border border-[#FF7A00]/50 backdrop-blur-sm overflow-visible">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent rounded-full"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              />
              
              {/* Spark particles */}
              {[...Array(10)].map((_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                const radius = 25 + Math.random() * 15;
                const startX = Math.cos(angle) * radius;
                const startY = Math.sin(angle) * radius;
                const endX = Math.cos(angle) * (radius + 20);
                const endY = Math.sin(angle) * (radius + 20);
                
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full pointer-events-none"
                    style={{
                      background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF7A00' : '#FFA500',
                      boxShadow: `0 0 ${4 + i % 3}px currentColor`,
                    }}
                    animate={{
                      x: [startX, endX, startX],
                      y: [startY, endY, startY],
                      opacity: [0, 1, 0.8, 1, 0],
                      scale: [0, 1.5, 1, 1.2, 0],
                    }}
                    transition={{
                      duration: 2 + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeOut',
                    }}
                  />
                );
              })}
              
              <p className="relative text-[#FF7A00] tracking-wider">
              Ignite Meaningful Sparks
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="mb-6 text-white max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Proxima – The Future of{' '}
            <span className="text-[#FF7A00] relative">
              Meaningful Connection
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mb-12 text-gray-300 max-w-3xl mx-auto text-base sm:text-lg md:text-xl px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bridging Real-Time GPS & Personality-Based Matching—bringing all social and professional interaction into a new level of Flow State by eliminating uncertainties and inefficiencies
          </motion.p>

          {/* Interactive Journey Message */}
          <motion.div
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative px-6 py-4 bg-gradient-to-r from-black/60 via-[#FF7A00]/20 to-black/60 rounded-xl border-2 border-[#FF7A00]/40 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/0 via-[#FF7A00]/10 to-[#FF7A00]/0 rounded-xl animate-pulse" />
              <p className="relative text-white text-center">
                <span className="text-[#FF7A00]">⚡</span> Please take some time to interact with everything. We promise you this is nothing like what you have seen before! <span className="text-[#FF7A00]">⚡</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >

        </motion.div>
      </div>
    </section>
  );
}