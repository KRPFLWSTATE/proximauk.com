import { motion } from 'motion/react';
import { useState } from 'react';

interface LineConfig {
  dataKey: string;
  stroke: string;
  name: string;
  strokeWidth?: number;
}

interface CustomLineChartProps {
  data: any[];
  lines: LineConfig[];
  xAxisKey: string;
  width: number;
  height: number;
  showGrid?: boolean;
  showDots?: boolean;
  fillArea?: boolean;
}

export function CustomLineChart({
  data,
  lines,
  xAxisKey,
  width,
  height,
  showGrid = true,
  showDots = true,
  fillArea = false
}: CustomLineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ lineIndex: number; pointIndex: number } | null>(null);
  
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find max value across all lines
  const maxValue = Math.max(
    ...data.map(item => 
      Math.max(...lines.map(line => item[line.dataKey] || 0))
    )
  );
  
  const minValue = Math.min(
    ...data.map(item => 
      Math.min(...lines.map(line => item[line.dataKey] || 0))
    )
  );
  
  const valueRange = maxValue - minValue;
  const stepX = chartWidth / (data.length - 1);
  
  // Function to get Y position for a value
  const getY = (value: number) => {
    return padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
  };
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Grid lines */}
      {showGrid && (
        <g>
          {[0, 1, 2, 3, 4].map(i => {
            const y = padding.top + (chartHeight / 4) * i;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.3"
              />
            );
          })}
        </g>
      )}
      
      {/* Y-axis labels */}
      {[0, 1, 2, 3, 4].map(i => {
        const value = maxValue - (valueRange / 4) * i;
        const y = padding.top + (chartHeight / 4) * i;
        return (
          <text
            key={i}
            x={padding.left - 10}
            y={y}
            textAnchor="end"
            dominantBaseline="middle"
            fill="#9ca3af"
            fontSize="12"
          >
            {Math.round(value)}
          </text>
        );
      })}
      
      {/* Lines */}
      {lines.map((line, lineIndex) => {
        const points = data.map((item, i) => ({
          x: padding.left + i * stepX,
          y: getY(item[line.dataKey] || 0),
          value: item[line.dataKey] || 0,
          label: item[xAxisKey]
        }));
        
        const pathData = points.map((p, i) => 
          `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
        ).join(' ');
        
        const areaData = fillArea 
          ? `${pathData} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`
          : '';
        
        return (
          <g key={lineIndex}>
            {/* Area fill */}
            {fillArea && (
              <motion.path
                d={areaData}
                fill={line.stroke}
                opacity="0.2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.5, delay: lineIndex * 0.1 }}
              />
            )}
            
            {/* Line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: lineIndex * 0.2 }}
            />
            
            {/* Dots */}
            {showDots && points.map((point, pointIndex) => {
              const isHovered = hoveredPoint?.lineIndex === lineIndex && hoveredPoint?.pointIndex === pointIndex;
              
              return (
                <g key={pointIndex}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={isHovered ? 6 : 4}
                    fill={line.stroke}
                    stroke="#1f2937"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: lineIndex * 0.2 + pointIndex * 0.05 }}
                    onMouseEnter={() => setHoveredPoint({ lineIndex, pointIndex })}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <rect
                        x={point.x - 40}
                        y={point.y - 50}
                        width="80"
                        height="45"
                        fill="rgba(0,0,0,0.95)"
                        stroke="#FF7A00"
                        strokeWidth="1"
                        rx="6"
                      />
                      <text
                        x={point.x}
                        y={point.y - 33}
                        textAnchor="middle"
                        fill="#FF7A00"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {line.name}
                      </text>
                      <text
                        x={point.x}
                        y={point.y - 18}
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
          </g>
        );
      })}
      
      {/* X-axis labels */}
      {data.map((item, i) => (
        <text
          key={i}
          x={padding.left + i * stepX}
          y={padding.top + chartHeight + 25}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="12"
        >
          {item[xAxisKey]}
        </text>
      ))}
      
      {/* Axes */}
      <line
        x1={padding.left}
        y1={padding.top + chartHeight}
        x2={padding.left + chartWidth}
        y2={padding.top + chartHeight}
        stroke="#9ca3af"
        strokeWidth="2"
      />
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + chartHeight}
        stroke="#9ca3af"
        strokeWidth="2"
      />
    </svg>
  );
}
