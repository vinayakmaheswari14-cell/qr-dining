#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Email Configuration for Viru Jash Restaurant\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found!');
    console.log('   Please create a .env file in the project root directory.');
    process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

// Parse environment variables
const envVars = {};
envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
    }
});

console.log('📧 Email Configuration Check:\n');

// Check EMAIL_USER
if (envVars.EMAIL_USER) {
    if (envVars.EMAIL_USER.includes('@gmail.com')) {
        console.log('✅ EMAIL_USER: Gmail address configured');
        console.log(`   Address: ${envVars.EMAIL_USER}`);
    } else {
        console.log('⚠️  EMAIL_USER: Non-Gmail address detected');
        console.log(`   Address: ${envVars.EMAIL_USER}`);
        console.log('   Make sure your email service is properly configured');
    }
} else {
    console.log('❌ EMAIL_USER: Not configured');
    console.log('   Add: EMAIL_USER=your-email@gmail.com');
}

// Check EMAIL_PASS
if (envVars.EMAIL_PASS) {
    const passLength = envVars.EMAIL_PASS.length;
    if (passLength === 16 && !/\s/.test(envVars.EMAIL_PASS)) {
        console.log('✅ EMAIL_PASS: App password format looks correct');
        console.log(`   Length: ${passLength} characters (no spaces)`);
    } else if (passLength === 19 && envVars.EMAIL_PASS.includes(' ')) {
        console.log('⚠️  EMAIL_PASS: Contains spaces (should be removed)');
        console.log('   Remove spaces from your app password');
    } else {
        console.log('⚠️  EMAIL_PASS: Unusual format detected');
        console.log(`   Length: ${passLength} characters`);
        console.log('   Gmail app passwords are typically 16 characters without spaces');
    }
} else {
    console.log('❌ EMAIL_PASS: Not configured');
    console.log('   Add: EMAIL_PASS=your-16-character-app-password');
}

// Check EMAIL_FROM_NAME
if (envVars.EMAIL_FROM_NAME) {
    console.log('✅ EMAIL_FROM_NAME: Configured');
    console.log(`   Name: ${envVars.EMAIL_FROM_NAME}`);
} else {
    console.log('ℹ️  EMAIL_FROM_NAME: Using default');
    console.log('   Optional: EMAIL_FROM_NAME=Viru Jash Restaurant');
}

console.log('\n🔧 Configuration Status:');

let configScore = 0;
let maxScore = 2;

if (envVars.EMAIL_USER && envVars.EMAIL_USER.includes('@')) configScore++;
if (envVars.EMAIL_PASS && envVars.EMAIL_PASS.length >= 8) configScore++;

if (configScore === maxScore) {
    console.log('🟢 Email configuration appears complete!');
    console.log('\n📝 Next Steps:');
    console.log('1. Restart your server: npm run server');
    console.log('2. Test password reset: npm run test-email');
    console.log('3. Check server console for email status');
} else {
    console.log('🟡 Email configuration incomplete');
    console.log('\n📋 Required Steps:');
    
    if (!envVars.EMAIL_USER) {
        console.log('1. Set up Gmail account with 2-Factor Authentication');
        console.log('2. Generate App Password in Google Account settings');
        console.log('3. Add EMAIL_USER=your-gmail@gmail.com to .env');
    }
    
    if (!envVars.EMAIL_PASS) {
        console.log('4. Add EMAIL_PASS=your-app-password to .env');
    }
    
    console.log('\n📖 See GMAIL_SETUP_GUIDE.md for detailed instructions');
}

console.log('\n🔒 Security Reminders:');
console.log('- Never commit .env file to version control');
console.log('- Use App Password, not your regular Gmail password');
console.log('- Keep your app password secure and private');

console.log('\n🎯 Testing Commands:');
console.log('# Test password reset email');
console.log('curl -X POST http://localhost:5000/api/auth/forgot-password \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"email":"admin@restaurant.com"}\'');

console.log('\n# Test user registration (welcome email)');
console.log('curl -X POST http://localhost:5000/api/auth/register \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"name":"Test User","email":"test@example.com","password":"password123"}\'');

console.log('\n✨ Email system ready for Viru Jash Restaurant!');