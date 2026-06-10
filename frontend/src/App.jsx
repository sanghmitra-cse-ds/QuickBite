import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchMenu,
  fetchOrders,
  fetchRestaurants,
  placeOrder as apiPlaceOrder,
  trackOrderById,
} from './api';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import RestaurantsSection from './components/RestaurantsSection';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import TrackPage from './components/TrackPage';
import SuccessModal from './components/SuccessModal';
import Toast from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [menuError, setMenuError] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [successDetails, setSuccessDetails] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const restaurantsRef = useRef(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    fetchRestaurants()
      .then(setRestaurants)
      .catch(() => setRestaurantsError(true))
      .finally(() => setRestaurantsLoading(false));
  }, []);

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrdersError(false);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch {
      setOrdersError(true);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const handleTrack = useCallback(async (orderId) => {
    const id = orderId ?? trackOrderId;
    if (!id) {
      setTrackResult('empty');
      return;
    }
    try {
      const res = await trackOrderById(id);
      if (!res.ok) {
        setTrackResult('not-found');
        return;
      }
      const data = await res.json();
      setTrackResult(data);
    } catch {
      setTrackResult('error');
    }
  }, [trackOrderId]);

  const navigate = useCallback(
    (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (page === 'orders') loadOrders();
      if (page === 'track' && lastOrderId) {
        setTrackOrderId(String(lastOrderId));
        handleTrack(String(lastOrderId));
      }
    },
    [handleTrack, lastOrderId, loadOrders]
  );

  const scrollToRestaurants = () => {
    restaurantsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openMenu = async (restaurantId) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    setCurrentRestaurant(restaurant);
    setCurrentPage('menu');
    setMenuItems([]);
    setMenuError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const items = await fetchMenu(restaurantId);
      setMenuItems(items);
    } catch {
      setMenuError(true);
    }
  };

  const showToast = (name) => {
    setToastMessage(`✓ ${name} added to cart`);
    setTimeout(() => setToastMessage(''), 2200);
  };

  const addToCart = (item) => {
    if (cart.length > 0 && cart[0].restaurantId !== currentRestaurant.id) {
      if (
        !window.confirm(
          'Your cart has items from another restaurant. Clear cart and add this item?'
        )
      ) {
        return;
      }
      setCart([]);
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          restaurantId: currentRestaurant.id,
          restaurantName: currentRestaurant.name,
          qty: 1,
        },
      ];
    });
    showToast(item.name);
  };

  const changeQty = (idx, delta) => {
    setCart((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + delta };
      if (next[idx].qty <= 0) next.splice(idx, 1);
      return next;
    });
  };

  const handlePlaceOrder = async ({ name, phone, address, payment }) => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      window.alert('Please fill in all delivery details.');
      return;
    }

    const payload = {
      customerName: name.trim(),
      customerPhone: phone.trim(),
      deliveryAddress: address.trim(),
      restaurantId: cart[0].restaurantId,
      paymentMethod: payment,
      itemNames: cart.map((i) => i.name),
      itemPrices: cart.map((i) => i.price),
      itemQuantities: cart.map((i) => i.qty),
    };

    try {
      const data = await apiPlaceOrder(payload);
      setLastOrderId(data.orderId);
      setCart([]);
      setSuccessDetails(data);
    } catch {
      window.alert('Could not place order. Please try again.');
    }
  };

  const closeModal = () => {
    setSuccessDetails(null);
    navigate('track');
  };

  const showHome = currentPage === 'home';
  const showMenu = currentPage === 'menu';

  return (
    <>
      <TopNav currentPage={currentPage} cartCount={cartCount} onNavigate={navigate} />

      {showHome && <Hero onBrowse={scrollToRestaurants} />}

      {showHome && (
        <div ref={restaurantsRef}>
          <RestaurantsSection
            restaurants={restaurants}
            loading={restaurantsLoading}
            error={restaurantsError}
            onOpenMenu={openMenu}
          />
        </div>
      )}

      {showMenu && (
        <MenuPage
          restaurant={currentRestaurant}
          menuItems={menuItems}
          menuError={menuError}
          onBack={() => navigate('home')}
          onAddToCart={addToCart}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onBack={() => navigate('home')}
          onChangeQty={changeQty}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentPage === 'orders' && (
        <OrdersPage
          orders={orders}
          loading={ordersLoading}
          error={ordersError}
          onBack={() => navigate('home')}
        />
      )}

      {currentPage === 'track' && (
        <TrackPage
          trackOrderId={trackOrderId}
          trackResult={trackResult}
          onBack={() => navigate('home')}
          onTrackOrderIdChange={setTrackOrderId}
          onTrack={() => handleTrack()}
        />
      )}

      {successDetails && <SuccessModal details={successDetails} onClose={closeModal} />}
      <Toast message={toastMessage} />
    </>
  );
}
