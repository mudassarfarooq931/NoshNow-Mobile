import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { colors } from '../../../constants';
import {
  Clock,
  MapPin,
  User,
  Phone,
  DollarSign,
  Package,
  CheckCircle,
  AlertCircle,
  Navigation,
  Calendar,
  Filter,
} from 'lucide-react-native';
import { staticOrders } from '../../../constants/static-data';

const RiderOrders = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const riderOrders = staticOrders.filter(order => order.riderId === user?.id);

  const filteredOrders = riderOrders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleOrderAction = (orderId: string, action: string) => {
    Alert.alert(
      action === 'accept' ? 'Accept Order' : 'Complete Order',
      action === 'accept'
        ? 'Are you sure you want to accept this delivery?'
        : 'Mark this order as delivered?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action === 'accept' ? 'Accept' : 'Complete',
          onPress: () => {
            // Handle order action
            Alert.alert('Success', `Order ${action}ed successfully`);
          },
        },
      ],
    );
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filterOptions = [
    { key: 'all', label: 'All Orders' },
    { key: 'pending', label: 'Pending' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'picked_up', label: 'Picked Up' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.filterTab,
                selectedFilter === option.key && styles.filterTabActive,
              ]}
              onPress={() => setSelectedFilter(option.key)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter === option.key && styles.filterTabTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView
        style={styles.ordersList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Package size={48} color={colors.lighterGray} />
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'all'
                ? "You haven't received any orders yet"
                : `No ${selectedFilter} orders found`}
            </Text>
          </View>
        ) : (
          filteredOrders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderIdContainer}>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderTime}>
                    {formatDate(order.orderTime)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) },
                  ]}
                >
                  {getStatusIcon(order.status)}
                  <Text style={styles.statusText}>
                    {order.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Restaurant</Text>
                    <Text style={styles.detailValue}>
                      {order.restaurantName}
                    </Text>
                    <Text style={styles.detailSubValue}>
                      {order.restaurantAddress}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Navigation size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Delivery Address</Text>
                    <Text style={styles.detailValue}>
                      {order.deliveryAddress}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <User size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Customer</Text>
                    <Text style={styles.detailValue}>{order.customerName}</Text>
                    <Text style={styles.detailSubValue}>
                      {order.customerPhone}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <DollarSign size={16} color={colors.gray} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Earnings</Text>
                    <Text style={styles.detailValue}>
                      ${order.riderEarnings}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Order Items */}
              <View style={styles.orderItemsContainer}>
                <Text style={styles.orderItemsTitle}>Order Items:</Text>
                {order.orderItems.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Text style={styles.orderItemName}>{item.name}</Text>
                    <Text style={styles.orderItemDetails}>
                      Qty: {item.quantity} × ${item.price}
                    </Text>
                  </View>
                ))}
                <View style={styles.orderTotal}>
                  <Text style={styles.orderTotalLabel}>
                    Total: ${order.totalAmount}
                  </Text>
                </View>
              </View>

              {/* Special Instructions */}
              {order.specialInstructions && (
                <View style={styles.instructionsContainer}>
                  <Text style={styles.instructionsLabel}>
                    Special Instructions:
                  </Text>
                  <Text style={styles.instructionsText}>
                    {order.specialInstructions}
                  </Text>
                </View>
              )}

              {/* Action Buttons */}
              {order.status === 'pending' && (
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleOrderAction(order.id, 'accept')}
                >
                  <Text style={styles.acceptButtonText}>Accept Order</Text>
                </TouchableOpacity>
              )}

              {order.status === 'accepted' && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleOrderAction(order.id, 'complete')}
                >
                  <Text style={styles.completeButtonText}>
                    Mark as Delivered
                  </Text>
                </TouchableOpacity>
              )}

              {/* Delivery Time Info */}
              {order.status === 'delivered' && order.actualDeliveryTime && (
                <View style={styles.deliveryTimeContainer}>
                  <Calendar size={16} color={colors.success} />
                  <Text style={styles.deliveryTimeText}>
                    Delivered at {formatDate(order.actualDeliveryTime)}
                  </Text>
                </View>
              )}
            </View>
          ))
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: colors.white,
    marginRight: 6,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: colors.white,
  },
  ordersList: {
    flex: 1,
    // padding: 20,
    marginHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderIdContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  orderTime: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 4,
  },
  orderDetails: {
    gap: 12,
    marginBottom: 16,
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
  orderItemsContainer: {
    backgroundColor: colors.lighterGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderItemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderItemName: {
    fontSize: 12,
    color: colors.black,
    flex: 1,
  },
  orderItemDetails: {
    fontSize: 12,
    color: colors.gray,
  },
  orderTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    paddingTop: 8,
    marginTop: 8,
  },
  orderTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  instructionsContainer: {
    backgroundColor: colors.lighterGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
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
  acceptButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  acceptButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  completeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    padding: 8,
    borderRadius: 6,
  },
  deliveryTimeText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default RiderOrders;
