const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Setting up Viru Jash Restaurant...\n');

const runCommand = (command, description) => {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`⚠️ Warning: ${stderr}`);
      }
      console.log(`✅ ${description} completed`);
      resolve(stdout);
    });
  });
};

const setup = async () => {
  try {
    // Install server dependencies
    await runCommand('npm install', 'Installing server dependencies');
    
    // Install client dependencies
    await runCommand('cd client && npm install', 'Installing client dependencies');
    
    // Seed database
    await runCommand('node server/customSeedData.js', 'Setting up database');
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. npm run server  (Start backend)');
    console.log('2. npm run client  (Start frontend)');
    console.log('3. Visit: http://localhost:3000/m/demo-table');
    console.log('\n👤 Login credentials:');
    console.log('Admin: admin@virujash.com / admin123');
    console.log('Staff: kitchen@virujash.com / staff123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

setup();