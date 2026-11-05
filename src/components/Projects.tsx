import React, { useState } from 'react';
import { Project } from '../types';
import { Search, ExternalLink, ArrowRight, FolderGit2, Plus, Trash2, Edit3, Eye, ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (id: number) => void;
  onAddProject?: () => void;
}

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  onSelectProject,
  onEditProject,
  onDeleteProject,
  onAddProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories dynamically from projects list
  const uniqueCategories = Array.from(
    new Set((projects || []).map((p) => p.category).filter(Boolean))
  );

  const categories = [
    { id: 'all', label: 'All Projects' },
    ...uniqueCategories.map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    })),
  ];

  const filteredProjects = (projects || []).filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.tech) && p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const getCardRank = (index: number) => {
    const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8'];
    return ranks[index % ranks.length];
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E0D5] dark:border-[#38332E] pb-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
              <span>SUIT OF SPADES ♠</span>
              <span aria-hidden="true">·</span>
              <span>THE PORTFOLIO DECK ({projects.length} PROJECTS)</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
              Featured Applications & Works
            </h2>
            <p className="text-sm text-[#6B6560] dark:text-[#9E968F] mt-1">
              Select a project card to inspect deep architectural decisions, technical challenges, and live demos.
            </p>
          </div>

          {onAddProject && (
            <button
              onClick={onAddProject}
              className="px-4 py-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:text-white hover:bg-[#C85A32] dark:hover:bg-[#E07A5F] border border-[#C85A32] dark:border-[#E07A5F] rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <Plus size={13} />
              <span>Deal Project (Admin)</span>
            </button>
          )}
        </div>

        {/* Toolbar: Category Filter & Search Box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="p-1 bg-[#F5EFE6] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl flex items-center gap-1 text-xs font-mono overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#FFFFFF] dark:bg-[#272320] text-[#1C1917] dark:text-[#F4EFEB] shadow-xs font-bold'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6560] dark:text-[#9E968F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or stack..."
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl text-[#1C1917] dark:text-[#F4EFEB] placeholder-[#9E968F] focus:outline-none focus:border-[#C85A32]"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl p-8 space-y-2">
            <FolderGit2 size={28} className="mx-auto text-[#6B6560] dark:text-[#9E968F]" />
            <h3 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB]">No project cards found</h3>
            <p className="text-xs text-[#6B6560] dark:text-[#9E968F]">
              Try resetting your category filter or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredProjects.map((project, index) => {
              const rank = getCardRank(index);
              const githubUrl = project.github || project.github_url;
              const liveUrl = project.live || project.live_demo_url;

              return (
                <div
                  key={project.id}
                  className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl overflow-hidden playing-card playing-card-lift flex flex-col justify-between"
                >
                  <div>
                    {/* Top Playing Card Header with Corner Indices */}
                    <div className="p-4 pb-2 flex items-start justify-between">
                      <div className="card-index text-left">
                        <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">{rank}</span>
                        <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6560] dark:text-[#9E968F]">
                          {project.category}
                        </span>

                        {/* Admin Controls */}
                        {(onEditProject || onDeleteProject) && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                            {onEditProject && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditProject(project);
                                }}
                                className="p-1 text-[#6B6560] hover:text-[#C85A32] cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit3 size={12} />
                              </button>
                            )}
                            {onDeleteProject && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteProject(project.id);
                                }}
                                className="p-1 text-[#6B6560] hover:text-rose-600 cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Screenshot / Visual with Hover Quick Actions */}
                    <div
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="mx-4 h-44 rounded-xl overflow-hidden bg-[#F5EFE6] dark:bg-[#272320] cursor-pointer relative group/img"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'image/proj-card.png';
                        }}
                      />
                      
                      {/* Image Hover Overlay for Direct Launch */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-2">
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 text-xs font-mono font-medium text-white bg-[#C85A32] hover:bg-[#B24A26] rounded-lg transition-transform hover:scale-105 flex items-center gap-1.5 shadow-md"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 text-xs font-mono font-medium text-[#1C1917] bg-white hover:bg-[#F5EFE6] rounded-lg transition-transform hover:scale-105 flex items-center gap-1.5 shadow-md"
                          >
                            <GithubIcon size={13} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 pt-3 space-y-2">
                      <h3
                        onClick={() => onSelectProject && onSelectProject(project)}
                        className="font-display text-lg font-medium text-[#1C1917] dark:text-[#F4EFEB] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Unboxed Tech Metadata */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F]">
                        {(Array.isArray(project.tech)
                          ? project.tech
                          : typeof project.tech === 'string' && (project.tech as string).trim() !== ''
                          ? (project.tech as string).split(',').map((t) => t.trim()).filter(Boolean)
                          : []
                        ).map((t, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && <span aria-hidden="true" className="text-[#E8E0D5] dark:text-[#38332E]">·</span>}
                            <span>{t}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer with Clear GitHub & Live Demo Actions */}
                  <div className="p-4 pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      {/* Direct GitHub & Live Demo Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 text-[11px] font-mono font-medium text-white bg-[#C85A32] dark:bg-[#E07A5F] hover:bg-[#B24A26] dark:hover:bg-[#C85A32] rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                            title="Open Live Application"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 text-[11px] font-mono font-medium text-[#1C1917] dark:text-[#F4EFEB] bg-[#F5EFE6] dark:bg-[#272320] hover:bg-[#E8E0D5] dark:hover:bg-[#38332E] border border-[#E8E0D5] dark:border-[#38332E] rounded-lg transition-all flex items-center gap-1.5"
                            title="Inspect Source Code on GitHub"
                          >
                            <GithubIcon size={12} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>

                      {/* Rotated bottom-right card index */}
                      <div className="card-index rotate-180 opacity-60 ml-auto">
                        <span className="text-[11px] font-bold text-[#1C1917] dark:text-[#F4EFEB]">{rank}</span>
                        <span className="text-xs text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="text-xs font-semibold text-[#6B6560] dark:text-[#9E968F] hover:text-[#C85A32] dark:hover:text-[#E07A5F] flex items-center gap-1 cursor-pointer transition-colors pt-0.5"
                    >
                      <span>Case Study & Architecture</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
