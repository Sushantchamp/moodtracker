import React from 'react';

export default function StreakTracker({ journals = [] }) {
  if (!journals.length) return null;

  const datesSet = new Set(
    journals.map((j) => new Date(j.date).setHours(0, 0, 0, 0))
  );

  // Calculate current streak
  let streak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  while (datesSet.has(today.getTime())) {
    streak++;
    today.setDate(today.getDate() - 1);
  }

  // Prepare last 7 days for visualization
  const last7Days = [];
  let dayPointer = new Date();
  dayPointer.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    last7Days.push({
      date: new Date(dayPointer),
      hasEntry: datesSet.has(dayPointer.getTime()),
    });
    dayPointer.setDate(dayPointer.getDate() - 1);
  }
  last7Days.reverse();

  return (
    <div className="bg-blue-100 p-4 rounded shadow mt-3">
      <h2 className="text-lg font-semibold mb-2">Streak Tracker</h2>
      <p className="text-gray-800 mb-3">
        {streak > 0
          ? `You’re on a ${streak}-day streak! 🔥`
          : 'No streak yet. Start journaling today!'}
      </p>

      <div className="flex gap-1">
        {last7Days.map((day, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded ${
              day.hasEntry ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={day.date.toLocaleDateString()}
          ></div>
        ))}
      </div>
      <p className="text-sm text-gray-700 mt-1">Last 7 days</p>
    </div>
  );
}
