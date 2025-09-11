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
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  User,
  CheckCircle,
  Truck,
  Package,
  Home,
  RefreshCw,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  MainNavParamList,
  MainNavigationProp,
} from '../../../routes/param-list';
import SkeletonLoader from '../../../components/skeleton-loader';

type TrackOrderScreenRouteProp = RouteProp<MainNavParamList, 'TrackOrder'>;

const TrackOrderScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const route = useRoute<TrackOrderScreenRouteProp>();
  const { orderId } = route.params;

  const [orderStatus, setOrderStatus] = useState('Preparing');
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);
  const [currentStep, setCurrentStep] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock order data
  const orderData = {
    orderId: orderId || 'ORD123456789',
    items: [
      {
        id: '1',
        title: 'Chicken Burger',
        image: require('../../../assets/images/slide1.png'),
        quantity: 2,
        price: 450,
      },
      {
        id: '2',
        title: 'Pizza Margherita',
        image: require('../../../assets/images/slide1.png'),
        quantity: 1,
        price: 600,
      },
    ],
    deliveryAddress: '123 Main Street, Downtown, Karachi',
    phone: '+92 300 1234567',
    total: 1050,
    orderTime: '2:30 PM',
    estimatedDelivery: '3:00 PM',
  };

  const statusSteps = [
    { id: 1, title: 'Order Confirmed', status: 'completed', time: '2:30 PM' },
    { id: 2, title: 'Preparing', status: 'current', time: '2:35 PM' },
    { id: 3, title: 'Out for Delivery', status: 'pending', time: '2:50 PM' },
    { id: 4, title: 'Delivered', status: 'pending', time: '3:00 PM' },
  ];

  useEffect(() => {
    // Simulate order status updates
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      Alert.alert('Refreshed', 'Order status updated!');
    }, 1000);
  };

  const handleCallRestaurant = () => {
    Alert.alert('Call Restaurant', 'Calling restaurant...');
  };

  const handleCallDelivery = () => {
    Alert.alert('Call Delivery', 'Calling delivery person...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.green;
      case 'current':
        return colors.primary;
      case 'pending':
        return colors.gray;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (stepId: number, status: string) => {
    if (status === 'completed') {
      return <CheckCircle size={20} color={colors.green} />;
    } else if (status === 'current') {
      if (stepId === 2) return <Package size={20} color={colors.primary} />;
      if (stepId === 3) return <Truck size={20} color={colors.primary} />;
      return <Clock size={20} color={colors.primary} />;
    } else {
      return <Clock size={20} color={colors.gray} />;
    }
  };

  const renderOrderItem = (item: any, index: number) => (
    <View key={item.id} style={styles.orderItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>Rs. {item.price}</Text>
    </View>
  );

  const renderStatusStep = (step: any, index: number) => (
    <View key={step.id} style={styles.statusStep}>
      <View style={styles.stepLeft}>
        <View
          style={[
            styles.stepIcon,
            { backgroundColor: getStatusColor(step.status) + '20' },
          ]}
        >
          {getStatusIcon(step.id, step.status)}
        </View>
        <View style={styles.stepContent}>
          <Text
            style={[styles.stepTitle, { color: getStatusColor(step.status) }]}
          >
            {step.title}
          </Text>
          <Text style={styles.stepTime}>{step.time}</Text>
        </View>
      </View>
      {index < statusSteps.length - 1 && (
        <View
          style={[
            styles.stepLine,
            {
              backgroundColor:
                step.status === 'completed' ? colors.green : colors.gray,
            },
          ]}
        />
      )}
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
          <View style={styles.statusContainerSkeleton}>
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
          <View style={styles.trackingSkeleton}>
            <SkeletonLoader width="100%" height={200} borderRadius={15} />
          </View>
          <View style={styles.deliveryInfoSkeleton}>
            <SkeletonLoader width="100%" height={150} borderRadius={15} />
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
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <RefreshCw
            size={24}
            color={colors.white}
            style={isRefreshing ? styles.refreshing : null}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order ID */}
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID</Text>
          <Text style={styles.orderIdText}>#{orderData.orderId}</Text>
        </View>

        {/* Current Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Current Status</Text>
            <Text style={styles.statusValue}>{orderStatus}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={20} color={colors.primary} />
            <Text style={styles.timeText}>
              Estimated delivery in {estimatedTime} minutes
            </Text>
          </View>
        </View>

        {/* Order Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Progress</Text>
          {statusSteps.map(renderStatusStep)}
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {orderData.items.map(renderOrderItem)}
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.detailRow}>
            <MapPin size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Delivery Address</Text>
              <Text style={styles.detailValue}>
                {orderData.deliveryAddress}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Phone size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Contact Number</Text>
              <Text style={styles.detailValue}>{orderData.phone}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Clock size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Order Time</Text>
              <Text style={styles.detailValue}>{orderData.orderTime}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Home size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Estimated Delivery</Text>
              <Text style={styles.detailValue}>
                {orderData.estimatedDelivery}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryValue}>Rs. {orderData.total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCallRestaurant}
        >
          <Phone size={20} color={colors.white} />
          <Text style={styles.callButtonText}>Call Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCallDelivery}
        >
          <Truck size={20} color={colors.white} />
          <Text style={styles.callButtonText}>Call Delivery</Text>
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
  refreshButton: {
    padding: 5,
  },
  refreshing: {
    transform: [{ rotate: '360deg' }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderIdContainer: {
    backgroundColor: colors.lighterGray,
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  orderIdLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 5,
  },
  orderIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  statusContainer: {
    backgroundColor: colors.primary + '10',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 16,
    color: colors.gray,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
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
  statusStep: {
    marginBottom: 20,
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stepTime: {
    fontSize: 14,
    color: colors.gray,
  },
  stepLine: {
    width: 2,
    height: 30,
    marginLeft: 19,
    marginTop: -10,
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
  itemQuantity: {
    fontSize: 14,
    color: colors.gray,
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.gray,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 10,
  },
  callButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  callButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainerSkeleton: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  trackingSkeleton: {
    marginVertical: 20,
  },
  deliveryInfoSkeleton: {
    marginBottom: 20,
  },
});

export default TrackOrderScreen;
