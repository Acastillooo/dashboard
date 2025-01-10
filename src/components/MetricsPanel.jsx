import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetricsPanel = ({ metrics }) => {
  const { http } = metrics;

  return (
    <>
      {/* HTTP Response Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Respuestas 200</span>
              <span className="text-2xl font-bold text-green-600">
                {http.success[http.success.length - 1].value.toFixed(0)}/min
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Errores 400</span>
              <span className="text-2xl font-bold text-yellow-600">
                {(http.error400[http.error400.length - 1].value / 60).toFixed(2)}/seg
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Errores 500</span>
              <span className="text-2xl font-bold text-red-600">
                {(http.error500[http.error500.length - 1].value / 60).toFixed(2)}/seg
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Latencia</span>
              <span className="text-2xl font-bold text-blue-600">
                {http.success[http.success.length - 1].value.toFixed(0)} ms
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HTTP Trends */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tendencias de Respuestas HTTP</CardTitle>
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
                  data={http.success}
                  dataKey="value" 
                  stroke="#16a34a" 
                  name="200 OK"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  data={http.error400}
                  dataKey="value" 
                  stroke="#ca8a04" 
                  name="400 Errores"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  data={http.error500}
                  dataKey="value" 
                  stroke="#dc2626" 
                  name="500 Errores"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tasa de Error</span>
              <span className="text-2xl font-bold text-purple-600">
                {(((http.error400[http.error400.length - 1].value + 
                   http.error500[http.error500.length - 1].value) / 
                   http.success[http.success.length - 1].value) * 100).toFixed(2)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Throughput</span>
              <span className="text-2xl font-bold text-indigo-600">
                {(http.success[http.success.length - 1].value / 60).toFixed(1)}/seg
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Usuarios Afectados</span>
              <span className="text-2xl font-bold text-orange-600">
                {Math.floor(http.error500[http.error500.length - 1].value * 1.5)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MetricsPanel;
