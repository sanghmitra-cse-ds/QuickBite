export default function Hero({ onBrowse }) {
  return (
    <section className="hero" id="page-home">
      <div className="hero-content">
        <div className="hero-tag">🚀 Delivery in 30 mins</div>
        <h1 className="hero-title">
          Hungry?
          <br />
          <span className="hero-accent">We got you.</span>
        </h1>
        <p className="hero-sub">
          Order from the best restaurants in Ghaziabad — hot, fresh, and fast.
        </p>
        <p className="hero-credits">
          Sanghmitra Shakya &nbsp;·&nbsp; 2025B15410312 &nbsp;·&nbsp; CSE DS 3
        </p>
        <button className="cta-btn" onClick={onBrowse}>
          Browse Restaurants ↓
        </button>
      </div>
      <div className="hero-visual">
        <div className="food-orbit">
          <span className="orbit-item o1">🍕</span>
          <span className="orbit-item o2">🍔</span>
          <span className="orbit-item o3">🥡</span>
          <span className="orbit-item o4">🍛</span>
          <span className="orbit-item o5">🍜</span>
        </div>
        <div className="hero-plate">🍽️</div>
      </div>
    </section>
  );
}
