import { motion } from 'motion/react';
import { useState } from 'react';

interface RadarData {
  category: string;
  value: number;
}

interface CustomRadarChartProps {
  data: RadarData[];
  width: number;
  height: number;
  fill: string;
  stroke: string;
  fillOpacity?: number;
  onSegmentClick?: (segment: RadarData) => void;
}

export function CustomRadarChart({
  data,
  width,
  height,
  fill,
  stroke,
  fillOpacity = 0.3,
  onSegmentClick
}: CustomRadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;
  
  // Find max value
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Number of concentric circles
  const levels = 5;
  
  // Calculate polygon points
  const angleStep = (Math.PI * 2) / data.length;
  const points = data.map((item, i) => {
    const angle = angleStep * i - Math.PI / 2; // Start from top
    const r = (item.value / maxValue) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      labelX: centerX + (radius + 25) * Math.cos(angle),
      labelY: centerY + (radius + 25) * Math.sin(angle),
      value: item.value,
      category: item.category
    };
  });
  
  const polygonPath = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
      style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
    >
      {/* Concentric circles (grid) */}
      {Array.from({ length: levels }).map((_, i) => {
        const r = ((i + 1) / levels) * radius;
        return (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke="#4b5563"
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}
      
      {/* Radial lines */}
      {data.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={x}
            y2={y}
            stroke="#6b7280"
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}
      
      {/* Data polygon fill */}
      <motion.path
        d={polygonPath}
        fill={fill}
        fillOpacity={fillOpacity}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: fillOpacity, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Data polygon stroke */}
      <motion.path
        d={polygonPath}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      {/* Data points */}
      {points.map((point, i) => {
        const isHovered = hoveredIndex === i;
        
        return (
          <g key={i}>
            {/* Point */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={isHovered ? 6 : 4}
              fill={fill}
              stroke={stroke}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onSegmentClick?.(data[i])}
              style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
            />
            
            {/* Category label */}
            <text
              x={point.labelX}
              y={point.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9ca3af"
              fontSize="12"
              fontWeight={isHovered ? 'bold' : 'normal'}
            >
              {point.category}
            </text>
            
            {/* Tooltip */}
            {isHovered && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <rect
                  x={point.x - 30}
                  y={point.y - 35}
                  width="60"
                  height="30"
                  fill="rgba(0,0,0,0.95)"
                  stroke={stroke}
                  strokeWidth="1"
                  rx="6"
                />
                <text
                  x={point.x}
                  y={point.y - 20}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {point.value}
                </text>
              </motion.g>
            )}
          </g>
        );
      })}
      
      {/* Center dot */}
      <circle
        cx={centerX}
        cy={centerY}
        r="3"
        fill={stroke}
      />
    </svg>
  );
}
