const mongoose = require('mongoose');
const Table = require('./models/Table');
require('dotenv').config();

const getFirstTable = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const firstTable = await Table.findOne();
    if (firstTable) {
      console.log(`\n🔗 Direct menu link: http://localhost:3000/m/${firstTable.qrSlug}`);
      console.log(`📱 Table ${firstTable.number} QR Menu`);
    } else {
      console.log('No tables found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

getFirstTable();