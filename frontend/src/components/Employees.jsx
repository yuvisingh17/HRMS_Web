import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.employee_id.trim()) {
      toast.error("Employee ID required");
      return;
    }
  
    try {
      await api.post("/employees", form);
      toast.success("Employee added!");
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      fetchEmployees();
    } catch (err) {
      const message =
        err.response?.data?.detail || "Error adding employee";
      toast.error(message);
    }
  };
  
  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
  
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };


  return (
    <div className="card">
     <div className="header-row">
  <h2>Employees</h2>

 </div>




      <form onSubmit={handleSubmit} className="form">

<div className="form-group">
  <label>Employee ID</label>
  <input
    placeholder="e.g. EMP001"
    value={form.employee_id}
    onChange={e => setForm({ ...form, employee_id: e.target.value })}
  />
</div>

<div className="form-group">
  <label>Full Name</label>
  <input
    placeholder="John Doe"
    value={form.full_name}
    onChange={e => setForm({ ...form, full_name: e.target.value })}
  />
</div>

<div className="form-group">
  <label>Email Address</label>
  <input
    placeholder="john@company.com"
    value={form.email}
    onChange={e => setForm({ ...form, email: e.target.value })}
  />
</div>

<div className="form-group">
  <label>Department</label>
  <input
    placeholder="Engineering"
    value={form.department}
    onChange={e => setForm({ ...form, department: e.target.value })}
  />
</div>

<button>Add Employee</button>

</form>


      {loading && <p className="loading">Loading employees...</p>}

      {error && <p className="error">{error}</p>}
      {!loading && employees.length === 0 && (
  <div className="empty-state">
    <h3>No employees yet</h3>
    <p>Add your first employee to get started.</p>
  </div>
)}


{employees.length > 0 && (

      <table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Department</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {employees.map(e => (
      <tr key={e.employee_id}>
        <td>{e.employee_id}</td>
        <td>{e.full_name}</td>
        <td>{e.email}</td>
        <td>{e.department}</td>
        <td>
        <button
  className="btn-danger"
  onClick={() => deleteEmployee(e.employee_id)}
>
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
