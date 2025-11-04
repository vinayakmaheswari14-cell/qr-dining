import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { clearCart, getItemCount } = useCart();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
            await clearCart();
            Alert.alert('Success', 'Logged out successfully', [
              { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      title: 'My Orders',
      description: 'View your order history',
      icon: '📋',
      action: () => navigation.navigate('OrderStatus'),
    },
    {
      title: 'Cart',
      description: `${getItemCount()} items in cart`,
      icon: '🛒',
      action: () => navigation.navigate('Cart'),
    },
    {
      title: 'Scan QR Code',
      description: 'Scan table QR code',
      icon: '📱',
      action: () => navigation.navigate('QRScanner'),
    },
    {
      title: 'Browse Menu',
      description: 'View our delicious menu',
      icon: '🍽️',
      action: () => navigation.navigate('Menu', { tableSlug: 'demo-table' }),
    },
  ];

  const appInfo = [
    {
      title: 'About Restaurant',
      description: 'Learn more about Viru Jash Restaurant',
      icon: 'ℹ️',
      action: () => {
        Alert.alert(
          'About Viru Jash Restaurant',
          'We serve authentic pure vegetarian Indian cuisine with a modern QR-based ordering system. Experience the best of traditional flavors with contemporary convenience.',
          [{ text: 'OK' }]
        );
      },
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with us',
      icon: '📞',
      action: () => {
        Alert.alert(
          'Contact Information',
          '📧 Email: info@virujashrestaurant.com\n📞 Phone: +91 98765 43210\n🏠 Address: Your favorite location',
          [{ text: 'OK' }]
        );
      },
    },
    {
      title: 'Help & Support',
      description: 'Get help with the app',
      icon: '❓',
      action: () => {
        Alert.alert(
          'Help & Support',
          'How to use the app:\n\n1. Scan QR code at your table\n2. Browse menu and add items to cart\n3. Apply coupons for discounts\n4. Place your order\n5. Track order status\n\nFor more help, contact us at info@virujashrestaurant.com',
          [{ text: 'OK' }]
        );
      },
    },
  ];

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInIcon}>👤</Text>
          <Text style={styles.notLoggedInTitle}>Not Logged In</Text>
          <Text style={styles.notLoggedInText}>
            Please login to access your profile and view your orders
          </Text>
          
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info for non-logged in users */}
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Features</Text>
            {appInfo.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionCard}
                onPress={item.action}
              >
                <Text style={styles.optionIcon}>{item.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionDescription}>{item.description}</Text>
                </View>
                <Text style={styles.optionArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.userSection}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || '👤'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userRole}>Role: {user?.role}</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {profileOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={option.action}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        {appInfo.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={item.action}
          >
            <Text style={styles.optionIcon}>{item.icon}</Text>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{item.title}</Text>
              <Text style={styles.optionDescription}>{item.description}</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionSection}>
        <Text style={styles.versionText}>Viru Jash Restaurant App v1.0.0</Text>
        <Text style={styles.versionSubtext}>Made with ❤️ for great food experiences</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  notLoggedInContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notLoggedInIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notLoggedInText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userSection: {
    backgroundColor: '#2196f3',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#e3f2fd',
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: '#bbdefb',
    textTransform: 'capitalize',
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginLeft: 5,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  optionArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  versionSection: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#ccc',
  },
});

export default ProfileScreen;