import { motion } from 'motion/react';
import { useState } from 'react';

interface AreaConfig {
  dataKey: string;
  fill: string;
  stroke: string;
  name: string;
}

interface CustomAreaChartProps {
  data: any[];
  areas: AreaConfig[];
  xAxisKey: string;
  width: number;
  height: number;
  showGrid?: boolean;
  stacked?: boolean;
  onAreaClick?: (data: any) => void;
}

export function CustomAreaChart({
  data,
  areas,
  xAxisKey,
  width,
  height,
  showGrid = true,
  stacked = false,
  onAreaClick
}: CustomAreaChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ areaIndex: number; pointIndex: number } | null>(null);
  
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find max value
  const maxValue = Math.max(
    ...data.map(item => 
      stacked 
        ? areas.reduce((sum, area) => sum + (item[area.dataKey] || 0), 0)
        : Math.max(...areas.map(area => item[area.dataKey] || 0))
    )
  );
  
  const stepX = chartWidth / (data.length - 1);
  
  // Function to get Y position for a value
  const getY = (value: number) => {
    return padding.top + chartHeight - (value / maxValue) * chartHeight;
  };
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
      style={{ cursor: onAreaClick ? 'pointer' : 'default' }}
      onClick={() => onAreaClick?.(data)}
    >
      <defs>
        {areas.map((area, i) => (
          <linearGradient key={i} id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={area.fill} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={area.fill} stopOpacity={0}/>
          </linearGradient>
        ))}
      </defs>
      
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
        const value = maxValue - (maxValue / 4) * i;
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
      
      {/* Areas */}
      {areas.map((area, areaIndex) => {
        const points = data.map((item, i) => {
          let value = item[area.dataKey] || 0;
          
          // If stacked, add values from previous areas
          if (stacked && areaIndex > 0) {
            for (let j = 0; j < areaIndex; j++) {
              value += item[areas[j].dataKey] || 0;
            }
          }
          
          return {
            x: padding.left + i * stepX,
            y: getY(value),
            value: item[area.dataKey] || 0,
            label: item[xAxisKey]
          };
        });
        
        const linePath = points.map((p, i) => 
          `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
        ).join(' ');
        
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;
        
        return (
          <g key={areaIndex}>
            {/* Area fill */}
            <motion.path
              d={areaPath}
              fill={`url(#gradient-${areaIndex})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: areaIndex * 0.1 }}
            />
            
            {/* Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke={area.stroke}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: areaIndex * 0.2 }}
            />
            
            {/* Dots */}
            {points.map((point, pointIndex) => {
              const isHovered = hoveredPoint?.areaIndex === areaIndex && hoveredPoint?.pointIndex === pointIndex;
              
              return (
                <g key={pointIndex}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={isHovered ? 6 : 4}
                    fill={area.fill}
                    stroke="#1f2937"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: areaIndex * 0.2 + pointIndex * 0.05 }}
                    onMouseEnter={() => setHoveredPoint({ areaIndex, pointIndex })}
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
                        {area.name}
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
