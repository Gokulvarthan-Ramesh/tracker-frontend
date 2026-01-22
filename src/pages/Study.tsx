import React from "react";

const Study: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Study Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Track your learning progress and manage your courses
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Courses</h2>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Completed</h2>
          <p className="text-2xl font-bold text-green-600">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Quizzes</h2>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Notes</h2>
          <p className="text-2xl font-bold text-purple-600">23</p>
        </div>
      </div>

      {/* Recent Courses */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["React Basics", "TypeScript Essentials", "Tailwind CSS"].map((course) => (
            <div
              key={course}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-gray-700">{course}</h3>
              <p className="text-gray-500 mt-1">Progress: {Math.floor(Math.random() * 100)}%</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Study;
