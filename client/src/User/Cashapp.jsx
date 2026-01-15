import { Link} from "react-router-dom";
import logo1 from "../assets/footer.png"
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState} from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import toast from "react-hot-toast";


export default function Cashapp() {
  const [isNavActive, setNavActive] = useState(false);
  const {userData} = useAuthContext()
  const [amount, setAmount] = useState("");
  const [cashtag, setCashTag] = useState("");
  const [loading, setLoading] = useState("")

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

const baseUrl = "/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!amount || !cashtag) {
      toast.error("All fields are required.");
      return;
    }

    if (amount <= 0) {
      toast.error("Invalid amount.");
      return;
    }

    setLoading(true);

    try {
      toast.dismiss();

      const response = await axios.post(
        `${baseUrl}/withdraw/${userData?.username}/cashapp`,
        {
          username: userData?.username,
          amount: amount,
          cashtag: cashtag,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      // Check the server response
      if (response.data.success) {
        toast.success("Withdrawal request submitted successfully.");
        setAmount("");
        setCashTag("");
      } else {
        // Handle server-side validation or error messages
        if (response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.error("Error submitting withdrawal. Please try again.");
        }
      }
    } catch (error) {
      // Handle different error cases
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); // Show custom server error message
        } else {
          toast.error("Server error. Please try again later.");
        }
      } else if (error.request) {
        // No response received from server
        toast.error("No response from the server. Please check your network connection.");
      } else {
        // Error in setting up the request
        toast.error(`Error: ${error.message}`);
      }
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
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
                <h2>Withdraw to CashApp</h2>
              </div>

              <form onSubmit={handleSubmit}>
                
                <label htmlFor="cashtag">Cash Tag</label>
                <input
                  type="text"
                  id="cashtag"
                  required
                  value={cashtag}
                  onChange={(e) => setCashTag(e.target.value)}
                />

                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
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
