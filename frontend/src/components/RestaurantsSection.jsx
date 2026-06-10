export default function RestaurantsSection({ restaurants, loading, error, onOpenMenu }) {
  return (
    <section className="section" id="restaurants-section">
      <div className="section-header">
        <h2 className="section-title">Top Restaurants</h2>
        <p className="section-sub">Pick your favourite spot</p>
      </div>
      <div className="restaurants-grid">
        {loading && <div className="loading-spinner">Loading restaurants...</div>}
        {error && (
          <p className="empty-state">
            ⚠️ Could not load restaurants. Is the server running?
          </p>
        )}
        {!loading && !error && restaurants.length === 0 && (
          <p className="empty-state">No restaurants found.</p>
        )}
        {!loading &&
          !error &&
          restaurants.map((r) => (
            <div key={r.id} className="restaurant-card" onClick={() => onOpenMenu(r.id)}>
              <span className="rest-emoji">{r.imageUrl}</span>
              <div className="rest-name">{r.name}</div>
              <div className="rest-cuisine">{r.cuisine} Cuisine</div>
              <div className="rest-meta">
                <span className="rest-rating">⭐ {r.rating}</span>
                <span className="rest-location">📍 {r.location}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
