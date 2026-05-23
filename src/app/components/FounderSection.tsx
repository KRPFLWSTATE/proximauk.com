import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1625237235111-a2443db3c8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBza3lsaW5lJTIwbmlnaHR8ZW58MXx8fHwxNzYxMDYxOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="London skyline"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        
        {/* Orange Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A00] rounded-full blur-[150px] opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-[#FF7A00]/10 border-2 border-[#FF7A00] flex items-center justify-center">
              <Quote className="w-10 h-10 text-[#FF7A00]" />
            </div>
          </motion.div>

          {/* Founder Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-black/80 to-[#0D0D0D]/80 backdrop-blur-sm border-2 border-[#FF7A00]/30 rounded-lg p-12 text-center"
          >
            <h2 className="mb-8 text-white text-3xl md:text-4xl lg:text-5xl">A Personal Mission</h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                "I moved to London five years ago, surrounded by millions of people, yet I felt profoundly alone. Existing apps promised connection but delivered swipes, likes, and empty conversations. I realized the problem wasn't just me—it was systemic."
              </p>

              <p className="text-[#FF7A00] italic">
                "45% of UK adults experience loneliness. We're more 'connected' than ever, yet more isolated."
              </p>

              <p>
                "Like Tony Stark in a cave with a box of scraps, I started building Proxima out of necessity. I spent months learning how to and building most of the logic for the MVP using a that laptop overheats every 20 minutes, funding all the tools myself after deciding to take a risk by turning down well paid corporate jobs. I saw Proxima not as another dating app or professional networking APP, but as a fundamental reimagining of how humans discover and connect with each other in physical space at a level never done before."
              </p>

              <p>
                "We're combining cutting-edge AI, personality science, and proximity technology to solve one of humanity's most pressing challenges: meaningful connection in an increasingly disconnected world."
              </p>

              <p className="text-white">
                "This isn't just a business opportunity—though it's a massive one. This is about fundamentally improving millions of lives. This is about building the future of human connection."
              </p>

              <p className="text-[#FF7A00]">
                "We're not asking for investment. We're offering partnership in a movement that will redefine social technology for the next decade."
              </p>
            </div>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-[#FF7A00]/30">
              <div className="text-2xl text-[#FF7A00] mb-2" style={{ fontFamily: 'cursive' }}>
                Kawin Perera
              </div>
              <p className="text-gray-400">Founder & CEO, Proxima</p>
              <p className="text-gray-500 text-sm mt-2">London, October 2025</p>
            </div>
          </motion.div>

          {/* Vision Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Our North Star', text: 'Reduce loneliness by enabling 1M meaningful connections' },
              { title: 'Our Commitment', text: 'Privacy-first, safety-first, people-first—always' },
              { title: 'Our Timeline', text: '14 month runway to product-market fit' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-black/50 border border-[#FF7A00]/30 rounded-lg p-6 text-center hover:border-[#FF7A00] transition-all"
              >
                <h4 className="text-[#FF7A00] mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
