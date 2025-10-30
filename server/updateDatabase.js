const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const MenuCategory = require('./models/MenuCategory');
const User = require('./models/User');
const Table = require('./models/Table');
require('dotenv').config();

const updateDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Example updates - uncomment what you need:

    // 1. Update a specific menu item price
    // await MenuItem.updateOne(
    //   { name: 'Paneer Tikka' },
    //   { price: 300 }
    // );
    // console.log('Updated Paneer Tikka price');

    // 2. Add a new menu item
    // const newItem = new MenuItem({
    //   name: 'Special Thali',
    //   description: 'Complete Indian meal with dal, sabzi, roti, rice',
    //   price: 250,
    //   categoryId: 'YOUR_CATEGORY_ID_HERE',
    //   availability: true,
    //   tags: ['vegetarian', 'complete-meal'],
    //   imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    // });
    // await newItem.save();
    // console.log('Added new item: Special Thali');

    // 3. Update multiple items at once
    // await MenuItem.updateMany(
    //   { tags: 'paneer' },
    //   { $inc: { price: 10 } }  // Increase all paneer items by ₹10
    // );
    // console.log('Updated all paneer item prices');

    // 4. Make an item unavailable
    // await MenuItem.updateOne(
    //   { name: 'Samosa (2 pcs)' },
    //   { availability: false }
    // );
    // console.log('Made Samosa unavailable');

    // 5. View current data
    const itemCount = await MenuItem.countDocuments();
    const categoryCount = await MenuCategory.countDocuments();
    const userCount = await User.countDocuments();
    const tableCount = await Table.countDocuments();

    console.log('\n📊 Current Database Stats:');
    console.log(`Menu Items: ${itemCount}`);
    console.log(`Categories: ${categoryCount}`);
    console.log(`Users: ${userCount}`);
    console.log(`Tables: ${tableCount}`);

    // 6. Show recent orders
    const Order = require('./models/Order');
    const recentOrders = await Order.find()
      .populate('tableId', 'number')
      .sort({ createdAt: -1 })
      .limit(5);
    
    console.log('\n🍽️ Recent Orders:');
    recentOrders.forEach(order => {
      console.log(`Table ${order.tableId.number}: ₹${order.total} - ${order.status}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateDatabase();