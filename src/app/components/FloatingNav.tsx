import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { throttle } from '../utils/performance';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'problem', name: 'Problem' },
  { id: 'solution', name: 'Solution' },
  { id: 'journey', name: 'Journey' },
  { id: 'ai-engine', name: 'AI Engine' },
  { id: 'features', name: 'Features' },
  { id: 'safety', name: 'Safety' },
  { id: 'market', name: 'Market' },
  { id: 'team', name: 'Team' },
  { id: 'ask', name: 'The Ask' },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="flex flex-col gap-4 pointer-events-none">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3"
          >
            <div
              className={`h-2 transition-all ${
                activeSection === section.id
                  ? 'w-12 bg-[#FF7A00] shadow-[0_0_10px_#FF7A00]'
                  : 'w-6 bg-gray-600 hover:bg-[#FF7A00] hover:w-8'
              }`}
            />
            <span
              className={`text-sm transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? 'text-[#FF7A00] opacity-100'
                  : 'text-gray-500 opacity-0 group-hover:opacity-100'
              }`}
            >
              {section.name}
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}