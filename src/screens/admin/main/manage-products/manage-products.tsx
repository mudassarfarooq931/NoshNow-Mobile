import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Star,
  Clock,
  DollarSign,
  Package,
  Hash,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import SkeletonLoader from '../../../../components/skeleton-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { staticRestaurants } from '../../../../constants/static-data';

const { width } = Dimensions.get('window');

const ManageProducts = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Get assigned restaurant for admin users
  const assignedRestaurant = user?.assignedRestaurant
    ? staticRestaurants.find(r => r.id === user.assignedRestaurant)
    : null;

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      category: 'Pizza',
      restaurant: 'Pizza Palace',
      price: 12.99,
      rating: 4.5,
      preparationTime: '25 min',
      calories: 320,
      isAvailable: true,
      isVegetarian: true,
      isVegan: false,
      isSpicy: false,
      image: null,
      totalOrders: 45,
      revenue: '$584.55',
    },
    {
      id: '2',
      name: 'Chicken Burger',
      category: 'Burgers',
      restaurant: 'Burger King',
      price: 8.99,
      rating: 4.2,
      preparationTime: '15 min',
      calories: 450,
      isAvailable: true,
      isVegetarian: false,
      isVegan: false,
      isSpicy: false,
      image: null,
      totalOrders: 32,
      revenue: '$287.68',
    },
    {
      id: '3',
      name: 'California Roll',
      category: 'Japanese',
      restaurant: 'Sushi Master',
      price: 15.99,
      rating: 4.8,
      preparationTime: '20 min',
      calories: 280,
      isAvailable: false,
      isVegetarian: false,
      isVegan: false,
      isSpicy: false,
      image: null,
      totalOrders: 28,
      revenue: '$447.72',
    },
    {
      id: '4',
      name: 'Chicken Biryani',
      category: 'Rice',
      restaurant: 'Spice Garden',
      price: 11.99,
      rating: 4.6,
      preparationTime: '30 min',
      calories: 520,
      isAvailable: true,
      isVegetarian: false,
      isVegan: false,
      isSpicy: true,
      image: null,
      totalOrders: 67,
      revenue: '$803.33',
    },
    {
      id: '5',
      name: 'Caesar Salad',
      category: 'Salads',
      restaurant: 'Pizza Palace',
      price: 7.99,
      rating: 4.1,
      preparationTime: '10 min',
      calories: 180,
      isAvailable: true,
      isVegetarian: true,
      isVegan: false,
      isSpicy: false,
      image: null,
      totalOrders: 23,
      revenue: '$183.77',
    },
  ]);

  const filterOptions = [
    'All',
    'Available',
    'Unavailable',
    'Pizza',
    'Burgers',
    'Japanese',
    'Rice',
    'Salads',
  ];

  // Filter products based on user role
  const getFilteredProducts = () => {
    if (user?.role === 'superadmin') {
      return products;
    } else if (user?.role === 'admin' && assignedRestaurant) {
      return products.filter(p => p.restaurant === assignedRestaurant.name);
    }
    return [];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredProducts = getFilteredProducts().filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' ||
      product.isAvailable === (selectedFilter === 'Available') ||
      product.isAvailable === !(selectedFilter === 'Unavailable') ||
      product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleEditProduct = (product: any) => {
    Alert.alert('Edit Product', `Edit ${product.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Edit', onPress: () => console.log('Edit product') },
    ]);
  };

  const handleDeleteProduct = (product: any) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete ${product.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setProducts(prev => prev.filter(p => p.id !== product.id));
            Alert.alert('Success', 'Product deleted successfully!');
          },
        },
      ],
    );
  };

  const handleViewProduct = (product: any) => {
    Alert.alert('View Product', `View details for ${product.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'View', onPress: () => console.log('View product') },
    ]);
  };

  const handleToggleAvailability = (product: any) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === product.id ? { ...p, isAvailable: !p.isAvailable } : p,
      ),
    );
  };

  const renderProductCard = (product: any) => (
    <View key={product.id} style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>
            {product.category} • {product.restaurant}
          </Text>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleViewProduct(product)}
          >
            <Eye size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditProduct(product)}
          >
            <Edit3 size={18} color={colors.orange} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteProduct(product)}
          >
            <Trash2 size={18} color={colors.red} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.productDetails}>
        <View style={styles.detailRow}>
          <DollarSign size={16} color={colors.green} />
          <Text style={styles.detailText}>${product.price}</Text>
          <Clock size={16} color={colors.gray} style={styles.detailIcon} />
          <Text style={styles.detailText}>{product.preparationTime}</Text>
          <Star size={16} color={colors.orange} style={styles.detailIcon} />
          <Text style={styles.detailText}>{product.rating}</Text>
        </View>

        <View style={styles.detailRow}>
          <Hash size={16} color={colors.gray} />
          <Text style={styles.detailText}>{product.calories} cal</Text>
        </View>
      </View>

      <View style={styles.productAttributes}>
        {product.isVegetarian && (
          <View
            style={[styles.attributeBadge, { backgroundColor: colors.green }]}
          >
            <Text style={styles.attributeText}>Vegetarian</Text>
          </View>
        )}
        {product.isVegan && (
          <View
            style={[styles.attributeBadge, { backgroundColor: colors.blue }]}
          >
            <Text style={styles.attributeText}>Vegan</Text>
          </View>
        )}
        {product.isSpicy && (
          <View
            style={[styles.attributeBadge, { backgroundColor: colors.red }]}
          >
            <Text style={styles.attributeText}>Spicy</Text>
          </View>
        )}
      </View>

      <View style={styles.productStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{product.totalOrders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{product.revenue}</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {
              backgroundColor: product.isAvailable ? colors.green : colors.red,
            },
          ]}
          onPress={() => handleToggleAvailability(product)}
        >
          <Text style={styles.statusText}>
            {product.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={100} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          {[1, 2, 3, 4, 5].map(item => (
            <View key={item} style={styles.productCardSkeleton}>
              <SkeletonLoader width="100%" height={140} borderRadius={12} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {user?.role === 'superadmin' ? 'Manage Products' : 'My Products'}
        </Text>
        {user?.role !== 'superadmin' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Plus size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search products..."
              placeholderTextColor={colors.gray}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.selectedFilterChipText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products List */}
        <View style={styles.productsList}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              Products ({filteredProducts.length})
            </Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Package size={60} color={colors.gray} />
              <Text style={styles.emptyStateText}>No products found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          ) : (
            filteredProducts.map(renderProductCard)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  addButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  filterButton: {
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  selectedFilterChipText: {
    color: colors.white,
  },
  productsList: {
    marginBottom: 20,
  },
  listHeader: {
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: colors.gray,
  },
  productActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: colors.lighterGray,
  },
  productDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
  },
  detailIcon: {
    marginLeft: 16,
  },
  productAttributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  attributeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  attributeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  productCardSkeleton: {
    marginBottom: 12,
  },
});

export default ManageProducts;
