@echo off
echo 🚀 Upgrading Viru Jash Restaurant Mobile App to SDK 54...
echo.

cd mobile-app

echo 📦 Cleaning up old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo 📥 Installing SDK 54 dependencies...
call npm install --legacy-peer-deps

echo.
echo ✅ Upgrade complete! Starting Expo...
call npx expo start

pause