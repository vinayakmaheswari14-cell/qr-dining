@echo off
echo 🚀 Starting Viru Jash Restaurant System...
echo.

echo 📦 Installing dependencies...
call npm install
cd client
call npm install
cd ..

echo.
echo 🗄️ Setting up database...
call npm run seed

echo.
echo 🌐 Starting servers...
echo Frontend will open at: http://localhost:3000
echo Backend API at: http://localhost:5000
echo Demo Menu: http://localhost:3000/m/demo-table
echo.

start cmd /k "npm run server"
timeout /t 3 /nobreak > nul
start cmd /k "cd client && npm start"

echo ✅ Servers started! Check the opened terminal windows.
pause