import { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [instituteData, setInstituteData] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseId: 0,
    courseName: "",
    courseDescription: "",
    courseDuration: 0,
  });

  useEffect(() => {
    fetchData();
    fetchAllCourses();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/get/institute",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInstituteData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/get/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleClick = async (institute) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/admin/${institute.instituteId}/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedCourses(response.data);
      setSelectedInstitute(institute);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/admin/${selectedInstitute.instituteId}/courses/${courseId}`,
        newCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setShowAddCourseModal(false);
      setSelectedInstitute(null);
      fetchData(); // Refetch institute data after adding a new course
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/admin/${selectedInstitute.instituteId}/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   fetchData();
      setSelectedCourses(
        selectedCourses.filter((course) => course.courseId !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedInstitute(null);
    setShowAddCourseModal(false);
  };

  return (
    <div style={{  position: "relative", backgroundColor:"#C4CAD0", height:"100vh",width:"90vw"}}>
      <h2 style={{ marginTop:"30px",textAlign: "center" }}><strong>Institute Information</strong></h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80vw",
          textAlign: "left",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              ID
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Name
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Email
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {instituteData &&
            instituteData.map((institute) => (
              <tr key={institute.instituteId}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {institute.instituteId}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {institute.instituteName}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {institute.email}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => handleClick(institute)}
                  >
                    <i className="fa fa-info-circle"></i> Details
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      background: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedInstitute(institute);
                      setShowAddCourseModal(true);
                    }}
                  >
                    Add Course
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!showAddCourseModal && selectedInstitute && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedInstitute(null)} // Clicking outside closes the modal
        >
          <div
            style={{
              background: "#fff",
              width: "80%",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              maxWidth: "100vw",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              <strong>Courses:</strong>
            </h3>
            <ul>
              {selectedCourses.map((course, index) => (
                <div key={course.courseId}>
                  <li>
                    <strong>Name: </strong>
                    {course.courseName} <br />
                    <strong>Description: </strong>
                    {course.courseDescription} <br />
                    <strong>Duration: </strong>
                    {course.courseDuration} hours
                    <button
                      style={{
                        float: "right",
                        //   marginLeft: "10px",
                        padding: "5px 10px",
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                      onClick={() => handleDelete(course.courseId)}
                    >
                      Delete
                    </button>
                  </li>
                  {index !== selectedCourses.length - 1 && (
                    <hr style={{ marginTop: "30px" }} />
                  )}{" "}
                  {/* Add a horizontal line if it's not the last item */}
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
      {showAddCourseModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "100%",
              height: "40%",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              maxWidth: "80%",
              overflow: "auto",
            }}
          >
            <h2>Add Course</h2>
            <label htmlFor="courseSelect">Select Course:</label>
            <select
              id="courseSelect"
              value={newCourse.courseId}
              onChange={(e) =>
                setNewCourse({ ...newCourse, courseId: e.target.value })
              }
              style={{
                marginBottom: "50px",
                display: "block",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select a course</option>
              {allCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
            <button
              style={{
                padding: "5px 10px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleAddCourse(newCourse.courseId)}
            >
              Add Course
            </button>
            <button
              style={{
                padding: "5px 10px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;