import React from 'react';
import { Edit3, Trash2, Plus, Compass } from 'lucide-react';
import { LearningItem } from '../types';

interface LearningProps {
  learning: LearningItem[];
  onEditLearning?: (item: LearningItem) => void;
  onDeleteLearning?: (id: number) => void;
  onAddLearning?: () => void;
}

export const Learning: React.FC<LearningProps> = ({
  learning,
  onEditLearning,
  onDeleteLearning,
  onAddLearning,
}) => {
  return (
    <section className="py-12 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E0D5] dark:border-[#38332E] pb-6">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
              <span>EXPLORATION & RESEARCH</span>
              <span aria-hidden="true">·</span>
              <span>IN PROGRESS</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
              Active Studies & Continuous Learning
            </h3>
          </div>

          {onAddLearning && (
            <button
              onClick={onAddLearning}
              className="px-3.5 py-1.5 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:text-white hover:bg-[#C85A32] dark:hover:bg-[#E07A5F] border border-[#C85A32] dark:border-[#E07A5F] rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <Plus size={12} />
              <span>Add Topic Card</span>
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {learning.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] p-5 rounded-2xl playing-card playing-card-lift flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-start justify-between">
                <div className="card-index text-left">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">0{index + 1}</span>
                  <span className="text-sm text-[#C85A32] dark:text-[#E07A5F]">♦</span>
                </div>

                <div className="flex items-center gap-1">
                  {onEditLearning && (
                    <button
                      onClick={() => onEditLearning(item)}
                      className="p-1 text-[#6B6560] hover:text-[#C85A32]"
                      title="Edit"
                    >
                      <Edit3 size={12} />
                    </button>
                  )}
                  {onDeleteLearning && (
                    <button
                      onClick={() => onDeleteLearning(item.id)}
                      className="p-1 text-[#6B6560] hover:text-rose-600"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div className="my-2 space-y-1">
                <h4 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                  {item.title}
                </h4>

                <p className="text-[#6B6560] dark:text-[#9E968F] text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F]">
                <span>In Active Practice</span>
                <span className="text-[#C85A32] dark:text-[#E07A5F]">AAU · 2026</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
