import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; 
// import goog from "../assets/google.svg";
import "../style/home.css";
import eye from "../assets/eye.svg"; 
import eyeOff from "../assets/eye-off.svg";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const baseUrl = "/api";
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, 
        { username: trimmedUsername, password: trimmedPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login Successful");
        setUserName('');
        setPassword('');
        navigate(`/${username}/dashboard`);
      }
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        toast.error(
           error?.response?.data?.message
         );
       } else {
         toast.error("reg error => ", error);
       }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container7">
      <div className="content1">
        <div className="section">
          <div className="login">
            <div className="text2">
              <h2>Welcome back!</h2>
              <p>Enter your username and password to log in.</p>
            </div>

            <form onSubmit={handleSubmit} className="sign">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                required
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    <img src={showPassword ? eye : eyeOff} alt="Toggle password visibility" />
                  </div>
                </div>
              </div>

              <Link to="/forgotPassword" className="forgot">
              Forgot Password?
              </Link>
              
              <button type="submit" id="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="signup">
              <p>
                Don&apos;t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
