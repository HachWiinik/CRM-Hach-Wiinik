import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import type { Language, UserRole } from '@/types';

type HeaderProps = {
  onToggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, setCurrentRole } = useAuth();
  const { language, setLanguage, t } = useTranslation();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentRole(e.target.value as UserRole);
  };

  return (
    <header className='flex items-center justify-between p-4 bg-brand-light-card dark:bg-brand-dark-card shadow-md flex-shrink-0'>
      <div className='flex items-center'>
        <button onClick={onToggleSidebar} className='text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden'>
          <Menu className='h-6 w-6' />
        </button>
        <h1 className='text-xl font-semibold ml-4'>{t('header.title')}</h1>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <select
            value={language}
            // Fix: Cast the event target value to the 'Language' type to match the 'setLanguage' function signature.
            onChange={(e) => setLanguage(e.target.value as Language)}
            className='bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-1.5 appearance-none focus:outline-none cursor-pointer'
            aria-label={t('header.language')}
          >
            <option value='en'>EN</option>
            <option value='es'>ES</option>
          </select>
        </div>
        
        <button onClick={toggleTheme} className='focus:outline-none' aria-label={t('header.toggleTheme')}>
          {theme === 'light' ? <Moon className='h-6 w-6' /> : <Sun className='h-6 w-6' />}
        </button>

        {user && (
          <div className='relative'>
            <select
              value={user.role}
              onChange={handleRoleChange}
              className='bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-1.5 appearance-none focus:outline-none cursor-pointer'
              aria-label={t('header.role')}
            >
              <option value='super-admin'>{t('roles.superAdmin')}</option>
              <option value='admin'>{t('roles.admin')}</option>
              <option value='manager'>{t('roles.manager')}</option>
              <option value='sales-rep'>{t('roles.salesRep')}</option>
            </select>
          </div>
        )}

        <div className='flex items-center'>
            <img className='h-8 w-8 rounded-full object-cover' src={user?.avatarUrl} alt='User avatar' />
            <span className='ml-2 hidden md:block'>{user?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
