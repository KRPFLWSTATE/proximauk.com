import { motion } from 'motion/react';
import { useState } from 'react';

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface CustomPieChartProps {
  data: PieData[];
  width: number;
  height: number;
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  onSegmentClick?: (segment: PieData) => void;
}

export function CustomPieChart({
  data,
  width,
  height,
  innerRadius = 0,
  outerRadius = 100,
  showLabels = false,
  onSegmentClick
}: CustomPieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Generate pie segments
  let currentAngle = -90; // Start from top
  
  const segments = data.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Calculate path for donut segment
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + outerRadius * Math.cos(startRad);
    const y1 = centerY + outerRadius * Math.sin(startRad);
    const x2 = centerX + outerRadius * Math.cos(endRad);
    const y2 = centerY + outerRadius * Math.sin(endRad);
    
    const x3 = centerX + innerRadius * Math.cos(endRad);
    const y3 = centerY + innerRadius * Math.sin(endRad);
    const x4 = centerX + innerRadius * Math.cos(startRad);
    const y4 = centerY + innerRadius * Math.sin(startRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
    
    // Calculate label position
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const labelRadius = (outerRadius + innerRadius) / 2;
    const labelX = centerX + labelRadius * Math.cos(midRad);
    const labelY = centerY + labelRadius * Math.sin(midRad);
    
    currentAngle = endAngle;
    
    return {
      pathData,
      item,
      index,
      labelX,
      labelY,
      percentage: Math.round(percentage * 100)
    };
  });
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
      style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
    >
      {segments.map(({ pathData, item, index, labelX, labelY, percentage }) => (
        <g key={index}>
          <motion.path
            d={pathData}
            fill={item.color}
            stroke="#1f2937"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: hoveredIndex === index ? 0.8 : 1,
              scale: hoveredIndex === index ? 1.05 : 1
            }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSegmentClick?.(item)}
          />
          
          {showLabels && (
            <motion.text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize="12"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              pointerEvents="none"
            >
              {percentage}%
            </motion.text>
          )}
          
          {/* Tooltip on hover */}
          {hoveredIndex === index && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <rect
                x={labelX - 40}
                y={labelY - 30}
                width="80"
                height="50"
                fill="rgba(0,0,0,0.95)"
                stroke="#FF7A00"
                strokeWidth="1"
                rx="8"
              />
              <text
                x={labelX}
                y={labelY - 15}
                textAnchor="middle"
                fill="#FF7A00"
                fontSize="10"
                fontWeight="bold"
              >
                {item.name}
              </text>
              <text
                x={labelX}
                y={labelY + 5}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="bold"
              >
                {item.value}%
              </text>
            </motion.g>
          )}
        </g>
      ))}
    </svg>
  );
}
