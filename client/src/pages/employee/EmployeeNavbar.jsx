import { Link } from "react-router-dom";
import "./EmployeeNavbar.css";

const EmployeeNavbar = () => {
  return (
    <div className="navbar">
      <h3>Leave Tracker</h3>

      <div className="links">
        <Link to="/employee/apply">Apply Leave</Link>
        <Link to="/employee/status">Check Status</Link>
      </div>
    </div>
  );
};

export default EmployeeNavbar;