import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tableInfo, setTableInfo] = useState(null);

  const addToCart = (item, quantity = 1, note = '') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item._id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, note }
            : cartItem
        );
      } else {
        return [...prevCart, {
          id: item._id,
          name: item.name,
          price: item.price,
          quantity,
          note,
          imageUrl: item.imageUrl
        }];
      }
    });
  };

  const updateCartItem = (itemId, quantity, note) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity, note }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setTableInfo(null);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    tableInfo,
    setTableInfo,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};