export default function TopNav({ currentPage, cartCount, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'orders', label: 'My Orders' },
    { id: 'track', label: 'Track' },
  ];

  return (
    <nav className="topnav">
      <div className="nav-brand" onClick={() => onNavigate('home')}>
        <span className="brand-icon">🍽️</span>
        <span className="brand-name">QuickBite</span>
      </div>
      <div className="nav-links">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-btn${currentPage === id ? ' active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="cart-bubble" onClick={() => onNavigate('cart')}>
        🛒 <span>{cartCount}</span>
      </div>
    </nav>
  );
}
