import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-950 via-gray-950/98 to-gray-900/90 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Users</h2>
          <p className="text-2xl font-bold text-gray-800">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Revenue</h2>
          <p className="text-2xl font-bold text-gray-800">$12,345</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Orders</h2>
          <p className="text-2xl font-bold text-gray-800">567</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Feedback</h2>
          <p className="text-2xl font-bold text-gray-800">89</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
