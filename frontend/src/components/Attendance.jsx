import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ load employees once
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch {
        toast.error("Failed to load employees");
      }
    };
    loadEmployees();
  }, []);

  // ✅ format ISO → readable date
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // auto refresh attendance when employee changes
useEffect(() => {
    if (employeeId) {
      loadRecords();
    } else {
      setRecords([]); // clear table if nothing selected
    }
  }, [employeeId]);
  
  const markAttendance = async () => {
 

    const isoDate = new Date(date).toISOString().split("T")[0];

    try {
      await api.post("/attendance", {
        employee_id: employeeId,
        date: isoDate,
        status,
      });

      toast.success("Attendance marked!");
      loadRecords();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to mark attendance");
    }
  };
  const loadRecords = async () => {
    if (!employeeId) return;
  
    try {
      setLoading(true);
      const res = await api.get(`/attendance/${employeeId}`);
      setRecords(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to load records");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="card">
      <h2>Attendance</h2>

      <div className="form-row">

        {/* 🔥 Employee dropdown */}
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button disabled={!employeeId} onClick={markAttendance}>
          Mark Attendance
        </button>

        {/* <button disabled={!employeeId} onClick={loadRecords}>
          View Records
        </button> */}
      </div>

      {loading && <p className="loading">Loading attendance...</p>}

      {!loading && records.length === 0 && (
        <p className="empty">No attendance records</p>
      )}

      {records.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td>{formatDate(r.date)}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "Present" ? "present" : "absent"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
