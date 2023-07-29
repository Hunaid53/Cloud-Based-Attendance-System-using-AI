import React from "react";
import "./All.css";
import { useNavigation } from "./handleRequest"
import { useNavigate } from "react-router-dom";

function AddAdmin() {

  const navigate = useNavigate();

  const {handleAddNewAdminButtonClick,handlePromoteFacultyButtonClick} = useNavigation();

  return (
    <div className="container">
      <button onClick={handleAddNewAdminButtonClick}>Add new Admin</button>
      <button onClick={handlePromoteFacultyButtonClick}>Promote Faculty to Admin</button>
      <div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default AddAdmin;
