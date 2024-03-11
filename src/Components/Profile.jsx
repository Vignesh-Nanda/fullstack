import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileImage from "/src/Image/c1.jpg";

const UserProfile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [courses, setCourses] = useState([]);
  const cour = 3;
  const placeholderImages = [
    "/src/Image/c1.jpg",
    "/src/Image/c2.jpg",
    "/src/Image/c3.jpg",
    "/src/Image/c4.jpg",
    "/src/Image/c5.jpg",
    // "/src/Image/c6.jpg",
  ];
  const getPlaceholderImage = () => {
    // Generate a random index to select a placeholder image from the array
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[randomIndex];
  };
  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        // Make an API call to fetch the student courses using the user ID
        const response = await axios.get(
          `http://localhost:8080/user/student/${cour}`
        );
        console.log([response.data]);
        setCourses(response.data.courses);
        // setCourses(response.data);
      } catch (error) {
        console.error("Error fetching student courses:", error);
      }
    };

    if (isAuthenticated && user) {
      fetchStudentCourses();
    }
  }, [isAuthenticated, user]);

  return (
    <div className="p-4 md:p-16">
      {/* Your existing profile UI code */}
      <div className="p-4 md:p-8 bg-white shadow mt-8 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="hidden md:block md:col-span-1"></div>
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="relative">
              {/* Profile image */}
              <img
                src={ProfileImage}
                alt="Profile"
                className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500"
              />
            </div>
          </div>
          <div className="hidden md:block md:col-span-1"></div>
        </div>

        <div className="mt-8 md:mt-20 text-center border-b pb-6 md:pb-12">
          <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
            {isAuthenticated ? user.name : "Jessica Jones"},{" "}
            <span className="font-light text-gray-500">27</span>
          </h1>
          <p className="font-light text-gray-600 mt-1 md:mt-3">
            Bucharest, Romania
          </p>

          <p className="mt-4 md:mt-8 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>
          <p className="mt-1 md:mt-2 text-gray-500">
            University of Computer Science
          </p>
        </div>

        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
            Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display fetched courses */}
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={getPlaceholderImage()}
                  alt={course.courseName} // Assuming courseName is the title of the course
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.courseName} {/* Render the course name */}
                  </h3>
                  <p className="text-gray-600">{course.courseDescription}</p>{" "}
                  {/* Render the course description */}
                  <button className="text-indigo-500 py-1 px-2 font-medium mt-2">
                    Enrolled
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;