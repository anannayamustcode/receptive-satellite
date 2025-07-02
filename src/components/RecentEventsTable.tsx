import { useEffect, useState } from 'react';

export default function RecentEventsTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/recent-events')
      .then(res => res.json())
      .then(setData);
  }, []);

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      high: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        dot: 'bg-red-500',
        icon: '🚨'
      },
      medium: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        dot: 'bg-yellow-500',
        icon: '⚠️'
      },
      low: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        dot: 'bg-green-500',
        icon: '✅'
      }
    };

    const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.low;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot} mr-2`}></span>
        <span className="mr-1">{config.icon}</span>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const getProviderIcon = (provider: string) => {
    const icons = {
      aws: '☁️',
      azure: '🔷',
      gcp: '🌩️',
      default: '⚡'
    };
    return icons[provider?.toLowerCase() as keyof typeof icons] || icons.default;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Recent Security Events</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-slate-500">Live Feed</span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              View All
            </button>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-500">Loading recent events...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50">
              {data.map((e: any, i: number) => (
                <tr 
                  key={i} 
                  className="hover:bg-slate-50/50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {e.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{e.name}</div>
                        <div className="text-xs text-slate-500">User Account</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getProviderIcon(e.provider)}</span>
                      <span className="text-sm font-medium text-slate-700 capitalize">
                        {e.provider}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900 font-medium max-w-md">
                      {e.event_type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(e.severity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex flex-col">
                      <span>{new Date(e.timestamp).toLocaleDateString()}</span>
                      <span className="text-xs text-slate-400">
                        {new Date(e.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length > 0 && (
        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-200/50">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Showing {data.length} recent events</span>
            <div className="flex items-center space-x-2">
              <span>Auto-refresh in</span>
              <span className="font-mono text-blue-600">30s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// import { useEffect, useState } from 'react';

// export default function RecentEventsTable() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('/api/recent-events')
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <h2 className="text-xl font-bold mb-2">Recent Security Events</h2>
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="text-left border-b">
//             <th>User</th>
//             <th>Provider</th>
//             <th>Event</th>
//             <th>Severity</th>
//             <th>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((e, i) => (
//             <tr key={i} className="border-b last:border-none">
//               <td>{e.name}</td>
//               <td>{e.provider}</td>
//               <td>{e.event_type}</td>
//               <td className={`text-${e.severity === 'high' ? 'red' : e.severity === 'medium' ? 'yellow' : 'green'}-600`}>
//                 {e.severity}
//               </td>
//               <td>{new Date(e.timestamp).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
