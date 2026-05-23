import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Linkedin } from 'lucide-react';
import kawinImage from 'figma:asset/afe1452be51c732bd0ea7950b3424cfaa5a968bd.png';
import induwaraImage from 'figma:asset/c0cdd3958b2c57eaab35d47399c59a489cf1b991.png';
import davinduImage from 'figma:asset/e0e86c52b7d6f1362f980e959045888f7912bf35.png';
import nikhilImage from 'figma:asset/ee93ffca01de7442eec540c0db3c3a8744789829.png';

// Helper function to highlight qualifications
const highlightQualifications = (text: string, name: string) => {
  let highlighted = text;
  
  if (name === 'Kawin Perera') {
    highlighted = highlighted.replace(/\bLLM\b/g, '<span class="text-[#FF7A00]">LLM</span>');
    highlighted = highlighted.replace(/\bMBA\b/g, '<span class="text-[#FF7A00]">MBA</span>');
    highlighted = highlighted.replace(/\bLLB\b/g, '<span class="text-[#FF7A00]">LLB</span>');
  } else if (name === 'Induwara Makalanda') {
    highlighted = highlighted.replace(/\bMBA \+ MSc\b/g, '<span class="text-[#FF7A00]">MBA + MSc</span>');
  } else if (name === 'Davindu Padmasiri') {
    highlighted = highlighted.replace(/\bCIMA\b/g, '<span class="text-[#FF7A00]">CIMA</span>');
    highlighted = highlighted.replace(/\bMBA\b/g, '<span class="text-[#FF7A00]">MBA</span>');
  } else if (name === 'Nikhil Bevan Senaratne') {
    highlighted = highlighted.replace(/\bBBA\b/g, '<span class="text-[#FF7A00]">BBA</span>');
    highlighted = highlighted.replace(/\bCIMA\b/g, '<span class="text-[#FF7A00]">CIMA</span>');
    highlighted = highlighted.replace(/\bMAS Holdings\b/g, '<span class="text-[#FF7A00]">MAS Holdings</span>');
    highlighted = highlighted.replace(/\bmulti-billion dollar\b/gi, '<span class="text-[#FF7A00]">multi-billion dollar</span>');
  }
  
  return highlighted;
};

const team = [
  {
    name: 'Kawin Perera',
    role: 'CEO & CTO',
    image: kawinImage,
    linkedin: 'https://www.linkedin.com/in/kawinrehanperera/',
    credentials: [
      'LLM (AI & Blockchain, Data Protection, IP, Governance) + MBA (HRM) + LLB; bridges product, regulation, and people systems.',
      'Founder, FLWSTATE Media; leads vision, GTM and ops across creative and automation pipelines',
      'Legal-tech background: digital transformation at a law firm; due-diligence, drafting, and client process optimization.',
      'Certified in legal research (Lexis+, Westlaw, vLex) and digital marketing (Meta), aligning growth with compliance.',
    ],
    bio: 'Strategic founder blending product, AI, and law. Drives Proxima\'s vision, system architecture, and compliance-first execution—translating complex legal-tech and privacy requirements into shippable features and scalable processes.',
  },
  {
    name: 'Induwara Makalanda',
    role: 'CMO',
    image: induwaraImage,
    linkedin: 'https://www.linkedin.com/in/induwara-makalanda/',
    credentials: [
      'MBA + MSc (Industrial/Engineering Mgmt); certified in digital marketing—combines analytics with creative.',
      'Process optimization leader (MS-RT, AutoGroup): implemented streamlined workflows; led 12-person teams; cut production time ~15% while maintaining quality.',
      'Co-founder, FLWSTATE Media; hands-on with content, campaign rollouts, and partner marketing.',
      'Ground-level team coaching & QA from supervisory experience; builds repeatable training and CX standards.',
    ],
    bio: 'Engineer-turned-marketer focused on data-driven growth and team execution. Brings manufacturing-grade process discipline to creative marketing—designing campaigns, content ops, and funnels that scale efficiently.',
  },
  {
    name: 'Davindu Padmasiri',
    role: 'COO',
    image: davinduImage,
    linkedin: 'https://www.linkedin.com/in/davindu-padmasiri-a49936189/',
    credentials: [
      'CIMA Passed Finalist + MBA; translates analysis into operational KPIs and dashboards.',
      'Investment & research pedigree: financial modeling, sector research, ROI/risk evaluation (Planlogic; Equity Investments Lanka).',
      'Credit & monitoring discipline (Acuity): covenant tracking, risk reporting, and monthly performance oversight.',
      'Portfolio management experience; data-driven iteration of strategies under market volatility.',
    ],
    bio: 'Finance-first operator who builds reliable systems from the numbers up. Specializes in modeling, diligence, and process controls that keep multi-team execution efficient, auditable, and investor-grade.',
  },
  {
    name: 'Nikhil Bevan Senaratne',
    role: 'CSO',
    image: nikhilImage,
    linkedin: 'https://www.linkedin.com/in/nikhil-bevan-senaratne-69a445242/',
    credentials: [
      'BBA (Finance, Hons.) + CIMA passed finalist; rigorous analytical toolkit for runway, unit economics, and fundraising models.',
      'Strategic advisor to the CEO at MAS Holdings which is a multi-billion dollar organisation, leveraging advanced analytics and financial acumen to inform executive decision-making and board-level discussions. Leading the design and implementation of comprehensive financial dashboards, KPI frameworks, and strategic reporting that provide real-time visibility into operational and commercial performance.',
      'Progressed through finance roles (Accountant → Analyst → BP): strong grasp of the full finance cycle.',
      'Clear communicator & presenter; confident with executive forums and cross-functional alignment.',
    ],
    bio: 'Finance partner experienced in FP&A, cost discipline, and stakeholder management within complex, fast-moving environments. Designs models and reporting that turn strategy into measurable financial outcomes.',
  },
];

export function TeamSection() {
  return (
    <section id="team" className="relative py-24 bg-gradient-to-b from-black to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl">The Family For Now...</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            World-class team with proven track records who have known each other for over 15 years
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-black to-[#0D0D0D] border border-[#FF7A00]/30 rounded-lg overflow-hidden hover:border-[#FF7A00] transition-all group"
            >
              <div className="md:flex">
                {/* Photo */}
                <div className="md:w-1/3 relative overflow-hidden">
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF7A00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white mb-1">{member.name}</h3>
                      <p className="text-[#FF7A00]">{member.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full bg-[#FF7A00]/10 flex items-center justify-center hover:bg-[#FF7A00]/20 transition-all"
                      >
                        <Linkedin className="w-4 h-4 text-[#FF7A00]" />
                      </motion.a>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                  <div className="space-y-2">
                    {member.credentials.map((cred, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: highlightQualifications(cred, member.name) }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
