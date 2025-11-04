import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config/api';

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    tableSlug,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getTotal,
    getItemCount,
  } = useCart();
  
  const { user, token, isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', onPress: () => removeFromCart(itemId) },
        ]
      );
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }

    setLoading(true);
    const result = await applyCoupon(couponCode.trim().toUpperCase());
    setLoading(false);

    if (result.success) {
      setCouponCode('');
      Alert.alert('Success', 'Coupon applied successfully!');
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleRemoveCoupon = () => {
    Alert.alert(
      'Remove Coupon',
      'Are you sure you want to remove the applied coupon?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: removeCoupon },
      ]
    );
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please login to place an order',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Login') },
        ]
      );
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    if (!tableSlug) {
      Alert.alert('Error', 'Please scan a table QR code first');
      return;
    }

    try {
      setLoading(true);
      
      const orderData = {
        tableSlug,
        items: cartItems.map(item => ({
          menuItemId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: getSubtotal(),
        discount: getDiscount(),
        total: getTotal(),
        couponCode: appliedCoupon?.code,
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        await clearCart();
        Alert.alert(
          'Order Placed!',
          `Your order has been placed successfully. Order ID: ${data.order._id}`,
          [
            {
              text: 'Track Order',
              onPress: () => navigation.navigate('OrderStatus', { orderId: data.order._id }),
            },
          ]
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Place order error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/80' }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item._id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item._id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemActions}>
        <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item._id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>
          Add some delicious items from our menu to get started!
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Menu', { tableSlug: 'demo-table' })}
        >
          <Text style={styles.browseButtonText}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart ({getItemCount()} items)</Text>
        {tableSlug && (
          <Text style={styles.tableInfo}>Table: {tableSlug}</Text>
        )}
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item._id}
        style={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Coupon Section */}
        <View style={styles.couponSection}>
          {appliedCoupon ? (
            <View style={styles.appliedCoupon}>
              <View style={styles.couponInfo}>
                <Text style={styles.couponCode}>🎟️ {appliedCoupon.code}</Text>
                <Text style={styles.couponDescription}>{appliedCoupon.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeCouponButton}
                onPress={handleRemoveCoupon}
              >
                <Text style={styles.removeCouponText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.couponInput}>
              <TextInput
                style={styles.couponTextInput}
                placeholder="Enter coupon code"
                value={couponCode}
                onChangeText={setCouponCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.applyCouponButton}
                onPress={handleApplyCoupon}
                disabled={loading}
              >
                <Text style={styles.applyCouponText}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>₹{getSubtotal()}</Text>
          </View>
          
          {getDiscount() > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountLabel]}>Discount:</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>-₹{getDiscount()}</Text>
            </View>
          )}
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>₹{getTotal()}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              Alert.alert(
                'Clear Cart',
                'Are you sure you want to clear your cart?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', onPress: clearCart },
                ]
              );
            }}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.placeOrderButton, loading && styles.disabledButton]}
            onPress={handlePlaceOrder}
            disabled={loading}
          >
            <Text style={styles.placeOrderButtonText}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#2196f3',
    padding: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableInfo: {
    color: '#e3f2fd',
    fontSize: 14,
    marginTop: 5,
  },
  cartList: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#2196f3',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f5f5f5',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  couponSection: {
    marginBottom: 20,
  },
  appliedCoupon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  couponDescription: {
    fontSize: 12,
    color: '#4caf50',
    marginTop: 2,
  },
  removeCouponButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  removeCouponText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  couponInput: {
    flexDirection: 'row',
    gap: 10,
  },
  couponTextInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  applyCouponButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  applyCouponText: {
    color: '#fff',
    fontWeight: '600',
  },
  orderSummary: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  discountLabel: {
    color: '#4CAF50',
  },
  discountValue: {
    color: '#4CAF50',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#666',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  placeOrderButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default CartScreen;