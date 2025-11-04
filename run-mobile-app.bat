@echo off
echo Starting Viru Jash Restaurant Mobile App...
echo.
cd mobile-app
echo Installing dependencies...
call npm install
echo.
echo Starting Expo development server...
call npx expo start
pause