import React, { useState } from 'react';
import { X } from 'lucide-react';

type MascotHelperProps = {
  initialMessage: string;
};

const MascotHelper: React.FC<MascotHelperProps> = ({ initialMessage }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className='fixed bottom-5 right-5 z-50'>
      <div className='bg-brand-dark-card text-white p-4 rounded-lg shadow-glow max-w-sm relative backdrop-filter backdrop-blur-sm bg-opacity-80'>
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-2 right-2 text-white hover:text-gray-200'
        >
          <X size={18} />
        </button>
        <div className='flex items-start'>
          <img src="https://res.cloudinary.com/dy08afhuz/image/upload/v1758235530/Gemini_Generated_Image_1bwkbj1bwkbj1bwk_wegkkp.png" alt="Help Mascot" className="h-12 w-12 mr-3 flex-shrink-0" />
          <p className='text-sm'>{initialMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default MascotHelper;