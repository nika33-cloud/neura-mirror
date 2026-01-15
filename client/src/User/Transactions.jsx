import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/footer.png"
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Transactions() {
  
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const baseUrl = "/api";

  
  useEffect(() => {
    if (!userData?.username) return;

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transaction/getTransact/${userData?.username}`,
          { withCredentials: true }
        );

        const transactionData = response?.data?.data || [];

        if (transactionData.length === 0) {
          toast.error("No transactions found");
        }

        setTransactions(transactionData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("Error fetching transactions: ", error);
        }
      }
    };

    fetchTransactions();
  }, [userData]);

  if (!userData) {
    return <p className="loading">Loading…</p>;
  }
/*
  const handleOnclick = (transaction) => {
    navigate(`/transaction/${tid}`)
  };
  */


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

  const tIcons = {
    Deposit: <ion-icon name="arrow-up-outline"></ion-icon>,
    Withdrawal: <ion-icon name="arrow-down-outline"></ion-icon>,
    Profit: <ion-icon name="add-circle-outline"></ion-icon>,
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
        toast.error(
           error?.response?.data?.message
         );
       } else {
         toast.error("reg error => ", error);
       }
    }
  }


  return (
    <>
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

              <div className="details ">
                <div className="cardHeader">
                  <h2>Transactions</h2>
                  <div className="recentTransact">
                    {transactions.length === 0 ? (
                      <p className="noTransact">No Transactions</p>
                    ) : (
                      <div className="tableWrapperMain">
                        {/*     <table>
                          <tbody>
                            {transactions.map((transaction, index) => (
                              <tr key={index}>
                                <td> {transaction.type} </td>
                                <td> ${transaction.amount} </td>

                                <tr></tr>
                                <td>
                                  <span
                                    className={`status ${transaction.status.toLowerCase()}`}
                                  >
                                    {statusLabels[
                                      transaction.status.toLowerCase()
                                    ] || transaction.status}
                                  </span>
                                </td>
                                <td>{formatDate(transaction.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table> */}

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
              </div>
        </div>
      </div>

    </>
  );
}
