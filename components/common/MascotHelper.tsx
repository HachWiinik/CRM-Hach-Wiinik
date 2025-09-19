// Fix: Populating file with a MascotHelper component.
import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface MascotHelperProps {
  initialMessage: string;
}

const MascotHelper: React.FC<MascotHelperProps> = ({ initialMessage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [message] = useState(initialMessage);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="bg-maya-soft-terracotta text-white p-4 rounded-lg shadow-lg max-w-sm relative">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-200"
        >
          <X size={18} />
        </button>
        <div className="flex items-start">
          <Lightbulb className="h-8 w-8 mr-3 flex-shrink-0" />
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MascotHelper;
