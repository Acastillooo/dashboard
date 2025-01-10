import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InfraMetrics = ({ metrics, clusterMetrics }) => {
  return (
    <>
      {/* Resource Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>CPU y Memoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    data={metrics.cpu}
                    dataKey="value" 
                    stroke="#2563eb" 
                    name="CPU %"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    data={metrics.memory}
                    dataKey="value" 
                    stroke="#16a34a" 
                    name="Memory %"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    data={metrics.network.ingress}
                    dataKey="value" 
                    stroke="#9333ea" 
                    name="Ingress MB/s"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    data={metrics.network.egress}
                    dataKey="value" 
                    stroke="#c026d3" 
                    name="Egress MB/s"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cluster Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Estado del Cluster</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Pods</div>
              <div className="text-xl font-bold">
                {clusterMetrics.pods.running}/{clusterMetrics.pods.total}
              </div>
              <div className="text-sm text-gray-500">Running</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Containers</div>
              <div className="text-xl font-bold">
                {clusterMetrics.containers.running}/{clusterMetrics.containers.total}
              </div>
              <div className="text-sm text-gray-500">Running</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Réplicas</div>
              <div className="text-xl font-bold">
                {clusterMetrics.replicas.available}/{clusterMetrics.replicas.desired}
              </div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Workers</div>
              <div className="text-xl font-bold">
                {clusterMetrics.workers.healthy}/{clusterMetrics.workers.total}
              </div>
              <div className="text-sm text-gray-500">Healthy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage and Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.storage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ea580c" 
                    name="Storage %"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workers Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: clusterMetrics.workers.total }).map((_, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Worker {idx + 1}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {Math.floor(Math.random() * 30 + 70)}%
                  </div>
                  <div className={`text-sm ${idx < clusterMetrics.workers.healthy ? 'text-green-500' : 'text-red-500'}`}>
                    {idx < clusterMetrics.workers.healthy ? 'Healthy' : 'Warning'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InfraMetrics;
