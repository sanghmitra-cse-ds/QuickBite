import { useState } from 'react';

export default function CartPage({
  cart,
  onBack,
  onChangeQty,
  onPlaceOrder,
}) {
  const [name, setName] = useState('Sanghmitra Shakya');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('UPI');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 30;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    onPlaceOrder({ name, phone, address, payment, total });
  };

  return (
    <section className="section" id="page-cart">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="section-title">Your Cart 🛒</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {!cart.length ? (
            <p className="empty-state">
              🛒 Your cart is empty.
              <br />
              Go browse some restaurants!
            </p>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="cart-item-row">
                <div className="cart-item-info">
                  <span className="cart-item-emoji">{item.emoji}</span>
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price} each</div>
                  </div>
                </div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onChangeQty(idx, -1)}>
                    −
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onChangeQty(idx, 1)}>
                    +
                  </button>
                </div>
                <span className="cart-line-total">₹{(item.price * item.qty).toFixed(0)}</span>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="checkout-panel">
            <h3>Order Summary</h3>
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
            <div className="form-field">
              <label>Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sanghmitra Shakya"
              />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
              />
            </div>
            <div className="form-field">
              <label>Delivery Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat 4B, Ghaziabad, UP"
              />
            </div>
            <div className="form-field">
              <label>Payment Method</label>
              <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                <option value="UPI">📱 UPI</option>
                <option value="CARD">💳 Credit / Debit Card</option>
                <option value="COD">💵 Cash on Delivery</option>
              </select>
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              🍽️ Place Order — ₹{total.toFixed(0)}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
