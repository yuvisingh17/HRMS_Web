import { useState } from "react";
import Employees from "./components/Employees";
import Attendance from "./components/Attendance";

function App() {
  const [tab, setTab] = useState("employees");

  return (
    <div className="container">
      <h1>HRMS Portal </h1>

      <div className="tabs">
        <button
          className={tab === "employees" ? "active" : ""}
          onClick={() => setTab("employees")}
        >
          Employees
        </button>

        <button
          className={tab === "attendance" ? "active" : ""}
          onClick={() => setTab("attendance")}
        >
          Attendance
        </button>
      </div>

      {tab === "employees" && <Employees />}
      {tab === "attendance" && <Attendance />}
    </div>
  );
}

export default App;
