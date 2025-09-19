// Fix: Populating file with a reusable Panel component.
import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Panel;
