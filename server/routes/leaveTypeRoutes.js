const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/leavetypes", (req, res) => {
  db.query("SELECT * FROM leave_types", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;