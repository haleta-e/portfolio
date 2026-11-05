import React, { useState } from 'react';
import { Edit3, Trash2, Plus, Code2, Layers, Cpu, Database, Sparkles } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
  onEditSkill?: (skill: Skill) => void;
  onDeleteSkill?: (id: number) => void;
  onAddSkill?: () => void;
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  onEditSkill,
  onDeleteSkill,
  onAddSkill,
}) => {
  const [activeSuitFilter, setActiveSuitFilter] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const classifySkill = (name: string): { suit: string; suitColor: string; category: string; rank: string } => {
    const lower = name.toLowerCase();
    if (lower.includes('react') || lower.includes('html') || lower.includes('css') || lower.includes('tailwind') || lower.includes('javascript') || lower.includes('frontend')) {
      return { suit: '♠', suitColor: 'text-[#C85A32] dark:text-[#E07A5F]', category: 'frontend', rank: 'A' };
    }
    if (lower.includes('python') || lower.includes('java') || lower.includes('c++') || lower.includes('sql') || lower.includes('database') || lower.includes('backend') || lower.includes('node')) {
      return { suit: '♣', suitColor: 'text-[#1C1917] dark:text-[#F4EFEB]', category: 'backend', rank: 'K' };
    }
    return { suit: '♦', suitColor: 'text-[#C85A32] dark:text-[#E07A5F]', category: 'tools', rank: 'Q' };
  };

  const filteredSkills = skills.filter((skill) => {
    if (activeSuitFilter === 'all') return true;
    const { category } = classifySkill(skill.name);
    return category === activeSuitFilter;
  });

  return (
    <section className="py-16 md:py-20 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E0D5] dark:border-[#38332E] pb-6">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
              <span>SUIT OF SPADES ♠</span>
              <span aria-hidden="true">·</span>
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
              Skills & Technology Deck
            </h2>
            <p className="text-sm text-[#6B6560] dark:text-[#9E968F] mt-1">
              Programming languages, frameworks, and engineering tools categorized by practical proficiency.
            </p>
          </div>

          {/* Interactive Suit Filter & Admin Button */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-1 bg-[#F5EFE6] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl flex items-center gap-1 text-xs font-mono">
              <button
                onClick={() => setActiveSuitFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeSuitFilter === 'all'
                    ? 'bg-[#FFFFFF] dark:bg-[#272320] text-[#1C1917] dark:text-[#F4EFEB] shadow-xs font-bold'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917]'
                }`}
              >
                All Decks
              </button>
              <button
                onClick={() => setActiveSuitFilter('frontend')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeSuitFilter === 'frontend'
                    ? 'bg-[#FFFFFF] dark:bg-[#272320] text-[#1C1917] dark:text-[#F4EFEB] shadow-xs font-bold'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917]'
                }`}
              >
                ♠ Interfaces
              </button>
              <button
                onClick={() => setActiveSuitFilter('backend')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeSuitFilter === 'backend'
                    ? 'bg-[#FFFFFF] dark:bg-[#272320] text-[#1C1917] dark:text-[#F4EFEB] shadow-xs font-bold'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917]'
                }`}
              >
                ♣ Systems
              </button>
              <button
                onClick={() => setActiveSuitFilter('tools')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeSuitFilter === 'tools'
                    ? 'bg-[#FFFFFF] dark:bg-[#272320] text-[#1C1917] dark:text-[#F4EFEB] shadow-xs font-bold'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917]'
                }`}
              >
                ♦ Tools & Workflow
              </button>
            </div>

            {onAddSkill && (
              <button
                onClick={onAddSkill}
                className="px-3.5 py-1.5 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:text-white hover:bg-[#C85A32] dark:hover:bg-[#E07A5F] border border-[#C85A32] dark:border-[#E07A5F] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={12} />
                <span>Add Card</span>
              </button>
            )}
          </div>
        </div>

        {/* Skills Dealt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const { suit, suitColor, rank, category } = classifySkill(skill.name);
            const displayRank = index % 4 === 0 ? 'A' : index % 4 === 1 ? 'K' : index % 4 === 2 ? 'Q' : 'J';

            return (
              <div
                key={skill.id}
                className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-4 playing-card playing-card-lift text-left flex flex-col justify-between min-h-[160px] transition-all"
              >
                {/* Top Corner Index */}
                <div className="flex items-start justify-between">
                  <div className="card-index text-left">
                    <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">{displayRank}</span>
                    <span className={`text-sm ${suitColor}`}>{suit}</span>
                  </div>

                  {/* Admin controls */}
                  {(onEditSkill || onDeleteSkill) && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                      {onEditSkill && (
                        <button
                          onClick={() => onEditSkill(skill)}
                          className="p-1 text-[#6B6560] hover:text-[#C85A32]"
                          title="Edit"
                        >
                          <Edit3 size={12} />
                        </button>
                      )}
                      {onDeleteSkill && (
                        <button
                          onClick={() => onDeleteSkill(skill.id)}
                          className="p-1 text-[#6B6560] hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Center: Skill Name & Category */}
                <div className="my-2 space-y-1">
                  <h3 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F]">
                    <span className="capitalize">{category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Proficient</span>
                  </div>
                </div>

                {/* Bottom Inverted Index & Subtle Hairline */}
                <div className="pt-2 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase tracking-wider">
                    {skill.name.includes('React') || skill.name.includes('Python') ? 'Core Stack' : 'Equipped'}
                  </span>

                  <div className="card-index rotate-180 opacity-60">
                    <span className="text-[11px] font-bold text-[#1C1917] dark:text-[#F4EFEB]">{displayRank}</span>
                    <span className={`text-xs ${suitColor}`}>{suit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
