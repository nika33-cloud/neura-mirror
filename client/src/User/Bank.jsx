import { Link } from "react-router-dom";
import cus1 from "../assets/customer01.jpg";
import logo1 from "../assets/footer.png"
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState } from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Bank() {
  const [isNavActive, setNavActive] = useState(false);
  const { userData } = useAuthContext();

  // Form state
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [acctnum, setAcctNum] = useState("");
  const [acctname, setAcctName] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

const baseUrl = "/api";

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Logout successful");
        window.location.assign("/");
      } else {
        toast.error("An error occurred. Please try again");
      }
    } catch (error) {
      console.error("Logout error => ", error?.response?.data || error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !bank || !acctnum || !acctname) {
      toast.error("All fields are required.");
      return;
    }

    if (amount <= 0) {
      toast.error("Invalid amount.");
      return;
    }

    if (acctnum.length !== 10) {
      toast.error("Invalid account number.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/withdraw/${userData?.username}/bank`,
        {
          username: userData?.username,
          amount: amount,
          bank: bank,
          accountNumber: acctnum,
          accountName: acctname,
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
        setBank("");
        setAcctNum("");
        setAcctName("");
      } else {
        toast.error(response.data.message || "Error submitting withdrawal.");
        
      }
    } catch (error) {
      if (error.status === 400) {
        return toast.error(error?.response?.data?.message || "Invalid transaction amount");
      }
      console.error("Transaction creation error:", error.response?.data || error);
      toast.error("Error processing withdrawal.");
    } finally {
      setLoading(false);
    }
  };

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
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32 32z" />
                </svg>
              </div>

              <div className="user1">
                <p>Welcome {userData ? userData.fname : "User"}</p>
                <div className="user">
                  <img src={cus1} alt="profile-photo" />
                </div>
              </div>
            </div>

            <div className="tab">
              <div className="bank">
                <div className="text5">
                  <h2>Withdraw to Bank</h2>
                  <p>We may contact you for more information</p>
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
                  <label htmlFor="bank">Bank</label>
                  <input
                    type="text"
                    id="bank"
                    value={bank}
                    required
                    onChange={(e) => setBank(e.target.value)}
                  />
                  <label htmlFor="acctnum">Account Number</label>
                  <input
                    type="number"
                    id="acctnum"
                    value={acctnum}
                    required
                    onChange={(e) => setAcctNum(e.target.value)}
                  />
                  <label htmlFor="acctname">Account Name</label>
                  <input
                    type="text"
                    id="acctname"
                    value={acctname}
                    required
                    onChange={(e) => setAcctName(e.target.value)}
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
