import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ServiceMap = ({ services }) => {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Mapa de Servicios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gray-50 rounded-lg border p-4">
          {/* Etiquetas de grupos */}
          <div className="absolute left-4 top-4 text-sm font-semibold text-gray-500">Servicios Core</div>
          <div className="absolute left-4 top-32 text-sm font-semibold text-gray-500">Servicios de Negocio</div>
          <div className="absolute left-4 top-60 text-sm font-semibold text-gray-500">Servicios de Soporte</div>
          
          {/* Servicios */}
          {services.map((service) => (
            <div
              key={service.id}
              className={`absolute w-12 h-12 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                ${service.status === 'healthy' ? 'bg-green-500' : 
                  service.status === 'warning' ? 'bg-yellow-500' : 
                  'bg-red-500'}`}
              style={{
                left: service.x,
                top: service.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 1
              }}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <span className="text-white text-xs font-bold">
                {service.name.split('-')[0].charAt(0).toUpperCase()}
              </span>
              {hoveredService?.id === service.id && (
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 
                              bg-gray-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap z-10">
                  <div className="font-medium">{service.name}</div>
                  <div className="text-xs mt-1">
                    <div>Status: {service.status}</div>
                    <div>Latencia: {service.latency.toFixed(1)}ms</div>
                    <div>P95: {service.p95}ms</div>
                    <div>P99: {service.p99}ms</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceMap;
