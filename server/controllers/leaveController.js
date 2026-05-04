const db = require("../db");

// working days calculation
function calculateWorkingDays(start, end, holidays) {
  let count = 0;
  let current = new Date(start);
  const last = new Date(end);

  const holidaySet = new Set(
    holidays.map(h => new Date(h.holiday_date).toDateString())
  );

  while (current <= last) {
    const day = current.getDay();

    const isWeekend = day === 0 || day === 6;
    const isHoliday = holidaySet.has(current.toDateString());

    if (!isWeekend && !isHoliday) {
      count++;
    }

    current.setDate(current.getDate() + 1);
  }

  return count;
}

exports.applyLeave = (req, res) => {
  const { user_id, manager_id, leave_type_id, start_date, end_date, reason } = req.body;

  db.query("SELECT * FROM holidays", (err, holidays) => {
    if (err) return res.status(500).json(err);

    const working_days = calculateWorkingDays(start_date, end_date, holidays);

    const sql = `
      INSERT INTO leave_requests
      (user_id, manager_id, leave_type_id, start_date, end_date, working_days, reason, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(
      sql,
      [user_id, manager_id, leave_type_id, start_date, end_date, working_days, reason],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Leave applied successfully",
          working_days
        });
      }
    );
  });
};
exports.getMyLeaves = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT *
    FROM leave_requests
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};