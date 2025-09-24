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
  Dimensions,
} from 'react-native';
import {
  Plus,
  Store,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  BarChart3,
  ShoppingCart,
  Clock,
  Star,
  Bell,
  PieChart,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { logout } from '../../../../redux/slice/auth-slice';
import SkeletonLoader from '../../../../components/skeleton-loader';
import { staticRestaurants } from '../../../../constants/static-data';

const { width } = Dimensions.get('window');

const AdminDashboard = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  // Get assigned restaurant data for admin users
  const assignedRestaurant = user?.assignedRestaurant
    ? staticRestaurants.find(r => r.id === user.assignedRestaurant)
    : null;

  const statsData =
    user?.role === 'superadmin'
      ? [
          {
            id: 1,
            title: 'Total Restaurants',
            value: '24',
            change: '+12%',
            icon: <Store size={24} color={colors.primary} />,
            color: colors.primary,
          },
          {
            id: 2,
            title: 'Total Products',
            value: '156',
            change: '+8%',
            icon: <Package size={24} color={colors.green} />,
            color: colors.green,
          },
          {
            id: 3,
            title: 'Total Orders',
            value: '1,234',
            change: '+15%',
            icon: <ShoppingCart size={24} color={colors.orange} />,
            color: colors.orange,
          },
          {
            id: 4,
            title: 'Revenue',
            value: '$12,456',
            change: '+22%',
            icon: <DollarSign size={24} color={colors.blue} />,
            color: colors.blue,
          },
        ]
      : [
          {
            id: 1,
            title: 'My Restaurant',
            value: assignedRestaurant?.name || 'Not Assigned',
            change: assignedRestaurant?.status || 'N/A',
            icon: <Store size={24} color={colors.primary} />,
            color: colors.primary,
          },
          {
            id: 2,
            title: 'Total Products',
            value: '24',
            change: '+5%',
            icon: <Package size={24} color={colors.green} />,
            color: colors.green,
          },
          {
            id: 3,
            title: 'Total Orders',
            value: assignedRestaurant?.totalOrders || '0',
            change: '+8%',
            icon: <ShoppingCart size={24} color={colors.orange} />,
            color: colors.orange,
          },
          {
            id: 4,
            title: 'Revenue',
            value: assignedRestaurant?.revenue || '$0',
            change: '+12%',
            icon: <DollarSign size={24} color={colors.blue} />,
            color: colors.blue,
          },
        ];

  const quickActions =
    user?.role === 'superadmin'
      ? [
          {
            id: 1,
            title: 'Add Restaurant',
            subtitle: 'Add new restaurant',
            icon: <Plus size={28} color={colors.white} />,
            color: '#FF6B6B', // Coral Red
            onPress: () => navigation.navigate('AddRestaurant'),
          },
          {
            id: 2,
            title: 'Manage Restaurants',
            subtitle: 'View all restaurants',
            icon: <Store size={28} color={colors.white} />,
            color: '#4ECDC4', // Teal
            onPress: () => navigation.navigate('ManageRestaurants'),
          },
          {
            id: 3,
            title: 'Add Product',
            subtitle: 'Add new product',
            icon: <Package size={28} color={colors.white} />,
            color: '#45B7D1', // Sky Blue
            onPress: () => navigation.navigate('AddProduct'),
          },
          {
            id: 4,
            title: 'Manage Products',
            subtitle: 'View all products',
            icon: <BarChart3 size={28} color={colors.white} />,
            color: '#96CEB4', // Mint Green
            onPress: () => navigation.navigate('ManageProducts'),
          },
          {
            id: 5,
            title: 'Earnings',
            subtitle: 'View earnings & payments',
            icon: <PieChart size={28} color={colors.white} />,
            color: '#FFEAA7', // Soft Yellow
            onPress: () => navigation.navigate('EarningsScreen'),
          },
          {
            id: 6,
            title: 'Orders',
            subtitle: 'View all orders',
            icon: <ShoppingCart size={28} color={colors.white} />,
            color: '#A29BFE', // Light Purple
            onPress: () => navigation.navigate('OrdersScreen'),
          },
        ]
      : [
          {
            id: 1,
            title: 'My Restaurant',
            subtitle: assignedRestaurant?.name || 'Not Assigned',
            icon: <Store size={28} color={colors.white} />,
            color: '#6C5CE7', // Purple
            onPress: () => navigation.navigate('ManageRestaurants'),
          },
          {
            id: 2,
            title: 'Add Product',
            subtitle: 'Add new product',
            icon: <Package size={28} color={colors.white} />,
            color: '#00B894', // Emerald Green
            onPress: () => navigation.navigate('AddProduct'),
          },
          {
            id: 3,
            title: 'Manage Products',
            subtitle: 'View my products',
            icon: <BarChart3 size={28} color={colors.white} />,
            color: '#FDCB6E', // Orange
            onPress: () => navigation.navigate('ManageProducts'),
          },
          {
            id: 4,
            title: 'Earnings',
            subtitle: 'View earnings & payments',
            icon: <PieChart size={28} color={colors.white} />,
            color: '#E17055', // Coral
            onPress: () => navigation.navigate('EarningsScreen'),
          },
          {
            id: 5,
            title: 'Orders',
            subtitle: 'View all orders',
            icon: <ShoppingCart size={28} color={colors.white} />,
            color: '#A29BFE', // Light Purple
            onPress: () => navigation.navigate('OrdersScreen'),
          },
        ];

  const recentOrders = [
    {
      id: '1',
      restaurant: 'Pizza Palace',
      customer: 'John Doe',
      amount: '$24.50',
      status: 'Delivered',
      time: '2 min ago',
    },
    {
      id: '2',
      restaurant: 'Burger King',
      customer: 'Jane Smith',
      amount: '$18.75',
      status: 'Preparing',
      time: '15 min ago',
    },
    {
      id: '3',
      restaurant: 'Sushi Master',
      customer: 'Mike Johnson',
      amount: '$45.20',
      status: 'On the way',
      time: '30 min ago',
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={120} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          {/* Stats Skeleton */}
          <View style={styles.statsContainer}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.statCardSkeleton}>
                <SkeletonLoader width="100%" height={80} borderRadius={12} />
              </View>
            ))}
          </View>

          {/* Quick Actions Skeleton */}
          <View style={styles.quickActionsSkeleton}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.quickActionSkeleton}>
                <SkeletonLoader width="100%" height={100} borderRadius={12} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back, {user?.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}
            style={styles.notificationButton}
          >
            <Bell size={24} color={colors.white} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={24} color={colors.red} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {statsData.map(stat => (
            <View key={stat.id} style={styles.statCard}>
              <View style={styles.statHeader}>
                {stat.icon}
                <Text style={[styles.statChange, { color: stat.color }]}>
                  {stat.change}
                </Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.quickActionCard,
                  { backgroundColor: action.color },
                ]}
                onPress={action.onPress}
              >
                <View style={styles.quickActionIcon}>{action.icon}</View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>
                  {action.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrdersScreen')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersList}>
            {recentOrders.map(order => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                  <Text style={styles.orderAmount}>{order.amount}</Text>
                </View>
                <View style={styles.orderRight}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          order.status === 'Delivered'
                            ? colors.green
                            : order.status === 'Preparing'
                            ? colors.orange
                            : colors.blue,
                      },
                    ]}
                  >
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                  <Text style={styles.orderTime}>{order.time}</Text>
                </View>
              </View>
            ))}
          </View>
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
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 12,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.red,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickActionIcon: {
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.95,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  ordersList: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  orderInfo: {
    flex: 1,
  },
  orderRestaurant: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.metallicBlack,
    marginBottom: 2,
  },
  orderCustomer: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  orderTime: {
    fontSize: 12,
    color: colors.gray,
  },
  // Skeleton styles
  statCardSkeleton: {
    width: (width - 60) / 2,
    marginBottom: 12,
  },
  quickActionsSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionSkeleton: {
    width: (width - 60) / 2,
    marginBottom: 12,
  },
});

export default AdminDashboard;
