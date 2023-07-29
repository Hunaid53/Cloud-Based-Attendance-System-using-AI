import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { app } from "../../Firebase/connection";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function LateAttendance() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const studentsRef = app.database().ref("Student");
    studentsRef.on("value", (snapshot) => {
      const studentData = snapshot.val();
      const studentList = Object.keys(studentData).map((key) => ({
        id: key,
        ...studentData[key],
      }));
      setStudents(studentList);
    });
  }, []);

  const markLateAttendance = async (student) => {
    setIsProcessing(true);
    const date = selectedDate.toDateString();
    const attendanceRef = app
      .database()
      .ref(`Attendance/${date}/${student.id}`);
    const statusInput = document.getElementById(`status-${student.id}`);
    const commentInput = document.getElementById(`comment-${student.id}`);
    let status = statusInput.value.trim().toUpperCase();
    const comment = commentInput.value.trim();
    if (status === "PRESENT" || status === "P" || status === "PR") {
      status = "P";
    } else if (status === "ABSENT" || status === "A" || status === "AB") {
      status = "A";
    }
    if (status || comment) {
      const attendanceData = {
        status: status,
        comment: comment,
      };
      await attendanceRef.set(attendanceData);
      statusInput.value = "";
      commentInput.value = "";
    }
    setIsProcessing(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <h1>Late Attendance</h1>
      {isProcessing ? <p>Processing...</p> : null}
      <div>
        <h4>Selected Date: {selectedDate.toDateString()}</h4>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Mark Late Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.enrollmentNumber}</td>
              <td>{student.name}</td>
              <td>{student.Class}</td>
              <td>
                <input
                  type="text"
                  id={`status-${student.id}`}
                  placeholder="Present/Absent"
                  autocomplete="off"
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`comment-${student.id}`}
                  placeholder="Additional Comments"
                  autocomplete="off"
                />
              </td>
              <td>
                <button onClick={() => markLateAttendance(student)}>
                  Mark Attendance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </>
  );
}

export default LateAttendance;
