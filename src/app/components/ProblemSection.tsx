import { motion } from 'motion/react';
import { Users, Smartphone, Heart, MessageSquare, MapPin, Shield, Brain, AlertCircle, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';

const statistics = [
  { value: '45%', label: 'UK Adults Report Loneliness', icon: Users },
  { value: '33%+', label: "UK adults say there aren't enough community spaces in their area", icon: MapPin },
  { value: '3 in 10', label: 'UK adults rarely or never interact outside their "bubble"', icon: Users },
  { value: '31%', label: '16–29s feel lonely at least "some of the time" (7% chronic)', icon: Heart },
];

const problems = [
  {
    title: 'Rising Social Isolation',
    description: 'Despite hyperconnectivity, loneliness is at epidemic levels. Traditional social platforms fail to foster genuine, local connections.',
    icon: Users,
  },
  {
    title: 'Superficial Interactions',
    description: 'Dating apps focus on swipes, not substance. Professional networks lack personality. Social media breeds comparison, not community.',
    icon: MessageSquare,
  },
  {
    title: 'Missing Integration',
    description: 'Users juggle multiple apps for dating, networking, events, and local discovery. No single platform unifies these needs intelligently.',
    icon: MapPin,
  },
  {
    title: 'Underserved Impact',
    description: 'Mental health, professional growth, and local economies suffer from the absence of meaningful, proximity-based social infrastructure.',
    icon: Shield,
  },
  {
    title: 'Authenticity Crisis',
    description: 'Modern society lacks genuine connection. Interactions feel transactional and superficial, leaving people craving real, meaningful relationships but uncertain how to build them in an increasingly digital world.',
    icon: Brain,
  },
  {
    title: 'Uncertainty & Inefficiency',
    description: 'Fear of rejection, social anxiety, and rumination create massive barriers to connection. Introverts hesitate, questions like "What if they say no?" or "Am I bothering them?" paralyze action, leaving countless potential relationships unrealized.',
    icon: AlertCircle,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 bg-gradient-to-b from-black to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">Problem & Market Gaps</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto" />
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-black/50 border-[#FF7A00]/30 p-8 text-center hover:border-[#FF7A00] transition-all hover:shadow-[0_0_30px_rgba(255,122,0,0.3)] group">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF7A00]/10 mb-4 group-hover:bg-[#FF7A00]/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-8 h-8 text-[#FF7A00]" />
                </motion.div>
                <div className="mb-2 text-[#FF7A00]" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stat.value}</div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Problem Details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-black to-[#0D0D0D] border-[#FF7A00]/20 p-8 h-full hover:border-[#FF7A00] transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center group-hover:bg-[#FF7A00]/20 transition-all">
                    <problem.icon className="w-6 h-6 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h3 className="mb-3 text-white">{problem.title}</h3>
                    <p className="text-gray-400">{problem.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Now? Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="max-w-4xl mx-auto relative">
            {/* Glowing border effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#FF7A00] via-[#FF8C1A] to-[#FF7A00] rounded-lg opacity-50 blur-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative bg-gradient-to-br from-[#0A0A0A] via-black to-[#0D0D0D] border-2 border-[#FF7A00] rounded-lg p-8 md:p-12 overflow-hidden">
              {/* Animated particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}

              <div className="relative z-10">
                {/* Eye-catching title */}
                <motion.h3
                  className="text-center mb-8 text-3xl md:text-4xl bg-gradient-to-r from-[#FF7A00] via-[#FFB04D] to-[#FF7A00] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% auto'
                  }}
                >
                  Why Now?
                </motion.h3>

                {/* Glowing text content */}
                <motion.div
                  className="text-gray-300 leading-relaxed space-y-4"
                  animate={{
                    textShadow: [
                      '0 0 5px rgba(255, 122, 0, 0.3)',
                      '0 0 10px rgba(255, 122, 0, 0.5)',
                      '0 0 5px rgba(255, 122, 0, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <p>
                    Real-world interactions have declined dramatically in both volume and authenticity. Most people no longer forge lifelong connections in person the way they did in the 1980s. Instead, we've grown dependent on today's social media platforms—taking the path of least resistance into a world that severely lacks genuine authenticity metrics. This has led countless individuals into the trap of fake, unsustainable, and ultimately unhealthy relationships.
                  </p>
                  <p>
                    There's no rewinding the clock to those pre-internet days when society wasn't tethered to social media. But we don't have to accept the status quo. <span className="text-[#FF7A00] font-semibold">When life gives you lemons, you make lemonade.</span> And if the internet has become a sour lemon, Proxima is the recipe for making it sweet again—transforming digital connection into something real, meaningful, and authentically human.
                  </p>
                </motion.div>

                {/* Decorative pulsing elements */}
                <div className="flex justify-center gap-2 mt-8">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#FF7A00]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
