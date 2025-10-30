const mongoose = require('mongoose');
const Order = require('./models/Order');
const Table = require('./models/Table');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const createTestOrder = async () => {
  try {
    console.log('🧪 Creating test order...\n');

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-restaurant-name');
    console.log('✅ Connected to MongoDB');

    // Find demo table
    const demoTable = await Table.findOne({ qrSlug: 'demo-table' });
    if (!demoTable) {
      console.log('❌ Demo table not found. Run: npm run create-demo');
      process.exit(1);
    }

    // Find some menu items
    const menuItems = await MenuItem.find().limit(2);
    if (menuItems.length === 0) {
      console.log('❌ No menu items found. Run: npm run seed');
      process.exit(1);
    }

    // Create test order
    const testOrder = new Order({
      tableId: demoTable._id,
      customerId: null, // Guest order
      items: [
        {
          menuItemId: menuItems[0]._id,
          quantity: 2,
          note: 'Extra spicy please',
          price: menuItems[0].price
        },
        {
          menuItemId: menuItems[1]._id,
          quantity: 1,
          note: '',
          price: menuItems[1].price
        }
      ],
      status: 'placed',
      subtotal: (menuItems[0].price * 2) + menuItems[1].price,
      tax: ((menuItems[0].price * 2) + menuItems[1].price) * 0.08,
      total: ((menuItems[0].price * 2) + menuItems[1].price) * 1.08,
      customerNote: 'Test order for debugging'
    });

    await testOrder.save();

    console.log('✅ Test order created successfully!');
    console.log(`📋 Order ID: ${testOrder._id}`);
    console.log(`🏪 Table: ${demoTable.number}`);
    console.log(`💰 Total: ₹${testOrder.total}`);
    console.log(`📱 Status: ${testOrder.status}`);

    console.log('\n🔗 Test URLs:');
    console.log(`Order Success: http://localhost:3000/order-success/${testOrder._id}`);
    console.log(`Order Status: http://localhost:3000/order-status/${testOrder._id}`);
    console.log(`API Endpoint: http://localhost:5000/api/orders/${testOrder._id}`);

    console.log('\n📋 Order Items:');
    testOrder.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.quantity}x ${menuItems[index].name} - ₹${item.price * item.quantity}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test order:', error.message);
    process.exit(1);
  }
};

createTestOrder();