const express = require("express");
const router = express.Router();

const { applyLeave, getMyLeaves } = require("../controllers/leaveController");

// Apply leave
router.post("/leaves/apply", applyLeave);

// Employee dashboard
router.get("/leaves/my/:userId", getMyLeaves);

module.exports = router;