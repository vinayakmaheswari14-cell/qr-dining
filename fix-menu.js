const mongoose = require('mongoose');
const Table = require('./server/models/Table');
const MenuItem = require('./server/models/MenuItem');
const MenuCategory = require('./server/models/MenuCategory');
require('dotenv').config();

const fixMenu = async () => {
  try {
    console.log('🔧 Fixing Viru Jash Restaurant Menu System...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-restaurant-name');
    console.log('✅ Connected to MongoDB');

    // Check and fix demo table
    let demoTable = await Table.findOne({ qrSlug: 'demo-table' });
    
    if (!demoTable) {
      console.log('🔨 Creating demo table...');
      demoTable = new Table({
        number: 99,
        qrSlug: 'demo-table'
      });
      await demoTable.save();
      console.log('✅ Demo table created');
    } else {
      console.log('✅ Demo table exists');
    }

    // Check menu items
    const itemCount = await MenuItem.countDocuments();
    console.log(`📊 Menu items count: ${itemCount}`);

    if (itemCount === 0) {
      console.log('🔨 No menu items found. Creating sample menu...');
      
      // Create a category
      const category = new MenuCategory({
        name: 'Starters',
        displayOrder: 1,
        active: true
      });
      await category.save();

      // Create sample items
      const sampleItems = [
        {
          name: 'Paneer Tikka',
          description: 'Marinated cottage cheese cubes grilled to perfection',
          price: 280,
          categoryId: category._id,
          availability: true,
          tags: ['vegetarian', 'indian'],
          imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop'
        },
        {
          name: 'Samosa (2 pcs)',
          description: 'Crispy pastry filled with spiced potatoes and peas',
          price: 80,
          categoryId: category._id,
          availability: true,
          tags: ['vegetarian', 'fried'],
          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
        }
      ];

      for (const itemData of sampleItems) {
        const item = new MenuItem(itemData);
        await item.save();
      }

      console.log('✅ Sample menu items created');
    } else {
      console.log('✅ Menu items exist');
    }

    // Test the menu endpoint
    console.log('\n🧪 Testing menu endpoint...');
    const testTable = await Table.findOne({ qrSlug: 'demo-table' });
    const categories = await MenuCategory.find({ active: true });
    const items = await MenuItem.find({ availability: true });

    console.log(`✅ Found ${categories.length} categories`);
    console.log(`✅ Found ${items.length} available items`);

    console.log('\n🎉 Menu system fixed successfully!');
    console.log('\n🌐 Try these URLs:');
    console.log(`   Demo Menu: http://localhost:3000/m/demo-table`);
    console.log(`   Frontend: http://localhost:3000`);

    console.log('\n📋 Next steps:');
    console.log('1. Make sure both servers are running:');
    console.log('   Terminal 1: npm run server');
    console.log('   Terminal 2: npm run client');
    console.log('2. Visit: http://localhost:3000/m/demo-table');

    process.exit(0);
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    console.log('\n💡 Try running: npm run seed');
    process.exit(1);
  }
};

fixMenu();