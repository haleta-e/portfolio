import React from 'react';
import { BookOpen, Code, GraduationCap, Award, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const coreCompetencies = [
    {
      rank: 'A',
      suit: '♥',
      title: 'Frontend Engineering',
      desc: 'Building responsive, accessible web interfaces with modern HTML5, CSS3, JavaScript (ES6+), React, and Tailwind CSS.',
    },
    {
      rank: 'K',
      suit: '♥',
      title: 'Object-Oriented Design',
      desc: 'Applying solid OOP patterns in Java and C++ to structure maintainable applications and complex logic.',
    },
    {
      rank: 'Q',
      suit: '♥',
      title: 'Algorithms & Data Structures',
      desc: 'Grounding every interface in theoretical efficiency and algorithmic problem-solving at Addis Ababa University.',
    },
    {
      rank: 'J',
      suit: '♥',
      title: 'Workflow & Collaboration',
      desc: 'Maintaining clean commit histories, Git branching workflows, responsive testing, and collaborative team communication.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Kicker & Title */}
        <div className="max-w-3xl text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
            <span>SUIT OF HEARTS ♥</span>
            <span aria-hidden="true">·</span>
            <span>BACKGROUND & PHILOSOPHY</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
            Curiosity driven, grounded in Computer Science fundamentals.
          </h2>
        </div>

        {/* 2-Column Split: Story Left, Identity Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 text-[#6B6560] dark:text-[#9E968F] leading-relaxed text-sm text-left">
            <p className="text-[#1C1917] dark:text-[#F4EFEB] text-base font-normal leading-relaxed">
              Hello! I'm <strong className="font-semibold text-[#C85A32] dark:text-[#E07A5F]">Etsegenet Amsalu</strong>, a Computer Science student at Addis Ababa University (2023 – 2027) with a dedicated focus on frontend engineering, interface craft, and responsive web systems.
            </p>

            <p>
              My journey began with a natural curiosity for how digital tools are designed and experienced. Over time, that turned into building hands-on projects: interactive educational games (such as the EA Card Game), e-commerce platforms (4Kilo Online Shop), personal productivity systems (EA Study Flow), and community management software (HIBRET System).
            </p>

            <p>
              Whether structuring clean React component hierarchies, crafting purposeful micro-interactions, or analyzing algorithmic performance in Java and C++, I prioritize clarity, intentionality, and reliability.
            </p>

            {/* Quiet Unboxed Competencies */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#1C1917] dark:text-[#F4EFEB]">
              <span className="flex items-center gap-1.5 text-[#C85A32] dark:text-[#E07A5F]">
                <CheckCircle2 size={13} /> Clean Code Principles
              </span>
              <span aria-hidden="true" className="text-[#E8E0D5] dark:text-[#38332E]">·</span>
              <span className="flex items-center gap-1.5 text-[#C85A32] dark:text-[#E07A5F]">
                <CheckCircle2 size={13} /> Responsive Systems
              </span>
              <span aria-hidden="true" className="text-[#E8E0D5] dark:text-[#38332E]">·</span>
              <span className="flex items-center gap-1.5 text-[#C85A32] dark:text-[#E07A5F]">
                <CheckCircle2 size={13} /> Collaborative Mindset
              </span>
            </div>
          </div>

          {/* Academic & Identity Playing Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-3xl p-6 sm:p-7 playing-card playing-card-lift text-left">
            <div className="flex items-start justify-between pb-4 border-b border-[#F0E9DF] dark:border-[#2A2622]">
              <div className="card-index text-left">
                <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">Q</span>
                <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♥</span>
              </div>
              <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase tracking-wider">
                DOSSIER SUMMARY
              </span>
            </div>

            <div className="my-5 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F5EFE6] dark:bg-[#272320] text-[#C85A32] dark:text-[#E07A5F] shrink-0">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">Institution</span>
                  <p className="font-semibold text-sm text-[#1C1917] dark:text-[#F4EFEB]">Addis Ababa University</p>
                  <p className="text-[#6B6560] dark:text-[#9E968F]">B.Sc. Computer Science (2023 – 2027)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F5EFE6] dark:bg-[#272320] text-[#C85A32] dark:text-[#E07A5F] shrink-0">
                  <Code size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">Core Concentration</span>
                  <p className="font-semibold text-sm text-[#1C1917] dark:text-[#F4EFEB]">Frontend & Software Development</p>
                  <p className="text-[#6B6560] dark:text-[#9E968F]">React, TypeScript, CSS Systems, Python</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#F5EFE6] dark:bg-[#272320] text-[#C85A32] dark:text-[#E07A5F] shrink-0">
                  <Award size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">Verified Training</span>
                  <p className="font-semibold text-sm text-[#1C1917] dark:text-[#F4EFEB]">Android & Programming Fundamentals</p>
                  <p className="text-[#6B6560] dark:text-[#9E968F]">ECODERS Certified & INSA Summer Camp</p>
                </div>
              </div>
            </div>

            {onNavigate && (
              <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622]">
                <button
                  onClick={() => onNavigate('experience')}
                  className="w-full py-2.5 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:text-white hover:bg-[#C85A32] dark:hover:bg-[#E07A5F] border border-[#C85A32] dark:border-[#E07A5F] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Examine Experience Timeline</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Competencies Playing Cards */}
        <div className="border-t border-[#E8E0D5] dark:border-[#38332E] pt-10">
          <div className="text-left mb-6">
            <span className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] uppercase tracking-wider">
              PHILOSOPHICAL PILLARS · 4 VALUES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {coreCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 playing-card playing-card-lift flex flex-col justify-between min-h-[170px]"
              >
                <div className="flex items-start justify-between">
                  <div className="card-index text-left">
                    <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">{comp.rank}</span>
                    <span className="text-sm text-[#C85A32] dark:text-[#E07A5F]">{comp.suit}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F]">
                    0{idx + 1}
                  </span>
                </div>

                <div className="my-2 space-y-1">
                  <h4 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB]">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0E9DF] dark:border-[#2A2622] flex justify-end">
                  <div className="card-index rotate-180 opacity-60">
                    <span className="text-[11px] font-bold text-[#1C1917] dark:text-[#F4EFEB]">{comp.rank}</span>
                    <span className="text-xs text-[#C85A32] dark:text-[#E07A5F]">{comp.suit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
