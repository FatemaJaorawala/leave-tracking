import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNavbar from "./EmployeeNavbar";

const ApplyLeave = () => {
  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: ""
  });

  const [leaveTypes, setLeaveTypes] = useState([]);

  const userId = 1;
  const managerId = 2;

  useEffect(() => {
    axios.get("http://localhost:5000/api/leavetypes")
      .then(res => setLeaveTypes(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate working days
    const start = new Date(form.start_date);
    const end = new Date(form.end_date);
    const diffTime = Math.abs(end - start);
    const working_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    try {
      await axios.post("http://localhost:5000/api/leaves/apply", {
        user_id: userId,
        manager_id: managerId,
        leave_type_id: form.leave_type_id,
        start_date: form.start_date,
        end_date: form.end_date,
        working_days: working_days,
        reason: form.reason
      });

      alert("Leave Applied Successfully!");

      setForm({
        leave_type_id: "",
        start_date: "",
        end_date: "",
        reason: ""
      });

    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.sqlMessage || err.message;
      alert(`Failed to apply leave. Error: ${backendError}`);
    }
  };

  return (
    <>
      <EmployeeNavbar />

      <div style={{ padding: "20px" }}>
        <h2>Apply Leave</h2>

        <form onSubmit={handleSubmit}>
          <select
            name="leave_type_id"
            value={form.leave_type_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>

            {leaveTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <br /><br />

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />

          <br /><br />

          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Enter reason"
            required
          />

          <br /><br />

          <button type="submit">Apply Leave</button>
        </form>
      </div>
    </>
  );
};

export default ApplyLeave;