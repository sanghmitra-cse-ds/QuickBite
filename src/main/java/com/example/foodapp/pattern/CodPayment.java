package com.example.foodapp.pattern;

// Concrete Strategy 3: Cash on Delivery
public class CodPayment implements PaymentStrategy {
    @Override
    public String pay(double amount) {
        return "Order placed with Cash on Delivery. Pay ₹" + amount + " on delivery.";
    }

    @Override
    public String getMethodName() {
        return "COD";
    }
}
