import { useState } from "react";
import "../src/admin.css";
import eye from "../src/assets/eye.svg"; 
import eyeOff from "../src/assets/eye-off.svg"
import logo from "../src/assets/footer.png"
import { Link, useNavigate } from "react-router-dom"; ;
import axios from "axios";
import toast from "react-hot-toast";

export default function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

const baseUrl = "/api";
  axios.defaults.withCredentials = true;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true)
    try {
      const response = await axios.post(`${baseUrl}/auth/login`,{
        username,password
      }, {
        withCredentials: true,
      });
      

      if (response.status === 200) {
        toast.success("Login Successfull")
        setUserName('');
        setPassword('');
        window.location.assign("/admin")
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        toast.error(
           error?.response?.data?.message
         );
       } else {
         toast.error("reg error => ", error);
       }
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
    <nav>
    <div className="top">
          <Link to="/" className="mainlogo">
            <img src={logo} alt="logo" />
          </Link>
          
        </div>
    </nav>
      <div className="content">
        <div className="section">
          <div className="login">
            
            <div className="text2">
              <h2>Admin Welcome back!</h2>
             <h3>Admin Sign In</h3>
            </div>

            <form onSubmit={handleSubmit} className="sign">
              <label >Username</label>
              <input
                type="text"
                value={username}
                required
                onChange={(e) => setUserName(e.target.value)}
              />

<div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                   value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>


              <a className="forgot" href="forgot-pass.html">
                Forgot Password?
              </a>
              <button type="submit" id="submit">
                {loading ? "loading ..." : "Sign in" }
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
