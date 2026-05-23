import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

export function StageWave() {
  const [waved, setWaved] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleWave = () => {
    setWaved(true);
    setTimeout(() => setShowMessage(true), 800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 flex items-center justify-center h-full">
      <div className="text-center max-w-2xl">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", duration: 0.6 }}
          className="relative mb-8 inline-block"
        >
          <motion.div 
            animate={{ scale: waved ? [1, 1.5, 1.5] : [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: waved ? 0 : Infinity }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E33] flex items-center justify-center mx-auto"
          >
            <Zap className="w-16 h-16 text-white" />
          </motion.div>
          {waved && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2, 2.5], opacity: [1, 0.5, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 rounded-full border-4 border-[#FF7A00]"
            />
          )}
        </motion.div>

        <h3 className="text-3xl text-white mb-4">
          {waved ? '✨ Wave Sent to London!' : 'Send a Professional Wave'}
        </h3>
        <p className="text-gray-400 mb-8">
          {waved 
            ? 'Alex will be notified. If they wave back, you\'ll unlock full profile access.'
            : 'Let Alex know you\'re interested in connecting. No commitment required.'}
        </p>

        {!waved ? (
          <button 
            onClick={handleWave}
            className="px-8 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FF9E33] text-white rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#FF7A00]/50 text-lg"
          >
            Wave to Alex Kumar (London) →
          </button>
        ) : (
          <AnimatePresence>
            {showMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 border border-[#FF7A00]/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div className="text-left">
                    <div className="text-white">Alex Kumar</div>
                    <div className="text-xs text-gray-400">Received your wave · 3,450 miles away</div>
                  </div>
                  <motion.div 
                    animate={{ rotate: [0, 20, -20, 20, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="ml-auto text-2xl"
                  >
                    👋
                  </motion.div>
                </div>
                <p className="text-sm text-gray-300 text-left">
                  Distance is no barrier! You'll be notified when Alex responds.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
