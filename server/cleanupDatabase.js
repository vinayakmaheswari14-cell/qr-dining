const mongoose = require('mongoose');
const Order = require('./models/Order');
const Table = require('./models/Table');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const cleanupDatabase = async () => {
  try {
    console.log('🧹 Cleaning up database...\n');

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-restaurant-name');
    console.log('✅ Connected to MongoDB');

    // Find orders with null or invalid tableId
    const ordersWithNullTable = await Order.find({ tableId: null });
    console.log(`🔍 Found ${ordersWithNullTable.length} orders with null tableId`);

    if (ordersWithNullTable.length > 0) {
      await Order.deleteMany({ tableId: null });
      console.log('🗑️ Deleted orders with null tableId');
    }

    // Find orders with invalid tableId references
    const allOrders = await Order.find();
    let invalidOrders = 0;

    for (const order of allOrders) {
      const tableExists = await Table.findById(order.tableId);
      if (!tableExists) {
        await Order.findByIdAndDelete(order._id);
        invalidOrders++;
      }
    }

    if (invalidOrders > 0) {
      console.log(`🗑️ Deleted ${invalidOrders} orders with invalid table references`);
    }

    // Find orders with invalid menu item references
    const ordersWithItems = await Order.find();
    let fixedItems = 0;

    for (const order of ordersWithItems) {
      let needsUpdate = false;
      const validItems = [];

      for (const item of order.items) {
        const menuItemExists = await MenuItem.findById(item.menuItemId);
        if (menuItemExists) {
          validItems.push(item);
        } else {
          needsUpdate = true;
          fixedItems++;
        }
      }

      if (needsUpdate) {
        if (validItems.length > 0) {
          order.items = validItems;
          // Recalculate totals
          const subtotal = validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          order.subtotal = subtotal;
          order.total = subtotal + order.tax;
          await order.save();
        } else {
          // Delete order if no valid items remain
          await Order.findByIdAndDelete(order._id);
        }
      }
    }

    if (fixedItems > 0) {
      console.log(`🔧 Fixed ${fixedItems} invalid menu item references`);
    }

    // Ensure demo table exists
    let demoTable = await Table.findOne({ qrSlug: 'demo-table' });
    if (!demoTable) {
      demoTable = new Table({
        number: 99,
        qrSlug: 'demo-table'
      });
      await demoTable.save();
      console.log('✅ Created demo table');
    }

    // Show final stats
    const finalStats = {
      orders: await Order.countDocuments(),
      tables: await Table.countDocuments(),
      menuItems: await MenuItem.countDocuments()
    };

    console.log('\n📊 Database cleanup completed!');
    console.log(`Orders: ${finalStats.orders}`);
    console.log(`Tables: ${finalStats.tables}`);
    console.log(`Menu Items: ${finalStats.menuItems}`);

    console.log('\n🌐 Test URLs:');
    console.log('Frontend: http://localhost:3000');
    console.log('Demo Menu: http://localhost:3000/m/demo-table');
    console.log('Staff Dashboard: http://localhost:3000/staff');

    process.exit(0);
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
};

cleanupDatabase();