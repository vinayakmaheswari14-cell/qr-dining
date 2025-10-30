const mongoose = require('mongoose');
const Table = require('./models/Table');
require('dotenv').config();

const createDemoTable = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if demo table exists
    let demoTable = await Table.findOne({ qrSlug: 'demo-table' });
    
    if (!demoTable) {
      // Create demo table with regular number
      demoTable = new Table({
        number: 11, // Demo table number (not conflicting with existing tables)
        qrSlug: 'demo-table'
      });
      await demoTable.save();
      console.log('Demo table created with slug: demo-table');
    } else {
      console.log('Demo table already exists with slug: demo-table');
    }
    
    // List all tables
    const allTables = await Table.find();
    console.log('\nAll tables in database:');
    allTables.forEach(table => {
      console.log(`Table ${table.number}: /m/${table.qrSlug}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createDemoTable();