import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../Firebase/UserAuthContext";
import { fs } from "../../Firebase/connection";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); // flag for page load
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | MBIT Online Attendance Management | Madhuben and Bhanubhai Institute of Technology";
    window.addEventListener("load", () => setIsPageLoaded(true)); // set flag to true when page is fully loaded
  }, []);

  const checkUserTypeAndRedirect = async (uid) => {
    try {
      const userRef = fs.collection("users").doc(uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        if (data.Role === "admin") {
          navigate("/adminHome");
        } else if (data.Role === "user") {
          navigate("/home");
        } else if(data.Role === "deleted"){
          navigate("/deleted");
        }
        else {
          setError("Error");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const userCredential = await logIn(email, password);
      const user = userCredential.user;
      checkUserTypeAndRedirect(user.uid);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isPageLoaded && ( // conditionally render the components after the page is fully loaded
        <div className="p-4 box-container">
          <Form onSubmit={handleSubmit} className="login-form">
            <h2 className="lable">MBIT</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              {isLoading ? (
                <Button variant="primary" type="button" disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Log In
                </Button>
              )}
            </div>

            <div className="error">
              {error && <Alert variant="danger">{error}</Alert>}
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default Login;
