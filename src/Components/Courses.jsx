import React from "react";
import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  const cardStyle = {
    display: "flex",
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle = {
    width: "150px",
    height: "150px",
    marginRight: "20px",
    borderRadius: "10px",
  };

  const contentWrapperStyle = {
    flex: "1",
    textAlign: "left",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const buttonWrapperStyle = {
    marginLeft: "auto",
    textAlign: "right",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleEnroll = (courseId) => {
    // Handle enrollment logic here, e.g., redirect to enrollment page
    console.log(`Enroll button clicked for course ID: ${courseId}`);
  };

  return (
    <div style={cardStyle}>
      <img src={course.image} alt={course.title} style={imageStyle} />
      <div style={contentWrapperStyle}>
        <div style={contentStyle}>
          <h3>{course.title}</h3>
          <p><strong>College:</strong> {course.college}</p>
          <p>{course.description}</p>
        </div>
        <div style={buttonWrapperStyle}>
          <button style={buttonStyle} onClick={() => handleEnroll(course.id)}>Enroll</button>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    college: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const App = () => {
  const courses = [
    {
      id: 1,
      title: "Computer Science",
      image: "https://via.placeholder.com/150",
      description: "Learn about algorithms, data structures, and software development.",
      college: "ABC University",
    },
    {
      id: 2,
      title: "Mechanical Engineering",
      image: "https://via.placeholder.com/150",
      description: "Study mechanical systems, thermodynamics, and manufacturing processes.",
      college: "XYZ College",
    },
    {
      id: 3,
      title: "Mechanical Engineering",
      image: "/src/Image/c2.jpg",
      description: "Study mechanical systems, thermodynamics, and manufacturing processes.",
      college: "XYZ College",
    },
    // Add more courses here
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Available Courses</h2>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
