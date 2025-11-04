import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();

  const features = [
    {
      title: 'Scan QR Code',
      description: 'Scan table QR code to view menu',
      icon: '📱',
      action: () => navigation.navigate('QRScanner'),
      color: '#4CAF50',
    },
    {
      title: 'Browse Menu',
      description: 'View our delicious menu items',
      icon: '🍽️',
      action: () => navigation.navigate('Menu', { tableSlug: 'demo-table' }),
      color: '#FF9800',
    },
    {
      title: 'My Cart',
      description: `${getItemCount()} items in cart`,
      icon: '🛒',
      action: () => navigation.navigate('Cart'),
      color: '#2196F3',
    },
    {
      title: 'Order Status',
      description: 'Track your current orders',
      icon: '📋',
      action: () => navigation.navigate('OrderStatus'),
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome to
        </Text>
        <Text style={styles.restaurantName}>
          🍽️ Viru Jash Restaurant
        </Text>
        <Text style={styles.subtitle}>
          Pure Vegetarian Indian Cuisine
        </Text>
        
        {isAuthenticated ? (
          <View style={styles.userInfo}>
            <Text style={styles.userWelcome}>Hello, {user?.name}! 👋</Text>
          </View>
        ) : (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={[styles.authButton, styles.loginButton]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authButton, styles.registerButton]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.authButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Features Grid */}
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { borderLeftColor: feature.color }]}
              onPress={feature.action}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Experience authentic vegetarian Indian cuisine with our QR-based ordering system. 
            Simply scan the QR code at your table to browse our menu and place orders directly 
            from your phone!
          </Text>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Contact Us</Text>
            <Text style={styles.contactText}>📧 info@virujashrestaurant.com</Text>
            <Text style={styles.contactText}>📞 +91 98765 43210</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionButtons}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('QRScanner')}
          >
            <Text style={styles.quickActionText}>📱 Scan QR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Menu', { tableSlug: 'demo-table' })}
          >
            <Text style={styles.quickActionText}>🍽️ Demo Menu</Text>
          </TouchableOpacity>
          {isAuthenticated && (
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.quickActionText}>👤 Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196f3',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  restaurantName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#e3f2fd',
    fontSize: 16,
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  userWelcome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  authButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  authButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  authButtonText: {
    fontWeight: '600',
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featuresGrid: {
    gap: 15,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  quickActions: {
    padding: 20,
    paddingBottom: 40,
  },
  quickActionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickActionButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  quickActionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeScreen;