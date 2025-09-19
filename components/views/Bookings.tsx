import React, { useState, useEffect } from 'react';
import Panel from '../common/Panel';
import { CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react';
import { getBookings, deleteBooking } from '../../services/geminiService';
import type { Booking } from '../../types';

const StatusBadge = ({ status }: { status: 'confirmed' | 'pending' | 'cancelled' }) => {
    const statusStyles = {
        confirmed: { icon: <CheckCircle size={16} />, color: 'bg-green-100 text-green-700' },
        pending: { icon: <Clock size={16} />, color: 'bg-yellow-100 text-yellow-700' },
        cancelled: { icon: <XCircle size={16} />, color: 'bg-red-100 text-red-700' },
    };
    const { icon, color } = statusStyles[status];
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {icon}
            <span className="ml-1 capitalize">{status}</span>
        </span>
    );
};

const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        setBookings(getBookings());
    }, []);

    const handleDelete = (bookingId: string) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            deleteBooking(bookingId);
            setBookings(getBookings()); // Re-fetch from localStorage to update the UI
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">Bookings</h2>
            <Panel>
                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">No Bookings Found</h3>
                        <p className="mt-1 text-sm text-gray-500">Create a new booking using the Aiiyin helper in the bottom right corner.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Package</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{booking.tourPackage}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(booking.date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={booking.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{booking.participants}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.totalPrice.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <button onClick={() => handleDelete(booking.id)} className="text-maya-soft-terracotta hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors" aria-label={`Delete booking for ${booking.clientName}`}>
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
        </div>
    );
};

export default Bookings;
