const mongoose = require('mongoose');
const Table = require('./server/models/Table');
require('dotenv').config();

const checkSystem = async () => {
  try {
    console.log('🔍 Checking Viru Jash Restaurant System...\n');

    // Check MongoDB connection
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-restaurant-name');
    console.log('✅ MongoDB connected successfully');

    // Check if demo table exists
    console.log('\n🏪 Checking demo table...');
    const demoTable = await Table.findOne({ qrSlug: 'demo-table' });
    
    if (demoTable) {
      console.log(`✅ Demo table found: Table ${demoTable.number}`);
      console.log(`🔗 Demo URL: http://localhost:3000/m/demo-table`);
    } else {
      console.log('❌ Demo table not found! Creating it now...');
      
      const newDemoTable = new Table({
        number: 99,
        qrSlug: 'demo-table'
      });
      await newDemoTable.save();
      console.log('✅ Demo table created successfully');
    }

    // List all tables
    console.log('\n📋 All available tables:');
    const allTables = await Table.find().sort({ number: 1 });
    allTables.forEach(table => {
      console.log(`   Table ${table.number}: http://localhost:3000/m/${table.qrSlug}`);
    });

    // Check menu items count
    const MenuItem = require('./server/models/MenuItem');
    const itemCount = await MenuItem.countDocuments();
    console.log(`\n🍽️ Menu items in database: ${itemCount}`);

    if (itemCount === 0) {
      console.log('❌ No menu items found! Run: npm run seed');
    } else {
      console.log('✅ Menu items available');
    }

    console.log('\n🌐 Access URLs:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Demo Menu: http://localhost:3000/m/demo-table');
    console.log('   Backend API: http://localhost:5000');

    console.log('\n👤 Login Credentials:');
    console.log('   Admin: admin@virujash.com / admin123');
    console.log('   Staff: kitchen@virujash.com / staff123');

    process.exit(0);
  } catch (error) {
    console.error('❌ System check failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solution: Make sure MongoDB is running');
      console.log('   - Start MongoDB service on your system');
      console.log('   - Or install MongoDB from: https://www.mongodb.com/try/download/community');
    }
    
    process.exit(1);
  }
};

checkSystem();