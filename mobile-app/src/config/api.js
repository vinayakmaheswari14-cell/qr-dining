// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api';

// For development with physical device, replace localhost with your computer's IP
// export const API_BASE_URL = 'http://192.168.1.100:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Menu
  MENU_CATEGORIES: '/menu/categories',
  MENU_ITEMS: '/menu/items',
  MENU_BY_CATEGORY: '/menu/category',
  
  // Tables
  TABLE_BY_SLUG: '/tables/slug',
  
  // Orders
  CREATE_ORDER: '/orders',
  ORDER_STATUS: '/orders',
  USER_ORDERS: '/orders/user',
  
  // Coupons
  VALIDATE_COUPON: '/coupons/validate',
  AVAILABLE_COUPONS: '/coupons',
};

// Helper function to create full API URL
export const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function for authenticated requests
export const createAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

// API request helper
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = createApiUrl(endpoint);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('API request error:', error);
    return { success: false, error: error.message };
  }
};