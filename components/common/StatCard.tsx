import React from 'react';
import { LucideProps } from 'lucide-react';

type StatCardProps = {
  icon: React.ElementType<LucideProps>;
  label: string;
  value: string;
  change?: string;
};

// Fix: Added missing StatCard component implementation.
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, change }) => {
  return (
    <div className='bg-brand-light-card dark:bg-brand-dark-card p-6 rounded-lg shadow-md flex items-center space-x-4'>
      <div className='bg-brand-gradient p-3 rounded-full text-white'>
        <Icon className='h-6 w-6' />
      </div>
      <div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{label}</p>
        <p className='text-2xl font-bold'>{value}</p>
      </div>
      {change && (
        <span className='text-sm text-green-500 ml-auto'>{change}</span>
      )}
    </div>
  );
};

export default StatCard;
