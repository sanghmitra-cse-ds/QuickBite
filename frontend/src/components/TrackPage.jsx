const STEPS = ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
const ICONS = ['📋', '✅', '👨‍🍳', '🛵', '🎉'];
const LABELS = ['Placed', 'Confirmed', 'Preparing', 'On the way', 'Delivered'];

export default function TrackPage({
  trackOrderId,
  trackResult,
  onBack,
  onTrackOrderIdChange,
  onTrack,
}) {
  return (
    <section className="section" id="page-track">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="section-title">Track Order 📍</h2>
      <div className="track-box">
        <input
          type="number"
          value={trackOrderId}
          onChange={(e) => onTrackOrderIdChange(e.target.value)}
          placeholder="Enter Order ID"
          className="track-input"
        />
        <button className="cta-btn small" onClick={onTrack}>
          Track
        </button>
      </div>
      <div className="track-result">
        {trackResult === null && null}
        {trackResult === 'empty' && <p className="empty-state">Enter an order ID.</p>}
        {trackResult === 'not-found' && <p className="empty-state">Order not found.</p>}
        {trackResult === 'error' && <p className="empty-state">Error fetching order.</p>}
        {trackResult && typeof trackResult === 'object' && (
          <>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                marginBottom: '6px',
              }}
            >
              Order #{trackResult.orderId}
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '4px' }}>
              {trackResult.restaurantName} · {trackResult.customerName} · ₹
              {trackResult.totalAmount}
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '20px' }}>
              📍 {trackResult.deliveryAddress}
            </p>
            <div className="track-steps">
              {STEPS.map((step, i) => {
                const currentIdx = STEPS.indexOf(trackResult.status);
                return (
                  <div key={step} className="track-step">
                    <div className={`step-circle${i <= currentIdx ? ' done' : ''}`}>
                      {ICONS[i]}
                    </div>
                    <span className="step-label">{LABELS[i]}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
              Ordered at: {new Date(trackResult.orderTime).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
