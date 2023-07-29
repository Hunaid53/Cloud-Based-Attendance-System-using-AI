import { useNavigate } from "react-router";

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleAddFacultyButtonClick = () => {
    navigate("/addFaculty");
  };

  const handleAddStudentButtonClick = () => {
    navigate("/addStudent");
  };

  const handleSearchStudentButtonClick = () => {
    navigate("/searchStudent");
  };

  const handleViewAttendanceButtonClick = () => {
    navigate("/viewAttendance");
  };

  const handleDeleteStudentButtonClick = () => {
    navigate("/deleteStudent");
  };

  const handleEditClassButtonClick = () => {
    navigate("/editClass");
  };

  const handleLateAttendanceButtonClick = () => {
    navigate("/lateAttendance");
  };

  const handleAddAdminButtonClick = () => {
    navigate("/addAdmin");
  };

  const handleAddNewAdminButtonClick = () => {
    navigate("/addNewAdmin");
  };

  const handlePromoteFacultyButtonClick = () => {
    navigate("/promoteFaculty");
  };

  const handleDemoteAdminButtonClick = () => {
    navigate("/demoteAdmin");
  };

  const handleDeleteFacultyButtonClick = () => {
    navigate("/deleteFaculty");
  };

  const handleDeleteAdminButtonClick = () => {
    navigate("/deleteAdmin");
  };

  return {
    handleAddFacultyButtonClick,
    handleAddStudentButtonClick,
    handleSearchStudentButtonClick,
    handleViewAttendanceButtonClick,
    handleDeleteStudentButtonClick,
    handleEditClassButtonClick,
    handleLateAttendanceButtonClick,
    handleAddAdminButtonClick,
    handleAddNewAdminButtonClick,
    handlePromoteFacultyButtonClick,
    handleDemoteAdminButtonClick,
    handleDeleteFacultyButtonClick,
    handleDeleteAdminButtonClick,
  };
};