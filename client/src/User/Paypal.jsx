import { Link} from "react-router-dom";
import logo1 from "../assets/footer.png"
import cus1 from "../assets/customer01.jpg";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState } from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Paypal() {
  const [isNavActive, setNavActive] = useState(false);
  const {userData} = useAuthContext();  
  const [amount, setAmount] = useState("");
  const [paypal, setPaypalTag] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

const baseUrl = "/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!amount || !paypal) {
      toast.error("All fields are required.");
      return;
    }
  
    if (amount <= 0) {
      toast.error("Invalid amount.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${baseUrl}/withdraw/${userData?.username}/paypal`,
        {
          username: userData?.username,
          amount: amount,
          paypal: paypal,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true }
      );
  
      if (response.data.success) {
        toast.success("Withdrawal request submitted successfully.");
        setAmount("");
        setPaypalTag("");
      } else {
        toast.error(response.data.message || "Error submitting withdrawal.");
      }
    } catch (error) {
      console.error(error); // Add this to see the error details
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                <h2>Withdraw to Paypal</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="paypal">Paypal-tag</label>
                <input
                  type="text"
                  id="paypal"
                  value={paypal}
                  required
                  onChange={(e) => setPaypalTag(e.target.value)}
                />
                <button type="submit" className="go" disabled={loading}>
                {loading ? "Processing..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
   
    </>
  );
}
