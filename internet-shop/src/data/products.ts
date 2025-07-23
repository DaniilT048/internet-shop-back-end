import type {Product} from "../types/Product.ts";
import {Category} from "../types/Category.ts";

const products: Product[] = [
    {
        id: 1,
        name: "Football",
        image: "./images/balls/football.jpg",
        price: 25,
        description: "Durable synthetic leather football for training and matches.",
        category: Category.BALLS
    },
    {
        id: 2,
        name: "Basketball",
        image: "./images/balls/basketball.jpg",
        price: 30,
        description: "High-grip rubber basketball for indoor and outdoor use.",
        category: Category.BALLS
    },
    {
        id: 3,
        name: "Volleyball",
        image: "./images/balls/volleyball.jpg",
        price: 28,
        description: "Soft-touch volleyball perfect for beach or court games.",
        category: Category.BALLS
    },
    {
        id: 4,
        name: "Tennis Ball Set (6 pcs)",
        image: "./images/balls/tennis-balls.jpg",
        price: 15,
        description: "Pack of 6 professional-grade tennis balls.",
        category: Category.BALLS
    },
    {
        id: 5,
        name: "Medicine Ball (5kg)",
        image: "./images/balls/medicine-ball.jpg",
        price: 35,
        description: "Perfect for strength training and rehab exercises.",
        category: Category.BALLS
    },

    {
        id: 6,
        name: "Adjustable Dumbbells (Pair)",
        image: "./images/dumbbells/adjustable.jpg",
        price: 120,
        description: "Easily adjustable weight for versatile training at home.",
        category: Category.DUMBBELLS
    },
    {
        id: 7,
        name: "Neoprene Dumbbells (2kg)",
        image: "./images/dumbbells/neoprene.jpg",
        price: 20,
        description: "Soft-grip dumbbells ideal for light training.",
        category: Category.DUMBBELLS
    },
    {
        id: 8,
        name: "Chrome Dumbbell Set (10kg)",
        image: "./images/dumbbells/chrome.jpg",
        price: 60,
        description: "Durable chrome-plated dumbbells with grip handle.",
        category: Category.DUMBBELLS
    },
    {
        id: 9,
        name: "Vinyl Dumbbells (3kg pair)",
        image: "./images/dumbbells/vinyl.jpg",
        price: 40,
        description: "Vinyl coated for extra comfort and protection.",
        category: Category.DUMBBELLS
    },
    {
        id: 10,
        name: "Hex Dumbbells (8kg)",
        image: "./images/dumbbells/hex.jpg",
        price: 50,
        description: "Anti-roll hexagonal shape, great for any workout.",
        category: Category.DUMBBELLS
    },


    {
        id: 11,
        name: "Yoga Mat",
        image: "./images/mats/yoga.jpg",
        price: 25,
        description: "Non-slip surface for yoga and stretching routines.",
        category: Category.MATS
    },
    {
        id: 12,
        name: "Thick Exercise Mat",
        image: "./images/mats/thick.jpg",
        price: 35,
        description: "High-density foam mat for comfort and support.",
        category: Category.MATS
    },
    {
        id: 13,
        name: "Folding Gym Mat",
        image: "./images/mats/folding.jpg",
        price: 55,
        description: "Perfect for martial arts, gymnastics, and stretching.",
        category: Category.MATS
    },
    {
        id: 14,
        name: "Puzzle Mat (4pcs)",
        image: "./images/mats/puzzle.jpg",
        price: 45,
        description: "Interlocking mat tiles for floor protection.",
        category: Category.MATS
    },
    {
        id: 15,
        name: "Eco Cork Yoga Mat",
        image: "./images/mats/cork.jpg",
        price: 40,
        description: "Eco-friendly cork mat for better grip and balance.",
        category: Category.MATS
    },

    {
        id: 16,
        name: "Resistance Bands Set",
        image: "./images/accessories/bands.jpg",
        price: 30,
        description: "Includes multiple resistance levels for any workout.",
        category: Category.ACCESSORIES
    },
    {
        id: 17,
        name: "Skipping Rope",
        image: "./images/accessories/rope.jpg",
        price: 12,
        description: "Adjustable speed rope for cardio and endurance.",
        category: Category.ACCESSORIES
    },
    {
        id: 18,
        name: "Fitness Gloves",
        image: "./images/accessories/gloves.jpg",
        price: 18,
        description: "Padded palm gloves for a secure gym grip.",
        category: Category.ACCESSORIES
    },
    {
        id: 19,
        name: "Water Bottle (750ml)",
        image: "./images/accessories/bottle.jpg",
        price: 10,
        description: "Leak-proof BPA-free bottle for your hydration needs.",
        category: Category.ACCESSORIES
    },
    {
        id: 20,
        name: "Workout Towel",
        image: "./images/accessories/towel.jpg",
        price: 8,
        description: "Lightweight and absorbent microfiber gym towel.",
        category: Category.ACCESSORIES
    },
];

export default products;
