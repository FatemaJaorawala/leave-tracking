const express = require("express");
const router = express.Router();
const { getHolidays } = require("../controllers/holidayController");

router.get("/holidays", getHolidays);
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
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
};

module.exports = router;