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
  Crown,
  BarChart3,
  Store,
  Users,
  Bell,
  HelpCircle,
  Shield,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { logout, updateProfile } from '../../../../redux/slice/auth-slice';
import SkeletonLoader from '../../../../components/skeleton-loader';
import IOSAlert from '../../../../components/ios-alert';

const SuperAdminProfile = () => {
  // Force refresh for white background
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showIOSAlert, setShowIOSAlert] = useState(false);
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

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
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

  const handleSaveProfile = () => {
    // Validate form
    if (!editForm.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!editForm.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // Update profile
    dispatch(updateProfile(editForm));
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditModalVisible(false);
  };

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

  const superAdminStats = [
    {
      id: 1,
      title: 'Total Restaurants',
      value: '24',
      icon: <Store size={24} color={colors.primary} />,
    },
    {
      id: 2,
      title: 'Active Restaurants',
      value: '22',
      icon: <Store size={24} color={colors.green} />,
    },
    {
      id: 3,
      title: 'Total Admins',
      value: '12',
      icon: <Users size={24} color={colors.blue} />,
    },
    {
      id: 4,
      title: 'Active Admins',
      value: '8',
      icon: <Shield size={24} color={colors.orange} />,
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
      title: 'Manage Admins',
      icon: <Users size={24} color={colors.green} />,
      onPress: () => navigation.navigate('Admins'),
    },
    {
      id: 3,
      title: 'System Settings',
      icon: <Settings size={24} color={colors.gray} />,
      onPress: () =>
        Alert.alert('System Settings', 'System settings coming soon!'),
    },
    {
      id: 4,
      title: 'Help & Support',
      icon: <HelpCircle size={24} color={colors.primary} />,
      onPress: () => Alert.alert('Help & Support', 'Help center coming soon!'),
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.profileInfoSkeleton}>
            <SkeletonLoader width={100} height={100} borderRadius={50} />
            <View style={styles.profileDetailsSkeleton}>
              <SkeletonLoader width={150} height={20} />
              <SkeletonLoader width={200} height={16} />
              <SkeletonLoader width={100} height={16} />
            </View>
          </View>
          <View style={styles.statsSkeleton}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.statCardSkeleton}>
                <SkeletonLoader width="100%" height={80} borderRadius={12} />
              </View>
            ))}
          </View>
          <View style={styles.menuItemsSkeleton}>
            {[1, 2, 3, 4].map(item => (
              <View key={item} style={styles.menuItemSkeleton}>
                <View style={styles.menuItemLeftSkeleton}>
                  <SkeletonLoader width={24} height={24} borderRadius={12} />
                  <SkeletonLoader width={120} height={16} />
                </View>
                <SkeletonLoader width={20} height={16} />
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
          <Crown size={24} color={colors.yellow} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Super Admin Profile</Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          style={[
            styles.logoutButton,
            {
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: '#e0e0e0',
              minWidth: 40,
              minHeight: 40,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <LogOut size={24} color={colors.red} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Crown size={40} color={colors.white} />
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Edit3 size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>
            {user?.name || 'Super Admin User'}
          </Text>
          <Text style={styles.userEmail}>
            {user?.email || 'superadmin@noshnow.com'}
          </Text>
          <View style={styles.superAdminBadge}>
            <Text style={styles.superAdminBadgeText}>Super Administrator</Text>
          </View>

          {/* Test iOS Alert Button */}
          <TouchableOpacity
            style={styles.testAlertButton}
            onPress={() => setShowIOSAlert(true)}
          >
            <Text style={styles.testAlertButtonText}>Test Delete Alert</Text>
          </TouchableOpacity>
        </View>

        {/* Super Admin Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Super Admin Statistics</Text>
          <View style={styles.statsGrid}>
            {superAdminStats.map(stat => (
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
                {user?.email || 'superadmin@noshnow.com'}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Phone size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>
                {user?.phone || '+92 300 0000000'}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>
                {user?.address || '123 Super Admin Street, Karachi'}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Super Admin Panel</Text>
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
          <Text style={styles.versionText}>NoshNow Super Admin v1.0.0</Text>
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

      {/* iOS Alert Component */}
      <IOSAlert
        visible={showIOSAlert}
        title="Do you want to delete this Account?"
        message="You cannot undo this action"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          console.log('Account deleted');
        }}
        onCancel={() => {
          console.log('Delete cancelled');
        }}
        onClose={() => setShowIOSAlert(false)}
      />
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
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
  superAdminBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  superAdminBadgeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: 'bold',
  },
  testAlertButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  testAlertButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
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

export default SuperAdminProfile;
