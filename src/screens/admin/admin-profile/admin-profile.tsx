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
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  LogOut,
  Settings,
  Shield,
  BarChart3,
  Store,
  Package,
  Users,
  Bell,
  HelpCircle,
  DollarSign,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logout, updateProfile } from '../../../redux/slice/auth-slice';
import SkeletonLoader from '../../../components/skeleton-loader';

const AdminProfile = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Simulate loading
  React.useEffect(() => {
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

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    dispatch(updateProfile(editForm));
    setIsEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditModalVisible(false);
  };

  const adminStats =
    user?.role === 'superadmin'
      ? [
          {
            id: 1,
            title: 'Total Restaurants',
            value: '24',
            icon: <Store size={24} color={colors.primary} />,
          },
          {
            id: 2,
            title: 'Total Admins',
            value: '8',
            icon: <Users size={24} color={colors.green} />,
          },
        ]
      : [
          {
            id: 1,
            title: 'Total Restaurants',
            value: '24',
            icon: <Store size={24} color={colors.primary} />,
          },
          {
            id: 2,
            title: 'Total Products',
            value: '156',
            icon: <Package size={24} color={colors.green} />,
          },
          {
            id: 3,
            title: 'Total Orders',
            value: '1,234',
            icon: <BarChart3 size={24} color={colors.orange} />,
          },
          {
            id: 4,
            title: 'Total Revenue',
            value: '$12,456',
            icon: <Users size={24} color={colors.blue} />,
          },
        ];

  const menuItems = [
    {
      id: 1,
      title: 'Dashboard',
      icon: <BarChart3 size={24} color={colors.primary} />,
      onPress: () => navigation.navigate('Dashboard'),
    },
    {
      id: 2,
      title: 'Manage Restaurants',
      icon: <Store size={24} color={colors.green} />,
      onPress: () => navigation.navigate('Restaurants'),
    },
    // Only show Manage Products for admin users, not superadmin
    ...(user?.role !== 'superadmin'
      ? [
          {
            id: 3,
            title: 'Manage Products',
            icon: <Package size={24} color={colors.orange} />,
            onPress: () => navigation.navigate('Products'),
          },
        ]
      : []),
    // Only show Notifications and Earnings for admin users, not superadmin
    ...(user?.role !== 'superadmin'
      ? [
          {
            id: 4,
            title: 'Notifications',
            icon: <Bell size={24} color={colors.primary} />,
            onPress: () => {
              // Navigate to Dashboard tab first, then to NotificationScreen
              navigation.navigate('Dashboard', {
                screen: 'NotificationScreen',
              });
            },
          },
          {
            id: 5,
            title: 'Earnings',
            icon: <DollarSign size={24} color={colors.green} />,
            onPress: () => {
              // Navigate to Dashboard tab first, then to EarningsScreen
              navigation.navigate('Dashboard', { screen: 'EarningsScreen' });
            },
          },
        ]
      : []),
    {
      id: 6,
      title: 'Settings',
      icon: <Settings size={24} color={colors.gray} />,
      onPress: () => Alert.alert('Settings', 'Settings feature coming soon!'),
    },
    {
      id: 7,
      title: 'Help & Support',
      icon: <HelpCircle size={24} color={colors.primary} />,
      onPress: () => Alert.alert('Help & Support', 'Help center coming soon!'),
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={100} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          {/* Profile Info Skeleton */}
          <View style={styles.profileInfoSkeleton}>
            <SkeletonLoader width={100} height={100} borderRadius={50} />
            <View style={styles.profileDetailsSkeleton}>
              <SkeletonLoader
                width="80%"
                height={24}
                style={{ marginBottom: 8 }}
              />
              <SkeletonLoader
                width="60%"
                height={16}
                style={{ marginBottom: 4 }}
              />
              <SkeletonLoader width="70%" height={16} />
            </View>
            <SkeletonLoader width={100} height={35} borderRadius={18} />
          </View>

          {/* Stats Skeleton */}
          <View style={styles.statsSkeleton}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.statCardSkeleton}>
                <SkeletonLoader width="100%" height={80} borderRadius={12} />
              </View>
            ))}
          </View>

          {/* Menu Items Skeleton */}
          <View style={styles.menuItemsSkeleton}>
            {[1, 2, 3, 4, 5, 6].map(item => (
              <View key={item} style={styles.menuItemSkeleton}>
                <View style={styles.menuItemLeftSkeleton}>
                  <SkeletonLoader width={24} height={24} borderRadius={12} />
                  <SkeletonLoader
                    width="70%"
                    height={18}
                    style={{ marginLeft: 15 }}
                  />
                </View>
                <SkeletonLoader width={20} height={20} borderRadius={10} />
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
        <Text style={styles.headerTitle}>Admin Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={24} color={colors.red} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Shield size={40} color={colors.white} />
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Edit3 size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'Admin User'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'admin@noshnow.com'}
          </Text>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Administrator</Text>
          </View>
        </View>

        {/* Admin Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Admin Statistics</Text>
          <View style={styles.statsGrid}>
            {adminStats.map(stat => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statIcon}>{stat.icon}</View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* User Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.detailRow}>
            <Mail size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>
                {user?.email || 'admin@noshnow.com'}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Phone size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>
                {user?.phone || '+92 300 1234567'}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>
                {user?.address || '123 Admin Street, Karachi'}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Admin Panel</Text>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>NoshNow Admin v1.0.0</Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelEdit}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={editForm.name}
                  onChangeText={text =>
                    setEditForm(prev => ({ ...prev, name: text }))
                  }
                  placeholder="Enter your name"
                  placeholderTextColor={colors.gray}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={editForm.email}
                  onChangeText={text =>
                    setEditForm(prev => ({ ...prev, email: text }))
                  }
                  placeholder="Enter your email"
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={editForm.phone}
                  onChangeText={text =>
                    setEditForm(prev => ({ ...prev, phone: text }))
                  }
                  placeholder="Enter your phone"
                  placeholderTextColor={colors.gray}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={editForm.address}
                  onChangeText={text =>
                    setEditForm(prev => ({ ...prev, address: text }))
                  }
                  placeholder="Enter your address"
                  placeholderTextColor={colors.gray}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  logoutButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 10,
  },
  adminBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  adminBadgeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: 'bold',
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  detailsSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  menuSection: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.metallicBlack,
    marginLeft: 15,
  },
  menuItemArrow: {
    fontSize: 20,
    color: colors.gray,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: colors.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    flex: 1,
  },
  modalScrollView: {
    flex: 1,
    maxHeight: '70%',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.gray,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  // Skeleton styles
  profileInfoSkeleton: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileDetailsSkeleton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statsSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCardSkeleton: {
    width: '48%',
    marginBottom: 12,
  },
  menuItemsSkeleton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  menuItemLeftSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default AdminProfile;
