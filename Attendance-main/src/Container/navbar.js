import React, { useState } from "react";
import { useUserAuth } from "../Firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";

import "./navbar.css";

export default function Navbar(props) {
  const username = props.username;
  const role = props.role;
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
    <nav
      id="navbarCustom"
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div id="navbar1" className="container-fluid">
        <div className="navbar-brand">
          <div className="msg">Welcome {role}</div>
          <div className="name">{username}</div>
        </div>
        <div className="mr-2" id="logout">
          {loggingOut ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Button
              variant="primary"
              style={{
                background: "#dc3545",
                color: "white",
                borderColor: "#dc3545",
                fontFamily: "'Lora', serif",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
      </div>
    </nav>
  );
}
