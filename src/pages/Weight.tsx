import React from "react";

const Weight: React.FC = () => {
  const weightLogs = [
    { date: "2026-01-18", weight: 72 },
    { date: "2026-01-19", weight: 71.8 },
    { date: "2026-01-20", weight: 71.5 },
    { date: "2026-01-21", weight: 71.3 },
    { date: "2026-01-22", weight: 71.0 },
  ];

  const currentWeight = weightLogs[weightLogs.length - 1].weight;
  const targetWeight = 68;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Weight Tracker</h1>
        <p className="text-gray-600 mt-1">
          Track your weight progress and stay on target.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Current Weight</h2>
          <p className="text-2xl font-bold text-gray-800">{currentWeight} kg</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Target Weight</h2>
          <p className="text-2xl font-bold text-green-500">{targetWeight} kg</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Difference</h2>
          <p className="text-2xl font-bold text-blue-500">
            {(currentWeight - targetWeight).toFixed(1)} kg
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Progress</h2>
          <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{
                width: `${Math.min(
                  ((currentWeight - targetWeight) / currentWeight) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Weight Logs */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Logs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weightLogs.map((log) => (
            <div
              key={log.date}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-gray-700">{log.date}</h3>
              <p className="text-gray-500 mt-1">Weight: {log.weight} kg</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.min((log.weight / currentWeight) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Weight;
