const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getPendingLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/leaveController");


router.post("/leaves/apply", applyLeave);

router.get("/leaves/pending/:managerId", getPendingLeaves);


router.put("/leaves/approve/:id", approveLeave);


router.put("/leaves/reject/:id", rejectLeave);

module.exports = router;