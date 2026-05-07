require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Room = require("../models/Room");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/booking-system";

// Placeholder image URLs (Option A) - frontend getRoomImageUrl uses strings as full URLs
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
];

const ROOMS = [
  {
    name: "Agua Suite",
    price: 8500,
    description: "A serene escape with ocean views and modern amenities.",
    quantity: 4,
    images: [
      PLACEHOLDER_IMAGES[0],
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    ],
  },
  {
    name: "Arena Suite",
    price: 7200,
    description: "Beach-inspired comfort steps from the sand.",
    quantity: 3,
    images: [
      PLACEHOLDER_IMAGES[1],
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
  },
  {
    name: "Jungle Suite",
    price: 6500,
    description: "Tropical retreat surrounded by lush greenery.",
    quantity: 5,
    images: [
      PLACEHOLDER_IMAGES[2],
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
  },
  {
    name: "Tiera Suite",
    price: 9200,
    description: "Elegant suite with premium finishes.",
    quantity: 2,
    images: [
      PLACEHOLDER_IMAGES[3],
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const existingCategories = await Category.find({});
    let categoryId;
    if (existingCategories.length === 0) {
      const cat = await Category.create({ name: "Standard" });
      categoryId = cat._id.toString();
      console.log("Created category:", categoryId);
    } else {
      categoryId = existingCategories[0]._id.toString();
      console.log("Using existing category:", categoryId);
    }

    const existingRooms = await Room.find({});
    if (existingRooms.length > 0) {
      console.log("Rooms already exist (" + existingRooms.length + "). Skipping room seed.");
      await mongoose.disconnect();
      process.exit(0);
      return;
    }

    for (const room of ROOMS) {
      await Room.create({
        ...room,
        categoryId,
      });
    }
    console.log("Created", ROOMS.length, "rooms with placeholder images.");

    await mongoose.disconnect();
    console.log("Seed complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
