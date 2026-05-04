import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNavbar from "./EmployeeNavbar";

const ApplyLeave = () => {
  const [holidays, setHolidays] = useState([]);

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    reason: ""
  });

  // ---------------- FETCH HOLIDAYS ----------------
  useEffect(() => {
    const fetchHolidays = async () => {
      const res = await axios.get("http://localhost:5000/api/holidays");
      setHolidays(res.data);
    };

    fetchHolidays();
  }, []);

  // ---------------- CHECK HOLIDAY ----------------
  const isHoliday = (date) => {
    return holidays.some(h =>
      new Date(h.holiday_date).toDateString() === new Date(date).toDateString()
    );
  };

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // Warn if holiday selected
    if (name === "start_date" && isHoliday(value)) {
      alert("⚠️ Selected start date is a Public Holiday!");
    }

    if (name === "end_date" && isHoliday(value)) {
      alert("⚠️ Selected end date is a Public Holiday!");
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.start_date || !form.end_date) {
      alert("Please select dates");
      return;
    }

    // Calculate working days
    const start = new Date(form.start_date);
    const end = new Date(form.end_date);
    const diffTime = Math.abs(end - start);
    const working_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    try {
      await axios.post("http://localhost:5000/api/leaves/apply", {
        ...form,
        user_id: 3, // Changed to 3 (Fatema) to match your table
        manager_id: 2, // Fatema's manager is 2
        leave_type_id: 1,
        working_days: working_days
      });
      alert("Leave Applied Successfully!");
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.sqlMessage || err.message;
      alert(`Failed to apply leave. Error: ${backendError}\n\nMake sure your leave_types table has an ID of 1!`);
    }
  };

  return (
    <div>
      <h2>Apply Leave</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
        />

        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default ApplyLeave;