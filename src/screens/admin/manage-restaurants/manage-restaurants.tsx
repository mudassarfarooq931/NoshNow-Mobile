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
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Plus,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import SkeletonLoader from '../../../components/skeleton-loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { staticRestaurants } from '../../../constants/static-data';

const { width } = Dimensions.get('window');

const ManageRestaurants = () => {
  const navigation = useNavigation<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter restaurants based on user role
  const getFilteredRestaurants = () => {
    if (user?.role === 'superadmin') {
      return staticRestaurants;
    } else if (user?.role === 'admin' && user?.assignedRestaurant) {
      return staticRestaurants.filter(r => r.id === user.assignedRestaurant);
    }
    return [];
  };

  const [restaurants, setRestaurants] = useState(getFilteredRestaurants());

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

  const handleEditRestaurant = (restaurant: any) => {
    Alert.alert('Edit Restaurant', `Edit ${restaurant.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Edit', onPress: () => console.log('Edit restaurant') },
    ]);
  };

  const handleDeleteRestaurant = (restaurant: any) => {
    Alert.alert(
      'Delete Restaurant',
      `Are you sure you want to delete ${restaurant.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRestaurants(prev => prev.filter(r => r.id !== restaurant.id));
            Alert.alert('Success', 'Restaurant deleted successfully!');
          },
        },
      ],
    );
  };

  const handleViewRestaurant = (restaurant: any) => {
    Alert.alert('View Restaurant', `View details for ${restaurant.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'View', onPress: () => console.log('View restaurant') },
    ]);
  };

  const handleToggleStatus = (restaurant: any) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === restaurant.id
          ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' }
          : r,
      ),
    );
  };

  const renderRestaurantCard = (restaurant: any) => (
    <View key={restaurant.id} style={styles.restaurantCard}>
      <View style={styles.restaurantHeader}>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
        </View>
        <View style={styles.restaurantActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleViewRestaurant(restaurant)}
          >
            <Eye size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditRestaurant(restaurant)}
          >
            <Edit3 size={18} color={colors.orange} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteRestaurant(restaurant)}
          >
            <Trash2 size={18} color={colors.red} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.restaurantDetails}>
        <View style={styles.detailRow}>
          <Star size={16} color={colors.orange} />
          <Text style={styles.detailText}>{restaurant.rating}</Text>
          <Clock size={16} color={colors.gray} style={styles.detailIcon} />
          <Text style={styles.detailText}>{restaurant.deliveryTime}</Text>
        </View>

        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.gray} />
          <Text style={styles.detailText} numberOfLines={1}>
            {restaurant.address}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Phone size={16} color={colors.gray} />
          <Text style={styles.detailText}>{restaurant.phone}</Text>
        </View>
      </View>

      <View style={styles.restaurantStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{restaurant.totalOrders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{restaurant.revenue}</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {
              backgroundColor:
                restaurant.status === 'Active' ? colors.green : colors.red,
            },
          ]}
          onPress={() => handleToggleStatus(restaurant)}
        >
          <Text style={styles.statusText}>{restaurant.status}</Text>
        </TouchableOpacity>
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
          {[1, 2, 3, 4].map(item => (
            <View key={item} style={styles.restaurantCardSkeleton}>
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
        <Text style={styles.headerTitle}>
          {user?.role === 'superadmin' ? 'Manage Restaurants' : 'My Restaurant'}
        </Text>
        {user?.role === 'superadmin' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddRestaurant')}
          >
            <Plus size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Restaurants List */}
        <View style={styles.restaurantsList}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              {user?.role === 'superadmin' ? 'Restaurants' : 'My Restaurant'} (
              {restaurants.length})
            </Text>
          </View>

          {restaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No restaurants found</Text>
              <Text style={styles.emptyStateSubtext}>
                {user?.role === 'superadmin'
                  ? 'No restaurants available'
                  : 'No restaurant assigned to you'}
              </Text>
            </View>
          ) : (
            restaurants.map(renderRestaurantCard)
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
    fontSize: 18,
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
  restaurantsList: {
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
  restaurantCard: {
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
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  restaurantCategory: {
    fontSize: 14,
    color: colors.gray,
  },
  restaurantActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: colors.lighterGray,
  },
  restaurantDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
    flex: 1,
  },
  detailIcon: {
    marginLeft: 16,
  },
  restaurantStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  restaurantCardSkeleton: {
    marginBottom: 12,
  },
});

export default ManageRestaurants;
