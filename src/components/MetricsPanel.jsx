import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MetricsPanel = ({ metrics }) => {
  const { http } = metrics;

  return (
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
  );
};

export default MetricsPanel;
