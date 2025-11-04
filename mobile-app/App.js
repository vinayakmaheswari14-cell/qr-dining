import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import QRScannerScreen from './src/screens/QRScannerScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OrderStatusScreen from './src/screens/OrderStatusScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import providers
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#2196f3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: '🍽️ Viru Jash Restaurant' }}
              />
              <Stack.Screen 
                name="QRScanner" 
                component={QRScannerScreen} 
                options={{ title: 'Scan QR Code' }}
              />
              <Stack.Screen 
                name="Menu" 
                component={MenuScreen} 
                options={{ title: 'Menu' }}
              />
              <Stack.Screen 
                name="Cart" 
                component={CartScreen} 
                options={{ title: 'Your Cart' }}
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ title: 'Login' }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{ title: 'Register' }}
              />
              <Stack.Screen 
                name="OrderStatus" 
                component={OrderStatusScreen} 
                options={{ title: 'Order Status' }}
              />
              <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ title: 'Profile' }}
              />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});