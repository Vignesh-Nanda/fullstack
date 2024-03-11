import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BeautifulPage = () => {
  const [institutes, setInstitutes] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [studentFormData, setStudentFormData] = useState({
    studentName: "",
    studentDOB: "",
    address: "",
    mobile: "",
    age: "",
  });
  const token = localStorage.getItem("token"); // Fetch token from localStorage

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/get/institute",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  useEffect(() => {
    fetchData();
  }, [token]);
  // Include token in the dependency array to refetch data if token changes
  useEffect(() => {
    console.log("Selected instituteId:", selectedInstituteId);
  }, [selectedInstituteId]);

  const handleRegisterClick = (institutionId) => {
    // console.log("Selected instituteId:", institutionId);
    setShowModal(true);
    setSelectedInstituteId(institutionId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData({
      ...studentFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send student registration data to the server
      const response = await axios.post(
        "http://localhost:8080/user/add/student",
        studentFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      const studentId = response.data.studentId;
      console.log(studentId);
      const response1 = await axios.post(
        `http://localhost:8080/user/${studentId}/institution/${selectedInstituteId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response1.data);
      toast.success("Registration successful!");
      navigate(`/course/${studentId}/${selectedInstituteId}`);
      // Close the modal after successful registration
      setShowModal(false);
      // Optionally, you can trigger a data refetch here
    } catch (error) {
      console.error("Error registering student:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f0f0",
        width: "100vw",
        backgroundImage:"src/Image/c1.jpg",
      }}
    >
        <ToastContainer/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "1200px",
          padding: "20px",
          width: "100%",
        }}
      >
        {institutes.map((institute) => (
          <div
            key={institute.instituteId}
            style={{
              background: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                fontSize: "24px",
                color: "#333333",
                textAlign: "center",
              }}
            >
              <strong>Name : </strong> {institute.instituteName}
            </h2>
            <p
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#666666",
              }}
            >
              <strong>Description : </strong> {institute.instituteDescription}
            </p>
            <p
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#666666",
              }}
            >
              <strong>Address : </strong> {institute.instituteAddress}
            </p>
            <p
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#666666",
              }}
            >
              <strong>Mobile : </strong> {institute.mobile}
            </p>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "16px",
                color: "#666666",
              }}
            >
              <strong>Email : </strong> {institute.email}
            </p>
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => handleRegisterClick(institute.instituteId)}
                style={{
                  padding: "10px 20px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background 0.3s ease",
                }}
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: "999",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              <strong>Student Registration</strong>
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="studentName">Name:</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={studentFormData.studentName}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="studentDOB">Date of Birth:</label>
                <input
                  type="text"
                  id="studentDOB"
                  name="studentDOB"
                  value={studentFormData.studentDOB}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={studentFormData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="mobile">Mobile:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={studentFormData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={studentFormData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.3s ease",
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    marginLeft: "10px",
                    padding: "10px 20px",
                    background: "#ccc",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.3s ease",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautifulPage;