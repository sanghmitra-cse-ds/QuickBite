export default function OrdersPage({ orders, loading, error, onBack }) {
  return (
    <section className="section" id="page-orders">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="section-title">All Orders 📋</h2>
      <div className="orders-list">
        {loading && <div className="loading-spinner">Loading orders...</div>}
        {error && <p className="empty-state">Could not load orders.</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="empty-state">No orders yet.</p>
        )}
        {!loading &&
          !error &&
          orders.map((o) => (
            <div key={o.id} className="order-card">
              <div>
                <div className="order-id">Order #{o.id}</div>
                <div className="order-meta">
                  {o.customerName} · {o.paymentMethod} · ₹{o.totalAmount}
                </div>
              </div>
              <span className={`status-badge status-${o.status}`}>
                {o.status.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}
