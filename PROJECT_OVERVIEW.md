# 🍽️ Viru Jash Restaurant - Complete System Overview

A comprehensive QR-based restaurant ordering system with web application and mobile app.

## 📋 Project Structure

```
project1/
├── 🌐 WEB APPLICATION (React + Node.js)
│   ├── client/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/     # Reusable components
│   │   │   ├── contexts/       # React contexts
│   │   │   ├── pages/          # Page components
│   │   │   └── App.js          # Main app
│   │   └── package.json
│   ├── server/                 # Node.js backend
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # MongoDB models
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Utilities (email service)
│   │   ├── index.js            # Server entry
│   │   └── seedDatabase.js     # Database seeding
│   └── package.json            # Root dependencies
│
├── 📱 MOBILE APPLICATION (React Native + Expo)
│   ├── mobile-app/
│   │   ├── src/
│   │   │   ├── contexts/       # State management
│   │   │   ├── screens/        # Mobile screens
│   │   │   └── config/         # API configuration
│   │   ├── App.js              # Main mobile component
│   │   ├── app.json            # Expo configuration
│   │   └── package.json        # Mobile dependencies
│
├── 📚 DOCUMENTATION
│   ├── README.md               # Main project documentation
│   ├── EMAIL_SETUP.md          # Email configuration guide
│   ├── GMAIL_SETUP_GUIDE.md    # Gmail setup instructions
│   ├── QUICK_EMAIL_SETUP.md    # Quick email setup
│   ├── MOBILE_APP_SETUP.md     # Mobile app setup guide
│   └── PROJECT_OVERVIEW.md     # This file
│
└── 🛠️ CONFIGURATION
    ├── .env                    # Environment variables
    ├── .gitignore             # Git ignore rules
    └── scripts/               # Setup and utility scripts
```

## 🎯 System Components

### 🌐 Web Application
**Frontend (React)**
- Modern responsive design with Material-UI
- QR code menu access via table URLs
- Interactive shopping cart with coupon system
- User authentication and profile management
- Admin dashboard for menu and order management
- Staff dashboard for order processing
- Real-time order status tracking

**Backend (Node.js + Express)**
- RESTful API with JWT authentication
- MongoDB database with Mongoose ODM
- Email service with nodemailer
- Password reset functionality
- Coupon validation system
- Order management with status tracking
- Role-based access control (Admin, Staff, Customer)

### 📱 Mobile Application
**React Native + Expo**
- Cross-platform mobile app (iOS & Android)
- QR code scanning with camera integration
- Native mobile UI with smooth navigation
- Offline cart persistence with AsyncStorage
- Push notification ready architecture
- Optimized for mobile ordering experience

## 🚀 Key Features

### For Customers
- **QR Menu Access** - Scan table QR codes to view menu
- **Interactive Browsing** - Search, filter, and browse menu items
- **Smart Cart** - Add items, modify quantities, apply coupons
- **Secure Ordering** - User accounts with order history
- **Real-time Tracking** - Live order status updates
- **Email Notifications** - Order confirmations and updates
- **Mobile App** - Native mobile experience

### For Staff
- **Order Management** - View and update order status
- **Kitchen Dashboard** - Track preparation progress
- **Real-time Updates** - Live order notifications
- **Status Control** - Update orders from pending to delivered

### For Admin
- **Complete Control** - Full system management
- **Menu Management** - Add/edit items, categories, pricing
- **User Management** - Manage staff and customer accounts
- **Table Management** - Generate QR codes for tables
- **Coupon System** - Create and manage discount codes
- **Analytics Dashboard** - View restaurant performance
- **Database Viewer** - Debug and inspect data

## 🛠️ Technology Stack

### Frontend Technologies
- **React** - User interface library
- **Material-UI** - Component library and design system
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email sending service

### Mobile Technologies
- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **React Navigation** - Mobile navigation
- **AsyncStorage** - Local data persistence
- **Expo Camera** - QR code scanning
- **Context API** - Mobile state management

## 📊 Database Schema

### Collections
- **Users** - Customer, staff, and admin accounts
- **MenuCategories** - Menu organization (Starters, Mains, etc.)
- **MenuItems** - Individual food items with pricing
- **Tables** - Restaurant tables with QR slugs
- **Orders** - Customer orders with items and status
- **Coupons** - Discount codes and validation rules

