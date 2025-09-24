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
} from 'react-native';
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Banknote,
  Smartphone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import SkeletonLoader from '../../../../components/skeleton-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const { width } = Dimensions.get('window');

const EarningsScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All'); // All, Today, Week, Month
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All'); // All, COD, Credit Card, etc.

  // Sample earnings data
  const [earningsData, setEarningsData] = useState({
    totalEarnings: 12456.78,
    todayEarnings: 234.5,
    weeklyEarnings: 1890.25,
    monthlyEarnings: 5678.9,
    totalOrders: 156,
    acceptedOrders: 142,
    rejectedOrders: 14,
    averageOrderValue: 79.85,
  });

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      restaurant: 'Pizza Palace',
      amount: 28.97,
      paymentMethod: 'Credit Card',
      status: 'completed',
      date: '2024-01-15',
      time: '14:30',
      items: ['Margherita Pizza', 'Coca Cola'],
      commission: 2.9,
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      restaurant: 'Burger King',
      amount: 15.99,
      paymentMethod: 'COD',
      status: 'completed',
      date: '2024-01-15',
      time: '13:45',
      items: ['Chicken Burger', 'French Fries'],
      commission: 1.6,
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      restaurant: 'Sushi Master',
      amount: 45.2,
      paymentMethod: 'Digital Wallet',
      status: 'completed',
      date: '2024-01-15',
      time: '12:15',
      items: ['California Roll', 'Miso Soup'],
      commission: 4.52,
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      restaurant: 'Pizza Palace',
      amount: 32.5,
      paymentMethod: 'Credit Card',
      status: 'rejected',
      date: '2024-01-14',
      time: '19:20',
      items: ['Pepperoni Pizza', 'Garlic Bread'],
      commission: 0,
    },
    {
      id: 'ORD-005',
      customer: 'David Brown',
      restaurant: 'Burger King',
      amount: 22.75,
      paymentMethod: 'COD',
      status: 'completed',
      date: '2024-01-14',
      time: '18:30',
      items: ['Beef Burger', 'Onion Rings'],
      commission: 2.28,
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard size={16} color={colors.primary} />;
      case 'COD':
        return <Banknote size={16} color={colors.green} />;
      case 'Digital Wallet':
        return <Smartphone size={16} color={colors.blue} />;
      default:
        return <DollarSign size={16} color={colors.gray} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.green;
      case 'rejected':
        return colors.red;
      case 'pending':
        return colors.orange;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color={colors.green} />;
      case 'rejected':
        return <XCircle size={16} color={colors.red} />;
      case 'pending':
        return <Clock size={16} color={colors.orange} />;
      default:
        return <Clock size={16} color={colors.gray} />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter =
      selectedFilter === 'All' ||
      (selectedFilter === 'Today' && order.date === '2024-01-15') ||
      (selectedFilter === 'Week' && order.date >= '2024-01-09') ||
      (selectedFilter === 'Month' && order.date >= '2024-01-01');

    const matchesPayment =
      selectedPaymentMethod === 'All' ||
      order.paymentMethod === selectedPaymentMethod;

    return matchesFilter && matchesPayment;
  });

  const renderStatsCard = (
    title: string,
    value: string,
    change: string,
    isPositive: boolean,
    icon: any,
  ) => (
    <View style={styles.statsCard}>
      <View style={styles.statsHeader}>
        {icon}
        <View style={styles.changeContainer}>
          {isPositive ? (
            <TrendingUp size={16} color={colors.green} />
          ) : (
            <TrendingDown size={16} color={colors.red} />
          )}
          <Text
            style={[
              styles.changeText,
              { color: isPositive ? colors.green : colors.red },
            ]}
          >
            {change}
          </Text>
        </View>
      </View>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </View>
  );

  const renderOrderCard = (order: any) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.customerName}>{order.customer}</Text>
          <Text style={styles.restaurantName}>{order.restaurant}</Text>
        </View>
        <View style={styles.orderRight}>
          <Text style={styles.orderAmount}>${order.amount.toFixed(2)}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon(order.status)}
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(order.status) },
              ]}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Calendar size={14} color={colors.gray} />
          <Text style={styles.detailText}>
            {order.date} at {order.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          {getPaymentMethodIcon(order.paymentMethod)}
          <Text style={styles.detailText}>{order.paymentMethod}</Text>
        </View>
        <View style={styles.detailRow}>
          <DollarSign size={14} color={colors.primary} />
          <Text style={styles.detailText}>
            Commission: ${order.commission.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>Items:</Text>
        <Text style={styles.itemsText}>{order.items.join(', ')}</Text>
      </View>
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
          <View style={styles.statsContainer}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.statsCardSkeleton}>
                <SkeletonLoader width="100%" height={80} borderRadius={12} />
              </View>
            ))}
          </View>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.orderCardSkeleton}>
              <SkeletonLoader width="100%" height={120} borderRadius={12} />
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Earnings & Payments</Text>
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {renderStatsCard(
            'Total Earnings',
            `$${earningsData.totalEarnings.toFixed(2)}`,
            '+12.5%',
            true,
            <DollarSign size={24} color={colors.primary} />,
          )}
          {renderStatsCard(
            "Today's Earnings",
            `$${earningsData.todayEarnings.toFixed(2)}`,
            '+8.2%',
            true,
            <TrendingUp size={24} color={colors.green} />,
          )}
          {renderStatsCard(
            'Total Orders',
            earningsData.totalOrders.toString(),
            '+15.3%',
            true,
            <CheckCircle size={24} color={colors.blue} />,
          )}
          {renderStatsCard(
            'Avg Order Value',
            `$${earningsData.averageOrderValue.toFixed(2)}`,
            '+5.7%',
            true,
            <TrendingUp size={24} color={colors.orange} />,
          )}
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Accepted:</Text>
              <Text style={[styles.summaryValue, { color: colors.green }]}>
                {earningsData.acceptedOrders}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Rejected:</Text>
              <Text style={[styles.summaryValue, { color: colors.red }]}>
                {earningsData.rejectedOrders}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Success Rate:</Text>
              <Text style={[styles.summaryValue, { color: colors.primary }]}>
                {(
                  (earningsData.acceptedOrders / earningsData.totalOrders) *
                  100
                ).toFixed(1)}
                %
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Payment Methods</Text>
            <View style={styles.paymentMethodRow}>
              <CreditCard size={16} color={colors.primary} />
              <Text style={styles.paymentMethodText}>Credit Card: 45%</Text>
            </View>
            <View style={styles.paymentMethodRow}>
              <Banknote size={16} color={colors.green} />
              <Text style={styles.paymentMethodText}>COD: 35%</Text>
            </View>
            <View style={styles.paymentMethodRow}>
              <Smartphone size={16} color={colors.blue} />
              <Text style={styles.paymentMethodText}>Digital Wallet: 20%</Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Time Period:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', 'Today', 'Week', 'Month'].map(period => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.filterButton,
                    selectedFilter === period && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedFilter(period)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedFilter === period &&
                        styles.filterButtonTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Payment Method:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', 'Credit Card', 'COD', 'Digital Wallet'].map(method => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.filterButton,
                    selectedPaymentMethod === method &&
                      styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedPaymentMethod(method)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedPaymentMethod === method &&
                        styles.filterButtonTextActive,
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Orders List */}
        <View style={styles.ordersSection}>
          <View style={styles.ordersHeader}>
            <Text style={styles.ordersTitle}>
              Recent Orders ({filteredOrders.length})
            </Text>
            <TouchableOpacity style={styles.filterIcon}>
              <Filter size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {filteredOrders.map(renderOrderCard)}
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
    padding: 5,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  downloadButton: {
    padding: 5,
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
    marginBottom: 20,
  },
  statsCard: {
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
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    color: colors.gray,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentMethodText: {
    fontSize: 14,
    color: colors.metallicBlack,
    marginLeft: 8,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  ordersSection: {
    marginBottom: 20,
  },
  ordersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ordersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  filterIcon: {
    padding: 5,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  restaurantName: {
    fontSize: 12,
    color: colors.gray,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 8,
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    paddingTop: 12,
  },
  itemsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  itemsText: {
    fontSize: 12,
    color: colors.gray,
  },
  // Skeleton styles
  statsCardSkeleton: {
    width: (width - 60) / 2,
    marginBottom: 12,
  },
  orderCardSkeleton: {
    marginBottom: 12,
  },
});

export default EarningsScreen;
