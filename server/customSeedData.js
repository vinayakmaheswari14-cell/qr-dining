const mongoose = require('mongoose');
const User = require('./models/User');
const MenuCategory = require('./models/MenuCategory');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');
require('dotenv').config();

// CUSTOMIZE YOUR RESTAURANT DATA HERE
const RESTAURANT_CONFIG = {
  name: "Viru Jash Restaurant",
  
  // Admin and Staff Users
  users: [
    {
      name: 'Viru Jash Admin',
      email: 'admin@virujash.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      name: 'Kitchen Staff',
      email: 'kitchen@virujash.com',
      password: 'staff123',
      role: 'staff'
    }
  ],

  // Menu Categories
  categories: [
    { name: 'Starters', displayOrder: 1 },
    { name: 'Soups & Salads', displayOrder: 2 },
    { name: 'Main Courses', displayOrder: 3 },
    { name: 'Pasta & Pizza', displayOrder: 4 },
    { name: 'Desserts', displayOrder: 5 },
    { name: 'Beverages', displayOrder: 6 }
  ],

  // Menu Items - VIRU JASH RESTAURANT - PURE VEGETARIAN (Prices in Indian Rupees)
  menuItems: [
    // Starters (15+ items)
    {
      name: 'Paneer Tikka',
      description: 'Marinated cottage cheese cubes grilled to perfection with spices',
      price: 280,
      category: 'Starters',
      tags: ['vegetarian', 'indian', 'grilled'],
      imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop'
    },
    {
      name: 'Samosa (2 pcs)',
      description: 'Crispy pastry filled with spiced potatoes and peas',
      price: 80,
      category: 'Starters',
      tags: ['vegetarian', 'fried', 'indian'],
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    },
    {
      name: 'Aloo Tikki Chat',
      description: 'Spiced potato patties topped with chutneys and yogurt',
      price: 150,
      category: 'Starters',
      tags: ['vegetarian', 'street-food', 'chat'],
      imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop'
    },
    {
      name: 'Tandoori Mushroom',
      description: 'Button mushrooms marinated in tandoori spices and grilled',
      price: 260,
      category: 'Starters',
      tags: ['vegetarian', 'mushroom', 'tandoori'],
      imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer 65',
      description: 'Spicy fried cottage cheese cubes with South Indian flavors',
      price: 300,
      category: 'Starters',
      tags: ['vegetarian', 'paneer', 'spicy'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Hara Bhara Kebab',
      description: 'Green vegetable patties made with spinach and green peas',
      price: 240,
      category: 'Starters',
      tags: ['vegetarian', 'healthy', 'green'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Dahi Kebab',
      description: 'Soft yogurt-based kebabs with mild spices and herbs',
      price: 220,
      category: 'Starters',
      tags: ['vegetarian', 'yogurt', 'soft'],
      imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Spring Rolls',
      description: 'Crispy rolls filled with fresh vegetables and served with sauce',
      price: 200,
      category: 'Starters',
      tags: ['vegetarian', 'crispy', 'chinese'],
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'
    },
    {
      name: 'Stuffed Mushrooms',
      description: 'Button mushrooms stuffed with cheese and herbs',
      price: 280,
      category: 'Starters',
      tags: ['vegetarian', 'stuffed', 'cheese'],
      imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop'
    },
    {
      name: 'Corn Cheese Balls',
      description: 'Crispy fried balls made with sweet corn and cheese',
      price: 250,
      category: 'Starters',
      tags: ['vegetarian', 'corn', 'cheese'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Cutlet',
      description: 'Spiced mixed vegetable patties coated with breadcrumbs',
      price: 180,
      category: 'Starters',
      tags: ['vegetarian', 'mixed-veg', 'crispy'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer Pakora',
      description: 'Cottage cheese fritters in spiced gram flour batter',
      price: 260,
      category: 'Starters',
      tags: ['vegetarian', 'paneer', 'fried'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Momos',
      description: 'Steamed dumplings filled with spiced vegetables',
      price: 200,
      category: 'Starters',
      tags: ['vegetarian', 'steamed', 'tibetan'],
      imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop'
    },
    {
      name: 'Cheese Garlic Bread',
      description: 'Toasted bread with garlic butter and melted cheese',
      price: 220,
      category: 'Starters',
      tags: ['vegetarian', 'bread', 'cheese'],
      imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Manchurian',
      description: 'Deep-fried vegetable balls in tangy Indo-Chinese sauce',
      price: 240,
      category: 'Starters',
      tags: ['vegetarian', 'indo-chinese', 'tangy'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    
    // Soups & Salads (15+ items)
    {
      name: 'Tomato Shorba',
      description: 'Traditional Indian tomato soup with aromatic spices',
      price: 180,
      category: 'Soups & Salads',
      tags: ['soup', 'vegetarian', 'indian'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
      name: 'Green Salad',
      description: 'Fresh mixed greens with cucumber, tomato and mint chutney',
      price: 160,
      category: 'Soups & Salads',
      tags: ['salad', 'vegetarian', 'healthy'],
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop'
    },
    {
      name: 'Sweet Corn Soup',
      description: 'Creamy sweet corn soup with vegetables',
      price: 160,
      category: 'Soups & Salads',
      tags: ['soup', 'vegetarian', 'sweet'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Hot & Sour Soup',
      description: 'Spicy and tangy soup with vegetables and tofu',
      price: 180,
      category: 'Soups & Salads',
      tags: ['soup', 'spicy', 'tangy'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
      name: 'Manchow Soup',
      description: 'Indo-Chinese soup with vegetables and crispy noodles',
      price: 200,
      category: 'Soups & Salads',
      tags: ['soup', 'indo-chinese', 'crispy'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and caesar dressing',
      price: 280,
      category: 'Soups & Salads',
      tags: ['salad', 'western', 'cheese'],
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop'
    },
    {
      name: 'Russian Salad',
      description: 'Mixed vegetables with mayonnaise and herbs',
      price: 220,
      category: 'Soups & Salads',
      tags: ['salad', 'creamy', 'vegetables'],
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
    },
    {
      name: 'Fruit Salad',
      description: 'Fresh seasonal fruits with honey and mint',
      price: 180,
      category: 'Soups & Salads',
      tags: ['salad', 'fruits', 'healthy'],
      imageUrl: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400&h=300&fit=crop'
    },
    {
      name: 'Lemon Coriander Soup',
      description: 'Tangy soup with fresh coriander and lemon',
      price: 160,
      category: 'Soups & Salads',
      tags: ['soup', 'tangy', 'fresh'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer Salad',
      description: 'Cottage cheese cubes with fresh vegetables and mint',
      price: 260,
      category: 'Soups & Salads',
      tags: ['salad', 'paneer', 'vegetarian'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Mushroom Soup',
      description: 'Creamy mushroom soup with herbs and spices',
      price: 200,
      category: 'Soups & Salads',
      tags: ['soup', 'mushroom', 'creamy'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
      name: 'Sprouts Salad',
      description: 'Healthy mixed sprouts with onions and lemon',
      price: 140,
      category: 'Soups & Salads',
      tags: ['salad', 'healthy', 'sprouts'],
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Clear Soup',
      description: 'Light and healthy clear soup with mixed vegetables',
      price: 140,
      category: 'Soups & Salads',
      tags: ['soup', 'healthy', 'light'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },
    {
      name: 'Greek Salad',
      description: 'Mediterranean salad with olives, feta cheese and herbs',
      price: 300,
      category: 'Soups & Salads',
      tags: ['salad', 'mediterranean', 'cheese'],
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
    },
    {
      name: 'Minestrone Soup',
      description: 'Italian vegetable soup with pasta and herbs',
      price: 220,
      category: 'Soups & Salads',
      tags: ['soup', 'italian', 'pasta'],
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
    },

    // Main Courses (20+ items) - Pure Vegetarian
    {
      name: 'Paneer Butter Masala',
      description: 'Rich and creamy cottage cheese curry in tomato gravy',
      price: 380,
      category: 'Main Courses',
      tags: ['vegetarian', 'paneer', 'creamy'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Dal Makhani',
      description: 'Slow-cooked black lentils in rich creamy gravy',
      price: 280,
      category: 'Main Courses',
      tags: ['vegetarian', 'dal', 'creamy'],
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
    },
    {
      name: 'Palak Paneer',
      description: 'Cottage cheese cubes in creamy spinach gravy',
      price: 350,
      category: 'Main Courses',
      tags: ['vegetarian', 'spinach', 'healthy'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Kadai Paneer',
      description: 'Cottage cheese cooked with bell peppers in spicy gravy',
      price: 360,
      category: 'Main Courses',
      tags: ['vegetarian', 'paneer', 'spicy'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Chole Bhature',
      description: 'Spicy chickpea curry served with fluffy fried bread',
      price: 280,
      category: 'Main Courses',
      tags: ['vegetarian', 'punjabi', 'spicy'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Rajma Rice',
      description: 'Red kidney beans curry served with steamed rice',
      price: 260,
      category: 'Main Courses',
      tags: ['vegetarian', 'beans', 'comfort'],
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
    },
    {
      name: 'Aloo Gobi',
      description: 'Dry curry of potatoes and cauliflower with spices',
      price: 240,
      category: 'Main Courses',
      tags: ['vegetarian', 'dry', 'homestyle'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Biryani',
      description: 'Fragrant basmati rice cooked with mixed vegetables and saffron',
      price: 320,
      category: 'Main Courses',
      tags: ['vegetarian', 'rice', 'biryani'],
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop'
    },
    {
      name: 'Bhindi Masala',
      description: 'Okra cooked with onions, tomatoes and spices',
      price: 220,
      category: 'Main Courses',
      tags: ['vegetarian', 'okra', 'dry'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer Tikka Masala',
      description: 'Grilled paneer cubes in rich tomato and cream gravy',
      price: 390,
      category: 'Main Courses',
      tags: ['vegetarian', 'paneer', 'rich'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Mixed Vegetable Curry',
      description: 'Seasonal vegetables cooked in aromatic spices and gravy',
      price: 280,
      category: 'Main Courses',
      tags: ['vegetarian', 'mixed-veg', 'seasonal'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Malai Kofta',
      description: 'Deep-fried vegetable balls in rich creamy gravy',
      price: 360,
      category: 'Main Courses',
      tags: ['vegetarian', 'creamy', 'rich'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer Makhani',
      description: 'Cottage cheese in buttery tomato and cream sauce',
      price: 380,
      category: 'Main Courses',
      tags: ['vegetarian', 'paneer', 'buttery'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Baingan Bharta',
      description: 'Roasted eggplant mashed and cooked with spices',
      price: 260,
      category: 'Main Courses',
      tags: ['vegetarian', 'eggplant', 'roasted'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Mushroom Masala',
      description: 'Button mushrooms cooked in spicy onion-tomato gravy',
      price: 320,
      category: 'Main Courses',
      tags: ['vegetarian', 'mushroom', 'spicy'],
      imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer Korma',
      description: 'Cottage cheese in mild cashew and yogurt gravy',
      price: 370,
      category: 'Main Courses',
      tags: ['vegetarian', 'paneer', 'mild'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Jalfrezi',
      description: 'Stir-fried mixed vegetables with bell peppers and onions',
      price: 300,
      category: 'Main Courses',
      tags: ['vegetarian', 'stir-fried', 'colorful'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Stuffed Capsicum',
      description: 'Bell peppers stuffed with spiced potato and paneer filling',
      price: 340,
      category: 'Main Courses',
      tags: ['vegetarian', 'stuffed', 'capsicum'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },
    {
      name: 'Paneer Lababdar',
      description: 'Cottage cheese in rich onion and tomato gravy with cream',
      price: 390,
      category: 'Main Courses',
      tags: ['vegetarian', 'paneer', 'rich'],
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Kofta Curry',
      description: 'Mixed vegetable balls in spiced curry gravy',
      price: 320,
      category: 'Main Courses',
      tags: ['vegetarian', 'kofta', 'curry'],
      imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
    },

    // Pasta & Pizza (15+ items) - Pure Vegetarian
    {
      name: 'Paneer Tikka Pizza',
      description: 'Vegetarian pizza with paneer tikka and Indian spices',
      price: 380,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'vegetarian', 'paneer'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce and basil',
      price: 320,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'vegetarian', 'classic'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetarian Supreme Pizza',
      description: 'Loaded with bell peppers, mushrooms, onions and olives',
      price: 400,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'vegetarian', 'loaded'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Penne Arrabbiata',
      description: 'Spicy tomato sauce pasta with herbs and garlic',
      price: 320,
      category: 'Pasta & Pizza',
      tags: ['pasta', 'spicy', 'tomato'],
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
    },
    {
      name: 'Mushroom Pizza',
      description: 'Pizza topped with fresh mushrooms and cheese',
      price: 360,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'mushroom', 'vegetarian'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Pesto Pasta',
      description: 'Pasta tossed in fresh basil pesto sauce',
      price: 340,
      category: 'Pasta & Pizza',
      tags: ['pasta', 'pesto', 'basil'],
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
    },
    {
      name: 'Four Cheese Pizza',
      description: 'Pizza with mozzarella, cheddar, parmesan and blue cheese',
      price: 480,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'cheese', 'rich'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Vegetable Lasagna',
      description: 'Layered pasta with vegetables, cheese and white sauce',
      price: 420,
      category: 'Pasta & Pizza',
      tags: ['pasta', 'layered', 'baked'],
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
    },
    {
      name: 'Spinach Corn Pizza',
      description: 'Pizza with spinach, sweet corn and mozzarella cheese',
      price: 360,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'spinach', 'corn'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Alfredo Pasta',
      description: 'Creamy white sauce pasta with herbs and parmesan',
      price: 340,
      category: 'Pasta & Pizza',
      tags: ['pasta', 'creamy', 'white-sauce'],
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
    },
    {
      name: 'Veggie Delight Pizza',
      description: 'Pizza with capsicum, tomatoes, onions and cheese',
      price: 380,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'vegetables', 'colorful'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Mac and Cheese',
      description: 'Classic macaroni pasta in rich cheese sauce',
      price: 300,
      category: 'Pasta & Pizza',
      tags: ['pasta', 'cheese', 'comfort'],
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
    },
    {
      name: 'Farmhouse Pizza',
      description: 'Pizza with fresh vegetables and herbs from the farm',
      price: 390,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'fresh', 'vegetables'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },
    {
      name: 'Spaghetti Aglio Olio',
      description: 'Simple pasta with garlic, olive oil and red pepper flakes',
      price: 280,
      category: 'Pasta & Pizza',
      tags: ['pasta', 'simple', 'garlic'],
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
    },
    {
      name: 'Cheese Burst Pizza',
      description: 'Pizza with cheese-filled crust and vegetable toppings',
      price: 450,
      category: 'Pasta & Pizza',
      tags: ['pizza', 'cheese-burst', 'special'],
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
    },

    // Desserts (15+ items)
    {
      name: 'Gulab Jamun (2 pcs)',
      description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
      price: 120,
      category: 'Desserts',
      tags: ['indian', 'sweet', 'traditional'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Ras Malai (2 pcs)',
      description: 'Soft cottage cheese dumplings in sweetened milk',
      price: 150,
      category: 'Desserts',
      tags: ['indian', 'milk', 'sweet'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Kulfi',
      description: 'Traditional Indian ice cream with cardamom and pistachios',
      price: 100,
      category: 'Desserts',
      tags: ['indian', 'ice-cream', 'traditional'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Chocolate Brownie',
      description: 'Warm chocolate brownie with vanilla ice cream',
      price: 180,
      category: 'Desserts',
      tags: ['chocolate', 'brownie', 'western'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Jalebi',
      description: 'Crispy spiral-shaped sweet soaked in sugar syrup',
      price: 80,
      category: 'Desserts',
      tags: ['indian', 'crispy', 'sweet'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone',
      price: 220,
      category: 'Desserts',
      tags: ['italian', 'coffee', 'creamy'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Kheer',
      description: 'Traditional rice pudding with milk, cardamom and nuts',
      price: 120,
      category: 'Desserts',
      tags: ['indian', 'rice', 'pudding'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and ice cream',
      price: 200,
      category: 'Desserts',
      tags: ['chocolate', 'warm', 'molten'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Rabri',
      description: 'Thick sweetened milk dessert with nuts and cardamom',
      price: 140,
      category: 'Desserts',
      tags: ['indian', 'milk', 'thick'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Ice Cream Sundae',
      description: 'Vanilla ice cream with chocolate sauce and nuts',
      price: 160,
      category: 'Desserts',
      tags: ['ice-cream', 'chocolate', 'nuts'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Gajar Halwa',
      description: 'Traditional carrot dessert cooked in milk and ghee',
      price: 130,
      category: 'Desserts',
      tags: ['indian', 'carrot', 'traditional'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Cheesecake',
      description: 'Creamy cheesecake with berry compote',
      price: 240,
      category: 'Desserts',
      tags: ['western', 'creamy', 'berry'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Malai Kulfi',
      description: 'Rich cream-based kulfi with pistachios and almonds',
      price: 120,
      category: 'Desserts',
      tags: ['indian', 'cream', 'nuts'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },
    {
      name: 'Fruit Custard',
      description: 'Creamy custard with fresh seasonal fruits',
      price: 140,
      category: 'Desserts',
      tags: ['custard', 'fruits', 'creamy'],
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      name: 'Shrikhand',
      description: 'Sweetened yogurt dessert with cardamom and saffron',
      price: 110,
      category: 'Desserts',
      tags: ['indian', 'yogurt', 'saffron'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    },

    // Beverages (15+ items)
    {
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea',
      price: 40,
      category: 'Beverages',
      tags: ['tea', 'indian', 'hot'],
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    },
    {
      name: 'Lassi (Sweet/Salt)',
      description: 'Traditional yogurt-based drink, sweet or salted',
      price: 80,
      category: 'Beverages',
      tags: ['yogurt', 'traditional', 'cold'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Fresh Lime Soda',
      description: 'Refreshing lime juice with soda and mint',
      price: 60,
      category: 'Beverages',
      tags: ['lime', 'refreshing', 'cold'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Mango Shake',
      description: 'Thick mango milkshake with fresh mango pulp',
      price: 120,
      category: 'Beverages',
      tags: ['mango', 'milkshake', 'cold'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Filter Coffee',
      description: 'South Indian style filter coffee',
      price: 50,
      category: 'Beverages',
      tags: ['coffee', 'south-indian', 'hot'],
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    },
    {
      name: 'Thandai',
      description: 'Traditional Indian drink with milk, nuts and spices',
      price: 100,
      category: 'Beverages',
      tags: ['traditional', 'milk', 'festive'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice',
      price: 90,
      category: 'Beverages',
      tags: ['orange', 'fresh', 'vitamin-c'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Coconut Water',
      description: 'Fresh tender coconut water',
      price: 70,
      category: 'Beverages',
      tags: ['coconut', 'natural', 'healthy'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Banana Shake',
      description: 'Creamy banana milkshake with honey',
      price: 100,
      category: 'Beverages',
      tags: ['banana', 'milkshake', 'honey'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Iced Tea',
      description: 'Refreshing iced tea with lemon and mint',
      price: 80,
      category: 'Beverages',
      tags: ['tea', 'iced', 'refreshing'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Buttermilk',
      description: 'Spiced yogurt drink with cumin and coriander',
      price: 60,
      category: 'Beverages',
      tags: ['yogurt', 'spiced', 'digestive'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Green Tea',
      description: 'Healthy green tea with antioxidants',
      price: 60,
      category: 'Beverages',
      tags: ['tea', 'healthy', 'antioxidants'],
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    },
    {
      name: 'Watermelon Juice',
      description: 'Fresh watermelon juice with mint',
      price: 80,
      category: 'Beverages',
      tags: ['watermelon', 'fresh', 'summer'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Hot Chocolate',
      description: 'Rich hot chocolate with whipped cream',
      price: 120,
      category: 'Beverages',
      tags: ['chocolate', 'hot', 'creamy'],
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    },
    {
      name: 'Lemonade',
      description: 'Classic lemonade with fresh lemons and sugar',
      price: 70,
      category: 'Beverages',
      tags: ['lemon', 'classic', 'refreshing'],
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
    },
    {
      name: 'Espresso',
      description: 'Strong Italian coffee shot',
      price: 80,
      category: 'Beverages',
      tags: ['coffee', 'strong', 'italian'],
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    }
  ],

  // Tables - CUSTOMIZE FOR YOUR RESTAURANT LAYOUT
  tables: [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 },
    { number: 10 }
  ]
};

const generateSlug = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

const seedCustomData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await MenuCategory.deleteMany({});
    await MenuItem.deleteMany({});
    await Table.deleteMany({});

    console.log('Creating users...');
    for (const userData of RESTAURANT_CONFIG.users) {
      const user = new User({
        name: userData.name,
        email: userData.email,
        passwordHash: userData.password,
        role: userData.role
      });
      await user.save();
      console.log(`Created user: ${userData.email}`);
    }

    console.log('Creating categories...');
    const categoryMap = {};
    for (const categoryData of RESTAURANT_CONFIG.categories) {
      const category = new MenuCategory({
        name: categoryData.name,
        displayOrder: categoryData.displayOrder,
        active: true
      });
      await category.save();
      categoryMap[categoryData.name] = category._id;
      console.log(`Created category: ${categoryData.name}`);
    }

    console.log('Creating menu items...');
    for (const itemData of RESTAURANT_CONFIG.menuItems) {
      const item = new MenuItem({
        name: itemData.name,
        description: itemData.description,
        price: itemData.price,
        categoryId: categoryMap[itemData.category],
        availability: true,
        tags: itemData.tags || [],
        imageUrl: itemData.imageUrl || ''
      });
      await item.save();
      console.log(`Created menu item: ${itemData.name}`);
    }

    console.log('Creating tables...');
    for (const tableData of RESTAURANT_CONFIG.tables) {
      const table = new Table({
        number: tableData.number,
        qrSlug: `table-${tableData.number}-${generateSlug()}`
      });
      await table.save();
      console.log(`Created table: ${tableData.number}`);
    }

    console.log('\n🎉 Custom restaurant data created successfully!');
    console.log('\n📧 Login Credentials:');
    RESTAURANT_CONFIG.users.forEach(user => {
      console.log(`${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
    });
    
    console.log('\n🏪 Restaurant Setup Complete!');
    console.log(`Database: ${process.env.MONGODB_URI}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding custom data:', error);
    process.exit(1);
  }
};

seedCustomData();