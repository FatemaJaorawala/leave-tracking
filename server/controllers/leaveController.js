const db = require("../db");

exports.applyLeave = (req, res) => {
  const { user_id, manager_id, leave_type_id, start_date, end_date, working_days, reason } = req.body;
  const sql = `
    INSERT INTO leave_requests (user_id, manager_id, leave_type_id, start_date, end_date, working_days, reason, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;
  db.query(sql, [user_id, manager_id, leave_type_id, start_date, end_date, working_days, reason], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Leave applied successfully", id: result.insertId });
  });
};

exports.getPendingLeaves = (req, res) => {
  const managerId = req.params.managerId;

  const sql = `
    SELECT * FROM leave_requests
    WHERE manager_id = ? AND status = 'Pending'
  `;

  db.query(sql, [managerId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.approveLeave = (req, res) => {
  const leaveId = req.params.id;
  const { acted_by } = req.body;
  
  const sql = `
    UPDATE leave_requests 
    SET status = 'Approved', acted_by = ?, acted_at = NOW()
    WHERE id = ?
  `;

  db.query(sql, [acted_by, leaveId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Leave approved successfully" });
  });
};

exports.rejectLeave = (req, res) => {
  const leaveId = req.params.id;
  const { comment, acted_by } = req.body;

  const sql = `
    UPDATE leave_requests 
    SET status = 'Rejected', manager_comment = ?, acted_by = ?, acted_at = NOW()
    WHERE id = ?
  `;

  db.query(sql, [comment, acted_by, leaveId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Leave rejected successfully" });
  });
};