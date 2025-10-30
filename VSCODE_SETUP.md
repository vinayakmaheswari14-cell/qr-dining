# 🚀 VS Code Setup Guide for Viru Jash Restaurant

## 📋 Prerequisites

1. **Install Node.js**: https://nodejs.org/ (LTS version)
2. **Install MongoDB**: https://www.mongodb.com/try/download/community
3. **Install VS Code**: https://code.visualstudio.com/

## 🔧 VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Prettier - Code formatter**
3. **Auto Rename Tag**
4. **Bracket Pair Colorizer**
5. **MongoDB for VS Code**
6. **Thunder Client** (for API testing)

## 🏗️ Project Setup in VS Code

### Step 1: Open Project
```bash
# Open VS Code in project directory
code .
```

### Step 2: Install Dependencies
Open VS Code Terminal (`Ctrl + ` `) and run:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

Or use VS Code Command Palette (`Ctrl+Shift+P`):
- Type: `Tasks: Run Task`
- Select: `Install Dependencies`

### Step 3: Setup Database
```bash
# Create database with sample data
npm run seed
```

### Step 4: Start Development Servers

**Option A: Using VS Code Tasks**
1. Press `Ctrl+Shift+P`
2. Type: `Tasks: Run Task`
3. Select: `Start Backend Server`
4. Open new terminal and select: `Start Frontend Client`

**Option B: Using Terminal Commands**
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client
```

**Option C: Start Both Together**
```bash
npm run dev
```

## 🎯 Quick Commands

### Database Operations
```bash
# Recreate database with fresh data
npm run seed

# View database statistics
npm run db-stats

# List all menu items
npm run list-menu

# Create demo table
npm run create-demo
```

### Development
```bash
# Start backend only
npm run server

# Start frontend only
npm run client

# Start both servers
npm run dev
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Demo Menu**: http://localhost:3000/m/demo-table
- **Database Viewer**: http://localhost:3000/database (admin only)

## 👤 Login Credentials

- **Admin**: admin@virujash.com / admin123
- **Staff**: kitchen@virujash.com / staff123

## 🐛 Debugging in VS Code

### Debug Backend Server
1. Press `F5` or go to Run and Debug (`Ctrl+Shift+D`)
2. Select: `Start Backend Server`
3. Set breakpoints in your code
4. Server will start in debug mode

### Debug Database Scripts
1. Press `F5`
2. Select: `Seed Database` or `Update Database`
3. Debug your database operations

## 📁 Project Structure

```
viru-jash-restaurant/
├── .vscode/                 # VS Code configuration
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── contexts/       # React contexts
│   └── package.json
├── server/                  # Express backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   ├── customSeedData.js   # Database seeding
│   ├── updateDatabase.js   # Database updates
│   └── index.js           # Server entry point
├── package.json            # Root dependencies
└── .env                   # Environment variables
```

## 🔍 MongoDB Integration

### Using MongoDB for VS Code Extension
1. Install "MongoDB for VS Code" extension
2. Connect to: `mongodb://localhost:27017`
3. Browse `your-restaurant-name` database

### Using MongoDB Compass
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `your-restaurant-name` database

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### MongoDB Connection Issues
1. Make sure MongoDB service is running
2. Check connection string in `.env` file
3. Verify MongoDB is installed correctly

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules
npm run install-all
```

## 📝 Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in VS Code
3. **Test Changes**: Visit http://localhost:3000
4. **Update Database**: `npm run seed` (if needed)
5. **Debug Issues**: Use VS Code debugger (F5)

## 🎉 You're Ready!

Your Viru Jash Restaurant system is now fully configured for VS Code development!

Visit: http://localhost:3000/m/demo-table to see your beautiful vegetarian menu! 🌱