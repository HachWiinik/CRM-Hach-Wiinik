import React, { useState, useEffect } from 'react';
import { WifiOff, User } from 'lucide-react';

const Header = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-maya-forest-green to-maya-caribbean-turquoise text-white shadow-md p-4 flex items-center justify-between flex-shrink-0 z-20">
      <div className="flex items-center">
        <img src="https://res.cloudinary.com/dy08afhuz/image/upload/v1758236390/grok-image-61ceeb3a-8e89-4bec-8609-5658d8038280_nhcxbv.jpg" alt="Hach Wíinik Official Logo" className="h-10 w-10" />
        <img src="https://res.cloudinary.com/dy08afhuz/image/upload/v1758235489/1000607110_bbnbwv.png" alt="Aiiyin Mascot" className="h-10 w-10 ml-2 rounded-full" />
        <h1 className="ml-4 text-2xl font-heading font-bold">Hach Wíinik CRM</h1>
      </div>
      <div className="flex items-center space-x-4">
        {isOffline && (
          <div className="hidden md:flex items-center bg-maya-light-smoke text-maya-forest-green px-3 py-1 rounded-full text-sm font-medium border border-maya-forest-green">
            <WifiOff size={16} className="mr-2" />
            Offline Mode
          </div>
        )}
        <div className="language-selector">
          <select className="bg-transparent border border-white rounded-md px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-white">
            <option value="en" className="text-black">English</option>
            <option value="es" className="text-black">Español</option>
          </select>
        </div>
        <div className="user-profile flex items-center">
          <span className="mr-3 hidden md:inline">John Doe</span>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-maya-forest-green">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;