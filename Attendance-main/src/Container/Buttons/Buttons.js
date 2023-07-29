import "./Buttons.css";
import React, { useState } from "react";
import { useNavigation } from "./handleRequest";
import { Button, Spinner, Alert } from "react-bootstrap";
import { useUserAuth } from "./../../Firebase/UserAuthContext";
import { useNavigate } from "react-router";

export const Buttons = () => {
  const {
    handleAddStudentButtonClick,
    handleSearchStudentButtonClick,
    handleViewAttendanceButtonClick,
    handleLateAttendanceButtonClick,
  } = useNavigation();
  return (
    <div className="btn-container">
      <Button className="btn" onClick={handleAddStudentButtonClick}>
        Add Student
      </Button>
      <Button className="btn" onClick={handleSearchStudentButtonClick}>
        Search Student
      </Button>
      <Button className="btn" onClick={handleLateAttendanceButtonClick}>
        Late Attendance
      </Button>
      <Button className="btn" onClick={handleViewAttendanceButtonClick}>
        View Attendance
      </Button>
    </div>
  );
};

export const AdminButtons = () => {
  const {
    handleAddFacultyButtonClick,
    handleDeleteStudentButtonClick,
    handleDeleteFacultyButtonClick,
    handleAddAdminButtonClick,
  } = useNavigation();
  return (
    <div className="adminButton">
      <Button className="btn" onClick={handleAddFacultyButtonClick}>
        Add Faculty
      </Button>
      <Button className="btn" onClick={handleDeleteStudentButtonClick}>
        Delete Student
      </Button>
      <Button className="btn" onClick={handleAddAdminButtonClick}>
        Add Admin
      </Button>
      <Button className="btn" onClick={handleDeleteFacultyButtonClick}>
        Delete Faculty
      </Button>
    </div>
  );
};

export const LogoutButton = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logOut();
      navigate("/");
      navigate(0);
    } catch (error) {
      setError(error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="logout">
      {loggingOut ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export const Special = () => {
  const { handleDemoteAdminButtonClick,handleDeleteAdminButtonClick } = useNavigation();
  return (
  <div>
    <Button className="btn" onClick={handleDemoteAdminButtonClick}>
      Demote Admin
    </Button>
    <Button className="btn" onClick={handleDeleteAdminButtonClick}>
      Delete Admin
    </Button>
  </div>
  );
};
