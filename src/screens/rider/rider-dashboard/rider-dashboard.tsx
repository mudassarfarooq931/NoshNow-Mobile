import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { colors } from '../../../constants';
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Navigation,
  Phone,
  Package,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
} from 'lucide-react-native';
import { riderStats, staticOrders } from '../../../constants/static-data';

const { width } = Dimensions.get('window');

const RiderDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOnline, setIsOnline] = useState(true);
  const [currentOrder, setCurrentOrder] = useState(
    staticOrders.find(
      order => order.riderId === user?.id && order.status === 'accepted',
    ) || null,
  );

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    Alert.alert(
      isOnline ? 'Go Offline' : 'Go Online',
      isOnline
        ? 'You will stop receiving new delivery requests'
        : 'You are now available for deliveries',
    );
  };

  const handleAcceptOrder = (orderId: string) => {
    Alert.alert(
      'Accept Order',
      'Are you sure you want to accept this delivery?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            setCurrentOrder(
              staticOrders.find(order => order.id === orderId) || null,
            );
            // Here you would update the order status in your backend
          },
        },
      ],
    );
  };

  const handleCompleteOrder = () => {
    Alert.alert('Complete Order', 'Mark this order as delivered?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Complete',
        onPress: () => {
          setCurrentOrder(null);
          // Here you would update the order status in your backend
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'accepted':
        return colors.primary;
      case 'picked_up':
        return colors.info;
      case 'delivered':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color={colors.warning} />;
      case 'accepted':
        return <CheckCircle size={16} color={colors.primary} />;
      case 'picked_up':
        return <Package size={16} color={colors.info} />;
      case 'delivered':
        return <CheckCircle size={16} color={colors.success} />;
      case 'cancelled':
        return <AlertCircle size={16} color={colors.error} />;
      default:
        return <Clock size={16} color={colors.gray} />;
    }
  };

  const pendingOrders = staticOrders.filter(
    order => order.riderId === user?.id && order.status === 'pending',
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Rider Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back, {user?.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.statusInfo}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isOnline ? colors.success : colors.gray },
              ]}
            />
            <Text style={styles.statusText}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: colors.lighterGray, true: colors.white }}
            thumbColor={isOnline ? colors.primary : colors.gray}
            style={styles.switch}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <DollarSign size={24} color={colors.primary} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +12%
              </Text>
            </View>
            <Text style={styles.statValue}>${riderStats.totalEarnings}</Text>
            <Text style={styles.statTitle}>Total Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Package size={24} color={colors.success} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +8%
              </Text>
            </View>
            <Text style={styles.statValue}>{riderStats.totalDeliveries}</Text>
            <Text style={styles.statTitle}>Total Deliveries</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Star size={24} color={colors.warning} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +5%
              </Text>
            </View>
            <Text style={styles.statValue}>{riderStats.averageRating}</Text>
            <Text style={styles.statTitle}>Average Rating</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Clock size={24} color={colors.info} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +15%
              </Text>
            </View>
            <Text style={styles.statValue}>{riderStats.completedToday}</Text>
            <Text style={styles.statTitle}>Today's Deliveries</Text>
          </View>
        </View>

        {/* Current Order */}
        {currentOrder ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Delivery</Text>
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{currentOrder.id}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(currentOrder.status) },
                  ]}
                >
                  {getStatusIcon(currentOrder.status)}
                  <Text style={styles.statusText}>
                    {currentOrder.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Restaurant</Text>
                    <Text style={styles.detailValue}>
                      {currentOrder.restaurantName}
                    </Text>
                    <Text style={styles.detailSubValue}>
                      {currentOrder.restaurantAddress}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Navigation size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Delivery Address</Text>
                    <Text style={styles.detailValue}>
                      {currentOrder.deliveryAddress}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <User size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Customer</Text>
                    <Text style={styles.detailValue}>
                      {currentOrder.customerName}
                    </Text>
                    <Text style={styles.detailSubValue}>
                      {currentOrder.customerPhone}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <DollarSign size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Earnings</Text>
                    <Text style={styles.detailValue}>
                      ${currentOrder.riderEarnings}
                    </Text>
                  </View>
                </View>
              </View>

              {currentOrder.specialInstructions && (
                <View style={styles.instructionsContainer}>
                  <Text style={styles.instructionsLabel}>
                    Special Instructions:
                  </Text>
                  <Text style={styles.instructionsText}>
                    {currentOrder.specialInstructions}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleCompleteOrder}
              >
                <Text style={styles.completeButtonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.noOrderContainer}>
              <Package size={48} color={colors.lighterGray} />
              <Text style={styles.noOrderTitle}>No Active Delivery</Text>
              <Text style={styles.noOrderSubtitle}>
                {isOnline
                  ? 'Waiting for new orders...'
                  : 'Go online to receive orders'}
              </Text>
            </View>
          </View>
        )}

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Orders</Text>
            {pendingOrders.map(order => (
              <View key={order.id} style={styles.pendingOrderCard}>
                <View style={styles.pendingOrderHeader}>
                  <Text style={styles.pendingOrderId}>Order #{order.id}</Text>
                  <Text style={styles.pendingOrderEarnings}>
                    ${order.riderEarnings}
                  </Text>
                </View>

                <View style={styles.pendingOrderDetails}>
                  <Text style={styles.pendingOrderRestaurant}>
                    {order.restaurantName}
                  </Text>
                  <Text style={styles.pendingOrderAddress}>
                    {order.deliveryAddress}
                  </Text>
                  <Text style={styles.pendingOrderCustomer}>
                    {order.customerName}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptOrder(order.id)}
                >
                  <Text style={styles.acceptButtonText}>Accept Order</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: colors.gray,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  detailSubValue: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  instructionsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.lighterGray,
    borderRadius: 8,
  },
  instructionsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  instructionsText: {
    fontSize: 12,
    color: colors.gray,
  },
  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  noOrderContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noOrderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 16,
  },
  noOrderSubtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
    textAlign: 'center',
  },
  pendingOrderCard: {
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
  pendingOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pendingOrderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  pendingOrderEarnings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },
  pendingOrderDetails: {
    marginBottom: 12,
  },
  pendingOrderRestaurant: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  pendingOrderAddress: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  pendingOrderCustomer: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  acceptButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RiderDashboard;
