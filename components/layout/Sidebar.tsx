// Fix: Populating file with a functional Sidebar component.
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Calendar, Users, BookOpen, Tag, Lightbulb, BarChart2, Bell } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  to: string;
  icon: React.ElementType;
  labelKey: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { to: '/bookings', icon: Calendar, labelKey: 'sidebar.bookings', roles: ['super-admin', 'admin'] },
  { to: '/clients', icon: Users, labelKey: 'sidebar.clients', roles: ['super-admin', 'admin'] },
  { to: '/catalog', icon: BookOpen, labelKey: 'sidebar.catalog', roles: ['super-admin', 'admin'] },
  { to: '/promotions', icon: Tag, labelKey: 'sidebar.promotions', roles: ['super-admin', 'admin'] },
  { to: '/recommendations', icon: Lightbulb, labelKey: 'sidebar.recommendations', roles: ['super-admin', 'admin'] },
  { to: '/analytics', icon: BarChart2, labelKey: 'sidebar.analytics', roles: ['super-admin'] },
  { to: '/notifications', icon: Bell, labelKey: 'sidebar.notifications', roles: ['super-admin'] },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const linkClasses = "flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeLinkClasses = "bg-maya-caribbean-turquoise text-white";

  const visibleNavItems = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <aside className={`flex-shrink-0 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <div className="flex items-center justify-center h-16 shadow-md flex-shrink-0">
        <h1 className="text-2xl font-bold text-maya-caribbean-turquoise">Hach Wíinik</h1>
      </div>
      <nav className="mt-6 px-2">
        {visibleNavItems.map(item => (
          <ReactRouterDOM.NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
          >
            <item.icon className="h-6 w-6" />
            <span className="ml-4">{t(item.labelKey)}</span>
          </ReactRouterDOM.NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
