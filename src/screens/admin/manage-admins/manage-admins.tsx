import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Store,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { staticUsers, staticRestaurants } from '../../../constants/static-data';
import SkeletonLoader from '../../../components/skeleton-loader';

const { width } = Dimensions.get('window');

const ManageAdmins = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all admin users (excluding superadmin)
  const adminUsers = staticUsers.filter(u => u.role === 'admin');

  const [filteredAdmins, setFilteredAdmins] = useState(adminUsers);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = adminUsers.filter(
      admin =>
        admin.name.toLowerCase().includes(query.toLowerCase()) ||
        admin.email.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredAdmins(filtered);
  };

  const handleAddAdmin = () => {
    navigation.navigate('AddAdmin');
  };

  const handleEditAdmin = (adminId: string) => {
    Alert.alert(
      'Edit Admin',
      `Edit admin ${adminId} functionality coming soon!`,
    );
  };

  const handleDeleteAdmin = (adminId: string, adminName: string) => {
    Alert.alert(
      'Delete Admin',
      `Are you sure you want to delete ${adminName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Admin deleted successfully!');
          },
        },
      ],
    );
  };

  const handleViewAdmin = (adminId: string) => {
    Alert.alert('View Admin', `View admin ${adminId} details coming soon!`);
  };

  const getAssignedRestaurant = (adminId: string) => {
    const restaurant = staticRestaurants.find(r => r.adminId === adminId);
    return restaurant ? restaurant.name : 'Not Assigned';
  };

  const getAdminStats = (adminId: string) => {
    const restaurant = staticRestaurants.find(r => r.adminId === adminId);
    return {
      totalOrders: restaurant?.totalOrders || 0,
      revenue: restaurant?.revenue || '$0',
    };
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={30} height={30} borderRadius={15} />
          <SkeletonLoader width={120} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.adminCardSkeleton}>
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
        <Text style={styles.headerTitle}>Manage Admins</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddAdmin}>
          <Plus size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search admins..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{adminUsers.length}</Text>
            <Text style={styles.statLabel}>Total Admins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {staticRestaurants.filter(r => r.adminId).length}
            </Text>
            <Text style={styles.statLabel}>Assigned Restaurants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {staticRestaurants.filter(r => !r.adminId).length}
            </Text>
            <Text style={styles.statLabel}>Unassigned</Text>
          </View>
        </View>

        {/* Admins List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Users</Text>
          {filteredAdmins.length === 0 ? (
            <View style={styles.emptyState}>
              <User size={48} color={colors.gray} />
              <Text style={styles.emptyTitle}>No Admins Found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'No admin users available'}
              </Text>
            </View>
          ) : (
            filteredAdmins.map(admin => {
              const stats = getAdminStats(admin.id);
              return (
                <View key={admin.id} style={styles.adminCard}>
                  <View style={styles.adminHeader}>
                    <View style={styles.adminInfo}>
                      <View style={styles.adminAvatar}>
                        <User size={24} color={colors.primary} />
                      </View>
                      <View style={styles.adminDetails}>
                        <Text style={styles.adminName}>{admin.name}</Text>
                        <Text style={styles.adminEmail}>{admin.email}</Text>
                        <View style={styles.adminRole}>
                          <Shield size={12} color={colors.primary} />
                          <Text style={styles.roleText}>Admin</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreVertical size={20} color={colors.gray} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.adminContent}>
                    <View style={styles.adminStats}>
                      <View style={styles.statItem}>
                        <Store size={16} color={colors.green} />
                        <Text style={styles.statText}>
                          {getAssignedRestaurant(admin.id)}
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>
                          {stats.totalOrders}
                        </Text>
                        <Text style={styles.statLabel}>Orders</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.revenue}</Text>
                        <Text style={styles.statLabel}>Revenue</Text>
                      </View>
                    </View>

                    <View style={styles.adminActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.viewButton]}
                        onPress={() => handleViewAdmin(admin.id)}
                      >
                        <Eye size={16} color={colors.blue} />
                        <Text
                          style={[styles.actionText, { color: colors.blue }]}
                        >
                          View
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEditAdmin(admin.id)}
                      >
                        <Edit3 size={16} color={colors.orange} />
                        <Text
                          style={[styles.actionText, { color: colors.orange }]}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteAdmin(admin.id, admin.name)}
                      >
                        <Trash2 size={16} color={colors.red} />
                        <Text
                          style={[styles.actionText, { color: colors.red }]}
                        >
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
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
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  adminCard: {
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
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  adminAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  adminDetails: {
    flex: 1,
  },
  adminName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 2,
  },
  adminEmail: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  adminRole: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
  },
  adminContent: {
    marginTop: 8,
  },
  adminStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  adminActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: colors.lighterBlue,
  },
  editButton: {
    backgroundColor: colors.lighterOrange,
  },
  deleteButton: {
    backgroundColor: colors.lighterRed,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  // Skeleton styles
  adminCardSkeleton: {
    marginBottom: 12,
  },
});

export default ManageAdmins;
