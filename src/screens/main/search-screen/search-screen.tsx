import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Clock,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addToCart, CartItem } from '../../../redux/slice/cart-slice';

const SearchScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state: RootState) => state.cart);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock product data for search
  const allProducts = [
    {
      id: '1',
      title: 'Chicken Burger',
      price: 450,
      description: 'Juicy chicken patty with fresh vegetables',
      image: require('../../../assets/images/slide1.png'),
      category: 'Burgers',
      rating: 4.5,
      deliveryTime: '25-30 min',
    },
    {
      id: '2',
      title: 'Pizza Margherita',
      price: 600,
      description: 'Classic pizza with tomato sauce and mozzarella',
      image: require('../../../assets/images/slide1.png'),
      category: 'Pizza',
      rating: 4.8,
      deliveryTime: '30-35 min',
    },
    {
      id: '3',
      title: 'Beef Burger',
      price: 500,
      description: 'Premium beef patty with special sauce',
      image: require('../../../assets/images/slide1.png'),
      category: 'Burgers',
      rating: 4.3,
      deliveryTime: '20-25 min',
    },
    {
      id: '4',
      title: 'Chicken Pizza',
      price: 800,
      description: 'Delicious pizza topped with grilled chicken',
      image: require('../../../assets/images/slide1.png'),
      category: 'Pizza',
      rating: 4.6,
      deliveryTime: '35-40 min',
    },
    {
      id: '5',
      title: 'Fish Burger',
      price: 400,
      description: 'Fresh fish fillet with tartar sauce',
      image: require('../../../assets/images/slide1.png'),
      category: 'Burgers',
      rating: 4.2,
      deliveryTime: '25-30 min',
    },
    {
      id: '6',
      title: 'Veggie Pizza',
      price: 550,
      description: 'Fresh vegetables on a crispy crust',
      image: require('../../../assets/images/slide1.png'),
      category: 'Pizza',
      rating: 4.4,
      deliveryTime: '30-35 min',
    },
    {
      id: '7',
      title: 'Chicken Wings',
      price: 350,
      description: 'Spicy chicken wings with BBQ sauce',
      image: require('../../../assets/images/slide1.png'),
      category: 'Appetizers',
      rating: 4.7,
      deliveryTime: '15-20 min',
    },
    {
      id: '8',
      title: 'French Fries',
      price: 200,
      description: 'Crispy golden french fries',
      image: require('../../../assets/images/slide1.png'),
      category: 'Sides',
      rating: 4.1,
      deliveryTime: '10-15 min',
    },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const filtered = allProducts.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filtered);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleAddToCart = (item: any) => {
    const cartItem: CartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
      quantity: 1,
      selectedFlavor: 'Default',
      selectedSize: 'Regular',
      selectedExtras: [],
      totalPrice: item.price,
    };
    dispatch(addToCart(cartItem));
    Alert.alert('Added to Cart', `${item.title} has been added to your cart!`);
  };

  const handleViewProduct = (item: any) => {
    const product = {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    };
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleViewProduct(item)}
      activeOpacity={0.7}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Star size={12} color={colors.orange} fill={colors.orange} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>Rs. {item.price}</Text>
            <View style={styles.deliveryTimeContainer}>
              <Clock size={12} color={colors.gray} />
              <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(item)}
          >
            <ShoppingCart size={16} color={colors.white} />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={colors.metallicBlack} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <ShoppingCart size={24} color={colors.primary} />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchQuery.trim().length === 0 ? (
        <View style={styles.emptyContainer}>
          <Search size={64} color={colors.gray} />
          <Text style={styles.emptyTitle}>Search for Food</Text>
          <Text style={styles.emptySubtitle}>
            Enter the name of the food you're looking for
          </Text>
        </View>
      ) : isSearching ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Search size={64} color={colors.gray} />
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.metallicBlack,
    paddingVertical: 12,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.red,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    color: colors.metallicBlack,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  productDescription: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 10,
    color: colors.gray,
    marginLeft: 4,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.gray,
  },
});

export default SearchScreen;
