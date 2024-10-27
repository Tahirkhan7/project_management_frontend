import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Analytics from "../pages/analytics/Analytics";
import Settings from "../pages/settings/Settings";
import DefaultLayout from "../layout/DefaultLayout";

function App() {
  return (
    <Routes>
      {/* Wrap DefaultLayout around routes that require it */}
      <Route element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Routes without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
