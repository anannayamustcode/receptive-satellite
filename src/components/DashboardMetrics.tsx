import React, { useEffect, useState } from "react";

interface Metric {
  totalEvents: number;
  highSeverity: number;
  commonEvent: string;
  totalAccounts: number;
  noEventAccounts: number;
  totalUsers: number;
}

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<Metric | null>(null);

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then(setMetrics)
      .catch(console.error);
  }, []);

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const metricCards = [
    {
      title: "Total Events",
      value: metrics.totalEvents,
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "High Severity Events",
      value: metrics.highSeverity,
      icon: "🚨",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Most Common Event",
      value: metrics.commonEvent,
      icon: "🎯",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Cloud Accounts",
      value: metrics.totalAccounts,
      icon: "☁️",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Accounts with No Events",
      value: metrics.noEventAccounts,
      icon: "✅",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Users",
      value: metrics.totalUsers,
      icon: "👥",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricCards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  );
}

function Card({ 
  title, 
  value, 
  icon, 
  color, 
  bgColor 
}: { 
  title: string; 
  value: string | number; 
  icon: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-2xl p-6 transition-all duration-300 hover:scale-105 border border-white/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center text-xl`}>
              {icon}
            </div>
            <h3 className="text-sm font-medium text-slate-600 leading-tight">{title}</h3>
          </div>
          <p className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}// import React, { useEffect, useState } from "react";

// interface Metric {
//   totalEvents: number;
//   highSeverity: number;
//   commonEvent: string;
//   totalAccounts: number;
//   noEventAccounts: number;
//   totalUsers: number;
// }

// export default function DashboardMetrics() {
//   const [metrics, setMetrics] = useState<Metric | null>(null);

//   useEffect(() => {
//     fetch("/api/metrics")
//       .then((res) => res.json())
//       .then(setMetrics)
//       .catch(console.error);
//   }, []);

//   if (!metrics) {
//     return <p className="text-gray-500">Loading metrics...</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//       <Card title="Total Events" value={metrics.totalEvents} />
//       <Card title="High Severity Events" value={metrics.highSeverity} />
//       <Card title="Most Common Event" value={metrics.commonEvent} />
//       <Card title="Cloud Accounts" value={metrics.totalAccounts} />
//       <Card title="Accounts with No Events" value={metrics.noEventAccounts} />
//       <Card title="Total Users" value={metrics.totalUsers} />
//     </div>
//   );
// }

// function Card({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white shadow rounded-xl p-4">
//       <h3 className="text-sm text-gray-500">{title}</h3>
//       <p className="text-2xl font-semibold">{value}</p>
//     </div>
//   );
// }
