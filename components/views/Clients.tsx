import React from 'react';
import { mockClients } from '../../data/mockData';
import Panel from '../common/Panel';
import { Mail, Phone, Hash } from 'lucide-react';

const Clients = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockClients.map((client) => (
                    <Panel key={client.id} className="flex flex-col">
                        <div className="flex items-center mb-4">
                            <img src={client.avatar} alt={client.name} className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <h3 className="text-lg font-bold">{client.name}</h3>
                                <p className="text-sm text-gray-500">Joined: {client.joinDate}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 flex-grow">
                            <div className="flex items-center">
                                <Mail size={14} className="mr-2" />
                                <span>{client.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone size={14} className="mr-2" />
                                <span>{client.phone}</span>
                            </div>
                             <div className="flex items-center">
                                <Hash size={14} className="mr-2" />
                                <span>{client.totalBookings} bookings</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                             <div className="flex flex-wrap gap-2">
                                {client.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-maya-forest-green/10 text-maya-forest-green text-xs font-medium rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    );
};

export default Clients;
