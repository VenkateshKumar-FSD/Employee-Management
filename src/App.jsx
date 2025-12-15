import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/common/Loader";

/* Layouts */
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employees from "./pages/admin/Employees";
import AddEmployee from "./pages/admin/AddEmployee";
import EditEmployee from "./pages/admin/EditEmployee";
import EmployeeDetails from "./pages/admin/EmployeeDetails";
import LeaveRequests from "./pages/admin/LeaveRequests";
import AttendanceView from "./pages/admin/AttendanceView";
import SalaryManagement from "./pages/admin/SalaryManagement";

/* Employee Pages */
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyProfile from "./pages/employee/MyProfile";
import ApplyLeave from "./pages/employee/ApplyLeave";
import MyLeaveStatus from "./pages/employee/MyLeaveStatus";
import MyAttendance from "./pages/employee/MyAttendance";
import MySalary from "./pages/employee/MySalary";

/* Not Found */
import NotFound from "./pages/notfound/NotFound";

/* Route Protection */
import AdminRoute from "./components/common/AdminRoute";
import EmployeeRoute from "./components/common/EmployeeRoute";
const SelectLogin = lazy(() => import("./pages/auth/SelectLogin"));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin"));
const EmployeeLogin = lazy(() => import("./pages/auth/EmployeeLogin"));
const AdminSignup = lazy(() => import("./pages/auth/AdminSignup"));
const EmployeeSignup = lazy(() => import("./pages/auth/EmployeeSignup"));

/* =======================
   APP
   ======================= */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Suspense ONLY for Auth Pages */}
        <Suspense fallback={<Loader />}>
          <Routes>

            {/* PUBLIC AUTH ROUTES */}
            <Route path="/" element={<Navigate to="/select-login" replace />} />
            <Route path="/select-login" element={<SelectLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<EmployeeLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/employee/signup" element={<EmployeeSignup />} />

            {/* ADMIN ROUTES */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<Employees />} />
                <Route path="employees/add" element={<AddEmployee />} />
                <Route path="employees/edit/:id" element={<EditEmployee />} />
                <Route
                  path="employees/details/:id"
                  element={<EmployeeDetails />}
                />
                <Route path="leave-requests" element={<LeaveRequests />} />
                <Route path="attendance" element={<AttendanceView />} />
                <Route path="salary" element={<SalaryManagement />} />
              </Route>
            </Route>

            {/* EMPLOYEE ROUTES */}
            <Route element={<EmployeeRoute />}>
              <Route path="/employee" element={<EmployeeLayout />}>
                <Route index element={<EmployeeDashboard />} />
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="profile" element={<MyProfile />} />
                <Route path="apply-leave" element={<ApplyLeave />} />
                <Route path="my-leaves" element={<MyLeaveStatus />} />
                <Route path="attendance" element={<MyAttendance />} />
                <Route path="salary" element={<MySalary />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>

      </BrowserRouter>
    </AuthProvider>
  );
}
