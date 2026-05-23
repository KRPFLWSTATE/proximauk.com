import { motion, MotionProps } from 'motion/react';
import { ReactNode } from 'react';

// Standard animation presets to reduce code duplication
export const ANIMATION_PRESETS = {
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },
  cardHover: {
    whileHover: { borderColor: 'rgba(255,122,0,0.6)', scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.3 }
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'icon';
}

export const MotionButton = ({ children, className = '', variant = 'default', ...props }: MotionButtonProps) => (
  <motion.button
    className={className}
    {...ANIMATION_PRESETS.buttonHover}
    {...props}
  >
    {children}
  </motion.button>
);

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MotionCard = ({ children, className = '', onClick }: MotionCardProps) => (
  <motion.div
    className={className}
    {...ANIMATION_PRESETS.cardHover}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

interface FadeInDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInDiv = ({ children, className = '', delay = 0 }: FadeInDivProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);
