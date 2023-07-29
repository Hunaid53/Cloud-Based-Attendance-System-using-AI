import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { auth, fs } from "./../../Firebase/connection";
import "./All.css";

function AddNewAdmin() {
  const [Name, setName] = useState("");
  const [id, setid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const checkDataExists = async () => {
    const userSnapshot = await fs
      .collection("users")
      .where("email", "==", email)
      .get();
    const idSnapshot = await fs.collection("users").where("id", "==", id).get();

    return userSnapshot.size > 0 || idSnapshot.size > 0;
  };

  const createFirebaseAccount = async () => {
    const loggedInUser = auth.userCredential();
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const newUserUid = userCredential.user.uid;

    const newUserRef = fs.collection("users").doc(newUserUid);
    newUserRef
      .set({
        Name,
        email,
        Role: "admin",
        id,
      })
      .then(() => {
        auth.signInWithCredential(loggedInUser);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const exists = await checkDataExists();
      if (exists) {
        setError("Data already exists!");
      } else {
        await createFirebaseAccount();
        setSuccess(true);
        navigate("/adminHome");
        setSubmitted(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (event) => {
    event.preventDefault();
    setError("");
    // Display the timeout message only if the form has not been submitted before
    if (!submitted) {
      const timer = setTimeout(() => {
        setError("Timeout: process took too long to complete");
        setLoading(false);
      }, 10000);

      handleSubmit().then(() => {
        // Clear the timer if the process finishes before the timeout
        clearTimeout(timer);
      });
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <h3>Add New Admin</h3>
      <hr />
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Admin added successfully!</Alert>}
      <form onSubmit={validateForm}>
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="Name"
            placeholder="Enter Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setid(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default AddNewAdmin;
