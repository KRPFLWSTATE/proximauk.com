import { motion } from 'motion/react';
import { useState } from 'react';

interface BarConfig {
  dataKey: string;
  fill: string;
  name: string;
}

interface CustomBarChartProps {
  data: any[];
  bars: BarConfig[];
  width: number;
  height: number;
  showGrid?: boolean;
  showLabels?: boolean;
  onBarClick?: (data: any) => void;
}

export function CustomBarChart({
  data,
  bars,
  width,
  height,
  showGrid = true,
  showLabels = false,
  onBarClick
}: CustomBarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<{ index: number; barIndex: number } | null>(null);
  
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find max value across all bars
  const maxValue = Math.max(
    ...data.map(item => 
      Math.max(...bars.map(bar => item[bar.dataKey] || 0))
    )
  );
  
  const barGroupWidth = chartWidth / data.length;
  const groupPadding = barGroupWidth * 0.2; // 20% padding on each side of group
  const availableGroupWidth = barGroupWidth - groupPadding;
  const barWidth = availableGroupWidth / bars.length * 0.85; // 85% of available space for bars
  const totalBarsWidth = barWidth * bars.length;
  const barGap = (availableGroupWidth - totalBarsWidth) / Math.max(bars.length - 1, 1);
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
      style={{ cursor: onBarClick ? 'pointer' : 'default' }}
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
      
      {/* Bars */}
      {data.map((item, dataIndex) => {
        // Calculate center of the group section
        const groupCenterX = padding.left + dataIndex * barGroupWidth + barGroupWidth / 2;
        // Start bars from the left, centered around groupCenterX
        const xBase = groupCenterX - totalBarsWidth / 2 - (barGap * (bars.length - 1)) / 2;
        
        return (
          <g key={dataIndex}>
            {bars.map((bar, barIndex) => {
              const value = item[bar.dataKey] || 0;
              const barHeight = (value / maxValue) * chartHeight;
              const x = xBase + barIndex * (barWidth + barGap);
              const y = padding.top + chartHeight - barHeight;
              
              const isHovered = hoveredBar?.index === dataIndex && hoveredBar?.barIndex === barIndex;
              
              return (
                <g key={barIndex}>
                  <motion.rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={bar.fill}
                    rx="4"
                    ry="4"
                    initial={{ height: 0, y: padding.top + chartHeight }}
                    animate={{ 
                      height: barHeight, 
                      y,
                      opacity: isHovered ? 0.8 : 1,
                      filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
                    }}
                    whileInView={{ height: barHeight, y }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: dataIndex * 0.05 + barIndex * 0.05 }}
                    onMouseEnter={() => setHoveredBar({ index: dataIndex, barIndex })}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => onBarClick?.(item)}
                  />
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <rect
                        x={x + barWidth / 2 - 35}
                        y={y - 45}
                        width="70"
                        height="40"
                        fill="rgba(0,0,0,0.95)"
                        stroke="#FF7A00"
                        strokeWidth="1"
                        rx="6"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={y - 30}
                        textAnchor="middle"
                        fill="#FF7A00"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {bar.name}
                      </text>
                      <text
                        x={x + barWidth / 2}
                        y={y - 15}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {value}
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}
            
            {/* X-axis label */}
            <text
              x={padding.left + dataIndex * barGroupWidth + barGroupWidth / 2}
              y={padding.top + chartHeight + 25}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize="11"
            >
              {item.category || item.source || item.name || `Item ${dataIndex + 1}`}
            </text>
          </g>
        );
      })}
      
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