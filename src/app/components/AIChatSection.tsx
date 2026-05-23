import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, MessageSquare, BarChart3, TrendingUp, ThumbsUp, Heart, Share2, 
  Brain, Zap, Eye, Activity, Smile, Meh, Frown, Users, Target, 
  MessageCircle, ArrowRight, CheckCircle, AlertCircle, Info, 
  Lightbulb, Cpu, Network, GitBranch, Send, Image, Camera, MapPin,
  Clock, TrendingDown, Lock, Shield
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { EnhancedAIChatGrid } from './AIChatSectionEnhanced';

export function AIChatSection() {
  const [activeTab, setActiveTab] = useState<'starters' | 'mood' | 'flow'>('starters');
  const [moodScore, setMoodScore] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeStarter, setActiveStarter] = useState(0);
  const [flowStep, setFlowStep] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { 
        threshold: 0.1, // Trigger when 10% visible (faster trigger)
        rootMargin: '100px' // Start 100px before section enters viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animated mood analysis - optimized interval
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setMoodScore((prev) => (prev >= 92 ? 65 : prev + 9));
      setAnalysisProgress((prev) => (prev >= 100 ? 0 : prev + 6));
    }, 300);
    return () => clearInterval(interval);
  }, [isInView]);

  // Cycling conversation starters
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStarter((prev) => (prev + 1) % 9);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Flow mapping progression
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setFlowStep((prev) => (prev + 1) % 8);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView]);

  // Progressive message reveal with auto-scroll
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev < 12) {
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
              });
            }
          }, 100);
          return prev + 1;
        }
        return prev;
      });
    }, 1200); // 1.2 seconds between messages (was 2s - now much faster!)
    return () => clearInterval(interval);
  }, [isInView]);

  const conversationStarters = [
    {
      text: "I noticed you both love hiking! Have you tried the trail in Richmond Park?",
      personality: "ENFP",
      confidence: 95,
      interests: ["Hiking", "Nature", "Adventure"],
      context: "Shared outdoor interests detected",
      category: "Location-based",
      whyItWorks: "Opens with shared interest and provides specific local context"
    },
    {
      text: "Your profile mentions software engineering - are you working on any exciting projects?",
      personality: "INTJ",
      confidence: 88,
      interests: ["Tech", "Innovation", "Problem-solving"],
      context: "Professional background alignment",
      category: "Career-focused",
      whyItWorks: "Shows genuine interest in their expertise without being intrusive"
    },
    {
      text: "I see you're into photography! What's your favorite type of shot to capture?",
      personality: "ISFP",
      confidence: 91,
      interests: ["Photography", "Art", "Creativity"],
      context: "Creative interests match",
      category: "Hobby-based",
      whyItWorks: "Encourages them to share passion projects and experiences"
    },
    {
      text: "Beautiful evening! Perfect time for the sunset views from here. Are you a regular?",
      personality: "ESFP",
      confidence: 89,
      interests: ["Social", "Local spots", "Atmosphere"],
      context: "Time & weather contextual",
      category: "Time-of-day",
      whyItWorks: "Natural conversation opener tied to current moment and location"
    },
    {
      text: "I'm exploring new coffee spots in the area. Any hidden gems you'd recommend?",
      personality: "INFJ",
      confidence: 92,
      interests: ["Coffee", "Local culture", "Recommendations"],
      context: "Local expertise request",
      category: "Event-specific",
      whyItWorks: "Positions them as the expert and invites ongoing conversation"
    },
    {
      text: "Noticed you're reading [Book Title] - I loved that one! What chapter are you on?",
      personality: "INTP",
      confidence: 94,
      interests: ["Reading", "Literature", "Ideas"],
      context: "Real-time observation match",
      category: "Observation-based",
      whyItWorks: "Shows attentiveness and creates instant common ground"
    },
    {
      text: "This tech conference is amazing! Which sessions are you most excited about?",
      personality: "ENTJ",
      confidence: 87,
      interests: ["Networking", "Learning", "Industry trends"],
      context: "Event-specific networking",
      category: "Event-specific",
      whyItWorks: "Establishes shared context and opens discussion about mutual interests"
    },
    {
      text: "Your dog is adorable! How old? Mine is a rescue and loves making new friends.",
      personality: "ESFJ",
      confidence: 93,
      interests: ["Pets", "Animals", "Outdoor activities"],
      context: "Pet-based connection",
      category: "Observation-based",
      whyItWorks: "Pet owners love talking about their pets - instant bonding opportunity"
    },
    {
      text: "I'm torn between the matcha latte and cold brew. What's your go-to order here?",
      personality: "ENFJ",
      confidence: 90,
      interests: ["Coffee", "Decision-making", "Local knowledge"],
      context: "Casual decision-seeking",
      category: "Location-based",
      whyItWorks: "Low-pressure question that invites helpful engagement and follow-up"
    }
  ];

  const moodMetrics = [
    { label: "Curiosity", value: 88, color: "#60A5FA", icon: Eye },
    { label: "Interest", value: 92, color: "#4ADE80", icon: Sparkles },
    { label: "Engagement", value: 85, color: "#FF7A00", icon: Activity },
    { label: "Empathy", value: 90, color: "#A78BFA", icon: Heart },
    { label: "Enthusiasm", value: 87, color: "#F59E0B", icon: Zap },
    { label: "Authenticity", value: 93, color: "#EC4899", icon: CheckCircle },
    { label: "Humor", value: 78, color: "#10B981", icon: Smile },
    { label: "Reciprocity", value: 89, color: "#8B5CF6", icon: Users },
    { label: "Openness", value: 86, color: "#06B6D4", icon: Brain },
  ];

  const flowPaths = [
    { 
      stage: "Opening", 
      intent: "Ice-breaker Question", 
      response: "Share relatable interest",
      confidence: 94,
      color: "#4ADE80",
      avgTime: "30s",
      tips: "Keep it light, use their profile info",
      avoidance: "Don't over-compliment or be too personal"
    },
    { 
      stage: "Engagement", 
      intent: "Personal Connection", 
      response: "Ask thoughtful follow-up",
      confidence: 89,
      color: "#60A5FA",
      avgTime: "1-2min",
      tips: "Show genuine curiosity about their answer",
      avoidance: "Avoid rapid-fire questions or monologuing"
    },
    { 
      stage: "Discovery", 
      intent: "Shared Values", 
      response: "Share relevant experience",
      confidence: 91,
      color: "#A78BFA",
      avgTime: "2-3min",
      tips: "Find commonalities in interests or values",
      avoidance: "Don't one-up their stories"
    },
    { 
      stage: "Deepening", 
      intent: "Professional/Passion Topics", 
      response: "Explore expertise areas",
      confidence: 87,
      color: "#F59E0B",
      avgTime: "3-5min",
      tips: "Let them showcase knowledge",
      avoidance: "Don't interrogate or dominate"
    },
    { 
      stage: "Connection", 
      intent: "Humor & Personality", 
      response: "Share light humor/anecdote",
      confidence: 85,
      color: "#EC4899",
      avgTime: "2-4min",
      tips: "Be authentic, laugh together",
      avoidance: "Forced jokes or controversial humor"
    },
    { 
      stage: "Rapport", 
      intent: "Vulnerability", 
      response: "Share personal insight",
      confidence: 88,
      color: "#10B981",
      avgTime: "3-5min",
      tips: "Balanced self-disclosure builds trust",
      avoidance: "TMI or trauma dumping"
    },
    { 
      stage: "Future Planning", 
      intent: "Meeting Suggestion", 
      response: "Propose specific activity",
      confidence: 92,
      color: "#8B5CF6",
      avgTime: "1-2min",
      tips: "Be specific: time, place, activity",
      avoidance: "Vague 'sometime' plans"
    },
    { 
      stage: "Transition", 
      intent: "Contact Exchange", 
      response: "Natural contact swap",
      confidence: 90,
      color: "#06B6D4",
      avgTime: "30s-1min",
      tips: "Make it easy and non-pressuring",
      avoidance: "Don't push if they're hesitant"
    },
  ];

  const chatMessages = [
    { 
      id: 1, 
      sender: 'them', 
      text: 'Hey! I noticed we\'re both at the tech meetup. Are you enjoying it?', 
      time: '2:34 PM',
      sentiment: 'positive',
      analysis: 'Opening question detected • Friendly tone • 88% engagement probability',
      moodImpact: +5
    },
    { 
      id: 2, 
      type: 'ai-analysis',
      content: 'Opening question detected • Friendly tone • 88% engagement probability'
    },
    { 
      id: 3,
      type: 'ai-suggestions',
      suggestions: [
        { text: "Yes! The AI panel was fascinating. Are you into machine learning?", confidence: 94 },
        { text: "Absolutely! Have you checked out the networking lounge yet?", confidence: 89 },
        { text: "It's great! I'm particularly interested in the blockchain discussion.", confidence: 85 },
      ]
    },
    { 
      id: 4, 
      sender: 'me', 
      text: 'Yes! The AI panel was fascinating. Are you into machine learning?', 
      time: '2:35 PM',
      aiAssisted: true,
      sentiment: 'engaging'
    },
    { 
      id: 5,
      type: 'mood-update',
      content: 'Conversation mood increased to 92%',
      trend: 'up'
    },
    { 
      id: 6, 
      sender: 'them', 
      text: 'Definitely! I\'m working on a neural network project. Want to grab coffee after and discuss?', 
      time: '2:36 PM',
      sentiment: 'high-interest',
      analysis: 'Meeting invitation detected • High interest signal • 95% connection probability',
      moodImpact: +8
    },
    { 
      id: 7,
      type: 'milestone',
      content: '🎉 First meeting invitation received!',
      milestone: 'meeting-suggested'
    },
    { 
      id: 8,
      type: 'ai-suggestions',
      suggestions: [
        { text: "I'd love to! How about that cafe across the street in 20 minutes?", confidence: 96 },
        { text: "Sounds great! I know a perfect spot nearby. Are you free now?", confidence: 93 },
        { text: "Perfect timing! I was hoping to continue this conversation.", confidence: 90 },
      ]
    },
    { 
      id: 9, 
      sender: 'me', 
      text: 'I\'d love to! How about that cafe across the street in 20 minutes?', 
      time: '2:37 PM',
      aiAssisted: true,
      sentiment: 'enthusiastic'
    },
    { 
      id: 10,
      type: 'mood-update',
      content: 'Connection success probability: 96%',
      trend: 'up'
    },
    { 
      id: 11, 
      sender: 'them', 
      text: 'Perfect! See you there. I\'ll grab us a table by the window 😊', 
      time: '2:37 PM',
      sentiment: 'excited',
      analysis: 'Commitment confirmed • Emoji usage indicates high interest • Meeting secured',
      moodImpact: +10
    },
    { 
      id: 12,
      type: 'success',
      content: 'Real-world connection established! Meeting scheduled in 20 minutes.',
      milestone: 'success'
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-black via-[#0A0A0A] to-black overflow-hidden">
      {/* 3D Vertical Scanlines Background */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Layer 1 - Far back (smaller, dimmer) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`back-${i}`}
            className="absolute top-0 bottom-0 bg-gradient-to-b from-transparent via-[#FF7A00]/30 to-transparent"
            style={{ 
              left: `${10 + i * 10}%`,
              width: '2px',
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 20px #FF7A00, 0 0 40px #FF7A00'
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleY: [0.95, 1, 0.95],
              rotateY: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Layer 2 - Middle depth (medium size, medium brightness) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`mid-${i}`}
            className="absolute top-0 bottom-0 bg-gradient-to-b from-transparent via-[#FF7A00]/60 to-transparent"
            style={{ 
              left: `${8 + i * 10}%`,
              width: '3px',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(50px)',
              boxShadow: '0 0 25px #FF7A00, 0 0 50px #FF7A00, 0 0 75px #FF7A00'
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scaleY: [0.9, 1.05, 0.9],
              rotateY: [-3, 3, -3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Layer 3 - Front (largest, brightest) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`front-${i}`}
            className="absolute top-0 bottom-0 bg-gradient-to-b from-transparent via-[#FF7A00] to-transparent"
            style={{ 
              left: `${6 + i * 10}%`,
              width: '4px',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(100px)',
              boxShadow: '0 0 30px #FF7A00, 0 0 60px #FF7A00, 0 0 90px #FF7A00, 0 0 120px #FF7A00'
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scaleY: [0.85, 1.1, 0.85],
              rotateY: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Scanning light effect moving up and down */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`scan-light-${i}`}
            className="absolute left-0 right-0 h-32 bg-gradient-to-b from-[#FF7A00]/0 via-[#FF7A00]/40 to-[#FF7A00]/0"
            style={{
              left: `${6 + i * 10}%`,
              width: '4px',
              filter: 'blur(8px)',
              boxShadow: '0 0 40px #FF7A00'
            }}
            animate={{
              y: ['-20%', '120%'],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}

        {/* Horizontal sweep for depth */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 122, 0, 0.1) 50%, transparent 100%)',
            height: '200px',
          }}
          animate={{
            y: ['0%', '100%', '0%'],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Perspective grid lines at bottom for depth */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 opacity-30"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 20px,
                #FF7A00 20px,
                #FF7A00 21px
              )
            `,
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom',
            boxShadow: '0 -50px 100px rgba(255, 122, 0, 0.2)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Revolutionary Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF7A00]/20 to-purple-500/20 border border-[#FF7A00]/40 rounded-full mb-6"
            animate={{
              boxShadow: [
                '0 0 0px #FF7A00',
                '0 0 30px #FF7A0060',
                '0 0 0px #FF7A00'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-[#FF7A00]">Revolutionary Conversation Intelligence</span>
            <motion.div
              className="w-2 h-2 bg-[#FF7A00] rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">AI-Powered Chat Intelligence Engine</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-4xl mx-auto text-lg">
            <span className="text-[#FF7A00]">OpenAI GPT-4o integration</span> with <span className="text-purple-400">MBTI personality analysis</span>, 
            <span className="text-blue-400"> real-time mood detection</span>, and <span className="text-green-400">AI-guided conversation flows</span>. 
            The most advanced conversation platform ever built.
          </p>
        </motion.div>

        {/* Key Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: 'AI Response', value: '<2s', icon: Zap, color: '#FF7A00' },
            { label: 'Accuracy', value: '95%', icon: Target, color: '#4ADE80' },
            { label: 'Personality Types', value: '16', icon: Users, color: '#A78BFA' },
            { label: 'Mood Dimensions', value: '5', icon: Activity, color: '#60A5FA' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl p-4 text-center"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-2xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Interactive Dashboard */}
        <EnhancedAIChatGrid
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          moodScore={moodScore}
          analysisProgress={analysisProgress}
          activeStarter={activeStarter}
          flowStep={flowStep}
          visibleMessages={visibleMessages}
          chatEndRef={chatEndRef}
          chatContainerRef={chatContainerRef}
          conversationStarters={conversationStarters}
          moodMetrics={moodMetrics}
          flowPaths={flowPaths}
          chatMessages={chatMessages}
        />

        {/* Competitive Advantage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FF7A00]/10 via-purple-500/5 to-blue-500/10 border border-[#FF7A00]/30 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-white mb-4">Revolutionary Market Position</h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              The only platform combining AI conversation intelligence with real-time proximity matching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "WhatsApp/Telegram", value: "No AI", color: "#EF4444" },
              { label: "Instagram/TikTok", value: "No Conversation AI", color: "#F59E0B" },
              { label: "LinkedIn", value: "No Real-Time AI", color: "#F59E0B" },
              { label: "Proxima", value: "Full AI Suite ✓", color: "#4ADE80" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-xl p-6 text-center"
              >
                <div className="text-sm text-gray-400 mb-2">{item.label}</div>
                <div className="text-lg" style={{ color: item.color }}>{item.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Architecture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-center mb-8 text-white">Technical Architecture</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "OpenAI",
                description: "Advanced language model for contextual conversation generation",
                metrics: ["<2s response", "95% accuracy", "16 personality types"],
                icon: Cpu,
                color: "#FF7A00"
              },
              {
                title: "Real-Time Analysis",
                description: "Live mood detection and sentiment analysis across 5 emotional dimensions",
                metrics: ["<1.5s latency", "5 mood metrics", "92% precision"],
                icon: Activity,
                color: "#4ADE80"
              },
              {
                title: "Flow Intelligence",
                description: "AI-guided conversation paths with intent classification and response guidance",
                metrics: ["<3s mapping", "4 flow stages", "89% success rate"],
                icon: GitBranch,
                color: "#A78BFA"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-2xl p-6 hover:border-[#FF7A00] transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}40`, borderWidth: '1px' }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h4 className="text-white">{item.title}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.metrics.map((metric: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-gray-500">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}