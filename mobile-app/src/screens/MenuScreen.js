import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { API_BASE_URL } from '../config/api';

const { width } = Dimensions.get('window');

const MenuScreen = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { addToCart, getItemCount } = useCart();
  const { tableSlug } = route.params || {};

  useEffect(() => {
    loadMenuData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchQuery, menuItems]);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      
      // Load categories
      const categoriesResponse = await fetch(`${API_BASE_URL}/menu/categories`);
      const categoriesData = await categoriesResponse.json();
      
      // Load menu items
      const itemsResponse = await fetch(`${API_BASE_URL}/menu/items`);
      const itemsData = await itemsResponse.json();
      
      if (categoriesResponse.ok && itemsResponse.ok) {
        setCategories(categoriesData);
        setMenuItems(itemsData);
        setFilteredItems(itemsData);
        
        // Set first category as selected by default
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0]._id);
        }
      } else {
        Alert.alert('Error', 'Failed to load menu data');
      }
    } catch (error) {
      console.error('Error loading menu:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMenuData();
    setRefreshing(false);
  };

  const filterItems = () => {
    let filtered = menuItems;
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.categoryId === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredItems(filtered);
  };

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item, 1);
      Alert.alert(
        'Added to Cart',
        `${item.name} has been added to your cart!`,
        [
          { text: 'Continue Shopping', style: 'default' },
          { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item._id && styles.selectedCategoryTab,
      ]}
      onPress={() => setSelectedCategory(item._id)}
    >
      <Text
        style={[
          styles.categoryTabText,
          selectedCategory === item._id && styles.selectedCategoryTabText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>
        
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.itemFooter}>
          <View style={styles.availabilityContainer}>
            <View
              style={[
                styles.availabilityDot,
                { backgroundColor: item.availability ? '#4CAF50' : '#F44336' },
              ]}
            />
            <Text style={styles.availabilityText}>
              {item.availability ? 'Available' : 'Not Available'}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.addButton,
              !item.availability && styles.disabledButton,
            ]}
            onPress={() => handleAddToCart(item)}
            disabled={!item.availability}
          >
            <Text style={styles.addButtonText}>
              {item.availability ? 'Add to Cart' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {tableSlug && (
          <Text style={styles.tableInfo}>Table: {tableSlug}</Text>
        )}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>
            🛒 Cart ({getItemCount()})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Tabs */}
      <FlatList
        data={categories}
        renderItem={renderCategoryTab}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      />

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'No items found matching your search'
                : 'No items available in this category'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    backgroundColor: '#2196f3',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableInfo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 25,
    fontSize: 16,
  },
  categoryTabs: {
    backgroundColor: '#fff',
    maxHeight: 60,
  },
  categoryTabsContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategoryTab: {
    backgroundColor: '#2196f3',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedCategoryTabText: {
    color: '#fff',
  },
  menuList: {
    padding: 15,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  itemContent: {
    padding: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default MenuScreen;