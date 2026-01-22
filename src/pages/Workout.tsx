import React from "react";

const Workout: React.FC = () => {
  const recentWorkouts = [
    { name: "Morning Run", duration: "30 min", calories: 250 },
    { name: "Strength Training", duration: "45 min", calories: 400 },
    { name: "Yoga", duration: "20 min", calories: 100 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Workout Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Track your workouts, calories burned, and progress.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Sessions</h2>
          <p className="text-2xl font-bold text-gray-800">15</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Calories Burned</h2>
          <p className="text-2xl font-bold text-red-500">3,200</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Active Goals</h2>
          <p className="text-2xl font-bold text-blue-500">3</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Total Time</h2>
          <p className="text-2xl font-bold text-green-500">6h 45m</p>
        </div>
      </div>

      {/* Recent Workouts */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Workouts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.name}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-gray-700">{workout.name}</h3>
              <p className="text-gray-500 mt-1">Duration: {workout.duration}</p>
              <p className="text-gray-500">Calories: {workout.calories} kcal</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${Math.min(workout.calories / 5, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Workout;
