package com.example.foodapp.pattern;

import com.example.foodapp.model.Order;
import com.example.foodapp.model.Restaurant;
import java.util.List;

// ==============================
// BUILDER PATTERN - Order Creation
// ==============================

public class OrderBuilder {

    private Order order;

    public OrderBuilder() {
        this.order = new Order();
    }

    public OrderBuilder customerName(String name) {
        order.setCustomerName(name);
        return this;
    }

    public OrderBuilder customerPhone(String phone) {
        order.setCustomerPhone(phone);
        return this;
    }

    public OrderBuilder deliveryAddress(String address) {
        order.setDeliveryAddress(address);
        return this;
    }

    public OrderBuilder restaurant(Restaurant restaurant) {
        order.setRestaurant(restaurant);
        return this;
    }

    public OrderBuilder items(List<String> names, List<Double> prices, List<Integer> quantities) {
        order.setItemNames(names);
        order.setItemPrices(prices);
        order.setItemQuantities(quantities);
        return this;
    }

    public OrderBuilder totalAmount(double amount) {
        order.setTotalAmount(amount);
        return this;
    }

    public OrderBuilder paymentMethod(String method) {
        order.setPaymentMethod(method);
        return this;
    }

    public Order build() {
        return order;
    }
}
