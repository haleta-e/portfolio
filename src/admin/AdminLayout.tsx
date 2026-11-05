import React, { useState } from 'react';
import {
  LayoutDashboard, FolderGit2, Code2, Briefcase, GraduationCap,
  Award, User, Image, Mail, Settings, LogOut, ExternalLink, Menu, X, ShieldCheck
} from 'lucide-react';

interface AdminLayoutProps {
  admin: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  unreadCount?: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  admin,
  activeTab,
  setActiveTab,
  onLogout,
  unreadCount = 0,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-sky-400">
          <div className="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center text-sm font-extrabold">EA</div>
          Admin Dashboard
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-1 text-xs font-bold"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 transition-transform ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-sky-500/20">
              EA
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Admin Panel</h2>
              <p className="text-xs text-sky-400 font-medium truncate max-w-[140px]">{admin?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-800">
          <a
            href="#"
            onClick={() => window.location.hash = ''}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-sky-400 hover:bg-slate-800 transition-colors"
          >
            <ExternalLink size={16} /> View Public Website
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/50 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400" /> Authenticated Administrator: <span className="text-white font-bold">{admin?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={() => window.location.hash = ''}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={14} /> Public Website
            </a>
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
