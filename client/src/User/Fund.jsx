import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import cus1 from "../assets/customer01.jpg";
import logo1 from "../assets/footer.png"
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import toast from "react-hot-toast";

function Fund() {
  const [isNavActive, setNavActive] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  
  
  const { userData } = useAuthContext();
 

  // Toggle navigation menu
  const toggleNavigation = () => {
    setNavActive(!isNavActive);
  };

  // Close navigation menu
  const closeNavigation = () => {
    setNavActive(false);
  };


  // Handle plan selection change
  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    let selectedAmount = "";

    switch (selectedPlan) {
      case "Stocks":
        selectedAmount = "15000";
        break;
      case "Bonds":
        selectedAmount = "10000";
        break;
      case "Crypto":
        selectedAmount = "7000";
        break;
      case "Crypto-Compounding":
        selectedAmount = "5000";
        break;
        case "Digital-Healthcare-Stocks":
          selectedAmount = "3500";
          break;
          case "Real-Estate":
            selectedAmount = "3000";
            break;
      default:
        selectedAmount = "";
        break;
    }

    setAmount(selectedAmount);
    setPlan(selectedPlan);
  };
  
const baseUrl = "/api";
axios.defaults.withCredentials = true

  const handleFunding = async (e) => {
    e.preventDefault();

    if (!plan || !amount) {
      toast.error("Please select a plan and amount");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/fund`, {
        plan, amount
      }, {
        withCredentials: true,
      })
  
      if (response.status === 201)  {
        toast.success("Funding Process Initialized")
        navigate(`/${userData.username}/fund/payment`, {state: {amount, plan}})
      } else{
        toast.error("An error occurred. Please try again");
       
      }
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        toast.error(
           error?.response?.data?.message
         );
       } else {
         toast.error("reg error => ", error);
       }
    }   
  }

  
const handleLogout = async () => {
  try {
    const response = await axios.post(`${baseUrl}/auth/logout`, {
      withCredentials: true,
    })

    if (response.status === 200) {
      toast.success("Logout successful");
      window.location.assign("/") 
    } else{
      toast.error("An error occurred. Please try again");
    }
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      console.error(
         error?.response?.data?.message
       );
     } else {
       console.error("reg error => ", error);
     }
  }
}

  return (
    <>
    {userData && (
    <div className="container">
    
          <div className={`navigation ${isNavActive ? "active" : ""}`}>
            <div className="navbar">
              <img className="logo1" src={logo1} alt="logo" />
              <img
                className="xmark"
                src={xmark}
                alt="logo"
                onClick={closeNavigation}
              />
            </div>

            <ul>
              <li>
                <Link to={`/${userData.username}/dashboard`}>
                  <span className="icon">
                    <ion-icon name="home-outline"></ion-icon>
                  </span>
                  <span className="title">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to={`/${userData.username}/withdraw`}>
                  <span className="icon">
                    <ion-icon name="wallet-outline"></ion-icon>
                  </span>
                  <span className="title">Withdrawals</span>
                </Link>
              </li>
              <li>
                <Link to={`/${userData.username}/transactions`}>
                  <span className="icon">
                    <ion-icon name="stats-chart-outline"></ion-icon>
                  </span>
                  <span className="title">Transactions</span>
                </Link>
              </li>
              <li>
                <Link to={`/${userData.username}/settings`}>
                  <span className="icon">
                    <ion-icon name="settings-outline"></ion-icon>
                  </span>
                  <span className="title">Settings</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>
                  <span className="icon">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                  <span className="title">Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>

      <div className={`main ${isNavActive ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleNavigation}>
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="black"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z"/></svg>
          </div>
        
          <div className="user1">
              <p>Welcome  {userData ? userData.fname : "User"}</p>
              <div className="user">
                <img src={cus1} alt="profile-photo" />
              </div>
              </div>
        </div>

        <div className="tab">
          <div className="bank">
            <div className="text5">
              <h2>Fund Account</h2>
            </div>

            <form onSubmit={handleFunding}>
              <label htmlFor="plan">Plan</label>
              <br />
              <select id="plan" value={plan} onChange={handlePlanChange}>
                <option value="Select Plan">Select Plan</option>
                <option value="Stocks">Stocks</option>
                <option value="Bonds">Bonds</option>
                <option value="Crypto">Crypto</option>
                <option value="Crypto-Compounding">Crypto Compounding</option>
                <option value="Digital-Healthcare-Stocks">Digital Healthcare Stocks</option>
                <option value="Real-Estate">Real-Estate</option>                                
              </select>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                readOnly
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button type="submit" className="go">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
}

export default Fund;
