import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ServiceMap from './ServiceMap';
import MetricsPanel from './MetricsPanel';
import InfraMetrics from './InfraMetrics';

const NAMESPACE = 'prod-back-app-salcobrand';
const UPDATE_INTERVAL = 15000;

const generateTimeSeriesData = (baseValue, variance, count = 30) => {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: new Date(Date.now() - (count - i) * 60000).toISOString(),
    value: Math.max(0, baseValue + (Math.random() * variance * 2 - variance))
  }));
};

const generateLatencyData = (baseLatency, variance) => {
  return Math.max(0, baseLatency + (Math.random() * variance * 2 - variance));
};

const DynatraceDashboard = () => {
  // Estados
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'auth-service', 
      status: 'healthy', 
      group: 'core', 
      x: 150, 
      y: 100,
      latency: 150,
      p95: 180,
      p99: 220
    },
    { 
      id: 2, 
      name: 'user-service', 
      status: 'healthy', 
      group: 'core', 
      x: 250, 
      y: 100,
      latency: 120,
      p95: 150,
      p99: 180
    },
    { 
      id: 3, 
      name: 'order-service', 
      status: 'warning', 
      group: 'business', 
      x: 100, 
      y: 200,
      latency: 200,
      p95: 250,
      p99: 300
    },
    { 
      id: 4, 
      name: 'payment-service', 
      status: 'healthy', 
      group: 'business', 
      x: 200, 
      y: 200,
      latency: 180,
      p95: 220,
      p99: 270
    },
    { 
      id: 5, 
      name: 'inventory-service', 
      status: 'critical', 
      group: 'business', 
      x: 300, 
      y: 200,
      latency: 250,
      p95: 300,
      p99: 350
    }
  ]);

  const [metrics, setMetrics] = useState({
    http: {
      success: generateTimeSeriesData(950, 30),
      error400: generateTimeSeriesData(12, 5),
      error500: generateTimeSeriesData(3, 2)
    },
    infra: {
      cpu: generateTimeSeriesData(65, 15),
      memory: generateTimeSeriesData(75, 10),
      network: {
        ingress: generateTimeSeriesData(150, 50),
        egress: generateTimeSeriesData(100, 30)
      }
    },
    cluster: {
      pods: { running: 24, total: 28 },
      containers: { running: 45, total: 50 },
      replicas: { available: 24, desired: 28 },
      workers: { healthy: 5, total: 6 }
    }
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Actualización periódica
  useEffect(() => {
    const updateData = () => {
      setMetrics(prev => ({
        ...prev,
        http: {
          success: generateTimeSeriesData(950, 30),
          error400: generateTimeSeriesData(12, 5),
          error500: generateTimeSeriesData(3, 2)
        },
        infra: {
          cpu: generateTimeSeriesData(65, 15),
          memory: generateTimeSeriesData(75, 10),
          network: {
            ingress: generateTimeSeriesData(150, 50),
            egress: generateTimeSeriesData(100, 30)
          }
        }
      }));

      setServices(prev => prev.map(service => ({
        ...service,
        latency: generateLatencyData(service.latency, service.latency * 0.2),
        status: Math.random() > 0.8 ? 
          ['healthy', 'warning', 'critical'][Math.floor(Math.random() * 3)] : 
          service.status
      })));

      setLastUpdate(new Date());
    };

    const interval = setInterval(updateData, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const calculateAverageResponseTime = () => {
    return services.reduce((sum, service) => sum + service.latency, 0) / services.length;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Salcobrand</h1>
          <p className="text-gray-500">Namespace: {NAMESPACE}</p>
        </div>
        <div className="text-sm text-gray-500">
          Última actualización: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Response Time Panel */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-900">Tiempo de Respuesta Promedio</h2>
              <div className="mt-2 text-4xl font-bold text-blue-700">
                {calculateAverageResponseTime().toFixed(1)} ms
              </div>
            </div>
            <div className="text-right">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-blue-700 font-semibold">P95</div>
                  <div className="text-lg font-bold text-blue-900">
                    {(calculateAverageResponseTime() * 1.2).toFixed(1)} ms
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-700 font-semibold">P99</div>
                  <div className="text-lg font-bold text-blue-900">
                    {(calculateAverageResponseTime() * 1.4).toFixed(1)} ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Panels */}
      <MetricsPanel metrics={metrics} />

      {/* Service Map */}
      <ServiceMap services={services} />

      {/* Infrastructure Metrics */}
      <InfraMetrics metrics={metrics.infra} clusterMetrics={metrics.cluster} />
    </div>
  );
};

export default DynatraceDashboard;
