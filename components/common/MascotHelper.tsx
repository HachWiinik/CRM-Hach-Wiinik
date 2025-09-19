import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import Button from './Button';
import { mockRecommendations } from '../../data/mockData';
import { addBooking } from '../../services/geminiService';
import { ShoppingCart } from 'lucide-react';

const MascotHelper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [clientName, setClientName] = useState('');
  const [tourId, setTourId] = useState(mockRecommendations[0]?.id || '');
  const [bookingDate, setBookingDate] = useState('');
  const [participants, setParticipants] = useState(1);
  const [error, setError] = useState('');

  const selectedTour = useMemo(() => mockRecommendations.find(r => r.id === tourId), [tourId]);

  const handleOpen = () => {
    // Reset form on open
    setClientName('');
    setTourId(mockRecommendations[0]?.id || '');
    setBookingDate('');
    setParticipants(1);
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !tourId || !bookingDate || !selectedTour) {
      setError('Please fill out all fields.');
      return;
    }

    const totalPrice = (selectedTour.suggestedPrice || 0) * participants;

    addBooking({
      clientName,
      tourPackage: selectedTour.title,
      date: bookingDate,
      participants,
      totalPrice,
    });

    alert(`Booking created for ${clientName}!`);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-maya-sun-yellow shadow-2xl flex items-center justify-center cursor-pointer z-50 transform transition-transform duration-300 hover:scale-110"
        aria-label="Aiiyin Helper"
      >
        <img 
          src="https://res.cloudinary.com/dy08afhuz/image/upload/v1758235530/Gemini_Generated_Image_1bwkbj1bwkbj1bwk_wegkkp.png" 
          alt="Aiiyin Helper Mascot" 
          className="w-16 h-16 rounded-full" 
        />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create a New Booking">
        <div className="text-center mb-4">
          <img src="https://res.cloudinary.com/dy08afhuz/image/upload/v1758235530/Gemini_Generated_Image_1bwkbj1bwkbj1bwk_wegkkp.png" alt="Aiiyin" className="h-20 w-20 mx-auto mb-3 rounded-full"/>
          <p className="text-gray-600">Aiiyin is here to help you create a new booking instantly.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
            <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise sm:text-sm" />
          </div>
          <div>
            <label htmlFor="tourPackage" className="block text-sm font-medium text-gray-700">Tour Package</label>
            <select id="tourPackage" value={tourId} onChange={e => setTourId(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise sm:text-sm rounded-md">
              {mockRecommendations.map(rec => (
                <option key={rec.id} value={rec.id}>{rec.title} (${rec.suggestedPrice})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="bookingDate" value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise sm:text-sm" />
            </div>
            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-gray-700">Participants</label>
              <input type="number" id="participants" value={participants} onChange={e => setParticipants(parseInt(e.target.value, 10) || 1)} min="1" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise sm:text-sm" />
            </div>
          </div>
          {selectedTour && (
            <div className="text-right font-semibold text-lg text-maya-forest-green">
              Total: ${(selectedTour.suggestedPrice * participants).toLocaleString()}
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
            <Button type="submit">
              <ShoppingCart size={16} className="mr-2"/>
              Confirm Booking
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MascotHelper;
