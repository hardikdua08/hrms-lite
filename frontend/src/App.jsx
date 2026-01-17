import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <div className="p-6 space-y-10">
      <Dashboard />
      <Employees />
      <Attendance />
    </div>
  );
}

export default App;
