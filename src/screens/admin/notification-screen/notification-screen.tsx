import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Clock,
  User,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  DollarSign,
  Package,
  Star,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import SkeletonLoader from '../../../components/skeleton-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const { width } = Dimensions.get('window');

const NotificationScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      message: 'Order #12345 from Pizza Palace',
      time: '2 min ago',
      isRead: false,
      order: {
        id: '12345',
        customer: 'John Doe',
        restaurant: 'Pizza Palace',
        items: [
          { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
          { name: 'Coca Cola', quantity: 1, price: 2.99 },
        ],
        total: 28.97,
        deliveryAddress: '123 Main St, City',
        phone: '+92 300 1234567',
        status: 'pending',
        orderTime: '2024-01-15 14:30',
        estimatedDelivery: '30 min',
      },
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Status Update',
      message: 'Order #12344 is being prepared',
      time: '15 min ago',
      isRead: true,
      order: {
        id: '12344',
        customer: 'Jane Smith',
        restaurant: 'Burger King',
        items: [
          { name: 'Chicken Burger', quantity: 1, price: 8.99 },
          { name: 'French Fries', quantity: 1, price: 3.99 },
        ],
        total: 12.98,
        deliveryAddress: '456 Oak Ave, City',
        phone: '+92 300 7654321',
        status: 'preparing',
        orderTime: '2024-01-15 14:15',
        estimatedDelivery: '20 min',
      },
    },
    {
      id: '3',
      type: 'order',
      title: 'Order Completed',
      message: 'Order #12343 has been delivered',
      time: '1 hour ago',
      isRead: true,
      order: {
        id: '12343',
        customer: 'Mike Johnson',
        restaurant: 'Sushi Master',
        items: [
          { name: 'California Roll', quantity: 1, price: 15.99 },
          { name: 'Miso Soup', quantity: 1, price: 4.99 },
        ],
        total: 20.98,
        deliveryAddress: '789 Pine St, City',
        phone: '+92 300 9876543',
        status: 'delivered',
        orderTime: '2024-01-15 13:30',
        estimatedDelivery: 'Delivered',
      },
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleAcceptOrder = (orderId: string) => {
    Alert.alert('Accept Order', 'Are you sure you want to accept this order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        style: 'default',
        onPress: () => {
          setNotifications(prev =>
            prev.map(notif =>
              notif.id === orderId
                ? {
                    ...notif,
                    order: { ...notif.order, status: 'accepted' },
                    isRead: true,
                  }
                : notif,
            ),
          );
          Alert.alert('Success', 'Order accepted successfully!');
        },
      },
    ]);
  };

  const handleRejectOrder = (orderId: string) => {
    Alert.alert('Reject Order', 'Are you sure you want to reject this order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: () => {
          setNotifications(prev =>
            prev.map(notif =>
              notif.id === orderId
                ? {
                    ...notif,
                    order: { ...notif.order, status: 'rejected' },
                    isRead: true,
                  }
                : notif,
            ),
          );
          Alert.alert('Order Rejected', 'Order has been rejected.');
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.orange;
      case 'accepted':
        return colors.blue;
      case 'preparing':
        return colors.primary;
      case 'delivered':
        return colors.green;
      case 'rejected':
        return colors.red;
      default:
        return colors.gray;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'preparing':
        return 'Preparing';
      case 'delivered':
        return 'Delivered';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const renderOrderCard = (notification: any) => (
    <View key={notification.id} style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        {!notification.isRead && <View style={styles.unreadDot} />}
      </View>

      {notification.type === 'order' && (
        <View style={styles.orderDetails}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{notification.order.id}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(notification.order.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(notification.order.status)}
              </Text>
            </View>
          </View>

          <View style={styles.customerInfo}>
            <View style={styles.customerRow}>
              <User size={16} color={colors.gray} />
              <Text style={styles.customerText}>
                {notification.order.customer}
              </Text>
            </View>
            <View style={styles.customerRow}>
              <MapPin size={16} color={colors.gray} />
              <Text style={styles.customerText}>
                {notification.order.deliveryAddress}
              </Text>
            </View>
            <View style={styles.customerRow}>
              <Phone size={16} color={colors.gray} />
              <Text style={styles.customerText}>
                {notification.order.phone}
              </Text>
            </View>
          </View>

          <View style={styles.itemsSection}>
            <Text style={styles.itemsTitle}>Order Items:</Text>
            {notification.order.items.map((item: any, index: number) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmount}>
                ${notification.order.total.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.orderFooter}>
            <View style={styles.timeInfo}>
              <Clock size={16} color={colors.gray} />
              <Text style={styles.timeText}>
                Ordered: {notification.order.orderTime}
              </Text>
            </View>
            <Text style={styles.deliveryText}>
              ETA: {notification.order.estimatedDelivery}
            </Text>
          </View>

          {notification.order.status === 'pending' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => handleRejectOrder(notification.id)}
              >
                <XCircle size={20} color={colors.white} />
                <Text style={styles.actionButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => handleAcceptOrder(notification.id)}
              >
                <CheckCircle size={20} color={colors.white} />
                <Text style={styles.actionButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
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
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.notificationCardSkeleton}>
              <SkeletonLoader width="100%" height={120} borderRadius={12} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          <Bell size={24} color={colors.white} />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={64} color={colors.gray} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyMessage}>
              You'll receive notifications for new orders and updates here.
            </Text>
          </View>
        ) : (
          notifications.map(renderOrderCard)
        )}
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
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  unreadBadge: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadCount: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerRight: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.gray,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
    marginTop: 4,
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    paddingTop: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
  },
  itemsSection: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    color: colors.metallicBlack,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    paddingTop: 8,
    marginTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: colors.green,
  },
  rejectButton: {
    backgroundColor: colors.red,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Skeleton styles
  notificationCardSkeleton: {
    marginVertical: 8,
  },
});

export default NotificationScreen;
