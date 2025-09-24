import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Switch,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logout } from '../../../redux/slice/auth-slice';
import { colors } from '../../../constants';
import {
  User,
  Phone,
  MapPin,
  Mail,
  Settings,
  Edit3,
  Save,
  X,
  Shield,
  Clock,
  DollarSign,
  Star,
  Package,
  Navigation,
} from 'lucide-react-native';
import { riderStats } from '../../../constants/static-data';

const RiderProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    vehicleType: 'Motorcycle',
    licenseNumber: 'KHI-2024-001',
  });

  const handleSave = () => {
    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully',
    );
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      vehicleType: 'Motorcycle',
      licenseNumber: 'KHI-2024-001',
    });
    setIsEditing(false);
  };

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    Alert.alert(
      isOnline ? 'Go Offline' : 'Go Online',
      isOnline
        ? 'You will stop receiving new delivery requests'
        : 'You are now available for deliveries',
    );
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <X size={20} color={colors.white} />
          ) : (
            <Edit3 size={20} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color={colors.primary} />
            </View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.role}>Rider</Text>
          </View>

          {/* Online Status */}
          <View style={styles.statusContainer}>
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
              trackColor={{ false: colors.lighterGray, true: colors.primary }}
              thumbColor={isOnline ? colors.white : colors.gray}
            />
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <User size={20} color={colors.gray} />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.name}
                onChangeText={text =>
                  setProfileData({ ...profileData, name: text })
                }
                editable={isEditing}
                placeholder="Enter your full name"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color={colors.gray} />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.email}
                onChangeText={text =>
                  setProfileData({ ...profileData, email: text })
                }
                editable={isEditing}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color={colors.gray} />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.phone}
                onChangeText={text =>
                  setProfileData({ ...profileData, phone: text })
                }
                editable={isEditing}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color={colors.gray} />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.address}
                onChangeText={text =>
                  setProfileData({ ...profileData, address: text })
                }
                editable={isEditing}
                placeholder="Enter your address"
                multiline
              />
            </View>
          </View>
        </View>

        {/* Vehicle Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehicle Type</Text>
            <View style={styles.inputContainer}>
              <Navigation size={20} color={colors.gray} />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.vehicleType}
                onChangeText={text =>
                  setProfileData({ ...profileData, vehicleType: text })
                }
                editable={isEditing}
                placeholder="Enter vehicle type"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>License Number</Text>
            <View style={styles.inputContainer}>
              <Shield size={20} color={colors.gray} />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={profileData.licenseNumber}
                onChangeText={text =>
                  setProfileData({ ...profileData, licenseNumber: text })
                }
                editable={isEditing}
                placeholder="Enter license number"
              />
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <DollarSign size={24} color={colors.primary} />
              <Text style={styles.statValue}>${riderStats.totalEarnings}</Text>
              <Text style={styles.statLabel}>Total Earnings</Text>
            </View>

            <View style={styles.statItem}>
              <Package size={24} color={colors.success} />
              <Text style={styles.statValue}>{riderStats.totalDeliveries}</Text>
              <Text style={styles.statLabel}>Total Deliveries</Text>
            </View>

            <View style={styles.statItem}>
              <Star size={24} color={colors.warning} />
              <Text style={styles.statValue}>{riderStats.averageRating}</Text>
              <Text style={styles.statLabel}>Average Rating</Text>
            </View>

            <View style={styles.statItem}>
              <Clock size={24} color={colors.info} />
              <Text style={styles.statValue}>{riderStats.completedToday}</Text>
              <Text style={styles.statLabel}>Today's Deliveries</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={16} color={colors.white} />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: colors.gray,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  section: {
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.black,
  },
  inputDisabled: {
    color: colors.gray,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.lighterGray,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutSection: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RiderProfile;
