import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./All.css";

function AddStudent() {
  const [name, setName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [Class,setClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const checkDataExists = async () => {
    const res = await fetch(
      "https://attendence-3de9b-default-rtdb.asia-southeast1.firebasedatabase.app/Student.json"
    );
    const data = await res.json();
    const exists = Object.values(data).some(
      (student) => student.enrollmentNumber === enrollmentNumber
    );
    return exists;
  };

  const createDatabaseRecord = async () => {
    const res = await fetch(
      "https://attendence-3de9b-default-rtdb.asia-southeast1.firebasedatabase.app/Student.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          enrollmentNumber,
          Class,
        }),
      }
    );
    return res;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const exists = await checkDataExists();
      if (exists) {
        setError("Data already exists!");
      } else {
        const res = await createDatabaseRecord();
        if (res.ok) {
          setSuccess(true);
          navigate("/adminHome");
          setSubmitted(true);
        } else {
          setError("Error");
        }
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
      <h3>Add Student</h3>
      <hr />
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Student added successfully!</Alert>}
      <form onSubmit={validateForm}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentNumber">Roll No:</label>
          <input
            type="text"
            className="form-control"
            id="enrollmentNumber"
            placeholder="Enter roll no"
            value={enrollmentNumber}
            onChange={(e) => setEnrollmentNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="className">Class:</label>
          <input
            type="text"
            className="form-control"
            id="class"
            placeholder="Enter Class"
            value={Class}
            onChange={(e) => setClass(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || success}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>

      </form>
    </div>
  );
}

export default AddStudent;
