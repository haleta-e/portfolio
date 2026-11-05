import React, { useState, useEffect } from 'react';
import { FolderGit2, Code2, Award, Mail, Image, ArrowUpRight } from 'lucide-react';
import { adminFetch } from './adminApi';

interface OverviewModuleProps {
  onNavigate: (tab: string) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch('/api/admin/overview')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-slate-400 py-12 text-center">Loading overview analytics...</div>;
  }

  const statCards = [
    { title: 'Total Projects', value: stats?.projectsCount || 0, sub: `${stats?.publishedProjectsCount || 0} published`, icon: FolderGit2, tab: 'projects' },
    { title: 'Skills & Tech', value: stats?.skillsCount || 0, sub: 'Active capabilities', icon: Code2, tab: 'skills' },
    { title: 'Certificates', value: stats?.certificatesCount || 0, sub: 'Verified credentials', icon: Award, tab: 'certificates' },
    { title: 'Unread Messages', value: stats?.unreadMessagesCount || 0, sub: 'Contact form inbox', icon: Mail, tab: 'messages', highlight: Boolean(stats?.unreadMessagesCount && stats.unreadMessagesCount > 0) },
    { title: 'Media Assets', value: stats?.mediaCount || 0, sub: 'Uploaded files & PDFs', icon: Image, tab: 'media' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Portfolio statistics, content management, and message alerts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(card.tab)}
              className={`group cursor-pointer bg-slate-900 border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between ${
                card.highlight ? 'border-sky-500/80 bg-sky-500/5' : 'border-slate-800 hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={18} className="text-slate-500 group-hover:text-sky-400 transition-colors" />
              </div>

              <div className="mt-6 space-y-1">
                <h3 className="text-3xl font-extrabold text-white">{card.value}</h3>
                <p className="text-sm font-semibold text-slate-300">{card.title}</p>
                <p className="text-xs text-slate-500">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-transform hover:scale-105"
          >
            + Add New Project
          </button>
          <button
            onClick={() => onNavigate('certificates')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors"
          >
            Upload Certificate
          </button>
          <button
            onClick={() => onNavigate('media')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors"
          >
            Media Library
          </button>
        </div>
      </div>
    </div>
  );
};
