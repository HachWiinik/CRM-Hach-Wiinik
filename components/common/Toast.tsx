import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

type ToastProps = {
    message: string;
    type: 'success' | 'error';
};

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const baseClasses = "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center transition-all duration-300";
  const variantClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white'
  };
  const visibilityClasses = visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10';

  return (
    <div className={`${baseClasses} ${variantClasses[type]} ${visibilityClasses}`}>
      {type === 'success' ? <CheckCircle className='mr-3' /> : <XCircle className='mr-3' />}
      {message}
    </div>
  );
};

export default Toast;
