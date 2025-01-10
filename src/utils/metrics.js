// Función para generar datos de series temporales
export const generateTimeSeriesData = (baseValue, variance, count = 30) => {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: new Date(Date.now() - (count - i) * 60000).toISOString(),
    value: Math.max(0, baseValue + (Math.random() * variance * 2 - variance))
  }));
};

// Función para generar datos de latencia
export const generateLatencyData = (baseLatency, variance) => {
  return Math.max(0, baseLatency + (Math.random() * variance * 2 - variance));
};

// Función para calcular el tiempo de respuesta promedio
export const calculateAverageResponseTime = (services) => {
  if (!services?.length) return 0;
  return services.reduce((sum, service) => sum + service.latency, 0) / services.length;
};

// Función para formatear bytes
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// Función para obtener el color basado en el estado
export const getStatusColor = (status) => {
  const colors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  };
  return colors[status] || colors.warning;
};

// Función para calcular percentiles
export const calculatePercentile = (values, percentile) => {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[index];
};
