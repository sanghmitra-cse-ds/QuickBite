package com.example.foodapp.pattern;

// Concrete Strategy 1: UPI Payment
public class UpiPayment implements PaymentStrategy {
    @Override
    public String pay(double amount) {
        return "Payment of ₹" + amount + " successful via UPI.";
    }

    @Override
    public String getMethodName() {
        return "UPI";
    }
}
