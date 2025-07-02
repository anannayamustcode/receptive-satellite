import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';

export default function EventsBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/events-by-provider')
      .then(res => res.json())
      .then(setData);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <p className="font-semibold text-slate-800 mb-1">{label}</p>
          <p className="text-sm text-slate-600">
            Total Events: <span className="font-medium text-blue-600">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Events per Provider</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
          <span className="text-sm text-slate-500">Distribution</span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-500">Loading provider data...</p>
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="provider" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="total" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { useEffect, useState } from 'react';

// export default function EventsBarChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/api/events-by-provider')
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h2 className="text-xl font-bold mb-2">Events per Provider</h2>
//       <ResponsiveContainer 
//       className={"ml-auto mr-auto"}
//       width="30%" height={300}>
//         <BarChart data={data}>
//           <XAxis dataKey="provider" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="total" fill="#6366F1" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
