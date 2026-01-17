import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const empRes = await api.get("/employees");
        setTotalEmployees(empRes.data.length);

        let present = 0;
        let absent = 0;

        for (const emp of empRes.data) {
          const attRes = await api.get(`/attendance/${emp.id}`);

          const todayRecord = attRes.data.find(
            (a) => a.date === today
          );

          if (todayRecord) {
            if (todayRecord.status.toLowerCase() === "present") {
              present++;
            } else {
              absent++;
            }
          }
        }

        setPresentToday(present);
        setAbsentToday(absent);
      } catch (err) {
        console.error("Failed to load dashboard summary");
      }
    };

    loadSummary();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Employees */}
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded border border-white/20">
        <h4 className="text-sm text-gray-300">Total Employees</h4>
        <p className="text-2xl font-bold mt-1">
          {totalEmployees}
        </p>
      </div>

      {/* Present Today */}
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded border border-white/20">
        <h4 className="text-sm text-gray-300">Present Today</h4>
        <p className="text-2xl font-bold text-green-400 mt-1">
          {presentToday}
        </p>
      </div>

      {/* Absent Today */}
      <div className="bg-white/10 backdrop-blur-xl p-4 rounded border border-white/20">
        <h4 className="text-sm text-gray-300">Absent Today</h4>
        <p className="text-2xl font-bold text-red-400 mt-1">
          {absentToday}
        </p>
      </div>
    </div>
  );
}
