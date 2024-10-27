import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Analytics from "../pages/analytics/Analytics";
import Settings from "../pages/settings/Settings";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../pages/notFound/NotFound";
import SingleTask from "../pages/singleTask/SingleTask";
import HeroShortBlock from "../components/HeroShortBlock";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

        <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/task/view/:id" element={<HeroShortBlock />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
