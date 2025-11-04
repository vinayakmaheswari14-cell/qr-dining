import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [tableSlug, setTableSlug] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStoredCart();
  }, []);

  const loadStoredCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cartItems');
      const storedTable = await AsyncStorage.getItem('tableSlug');
      const storedCoupon = await AsyncStorage.getItem('appliedCoupon');
      
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      if (storedTable) {
        setTableSlug(storedTable);
      }
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (error) {
      console.error('Error loading stored cart:', error);
    }
  };

  const saveCartToStorage = async (items) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async (item, quantity = 1) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
    let newCartItems;

    if (existingItemIndex >= 0) {
      newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += quantity;
    } else {
      newCartItems = [...cartItems, { ...item, quantity }];
    }

    setCartItems(newCartItems);
    await saveCartToStorage(newCartItems);
  };

  const removeFromCart = async (itemId) => {
    const newCartItems = cartItems.filter(item => item._id !== itemId);
    setCartItems(newCartItems);
    await saveCartToStorage(newCartItems);
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const newCartItems = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity } : item
    );
    setCartItems(newCartItems);
    await saveCartToStorage(newCartItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    setAppliedCoupon(null);
    await AsyncStorage.removeItem('cartItems');
    await AsyncStorage.removeItem('appliedCoupon');
  };

  const setTable = async (slug) => {
    setTableSlug(slug);
    await AsyncStorage.setItem('tableSlug', slug);
  };

  const applyCoupon = async (couponCode) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: couponCode,
          orderAmount: getSubtotal()
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setAppliedCoupon(data.coupon);
        await AsyncStorage.setItem('appliedCoupon', JSON.stringify(data.coupon));
        return { success: true, coupon: data.coupon };
      } else {
        return { success: false, message: data.message || 'Invalid coupon code' };
      }
    } catch (error) {
      console.error('Apply coupon error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = async () => {
    setAppliedCoupon(null);
    await AsyncStorage.removeItem('appliedCoupon');
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = getSubtotal();
    
    if (appliedCoupon.discountType === 'percentage') {
      const discount = (subtotal * appliedCoupon.discountValue) / 100;
      return appliedCoupon.maximumDiscountAmount 
        ? Math.min(discount, appliedCoupon.maximumDiscountAmount)
        : discount;
    } else {
      return appliedCoupon.discountValue;
    }
  };

  const getTotal = () => {
    return Math.max(0, getSubtotal() - getDiscount());
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    tableSlug,
    appliedCoupon,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setTable,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getTotal,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};