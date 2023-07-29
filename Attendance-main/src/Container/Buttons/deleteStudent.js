import React, { useState } from "react";
import { app } from "./../../Firebase/connection";
import { useNavigate } from "react-router-dom";

export default function StudentDelete() {
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Delete student data from database based on enrollment number
    app.database().ref("Student").orderByChild("enrollmentNumber").equalTo(enrollmentNumber).once("value", (snapshot) => {
      if (snapshot.exists()) {
        const key = Object.keys(snapshot.val())[0];
        app.database().ref("Student/" + key).remove()
          .then(() => {
            console.log("Student data deleted successfully.");
            setMessage("Student data deleted successfully.");
            setEnrollmentNumber("");
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error deleting student data: ", error);
            setMessage(`Error deleting student data: ${error.message}`);
            setIsLoading(false);
          });
      } else {
        console.error("Student data not found for enrollment number: ", enrollmentNumber);
        setMessage(`Student data not found for enrollment number: ${enrollmentNumber}`);
        setIsLoading(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enrollment Number:
        <input type="text" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} />
      </label>
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>

      <br />
      <p>{message}</p>
    </form>
  );
}
