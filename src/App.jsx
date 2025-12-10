import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/common/Loader";
import { lazyDelay } from "./utils/lazyDelay";

/* Lazy Loaded Auth Pages */
const AdminLogin = lazy(() =>
  lazyDelay(() => import("./pages/auth/AdminLogin"))
);
const EmployeeLogin = lazy(() =>
  lazyDelay(() => import("./pages/auth/EmployeeLogin"))
);
const AdminSignup = lazy(() =>
  lazyDelay(() => import("./pages/auth/AdminSignup"))
);
const EmployeeSignup = lazy(() =>
  lazyDelay(() => import("./pages/auth/EmployeeSignup"))
);
const SelectLogin = lazy(() =>
  lazyDelay(() => import("./pages/auth/SelectLogin"))
);

/* Layouts */
const AdminLayout = lazy(() =>
  lazyDelay(() => import("./layouts/AdminLayout"))
);
const EmployeeLayout = lazy(() =>
  lazyDelay(() => import("./layouts/EmployeeLayout"))
);

/* Admin Pages */
const AdminDashboard = lazy(() =>
  lazyDelay(() => import("./pages/admin/AdminDashboard"))
);
const Employees = lazy(() =>
  lazyDelay(() => import("./pages/admin/Employees"))
);
const AddEmployee = lazy(() =>
  lazyDelay(() => import("./pages/admin/AddEmployee"))
);
const EditEmployee = lazy(() =>
  lazyDelay(() => import("./pages/admin/EditEmployee"))
);
const EmployeeDetails = lazy(() =>
  lazyDelay(() => import("./pages/admin/EmployeeDetails"))
);
const LeaveRequests = lazy(() =>
  lazyDelay(() => import("./pages/admin/LeaveRequests"))
);
const AttendanceView = lazy(() =>
  lazyDelay(() => import("./pages/admin/AttendanceView"))
);
const SalaryManagement = lazy(() =>
  lazyDelay(() => import("./pages/admin/SalaryManagement"))
);

/* Employee Pages */
const EmployeeDashboard = lazy(() =>
  lazyDelay(() => import("./pages/employee/EmployeeDashboard"))
);
const MyProfile = lazy(() =>
  lazyDelay(() => import("./pages/employee/MyProfile"))
);
const ApplyLeave = lazy(() =>
  lazyDelay(() => import("./pages/employee/ApplyLeave"))
);
const MyLeaveStatus = lazy(() =>
  lazyDelay(() => import("./pages/employee/MyLeaveStatus"))
);
const MyAttendance = lazy(() =>
  lazyDelay(() => import("./pages/employee/MyAttendance"))
);
const MySalary = lazy(() =>
  lazyDelay(() => import("./pages/employee/MySalary"))
);

/* Not Found */
const NotFound = lazy(() =>
  lazyDelay(() => import("./pages/notfound/NotFound"))
);

/* Route protection */
import AdminRoute from "./components/common/AdminRoute";
import EmployeeRoute from "./components/common/EmployeeRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* PUBLIC LOGIN PAGE */}
            <Route path="/select-login" element={<SelectLogin />} />
            <Route path="/" element={<Navigate to="/select-login" replace />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<EmployeeLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/employee/signup" element={<EmployeeSignup />} />

            {/* PROTECTED ADMIN ROUTES */}
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

            {/* PROTECTED EMPLOYEE ROUTES */}
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

            {/* 404 PAGE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
