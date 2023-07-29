import React, { useEffect, useState } from "react";
import "./adminHome.css";
import "./../../Container/Buttons/Buttons.css"
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useUserAuth } from "../../Firebase/UserAuthContext";
import { app } from "../../Firebase/connection";
import {
  Buttons,
  AdminButtons,
  Special,
} from "./../../Container/Buttons/Buttons";

import Navbar from "../../Container/navbar";

const AdminHome = () => {
  useEffect(() => {
    document.title = "Home";
    document.body.style.backgroundImage = "none";
  }, []);

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [showSpecialButton, setShowSpecialButton] = useState(false); // add state to manage the visibility of the Special button

  const { user } = useUserAuth();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userRef = app.firestore().collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          setUserName(userDoc.data().Name + "");
          setId(userDoc.data().id + "");
        }
      } catch (error) {
        setError(error);
      }
    };
    if (user) {
      getUserDetails();
    }
    const delay = setTimeout(() => setLoading(false), 700); // delay the loading state change for 5 seconds
    return () => clearTimeout(delay); // clear the timeout on unmount
  }, [user]);

  useEffect(() => {
    if (id === "1") {
      setShowSpecialButton(true);
    } else {
      setShowSpecialButton(false);
    }
  }, [id]); // update the visibility state whenever the id changes

  if (loading) {
    return <Spinner animation="border" role="status"></Spinner>;
  }

  return (
    <div className="home-page">
      <div className="Navbar">
        <Navbar username={userName} role={"Admin"} />
      </div>
      <div className="btn-container">
        <table className="table">
          <tr className="common">
            <Buttons />
          </tr>
          <div class="horizontal-line"></div>
          <tr className="admin">
            <AdminButtons />
          </tr>
          <div class="horizontal-line"></div>
          <tr className="special">
            {showSpecialButton && <Special />}
            {/*// render Special button only if user has ID of 1*/}
          </tr>
        </table>
      </div>
      <div className="error">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </div>
  );
};

export default AdminHome;
