package com.example.foodapp.pattern;

import com.example.foodapp.model.Order;
import java.util.ArrayList;
import java.util.List;

// ==============================
// OBSERVER PATTERN - Order Updates
// ==============================

// Observer Interface
interface OrderObserver {
    void update(Order order, String event);
}

// Concrete Observer 1: Customer Notification
class CustomerNotification implements OrderObserver {
    @Override
    public void update(Order order, String event) {
        System.out.println("[SMS to " + order.getCustomerPhone() + "] " + event + " - Order #" + order.getId());
    }
}

// Concrete Observer 2: Restaurant Notification
class RestaurantNotification implements OrderObserver {
    @Override
    public void update(Order order, String event) {
        System.out.println("[RESTAURANT " + order.getRestaurant().getName() + "] New event: " + event);
    }
}

// Subject (Observable)
public class OrderNotifier {

    private List<OrderObserver> observers = new ArrayList<>();

    public OrderNotifier() {
        observers.add(new CustomerNotification());
        observers.add(new RestaurantNotification());
    }

    public void notifyObservers(Order order, String event) {
        for (OrderObserver observer : observers) {
            observer.update(order, event);
        }
    }
}
