import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");

  const [loading, setLoading] = useState(false);

  /* -----------------------------
     Load Employees
  ------------------------------ */
  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  /* -----------------------------
     Load Attendance
  ------------------------------ */
  const loadAttendance = async () => {
    if (!employeeId) return;

    try {
      const res = await api.get(`/attendance/${employeeId}`);

      // 🔹 Sort by date (newest first)
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setAttendance(sorted);
    } catch {
      toast.error("Failed to load attendance records");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [employeeId]);

  /* -----------------------------
     Submit Attendance
  ------------------------------ */
  const submitAttendance = async () => {
    if (!employeeId) {
      toast.error("Please select an employee");
      return;
    }

    try {
      setLoading(true);

      await api.post("/attendance", {
        employee_id: Number(employeeId),
        date: new Date().toISOString().split("T")[0],
        status,
      });

      toast.success("Attendance marked");

      // 🔹 Force fresh fetch
      const res = await api.get(`/attendance/${employeeId}`);
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAttendance(sorted);

    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Attendance already marked for today"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ---------------- Mark Attendance ---------------- */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20">
        <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

        <div className="grid grid-cols-3 gap-4">
          <select
            className="p-2 rounded bg-black/40 border border-white/10"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded bg-black/40 border border-white/10"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Present</option>
            <option>Absent</option>
          </select>

          <button
            onClick={submitAttendance}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded px-4 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>

      {/* ---------------- Attendance Records ---------------- */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20">
        <h3 className="text-lg font-semibold mb-4">
          Attendance Records
        </h3>

        {!employeeId && (
          <p className="text-gray-400">
            Select an employee to view attendance records.
          </p>
        )}

        {employeeId && attendance.length === 0 && (
          <p className="text-gray-400">
            No attendance records found.
          </p>
        )}

        {attendance.length > 0 && (
          <table className="w-full text-sm">
            <thead className="text-gray-300">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a) => {
                const normalizedStatus = a.status?.toLowerCase();

                return (
                  <tr
                    key={a.id}
                    className="border-t border-white/10"
                  >
                    <td className="py-2">{a.date}</td>
                    <td className="py-2">
                      {normalizedStatus === "present" ? (
                        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300">
                          Present
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-300">
                          Absent
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
