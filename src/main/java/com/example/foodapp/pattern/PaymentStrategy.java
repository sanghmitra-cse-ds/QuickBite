package com.example.foodapp.pattern;

// ==============================
// STRATEGY PATTERN - Payment
// ==============================

// Strategy Interface
public interface PaymentStrategy {
    String pay(double amount);
    String getMethodName();
}
