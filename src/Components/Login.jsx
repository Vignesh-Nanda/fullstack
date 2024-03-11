import { useState } from "react";
import "../Css/Login.css"; // Import your CSS file
import { useDispatch } from "react-redux";
import { login } from "../Redux/Authslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = () => {
    setIsSignUp(true);
  };
  const handleSignIn = () => {
    setIsSignUp(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setPhone] = useState("");
  const [userRole, setRole] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          email,
          password,
          name,
          mobileNumber,
          userRole,
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const handleSign = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      localStorage.setItem("token", token);
      console.log("Authentication successful:", response.data);

      const name = response.data.name;
      const user = { email, password, name };
      const role = response.data.userRole;

      console.log("User role:", role);
      console.log("User details:", user);

      dispatch(login(user));

      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/front");
      }
    } catch (error) {
      console.error("Authentication failed:", error.message);
    }
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSign} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a className="social-icon" >
                <i className="fab fa-facebook-f"></i>
              </a>
              <button className="social-icon" >
                <i className="fab fa-twitter"></i>
              </button>
              <button className="social-icon" >
                <i className="fab fa-google"></i>
              </button>
              <button className="social-icon" >
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
          </form>
          <form onSubmit={handleSignup} action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="phone"
                placeholder="Phone "
                value={mobileNumber}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="Role"
                placeholder="Role"
                value={userRole}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <button className="social-icon" >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social-icon" >
                <i className="fab fa-twitter"></i>
              </button>
              <button className="social-icon" >
                <i className="fab fa-google"></i>
              </button>
              <button className="social-icon" >
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUp}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
