import React, { useState, useEffect, useRef } from "react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import axios from "axios";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const token = localStorage.getItem("token");
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedStudent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInfoClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDeleteClick = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/user/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student.studentId !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleClosePopup = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="w-full">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-800 text-white">
              Student ID
            </th>
            <th className="px-4 py-2 text-left bg-gray-800 text-white">
              Student Name
            </th>
            <th className="px-4 py-2 text-left bg-gray-800 text-white">
              DOB
            </th>
            <th className="px-4 py-2 text-left bg-gray-800 text-white">
              Mobile
            </th>
            <th className="px-4 py-2 text-left bg-gray-800 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{student.studentId}</td>
              <td className="px-4 py-2">{student.studentName}</td>
              <td className="px-4 py-2">{student.studentDOB}</td>
              <td className="px-4 py-2">{student.mobile}</td>
              <td className="px-4 py-2 flex">
                <button
                  onClick={() => handleInfoClick(student)}
                  className="text-blue-500 hover:text-blue-800 mr-2"
                >
                  <FaInfoCircle />
                </button>
                <button
                  onClick={() => handleDeleteClick(student.studentId)}
                  className="text-red-500 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white rounded-lg p-8 max-w-md shadow-lg"
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-0 right-0 m-4"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {selectedStudent.studentName} Details
            </h2>
            <p>Student ID: {selectedStudent.studentId}</p>
            <p>Student DOB: {selectedStudent.studentDOB}</p>
            <p>Address: {selectedStudent.address}</p>
            <p>Mobile: {selectedStudent.mobile}</p>
            <p>Age: {selectedStudent.age}</p>

            <h3 className="text-lg font-semibold mt-6">Institutions</h3>
            {selectedStudent.institutions && (
              <div>
                <p>Institute ID: {selectedStudent.institutions.instituteId}</p>
                <p>
                  Institute Name: {selectedStudent.institutions.instituteName}
                </p>
                <p>
                  Institute Description:{" "}
                  {selectedStudent.institutions.instituteDescription}
                </p>
                {/* Loop through courses */}
                <h4 className="text-md font-semibold mt-4">Courses</h4>
                {selectedStudent.courses.map((course) => (
                  <div key={course.courseId}>
                    <p>Course ID: {course.courseId}</p>
                    <p>Course Name: {course.courseName}</p>
                    <p>Course Description: {course.courseDescription}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