### Key Relationships
- Orders → Users (customer who placed order)
- Orders → Tables (table where order was placed)
- Orders → MenuItems (items in the order)
- MenuItems → MenuCategories (categorization)
- Orders → Coupons (applied discounts)

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens** - Secure session management
- **Password Hashing** - bcrypt encryption
- **Role-based Access** - Admin, Staff, Customer permissions
- **Protected Routes** - Authentication required endpoints
- **Token Expiry** - Automatic session timeout

### Data Security
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Mongoose ODM protection
- **CORS Configuration** - Cross-origin request security
- **Environment Variables** - Sensitive data protection
- **Password Reset** - Secure 6-digit verification codes

## 📧 Email System

### Features
- **Professional Templates** - HTML emails with branding
- **Password Reset** - 6-digit verification codes
- **Welcome Emails** - New user onboarding
- **Order Confirmations** - Automatic order notifications
- **Multiple Providers** - Gmail, SendGrid, AWS SES support

### Configuration
- Easy setup with Gmail for development
- Production-ready with professional email services
- Fallback to console logging for development
- Comprehensive setup guides provided

## 🎟️ Coupon System

### Coupon Types
- **Percentage Discounts** - % off with optional maximum
- **Fixed Amount** - Flat discount in currency
- **Minimum Order** - Order value requirements
- **Usage Limits** - Maximum number of uses
- **Expiry Dates** - Time-based validity

### Sample Coupons
- **WELCOME10** - 10% off (min ₹200)
- **SAVE20** - 20% off (min ₹500)
- **BIGSAVE30** - 30% off (min ₹800)
- **MEGA50** - 50% off (min ₹1000)
- **FLAT100** - ₹100 off (min ₹300)
- **FREEMEAL** - 100% off (special occasions)

## 🚀 Deployment Options

### Development
- **Local Development** - localhost with hot reload
- **Database** - Local MongoDB or MongoDB Atlas
- **Email** - Gmail with app passwords
- **Mobile** - Expo Go for testing

### Production
- **Web Hosting** - Heroku, Vercel, AWS, DigitalOcean
- **Database** - MongoDB Atlas (cloud)
- **Email Service** - SendGrid, AWS SES, Mailgun
- **Mobile** - App Store, Google Play Store
- **CDN** - Cloudflare for static assets

## 📱 Mobile App Features

### Core Functionality
- **QR Code Scanning** - Camera-based table detection
- **Menu Browsing** - Native mobile interface
- **Cart Management** - Persistent offline storage
- **User Authentication** - Secure login/registration
- **Order Tracking** - Real-time status updates
- **Profile Management** - Account and order history

### Technical Features
- **Cross-platform** - Single codebase for iOS/Android
- **Offline Support** - Cart persists without internet
- **Push Notifications** - Ready for order updates
- **Native Performance** - Smooth mobile experience
- **Camera Integration** - QR scanning capability

## 🎯 Getting Started

### Quick Setup
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd project1
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Start Development**
   ```bash
   npm run dev
   ```

6. **Setup Mobile App**
   ```bash
   cd mobile-app
   npm install
   npm start
   ```

### Access Points
- **Web App**: http://localhost:3000
- **API**: http://localhost:5000
- **Demo Menu**: http://localhost:3000/m/demo-table
- **Admin Panel**: http://localhost:3000/admin
- **Mobile App**: Scan QR code with Expo Go

## 🎉 Success Metrics

### For Restaurant
- **Reduced Wait Times** - Faster ordering process
- **Increased Efficiency** - Digital order management
- **Better Customer Experience** - Modern ordering system
- **Cost Savings** - Reduced staff requirements
- **Data Insights** - Order analytics and trends

### For Customers
- **Convenience** - Order from phone at table
- **Speed** - No waiting for staff to take orders
- **Accuracy** - Digital orders reduce mistakes
- **Transparency** - Real-time order tracking
- **Savings** - Easy coupon application

## 📞 Support & Documentation

### Available Guides
- **README.md** - Main project documentation
- **EMAIL_SETUP.md** - Email configuration
- **GMAIL_SETUP_GUIDE.md** - Gmail setup steps
- **MOBILE_APP_SETUP.md** - Mobile app setup
- **API Documentation** - Endpoint reference

### Contact Information
- **Email**: info@virujashrestaurant.com
- **Phone**: +91 98765 43210
- **Support**: Available for setup and customization

---

**🍽️ Viru Jash Restaurant - Complete Digital Dining Solution**
*From QR codes to mobile apps, we've got your restaurant covered!*