import { useNavigation } from '@react-navigation/native';
import {
  BarChart3,
  Crown,
  LogOut,
  Shield,
  Store,
  UserCheck,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoader from '../../../../components/skeleton-loader';
import { colors } from '../../../../constants';
import { logout } from '../../../../redux/slice/auth-slice';
import { RootState } from '../../../../redux/store';

const { width } = Dimensions.get('window');

const SuperAdminDashboard = () => {
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

  const statsData = [
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
      title: 'Active Restaurants',
      value: '22',
      change: '+2',
      icon: <Store size={24} color={colors.green} />,
      color: colors.green,
    },
    {
      id: 3,
      title: 'Total Admins',
      value: '12',
      change: '+3',
      icon: <UserCheck size={24} color={colors.blue} />,
      color: colors.blue,
    },
    {
      id: 4,
      title: 'Active Admins',
      value: '8',
      change: '+2',
      icon: <UserCheck size={24} color={colors.orange} />,
      color: colors.orange,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Manage Admins',
      subtitle: 'Add/Remove admins',
      icon: <Shield size={28} color={colors.white} />,
      color: colors.primary,
      onPress: () => navigation.navigate('Admins'),
    },
    {
      id: 2,
      title: 'Manage Restaurants',
      subtitle: 'Add & manage restaurants',
      icon: <Store size={28} color={colors.white} />,
      color: colors.green,
      onPress: () => navigation.navigate('Restaurants'),
    },
    {
      id: 3,
      title: 'Analytics',
      subtitle: 'View detailed analytics',
      icon: <BarChart3 size={28} color={colors.white} />,
      color: colors.orange,
      onPress: () => Alert.alert('Analytics', 'Analytics coming soon!'),
    },
    {
      id: 4,
      title: 'User Management',
      subtitle: 'Manage all users',
      icon: <UserCheck size={28} color={colors.white} />,
      color: colors.blue,
      onPress: () =>
        Alert.alert('User Management', 'User management coming soon!'),
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
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Crown size={24} color={colors.yellow} style={styles.crownIcon} />
          <View>
            <Text style={styles.headerTitle}>Super Admin Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              Welcome back, {user?.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={24} color={colors.red} />
        </TouchableOpacity>
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

        {/* Super Admin Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Super Admin Controls</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crownIcon: {
    marginRight: 10,
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
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
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
    borderRadius: 12,
    padding: 20,
    width: (width - 60) / 2,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  // Skeleton styles
  statCardSkeleton: {
    width: (width - 60) / 2,
    marginBottom: 12,
  },
});

export default SuperAdminDashboard;
