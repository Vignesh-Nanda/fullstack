import React, { useState, useEffect } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Track if the user is searching
  const [editedCourse, setEditedCourse] = useState({
    courseId: "",
    courseName: "",
    courseDescription: "",
    courseDuration: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
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
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/admin/add",
        {
          courseId,
          courseName,
          courseDescription,
          courseDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCourses();
      setCourseId("");
      setCourseName("");
      setCourseDescription("");
      setCourseDuration("");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/admin/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const editCourse = (course) => {
    setSelectedCourse(course);
    setEditedCourse(course);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/admin/update/${editedCourse.courseId}`,
        editedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCourses();
      setShowModal(false);
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  const searchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/admin/${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setShowModal(false);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    await searchCourses();
  };

  const handleCancelSearch = async () => {
    setIsSearching(false);
    await searchCourses();
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#C4CAD0",
        height: "auto",
        width: "90vw",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Courses</h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Course ID"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        {isSearching ? (
          <>
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Search
            </button>
            <button
              onClick={handleCancelSearch}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        )}
      </div>
      {/* Conditionally render based on isSearching state */}
      {isSearching ? (
        filteredCourses.map((course) => (
          <div
            key={course.courseId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "30px",
              backgroundColor: "#fff",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              //   width: "50vw",
              margin: "20px",
            }}
          >
            {/* Render the details of each filtered course */}
            <h4>
              <strong>Course ID: </strong>
              {course.courseId}
            </h4>
            <h3>
              <strong>Course Name: </strong>
              {course.courseName}
            </h3>
            <p>
              <strong>Description: </strong>
              {course.courseDescription}
            </p>
            <p>
              <strong>Duration: </strong>
              {course.courseDuration} hours
            </p>
          </div>
        ))
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <input
              type="number"
              value={courseId}
              placeholder="Course ID"
              onChange={(e) => setCourseId(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={courseName}
              placeholder="Course Name"
              onChange={(e) => setCourseName(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={courseDescription}
              placeholder="Course Description"
              onChange={(e) => setCourseDescription(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="number"
              value={courseDuration}
              placeholder="Course Duration"
              onChange={(e) => setCourseDuration(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <button
              onClick={addCourse}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Add Course
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {courses.map((course) => (
              <div
                key={course.courseId}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  width: "70vw",
                  margin: "20px",
                }}
              >
                <h4>
                  <strong>CourseId : </strong>
                  {course.courseId}
                </h4>
                <h3 style={{ marginTop: "0", marginBottom: "10px" }}>
                  <strong>Name : </strong>
                  {course.courseName}
                </h3>
                <p>
                  <strong>Description : </strong>
                  {course.courseDescription}
                </p>
                <p>
                  <strong>Duration: </strong>
                  {course.courseDuration} hours
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => editCourse(course)}
                    style={{
                      backgroundColor: "#ffc107",
                      color: "#000",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(course.courseId)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
              padding: "20px",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Edit Course</h2>
              <span
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={handleCancelEdit}
              >
                &times;
              </span>
            </div>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Course ID:</strong>
              <input
                type="number"
                name="courseId"
                value={editedCourse.courseId}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Course Name:</strong>
              <input
                type="text"
                name="courseName"
                value={editedCourse.courseName}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Description:</strong>
              <input
                type="text"
                name="courseDescription"
                value={editedCourse.courseDescription}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Duration:</strong>
              <input
                type="number"
                name="courseDuration"
                value={editedCourse.courseDuration}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleCancelEdit}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
