// src/components/EventsPieChart.tsx
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function EventsPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(setData);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <p className="font-semibold text-slate-800">
            {data.provider}: {data.event_type}
          </p>
          <p className="text-sm text-slate-600">
            Events: <span className="font-medium text-slate-800">{data.event_count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Event Types by Provider</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-sm text-slate-500">Live Data</span>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-500">Loading chart data...</p>
          </div>
        </div>
      ) : (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="event_count"
                nameKey="event_type"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={index} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
// // src/components/EventsPieChart.tsx
// import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
// import { useEffect, useState } from 'react';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// export default function EventsPieChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/api/events')
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <h2 className="text-xl font-semibold mb-4">Event Types by Provider</h2>
//       <ResponsiveContainer 
//       className={"bg-white p-4 rounded-2xl shadow"}
//       width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="event_count"
//             nameKey="event_type"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             fill="#8884d8"
//             label={({ provider, event_type }) => `${provider}: ${event_type}`}
//           >
//             {data.map((_, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
