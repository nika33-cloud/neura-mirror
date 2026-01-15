import { Link } from "react-router-dom";
import cus1 from "../assets/customer01.jpg";
import refbg from "../assets/ref_back3.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import xmark from "../assets/xmark.svg";
import logo1 from "../assets/footer.png"
import "../style/dash.css";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  // const [balance, setBalance] = useState(0);
  // const [profit, setProfit] = useState(0);
  const { userData } = useAuthContext();
  const navigate = useNavigate();

const baseUrl = "/api";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transaction/getTransact/${userData?.username}`,
          {
            withCredentials: true,
          }
        );

        const transactionData = response?.data?.data || [];

        if (transactionData.length === 0) {
          toast.error("No transactions found");
        }

        setTransactions(transactionData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error response:", error?.response?.data?.message);
        } else {
          toast.error("Error:", error);
        }
      }
    };

    if (userData?._id) {
      fetchTransactions();
    }
  }, [userData, baseUrl]);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const statusLabels = {
    Success: "Success",
    Failed: "Failed",
    Pending: "Pending",
  };

  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/login");
      } else {
        toast.error("An error occurred. Please try again");
      }
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error);
    }
  };

  // Helper function to format the MongoDB timestamp to a short format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const tIcons = {
    Deposit: <ion-icon name="arrow-up-outline"></ion-icon>,
    Withdrawal: <ion-icon name="arrow-down-outline"></ion-icon>,
    Profit: <ion-icon name="add-circle-outline"></ion-icon>,
  };

  // Profit Chart Data
  const profitData = {
    labels: transactions.map((transaction) =>
      formatDate(transaction.createdAt)
    ), // Display transaction date as labels
    datasets: [
      {
        data: transactions
          .filter(
            (transaction) =>
              transaction.type === "Profit" && transaction.status === "Success"
          )
          .map((transaction) => transaction.amount), // Extract profit data
        borderColor:  "rgba(203, 141, 57, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        tension: 0.1,
      },    {
        label: "Portfolio",
        data: transactions
          .filter(
            (transaction) =>
              transaction.type === "Deposit" && transaction.status === "Success"
          )
          .map((transaction) => transaction.amount), // Balance amounts (Deposits)
        borderColor: "rgba(54, 162, 235, 1)", // Balance line color
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 1,
        fill: true,
      },
    ],
  };

  // Profit Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


  if (!userData) return null;
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
                <p>Welcome {userData.fname || "User"}</p>
                <div className="user">
                  <img src={cus1} alt="profile-photo" />
                </div>
              </div>
            </div>
            <div className="user-content">
              <div className="cardBox">
                <div className="head">
                  <div className="card">
                    <div className="tab-1">
                      <div className="cardName">Portfolio:</div>
                      <div className="numbers">
                        $
                        {userData.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <Link className="link" to={`/${userData.username}/fund`}>
                        <ion-icon name="add-circle-outline"></ion-icon>
                      </Link>
                    </div>
                  </div>

                  <div className="card">
                    <div className="tab-2">
                      <div className="cardName">Profit:</div>
                      <div className="numbers">${userData.profit.toFixed(2)}</div>
                      <div className="link" >
                        <ion-icon name="swap-horizontal-outline"></ion-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="cardHeader">
                  <h2>Transactions</h2>
                  <div className="recentTransact">
                    {transactions.length === 0 ? (
                      <p className="noTransact">No Transactions</p>
                    ) : (
                      <div className="tableWrapper">
                       
                        {transactions.map((transaction, index) => (
                          <div key={index} className="transaction">
                            <div className="p-1">
                              <div className="t-icon">
                                {tIcons[transaction.type]}
                              </div>
                              <div>
                                <h3> {transaction.type} </h3>
                                <p>{formatDate(transaction.createdAt)}</p>
                              </div>
                            </div>

                            <div className="p-2">
                              <h2> ${transaction.amount} </h2>
                              <p>
                                <span
                                  className={`status ${transaction.status.toLowerCase()}`}
                                >
                                  {statusLabels[
                                    transaction.status.toLowerCase()
                                  ] || transaction.status}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="chart-container">
                  <h3 className="chart-title">Portfolio Statistics</h3>
                  <Line data={profitData} options={options} />
                </div>
                <div className="profit-chart"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
