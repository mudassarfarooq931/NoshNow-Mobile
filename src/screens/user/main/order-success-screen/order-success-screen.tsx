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
} from 'react-native';
import {
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  ArrowLeft,
  Copy,
  Star,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  MainNavParamList,
  MainNavigationProp,
} from '../../../../routes/param-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import SkeletonLoader from '../../../../components/skeleton-loader';

type OrderSuccessScreenRouteProp = RouteProp<MainNavParamList, 'OrderSuccess'>;

const OrderSuccessScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const route = useRoute<OrderSuccessScreenRouteProp>();
  const { orderDetails } = route.params;

  const [estimatedTime, setEstimatedTime] = useState(30);
  const [orderStatus, setOrderStatus] = useState('Preparing');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate order status updates
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleCopyOrderId = () => {
    Alert.alert('Order ID Copied', 'Order ID has been copied to clipboard');
  };

  const handleTrackOrder = () => {
    navigation.navigate('TrackOrder', { orderId: orderDetails.orderId });
  };

  const handleRateOrder = () => {
    Alert.alert('Rate Order', 'Rating feature will be implemented soon!');
  };

  const handleReorder = () => {
    navigation.navigate('BottomTabNav');
  };

  const renderOrderItem = (item: any, index: number) => (
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
          <View style={styles.successContainer}>
            <SkeletonLoader width={100} height={100} borderRadius={50} />
            <SkeletonLoader
              width="80%"
              height={24}
              style={{ marginTop: 20, marginBottom: 10 }}
            />
            <SkeletonLoader
              width="60%"
              height={16}
              style={{ marginBottom: 30 }}
            />
          </View>
          <View style={styles.orderInfoSkeleton}>
            <SkeletonLoader width="100%" height={200} borderRadius={15} />
          </View>
          <View style={styles.actionsSkeleton}>
            <SkeletonLoader
              width="100%"
              height={50}
              borderRadius={25}
              style={{ marginBottom: 15 }}
            />
            <SkeletonLoader width="100%" height={50} borderRadius={25} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('BottomTabNav')}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Message */}
        <View style={styles.successContainer}>
          <CheckCircle size={80} color={colors.green} />
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successSubtitle}>
            Your order has been confirmed and will be delivered soon.
          </Text>
        </View>

        {/* Order ID */}
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID</Text>
          <View style={styles.orderIdRow}>
            <Text style={styles.orderIdText}>#{orderDetails.orderId}</Text>
            <TouchableOpacity
              onPress={handleCopyOrderId}
              style={styles.copyButton}
            >
              <Copy size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusDot, { backgroundColor: colors.green }]}
            />
            <Text style={styles.statusText}>Order Confirmed</Text>
          </View>
          <View style={styles.statusLine} />
          <View style={styles.statusItem}>
            <View
              style={[styles.statusDot, { backgroundColor: colors.primary }]}
            />
            <Text style={styles.statusText}>Preparing</Text>
          </View>
          <View style={styles.statusLine} />
          <View style={styles.statusItem}>
            <View
              style={[styles.statusDot, { backgroundColor: colors.gray }]}
            />
            <Text style={styles.statusText}>Out for Delivery</Text>
          </View>
          <View style={styles.statusLine} />
          <View style={styles.statusItem}>
            <View
              style={[styles.statusDot, { backgroundColor: colors.gray }]}
            />
            <Text style={styles.statusText}>Delivered</Text>
          </View>
        </View>

        {/* Estimated Time */}
        <View style={styles.timeContainer}>
          <Clock size={24} color={colors.primary} />
          <View style={styles.timeInfo}>
            <Text style={styles.timeLabel}>Estimated Delivery Time</Text>
            <Text style={styles.timeValue}>{estimatedTime} minutes</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {orderDetails.items.map(renderOrderItem)}
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.detailRow}>
            <MapPin size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Delivery Address</Text>
              <Text style={styles.detailValue}>
                {orderDetails.deliveryAddress}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Phone size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Contact Number</Text>
              <Text style={styles.detailValue}>{orderDetails.phone}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <CreditCard size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>
                {orderDetails.paymentMethod}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>Rs. {orderDetails.subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>
              {orderDetails.deliveryFee === 0
                ? 'Free'
                : `Rs. ${orderDetails.deliveryFee}`}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs. {orderDetails.total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton} onPress={handleRateOrder}>
          <Star size={20} color={colors.white} />
          <Text style={styles.rateButtonText}>Rate Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reorderButton} onPress={handleReorder}>
          <Text style={styles.reorderButtonText}>Order Again</Text>
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
  successContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green,
    marginTop: 15,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  orderIdContainer: {
    backgroundColor: colors.lighterGray,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  orderIdLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 5,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  copyButton: {
    padding: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  statusLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.gray,
    marginHorizontal: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  timeInfo: {
    marginLeft: 15,
  },
  timeLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  section: {
    marginBottom: 20,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailInfo: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  detailValue: {
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
  trackButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  trackButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateButton: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  rateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reorderButton: {
    backgroundColor: colors.gray,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderInfoSkeleton: {
    marginVertical: 20,
  },
  actionsSkeleton: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default OrderSuccessScreen;
