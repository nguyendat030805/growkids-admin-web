import { useNavigate, useLocation } from 'react-router-dom';
import { Music, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContentTabSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStoryPage = location.pathname.includes('stories');

  const tabs = [
    { id: 'songs', label: 'Mini Songs', path: '/admin/mini-songs', icon: Music },
    { id: 'stories', label: 'Stories', path: '/admin/stories', icon: BookOpen },
  ];

  return (
    <div className="flex p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-[2rem] w-fit shadow-inner border border-slate-200/50 relative">
      {tabs.map((tab) => {
        const isActive = (tab.id === 'stories') === isStoryPage;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`relative flex items-center space-x-3 px-8 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-colors duration-300 z-10 ${
              isActive ? 'text-[#FFB500]' : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            <Icon size={14} strokeWidth={3} />
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-[1.8rem] shadow-md z-[-1]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};