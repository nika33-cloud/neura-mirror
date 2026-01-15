import "../style/receipt.css";

export default function ReceiptModal({ transaction, onClose }) {
  if (!transaction) return null;

  const status = transaction.status.toLowerCase();

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div
        className="receipt-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="receipt-header">
          <h3>Transaction Receipt</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="receipt-body">
          <ReceiptRow label="Type" value={transaction.type} />
          <ReceiptRow label="Amount" value={`$${transaction.amount}`} />
          <ReceiptRow
            label="Status"
            value={
              <span className={`status ${status}`}>
                {transaction.status}
              </span>
            }
          />
          <ReceiptRow
            label="Date"
            value={new Date(transaction.createdAt).toLocaleString()}
          />
          <ReceiptRow
            label="Transaction ID"
            value={transaction.tid}
          />
        </div>

        <div className="receipt-footer">
          <button className="close-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }) {
  return (
    <div className="receipt-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
