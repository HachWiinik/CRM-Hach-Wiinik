import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

// Fix: Added missing Modal component implementation.
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center' onClick={onClose}>
      <div
        className='bg-brand-light-card dark:bg-brand-dark-card rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center border-b pb-3 mb-4'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'>
            <X size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
