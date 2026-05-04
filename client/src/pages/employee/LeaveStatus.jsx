import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNavbar from "./EmployeeNavbar";
import "./LeaveStatus.css";

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);

  const userId = 1;

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/leaves/my/${userId}`
      );
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getColor = (status) => {
    if (status === "Approved") return "green";
    if (status === "Rejected") return "red";
    return "orange";
  };

  return (
    <>
      <EmployeeNavbar />

      <div className="status-container">
        <h2>My Leave Status</h2>

        {leaves.length === 0 ? (
          <p>No leave requests found</p>
        ) : (
          leaves.map((leave) => (
            <div className="status-card" key={leave.id}>
              <p><b>Start:</b> {leave.start_date}</p>
              <p><b>End:</b> {leave.end_date}</p>
              <p><b>Days:</b> {leave.working_days}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{ color: getColor(leave.status), fontWeight: "bold" }}>
                  {leave.status}
                </span>
              </p>

              <p className="small">
                Applied on: {leave.created_at}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LeaveStatus;