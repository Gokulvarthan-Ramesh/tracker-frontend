import { Routes, Route } from "react-router-dom";
 
import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study";
import Workout from "./pages/Workout";
import Meals from "./pages/Meals";
import Weight from "./pages/Weight";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/study" element={<Study />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/weight" element={<Weight />} />
      </Route>
    </Routes>
  );
}
