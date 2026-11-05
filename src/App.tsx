import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { Skills } from './components/Skills';
import { Learning } from './components/Learning';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { BackToTop } from './components/BackToTop';

import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { OverviewModule } from './admin/OverviewModule';
import { ProjectsModule } from './admin/ProjectsModule';
import { SkillsModule } from './admin/SkillsModule';
import { ExperienceModule } from './admin/ExperienceModule';
import { EducationModule } from './admin/EducationModule';
import { CertificatesModule } from './admin/CertificatesModule';
import { ProfileModule } from './admin/ProfileModule';
import { MediaModule } from './admin/MediaModule';
import { MessagesModule } from './admin/MessagesModule';
import { SettingsModule } from './admin/SettingsModule';

import { Project, Skill, Certificate, Experience as ExperienceType } from './types';
import { ArrowRight, Lock, Sun, Moon, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialLearning,
  initialExperience,
  initialCertificates,
} from './data/initialData';

import { adminFetch } from './admin/adminApi';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [adminTab, setAdminTab] = useState('overview');
  const [pendingEditItem, setPendingEditItem] = useState<{ type: string; data?: any } | null>(null);

  // Page Routing State: 'home' | 'about' | 'projects' | 'experience' | 'contact' | 'project-detail'
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'admin') {
      if (hash.startsWith('projects/')) return 'project-detail';
      if (['about', 'projects', 'experience', 'contact'].includes(hash)) return hash;
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('projects/')) {
      const projId = parseInt(hash.split('/')[1], 10);
      return initialProjects.find((p) => p.id === projId) || initialProjects[0];
    }
    return null;
  });

  const [certificateImage, setCertificateImage] = useState<string | null>(null);

  // Pre-populated state from initial data, updated via backend API
  const [portfolioData, setPortfolioData] = useState<any>({
    profile: initialProfile,
    projects: initialProjects,
    skills: initialSkills,
    learning: initialLearning,
    experiences: initialExperience,
    certificates: initialCertificates,
    education: [
      {
        id: 1,
        institution: "Addis Ababa University",
        qualification: "Bachelor of Science (B.Sc.)",
        field_of_study: "Computer Science",
        start_date: "2023",
        end_date: "2027",
        description: "Focusing on software engineering, algorithms, databases, web development, and object-oriented architecture."
      }
    ]
  });

  // Theme toggle (Dark / Light)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Listen to hash changes for #admin or multi-page routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
        if (hash.startsWith('projects/')) {
          const projId = parseInt(hash.split('/')[1], 10);
          const safeProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects : initialProjects;
          const found = safeProjects.find((p: any) => p.id === projId);
          if (found) {
            setSelectedProject(found);
            setCurrentPage('project-detail');
          }
        } else if (['home', 'about', 'projects', 'experience', 'contact'].includes(hash)) {
          setCurrentPage(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [portfolioData]);

  // Check admin session on mount
  useEffect(() => {
    adminFetch('/api/admin/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAdminUser(data.admin);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch public portfolio data from API
  const fetchPublicPortfolio = () => {
    fetch('/api/public/portfolio')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPortfolioData({
            profile: data.profile ? {
              name: data.profile.full_name || 'Etsegenet Amsalu',
              bio: data.profile.biography || '',
              avatarUrl: data.profile.avatar_url || 'image/6003481707438345603_120.jpg'
            } : portfolioData.profile,
            projects: Array.isArray(data.projects) 
              ? data.projects.map((p: any) => ({
                  ...p,
                  github: p.github_url || p.github || 'https://github.com/haleta-e',
                  live: p.live_demo_url || p.live || p.github_url || 'https://github.com/haleta-e'
                }))
              : [],
            skills: Array.isArray(data.skills) ? data.skills : [],
            learning: Array.isArray(data.learning) ? data.learning : [],
            experiences: Array.isArray(data.experiences) ? data.experiences : [],
            certificates: Array.isArray(data.certificates) ? data.certificates : [],
            education: Array.isArray(data.education) ? data.education : []
          });
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPublicPortfolio();
  }, []);

  const handleAdminLogout = async () => {
    await adminFetch('/api/admin/logout', { method: 'POST' });
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    window.location.hash = '';
  };

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProjectDetail = (proj: Project) => {
    setSelectedProject(proj);
    setCurrentPage('project-detail');
    window.location.hash = `#projects/${proj.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Contextual Admin Routing for Edit / Delete / Add ---
  const handleEditProject = (project: Project) => {
    setPendingEditItem({ type: 'project', data: project });
    setAdminTab('projects');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleDeleteProject = async (id: number) => {
    if (!adminUser) {
      setAdminTab('projects');
      setIsAdminRoute(true);
      window.location.hash = 'admin';
      return;
    }
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    fetchPublicPortfolio();
  };

  const handleAddProject = () => {
    setPendingEditItem({ type: 'project', data: null });
    setAdminTab('projects');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleEditSkill = (skill: Skill) => {
    setPendingEditItem({ type: 'skill', data: skill });
    setAdminTab('skills');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleDeleteSkill = async (id: number) => {
    if (!adminUser) {
      setAdminTab('skills');
      setIsAdminRoute(true);
      window.location.hash = 'admin';
      return;
    }
    if (!window.confirm('Delete this skill?')) return;
    await adminFetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
    fetchPublicPortfolio();
  };

  const handleAddSkill = () => {
    setPendingEditItem({ type: 'skill', data: null });
    setAdminTab('skills');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleEditExperience = (exp: ExperienceType) => {
    setPendingEditItem({ type: 'experience', data: exp });
    setAdminTab('experience');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleDeleteExperience = async (id: number) => {
    if (!adminUser) {
      setAdminTab('experience');
      setIsAdminRoute(true);
      window.location.hash = 'admin';
      return;
    }
    if (!window.confirm('Delete this experience record?')) return;
    await adminFetch(`/api/admin/experiences/${id}`, { method: 'DELETE' });
    fetchPublicPortfolio();
  };

  const handleAddExperience = () => {
    setPendingEditItem({ type: 'experience', data: null });
    setAdminTab('experience');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleEditCertificate = (cert: Certificate) => {
    setPendingEditItem({ type: 'certificate', data: cert });
    setAdminTab('certificates');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!adminUser) {
      setAdminTab('certificates');
      setIsAdminRoute(true);
      window.location.hash = 'admin';
      return;
    }
    if (!window.confirm('Delete this certificate?')) return;
    await adminFetch(`/api/admin/certificates/${id}`, { method: 'DELETE' });
    fetchPublicPortfolio();
  };

  const handleAddCertificate = () => {
    setPendingEditItem({ type: 'certificate', data: null });
    setAdminTab('certificates');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  const handleEditProfile = () => {
    setAdminTab('profile');
    setIsAdminRoute(true);
    window.location.hash = 'admin';
  };

  // If user is accessing #admin view
  if (isAdminRoute) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(admin) => {
            setAdminUser(admin);
          }}
        />
      );
    }

    return (
      <AdminLayout
        admin={adminUser}
        activeTab={adminTab}
        setActiveTab={(tab) => {
          setAdminTab(tab);
          setPendingEditItem(null);
        }}
        onLogout={handleAdminLogout}
      >
        {adminTab === 'overview' && <OverviewModule onNavigate={(tab) => setAdminTab(tab)} />}
        {adminTab === 'projects' && (
          <ProjectsModule
            initialEditingProject={pendingEditItem?.type === 'project' ? pendingEditItem.data : null}
            onProjectUpdated={fetchPublicPortfolio}
          />
        )}
        {adminTab === 'skills' && (
          <SkillsModule
            initialEditingSkill={pendingEditItem?.type === 'skill' ? pendingEditItem.data : null}
            onSkillUpdated={fetchPublicPortfolio}
          />
        )}
        {adminTab === 'experience' && (
          <ExperienceModule
            initialEditingExp={pendingEditItem?.type === 'experience' ? pendingEditItem.data : null}
            onExpUpdated={fetchPublicPortfolio}
          />
        )}
        {adminTab === 'education' && (
          <EducationModule
            initialEditingEdu={pendingEditItem?.type === 'education' ? pendingEditItem.data : null}
            onEduUpdated={fetchPublicPortfolio}
          />
        )}
        {adminTab === 'certificates' && (
          <CertificatesModule
            initialEditingCert={pendingEditItem?.type === 'certificate' ? pendingEditItem.data : null}
            onCertUpdated={fetchPublicPortfolio}
          />
        )}
        {adminTab === 'profile' && <ProfileModule onProfileUpdated={fetchPublicPortfolio} />}
        {adminTab === 'media' && <MediaModule />}
        {adminTab === 'messages' && <MessagesModule />}
        {adminTab === 'settings' && <SettingsModule />}
      </AdminLayout>
    );
  }

  const safeProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects : initialProjects;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-body ${
      theme === 'dark' ? 'bg-[#141210] text-[#F4EFEB]' : 'bg-[#FAF7F2] text-[#1C1917]'
    }`}>
      {/* Top Navigation Bar */}
      <Navbar
        name={portfolioData.profile.name}
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Floating Theme & Admin Portal Shortcuts */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1E1B18] text-[#C85A32] dark:text-[#E07A5F] border border-[#E8E0D5] dark:border-[#38332E] shadow-md hover:scale-105 transition-transform cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <a
          href="#admin"
          className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] dark:bg-[#1E1B18] text-[#6B6560] dark:text-[#9E968F] hover:text-[#C85A32] dark:hover:text-[#E07A5F] border border-[#E8E0D5] dark:border-[#38332E] shadow-md font-mono text-xs flex items-center gap-1.5 hover:scale-105 transition-transform"
        >
          <Lock size={13} /> Admin
        </a>
      </div>

      {/* Main Multi-Page View Container */}
      <main>
        {/* VIEW 1: PROJECT DETAIL CASE STUDY PAGE */}
        {currentPage === 'project-detail' && selectedProject && (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => navigateToPage('projects')}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {/* VIEW 2: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            <Hero
              profile={portfolioData.profile}
              onNavigate={navigateToPage}
              onEditProfile={handleEditProfile}
            />

            {/* Curated 2-Card Spotlight Showcase */}
            <section className="py-14 bg-[#FAF7F2] dark:bg-[#141210] border-t border-[#E8E0D5] dark:border-[#38332E]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
                  <div>
                    <span className="text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] uppercase tracking-wider block mb-1">
                      SELECTED PAIR · 2 SPOTLIGHT WORKS
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#1C1917] dark:text-[#F4EFEB]">
                      Spotlight Applications
                    </h2>
                  </div>

                  <button
                    onClick={() => navigateToPage('projects')}
                    className="text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Deal Full Deck ({safeProjects.length} Projects)</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {safeProjects.slice(0, 2).map((project: Project, i: number) => {
                    const cardRank = i === 0 ? 'A' : 'K';
                    const githubUrl = project.github || project.github_url;
                    const liveUrl = project.live || project.live_demo_url;

                    return (
                      <div
                        key={project.id}
                        onClick={() => openProjectDetail(project)}
                        className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 cursor-pointer playing-card playing-card-lift flex flex-col justify-between"
                      >
                        <div>
                          {/* Corner Index */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="card-index text-left">
                              <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">{cardRank}</span>
                              <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">
                                {project.category}
                              </span>
                              {/* Edit & Delete Quick Shortcuts on Hover */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditProject(project);
                                  }}
                                  className="p-1 text-[#6B6560] hover:text-[#C85A32]"
                                  title="Edit Project"
                                >
                                  <span className="text-xs font-mono">Edit</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProject(project.id);
                                  }}
                                  className="p-1 text-[#6B6560] hover:text-rose-600"
                                  title="Delete Project"
                                >
                                  <span className="text-xs font-mono">Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="h-44 rounded-xl overflow-hidden bg-[#F5EFE6] dark:bg-[#272320] mb-3 relative group/spotlight">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => { (e.target as any).src = 'image/proj-card.png'; }}
                            />

                            {/* Image Quick Launch Actions on Hover */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2">
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

                          <h3 className="font-display text-lg font-medium text-[#1C1917] dark:text-[#F4EFEB] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors mb-1.5">
                            {project.title}
                          </h3>

                          <p className="text-xs text-[#6B6560] dark:text-[#9E968F] line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Card Action Footer with Live Demo & GitHub */}
                        <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] mt-4 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
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

                            <div className="card-index rotate-180 opacity-60 ml-auto">
                              <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">{cardRank}</span>
                              <span className="text-sm text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                            </div>
                          </div>

                          <div className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors flex items-center gap-1 pt-0.5">
                            <span className="font-medium">Inspect Deep Case Study</span>
                            <ArrowUpRight size={13} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Minimalist Dispatch Banner */}
                <div className="p-6 bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left playing-card-lift">
                  <div>
                    <h4 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB]">
                      Have an internship opportunity or technical challenge?
                    </h4>
                    <p className="text-xs text-[#6B6560] dark:text-[#9E968F] mt-0.5">
                      Available for frontend engineering, software internships, and collaborative development.
                    </p>
                  </div>

                  <button
                    onClick={() => navigateToPage('contact')}
                    className="px-5 py-2.5 text-xs font-mono text-white bg-[#C85A32] dark:bg-[#E07A5F] hover:bg-[#B24A26] dark:hover:bg-[#C85A32] rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                  >
                    <span>Deal a Direct Message</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW 3: ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="pt-6">
            <About onNavigate={navigateToPage} />
            <Skills
              skills={portfolioData.skills}
              onEditSkill={handleEditSkill}
              onDeleteSkill={handleDeleteSkill}
              onAddSkill={handleAddSkill}
            />
          </div>
        )}

        {/* VIEW 4: PROJECTS CATALOG PAGE */}
        {currentPage === 'projects' && (
          <div className="pt-6">
            <Projects
              projects={safeProjects}
              onSelectProject={openProjectDetail}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onAddProject={handleAddProject}
            />
          </div>
        )}

        {/* VIEW 5: EXPERIENCE & LEARNING PAGE */}
        {currentPage === 'experience' && (
          <div className="pt-6">
            <Experience
              experience={portfolioData.experiences}
              onEditExperience={handleEditExperience}
              onDeleteExperience={handleDeleteExperience}
              onAddExperience={handleAddExperience}
            />
            <Certificates
              certificates={portfolioData.certificates}
              onOpenModal={(src) => setCertificateImage(src)}
              onEditCertificate={handleEditCertificate}
              onDeleteCertificate={handleDeleteCertificate}
              onAddCertificate={handleAddCertificate}
            />
            <Learning
              learning={portfolioData.learning}
              onEditLearning={handleAddSkill}
              onDeleteLearning={handleDeleteSkill}
              onAddLearning={handleAddSkill}
            />
          </div>
        )}

        {/* VIEW 6: CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="pt-6">
            <Contact />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        name={portfolioData.profile.name}
        onNavigate={navigateToPage}
      />

      {/* Certificate Document Lightbox */}
      <CertificateModal
        imageSrc={certificateImage}
        onClose={() => setCertificateImage(null)}
      />

      <BackToTop />
    </div>
  );
}

export default App;
