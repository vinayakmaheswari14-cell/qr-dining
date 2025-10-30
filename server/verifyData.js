const mongoose = require('mongoose');
const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
require('dotenv').config();

const verifyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scan-dine-lite');
    
    console.log('🔍 Verifying database content...\n');

    // Check categories
    const categories = await MenuCategory.find({}).sort({ displayOrder: 1 });
    console.log('📂 Categories:');
    categories.forEach(cat => {
      console.log(`   ${cat.displayOrder}. ${cat.name}`);
    });

    // Check menu items
    const menuItems = await MenuItem.find({}).populate('categoryId');
    console.log(`\n🍽️ Menu Items (${menuItems.length} total):`);
    
    for (const category of categories) {
      const categoryItems = menuItems.filter(item => 
        item.categoryId._id.toString() === category._id.toString()
      );
      
      if (categoryItems.length > 0) {
        console.log(`\n   ${category.name}:`);
        categoryItems.forEach(item => {
          console.log(`     • ${item.name} - ₹${item.price}`);
          console.log(`       ${item.description}`);
          console.log(`       Image: ${item.imageUrl ? '✅ Yes' : '❌ No'}`);
          console.log(`       Tags: ${item.tags.join(', ')}`);
        });
      }
    }

    // Check tables
    const tables = await Table.find({}).sort({ number: 1 });
    console.log(`\n🪑 Tables (${tables.length} total):`);
    tables.forEach(table => {
      console.log(`   Table ${table.number}: /m/${table.qrSlug}`);
    });

    console.log('\n✅ Database verification complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error verifying data:', error);
    process.exit(1);
  }
};

verifyData();