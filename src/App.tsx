import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study/Study";
import Workout from "./pages/Workout";
import Meals from "./pages/Meals";
import Weight from "./pages/Weight";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/register";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/study" element={<Study />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/weight" element={<Weight />} />
      </Route>
    </Routes>
  );
}
