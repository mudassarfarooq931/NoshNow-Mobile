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
  Heart,
  CreditCard,
  HelpCircle,
  Shield,
  Bell,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logout, updateProfile } from '../../../redux/slice/auth-slice';

const ProfileScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          // Navigation will be handled by the auth state change
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

  const menuItems = [
    {
      id: 1,
      title: 'My Orders',
      icon: <CreditCard size={24} color={colors.primary} />,
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: 2,
      title: 'Favorites',
      icon: <Heart size={24} color={colors.red} />,
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      id: 3,
      title: 'Notifications',
      icon: <Bell size={24} color={colors.orange} />,
      onPress: () =>
        Alert.alert('Notifications', 'Notification settings coming soon!'),
    },
    {
      id: 4,
      title: 'Settings',
      icon: <Settings size={24} color={colors.gray} />,
      onPress: () => Alert.alert('Settings', 'Settings feature coming soon!'),
    },
    {
      id: 5,
      title: 'Help & Support',
      icon: <HelpCircle size={24} color={colors.blue} />,
      onPress: () => Alert.alert('Help & Support', 'Help center coming soon!'),
    },
    {
      id: 6,
      title: 'Privacy Policy',
      icon: <Shield size={24} color={colors.green} />,
      onPress: () =>
        Alert.alert('Privacy Policy', 'Privacy policy coming soon!'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={24} color={colors.red} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color={colors.white} />
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Edit3 size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        {/* User Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Mail size={20} color={colors.gray} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>
                {user?.email || 'user@example.com'}
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
                {user?.address || '123 Main Street, Karachi'}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
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
          <Text style={styles.versionText}>NoshNow v1.0.0</Text>
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
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
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
  },
  detailsSection: {
    backgroundColor: colors.lighterGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
});

export default ProfileScreen;
