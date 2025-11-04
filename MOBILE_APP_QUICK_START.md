# 📱 Quick Start Guide - Mobile App

## 🚀 Step-by-Step Instructions

### Method 1: Using Command Prompt (Recommended)

1. **Open Command Prompt as Administrator**
   - Press `Win + R`, type `cmd`, press `Ctrl + Shift + Enter`

2. **Navigate to mobile app directory**
   ```cmd
   cd "C:\Users\DELL\OneDrive\Desktop\project1\mobile-app"
   ```

3. **Install dependencies**
   ```cmd
   npm install
   ```

4. **Start the mobile app**
   ```cmd
   npx expo start
   ```

### Method 2: Using the Batch File

1. **Double-click** `run-mobile-app.bat` in the project root
2. **Wait** for installation and startup
3. **Follow** the on-screen instructions

### Method 3: Using VS Code Terminal

1. **Open VS Code terminal** (Ctrl + `)
2. **Navigate to mobile-app**:
   ```bash
   cd mobile-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start Expo**:
   ```bash
   npx expo start
   ```

## 📱 Testing on Your Phone

### Install Expo Go App
- **Android**: Google Play Store → Search "Expo Go"
- **iOS**: App Store → Search "Expo Go"

### Connect Your Phone
1. **Make sure** your phone and computer are on the same WiFi network
2. **Open Expo Go** app on your phone
3. **Scan the QR code** displayed in the terminal/browser
4. **Wait** for the app to load (first time may take a few minutes)

## 🔧 Configuration

### Update API Connection
Edit `mobile-app/src/config/api.js`:

```javascript
// Find your computer's IP address:
// Windows: Open cmd → type "ipconfig" → look for IPv4 Address
// Example: 192.168.1.100

export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
```

### Find Your IP Address
**Windows Command:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (usually starts with 192.168.x.x)

## ✅ Success Indicators

You'll know it's working when you see:
- ✅ QR code displayed in terminal
- ✅ Metro bundler running
- ✅ "Expo DevTools" opens in browser
- ✅ App loads on your phone via Expo Go

## 🧪 Test Features

### Demo Credentials
- **Admin**: admin@restaurant.com / admin123
- **Staff**: staff@restaurant.com / staff123

### Test Scenarios
1. **Browse Menu** - Use "Try Demo Menu" button
2. **Add to Cart** - Add items and modify quantities
3. **Apply Coupons** - Try: WELCOME10, SAVE20, MEGA50
4. **User Registration** - Create a new account
5. **QR Scanning** - Use camera to scan QR codes

## 🚨 Troubleshooting

### "Expo command not found"
```cmd
npm install -g @expo/cli
```

### "Network request failed"
- Check if backend server is running: `npm run server`
- Update API_BASE_URL with correct IP address
- Ensure phone and computer on same WiFi

### "Metro bundler failed"
```cmd
npx expo start --clear
```

### "Dependencies not installed"
```cmd
cd mobile-app
npm install
```

## 📞 Need Help?

If you encounter issues:
1. **Check** that backend server is running (`npm run server`)
2. **Verify** your IP address in the config file
3. **Ensure** phone and computer are on same network
4. **Try** restarting both Expo and the backend server

## 🎉 What's Next?

Once the app is running:
- **Customize** the restaurant branding
- **Add** real menu item photos
- **Test** all features thoroughly
- **Deploy** to app stores when ready

---

**🍽️ Your mobile restaurant app is ready to serve customers!**