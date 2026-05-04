import { useEffect, useState } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [leaves, setLeaves] = useState([]);

  const managerId = 2;

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/leaves/pending/${managerId}`
    );
    setLeaves(res.data);
  };

  const approve = async (id) => {
    await axios.put(`http://localhost:5000/api/leaves/approve/${id}`, {
      acted_by: managerId
    });
    fetchLeaves();
  };

  const reject = async (id) => {
    const comment = prompt("Enter rejection reason");

    await axios.put(`http://localhost:5000/api/leaves/reject/${id}`, {
      comment,
      acted_by: managerId
    });

    fetchLeaves();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manager Dashboard</h2>

      {leaves.map((l) => (
        <div key={l.id} style={{ border: "1px solid black", margin: "10px" }}>
          <p>User ID: {l.user_id}</p>
          <p>Reason: {l.reason}</p>
          <p>Status: {l.status}</p>
          <p>Working Days: {l.working_days}</p>

          <button onClick={() => approve(l.id)}>Approve</button>
          <button onClick={() => reject(l.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ManagerDashboard;