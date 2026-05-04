const express = require("express");

const cors = require("cors");

const db = require("./db");

const authRoutes = require("./routes/authRoutes");

const holidayRoutes = require("./routes/holidayRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const leaveTypeRoutes = require("./routes/leaveTypeRoutes");


const app = express();



app.use(cors());

app.use(express.json());


// auth routes
app.use("/api/auth", authRoutes);



app.get("/",(req,res)=>{

    res.send("Leave Tracker API Running");

});

app.use("/api", holidayRoutes);


app.use("/api", leaveRoutes);
app.use("/api", leaveTypeRoutes);

app.listen(5000,()=>{

    console.log("Server running on port 5000");

});