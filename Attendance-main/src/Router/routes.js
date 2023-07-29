import { Route, Routes } from "react-router-dom";
import Home from "../HTML_Files/Faculty/Home";
import Login from "../HTML_Files/Home/Login";
import AdminHome from "../HTML_Files/Admin/adminHome";
import StudentForm from "../Container/Buttons/addStudent";
import ProtectedRoute from "../Firebase/ProtectedRoute";
import AddFaculty from "../Container/Buttons/addFaculty";
import DeleteStudent from "../Container/Buttons/deleteStudent";
import AddAdmin from "../Container/Buttons/addAdmin";
import AddNewAdmin from "../Container/Buttons/addNewAdmin";
import PromoteFaculty from "../Container/Buttons/promoteFaculty";
import DemoteFaculty from "../Container/Buttons/demoteAdmin";
import SearchStudent from "../Container/attandenceManage/searchStudent";
import LateAttendance from "../Container/attandenceManage/lateAttendance";
import ViewAttendance from "../Container/attandenceManage/viewAttendance";
import DeleteFaculty from "../Container/Buttons/deleteFaculty";
import DeleteAdmin from "../Container/Buttons/deleteAdmin";
import AccountDeletedByAdmin from "../Container/Buttons/deleted";

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/adminHome"
      element={
        <ProtectedRoute>
          <AdminHome />
        </ProtectedRoute>
      }
    />
    <Route
      path="/deleteStudent"
      element={
        <ProtectedRoute>
          <DeleteStudent />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Login />} />
    <Route
      path="/addStudent"
      element={
        <ProtectedRoute>
          <StudentForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/addFaculty"
      element={
        <ProtectedRoute>
          <AddFaculty />
        </ProtectedRoute>
      }
    />
    <Route
      path="/addAdmin"
      element={
        <ProtectedRoute>
          <AddAdmin />
        </ProtectedRoute>
      }
    />
    <Route
      path="/addNewAdmin"
      element={
        <ProtectedRoute>
          <AddNewAdmin />
        </ProtectedRoute>
      }
    />
    <Route
      path="/promoteFaculty"
      element={
        <ProtectedRoute>
          <PromoteFaculty />
        </ProtectedRoute>
      }
    />
    <Route
      path="/demoteAdmin"
      element={
        <ProtectedRoute>
          <DemoteFaculty />
        </ProtectedRoute>
      }
    />
    <Route
      path="/searchStudent"
      element={
        <ProtectedRoute>
          <SearchStudent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/lateAttendance"
      element={
        <ProtectedRoute>
          <LateAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/viewAttendance"
      element={
        <ProtectedRoute>
          <ViewAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/deleteFaculty"
      element={
        <ProtectedRoute>
          <DeleteFaculty />
        </ProtectedRoute>
      }
    />
    <Route
      path="/deleteAdmin"
      element={
        <ProtectedRoute>
          <DeleteAdmin />
        </ProtectedRoute>
      }
    />
    <Route
      path="/deleted"
      element={
        <ProtectedRoute>
          <AccountDeletedByAdmin />
        </ProtectedRoute>
      }
    />
  </Routes>
);
