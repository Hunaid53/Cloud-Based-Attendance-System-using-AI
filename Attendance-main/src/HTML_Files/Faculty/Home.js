import React, { useEffect, useState } from "react";
import { Buttons } from "./../../Container/Buttons/Buttons";
import "./Home.css";
import { Alert } from "react-bootstrap";
import { useUserAuth } from "../../Firebase/UserAuthContext";
import { app } from "../../Firebase/connection";

import Navbar from "../../Container/navbar";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
    document.body.style.backgroundImage = "none";
  }, []);

  const { user } = useUserAuth();

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      // fetch the Name field from Firestore for the current user
      app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          setUserName(doc.data()?.Name);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [user]);

  return (
    <div className="home-page">
      <div className="Navbar">
        <Navbar username={userName} role={"Admin"} />
      </div>
      <div className="btn-container">
        <Buttons />
      </div>
      <div className="error">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </div>
  );
};

export default Home;
