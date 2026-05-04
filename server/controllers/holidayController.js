const db = require("../db"); // your mysql connection file

exports.getHolidays = (req, res) => {
  db.query("SELECT * FROM holidays", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
};