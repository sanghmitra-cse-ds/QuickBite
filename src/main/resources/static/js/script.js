// ── State ──
const state = {
    restaurants: [],
    currentRestaurant: null,
    cart: [],          // { id, name, price, qty, emoji, restaurantId, restaurantName }
    lastOrderId: null
};

// ── Page Management ──
function showPage(name) {
    document.querySelectorAll('[id^="page-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const section = document.getElementById('restaurants-section');
    if (section) section.style.display = (name === 'home') ? 'block' : 'none';

    const page = document.getElementById('page-' + name);
    if (page) page.classList.remove('hidden');

    const btn = document.querySelector(`.nav-btn[onclick="showPage('${name}')"]`);
    if (btn) btn.classList.add('active');

    if (name === 'cart')   renderCart();
    if (name === 'orders') loadOrders();
    if (name === 'track' && state.lastOrderId) {
        document.getElementById('trackOrderId').value = state.lastOrderId;
        trackOrder();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToRestaurants() {
    document.getElementById('restaurants-section').scrollIntoView({ behavior: 'smooth' });
}

// ── Fetch Restaurants ──
async function loadRestaurants() {
    try {
        const res = await fetch('/api/restaurants');
        state.restaurants = await res.json();
        renderRestaurants();
    } catch (e) {
        document.getElementById('restaurantsGrid').innerHTML =
            '<p class="empty-state">⚠️ Could not load restaurants. Is the server running?</p>';
    }
}

function renderRestaurants() {
    const grid = document.getElementById('restaurantsGrid');
    if (!state.restaurants.length) {
        grid.innerHTML = '<p class="empty-state">No restaurants found.</p>';
        return;
    }
    grid.innerHTML = state.restaurants.map(r => `
        <div class="restaurant-card" onclick="openMenu(${r.id})">
            <span class="rest-emoji">${r.imageUrl}</span>
            <div class="rest-name">${r.name}</div>
            <div class="rest-cuisine">${r.cuisine} Cuisine</div>
            <div class="rest-meta">
                <span class="rest-rating">⭐ ${r.rating}</span>
                <span class="rest-location">📍 ${r.location}</span>
            </div>
        </div>
    `).join('');
}

// ── Menu ──
async function openMenu(restaurantId) {
    const restaurant = state.restaurants.find(r => r.id === restaurantId);
    state.currentRestaurant = restaurant;

    document.getElementById('restaurants-section').style.display = 'none';
    document.getElementById('page-home').classList.add('hidden');
    document.getElementById('page-menu').classList.remove('hidden');

    document.getElementById('menuHeader').innerHTML = `
        <span class="menu-header-emoji">${restaurant.imageUrl}</span>
        <div>
            <h2>${restaurant.name}</h2>
            <p style="color:var(--muted)">${restaurant.cuisine} · ⭐ ${restaurant.rating} · 📍 ${restaurant.location}</p>
        </div>
    `;

    try {
        const res = await fetch(`/api/restaurants/${restaurantId}/menu`);
        const items = await res.json();
        renderMenu(items);
    } catch (e) {
        document.getElementById('menuGrid').innerHTML = '<p class="empty-state">Could not load menu.</p>';
    }
}

function renderMenu(items) {
    const grid = document.getElementById('menuGrid');
    if (!items.length) { grid.innerHTML = '<p class="empty-state">No items on menu.</p>'; return; }
    grid.innerHTML = items.map(item => `
        <div class="menu-item-card">
            <div class="item-top">
                <span class="item-emoji">${item.emoji}</span>
                <div>
                    <div class="item-name">${item.name}</div>
                    <span class="item-cat">${item.category}</span>
                </div>
            </div>
            <div class="item-desc">${item.description}</div>
            <div class="item-bottom">
                <span class="item-price">₹${item.price}</span>
                <button class="add-btn" onclick="addToCart(${item.id}, '${escHtml(item.name)}', ${item.price}, '${item.emoji}')">+</button>
            </div>
        </div>
    `).join('');
}

// ── Cart ──
function addToCart(itemId, name, price, emoji) {
    if (state.cart.length > 0 && state.cart[0].restaurantId !== state.currentRestaurant.id) {
        if (!confirm('Your cart has items from another restaurant. Clear cart and add this item?')) return;
        state.cart = [];
    }

    const existing = state.cart.find(i => i.id === itemId);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({
            id: itemId,
            name, price, emoji,
            restaurantId: state.currentRestaurant.id,
            restaurantName: state.currentRestaurant.name,
            qty: 1
        });
    }
    updateCartBubble();
    showCartToast(name);
}

function updateCartBubble() {
    const total = state.cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = total;
}

function showCartToast(name) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
        position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
        background:linear-gradient(135deg,#FF4B2B,#FF416C); color:white;
        padding:12px 28px; border-radius:30px; font-weight:600; font-size:14px;
        z-index:300; animation:fadeUp 0.3s ease both; font-family:'DM Sans',sans-serif;
        box-shadow:0 8px 24px rgba(255,75,43,0.4);
    `;
    toast.textContent = `✓ ${name} added to cart`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

function renderCart() {
    const cartDiv = document.getElementById('cartItems');
    const panel   = document.getElementById('checkoutPanel');

    if (!state.cart.length) {
        cartDiv.innerHTML = '<p class="empty-state">🛒 Your cart is empty.<br>Go browse some restaurants!</p>';
        panel.innerHTML   = '';
        return;
    }

    cartDiv.innerHTML = state.cart.map((item, idx) => `
        <div class="cart-item-row">
            <div class="cart-item-info">
                <span class="cart-item-emoji">${item.emoji}</span>
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} each</div>
                </div>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
            </div>
            <span class="cart-line-total">₹${(item.price * item.qty).toFixed(0)}</span>
        </div>
    `).join('');

    const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = 30;
    const total    = subtotal + delivery;

    panel.innerHTML = `
        <h3>Order Summary</h3>
        <div class="order-summary">
            <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toFixed(0)}</span></div>
            <div class="summary-row"><span>Delivery</span><span>₹${delivery}</span></div>
            <div class="summary-row total"><span>Total</span><span>₹${total.toFixed(0)}</span></div>
        </div>
        <div class="form-field"><label>Your Name</label>
            <input id="custName" placeholder="Sanghmitra Shakya" value="Sanghmitra Shakya"></div>
        <div class="form-field"><label>Phone</label>
            <input id="custPhone" placeholder="9876543210" value="9876543210"></div>
        <div class="form-field"><label>Delivery Address</label>
            <input id="custAddress" placeholder="Flat 4B, Ghaziabad, UP"></div>
        <div class="form-field"><label>Payment Method</label>
            <select id="payMethod">
                <option value="UPI">📱 UPI</option>
                <option value="CARD">💳 Credit / Debit Card</option>
                <option value="COD">💵 Cash on Delivery</option>
            </select>
        </div>
        <button class="place-order-btn" onclick="placeOrder()">🍽️ Place Order — ₹${total.toFixed(0)}</button>
    `;
}

function changeQty(idx, delta) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    updateCartBubble();
    renderCart();
}

// ── Place Order ──
async function placeOrder() {
    const name    = document.getElementById('custName')?.value.trim();
    const phone   = document.getElementById('custPhone')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();
    const payment = document.getElementById('payMethod')?.value;

    if (!name || !phone || !address) {
        alert('Please fill in all delivery details.');
        return;
    }

    const payload = {
        customerName:   name,
        customerPhone:  phone,
        deliveryAddress: address,
        restaurantId:   state.cart[0].restaurantId,
        paymentMethod:  payment,
        itemNames:      state.cart.map(i => i.name),
        itemPrices:     state.cart.map(i => i.price),
        itemQuantities: state.cart.map(i => i.qty)
    };

    try {
        const res  = await fetch('/api/orders', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload)
        });
        const data = await res.json();

        state.lastOrderId = data.orderId;
        state.cart = [];
        updateCartBubble();

        document.getElementById('successDetails').innerHTML = `
            <strong>Order #${data.orderId}</strong><br>
            ${data.paymentMessage}<br><br>
            Estimated delivery: <strong>${data.estimatedTime}</strong>
        `;
        document.getElementById('successModal').classList.remove('hidden');

    } catch (e) {
        alert('Could not place order. Please try again.');
    }
}

function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
    showPage('track');
}

// ── Orders ──
async function loadOrders() {
    try {
        const res    = await fetch('/api/orders');
        const orders = await res.json();
        const div    = document.getElementById('ordersList');

        if (!orders.length) {
            div.innerHTML = '<p class="empty-state">No orders yet.</p>';
            return;
        }

        div.innerHTML = orders.map(o => `
            <div class="order-card">
                <div>
                    <div class="order-id">Order #${o.id}</div>
                    <div class="order-meta">
                        ${o.customerName} · ${o.paymentMethod} · ₹${o.totalAmount}
                    </div>
                </div>
                <span class="status-badge status-${o.status}">${o.status.replace(/_/g,' ')}</span>
            </div>
        `).join('');
    } catch (e) {
        document.getElementById('ordersList').innerHTML = '<p class="empty-state">Could not load orders.</p>';
    }
}

// ── Track Order ──
async function trackOrder() {
    const id  = document.getElementById('trackOrderId').value;
    const div = document.getElementById('trackResult');
    if (!id) { div.innerHTML = '<p class="empty-state">Enter an order ID.</p>'; return; }

    try {
        const res  = await fetch(`/api/orders/${id}/track`);
        if (!res.ok) { div.innerHTML = '<p class="empty-state">Order not found.</p>'; return; }
        const data = await res.json();

        const steps = ['PLACED','CONFIRMED','PREPARING','OUT_FOR_DELIVERY','DELIVERED'];
        const icons = ['📋','✅','👨‍🍳','🛵','🎉'];
        const labels = ['Placed','Confirmed','Preparing','On the way','Delivered'];
        const currentIdx = steps.indexOf(data.status);

        div.innerHTML = `
            <h3 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:6px">
                Order #${data.orderId}
            </h3>
            <p style="color:var(--muted);margin-bottom:4px">
                ${data.restaurantName} · ${data.customerName} · ₹${data.totalAmount}
            </p>
            <p style="color:var(--muted);font-size:13px;margin-bottom:20px">
                📍 ${data.deliveryAddress}
            </p>
            <div class="track-steps">
                ${steps.map((s, i) => `
                    <div class="track-step">
                        <div class="step-circle ${i <= currentIdx ? 'done' : ''}">${icons[i]}</div>
                        <span class="step-label">${labels[i]}</span>
                    </div>
                `).join('')}
            </div>
            <p style="text-align:center;color:var(--muted);font-size:13px">
                Ordered at: ${new Date(data.orderTime).toLocaleString()}
            </p>
        `;
    } catch (e) {
        div.innerHTML = '<p class="empty-state">Error fetching order.</p>';
    }
}

// ── Utils ──
function escHtml(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurants();
    showPage('home');
});
