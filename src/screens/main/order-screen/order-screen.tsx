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
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  Filter,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import SkeletonLoader from '../../../components/skeleton-loader';

const OrderScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);

  // Mock order data
  const orders = [
    {
      id: 'ORD001',
      status: 'Delivered',
      date: '2024-01-15',
      time: '2:30 PM',
      total: 1250,
      items: [
        { name: 'Chicken Burger', quantity: 2, price: 450 },
        { name: 'Pizza Margherita', quantity: 1, price: 600 },
      ],
      deliveryAddress: '123 Main Street, Karachi',
      paymentMethod: 'Cash on Delivery',
    },
    {
      id: 'ORD002',
      status: 'Preparing',
      date: '2024-01-15',
      time: '4:15 PM',
      total: 850,
      items: [
        { name: 'Beef Burger', quantity: 1, price: 500 },
        { name: 'French Fries', quantity: 1, price: 200 },
        { name: 'Coca Cola', quantity: 1, price: 150 },
      ],
      deliveryAddress: '456 Park Avenue, Karachi',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'ORD003',
      status: 'Out for Delivery',
      date: '2024-01-14',
      time: '7:45 PM',
      total: 1800,
      items: [
        { name: 'Chicken Pizza', quantity: 1, price: 800 },
        { name: 'Garlic Bread', quantity: 2, price: 300 },
        { name: 'Ice Cream', quantity: 2, price: 350 },
      ],
      deliveryAddress: '789 Garden Road, Karachi',
      paymentMethod: 'Cash on Delivery',
    },
    {
      id: 'ORD004',
      status: 'Cancelled',
      date: '2024-01-14',
      time: '6:20 PM',
      total: 650,
      items: [
        { name: 'Fish Burger', quantity: 1, price: 400 },
        { name: 'Onion Rings', quantity: 1, price: 250 },
      ],
      deliveryAddress: '321 Ocean Drive, Karachi',
      paymentMethod: 'Credit Card',
    },
  ];

  const filterOptions = [
    'All',
    'Delivered',
    'Preparing',
    'Out for Delivery',
    'Cancelled',
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return colors.green;
      case 'Preparing':
        return colors.orange;
      case 'Out for Delivery':
        return colors.blue;
      case 'Cancelled':
        return colors.red;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={20} color={colors.green} />;
      case 'Preparing':
        return <Clock size={20} color={colors.orange} />;
      case 'Out for Delivery':
        return <RefreshCw size={20} color={colors.blue} />;
      case 'Cancelled':
        return <XCircle size={20} color={colors.red} />;
      default:
        return <Clock size={20} color={colors.gray} />;
    }
  };

  const filteredOrders =
    selectedFilter === 'All'
      ? orders
      : orders.filter(order => order.status === selectedFilter);

  const handleViewOrder = (order: any) => {
    Alert.alert(
      'Order Details',
      `Order ID: ${order.id}\nStatus: ${order.status}\nTotal: Rs. ${order.total}`,
    );
  };

  const handleTrackOrder = (order: any) => {
    if (order.status === 'Delivered' || order.status === 'Cancelled') {
      Alert.alert('Cannot Track', 'This order cannot be tracked.');
      return;
    }
    navigation.navigate('TrackOrder', { orderId: order.id });
  };

  const handleReorder = (order: any) => {
    Alert.alert('Reorder', 'This feature will be implemented soon!');
  };

  const renderOrderItem = (order: any, index: number) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <Text style={styles.orderDateTime}>
            {order.date} • {order.time}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(order.status)}
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item: any, itemIndex: number) => (
          <View key={itemIndex} style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            <Text style={styles.itemPrice}>Rs. {item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.orderTotal}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>Rs. {order.total}</Text>
        </View>
        <View style={styles.orderActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleViewOrder(order)}
          >
            <Eye size={16} color={colors.primary} />
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
          {(order.status === 'Preparing' ||
            order.status === 'Out for Delivery') && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleTrackOrder(order)}
            >
              <RefreshCw size={16} color={colors.blue} />
              <Text style={styles.actionButtonText}>Track</Text>
            </TouchableOpacity>
          )}
          {order.status === 'Delivered' && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleReorder(order)}
            >
              <RefreshCw size={16} color={colors.green} />
              <Text style={styles.actionButtonText}>Reorder</Text>
            </TouchableOpacity>
          )}
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
          {/* Filter tabs skeleton */}
          <View style={styles.filterContainerSkeleton}>
            {['All', 'Pending', 'Preparing', 'Delivered'].map(item => (
              <SkeletonLoader
                key={item}
                width={80}
                height={35}
                borderRadius={18}
                style={{ marginRight: 12 }}
              />
            ))}
          </View>

          {/* Order items skeleton */}
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.orderItemSkeleton}>
              {/* Order header */}
              <View style={styles.orderHeaderSkeleton}>
                <View style={styles.orderIdSkeleton}>
                  <SkeletonLoader width={120} height={16} />
                  <SkeletonLoader width={80} height={14} />
                </View>
                <SkeletonLoader width={70} height={24} borderRadius={12} />
              </View>

              {/* Order items list skeleton */}
              <View style={styles.orderItemsListSkeleton}>
                {[1, 2].map(subItem => (
                  <View key={subItem} style={styles.orderItemRowSkeleton}>
                    <SkeletonLoader width={50} height={50} borderRadius={8} />
                    <View style={styles.orderItemDetailsSkeleton}>
                      <SkeletonLoader
                        width="70%"
                        height={16}
                        style={{ marginBottom: 6 }}
                      />
                      <SkeletonLoader
                        width="50%"
                        height={14}
                        style={{ marginBottom: 4 }}
                      />
                      <SkeletonLoader width={60} height={14} />
                    </View>
                    <SkeletonLoader width={50} height={16} />
                  </View>
                ))}
              </View>

              {/* Order footer */}
              <View style={styles.orderFooterSkeleton}>
                <View style={styles.orderTotalSkeleton}>
                  <SkeletonLoader width={100} height={16} />
                  <SkeletonLoader width={80} height={18} />
                </View>
                <View style={styles.orderActionsSkeleton}>
                  <SkeletonLoader
                    width={80}
                    height={32}
                    borderRadius={16}
                    style={{ marginRight: 8 }}
                  />
                  <SkeletonLoader width={60} height={32} borderRadius={16} />
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
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filterOptions.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No orders found</Text>
          <Text style={styles.emptySubtitle}>
            {selectedFilter === 'All'
              ? "You haven't placed any orders yet."
              : `No ${selectedFilter.toLowerCase()} orders found.`}
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredOrders.map(renderOrderItem)}
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
  filterButton: {
    padding: 5,
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: colors.lighterGray,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 2,
  },
  orderDateTime: {
    fontSize: 12,
    color: colors.gray,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  orderItems: {
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: colors.metallicBlack,
    flex: 1,
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.gray,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  orderTotal: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.lighterGray,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
  orderItemSkeleton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderFooterSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterContainerSkeleton: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  orderIdSkeleton: {
    flex: 1,
  },
  orderItemsListSkeleton: {
    marginVertical: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lighterGray,
  },
  orderItemRowSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemDetailsSkeleton: {
    flex: 1,
    marginLeft: 12,
  },
  orderTotalSkeleton: {
    flex: 1,
  },
  orderActionsSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderScreen;
