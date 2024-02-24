const App = () => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background:
      "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url('/src/Image/logo.jpg')", // Set the background image
    backgroundSize: "fit",
    // backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  };

  const leftSideStyle = {
    flex: "1",
    padding: "20px",
    textAlign: "center",
  };

  const cardStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    maxWidth: "100%",
  };

  const rightSideStyle = {
    flex: "2",
    padding: "20px",
    // backgroundColor: "#f9f9f9",
    // borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const courses = [
    {
      title: "New Course! The Sanctuary Yoga Training",
      date: "July 28 - August 23, 2024",
      description:
        "A full yoga training with plenty of Sanctuary perks included!",
    },
    {
      title: "Yin Yoga, 5 Elements and Tai Chi",
      date: "February 19 - March 1, 2024",
      description: null, // No description provided for this course
    },
    {
      title: "200 Hour Trainings",
      date: "March 3 - 29, 2024; July 2024, August 2024",
      description: null, // No description provided for this course
    },
  ];

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <div style={cardStyle}>
          <img
            src="/src/Image/c2.jpg"
            alt="Card"
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
          />
        </div>
      </div>
      <div style={rightSideStyle}>
        <div>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Card Details</h2>
          <p>
            Hari Om Everyone, We’re in the middle of high season here at The
            Sanctuary, and our yoga programme is ticking along nicely. Soon
            we’ll be ready to start the March 200 hour Yoga Course, which is
            always exciting. Teaching daily classes is lovely, but I love to go
            deeper during the month-long course! Join us in August for another
            special 4-week training!
          </p>
          <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Course List</h2>
          <ul style={{ padding: "0", listStyle: "none" }}>
            {courses.map((course, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 style={{ marginBottom: "5px", color: "#333" }}>
                  {course.title}
                </h3>
                <p style={{ color: "#666" }}>
                  <strong>Date:</strong> {course.date}
                </p>
                {course.description && (
                  <p style={{ color: "#666" }}>
                    <strong>Description:</strong> {course.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
