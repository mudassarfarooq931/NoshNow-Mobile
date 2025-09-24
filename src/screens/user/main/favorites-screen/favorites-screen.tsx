import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Heart, ShoppingCart, Trash2, Star, Clock } from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { addToCart, CartItem } from '../../../../redux/slice/cart-slice';
import SkeletonLoader from '../../../../components/skeleton-loader';

const FavoritesScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);

  // Mock favorites data
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'Chicken Burger',
      price: 450,
      description: 'Juicy chicken patty with fresh vegetables',
      image: require('../../../../assets/images/slide1.png'),
      category: 'Burgers',
      rating: 4.5,
      deliveryTime: '25-30 min',
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Pizza Margherita',
      price: 600,
      description: 'Classic pizza with tomato sauce and mozzarella',
      image: require('../../../../assets/images/slide1.png'),
      category: 'Pizza',
      rating: 4.8,
      deliveryTime: '30-35 min',
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Beef Burger',
      price: 500,
      description: 'Premium beef patty with special sauce',
      image: require('../../../../assets/images/slide1.png'),
      category: 'Burgers',
      rating: 4.3,
      deliveryTime: '20-25 min',
      isFavorite: true,
    },
    {
      id: '4',
      title: 'Chicken Pizza',
      price: 800,
      description: 'Delicious pizza topped with grilled chicken',
      image: require('../../../../assets/images/slide1.png'),
      category: 'Pizza',
      rating: 4.6,
      deliveryTime: '35-40 min',
      isFavorite: true,
    },
  ]);

  const handleRemoveFavorite = (itemId: string) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this item from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(item => item.id !== itemId));
          },
        },
      ],
    );
  };

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

  const renderFavoriteItem = (item: any, index: number) => (
    <View key={item.id} style={styles.favoriteCard}>
      <TouchableOpacity
        style={styles.itemImageContainer}
        onPress={() => handleViewProduct(item)}
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.ratingContainer}>
          <Star size={12} color={colors.white} fill={colors.white} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.itemDetails}>
        <TouchableOpacity
          onPress={() => handleViewProduct(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>

        <View style={styles.itemInfo}>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>Rs. {item.price}</Text>
            <View style={styles.deliveryTimeContainer}>
              <Clock size={12} color={colors.gray} />
              <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
            >
              <ShoppingCart size={16} color={colors.white} />
              <Text style={styles.addToCartText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFavorite(item.id)}
            >
              <Trash2 size={16} color={colors.red} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={150} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.favoriteItemSkeleton}>
              <SkeletonLoader width={80} height={80} borderRadius={10} />
              <View style={styles.favoriteItemInfoSkeleton}>
                <SkeletonLoader
                  width="70%"
                  height={16}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonLoader
                  width="90%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonLoader
                  width="50%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <View style={styles.favoriteItemActionsSkeleton}>
                  <SkeletonLoader width={100} height={30} borderRadius={15} />
                  <SkeletonLoader width={30} height={30} borderRadius={15} />
                </View>
              </View>
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
        <Text style={styles.headerTitle}>My Favorites</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <ShoppingCart size={24} color={colors.white} />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={64} color={colors.gray} />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start adding items to your favorites by tapping the heart icon on
            any product!
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('BottomTabNav')}
          >
            <Text style={styles.browseButtonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {favorites.map(renderFavoriteItem)}
        </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  favoriteCard: {
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
  itemImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  ratingContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 8,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    flex: 1,
  },
  itemPrice: {
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  removeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
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
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  favoriteItemSkeleton: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  favoriteItemInfoSkeleton: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  favoriteItemActionsSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default FavoritesScreen;
