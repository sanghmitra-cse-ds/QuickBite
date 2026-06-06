package com.example.foodapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerPhone;
    private String deliveryAddress;
    private double totalAmount;
    private String paymentMethod;
    private String status; // PLACED, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED
    private LocalDateTime orderTime;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ElementCollection
    private List<String> itemNames;

    @ElementCollection
    private List<Double> itemPrices;

    @ElementCollection
    private List<Integer> itemQuantities;

    public Order() {
        this.orderTime = LocalDateTime.now();
        this.status = "PLACED";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }
    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }
    public List<String> getItemNames() { return itemNames; }
    public void setItemNames(List<String> itemNames) { this.itemNames = itemNames; }
    public List<Double> getItemPrices() { return itemPrices; }
    public void setItemPrices(List<Double> itemPrices) { this.itemPrices = itemPrices; }
    public List<Integer> getItemQuantities() { return itemQuantities; }
    public void setItemQuantities(List<Integer> itemQuantities) { this.itemQuantities = itemQuantities; }
}
