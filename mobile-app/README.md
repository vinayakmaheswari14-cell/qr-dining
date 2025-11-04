# 📱 Viru Jash Restaurant Mobile App

A React Native mobile application for the Viru Jash Restaurant QR Menu System, built with Expo.

## 🚀 Features

### For Customers
- **QR Code Scanning** - Scan table QR codes to access menu
- **Interactive Menu** - Browse categories, search items, view images
- **Shopping Cart** - Add items, modify quantities, apply coupons
- **User Authentication** - Register, login, password reset
- **Order Management** - Place orders and track status
- **Profile Management** - View order history and account details

### Technical Features
- **Cross-Platform** - Works on iOS and Android
- **Offline Support** - Cart persists locally
- **Real-time Updates** - Live order status tracking
- **Professional UI** - Modern Material Design
- **Camera Integration** - QR code scanning
- **Secure Authentication** - JWT-based auth with AsyncStorage

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation system
- **AsyncStorage** - Local data persistence
- **Expo Camera** - QR code scanning
- **Context API** - State management

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your phone (for testing)

### Setup

1. **Navigate to mobile app directory**
   ```bash
   cd mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/simulator**
   - **Physical Device**: Scan QR code with Expo Go app
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal
   - **Web Browser**: Press `w` in terminal

## 🔧 Configuration

### API Configuration
Update `src/config/api.js` with your backend server URL:

```javascript
// For development with physical device
export const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5000/api';

// For emulator/simulator
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Finding Your Computer's IP Address
- **Windows**: `ipconfig` (look for IPv4 Address)
- **macOS/Linux**: `ifconfig` (look for inet address)

## 📱 App Structure

```
mobile-app/
├── src/
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.js  # Authentication state
│   │   └── CartContext.js  # Shopping cart state
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js   # Welcome screen
│   │   ├── QRScannerScreen.js # QR code scanner
│   │   ├── MenuScreen.js   # Menu browsing
│   │   ├── CartScreen.js   # Shopping cart
│   │   ├── LoginScreen.js  # User login
│   │   ├── RegisterScreen.js # User registration
│   │   ├── OrderStatusScreen.js # Order tracking
│   │   └── ProfileScreen.js # User profile
│   └── config/
│       └── api.js          # API configuration
├── App.js                  # Main app component
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## 🎯 Usage

### For Development
1. Start the backend server (from main project):
   ```bash
   npm run server
   ```

2. Start the mobile app:
   ```bash
   cd mobile-app
   npm start
   ```

3. Test on your device using Expo Go app

### For Testing
- **Demo Accounts**:
  - Admin: admin@restaurant.com / admin123
  - Staff: staff@restaurant.com / staff123

- **Demo Features**:
  - Use "Try Demo Menu" to browse without QR scanning
  - Test coupons: WELCOME10, SAVE20, MEGA50
  - Place test orders and track status

## 📋 Available Scripts

```bash
# Start development server
npm start
expo start

# Run on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator  
npm run web        # Web browser

# Build for production
expo build:android
expo build:ios
```

## 🔍 Key Features Explained

### QR Code Scanning
- Uses Expo Camera for QR code detection
- Automatically extracts table slug from QR data
- Supports both full URLs and table slugs
- Fallback to demo menu if scanning fails

### Shopping Cart
- Persistent cart using AsyncStorage
- Real-time quantity updates
- Coupon validation and application
- Order total calculations with discounts

### Authentication
- JWT-based authentication
- Secure token storage with AsyncStorage
- Password reset with email verification
- Auto-login on app restart

### Order Management
- Real-time order status updates
- Order history with detailed information
- Order cancellation for pending orders
- Push notifications (can be added)

## 🚀 Deployment

### Expo Build Service
```bash
# Build for Android
expo build:android

# Build for iOS (requires Apple Developer account)
expo build:ios
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for both platforms
eas build --platform all
```

## 🔧 Customization

### Branding
- Update `app.json` for app name, icon, splash screen
- Modify colors in screen stylesheets
- Replace placeholder images with restaurant photos

### Features
- Add push notifications for order updates
- Implement loyalty program
- Add table reservation system
- Include restaurant location and directions

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
expo start --clear
```

**Network connectivity:**
- Ensure backend server is running
- Check API_BASE_URL configuration
- Verify device and computer are on same network

**QR Scanner not working:**
- Grant camera permissions
- Test on physical device (camera required)
- Check QR code format

**Build failures:**
- Clear Expo cache: `expo start --clear`
- Delete node_modules and reinstall
- Check Expo SDK compatibility

## 📞 Support

For issues and questions:
- Check the main project README.md
- Review Expo documentation
- Contact: info@virujashrestaurant.com

## 🎉 Features Roadmap

- [ ] Push notifications for order updates
- [ ] Offline menu caching
- [ ] Table reservation system
- [ ] Loyalty points and rewards
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Voice ordering (accessibility)

---

**🍽️ Enjoy your mobile dining experience with Viru Jash Restaurant!**