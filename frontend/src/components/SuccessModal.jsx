export default function SuccessModal({ details, onClose }) {
  if (!details) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box success-modal">
        <div className="success-icon">🎉</div>
        <h2>Order Placed!</h2>
        <div id="successDetails">
          <strong>Order #{details.orderId}</strong>
          <br />
          {details.paymentMessage}
          <br />
          <br />
          Estimated delivery: <strong>{details.estimatedTime}</strong>
        </div>
        <button className="cta-btn" onClick={onClose}>
          Track My Order
        </button>
      </div>
    </div>
  );
}
