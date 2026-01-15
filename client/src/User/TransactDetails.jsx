import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/dash.css";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/auth.context";

export default function Details() {
  const { tid } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const baseUrl = "/api";
  const { userData } = useAuthContext();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transaction/${tid}`,
          { withCredentials: true }
        );

        if (!response?.data?.data) {
          toast.error("Transaction not found");
          navigate(-1);
          return;
        }

        setTransaction(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch transaction details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (tid) {
      fetchTransactionDetails();
    }
  }, [tid, navigate]);

  if (loading) return <p className="loading">Loading transaction…</p>;
  if (!transaction) return null;

  const status = transaction.status || "Pending";

  return (
    <div className="details-container">
      <div className="details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Transaction Details</h2>
      </div>

      <div className="transaction-card">
        <div className="detail-row">
          <span>Type</span>
          <span>{transaction.type}</span>
        </div>

        <div className="detail-row">
          <span>Amount</span>
          <span>${transaction.amount}</span>
        </div>

        <div className="detail-row">
          <span>Status</span>
          <span className={`status ${status.toLowerCase()}`}>
            {status}
          </span>
        </div>

        <div className="detail-row">
          <span>Date</span>
          <span>
            {new Date(transaction.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="detail-row">
          <span>Reference</span>
          <span>{transaction.reference || "N/A"}</span>
        </div>

        <div className="detail-row">
          <span>Description</span>
          <span>{transaction.description || "—"}</span>
        </div>
      </div>
    </div>
  );
}
