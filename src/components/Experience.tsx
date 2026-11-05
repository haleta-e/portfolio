import React, { useState } from 'react';
import { Experience as ExperienceType } from '../types';
import { Briefcase, GraduationCap, Calendar, CheckCircle2, Plus, Edit3, Trash2, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceType[];
  onEditExperience?: (exp: ExperienceType) => void;
  onDeleteExperience?: (id: number) => void;
  onAddExperience?: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  experience = [],
  onEditExperience,
  onDeleteExperience,
  onAddExperience,
}) => {
  // Track expanded cards
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    0: true, // AAU card expanded by default
    1: true, // First experience expanded
  });

  const toggleExpand = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Assign playing card suits and ranks
  const cardSuits = [
    { rank: 'K', suit: '♣', suitColor: 'text-[#1C1917] dark:text-[#F4EFEB]', kicker: 'PRACTICAL TRAINING' },
    { rank: 'Q', suit: '♥', suitColor: 'text-[#C85A32] dark:text-[#E07A5F]', kicker: 'FRONTEND MASTERY' },
    { rank: 'J', suit: '♦', suitColor: 'text-[#C85A32] dark:text-[#E07A5F]', kicker: 'SYSTEM ARCHITECTURE' },
    { rank: '10', suit: '♠', suitColor: 'text-[#C85A32] dark:text-[#E07A5F]', kicker: 'COMMUNITY PROJECT' },
  ];

  const safeExperienceList = Array.isArray(experience) ? experience : [];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E0D5] dark:border-[#38332E] pb-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
              <span>SUIT OF CLUBS ♣</span>
              <span aria-hidden="true">·</span>
              <span>JOURNEY & TRACK RECORD</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
              Experience & Education Deck
            </h2>
            <p className="text-sm text-[#6B6560] dark:text-[#9E968F] mt-1">
              Academic foundation at Addis Ababa University and practical software training chapters.
            </p>
          </div>

          {onAddExperience && (
            <button
              onClick={onAddExperience}
              className="px-4 py-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:text-white hover:bg-[#C85A32] dark:hover:bg-[#E07A5F] border border-[#C85A32] dark:border-[#E07A5F] rounded-xl transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus size={13} />
              <span>Deal New Entry (Admin)</span>
            </button>
          )}
        </div>

        {/* 2-Column Playing Card Layout: AAU Degree Card (Left 5) & Experience Hand (Right 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ♠ Ace of Spades - Academic Degree Card */}
          <div className="lg:col-span-5">
            <div className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-3xl p-6 sm:p-7 playing-card playing-card-lift">
              {/* Corner Indices */}
              <div className="flex items-start justify-between">
                <div className="card-index text-left">
                  <span className="text-base font-bold text-[#1C1917] dark:text-[#F4EFEB]">A</span>
                  <span className="text-lg text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#6B6560] dark:text-[#9E968F]">
                  FORMAL ACADEMIA
                </span>
              </div>

              {/* Degree Title & Institution */}
              <div className="my-5 space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F]">
                  <Calendar size={13} />
                  <span>2023 — 2027 (Undergraduate)</span>
                </div>

                <h3 className="font-display text-2xl font-normal text-[#1C1917] dark:text-[#F4EFEB] leading-snug">
                  B.Sc. in Computer Science
                </h3>

                <p className="text-sm font-medium text-[#6B6560] dark:text-[#9E968F]">
                  Addis Ababa University (AAU)
                </p>
              </div>

              {/* Coursework & Description */}
              <div className="pt-4 border-t border-[#F0E9DF] dark:border-[#2A2622] space-y-3 text-left">
                <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed">
                  Rigorous foundational curriculum covering core computer science principles, practical software architecture, and systems development.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#1C1917] dark:text-[#F4EFEB] block">
                    Core Coursework & Focus:
                  </span>
                  
                  <ul className="space-y-1.5 text-xs text-[#6B6560] dark:text-[#9E968F]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#C85A32] dark:text-[#E07A5F] font-bold">·</span>
                      <span>Data Structures & Algorithmic Analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#C85A32] dark:text-[#E07A5F] font-bold">·</span>
                      <span>Object-Oriented Programming (Java & C++)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#C85A32] dark:text-[#E07A5F] font-bold">·</span>
                      <span>Relational Database Management Systems & SQL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#C85A32] dark:text-[#E07A5F] font-bold">·</span>
                      <span>Software Engineering & Architecture Principles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#C85A32] dark:text-[#E07A5F] font-bold">·</span>
                      <span>Computer Networks & Web Systems</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card Bottom Inverted Index */}
              <div className="pt-5 mt-5 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F]">
                  Addis Ababa, Ethiopia
                </span>

                <div className="card-index rotate-180 opacity-60">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">A</span>
                  <span className="text-sm text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Dealt Experience Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {safeExperienceList.map((item, idx) => {
              const cardMeta = cardSuits[idx % cardSuits.length];
              const isExpanded = !!expandedCards[item.id];

              const rawTech = item.technologies as any;
              const techList: string[] = Array.isArray(rawTech)
                ? rawTech
                : typeof rawTech === 'string' && rawTech.trim() !== ''
                ? rawTech.split(',').map((t: string) => t.trim()).filter(Boolean)
                : [];

              const rawResp = item.responsibilities as any;
              const respList: string[] = Array.isArray(rawResp)
                ? rawResp
                : typeof rawResp === 'string' && rawResp.trim() !== ''
                ? rawResp.split('\n').map((r: string) => r.trim()).filter(Boolean)
                : [];

              return (
                <div
                  key={item.id}
                  className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 sm:p-6 playing-card playing-card-lift text-left transition-all"
                >
                  {/* Top Corner Index & Kicker */}
                  <div className="flex items-start justify-between">
                    <div className="card-index text-left">
                      <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">{cardMeta.rank}</span>
                      <span className={`text-base ${cardMeta.suitColor}`}>{cardMeta.suit}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6560] dark:text-[#9E968F]">
                        {cardMeta.kicker}
                      </span>

                      {/* Admin Controls */}
                      {(onEditExperience || onDeleteExperience) && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                          {onEditExperience && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditExperience(item);
                              }}
                              className="p-1 text-[#6B6560] hover:text-[#C85A32] cursor-pointer"
                              title="Edit Entry"
                            >
                              <Edit3 size={13} />
                            </button>
                          )}
                          {onDeleteExperience && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteExperience(item.id);
                              }}
                              className="p-1 text-[#6B6560] hover:text-rose-600 cursor-pointer"
                              title="Delete Entry"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Header Title & Date */}
                  <div className="my-3 space-y-1">
                    <span className="text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] block">
                      {item.subtitle}
                    </span>

                    <h4 className="font-display text-xl font-normal text-[#1C1917] dark:text-[#F4EFEB]">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Expandable Key Responsibilities & Achievements */}
                  {respList.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="text-[11px] font-mono text-[#C85A32] dark:text-[#E07A5F] hover:underline flex items-center gap-1 mb-2 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Show Key Contributions & Duties'}</span>
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>

                      {isExpanded && (
                        <div className="space-y-1.5 pl-1 mb-3">
                          {respList.map((resp, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-[#1C1917] dark:text-[#F4EFEB]">
                              <CheckCircle2 size={13} className="text-[#C85A32] dark:text-[#E07A5F] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{resp}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unboxed Tech Metadata & Bottom Inverted Corner Index */}
                  <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#6B6560] dark:text-[#9E968F]">
                      {techList.map((tech, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span aria-hidden="true" className="text-[#E8E0D5] dark:text-[#38332E]">·</span>}
                          <span>{tech}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="card-index rotate-180 opacity-60 ml-2 shrink-0">
                      <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">{cardMeta.rank}</span>
                      <span className={`text-sm ${cardMeta.suitColor}`}>{cardMeta.suit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
