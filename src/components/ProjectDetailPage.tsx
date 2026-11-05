import React from 'react';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, Code, CheckCircle, Layers, AlertCircle, Sparkles, Trash2, Edit3, ArrowUpRight } from 'lucide-react';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (id: number) => void;
}

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onEditProject,
  onDeleteProject
}) => {
  // Case Study Details curated for each project
  const getCaseStudyDetails = (p: Project) => {
    switch (p.title) {
      case 'EA Card Game':
        return {
          problem: 'Children and students need interactive, visually engaging tools to build memory and cognitive skills through fun web-based gameplay.',
          role: 'Lead Frontend Developer & Designer — Responsible for layout design, CSS animations, JavaScript game logic, matching algorithms, and score state management.',
          features: [
            'Interactive card flip animations and responsive grid rendering',
            'Real-time score calculation and move counter',
            'Victory modal with play-again capability',
            'Fully responsive across mobile, tablet, and desktop viewports'
          ],
          challenges: [
            'Ensuring smooth 3D CSS flip animations without performance lag on lower-end mobile devices.',
            'Preventing premature card clicks during match verification logic.'
          ],
          solutions: [
            'Leveraged GPU-accelerated CSS transform transitions (backface-visibility: hidden).',
            'Implemented a temporary state lock flag in JavaScript during card evaluation.'
          ]
        };
      case '4Kilo Online Shop':
        return {
          problem: 'Students at 4 Kilo Campus lacked a streamlined digital catalog to view, filter, and discover available campus items and tech supplies.',
          role: 'Frontend Web Developer — Built the responsive user interface, item search filtering, category sorting, and interactive cart interface.',
          features: [
            'Dynamic product filtering by category and price range',
            'Instant keyword search filtering',
            'Interactive cart drawer with item count and price calculations',
            'Clean product showcase cards with high-contrast imagery'
          ],
          challenges: [
            'Managing cart state in client-side JavaScript without full page reloads.',
            'Maintaining clean responsive grid layouts across varying product image dimensions.'
          ],
          solutions: [
            'Utilized structured JavaScript arrays and local storage for persistent cart state.',
            'Implemented CSS object-fit cover and uniform aspect ratios for media cards.'
          ]
        };
      case 'EA Study Flow':
        return {
          problem: 'Students often struggle to organize daily study sessions, track active task progress, and maintain consistent focus routines.',
          role: 'Sole Developer — Conceived, designed, and developed the study productivity suite featuring task tracking and focus timers.',
          features: [
            'Task manager with status toggles (To Do, In Progress, Completed)',
            'Pomodoro study focus timer with sound notification triggers',
            'Daily goal progress tracking bar',
            'Minimalist clutter-free dark/light interface'
          ],
          challenges: [
            'Synchronizing timer intervals accurately when user switches browser tabs.',
            'Designing an intuitive layout that minimizes cognitive distraction.'
          ],
          solutions: [
            'Used Web Workers and timestamp comparisons for drift-free interval timing.',
            'Applied Warm Minimalist UI guidelines with strict zero-pill discipline.'
          ]
        };
      case 'HIBRET System':
        return {
          problem: 'Traditional community financial associations (Equb and Edir) in Ethiopia require reliable, secure record-keeping software to replace manual ledger books.',
          role: 'Java Developer — Contributed to GUI design with Java Swing, database schema design, and CRUD operation handlers.',
          features: [
            'Desktop graphical interface built with Java Swing',
            'Member registration, contribution tracking, and payout status records',
            'Database integration for persistent transaction records',
            'Search and filter capabilities for historical transactions'
          ],
          challenges: [
            'Ensuring clean separation of concern between Swing GUI components and database connectivity.',
            'Validating input fields to prevent SQL errors or corrupted records.'
          ],
          solutions: [
            'Implemented Model-View-Controller (MVC) pattern structure in Java.',
            'Used PreparedStatements with strict parameter validation.'
          ]
        };
      case 'Lost & Found Manager':
        return {
          problem: 'Campus administrative offices need an efficient console utility to log, search, and manage reported lost and found items.',
          role: 'C++ Systems Programmer — Built core algorithms, file storage system, and sorting mechanisms.',
          features: [
            'C++ file handling for persistent data storage between program runs',
            'Fast search by item name, category, or date lost',
            'Sorting algorithms to arrange records by priority or status',
            'Console interface with clear navigation menus'
          ],
          challenges: [
            'Handling file read/write operations safely without data corruption.',
            'Building efficient string search routines in standard C++.'
          ],
          solutions: [
            'Used structured binary/text streams with error handling checks.',
            'Implemented linear and binary search algorithms.'
          ]
        };
      default:
        return {
          problem: 'Addressing core digital user needs with modern computer science principles and user-centered design.',
          role: 'Full Stack / Frontend Developer — Responsible for system architecture, interface implementation, and testing.',
          features: [
            'Responsive web application layout',
            'Clean modular component structure',
            'Cross-device compatibility and accessibility',
            'Optimized performance and load times'
          ],
          challenges: [
            'Balancing aesthetic elegance with technical performance.'
          ],
          solutions: [
            'Adhered to modern web development standards and clean coding principles.'
          ]
        };
    }
  };

  const details = getCaseStudyDetails(project);
  const liveUrl = project.live || project.live_demo_url;
  const githubUrl = project.github || project.github_url;

  return (
    <article className="py-24 md:py-32 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Bar Back Button */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E8E0D5] dark:border-[#38332E] pb-6">
          <button
            onClick={onBack}
            className="px-4 py-2 text-xs font-mono text-[#1C1917] dark:text-[#F4EFEB] bg-[#FFFFFF] dark:bg-[#1E1B18] hover:border-[#C85A32] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Return to Projects Deck</span>
          </button>

          {/* Admin shortcuts */}
          <div className="flex items-center gap-2">
            {onEditProject && (
              <button
                onClick={() => onEditProject(project)}
                className="px-3 py-1.5 text-xs font-mono text-[#6B6560] dark:text-[#9E968F] hover:text-[#C85A32] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl flex items-center gap-1.5 cursor-pointer"
                title="Edit Project in Admin"
              >
                <Edit3 size={12} />
                <span className="hidden sm:inline">Edit in Admin</span>
              </button>
            )}
            {onDeleteProject && (
              <button
                onClick={() => onDeleteProject(project.id)}
                className="px-3 py-1.5 text-xs font-mono text-rose-600 dark:text-rose-400 border border-[#E8E0D5] dark:border-[#38332E] rounded-xl flex items-center gap-1.5 cursor-pointer"
                title="Delete Project in Admin"
              >
                <Trash2 size={12} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            )}
          </div>
        </div>

        {/* Header Metadata & Title */}
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B6560] dark:text-[#9E968F]">
            <span className="text-[#C85A32] dark:text-[#E07A5F] font-bold uppercase">
              ♠ CASE STUDY
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Etsegenet Amsalu Portfolio</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
            {project.title}
          </h1>

          <p className="text-base text-[#6B6560] dark:text-[#9E968F] leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Tech Stack Unboxed */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B6560] dark:text-[#9E968F]">
            <span>Stack:</span>
            {(Array.isArray(project.tech)
              ? project.tech
              : typeof project.tech === 'string' && (project.tech as string).trim() !== ''
              ? (project.tech as string).split(',').map((t) => t.trim()).filter(Boolean)
              : []
            ).map((t, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span aria-hidden="true" className="text-[#E8E0D5] dark:text-[#38332E]">·</span>}
                <span className="text-[#1C1917] dark:text-[#F4EFEB] font-medium">{t}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Visual Image Banner */}
        <div className="rounded-2xl overflow-hidden border border-[#E8E0D5] dark:border-[#38332E] bg-[#F5EFE6] dark:bg-[#272320] shadow-sm max-h-[460px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'image/proj-card.png';
            }}
          />
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl playing-card-lift">
          <div className="flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-xs font-mono font-medium text-white bg-[#C85A32] dark:bg-[#E07A5F] hover:bg-[#B24A26] dark:hover:bg-[#C85A32] rounded-xl transition-all flex items-center gap-2 shadow-xs hover:scale-105"
              >
                <span>Launch Live Application</span>
                <ExternalLink size={13} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-xs font-mono font-medium text-[#1C1917] dark:text-[#F4EFEB] bg-[#FAF7F2] dark:bg-[#141210] hover:border-[#C85A32] dark:hover:border-[#E07A5F] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl transition-all flex items-center gap-2 hover:scale-105"
              >
                <GithubIcon size={14} />
                <span>Open in GitHub</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          <div className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] hidden sm:block">
            <span>Verified Source & Deployment</span>
          </div>
        </div>

        {/* Case Study Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
          
          {/* Problem Statement */}
          <div className="bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl p-6 space-y-2 playing-card-lift">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] uppercase">
              <AlertCircle size={14} />
              <span>01. Problem Statement</span>
            </div>
            <h3 className="font-display text-lg font-medium text-[#1C1917] dark:text-[#F4EFEB]">
              What problem does this project address?
            </h3>
            <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed pt-1">
              {details.problem}
            </p>
          </div>

          {/* Role & Contribution */}
          <div className="bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl p-6 space-y-2 playing-card-lift">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] uppercase">
              <Code size={14} />
              <span>02. Role & Contribution</span>
            </div>
            <h3 className="font-display text-lg font-medium text-[#1C1917] dark:text-[#F4EFEB]">
              Developer responsibilities
            </h3>
            <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed pt-1">
              {details.role}
            </p>
          </div>

        </div>

        {/* Main Features Section */}
        <div className="bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl p-6 sm:p-7 space-y-4 text-left playing-card-lift">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] uppercase">
            <Layers size={14} />
            <span>03. Key Features & Capabilities</span>
          </div>
          
          <h3 className="font-display text-xl font-medium text-[#1C1917] dark:text-[#F4EFEB]">
            Core functionality engineered into this application
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {details.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#141210] border border-[#E8E0D5] dark:border-[#38332E]">
                <CheckCircle size={15} className="text-[#C85A32] dark:text-[#E07A5F] shrink-0 mt-0.5" />
                <span className="text-xs text-[#1C1917] dark:text-[#F4EFEB] leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl p-6 sm:p-7 space-y-4 text-left playing-card-lift">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] uppercase">
            <Sparkles size={14} />
            <span>04. Technical Challenges & Solutions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#C85A32] dark:text-[#E07A5F]">
                Engineering Challenges
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed">
                {details.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500">·</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400">
                Implemented Solutions
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed">
                {details.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Direct Actions */}
        <div className="pt-6 border-t border-[#E8E0D5] dark:border-[#38332E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="px-5 py-2.5 text-xs font-mono text-[#1C1917] dark:text-[#F4EFEB] bg-[#FFFFFF] dark:bg-[#1E1B18] hover:border-[#C85A32] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={14} />
            <span>Return to All Projects</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-xs font-mono font-medium text-white bg-[#C85A32] dark:bg-[#E07A5F] hover:bg-[#B24A26] dark:hover:bg-[#C85A32] rounded-xl transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 text-xs font-mono font-medium text-[#1C1917] dark:text-[#F4EFEB] bg-[#FAF7F2] dark:bg-[#141210] hover:border-[#C85A32] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl transition-all flex items-center gap-2"
              >
                <GithubIcon size={14} />
                <span>GitHub Repository</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
