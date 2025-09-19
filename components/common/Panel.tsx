import React from 'react';

type PanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Panel: React.FC<PanelProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-brand-light-card dark:bg-brand-dark-card rounded-lg shadow-md p-6 ${className}`}>
      <h2 className='text-xl font-semibold mb-4 text-brand-light dark:text-brand-dark'>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Panel;