import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-[#FF7A00]/30 py-12">
      <div className="container mx-auto px-4">
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-[#FF7A00]/30 flex items-center justify-center"
        >
          <div className="text-gray-500 text-sm">
            © 2025 Proxima. All rights reserved.
          </div>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-xs">
            Building the future of meaningful connection, one proximity at a time.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
