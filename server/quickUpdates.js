const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const MenuCategory = require('./models/MenuCategory');
require('dotenv').config();

// Quick update functions
const quickUpdates = {
  // Update specific item price
  updatePrice: async (itemName, newPrice) => {
    const result = await MenuItem.updateOne(
      { name: itemName },
      { price: newPrice }
    );
    console.log(`Updated ${itemName} price to ₹${newPrice}`);
    return result;
  },

  // Make item unavailable
  makeUnavailable: async (itemName) => {
    const result = await MenuItem.updateOne(
      { name: itemName },
      { availability: false }
    );
    console.log(`Made ${itemName} unavailable`);
    return result;
  },

  // Make item available
  makeAvailable: async (itemName) => {
    const result = await MenuItem.updateOne(
      { name: itemName },
      { availability: true }
    );
    console.log(`Made ${itemName} available`);
    return result;
  },

  // Increase all prices by percentage
  increasePrices: async (percentage) => {
    const items = await MenuItem.find();
    for (let item of items) {
      const newPrice = Math.round(item.price * (1 + percentage / 100));
      await MenuItem.updateOne(
        { _id: item._id },
        { price: newPrice }
      );
    }
    console.log(`Increased all prices by ${percentage}%`);
  },

  // List all items with prices
  listItems: async () => {
    const items = await MenuItem.find()
      .populate('categoryId', 'name')
      .sort({ 'categoryId.name': 1, name: 1 });
    
    console.log('\n📋 All Menu Items:');
    let currentCategory = '';
    items.forEach(item => {
      if (item.categoryId.name !== currentCategory) {
        currentCategory = item.categoryId.name;
        console.log(`\n--- ${currentCategory} ---`);
      }
      const status = item.availability ? '✅' : '❌';
      console.log(`${status} ${item.name}: ₹${item.price}`);
    });
  }
};

const runUpdates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // UNCOMMENT THE OPERATIONS YOU WANT TO PERFORM:

    // Update specific item price
    // await quickUpdates.updatePrice('Paneer Tikka', 300);

    // Make item unavailable
    // await quickUpdates.makeUnavailable('Samosa (2 pcs)');

    // Make item available again
    // await quickUpdates.makeAvailable('Samosa (2 pcs)');

    // Increase all prices by 5%
    // await quickUpdates.increasePrices(5);

    // List all items
    await quickUpdates.listItems();

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

runUpdates();