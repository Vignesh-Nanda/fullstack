import { useState ,} from 'react';
import '../Css/Login.css'; // Import your CSS file
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Authslice';
import { useNavigate } from 'react-router-dom';

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

  const handleSign = (e) => {
    e.preventDefault();

    if (email === "vignesh@gmail.com" && password === "123") {
      const user = { email, password, name: "Vignesh" }; // Assuming name is fixed
      dispatch(login(user)); // Dispatching the login action with user data
      navigate("/nav"); // Navigate to the desired route upon successful login
    }   
    else if (email === "admin@gmail.com" && password === "123") {
      const user = { email, password, name: "Admin1" }; // Assuming name is fixed
      dispatch(login(user)); // Dispatching the login action with user data
      navigate("/admin"); // Navigate to the desired route upon successful login
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSign} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form onSubmit={handleSignUp} action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
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