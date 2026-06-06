package com.example.foodapp.service;

import com.example.foodapp.model.*;
import com.example.foodapp.pattern.*;
import com.example.foodapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FoodService {

    @Autowired private RestaurantRepository restaurantRepo;
    @Autowired private MenuItemRepository menuItemRepo;
    @Autowired private OrderRepository orderRepo;

    private OrderNotifier notifier = new OrderNotifier();

    // ── Restaurant Management ──
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepo.findByActiveTrue();
    }

    public Restaurant getRestaurant(Long id) {
        return restaurantRepo.findById(id).orElse(null);
    }

    public Restaurant saveRestaurant(Restaurant r) {
        return restaurantRepo.save(r);
    }

    // ── Menu Management ──
    public List<MenuItem> getMenu(Long restaurantId) {
        return menuItemRepo.findByRestaurantId(restaurantId);
    }

    public MenuItem saveMenuItem(MenuItem item) {
        return menuItemRepo.save(item);
    }

    // ── Order Placement using Builder + Strategy + Observer ──
    public Map<String, Object> placeOrder(Map<String, Object> request) {

        Long restaurantId = Long.valueOf(request.get("restaurantId").toString());
        Restaurant restaurant = restaurantRepo.findById(restaurantId).orElse(null);

        // BUILDER PATTERN: build the order step by step
        @SuppressWarnings("unchecked")
        List<String> itemNames = (List<String>) request.get("itemNames");
        @SuppressWarnings("unchecked")
        List<Double> itemPrices = (List<Double>) request.get("itemPrices");
        @SuppressWarnings("unchecked")
        List<Integer> itemQuantities = (List<Integer>) request.get("itemQuantities");

        double total = 0;
        for (int i = 0; i < itemPrices.size(); i++) {
            total += itemPrices.get(i) * itemQuantities.get(i);
        }
        // Add delivery charge
        total += 30;

        String paymentMethod = request.get("paymentMethod").toString();

        Order order = new OrderBuilder()
                .customerName(request.get("customerName").toString())
                .customerPhone(request.get("customerPhone").toString())
                .deliveryAddress(request.get("deliveryAddress").toString())
                .restaurant(restaurant)
                .items(itemNames, itemPrices, itemQuantities)
                .totalAmount(total)
                .paymentMethod(paymentMethod)
                .build();

        Order saved = orderRepo.save(order);

        // STRATEGY PATTERN: select payment strategy based on method
        PaymentStrategy strategy;
        switch (paymentMethod.toUpperCase()) {
            case "UPI":   strategy = new UpiPayment();  break;
            case "CARD":  strategy = new CardPayment(); break;
            default:      strategy = new CodPayment();  break;
        }
        String paymentMsg = strategy.pay(total);

        // OBSERVER PATTERN: notify observers about new order
        notifier.notifyObservers(saved, "ORDER_PLACED");

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("orderId", saved.getId());
        response.put("status", saved.getStatus());
        response.put("totalAmount", total);
        response.put("paymentMessage", paymentMsg);
        response.put("estimatedTime", "30-45 minutes");
        return response;
    }

    // ── Order Tracking ──
    public Map<String, Object> trackOrder(Long orderId) {
        Order order = orderRepo.findById(orderId).orElse(null);
        if (order == null) return null;

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("orderId", order.getId());
        response.put("customerName", order.getCustomerName());
        response.put("restaurantName", order.getRestaurant().getName());
        response.put("status", order.getStatus());
        response.put("totalAmount", order.getTotalAmount());
        response.put("paymentMethod", order.getPaymentMethod());
        response.put("deliveryAddress", order.getDeliveryAddress());
        response.put("orderTime", order.getOrderTime().toString());
        return response;
    }

    // ── Update Order Status (Observer notifies on each update) ──
    public Map<String, Object> updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepo.findById(orderId).orElse(null);
        if (order == null) return null;

        order.setStatus(newStatus);
        orderRepo.save(order);

        // OBSERVER PATTERN: notify on status update
        notifier.notifyObservers(order, "STATUS_UPDATED: " + newStatus);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("orderId", order.getId());
        response.put("newStatus", newStatus);
        response.put("message", "Order status updated successfully");
        return response;
    }

    // ── Get all orders ──
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}
