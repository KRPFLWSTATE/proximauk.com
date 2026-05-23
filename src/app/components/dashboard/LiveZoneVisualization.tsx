import { memo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Activity } from 'lucide-react';

interface DensityArea {
  id: string;
  x: number;
  y: number;
  intensity: number;
  count: number;
  color: string;
  label: string;
}

interface LiveZoneVisualizationProps {
  zoneUsers: any[];
  densityAreas: DensityArea[];
}

const LiveZoneVisualizationComponent = ({ zoneUsers, densityAreas }: LiveZoneVisualizationProps) => {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-gray-900/60 to-black/80 border-2 border-[#FF7A00]/30 rounded-2xl overflow-hidden"
      style={{ height: '600px' }}
      animate={{
        borderColor: [
          'rgba(255,122,0,0.3)',
          'rgba(255,122,0,0.6)',
          'rgba(255,122,0,0.3)'
        ]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #FF7A00 0px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, #FF7A00 0px, transparent 1px, transparent 30px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Location Label */}
      <div className="absolute top-4 left-4 bg-black/90 border border-[#FF7A00]/50 rounded-lg px-4 py-2 z-20">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FF7A00]" />
          <span className="text-white font-semibold text-sm">Tech Hub Café</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">Shoreditch, London</p>
      </div>

      {/* Stats Card */}
      <motion.div
        className="absolute top-4 right-4 bg-black/90 border border-[#FF7A00]/50 rounded-lg px-4 py-3 z-20"
        animate={{
          boxShadow: [
            '0 0 20px rgba(255,122,0,0.3)',
            '0 0 30px rgba(255,122,0,0.5)',
            '0 0 20px rgba(255,122,0,0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FF7A00]" />
            <span className="text-white text-sm font-semibold">Zone Activity</span>
          </div>
          <div className="text-xs text-gray-400">
            Total: <span className="text-[#FF7A00] font-bold">25-35 people</span>
          </div>
          <div className="text-xs text-emerald-400">
            ↑ Moderate Activity
          </div>
        </div>
      </motion.div>

      {/* SVG Zone Visualization */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Zone Boundary Square */}
        <motion.rect
          x="15"
          y="15"
          width="70"
          height="70"
          fill="rgba(255,122,0,0.08)"
          stroke="#FF7A00"
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Animated Pulse Squares */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={`pulse-${i}`}
            x="50"
            y="50"
            width="0"
            height="0"
            fill="none"
            stroke="#FF7A00"
            strokeWidth="0.4"
            opacity="0"
            style={{ transformOrigin: 'center' }}
            animate={{
              x: [50, 5],
              y: [50, 5],
              width: [0, 90],
              height: [0, 90],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Glowing Zone Border */}
        <motion.rect
          x="15"
          y="15"
          width="70"
          height="70"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="0.6"
          filter="url(#glow)"
          animate={{
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* Define glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Business Center Point */}
        <motion.circle
          cx="50"
          cy="50"
          r="2"
          fill="#FF7A00"
          animate={{
            r: [2, 2.5, 2],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* Center Glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="#FF7A00"
          opacity="0"
          animate={{
            r: [3, 6],
            opacity: [0.6, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {/* Radius Line */}
        <motion.line
          x1="50"
          y1="50"
          x2="90"
          y2="50"
          stroke="#FF7A00"
          strokeWidth="0.15"
          strokeDasharray="0.5,0.5"
          opacity="0.4"
        />

        {/* GDPR-Compliant Density Heat Zones */}
        <defs>
          {densityAreas.map((area) => (
            <radialGradient key={`gradient-${area.id}`} id={`density-gradient-${area.id}`}>
              <stop offset="0%" stopColor={area.color} stopOpacity={area.intensity * 0.8} />
              <stop offset="40%" stopColor={area.color} stopOpacity={area.intensity * 0.5} />
              <stop offset="70%" stopColor={area.color} stopOpacity={area.intensity * 0.2} />
              <stop offset="100%" stopColor={area.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Density Blobs */}
        {densityAreas.map((area) => (
          <motion.g key={area.id}>
            <motion.ellipse
              cx={area.x}
              cy={area.y}
              rx="12"
              ry="10"
              fill={`url(#density-gradient-${area.id})`}
              animate={{
                rx: [12, 13, 12],
                ry: [10, 11, 10],
                opacity: [area.intensity * 0.9, area.intensity, area.intensity * 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
            {area.count > 0 && (
              <text
                x={area.x}
                y={area.y - 15}
                textAnchor="middle"
                className="text-[4px] fill-white font-semibold"
              >
                {area.label}
              </text>
            )}
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
};

export const LiveZoneVisualization = memo(LiveZoneVisualizationComponent);
