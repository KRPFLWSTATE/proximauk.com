import { motion } from 'motion/react';
import { Radar, Wifi, Bluetooth, Radio, Compass, Gauge, Zap, Filter, Target, Brain, Crosshair, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const sensorData = [
  { name: 'GPS', icon: Radar, description: 'Satellite positioning', trustScore: 85, range: '1-5m accuracy', color: '#FF7A00', delay: 0 },
  { name: 'Wi-Fi', icon: Wifi, description: 'Indoor positioning', trustScore: 92, range: '5-15m accuracy', color: '#FF8C1A', delay: 0.1 },
  { name: 'BLE Beacons', icon: Bluetooth, description: 'Bluetooth signals', trustScore: 88, range: '5-50m range', color: '#FF9E33', delay: 0.2 },
  { name: 'UWB', icon: Radio, description: 'Ultra-Wideband', trustScore: 95, range: '10-30cm accuracy', color: '#FFB04D', delay: 0.3 },
  { name: 'IMU', icon: Compass, description: 'Motion tracking', trustScore: 90, range: 'Activity tracking', color: '#FFC266', delay: 0.4 },
  { name: 'Barometer', icon: Gauge, description: 'Floor detection', trustScore: 87, range: '1-3m vertical', color: '#FFD480', delay: 0.5 },
];

const preProcessingModels = [
  { 
    id: 1, 
    name: 'Sensor Fusion Engine', 
    icon: Zap,
    description: 'Cleans and calibrates sensor data, removing noise and outliers to ensure accuracy',
    color: '#00D9FF',
  },
  { 
    id: 2, 
    name: 'Kalman Filtering System', 
    icon: Filter,
    description: 'Predicts and estimates your precise position by understanding movement patterns',
    color: '#00B8FF',
  },
  { 
    id: 3, 
    name: 'Context Awareness AI', 
    icon: Brain,
    description: 'Detects whether you\'re indoors or outdoors and identifies your current activity',
    color: '#0099FF',
  },
];

const postProcessingModels = [
  { 
    id: 4, 
    name: 'Proximity Detection', 
    icon: Target,
    description: 'Calculates your distance from others across 4 zones while protecting your privacy',
    color: '#6C63FF',
  },
  { 
    id: 5, 
    name: 'Behavioral Analysis', 
    icon: Crosshair,
    description: 'Predicts where you\'re headed and finds social opportunities along the way',
    color: '#9D93FF',
  },
  { 
    id: 6, 
    name: 'Intelligence Layer', 
    icon: MapPin,
    description: 'Sends precise location data to our 7-Layer AI Intelligence System for personality-based matching',
    color: '#C7C0FF',
  },
];

const sensors = [
  { name: 'GPS', icon: Radar, description: 'Satellite positioning', accuracy: '~5m' },
  { name: 'Wi-Fi', icon: Wifi, description: 'Indoor positioning', accuracy: '~3m' },
  { name: 'BLE', icon: Bluetooth, description: 'Bluetooth Low Energy', accuracy: '~1m' },
  { name: 'UWB', icon: Radio, description: 'Ultra-Wideband', accuracy: '<1m' },
  { name: 'IMU', icon: Compass, description: 'Motion tracking', accuracy: 'Direction' },
  { name: 'Barometer', icon: Gauge, description: 'Floor detection', accuracy: 'Altitude' },
];

// Sensor Card Component
function SensorCard({ sensor }: { sensor: typeof sensorData[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate fluctuating trust score range (±4% from base)
  const minScore = sensor.trustScore - 4;
  const maxScore = sensor.trustScore + 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: sensor.delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-b from-black/90 to-black/70 border border-[#FF7A00]/30 rounded-lg p-4 text-center group relative overflow-hidden"
      style={{
        boxShadow: isHovered ? `0 0 20px ${sensor.color}30` : 'none',
        borderColor: isHovered ? sensor.color : '#FF7A0050'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Data stream bars in background */}
      <div className="absolute inset-0 flex justify-around items-end px-2 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-t-full"
            style={{ backgroundColor: sensor.color }}
            animate={{
              height: ['10%', `${20 + Math.random() * 60}%`, '10%'],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Horizontal scanner line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${sensor.color}, transparent)`,
          boxShadow: `0 0 8px ${sensor.color}`
        }}
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: sensor.delay
        }}
      />
      
      {/* Corner brackets */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
          style={{ borderColor: sensor.color }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
          style={{ borderColor: sensor.color }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
          style={{ borderColor: sensor.color }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
          style={{ borderColor: sensor.color }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
        />
      </div>
      
      <motion.div
        className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 relative border"
        style={{ 
          backgroundColor: `${sensor.color}15`,
          borderColor: `${sensor.color}50`
        }}
        animate={{
          borderColor: isHovered ? [sensor.color, `${sensor.color}50`, sensor.color] : `${sensor.color}50`
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Orbiting dots */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: sensor.color,
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                x: 20,
                y: -0.5
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: sensor.color,
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                x: 20,
                y: -0.5
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />
          </>
        )}
        
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <sensor.icon className="w-6 h-6" style={{ color: sensor.color }} />
        </motion.div>
      </motion.div>
      
      <h4 className="text-white mb-1 relative z-10">{sensor.name}</h4>
      <p className="text-xs text-gray-400 mb-1 relative z-10">{sensor.description}</p>
      
      {/* Range Display with digital look */}
      <motion.div 
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/70 rounded mb-2 border relative overflow-hidden"
        style={{ borderColor: `${sensor.color}40` }}
        animate={{
          borderColor: [`${sensor.color}40`, `${sensor.color}80`, `${sensor.color}40`]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <span className="text-[10px] text-gray-400 relative z-10 font-mono">RANGE:</span>
        <motion.span 
          className="text-[10px] relative z-10 font-mono" 
          style={{ color: sensor.color }}
        >
          {sensor.range}
        </motion.span>
      </motion.div>
      
      {/* Digital Trust Score Display */}
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-1 mb-1">
          <div className="text-xs text-gray-400 font-mono">ADJUSTING TRUST</div>
          <motion.div
            className="flex gap-0.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1"
                style={{ backgroundColor: sensor.color }}
                animate={{
                  opacity: [0.2, 1, 0.2]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
        
        <div className="h-2 bg-black/50 rounded overflow-hidden relative border" style={{ borderColor: `${sensor.color}30` }}>
          <motion.div
            className="h-full relative"
            style={{ 
              backgroundColor: sensor.color,
              boxShadow: `0 0 10px ${sensor.color}60`
            }}
            animate={{ 
              width: [
                `${minScore}%`,
                `${sensor.trustScore}%`,
                `${maxScore}%`,
                `${sensor.trustScore}%`,
                `${minScore}%`,
                `${sensor.trustScore}%`,
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }}
          >
            {/* Grid overlay on bar */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
              }}
            />
          </motion.div>
          
          {/* Scanning light */}
          <motion.div
            className="absolute inset-y-0 w-1"
            style={{ 
              backgroundColor: 'white',
              boxShadow: `0 0 10px ${sensor.color}`
            }}
            animate={{
              x: ['0%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div 
          className="text-xs mt-1 font-mono tabular-nums" 
          style={{ color: sensor.color }}
        >
          <motion.span
            key={Math.floor(Date.now() / 1000)}
          >
            {sensor.trustScore - 2}% - {sensor.trustScore + 2}%
          </motion.span>
        </div>
        
        <div className="text-[10px] text-gray-500 mt-0.5 font-mono uppercase tracking-wider">
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            Live Data
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

// Pipeline Model Card Component
function PipelineModelCard({ model, index }: { model: typeof preProcessingModels[0] | typeof postProcessingModels[0], index: number }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Connecting line to next card (except for last card) */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#FF7A00] to-transparent -translate-y-1/2 z-0">
          <motion.div
            className="h-full bg-[#FF7A00]"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ width: '50%' }}
          />
        </div>
      )}

      <div 
        className="relative bg-gradient-to-br from-black to-[#0D0D0D] border-2 rounded-lg p-6 h-full transition-all duration-300"
        style={{ 
          borderColor: isActive ? model.color : `${model.color}40`,
          boxShadow: isActive ? `0 0 30px ${model.color}40` : 'none'
        }}
      >
        {/* Model number badge */}
        <motion.div
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-black"
          style={{ borderColor: model.color, color: model.color }}
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {model.id}
        </motion.div>

        {/* Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 relative"
          style={{ backgroundColor: `${model.color}20` }}
          animate={{ 
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
        >
          <model.icon className="w-8 h-8" style={{ color: model.color }} />
          
          {/* Processing indicator */}
          {isActive && (
            <motion.div
              className="absolute -inset-1 rounded-xl border-2"
              style={{ borderColor: model.color }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.div>

        <h4 className="text-white mb-2">{model.name}</h4>
        <p className="text-sm text-gray-400">{model.description}</p>

        {/* Processing status indicator */}
        <div className="mt-4 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: model.color }}
            animate={{ 
              opacity: isActive ? [1, 0.3, 1] : 1,
              scale: isActive ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
          />
          <span className="text-xs text-gray-500">
            {isActive ? 'Processing...' : 'Ready'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function UnderTheHoodSection() {
  return (
    <section id="features" className="relative py-24 bg-black overflow-hidden">
      {/* Circuit Background */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1754603957757-52cbda751ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBjaXJjdWl0fGVufDF8fHx8MTc2MDk2MjE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Circuit"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-black"
            style={{
              width: Math.random() > 0.5 ? '100%' : '2px',
              height: Math.random() > 0.5 ? '2px' : '100%',
              left: Math.random() > 0.5 ? 0 : `${Math.random() * 100}%`,
              top: Math.random() > 0.5 ? `${Math.random() * 100}%` : 0,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">How We Aim to Achieve Unparalleled Precision</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Our AI Processing Core Running Locally — A Sensor Pipeline That Utilises <span className="text-[#00D4FF] font-bold">Sensor Fusion</span> to Triangulate Your Exact Position
          </p>
        </motion.div>

        {/* Sensor Data Collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-white mb-2">Step 1: Sensor Data Collection</h3>
            <p className="text-sm text-gray-400">Intelligent hand-off between sensors with dynamic trust scoring</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {sensorData.map((sensor, index) => (
              <SensorCard key={index} sensor={sensor} />
            ))}
          </div>

          {/* Data Flow Indicator */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5L12 19M12 19L6 13M12 19L18 13" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className="text-[#FF7A00] text-sm">Data flows into processing pipeline</span>
          </motion.div>
        </motion.div>

        {/* Processing Pipeline */}
        <div className="mb-20">
          {/* Pre-Processing Stage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-white mb-2">Step 2: Pre-Processing AI Models</h3>
              <p className="text-sm text-gray-400">Clean, combine, and contextualize raw sensor data</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {preProcessingModels.map((model, index) => (
                <PipelineModelCard key={model.id} model={model} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Pipeline Flow Animation */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#FF7A00]"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
            <span className="text-[#FF7A00] text-sm mx-4">Processing...</span>
            <motion.div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#FF7A00]"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2 + 0.5
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Post-Processing Stage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-white mb-2">Step 3: Post-Processing & Data Routing</h3>
              <p className="text-sm text-gray-400">Process location data and direct it to the relevant AI Intelligence layers for matching</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {postProcessingModels.map((model, index) => (
                <PipelineModelCard key={model.id} model={model} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Final Output */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#FF7A00] to-[#FF5500] rounded-lg p-8 text-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <MapPin className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-white mb-2">Final Output: Triangulated Location</h3>
                <p className="text-white/90 text-sm">Sub-meter accuracy with real-time updates</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-xs">Precision: &lt;1m accuracy</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Future R&D Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <div className="max-w-4xl mx-auto relative">
              {/* Futuristic border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-black via-purple-950/30 to-black border-2 border-purple-500/50 rounded-xl p-8 md:p-12 overflow-hidden">
                {/* Animated grid background */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, #A855F7 0px, transparent 1px, transparent 20px),
                        repeating-linear-gradient(90deg, #A855F7 0px, transparent 1px, transparent 20px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '20px 20px']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}

                <div className="relative z-10">
                  {/* Future Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full mb-6"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(168, 85, 247, 0.3)',
                        '0 0 20px rgba(168, 85, 247, 0.6)',
                        '0 0 10px rgba(168, 85, 247, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-purple-300 text-sm uppercase tracking-wider">Future Vision</span>
                  </motion.div>

                  <h3 className="text-white mb-4 text-2xl md:text-3xl bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                    R&D Roadmap: Pioneering the AR Social Frontier
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    As we progress and <span className="text-purple-400 font-semibold">secure funding in later rounds</span>, we envision establishing a dedicated <span className="text-pink-400 font-semibold">Research & Development department</span>. This elite team will push the boundaries of <span className="text-purple-300">spatial mapping technology</span> and develop proprietary innovations that position Proxima as the <span className="text-pink-300 font-semibold">undisputed pioneer in AR social networking</span>.
                  </p>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    We are positioned at a unique convergence—<span className="text-purple-400 font-semibold">not only forming a bridge for authentic digital interactions</span>, but also standing at the <span className="text-pink-400 font-semibold">frontline of innovation</span> as a bridge where <span className="text-purple-300">authenticity in the real world and the digital world blend seamlessly</span>. This dual role positions us to revolutionize connection across both realms.
                  </p>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    The implications are <span className="text-purple-400 font-semibold">endless</span>—from revolutionizing how humans interact in mixed reality environments to opening doors across <span className="text-pink-400">entertainment, enterprise, education, and beyond</span>. Once perfected, this technology will not merely enhance social connections; it will <span className="text-purple-300 font-semibold">redefine the fabric of human interaction in a spatially-aware world</span>.
                  </p>

                  {/* Future tech indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                      { label: 'Spatial Mapping', icon: '🗺️' },
                      { label: 'AR Integration', icon: '👓' },
                      { label: 'Multi-Industry', icon: '🌐' },
                      { label: 'Future Tech', icon: '🚀' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="bg-black/40 border border-purple-500/30 rounded-lg p-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ 
                          borderColor: 'rgba(168, 85, 247, 0.8)',
                          boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                        }}
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-xs text-purple-300">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Emphasis banner */}
                  <motion.div
                    className="mt-8 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-l-4 border-purple-500 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-purple-200 text-sm italic">
                      <span className="font-semibold text-purple-300">Note:</span> This is a long-term strategic vision, not part of our current pre-seed roadmap. Our immediate focus remains on perfecting core location-based social networking features.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}