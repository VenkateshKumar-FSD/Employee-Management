import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/common/Loader";
import { lazyDelay } from "./utils/lazyDelay";

/* =======================
   AUTH PAGES (WITH DELAY)
   ======================= */
const SelectLogin = lazy(() =>
  lazyDelay(() => import("./pages/auth/SelectLogin"))
);
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

const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const EmployeeLayout = lazy(() => import("./layouts/EmployeeLayout"));

const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard")
);
const Employees = lazy(() =>
  import("./pages/admin/Employees")
);
const AddEmployee = lazy(() =>
  import("./pages/admin/AddEmployee")
);
const EditEmployee = lazy(() =>
  import("./pages/admin/EditEmployee")
);
const EmployeeDetails = lazy(() =>
  import("./pages/admin/EmployeeDetails")
);
const LeaveRequests = lazy(() =>
  import("./pages/admin/LeaveRequests")
);
const AttendanceView = lazy(() =>
  import("./pages/admin/AttendanceView")
);
const SalaryManagement = lazy(() =>
  import("./pages/admin/SalaryManagement")
);

const EmployeeDashboard = lazy(() =>
  import("./pages/employee/EmployeeDashboard")
);
const MyProfile = lazy(() =>
  import("./pages/employee/MyProfile")
);
const ApplyLeave = lazy(() =>
  import("./pages/employee/ApplyLeave")
);
const MyLeaveStatus = lazy(() =>
  import("./pages/employee/MyLeaveStatus")
);
const MyAttendance = lazy(() =>
  import("./pages/employee/MyAttendance")
);
const MySalary = lazy(() =>
  import("./pages/employee/MySalary")
);

const NotFound = lazy(() =>
  import("./pages/notfound/NotFound")
);

import AdminRoute from "./components/common/AdminRoute";
import EmployeeRoute from "./components/common/EmployeeRoute";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/select-login" replace />} />
            <Route path="/select-login" element={<SelectLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<EmployeeLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/employee/signup" element={<EmployeeSignup />} />
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
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
