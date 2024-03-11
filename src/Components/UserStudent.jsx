import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import backgroundImage from "/src/Image/c2.jpg";

const CoursesPage = () => {
  const { studentId, selectedInstituteId } = useParams();
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(selectedInstituteId);
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/${selectedInstituteId}/courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [selectedInstituteId, token]);

  const handleEnroll = async (courseId) => {
    try {
      const response=await axios.post(
        `http://localhost:8080/user/${studentId}/institution/${selectedInstituteId}/course/${courseId}`
      );
      console.log(response.data);
      alert("Course added successfully!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div
      style={{
        // maxWidth: "1000px",
        height:"100hv",
        width:"100vw",
        margin: "0 auto",
        padding: "20px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.9)",
        overflow: "hidden",
      }}
    >
      <h1>Courses Offered</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {courses.map((course) => (
          <div
            key={course.courseId}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <h3 style={{ marginBottom: "10px" }}>{course.courseName}</h3>
              <p style={{ marginBottom: "10px" }}>{course.courseDescription}</p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Duration:</strong> {course.courseDuration} weeks
              </p>
            </div>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleEnroll(course.courseId)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// CoursesPage.propTypes = {
//   institutionId: PropTypes.string.isRequired,
//   studentId: PropTypes.string.isRequired,
// };

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  marginBottom: "20px",
};

export default CoursesPage;