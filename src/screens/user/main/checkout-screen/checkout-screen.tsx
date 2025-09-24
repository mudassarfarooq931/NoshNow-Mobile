import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Phone,
  User,
  CheckCircle,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { clearCart, CartItem } from '../../../../redux/slice/cart-slice';
import SkeletonLoader from '../../../../components/skeleton-loader';

const CheckoutScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    specialInstructions: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + item.totalPrice,
      0,
    );
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 1000 ? 0 : 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (!deliveryDetails.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!deliveryDetails.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!deliveryDetails.address.trim()) {
      Alert.alert('Error', 'Please enter your delivery address');
      return;
    }
    if (!deliveryDetails.city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);

      // Generate order ID
      const orderId = `ORD${Date.now()}`;

      // Prepare order details
      const orderDetails = {
        orderId,
        items: cartItems,
        deliveryAddress: `${deliveryDetails.address}, ${deliveryDetails.city}`,
        phone: deliveryDetails.phone,
        paymentMethod:
          selectedPaymentMethod === 'cash'
            ? 'Cash on Delivery'
            : 'Credit/Debit Card',
        subtotal: calculateSubtotal(),
        deliveryFee: calculateDeliveryFee(),
        total: calculateTotal(),
      };

      // Clear cart after successful order
      dispatch(clearCart());

      // Navigate to order success screen
      navigation.navigate('OrderSuccess', { orderDetails });
    }, 2000);
  };

  const renderOrderItem = (item: CartItem, index: number) => (
    <View key={item.id} style={styles.orderItem}>
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
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>Rs. {item.totalPrice}</Text>
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
          <View style={styles.sectionSkeleton}>
            <SkeletonLoader
              width="100%"
              height={150}
              borderRadius={15}
              style={{ marginBottom: 20 }}
            />
          </View>
          <View style={styles.sectionSkeleton}>
            <SkeletonLoader
              width="100%"
              height={200}
              borderRadius={15}
              style={{ marginBottom: 20 }}
            />
          </View>
          <View style={styles.sectionSkeleton}>
            <SkeletonLoader
              width="100%"
              height={100}
              borderRadius={15}
              style={{ marginBottom: 20 }}
            />
          </View>
          <View style={styles.sectionSkeleton}>
            <SkeletonLoader
              width="100%"
              height={150}
              borderRadius={15}
              style={{ marginBottom: 20 }}
            />
          </View>
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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map(renderOrderItem)}
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>

          <View style={styles.inputContainer}>
            <User size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={colors.metallicBlack}
              value={deliveryDetails.name}
              onChangeText={text =>
                setDeliveryDetails(prev => ({ ...prev, name: text }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={colors.metallicBlack}
              value={deliveryDetails.phone}
              onChangeText={text =>
                setDeliveryDetails(prev => ({ ...prev, phone: text }))
              }
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <MapPin size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              placeholderTextColor={colors.metallicBlack}
              value={deliveryDetails.address}
              onChangeText={text =>
                setDeliveryDetails(prev => ({ ...prev, address: text }))
              }
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <MapPin size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor={colors.metallicBlack}
              value={deliveryDetails.city}
              onChangeText={text =>
                setDeliveryDetails(prev => ({ ...prev, city: text }))
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Clock size={20} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Special Instructions (Optional)"
              placeholderTextColor={colors.metallicBlack}
              value={deliveryDetails.specialInstructions}
              onChangeText={text =>
                setDeliveryDetails(prev => ({
                  ...prev,
                  specialInstructions: text,
                }))
              }
              multiline
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'cash' && styles.selectedPaymentOption,
            ]}
            onPress={() => setSelectedPaymentMethod('cash')}
          >
            <View style={styles.paymentInfo}>
              <CreditCard size={24} color={colors.primary} />
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </View>
            {selectedPaymentMethod === 'cash' && (
              <CheckCircle size={20} color={colors.primary} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'card' && styles.selectedPaymentOption,
            ]}
            onPress={() => setSelectedPaymentMethod('card')}
          >
            <View style={styles.paymentInfo}>
              <CreditCard size={24} color={colors.primary} />
              <Text style={styles.paymentText}>Credit/Debit Card</Text>
            </View>
            {selectedPaymentMethod === 'card' && (
              <CheckCircle size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

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
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            isProcessing && styles.processingButton,
          ]}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
        >
          <Text style={styles.placeOrderText}>
            {isProcessing
              ? 'Processing...'
              : `Place Order - Rs. ${calculateTotal()}`}
          </Text>
        </TouchableOpacity>
      </View>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
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
    marginBottom: 4,
  },
  itemOption: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedPaymentOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.metallicBlack,
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
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  processingButton: {
    backgroundColor: colors.gray,
  },
  placeOrderText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSkeleton: {
    marginVertical: 10,
  },
});

export default CheckoutScreen;
