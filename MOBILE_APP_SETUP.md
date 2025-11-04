# 📱 Mobile App Setup Guide

Complete guide to set up and run the Viru Jash Restaurant mobile app.

## 🚀 Quick Start

### Step 1: Prerequisites
```bash
# Install Node.js (if not already installed)
# Download from: https://nodejs.org/

# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
expo --version
```

### Step 2: Setup Mobile App
```bash
# Navigate to mobile app directory
cd mobile-app

# Install dependencies
npm install

# Start development server
npm start
```

### Step 3: Run on Device
1. **Install Expo Go** on your phone:
   - iOS: App Store
   - Android: Google Play Store

2. **Scan QR Code** displayed in terminal/browser

3. **App will load** on your device

## 🔧 Configuration

### Backend Connection
Update `mobile-app/src/config/api.js`:

```javascript
// Find your computer's IP address
// Windows: ipconfig
// Mac/Linux: ifconfig

// Replace with your IP
export const API_BASE_URL = 'http://192.168.1.100:5000/api';
```

### Test Connection
1. Start backend server: `npm run server`
2. Start mobile app: `cd mobile-app && npm start`
3. Test login with demo credentials

## 📱 Platform-Specific Setup

### iOS Development
```bash
# Install iOS Simulator (requires Xcode)
# Then run:
npm run ios
```

### Android Development
```bash
# Install Android Studio and emulator
# Then run:
npm run android
```

### Web Development
```bash
# Run in web browser
npm run web
```

## 🧪 Testing Features

### Demo Accounts
- **Admin**: admin@restaurant.com / admin123
- **Staff**: staff@restaurant.com / staff123

### Test Scenarios
1. **QR Scanning**: Use "Try Demo Menu" button
2. **Menu Browsing**: Browse categories and items
3. **Cart Management**: Add items, apply coupons
4. **Order Placement**: Complete checkout process
5. **Order Tracking**: View order status

### Test Coupons
- **WELCOME10** - 10% off (min ₹200)
- **SAVE20** - 20% off (min ₹500)
- **MEGA50** - 50% off (min ₹1000)

## 🔍 Troubleshooting

### Common Issues

**"Network request failed"**
- Check backend server is running
- Verify API_BASE_URL in config
- Ensure device and computer on same network

**"Expo CLI not found"**
```bash
npm install -g @expo/cli
```

**Metro bundler issues**
```bash
expo start --clear
```

**Camera permissions**
- Grant camera access when prompted
- Required for QR code scanning

### Network Setup
1. **Find your IP address**:
   - Windows: `ipconfig`
   - Mac: `ifconfig en0`
   - Linux: `ifconfig`

2. **Update API config** with your IP
3. **Restart both servers**

## 📦 Building for Production

### Expo Build Service
```bash
# Build APK for Android
expo build:android

# Build IPA for iOS (requires Apple Developer account)
expo build:ios
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for both platforms
eas build --platform all
```

## 🎯 Development Workflow

### Daily Development
1. Start backend: `npm run server`
2. Start mobile app: `cd mobile-app && npm start`
3. Test on device with Expo Go
4. Make changes and see live reload

### Code Structure
```
mobile-app/
├── src/
│   ├── contexts/     # State management
│   ├── screens/      # App screens
│   └── config/       # Configuration
├── App.js           # Main component
└── package.json     # Dependencies
```

## 🔐 Security Notes

- API endpoints use JWT authentication
- Tokens stored securely in AsyncStorage
- Password reset via email verification
- Input validation on all forms

## 🎨 Customization

### Branding
- Update `app.json` for app metadata
- Modify colors in screen stylesheets
- Replace icons and splash screen

### Features
- Add push notifications
- Implement offline caching
- Include location services
- Add social media integration

## 📞 Support

**Need Help?**
- Check main project README.md
- Review Expo documentation: https://docs.expo.dev/
- Contact: info@virujashrestaurant.com

**Useful Commands**
```bash
# Clear cache
expo start --clear

# Check dependencies
npm audit

# Update Expo SDK
expo upgrade

# View logs
expo logs
```

---

**🎉 Your mobile app is ready! Customers can now order directly from their phones by scanning QR codes at tables.**