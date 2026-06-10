export async function fetchRestaurants() {
  const res = await fetch('/api/restaurants');
  return res.json();
}

export async function fetchMenu(restaurantId) {
  const res = await fetch(`/api/restaurants/${restaurantId}/menu`);
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch('/api/orders');
  return res.json();
}

export async function placeOrder(payload) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function trackOrderById(orderId) {
  const res = await fetch(`/api/orders/${orderId}/track`);
  return res;
}
