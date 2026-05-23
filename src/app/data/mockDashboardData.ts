// Mock data for Zones Business Dashboard
export const COLORS = ['#FF7A00', '#10b981', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'];

// Analytics data
export const trafficData = [
  { time: '9AM', visitors: 12, engaged: 8 },
  { time: '10AM', visitors: 28, engaged: 22 },
  { time: '11AM', visitors: 45, engaged: 38 },
  { time: '12PM', visitors: 68, engaged: 61 },
  { time: '1PM', visitors: 72, engaged: 65 },
  { time: '2PM', visitors: 54, engaged: 48 },
  { time: '3PM', visitors: 38, engaged: 32 },
  { time: '4PM', visitors: 42, engaged: 36 },
  { time: '5PM', visitors: 58, engaged: 52 }
];

export const dwellTimeData = [
  { name: '<5min', value: 15, color: '#ef4444' },
  { name: '5-15min', value: 35, color: '#f59e0b' },
  { name: '15-30min', value: 28, color: '#10b981' },
  { name: '30min+', value: 22, color: '#3b82f6' }
];

export const sentimentData = [
  { category: 'Service', positive: 85, negative: 15 },
  { category: 'Ambiance', positive: 92, negative: 8 },
  { category: 'Food', positive: 78, negative: 22 },
  { category: 'Value', positive: 88, negative: 12 }
];

export const intentMixData = [
  { intent: 'Social', value: 45, color: '#10b981' },
  { intent: 'Professional', value: 35, color: '#3b82f6' },
  { intent: 'Dating', value: 12, color: '#ec4899' },
  { intent: 'Networking', value: 8, color: '#a855f7' }
];

export const comfortTrendsData = [
  { day: 'Mon', promised: 85, actual: 88 },
  { day: 'Tue', promised: 85, actual: 84 },
  { day: 'Wed', promised: 85, actual: 87 },
  { day: 'Thu', promised: 85, actual: 86 },
  { day: 'Fri', promised: 85, actual: 90 },
  { day: 'Sat', promised: 85, actual: 89 },
  { day: 'Sun', promised: 85, actual: 85 }
];

export const socialImpactData = [
  { stage: 'Entry', value: 100, color: '#FF7A00' },
  { stage: 'Engagement', value: 87, color: '#10b981' },
  { stage: 'Offer Use', value: 64, color: '#3b82f6' },
  { stage: 'Return Visit', value: 45, color: '#a855f7' }
];

export const vibeRadarData = [
  { category: 'Energy', value: 78 },
  { category: 'Comfort', value: 92 },
  { category: 'Focus', value: 65 },
  { category: 'Social', value: 85 },
  { category: 'Professional', value: 70 }
];

// Predictive Traffic Forecasting
export const predictiveTrafficData = [
  { time: '6PM', actual: 58, predicted: 62, confidence: 85 },
  { time: '7PM', predicted: 71, confidence: 82 },
  { time: '8PM', predicted: 85, confidence: 78 },
  { time: '9PM', predicted: 92, confidence: 75 },
  { time: '10PM', predicted: 78, confidence: 70 }
];

// Competitive Benchmarking
export const benchmarkData = [
  { metric: 'Avg. Dwell Time', you: 18, competitor: 14, industry: 12 },
  { metric: 'Engagement Rate', you: 87, competitor: 72, industry: 65 },
  { metric: 'Return Rate', you: 45, competitor: 38, industry: 32 },
  { metric: 'Revenue/User', you: 28, competitor: 24, industry: 20 }
];

// A/B Testing Campaigns
export const abTestCampaigns = [
  { id: 1, name: 'Happy Hour 25% Off', variantA: 34, variantB: 41, winner: 'B', confidence: 94 },
  { id: 2, name: 'Free Coffee Upgrade', variantA: 28, variantB: 31, winner: 'B', confidence: 76 },
  { id: 3, name: 'Loyalty Points 2x', variantA: 52, variantB: 48, winner: 'A', confidence: 68 }
];

// Customer Journey Stages
export const journeyData = [
  { stage: 'Discovery', users: 850, conversion: 72, avgTime: '2m' },
  { stage: 'Consideration', users: 612, conversion: 58, avgTime: '5m' },
  { stage: 'Entry', users: 355, conversion: 89, avgTime: '1m' },
  { stage: 'Engagement', users: 316, conversion: 64, avgTime: '18m' },
  { stage: 'Conversion', users: 202, conversion: 45, avgTime: '3m' },
  { stage: 'Advocacy', users: 91, conversion: 100, avgTime: '-' }
];

// Retention Cohorts
export const cohortData = [
  { week: 'Week 1', retained: 100, active: 100, revenue: 2847 },
  { week: 'Week 2', retained: 68, active: 72, revenue: 2156 },
  { week: 'Week 3', retained: 54, active: 61, revenue: 1842 },
  { week: 'Week 4', retained: 47, active: 55, revenue: 1628 }
];

// Demographic Breakdown
export const demographicData = [
  { segment: '18-24', percentage: 18, avgSpend: 18, engagement: 78 },
  { segment: '25-34', percentage: 42, avgSpend: 32, engagement: 87 },
  { segment: '35-44', percentage: 25, avgSpend: 41, engagement: 82 },
  { segment: '45+', percentage: 15, avgSpend: 38, engagement: 76 }
];

// Time-of-Day Heatmap
export const heatmapData = [
  { hour: '8AM', mon: 12, tue: 15, wed: 18, thu: 14, fri: 22, sat: 8, sun: 5 },
  { hour: '10AM', mon: 28, tue: 32, wed: 35, thu: 30, fri: 42, sat: 38, sun: 25 },
  { hour: '12PM', mon: 68, tue: 72, wed: 75, thu: 70, fri: 85, sat: 78, sun: 62 },
  { hour: '2PM', mon: 54, tue: 58, wed: 60, thu: 56, fri: 68, sat: 72, sun: 58 },
  { hour: '4PM', mon: 42, tue: 45, wed: 48, thu: 44, fri: 58, sat: 65, sun: 52 },
  { hour: '6PM', mon: 58, tue: 62, wed: 65, thu: 60, fri: 78, sat: 85, sun: 68 },
  { hour: '8PM', mon: 35, tue: 38, wed: 40, thu: 42, fri: 68, sat: 92, sun: 45 }
];

// Revenue Attribution
export const revenueSourceData = [
  { source: 'Push Notifications', amount: 842, percentage: 32, roi: 420 },
  { source: 'Micro-Events', amount: 624, percentage: 24, roi: 380 },
  { source: 'Loyalty Program', amount: 518, percentage: 20, roi: 290 },
  { source: 'Featured Zone', amount: 414, percentage: 16, roi: 180 },
  { source: 'Organic', amount: 208, percentage: 8, roi: 100 }
];

// Sentiment Topic Clustering
export const sentimentTopics = [
  { topic: 'Coffee Quality', mentions: 145, positive: 92, neutral: 6, negative: 2 },
  { topic: 'Atmosphere', mentions: 128, positive: 88, neutral: 10, negative: 2 },
  { topic: 'Staff Service', mentions: 112, positive: 85, neutral: 12, negative: 3 },
  { topic: 'WiFi Speed', mentions: 98, positive: 72, neutral: 18, negative: 10 },
  { topic: 'Seating Comfort', mentions: 87, positive: 90, neutral: 8, negative: 2 },
  { topic: 'Pricing', mentions: 76, positive: 68, neutral: 22, negative: 10 }
];

// Churn Risk Indicators
export const churnRiskUsers = [
  { name: 'Alex M.', lastVisit: '12 days ago', visitFreq: -45, risk: 'high', ltv: 324 },
  { name: 'Sarah K.', lastVisit: '8 days ago', visitFreq: -28, risk: 'medium', ltv: 198 },
  { name: 'Mike R.', lastVisit: '6 days ago', visitFreq: -15, risk: 'low', ltv: 156 }
];

// AI Opportunity Detection
export const opportunities = [
  {
    id: 1,
    title: 'Peak Thursday Rush Untapped',
    impact: '$420/week',
    confidence: 92,
    action: 'Launch 3-5pm Thursday promotion',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Professional Crowd Underserved',
    impact: '$280/week',
    confidence: 85,
    action: 'Add meeting room micro-events',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Weekend Morning Gap',
    impact: '$150/week',
    confidence: 78,
    action: 'Brunch special promotion',
    priority: 'medium'
  }
];

// Safety Incident Timeline
export const safetyIncidents = [
  { date: 'Nov 15', type: 'Safe Seat Alert', severity: 'low', resolved: true, responseTime: '3m' },
  { date: 'Nov 12', type: 'Escort Request', severity: 'low', resolved: true, responseTime: '5m' },
  { date: 'Nov 8', type: 'Venue Shield Alert', severity: 'medium', resolved: true, responseTime: '2m' }
];
