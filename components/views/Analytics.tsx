import React from 'react';
import Panel from '../common/Panel';
import { mockAnalyticsData } from '../../data/mockData';
import { TrendingUp, Users, Package, DollarSign, Zap } from 'lucide-react';

const Analytics = () => {
  const { bookingsOverTime, revenueByPackage, clientGrowth, popularPackages, quickImpactImprovements } = mockAnalyticsData;

  const ChartPanel = ({ title, icon, children }: {title: string, icon: React.ReactNode, children: React.ReactNode}) => (
    <Panel>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      <div>{children}</div>
    </Panel>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-heading">Analytics Dashboard</h2>
      
      <ChartPanel title="Impacto Rápido de Mejoras" icon={<Zap className="text-maya-caribbean-turquoise" />}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiencia</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Corregido</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imágenes Clave</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mejora Visual</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quickImpactImprovements.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.correctedPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keyImages}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.visualImprovement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartPanel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPanel title="Bookings Over Time" icon={<TrendingUp className="text-maya-caribbean-turquoise" />}>
           <div className="space-y-2">
            {bookingsOverTime.map(d => (
              <div key={d.month} className="flex items-center">
                <span className="w-24 text-sm font-medium">{d.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-maya-caribbean-turquoise h-4 rounded-full" style={{ width: `${(d.bookings / 50) * 100}%` }}></div>
                </div>
                <span className="w-12 text-right text-sm font-semibold">{d.bookings}</span>
              </div>
            ))}
          </div>
        </ChartPanel>
        
        <ChartPanel title="Client Growth" icon={<Users className="text-maya-caribbean-turquoise" />}>
          <div className="space-y-2">
            {clientGrowth.map(d => (
              <div key={d.month} className="flex items-center">
                <span className="w-24 text-sm font-medium">{d.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div className="bg-maya-caribbean-turquoise h-4 rounded-full" style={{ width: `${(d.newClients / 20) * 100}%` }}></div>
                </div>
                <span className="w-12 text-right text-sm font-semibold">{d.newClients}</span>
              </div>
            ))}
          </div>
        </ChartPanel>

        <ChartPanel title="Revenue by Package" icon={<DollarSign className="text-maya-caribbean-turquoise" />}>
           <ul className="space-y-2">
            {revenueByPackage.map(p => (
              <li key={p.package} className="flex justify-between items-center text-sm">
                <span>{p.package}</span>
                <span className="font-semibold">${p.revenue.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </ChartPanel>
        
        <ChartPanel title="Most Popular Packages" icon={<Package className="text-maya-caribbean-turquoise" />}>
          <ul className="space-y-2">
            {popularPackages.map(p => (
              <li key={p.name} className="flex justify-between items-center text-sm">
                <span>{p.name}</span>
                <span className="font-semibold">{p.bookings} bookings</span>
              </li>
            ))}
          </ul>
        </ChartPanel>
      </div>
    </div>
  );
};

export default Analytics;