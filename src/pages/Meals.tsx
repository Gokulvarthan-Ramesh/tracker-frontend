import React from "react";

const Meals: React.FC = () => {
  const recentMeals = [
    { name: "Breakfast - Oatmeal", calories: 320, protein: 12, carbs: 45, fat: 10 },
    { name: "Lunch - Chicken Salad", calories: 450, protein: 35, carbs: 30, fat: 20 },
    { name: "Snack - Protein Shake", calories: 200, protein: 25, carbs: 10, fat: 5 },
    { name: "Dinner - Salmon & Veggies", calories: 550, protein: 40, carbs: 35, fat: 25 },
  ];

  const totalCalories = recentMeals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Meals Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Track your meals, calories, and macros.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Total Calories</h2>
          <p className="text-2xl font-bold text-red-500">{totalCalories}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Meals Logged</h2>
          <p className="text-2xl font-bold text-gray-800">{recentMeals.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Protein</h2>
          <p className="text-2xl font-bold text-green-500">
            {recentMeals.reduce((sum, meal) => sum + meal.protein, 0)} g
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Carbs</h2>
          <p className="text-2xl font-bold text-blue-500">
            {recentMeals.reduce((sum, meal) => sum + meal.carbs, 0)} g
          </p>
        </div>
      </div>

      {/* Recent Meals */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentMeals.map((meal) => (
            <div
              key={meal.name}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-gray-700">{meal.name}</h3>
              <p className="text-gray-500 mt-1">Calories: {meal.calories} kcal</p>
              <p className="text-gray-500">Protein: {meal.protein} g</p>
              <p className="text-gray-500">Carbs: {meal.carbs} g</p>
              <p className="text-gray-500">Fat: {meal.fat} g</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-yellow-500 rounded-full"
                  style={{ width: `${Math.min(meal.calories / 6, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Meals;
