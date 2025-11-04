# 🔧 Mobile App Dependency Fix

## 🚨 Issue
The mobile app has React version conflicts that prevent Expo from starting.

## ✅ Solution

### Method 1: Use the Fix Script (Easiest)
1. **Double-click** `fix-mobile-app.bat` in the project root
2. **Wait** for cleanup and installation
3. **Follow** the prompts

### Method 2: Manual Commands
Run these commands in your terminal:

```cmd
cd mobile-app
rmdir /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps
npx expo start
```

### Method 3: PowerShell Commands
```powershell
cd mobile-app
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install --legacy-peer-deps
npx expo start
```

## 🔍 What This Does

1. **Cleans** old dependencies that have conflicts
2. **Removes** package-lock.json to reset dependency tree
3. **Installs** with `--legacy-peer-deps` to resolve React version conflicts
4. **Starts** Expo development server

## ✅ Success Indicators

You'll know it worked when you see:
- ✅ Dependencies installed without errors
- ✅ "Starting project at..." message
- ✅ QR code displayed
- ✅ Metro bundler running
- ✅ Expo DevTools opens in browser

## 📱 Next Steps

Once the server is running:

1. **Install Expo Go** on your phone (App Store/Google Play)
2. **Scan QR code** with Expo Go app
3. **Wait** for app to load (first time takes a few minutes)
4. **Test** the restaurant features

## 🔧 Configuration

Don't forget to update your API connection in `mobile-app/src/config/api.js`:

```javascript
// Find your IP: cmd → ipconfig → IPv4 Address
export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
```

## 🧪 Test Features

- ✅ Browse menu (Try Demo Menu button)
- ✅ Add items to cart
- ✅ Apply coupons (WELCOME10, SAVE20)
- ✅ User registration/login
- ✅ QR code scanning

## 🚨 If Still Having Issues

Try these additional steps:

```cmd
# Clear npm cache
npm cache clean --force

# Update npm to latest
npm install -g npm@latest

# Try with force flag
npm install --force

# Alternative: Use yarn
npm install -g yarn
yarn install
```

## 📞 Support

If you continue having issues:
1. Make sure Node.js is updated (v18 or higher)
2. Try running as Administrator
3. Check that no antivirus is blocking npm
4. Restart your computer and try again

---

**🎉 Your mobile app will be running soon!**