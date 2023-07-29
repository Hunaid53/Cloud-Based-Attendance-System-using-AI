import { useState, useEffect } from "react";
import { app } from "../../Firebase/connection";
import { useNavigate } from "react-router-dom";

function ViewAttendance() {
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const attendanceRef = app.database().ref("Attendance");
    attendanceRef.on("value", (snapshot) => {
      const attendanceData = snapshot.val();
      const attendanceByDate = {};
      Object.keys(attendanceData || {}).forEach((date) => {
        const dateAttendance = attendanceData[date];
        Object.keys(dateAttendance || {}).forEach((studentId) => {
          const status = dateAttendance[studentId];
          if (!attendanceByDate[date]) {
            attendanceByDate[date] = {};
          }
          attendanceByDate[date][studentId] = status ? status : "A";
        });
      });
      setAttendance(attendanceByDate);
    });

    const studentsRef = app.database().ref("Student");
    studentsRef.on("value", (snapshot) => {
      const studentsData = snapshot.val();
      const studentList = Object.keys(studentsData || {}).map((key) => ({
        id: key,
        ...studentsData[key],
      }));
      setStudents(studentList);
    });

    // Cleanup function to unsubscribe from attendance and students data changes
    return () => {
      attendanceRef.off();
      studentsRef.off();
    };
  }, []);

  const getAttendanceData = () => {
    const attendanceByDate = {};

    Object.keys(attendance).forEach((date) => {
      const dateAttendance = attendance[date];
      Object.keys(dateAttendance).forEach((studentId) => {
        const status = dateAttendance[studentId].status;
        const comment = dateAttendance[studentId].comment;
        const student = students.find((s) => s.id === studentId);
        if (student) {
          if (!attendanceByDate[date]) {
            attendanceByDate[date] = {};
          }
          attendanceByDate[date][studentId] = {
            name: student.name,
            status: status === "P" ? "P" : "A",
            comment: comment ? comment : "",
          };
        }
      });
    });

    return attendanceByDate;
  };

  const attendanceData = getAttendanceData();
  const dates = Object.keys(attendanceData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <>
      <h1>View Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              {dates.map((date) => (
                <td key={date} align="center">
                  {attendanceData[date][student.id] ? (
                    <>
                      <div>{attendanceData[date][student.id].status}</div>
                      <div>{attendanceData[date][student.id].comment}</div>
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              ))}
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

export default ViewAttendance;
