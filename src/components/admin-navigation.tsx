import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  Shield,
  BarChart3,
  Store,
  Package,
  User,
  Settings,
  Crown,
} from 'lucide-react-native';
import { colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../routes/param-list';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AdminNavigation = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const { user } = useSelector((state: RootState) => state.auth);

  const adminMenuItems = [
    {
      id: 1,
      title:
        user?.role === 'superadmin'
          ? 'Super Admin Dashboard'
          : 'Admin Dashboard',
      subtitle:
        user?.role === 'superadmin'
          ? 'Full system control'
          : 'Overview & Statistics',
      icon:
        user?.role === 'superadmin' ? (
          <Crown size={24} color={colors.yellow} />
        ) : (
          <BarChart3 size={24} color={colors.primary} />
        ),
      onPress: () =>
        navigation.navigate(
          user?.role === 'superadmin'
            ? 'SuperAdminDashboard'
            : 'AdminDashboard',
        ),
    },
    {
      id: 2,
      title: 'Add Restaurant',
      subtitle: 'Add new restaurant',
      icon: <Store size={24} color={colors.green} />,
      onPress: () => navigation.navigate('AddRestaurant'),
    },
    {
      id: 3,
      title: 'Manage Restaurants',
      subtitle: 'View all restaurants',
      icon: <Store size={24} color={colors.orange} />,
      onPress: () => navigation.navigate('ManageRestaurants'),
    },
    {
      id: 4,
      title: 'Add Product',
      subtitle: 'Add new product',
      icon: <Package size={24} color={colors.blue} />,
      onPress: () => navigation.navigate('AddProduct'),
    },
    {
      id: 5,
      title: 'Manage Products',
      subtitle: 'View all products',
      icon: <Package size={24} color={colors.red} />,
      onPress: () => navigation.navigate('ManageProducts'),
    },
    {
      id: 6,
      title: 'Admin Profile',
      subtitle: 'Admin settings',
      icon: <User size={24} color={colors.gray} />,
      onPress: () => navigation.navigate('AdminProfile'),
    },
  ];

  const handleAdminAccess = () => {
    const dashboardName =
      user?.role === 'superadmin' ? 'Super Admin Dashboard' : 'Admin Dashboard';
    Alert.alert(
      'Admin Access',
      `This will take you to the ${dashboardName.toLowerCase()}. Are you sure you want to continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () =>
            navigation.navigate(
              user?.role === 'superadmin'
                ? 'SuperAdminDashboard'
                : 'AdminDashboard',
            ),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Shield size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>Admin Panel</Text>
      </View>

      <Text style={styles.description}>
        Access admin features to manage restaurants, products, and orders.
      </Text>

      <View style={styles.menuGrid}>
        {adminMenuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.quickAccessButton}
        onPress={handleAdminAccess}
      >
        <BarChart3 size={20} color={colors.white} />
        <Text style={styles.quickAccessText}>Quick Access to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    margin: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 20,
    lineHeight: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {
    width: '48%',
    backgroundColor: colors.lighterGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  menuIcon: {
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    textAlign: 'center',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  quickAccessText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 8,
  },
});

export default AdminNavigation;
