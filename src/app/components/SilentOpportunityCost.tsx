import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

export function SilentOpportunityCost() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto relative">
            {/* Intense Red Glow Border */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-xl opacity-60 blur-2xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Pulsing outer glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-red-500/30 via-red-600/40 to-red-500/30 rounded-2xl blur-3xl"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <Card className="relative bg-gradient-to-br from-[#1A0505] via-black to-[#0D0000] border-2 border-red-500/50 p-10 md:p-12 overflow-hidden">
              {/* Animated Red Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.3})`
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.8, 1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Danger stripes effect */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239, 68, 68, 0.3) 10px, rgba(239, 68, 68, 0.3) 20px)'
                }} />
              </div>

              <div className="relative z-10">
                {/* Alert Icon */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                </motion.div>

                {/* Title with dramatic effect */}
                <motion.h3
                  className="text-center mb-6 text-3xl md:text-4xl bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-clip-text text-transparent"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(239, 68, 68, 0.5)',
                      '0 0 40px rgba(239, 68, 68, 0.8)',
                      '0 0 20px rgba(239, 68, 68, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  The Silent Opportunity Cost
                </motion.h3>

                {/* Content with glowing effect */}
                <motion.div
                  className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.2)',
                      '0 0 20px rgba(239, 68, 68, 0.4)',
                      '0 0 10px rgba(239, 68, 68, 0.2)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <p className="text-lg md:text-xl mb-4">
                    Brilliant ideas die in silence every day. Picture this, an international founder lands with the next unicorn, but cultural nuance or hesitation keeps them from speaking. A potential investor walks away because the approach felt &quot;off.&quot; These micro-barriers—intimidation, timing, finding the right words—create a massive butterfly effect of lost value.
                  </p>
                  <p className="text-red-400 text-xl md:text-2xl mt-6">
                    How many more potential connections are we going to miss?
                  </p>
                  <p className="text-red-500 text-xl md:text-2xl mt-4">
                    How many more times are we going to walk past or scroll past a potential business partner, life partner or friend?
                  </p>
                </motion.div>

                {/* Pulsing warning dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-red-500"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
