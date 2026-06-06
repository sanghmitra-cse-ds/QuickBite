package com.example.foodapp;

import com.example.foodapp.model.*;
import com.example.foodapp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private FoodService foodService;

    @Override
    public void run(String... args) {

        // Restaurant 1
        Restaurant r1 = foodService.saveRestaurant(
            new Restaurant("Spice Garden", "Indian", "Ghaziabad, UP", 4.5, "🍛"));
        foodService.saveMenuItem(new MenuItem("Butter Chicken", "Rich creamy tomato curry", 280, "Main Course", "🍗", r1));
        foodService.saveMenuItem(new MenuItem("Paneer Tikka", "Grilled cottage cheese with spices", 220, "Starter", "🧀", r1));
        foodService.saveMenuItem(new MenuItem("Dal Makhani", "Slow cooked black lentils", 180, "Main Course", "🍲", r1));
        foodService.saveMenuItem(new MenuItem("Garlic Naan", "Freshly baked flatbread", 60, "Bread", "🫓", r1));
        foodService.saveMenuItem(new MenuItem("Mango Lassi", "Sweet yoghurt mango drink", 80, "Beverage", "🥭", r1));

        // Restaurant 2
        Restaurant r2 = foodService.saveRestaurant(
            new Restaurant("Pizza Planet", "Italian", "Ghaziabad, UP", 4.2, "🍕"));
        foodService.saveMenuItem(new MenuItem("Margherita Pizza", "Classic tomato and mozzarella", 320, "Pizza", "🍕", r2));
        foodService.saveMenuItem(new MenuItem("BBQ Chicken Pizza", "BBQ sauce with grilled chicken", 420, "Pizza", "🍕", r2));
        foodService.saveMenuItem(new MenuItem("Pasta Arrabbiata", "Spicy tomato pasta", 260, "Pasta", "🍝", r2));
        foodService.saveMenuItem(new MenuItem("Garlic Bread", "Toasted bread with garlic butter", 120, "Starter", "🍞", r2));
        foodService.saveMenuItem(new MenuItem("Tiramisu", "Italian coffee dessert", 180, "Dessert", "🍮", r2));

        // Restaurant 3
        Restaurant r3 = foodService.saveRestaurant(
            new Restaurant("Dragon Wok", "Chinese", "Ghaziabad, UP", 4.3, "🥡"));
        foodService.saveMenuItem(new MenuItem("Kung Pao Chicken", "Spicy stir-fried chicken with peanuts", 300, "Main Course", "🍗", r3));
        foodService.saveMenuItem(new MenuItem("Veg Hakka Noodles", "Stir-fried noodles with vegetables", 200, "Noodles", "🍜", r3));
        foodService.saveMenuItem(new MenuItem("Dim Sum Basket", "Steamed dumplings assorted", 240, "Starter", "🥟", r3));
        foodService.saveMenuItem(new MenuItem("Fried Rice", "Classic egg fried rice", 180, "Rice", "🍚", r3));
        foodService.saveMenuItem(new MenuItem("Hot & Sour Soup", "Tangy soup with vegetables", 120, "Soup", "🍵", r3));

        // Restaurant 4
        Restaurant r4 = foodService.saveRestaurant(
            new Restaurant("Burger Barn", "American", "Ghaziabad, UP", 4.0, "🍔"));
        foodService.saveMenuItem(new MenuItem("Classic Beef Burger", "Juicy beef patty with veggies", 250, "Burger", "🍔", r4));
        foodService.saveMenuItem(new MenuItem("Crispy Chicken Burger", "Fried chicken with coleslaw", 230, "Burger", "🍔", r4));
        foodService.saveMenuItem(new MenuItem("Cheese Fries", "Loaded fries with cheese sauce", 150, "Sides", "🍟", r4));
        foodService.saveMenuItem(new MenuItem("Onion Rings", "Crispy battered onion rings", 120, "Sides", "🧅", r4));
        foodService.saveMenuItem(new MenuItem("Chocolate Shake", "Thick creamy chocolate milkshake", 160, "Beverage", "🥤", r4));

        System.out.println("✅ Sample data loaded: 4 restaurants, 20 menu items");
    }
}
