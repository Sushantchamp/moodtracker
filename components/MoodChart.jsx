// import { useEffect, useState } from 'react';
// import API from '../src/api';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const MOOD_ORDER = ['happy', 'neutral', 'sad', 'stressed'];

// export default function MoodChart({ days = 7 }) {
//   const [data, setData] = useState(null);

//   const fetchSummary = async () => {
//     try {
//       const res = await API.get(`/journals/summary?days=${days}`);
//       const counts = MOOD_ORDER.map(m => res.data[m] || 0);
//       setData({
//         labels: MOOD_ORDER.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
//         datasets: [
//           {
//             label: `Last ${days} days`,
//             data: counts,
//             borderWidth: 1
//           }
//         ]
//       });
//     } catch (err) {
//       console.error('Failed to fetch summary', err);
//     }
//   };

//   useEffect(() => { fetchSummary(); }, [days]);

//   if (!data) {
//     return (
//       <div className="bg-white p-4 rounded shadow text-center">
//         Loading chart...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h3 className="text-sm text-gray-700 mb-2">Mood summary (last {days} days)</h3>
//       <Bar data={data} options={{
//         responsive: true,
//         plugins: {
//           legend: { display: false }
//         },
//         scales: {
//           y: { beginAtZero: true, ticks: { precision: 0 } }
//         }
//       }} />
//     </div>
//   );
// }


import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#2196F3'];

export default function MoodChart({ journals = [], days = 7 }) {

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const recentJournals = journals.filter(
    (entry) => new Date(entry.date) >= cutoffDate
  );

  const moodCounts = recentJournals.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  if (!data.length) {
    return (
      <div className="bg-blue-100 p-4 rounded shadow">
        <h2 className="text-lg text-gray-600 font-semibold mb-3">
          Mood Summary (last {days} days)
        </h2>
        <p className="text-gray-600">No data yet for the last {days} days.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <button>refresh</button>
      <h2 className="text-lg text-gray-600 font-semibold mb-3">
        Mood Summary (last {days} days)
      </h2>
      <PieChart width={350} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          label
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}




