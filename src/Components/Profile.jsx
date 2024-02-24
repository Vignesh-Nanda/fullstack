
import { useSelector, } from "react-redux";


// Import your profile image
import ProfileImage from "/src/Image/c1.jpg";

const courses = [
  {
    id: 1,
    title: "Course 1",
    description: "Description of Course 1 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/src/Image/c1.jpg",
  },
  {
    id: 2,
    title: "Course 2",
    description: "Description of Course 2 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/src/Image/c5.jpg",
  },
  {
    id: 3,
    title: "Course 3",
    description: "Description of Course 3 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/src/Image/c4.jpg",
  },
  {
    id: 4,
    title: "Course 4",
    description: "Description of Course 4 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/src/Image/c3.jpg",
  },
];

const UserProfile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  

  return (
    <div className="p-4 md:p-16">
      <div className="p-4 md:p-8 bg-white shadow mt-8 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="hidden md:block md:col-span-1"></div>{" "} {/* Empty div to maintain grid layout */}
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="relative">
              {/* Profile image */}
              <img
                src={ProfileImage} // Use your profile image source here
                alt="Profile"
                className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500"
              />
            </div>
          </div>
          <div className="hidden md:block md:col-span-1"></div>{" "} {/* Empty div to maintain grid layout */}
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
            {/* Course cards generated using map */}
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600">{course.description}</p>
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
