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
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  CartItem,
} from '../../../../redux/slice/cart-slice';
import SkeletonLoader from '../../../../components/skeleton-loader';

const CartScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const dispatch = useDispatch();
  const {
    items: cartItems,
    totalItems,
    totalPrice,
  } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFromCart(itemId));
          },
        },
      ],
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch(clearCart());
          },
        },
      ],
    );
  };

  const calculateSubtotal = () => {
    return totalPrice; // Use Redux state totalPrice
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 1000 ? 0 : 100; // Free delivery over Rs. 1000
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to your cart first.');
      return;
    }

    // Navigate to checkout screen
    navigation.navigate('Checkout');
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>

        {item.selectedFlavor && (
          <Text style={styles.itemOption}>Flavor: {item.selectedFlavor}</Text>
        )}

        {item.selectedSize && (
          <Text style={styles.itemOption}>Size: {item.selectedSize}</Text>
        )}

        {item.selectedExtras.length > 0 && (
          <Text style={styles.itemOption}>
            Extras: {item.selectedExtras.join(', ')}
          </Text>
        )}

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>Rs. {item.totalPrice}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            >
              <Minus size={16} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Trash2 size={20} color={colors.red} />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={30} height={30} borderRadius={15} />
          <SkeletonLoader width={150} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.cartItemSkeleton}>
              <SkeletonLoader width={80} height={80} borderRadius={10} />
              <View style={styles.itemInfoSkeleton}>
                <SkeletonLoader
                  width="70%"
                  height={16}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonLoader
                  width="50%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <View style={styles.itemActionsSkeleton}>
                  <SkeletonLoader width={100} height={30} borderRadius={15} />
                  <SkeletonLoader width={30} height={30} borderRadius={15} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <SkeletonLoader width="100%" height={50} borderRadius={25} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color={colors.gray} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some delicious items to get started!
          </Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map(renderCartItem)}
          </ScrollView>

          {/* Order Summary */}
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rs. {calculateSubtotal()}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                {calculateDeliveryFee() === 0
                  ? 'Free'
                  : `Rs. ${calculateDeliveryFee()}`}
              </Text>
            </View>

            {calculateDeliveryFee() > 0 && (
              <Text style={styles.freeDeliveryText}>
                Add Rs. {1000 - calculateSubtotal()} more for free delivery
              </Text>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>Rs. {calculateTotal()}</Text>
            </View>
          </View>

          {/* Checkout Button */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  clearText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
  placeholder: {
    width: 34,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  shopNowButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  shopNowText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 5,
  },
  itemOption: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lighterGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 10,
    marginLeft: 10,
  },
  orderSummary: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.gray,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.metallicBlack,
    fontWeight: '500',
  },
  freeDeliveryText: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemSkeleton: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  itemInfoSkeleton: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemActionsSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});

export default CartScreen;
