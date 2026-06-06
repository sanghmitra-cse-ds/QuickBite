package com.example.foodapp.pattern;

// Concrete Strategy 2: Card Payment
public class CardPayment implements PaymentStrategy {
    @Override
    public String pay(double amount) {
        return "Payment of ₹" + amount + " successful via Credit/Debit Card.";
    }

    @Override
    public String getMethodName() {
        return "CARD";
    }
}
