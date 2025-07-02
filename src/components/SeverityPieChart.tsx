import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

const SEVERITY_ICONS = {
  low: '🟢',
  medium: '🟡',
  high: '🔴',
};

export default function SeverityPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/severity-counts')
      .then(res => res.json())
      .then(setData);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{SEVERITY_ICONS[data.severity as keyof typeof SEVERITY_ICONS]}</span>
            <p className="font-semibold text-slate-800 capitalize">
              {data.severity} Severity
            </p>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Count: <span className="font-medium text-slate-800">{data.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm font-medium text-slate-700 capitalize flex items-center space-x-1">
              <span>{SEVERITY_ICONS[entry.value as keyof typeof SEVERITY_ICONS]}</span>
              <span>{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Events by Severity</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
          <span className="text-sm text-slate-500">Risk Assessment</span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-slate-500">Loading severity data...</p>
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="count"
                data={data}
                nameKey="severity"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.severity as keyof typeof COLORS]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import { useEffect, useState } from 'react';

// const COLORS = {
//   low: '#34D399',
//   medium: '#FBBF24',
//   high: '#EF4444',
// };

// export default function SeverityPieChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/api/severity-counts')
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   return (
//     <div className="mt-6 bg-white p-4 rounded-2xl  shadow">
//       <h2 className="text-xl font-bold mb-2">Events by Severity</h2>
//       <PieChart 
//       className={"ml-auto mr-auto"}
//       width={300} height={250}>
//         <Pie
//           dataKey="count"
//           data={data}
//           nameKey="severity"
//           cx="50%" cy="50%"
//           outerRadius={100}
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[entry.severity]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }
