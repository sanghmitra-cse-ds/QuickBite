export default function MenuPage({ restaurant, menuItems, menuError, onBack, onAddToCart }) {
  return (
    <section className="section" id="page-menu">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      {restaurant && (
        <div className="menu-header">
          <span className="menu-header-emoji">{restaurant.imageUrl}</span>
          <div>
            <h2>{restaurant.name}</h2>
            <p style={{ color: 'var(--muted)' }}>
              {restaurant.cuisine} · ⭐ {restaurant.rating} · 📍 {restaurant.location}
            </p>
          </div>
        </div>
      )}
      <div className="menu-grid">
        {menuError && <p className="empty-state">Could not load menu.</p>}
        {!menuError && menuItems.length === 0 && (
          <p className="empty-state">No items on menu.</p>
        )}
        {!menuError &&
          menuItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="item-top">
                <span className="item-emoji">{item.emoji}</span>
                <div>
                  <div className="item-name">{item.name}</div>
                  <span className="item-cat">{item.category}</span>
                </div>
              </div>
              <div className="item-desc">{item.description}</div>
              <div className="item-bottom">
                <span className="item-price">₹{item.price}</span>
                <button className="add-btn" onClick={() => onAddToCart(item)}>
                  +
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
