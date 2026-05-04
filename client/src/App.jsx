import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/auth/Signup";

import Login from "./pages/auth/Login";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import ManagerDashboard from "./pages/manager/ManagerDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ApplyLeave from "./pages/employee/ApplyLeave";
import LeaveStatus from "./pages/employee/LeaveStatus";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Signup/>}
        />


        <Route
          path="/login"
          element={<Login/>}
        />


        <Route
          path="/employee"
          element={<EmployeeDashboard/>}
        />


        <Route
          path="/manager"
          element={<ManagerDashboard/>}
        />


        <Route
          path="/admin"
          element={<AdminDashboard/>}
        />
        <Route path="/employee/apply" element={<ApplyLeave />} />
        <Route path="/employee/apply" element={<ApplyLeave />} />
<Route path="/employee/status" element={<LeaveStatus />} />

      </Routes>

    </BrowserRouter>

  );

}


export default App;