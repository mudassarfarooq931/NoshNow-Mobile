import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  User,
  MapPin,
  Phone,
  CreditCard,
  DollarSign,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import SkeletonLoader from '../../../../components/skeleton-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/states';

const { width } = Dimensions.get('window');

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  restaurantName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  commission: number;
  paymentMethod: 'COD' | 'Credit Card' | 'Online';
  status: 'pending' | 'accepted' | 'preparing' | 'delivered' | 'rejected';
  orderDate: string;
  orderTime: string;
  estimatedDelivery: string;
  notes?: string;
}

const OrdersScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'Ahmed Ali',
      customerPhone: '+92 300 1234567',
      customerAddress: '123 Main Street, Lahore',
      restaurantName: user?.role === 'admin' ? 'My Restaurant' : 'Pizza Palace',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 1200 },
        { name: 'Coca Cola', quantity: 2, price: 100 },
      ],
      totalAmount: 2600,
      commission: 260,
      paymentMethod: 'COD',
      status: 'delivered',
      orderDate: '2024-01-15',
      orderTime: '14:30',
      estimatedDelivery: '15:30',
      notes: 'Extra cheese please',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Sara Khan',
      customerPhone: '+92 301 2345678',
      customerAddress: '456 Park Avenue, Karachi',
      restaurantName: user?.role === 'admin' ? 'My Restaurant' : 'Burger House',
      items: [
        { name: 'Chicken Burger', quantity: 1, price: 800 },
        { name: 'French Fries', quantity: 1, price: 300 },
      ],
      totalAmount: 1100,
      commission: 110,
      paymentMethod: 'Credit Card',
      status: 'preparing',
      orderDate: '2024-01-15',
      orderTime: '16:45',
      estimatedDelivery: '17:30',
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerName: 'Muhammad Hassan',
      customerPhone: '+92 302 3456789',
      customerAddress: '789 Garden Road, Islamabad',
      restaurantName: user?.role === 'admin' ? 'My Restaurant' : 'Sushi World',
      items: [
        { name: 'California Roll', quantity: 3, price: 1500 },
        { name: 'Miso Soup', quantity: 1, price: 400 },
      ],
      totalAmount: 4900,
      commission: 490,
      paymentMethod: 'Online',
      status: 'accepted',
      orderDate: '2024-01-15',
      orderTime: '18:20',
      estimatedDelivery: '19:15',
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      customerName: 'Fatima Ahmed',
      customerPhone: '+92 303 4567890',
      customerAddress: '321 University Road, Lahore',
      restaurantName: user?.role === 'admin' ? 'My Restaurant' : 'Taco Bell',
      items: [
        { name: 'Chicken Tacos', quantity: 2, price: 600 },
        { name: 'Nachos', quantity: 1, price: 400 },
      ],
      totalAmount: 1000,
      commission: 100,
      paymentMethod: 'COD',
      status: 'rejected',
      orderDate: '2024-01-15',
      orderTime: '19:10',
      estimatedDelivery: '20:00',
      notes: 'Customer cancelled',
    },
    {
      id: '5',
      orderNumber: 'ORD-005',
      customerName: 'Ali Raza',
      customerPhone: '+92 304 5678901',
      customerAddress: '654 Mall Road, Karachi',
      restaurantName: user?.role === 'admin' ? 'My Restaurant' : 'KFC',
      items: [
        { name: 'Zinger Burger', quantity: 1, price: 700 },
        { name: 'Chicken Wings', quantity: 6, price: 900 },
      ],
      totalAmount: 1600,
      commission: 160,
      paymentMethod: 'Credit Card',
      status: 'pending',
      orderDate: '2024-01-15',
      orderTime: '20:30',
      estimatedDelivery: '21:15',
    },
  ];

  const filterOptions = [
    'All',
    'Pending',
    'Accepted',
    'Preparing',
    'Delivered',
    'Rejected',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setOrders(mockOrders);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color={colors.white} />;
      case 'accepted':
        return <CheckCircle size={16} color={colors.white} />;
      case 'preparing':
        return <Package size={16} color={colors.white} />;
      case 'delivered':
        return <Truck size={16} color={colors.white} />;
      case 'rejected':
        return <XCircle size={16} color={colors.white} />;
      default:
        return <Clock size={16} color={colors.white} />;
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'COD':
        return <DollarSign size={16} color={colors.green} />;
      case 'Credit Card':
        return <CreditCard size={16} color={colors.blue} />;
      case 'Online':
        return <CreditCard size={16} color={colors.primary} />;
      default:
        return <DollarSign size={16} color={colors.gray} />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'All' || order.status === selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleOrderAction = (orderId: string, action: string) => {
    Alert.alert(
      'Order Action',
      `Are you sure you want to ${action} this order?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action,
          onPress: () => {
            setOrders(prev =>
              prev.map(order =>
                order.id === orderId
                  ? { ...order, status: action.toLowerCase() as any }
                  : order,
              ),
            );
            Alert.alert('Success', `Order ${action} successfully!`);
          },
        },
      ],
    );
  };

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderTime}>
            {order.orderDate} • {order.orderTime}
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
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <View style={styles.customerRow}>
          <User size={16} color={colors.gray} />
          <Text style={styles.customerText}>{order.customerName}</Text>
        </View>
        <View style={styles.customerRow}>
          <Phone size={16} color={colors.gray} />
          <Text style={styles.customerText}>{order.customerPhone}</Text>
        </View>
        <View style={styles.customerRow}>
          <MapPin size={16} color={colors.gray} />
          <Text style={styles.customerText} numberOfLines={2}>
            {order.customerAddress}
          </Text>
        </View>
      </View>

      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{order.restaurantName}</Text>
      </View>

      <View style={styles.itemsSection}>
        <Text style={styles.itemsTitle}>Items:</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.itemPrice}>Rs. {item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.paymentInfo}>
          <View style={styles.paymentRow}>
            {getPaymentIcon(order.paymentMethod)}
            <Text style={styles.paymentText}>{order.paymentMethod}</Text>
          </View>
          <Text style={styles.totalAmount}>Rs. {order.totalAmount}</Text>
        </View>
        <View style={styles.commissionInfo}>
          <Text style={styles.commissionText}>
            Commission: Rs. {order.commission}
          </Text>
        </View>
      </View>

      {order.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text style={styles.notesText}>{order.notes}</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            Alert.alert('View Order', 'Order details coming soon!')
          }
        >
          <Eye size={16} color={colors.primary} />
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>

        {order.status === 'pending' && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => handleOrderAction(order.id, 'Accept')}
            >
              <CheckCircle size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleOrderAction(order.id, 'Reject')}
            >
              <XCircle size={16} color={colors.white} />
              <Text style={styles.actionButtonText}>Reject</Text>
            </TouchableOpacity>
          </>
        )}

        {order.status === 'accepted' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.preparingButton]}
            onPress={() => handleOrderAction(order.id, 'Preparing')}
          >
            <Package size={16} color={colors.white} />
            <Text style={styles.actionButtonText}>Start Preparing</Text>
          </TouchableOpacity>
        )}

        {order.status === 'preparing' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.deliveredButton]}
            onPress={() => handleOrderAction(order.id, 'Delivered')}
          >
            <Truck size={16} color={colors.white} />
            <Text style={styles.actionButtonText}>Mark Delivered</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orders</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search and Filter Skeleton */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <SkeletonLoader width="100%" height={50} borderRadius={12} />
            </View>
          </View>

          {/* Orders List Skeleton */}
          <View style={styles.ordersList}>
            {[1, 2, 3, 4, 5].map(item => (
              <View key={item} style={styles.orderCardSkeleton}>
                <SkeletonLoader width="100%" height={200} borderRadius={12} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search orders..."
              placeholderTextColor={colors.gray}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.selectedFilterChipText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Orders List */}
        <View style={styles.ordersList}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              Orders ({filteredOrders.length})
            </Text>
          </View>

          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No orders found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          ) : (
            filteredOrders.map(renderOrderCard)
          )}
        </View>
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
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  filterButton: {
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  selectedFilterChipText: {
    color: colors.white,
  },
  ordersList: {
    marginBottom: 20,
  },
  listHeader: {
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 12,
    color: colors.gray,
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
    color: colors.metallicBlack,
    marginLeft: 8,
    flex: 1,
  },
  restaurantInfo: {
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  itemsSection: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    color: colors.metallicBlack,
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.metallicBlack,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  commissionInfo: {
    alignItems: 'flex-end',
  },
  commissionText: {
    fontSize: 12,
    color: colors.green,
    fontWeight: '600',
  },
  notesSection: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: colors.lighterGray,
    borderRadius: 8,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: colors.gray,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  viewButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: colors.green,
  },
  rejectButton: {
    backgroundColor: colors.red,
  },
  preparingButton: {
    backgroundColor: colors.primary,
  },
  deliveredButton: {
    backgroundColor: colors.blue,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  orderCardSkeleton: {
    marginBottom: 16,
  },
});

export default OrdersScreen;
