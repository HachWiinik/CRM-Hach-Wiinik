import React from 'react';
import {
  BarChart2,
  Calendar,
  Users,
  Briefcase,
  Bell,
  Tag,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

type SidebarProps = {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
};

const navItems = [
  { id: 'analytics', labelKey: 'sidebar.analytics', icon: BarChart2 },
  { id: 'bookings', labelKey: 'sidebar.bookings', icon: Calendar },
  { id: 'clients', labelKey: 'sidebar.clients', icon: Users },
  { id: 'catalog', labelKey: 'sidebar.catalog', icon: Briefcase },
  { id: 'promotions', labelKey: 'sidebar.promotions', icon: Tag },
  { id: 'recommendations', labelKey: 'sidebar.recommendations', icon: Lightbulb },
  { id: 'chat', labelKey: 'sidebar.chat', icon: MessageSquare },
  { id: 'notifications', labelKey: 'sidebar.notifications', icon: Bell },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen }) => {
    const { t } = useTranslation();
  return (
    <aside
      className={`bg-brand-light-card dark:bg-brand-dark-card text-brand-light dark:text-brand-dark w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:relative fixed h-full lg:h-auto z-20 lg:z-auto shadow-lg lg:shadow-none`}
    >
        <div className='p-4 border-b border-gray-200 dark:border-gray-700 flex items-center'>
            <video 
              src="https://res.cloudinary.com/dy08afhuz/video/upload/v1758236614/grok-video-61ceeb3a-8e89-4bec-8609-5658d8038280_sk7hst.mp4" 
              className='h-10 w-10 mr-2 rounded-full'
              autoPlay 
              loop 
              muted 
            />
            <span className='text-xl font-bold'>NeuroFlow CRM</span>
        </div>
      <nav className='p-4'>
        <ul>
          {navItems.map(item => (
            <li key={item.id} className='mb-2'>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left flex items-center p-2 rounded-lg transition-colors duration-200 ${
                  currentView === item.id
                    ? 'bg-brand-gradient text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className='mr-3 h-5 w-5' />
                {t(item.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;