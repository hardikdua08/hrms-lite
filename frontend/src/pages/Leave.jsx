import { useState } from "react";
import toast from "react-hot-toast";

/**
 * Leave Management
 * - Apply leave workflow
 * - Status-based color badges
 * - History log
 * - Flux-style glass UI
 */
export default function Leave() {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "Rahul Sharma",
      start: "2024-01-10",
      end: "2024-01-12",
      reason: "Personal",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Anjali Verma",
      start: "2024-01-15",
      end: "2024-01-16",
      reason: "Sick Leave",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    employee: "",
    start: "",
    end: "",
    reason: "",
  });

  const applyLeave = (e) => {
    e.preventDefault();

    if (!form.employee || !form.start || !form.end) {
      toast.error("Please fill all required fields");
      return;
    }

    setLeaves([
      ...leaves,
      {
        id: Date.now(),
        employee: form.employee,
        start: form.start,
        end: form.end,
        reason: form.reason || "—",
        status: "Pending",
      },
    ]);

    toast.success("Leave request submitted");

    setForm({
      employee: "",
      start: "",
      end: "",
      reason: "",
    });
  };

  const statusStyle = (status) => {
    if (status === "Approved")
      return "bg-green-500/20 text-green-300";
    if (status === "Rejected")
      return "bg-red-500/20 text-red-300";
    return "bg-orange-500/20 text-orange-300";
  };

  return (
    <div className="space-y-8">
      {/* Apply Leave */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20">
        <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

        <form onSubmit={applyLeave} className="grid grid-cols-4 gap-4">
          <input
            className="p-2 rounded bg-black/40 border border-white/10"
            placeholder="Employee Name"
            value={form.employee}
            onChange={(e) =>
              setForm({ ...form, employee: e.target.value })
            }
          />

          <input
            type="date"
            className="p-2 rounded bg-black/40 border border-white/10"
            value={form.start}
            onChange={(e) =>
              setForm({ ...form, start: e.target.value })
            }
          />

          <input
            type="date"
            className="p-2 rounded bg-black/40 border border-white/10"
            value={form.end}
            onChange={(e) =>
              setForm({ ...form, end: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded px-4"
          >
            Submit
          </button>

          <input
            className="col-span-4 p-2 rounded bg-black/40 border border-white/10"
            placeholder="Reason (optional)"
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
          />
        </form>
      </div>

      {/* Leave History */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20">
        <h3 className="text-lg font-semibold mb-4">Leave History</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-300">
            <tr>
              <th className="text-left py-2">Employee</th>
              <th className="text-left py-2">From</th>
              <th className="text-left py-2">To</th>
              <th className="text-left py-2">Reason</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                className="border-t border-white/10"
              >
                <td className="py-2">{leave.employee}</td>
                <td className="py-2">{leave.start}</td>
                <td className="py-2">{leave.end}</td>
                <td className="py-2 text-gray-400">
                  {leave.reason}
                </td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusStyle(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leaves.length === 0 && (
          <p className="text-gray-400 mt-4">
            No leave applications found.
          </p>
        )}
      </div>
    </div>
  );
}
