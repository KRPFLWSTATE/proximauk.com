import { motion } from 'motion/react';
import { DollarSign, Award, Mail } from 'lucide-react';
import { Button } from './ui/button';

const milestones = [
  { timeline: 'Month 1', goal: 'Hiring CTO, devs, and support staff; office and infrastructure setup', metric: 'Foundation' },
  { timeline: 'Months 2-4', goal: 'Refining MVP, complete UI overhaul, infrastructure optimization, adding missing features', metric: 'Development' },
  { timeline: 'Months 4-6', goal: 'Testing, bug fixes, performance optimization, preparing for scalability', metric: 'Refinement' },
  { timeline: 'Months 6-8', goal: 'Closed invite-only beta testing and adjusting to user feedback', metric: 'Beta Testing' },
  { timeline: 'Months 8-10', goal: 'Pilot launches in small groups, monitoring and optimizing', metric: 'Soft Launch' },
  { timeline: 'Months 10-14', goal: 'Seed Round Process Bgeins, Large-scale expansion with large communities and significant traction', metric: 'Scale' },
  { timeline: 'Months 14-16', goal: 'Final product optimizations before maintenance phase', metric: 'Growth Ready' },
];

export function TheAskSection() {
  return (
    <section id="ask" className="relative py-24 bg-gradient-to-b from-[#0D0D0D] to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF8C1A] mb-6"
          >
            <DollarSign className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">The Ask</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-4 text-[#FF7A00]" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
              We are raising £750K
            </div>
            <p className="text-gray-400 text-lg mb-2">
              Pre-Seed funding for a 14 month runway
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
              <Award className="w-4 h-4" />
              <span>SEIS/EIS Eligible</span>
            </div>
          </div>
        </motion.div>

        {/* Funding Allocation */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-black to-[#0D0D0D] border-2 border-[#FF7A00]/30 rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A] p-6">
              <h3 className="text-white text-center">14-Month Investment Breakdown — Use of Funds</h3>
            </div>

            <div className="p-8">
              {/* People Costs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FF7A00]/20 to-transparent border-l-4 border-[#FF7A00] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">People Costs</h4>
                    <div className="text-[#FF7A00] text-xl">£515,863</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-4">
                  {[
                    { label: 'Founding Team', amount: '£217,825', desc: '4 founders: annual equivalent £42k each for 14 months incl. base comp. + founder risk premium' },
                    { label: 'CTO', amount: '£56,800', desc: 'Chief Technology Officer, lead tech vision, product road mapping, team management' },
                    { label: 'Admin Assistant', amount: '£33,133', desc: 'Day-to-day UK ops, scheduling, office management' },
                    { label: 'Marketing Associate', amount: '£33,133', desc: 'Business development, growth marketing, campaigns' },
                    { label: 'Full Stack Developer', amount: '£51,917', desc: 'UK-based senior, responsible for QA of remote development work, app integration' },
                    { label: 'Outsourced Staff', amount: '£41,267', desc: '2 devs, 1 QA tester, 1 content producer, 2 backend developers, 1 compliance officer (remotely outsourced for cost efficiency)' },
                    { label: 'Employer NIC', amount: '£67,441', desc: 'National insurance on founder and staff salaries' },
                    { label: 'Employer Pension', amount: '£13,183', desc: 'Employer pension contributions for UK team under auto-enrolment rules' },
                    { label: 'Employers\' Liability', amount: '£140', desc: 'Statutory employers\' liability cover' },
                    { label: 'Professional Indemnity', amount: '£351', desc: 'PI cover for advice, product and contract risk' },
                    { label: 'Cyber Liability', amount: '£491', desc: 'Cyber liability insurance for data/cyber incidents' },
                    { label: 'Public Liability', amount: '£70', desc: 'Public liability cover for events and in-person activity' },
                    { label: 'Tax (PT)', amount: '£112', desc: 'IFI on all insurance policies' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="bg-black/30 border border-[#FF7A00]/20 rounded-lg p-3 hover:border-[#FF7A00]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm">{item.label}</span>
                        <span className="text-[#FF7A00] font-semibold text-sm">{item.amount}</span>
                      </div>
                      <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Operations Costs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FF8C1A]/20 to-transparent border-l-4 border-[#FF8C1A] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">Operations Costs</h4>
                    <div className="text-[#FF8C1A] text-xl">£93,871</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-4">
                  {[
                    { label: 'Office Rent', amount: '£84,240', desc: 'WeWork/Regus, 10-person private office for UK HQ, prime location for scale & recruitment' },
                    { label: 'Outsourced Office Rent', amount: '£4,617', desc: 'Co-Lankan team office for remote developers and QA personnel' },
                    { label: 'Petty Cash Float', amount: '£5,014', desc: 'Buffer for ad hoc office supplies, small emergencies, daily office costs' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      className="bg-black/30 border border-[#FF8C1A]/20 rounded-lg p-3 hover:border-[#FF8C1A]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm">{item.label}</span>
                        <span className="text-[#FF8C1A] font-semibold text-sm">{item.amount}</span>
                      </div>
                      <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Capex / IT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FF9E33]/20 to-transparent border-l-4 border-[#FF9E33] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">Capex / IT Costs</h4>
                    <div className="text-[#FF9E33] text-xl">£17,445</div>
                  </div>
                </div>
                <div className="ml-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-black/30 border border-[#FF9E33]/20 rounded-lg p-3 hover:border-[#FF9E33]/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">PC Hardware</span>
                      <span className="text-[#FF9E33] font-semibold text-sm">£17,445</span>
                    </div>
                    <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Laptops, monitors, mobile, backup storage.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Marketing / Go-To-Market */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FFB04D]/20 to-transparent border-l-4 border-[#FFB04D] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">Marketing / Go-To-Market Costs</h4>
                    <div className="text-[#FFB04D] text-xl">£70,000</div>
                  </div>
                </div>
                <div className="ml-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-black/30 border border-[#FFB04D]/20 rounded-lg p-3 hover:border-[#FFB04D]/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">Paid Pilot Awareness Cost</span>
                      <span className="text-[#FFB04D] font-semibold text-sm">£70,000</span>
                    </div>
                    <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">14-month "Sprint-seeded" campaign in 2 UK universities, campus awareness, brand, UGC.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Governance / Compliance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FFC266]/20 to-transparent border-l-4 border-[#FFC266] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">Governance / Compliance Costs</h4>
                    <div className="text-[#FFC266] text-xl">£13,680</div>
                  </div>
                </div>
                <div className="ml-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="bg-black/30 border border-[#FFC266]/20 rounded-lg p-3 hover:border-[#FFC266]/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">Legal and Accounting</span>
                      <span className="text-[#FFC266] font-semibold text-sm">£13,680</span>
                    </div>
                    <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Incorporation services, contracts, privacy, IP, bookkeeping, compliance, SEIS/EIS.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Product / Cloud Infrastructure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FFD480]/20 to-transparent border-l-4 border-[#FFD480] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">Product / Cloud Infra Costs</h4>
                    <div className="text-[#FFD480] text-xl">£30,998</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-4">
                  {[
                    { label: 'Hosting Cost', amount: '£11,031', desc: 'AWS hosting for projected 20,000 beta users, load testing, auto-scaling, MRE' },
                    { label: 'Network Operational Cost', amount: '£1,419', desc: 'Business connectivity (Broadband, VPN, telephony) for UK + offshore hubs' },
                    { label: 'Software Subscriptions', amount: '£5,516', desc: 'Product SaaS: Jotspot, Atlassian, Figma, Notion, Slack, Github, CRM, excludes security' },
                    { label: 'API Cost', amount: '£13,032', desc: 'API usage for free beta cohort (OpenAI, Maps, Auth), AI personalization, location, socials' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                      className="bg-black/30 border border-[#FFD480]/20 rounded-lg p-3 hover:border-[#FFD480]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm">{item.label}</span>
                        <span className="text-[#FFD480] font-semibold text-sm">{item.amount}</span>
                      </div>
                      <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* People Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-[#FF7A00]/20 to-transparent border-l-4 border-[#FF7A00] p-4 rounded-r-lg mb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-lg">People Development Costs</h4>
                    <div className="text-[#FF7A00] text-xl">£7,500</div>
                  </div>
                </div>
                <div className="ml-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="bg-black/30 border border-[#FF7A00]/20 rounded-lg p-3 hover:border-[#FF7A00]/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300 text-sm">Employee Training Programs</span>
                      <span className="text-[#FF7A00] font-semibold text-sm">£7,500</span>
                    </div>
                    <p className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Four targeted upskilling (includes: HR ethics, inclusivity, compliance, technical leadership).</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Summary Totals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 pt-6 border-t-2 border-[#FF7A00]/30"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-[#FF7A00]/10 to-transparent border-2 border-[#FF7A00]/50 rounded-lg p-6 text-center">
                    <div className="text-gray-400 text-sm mb-2">Total Spend</div>
                    <div className="text-[#FF7A00] text-3xl">£744,180</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#FF7A00]/20 to-transparent border-2 border-[#FF7A00] rounded-lg p-6 text-center shadow-[0_0_30px_rgba(255,122,0,0.3)]">
                    <div className="text-gray-300 text-sm mb-2">Total Investment</div>
                    <div className="text-white text-3xl">£750,000</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/10 to-transparent border-2 border-green-500/50 rounded-lg p-6 text-center">
                    <div className="text-gray-400 text-sm mb-2">Remaining Funds</div>
                    <div className="text-green-400 text-3xl">£5,820</div>
                    <div className="text-gray-500 text-xs mt-1">Buffer for contingencies (Note 04)</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Convergence Point Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 border-2 border-purple-500/50 rounded-lg p-8 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
                className="w-full h-full"
              />
            </div>

            <div className="relative z-10">
              <p className="text-gray-200 leading-relaxed mb-4">
                Proxima sits at the <span className="text-purple-400 font-semibold">convergence point</span> of several <span className="text-pink-400 font-semibold">multi-billion-dollar industries</span>—each deeply fragmented yet united by a shared systemic failure: the inability to translate proximity into authentic meaningful human connection. By seamlessly integrating <span className="text-purple-300">social discovery, professional networking, local engagement with a touch of gamification, and spatial computing</span> into a single engine, we unlock parallel markets simultaneously.
              </p>
              <p className="text-gray-200 leading-relaxed">
                This rare unification of problem and platform dramatically expands our TAM, amplifies network effects, and positions Proxima to scale into a category-defining <motion.span
                  className="text-yellow-400 font-bold text-xl"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(250, 204, 21, 0.5)',
                      '0 0 20px rgba(250, 204, 21, 0.8)',
                      '0 0 10px rgba(250, 204, 21, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >Unicorn</motion.span>.
              </p>
            </div>

            {/* Decorative corners */}
            {[
              { top: 0, left: 0, rotate: 0 },
              { top: 0, right: 0, rotate: 90 },
              { bottom: 0, right: 0, rotate: 180 },
              { bottom: 0, left: 0, rotate: 270 }
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 border-t-2 border-l-2 border-purple-400"
                style={{
                  ...pos,
                  transform: `rotate(${pos.rotate}deg)`
                }}
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-center mb-8 text-white">14-Month Milestones</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => {
              // Sequential timing: each milestone duration in months
              const milestoneDurations = [1, 3, 2, 2, 2, 4, 2]; // Total 16 months
              const cumulativeEndTimes = [1, 4, 6, 8, 10, 14, 16]; // End time for each milestone
              
              // Calculate start and end times in seconds (2 seconds per month)
              const totalCycleDuration = 32; // 16 months * 2 seconds
              const startTimeSeconds = index === 0 ? 0 : cumulativeEndTimes[index - 1] * 2;
              const endTimeSeconds = cumulativeEndTimes[index] * 2;
              
              // Calculate timing ratios for keyframes
              const startRatio = startTimeSeconds / totalCycleDuration;
              const endRatio = endTimeSeconds / totalCycleDuration;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-lg p-6 text-center hover:border-[#FF7A00] hover:shadow-[0_0_20px_rgba(255,122,0,0.2)] transition-all"
                >
                  <div className="text-[#FF7A00] mb-3">{milestone.timeline}</div>
                  <h4 className="text-white mb-2 text-sm">{milestone.goal}</h4>
                  <p className="text-gray-500 text-xs">{milestone.metric}</p>
                  
                  {/* Sequential Progress Animation */}
                  <motion.div
                    className="absolute bottom-2 left-2 right-2 h-1 bg-[#FF7A00]/20 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF8C1A]"
                      animate={{
                        x: ['-100%', '-100%', '0%', '0%']
                      }}
                      transition={{
                        duration: totalCycleDuration,
                        times: [0, startRatio, endRatio, 1],
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ width: '100%' }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Parallel Activities - Running Concurrently */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative bg-gradient-to-br from-blue-950/30 to-[#0D0D0D] border-2 border-blue-500/50 rounded-lg p-6 text-center hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
            >
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500/90 rounded-full text-white text-xs whitespace-nowrap"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.8)',
                    '0 0 10px rgba(59, 130, 246, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Parallel Track
              </motion.div>
              <div className="text-blue-400 mb-3">Ongoing</div>
              <h4 className="text-white mb-2 text-sm">Marketing & Partnership Development</h4>
              <p className="text-gray-400 text-xs">Mental health orgs, government, universities, business groups</p>
              
              {/* Parallel Progress Animation */}
              <motion.div
                className="absolute bottom-2 left-2 right-2 h-1 bg-blue-900/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ width: '50%' }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative bg-gradient-to-br from-blue-950/30 to-[#0D0D0D] border-2 border-blue-500/50 rounded-lg p-6 text-center hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
            >
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500/90 rounded-full text-white text-xs whitespace-nowrap"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.8)',
                    '0 0 10px rgba(59, 130, 246, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                Parallel Track
              </motion.div>
              <div className="text-blue-400 mb-3">Concurrent</div>
              <h4 className="text-white mb-2 text-sm">Pilot Program Preparation</h4>
              <p className="text-gray-400 text-xs">Running alongside development + full business plan execution</p>
              
              {/* Parallel Progress Animation */}
              <motion.div
                className="absolute bottom-2 left-2 right-2 h-1 bg-blue-900/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5
                  }}
                  style={{ width: '50%' }}
                />
              </motion.div>
            </motion.div>
          </div>
          
          <p className="text-gray-500 text-xs text-center mt-8 max-w-4xl mx-auto text-[14px] font-bold">
            *Development-focused timeline. Detailed marketing and business plans execute in parallel, including partnerships with mental health organizations, government bodies, universities, and business networking groups. Pilot programs will be prepared concurrently. Subject to change—full details in business plan.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-white mb-8">Ready to Join the Journey?</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#FF7A00] hover:bg-[#FF8C1A] text-white border-none shadow-[0_0_30px_rgba(255,122,0,0.5)] hover:shadow-[0_0_40px_rgba(255,122,0,0.7)] transition-all"
              onClick={() => window.open('https://www.linkedin.com/in/kawinrehanperera/', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Founder
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white transition-all"
              onClick={() => window.open('https://tally.so/r/wab69E', '_blank')}
            >
              Invest
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-[rgb(0,0,0)] hover:bg-white hover:text-black transition-all"
              onClick={() => window.open('https://cal.com/flwstatemedia/proxima-chat', '_blank')}
            >
              Schedule Meeting
            </Button>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            Investment opportunities are limited. Reach out today to secure your position in the future of meaningful connection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}