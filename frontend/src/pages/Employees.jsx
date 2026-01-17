import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  /* -----------------------------
     Load Employees
  ------------------------------ */
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
      setError("");
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  /* -----------------------------
     Add Employee
  ------------------------------ */
  const addEmployee = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.department) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/employees", form);
      toast.success("Employee added successfully");

      setForm({
        name: "",
        email: "",
        department: "",
      });

      loadEmployees();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to add employee");
    }
  };

  /* -----------------------------
     Delete Employee
  ------------------------------ */
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted");
      loadEmployees();
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  /* -----------------------------
     UI STATES
  ------------------------------ */
  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Employees</h2>

      {/* ---------------- Add Employee ---------------- */}
      <form onSubmit={addEmployee} className="space-y-3">
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <button type="submit">Add Employee</button>
      </form>

      {/* ---------------- Employee List ---------------- */}
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
