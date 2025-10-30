const mongoose = require('mongoose');
const User = require('./models/User');
const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scan-dine-lite');

        // Clear existing data
        await User.deleteMany({});
        await MenuCategory.deleteMany({});
        await MenuItem.deleteMany({});
        await Table.deleteMany({});

        console.log('Cleared existing data...');

        // Create admin user
        const admin = new User({
            name: 'Admin User',
            email: 'admin@restaurant.com',
            passwordHash: 'admin123',
            role: 'admin'
        });
        await admin.save();

        // Create staff user
        const staff = new User({
            name: 'Staff Member',
            email: 'staff@restaurant.com',
            passwordHash: 'staff123',
            role: 'staff'
        });
        await staff.save();

        console.log('Created users...');

        // Create categories
        const starters = new MenuCategory({
            name: 'Starters',
            displayOrder: 1,
            active: true
        });
        await starters.save();

        const mains = new MenuCategory({
            name: 'Main Courses',
            displayOrder: 2,
            active: true
        });
        await mains.save();

        const beverages = new MenuCategory({
            name: 'Beverages',
            displayOrder: 3,
            active: true
        });
        await beverages.save();

        const desserts = new MenuCategory({
            name: 'Desserts',
            displayOrder: 4,
            active: true
        });
        await desserts.save();

        console.log('Created categories...');

        // Create menu items with proper images
        const menuItems = [
            // Starters
            {
                name: 'Paneer Tikka',
                description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions',
                price: 280,
                categoryId: starters._id,
                availability: true,
                tags: ['vegetarian', 'grilled', 'spicy'],
                imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center'
            },
            {
                name: 'Vegetable Spring Rolls',
                description: 'Crispy golden rolls filled with fresh vegetables and served with sweet chili sauce',
                price: 220,
                categoryId: starters._id,
                availability: true,
                tags: ['vegetarian', 'crispy', 'chinese'],
                imageUrl: 'https://i.pinimg.com/736x/74/55/86/7455861056a201b44b68a5ef65e36583.jpg'
            },

            // Main Courses
            {
                name: 'Dal Makhani',
                description: 'Rich and creamy black lentils slow-cooked with butter and aromatic spices',
                price: 320,
                categoryId: mains._id,
                availability: true,
                tags: ['vegetarian', 'creamy', 'traditional'],
                imageUrl: 'https://i.pinimg.com/736x/55/a6/8f/55a68f4dbf1032184f1e129ea0ca4494.jpg'
            },
            {
                name: 'Palak Paneer',
                description: 'Fresh cottage cheese cubes in a rich spinach gravy with Indian spices',
                price: 300,
                categoryId: mains._id,
                availability: true,
                tags: ['vegetarian', 'healthy', 'spinach'],
                imageUrl: 'https://i.pinimg.com/736x/de/4d/21/de4d215b325b6c233830846f35a2d3ba.jpg'
            },
            {
                name: 'Vegetable Biryani',
                description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices',
                price: 350,
                categoryId: mains._id,
                availability: true,
                tags: ['vegetarian', 'rice', 'aromatic'],
                imageUrl: 'https://i.pinimg.com/1200x/72/e1/0b/72e10b76ecbfb101cc2b5491f02ed8be.jpg'
            },
            {
                name: 'Chole Bhature',
                description: 'Spicy chickpea curry served with fluffy deep-fried bread',
                price: 280,
                categoryId: mains._id,
                availability: true,
                tags: ['vegetarian', 'spicy', 'punjabi'],
                imageUrl: 'https://i.pinimg.com/736x/d6/60/25/d660255e0ac13e20bc3c674ee3d11ac4.jpg'
            },

            // Beverages
            {
                name: 'Fresh Lime Soda',
                description: 'Refreshing lime juice with soda water and a hint of mint',
                price: 120,
                categoryId: beverages._id,
                availability: true,
                tags: ['refreshing', 'citrus', 'cold'],
                imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop&crop=center'
            },
            {
                name: 'Masala Chai',
                description: 'Traditional Indian spiced tea brewed with milk and aromatic spices',
                price: 80,
                categoryId: beverages._id,
                availability: true,
                tags: ['hot', 'spiced', 'traditional'],
                imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center'
            },

            // Desserts
            {
                name: 'Gulab Jamun',
                description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
                price: 150,
                categoryId: desserts._id,
                availability: true,
                tags: ['sweet', 'traditional', 'milk'],
                imageUrl: 'https://i.pinimg.com/736x/d7/57/aa/d757aaadf9cb57a72ee0143984c7338b.jpg'
            },
            {
                name: 'Kulfi',
                description: 'Traditional Indian ice cream with cardamom and pistachios',
                price: 120,
                categoryId: desserts._id,
                availability: true,
                tags: ['cold', 'creamy', 'traditional'],
                imageUrl: 'https://i.pinimg.com/1200x/8b/be/31/8bbe312b36c8a2a8d23cf63bc1c32d4b.jpg'

            }
        ];

        for (const item of menuItems) {
            const menuItem = new MenuItem(item);
            await menuItem.save();
        }

        console.log('Created menu items...');

        // Create demo table
        const demoTable = new Table({
            number: 1,
            qrSlug: 'demo-table'
        });
        await demoTable.save();

        // Create additional tables
        for (let i = 2; i <= 10; i++) {
            const table = new Table({
                number: i,
                qrSlug: `table-${i}`
            });
            await table.save();
        }

        console.log('Created tables...');

        console.log('✅ New seed data created successfully!');
        console.log('📊 Created:');
        console.log('   - 2 Users (admin, staff)');
        console.log('   - 4 Categories');
        console.log('   - 10 Menu Items with images');
        console.log('   - 10 Tables');
        console.log('');
        console.log('🔑 Login credentials:');
        console.log('   Admin: admin@restaurant.com / admin123');
        console.log('   Staff: staff@restaurant.com / staff123');
        console.log('');
        console.log('🍽️ Demo menu: http://localhost:3000/m/demo-table');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();