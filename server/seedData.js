const mongoose = require('mongoose');
const User = require('./models/User');
const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scan-dine-lite');
    
    // Clear existing data
    await User.deleteMany({});
    await MenuCategory.deleteMany({});
    await MenuItem.deleteMany({});
    await Table.deleteMany({});

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@restaurant.com',
      passwordHash: 'admin123',
      role: 'admin'
    });
    await admin.save();

    // Create staff user
    const staff = new User({
      name: 'Staff Member',
      email: 'staff@restaurant.com',
      passwordHash: 'staff123',
      role: 'staff'
    });
    await staff.save();

    // Create categories
    const appetizers = new MenuCategory({
      name: 'Appetizers',
      displayOrder: 1,
      active: true
    });
    await appetizers.save();

    const mains = new MenuCategory({
      name: 'Main Courses',
      displayOrder: 2,
      active: true
    });
    await mains.save();

    const desserts = new MenuCategory({
      name: 'Desserts',
      displayOrder: 3,
      active: true
    });
    await desserts.save();

    // Create menu items
    const menuItems = [
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan cheese and croutons',
        price: 12.99,
        categoryId: appetizers._id,
        availability: true,
        tags: ['salad', 'vegetarian']
      },
      {
        name: 'Chicken Wings',
        description: 'Spicy buffalo wings served with ranch dressing',
        price: 14.99,
        categoryId: appetizers._id,
        availability: true,
        tags: ['chicken', 'spicy']
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with lemon herb seasoning',
        price: 24.99,
        categoryId: mains._id,
        availability: true,
        tags: ['fish', 'healthy']
      },
      {
        name: 'Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and fries',
        price: 18.99,
        categoryId: mains._id,
        availability: true,
        tags: ['beef', 'burger']
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with vanilla ice cream',
        price: 8.99,
        categoryId: desserts._id,
        availability: true,
        tags: ['chocolate', 'sweet']
      }
    ];

    for (const item of menuItems) {
      const menuItem = new MenuItem(item);
      await menuItem.save();
    }

    // Create demo table
    const demoTable = new Table({
      number: 1,
      qrSlug: 'demo-table'
    });
    await demoTable.save();

    console.log('Sample data created successfully!');
    console.log('Admin login: admin@restaurant.com / admin123');
    console.log('Staff login: staff@restaurant.com / staff123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();