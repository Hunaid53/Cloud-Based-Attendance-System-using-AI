import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./../../Firebase/connection";

function SearchStudent() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchType, setSearchType] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [dbRef, setDbRef] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // initialize the database reference when component mounts
  useEffect(() => {
    const ref = app.database().ref("Student");
    setDbRef(ref);
  }, []);

  // function to fetch student data from firebase
  const fetchStudent = () => {
    setIsLoading(true); // set isLoading to true when search button is clicked
    let ref;
    if (searchType === "enrollmentNumber") {
      ref = dbRef.orderByChild("enrollmentNumber").equalTo(searchValue);
    } else if (searchType === "class") {
      ref = dbRef.orderByChild("Class").equalTo(searchValue);
    } else if (searchType === "All") {
      ref = dbRef.orderByChild("enrollmentNumber");
    }
    ref
      .once("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const studentList = Object.entries(data)
            .map(([key, value]) => ({
              enrollmentNumber: key,
              ...value,
            }))
            .sort((a, b) => a.enrollmentNumber - b.enrollmentNumber);
          setStudents(studentList);
        } else {
          setStudents([]);
        }
      })
      .finally(() => setIsLoading(false)); // set isLoading back to false when database fetch is complete
  };

  const handleSearch = () => {
    setErrorMessage("");
    if (searchValue || searchType === "All") {
      fetchStudent();
    } else {
      setErrorMessage("Can not search without any argument!!!");
    }
  };

  return (
    <>
      <div>
        <h2>Search Student</h2>
        <div>
          <label>
            Search by:
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="All">List All</option>
              <option value="enrollmentNumber">Enrollment Number</option>
              <option value="class">Class</option>
            </select>
          </label>
          <label>
            Search value:
            {searchType === "class" ? (
              <select
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="CE1">CE1</option>
                <option value="CE2">CE2</option>
                <option value="CE3">CE3</option>
                <option value="IT">IT</option>
              </select>
            ) : (
              <input
                type="text"
                value={searchType === "All" ? "List All Students" : searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={searchType === "All"}
              />
            )}
          </label>

          <button type="button" onClick={handleSearch}>
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <div>
        <h2>Search Result</h2>
        {isLoading && <div>Loading...</div>}{" "}
        {/* Display loading indicator if isLoading is true */}
        {errorMessage && <div>{errorMessage}</div>}
        {!isLoading && !errorMessage && (
          <table>
            <thead>
              <tr>
                <th>Enrollment Number</th>
                <th>Name</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.enrollmentNumber}>
                  <td>{student.enrollmentNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.Class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SearchStudent;
