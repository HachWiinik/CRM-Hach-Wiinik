
import React from 'react';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import type { NavItem } from '../../types';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  navItems: NavItem[];
  activePath: string;
  onTabChange: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle, navItems, activePath, onTabChange }) => {
  return (
    <nav className={`flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out z-10 ${isExpanded ? 'w-60' : 'w-20'}`}>
      <div 
        onClick={onToggle} 
        className="flex items-center justify-center h-16 cursor-pointer hover:bg-gray-100 text-maya-forest-green"
      >
        <div className="flex items-center w-full px-5">
            {isExpanded ? <PanelLeftClose size={24}/> : <PanelRightClose size={24}/>}
            {isExpanded && <span className="ml-4 font-semibold font-heading">Menu</span>}
        </div>
      </div>
      
      <div className="flex-1">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onTabChange(item.path)}
            className={`flex items-center h-14 cursor-pointer transition-all duration-200 border-l-4 ${activePath === item.path ? 'bg-maya-forest-green/10 border-maya-forest-green text-maya-caribbean-turquoise' : 'border-transparent text-maya-forest-green hover:bg-maya-caribbean-turquoise/10'}`}
          >
            <div className="flex items-center w-full px-5">
              {item.icon}
              {isExpanded && <span className="ml-4 font-medium whitespace-nowrap">{item.text}</span>}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
