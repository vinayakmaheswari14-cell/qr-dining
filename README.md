# 🍽️ Viru Jash Restaurant - QR Menu System

A modern, pure vegetarian restaurant QR menu system built with the MERN stack.

## 🚀 Quick Start in VS Code

### Option 1: Automatic Setup
```bash
npm run setup
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
npm install
cd client && npm install && cd ..

# 2. Setup database
npm run seed

# 3. Start development servers
npm run dev
```

### Option 3: Windows Batch File
Double-click `start.bat` file

## 🌐 Access Your Restaurant

- **Demo Menu**: http://localhost:3000/m/demo-table
- **Admin Panel**: http://localhost:3000 (login required)
- **Database Viewer**: http://localhost:3000/database (admin only)

## 👤 Login Credentials

- **Admin**: admin@virujash.com / admin123
- **Staff**: kitchen@virujash.com / staff123

## 📋 Available Commands

### Development
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only

### Database
- `npm run seed` - Create fresh database with sample data
- `npm run db-stats` - View database statistics
- `npm run list-menu` - List all menu items with prices

### VS Code Tasks
Press `Ctrl+Shift+P` and type "Tasks: Run Task" to access:
- Install Dependencies
- Start Backend Server
- Start Frontend Client
- Seed Database
- View Database Stats

## 🍽️ Menu Features

- **96 Pure Vegetarian Items** across 6 categories
- **Indian Specialties**: Paneer dishes, Dal varieties, Biryanis
- **International**: Pizzas, Pastas, Continental items
- **Beverages**: Traditional and modern drinks
- **Desserts**: Indian sweets and international desserts

## 🛠️ Tech Stack

- **Frontend**: React, Material-UI, Axios
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with role-based access

## 📱 Features

- QR code scanning for table-specific menus
- Real-time order management
- Role-based access (Customer, Staff, Admin)
- Beautiful responsive design
- Cart management with order tracking
- Admin panel for menu management

## 🔧 VS Code Configuration

This project includes:
- Debug configurations for backend
- Task definitions for common operations
- Recommended extensions list
- Integrated terminal settings

## 📁 Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── .vscode/         # VS Code configuration
├── scripts/         # Setup and utility scripts
└── README.md        # This file
```

## 🐛 Debugging

1. Press `F5` in VS Code
2. Select "Start Backend Server"
3. Set breakpoints in your code
4. Debug your application

## 📞 Support

For issues or questions, check the `VSCODE_SETUP.md` file for detailed setup instructions.

---

**Enjoy your pure vegetarian dining experience! 🌱**