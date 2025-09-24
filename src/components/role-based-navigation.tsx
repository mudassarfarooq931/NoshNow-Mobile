import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MainNavigationProp } from '../routes/param-list';

// Import admin screens
import {
  AdminDashboard,
  AddRestaurant,
  ManageRestaurants,
  AddProduct,
  ManageProducts,
  AdminProfile,
  NotificationScreen,
  EarningsScreen,
  OrdersScreen,
} from '../screens/admin/main';

// Import superadmin screens
import {
  SuperAdminDashboard,
  SuperAdminProfile,
  ManageAdmins,
  AddAdmin,
} from '../screens/superadmin/main';

// Import rider screens
import {
  RiderDashboard,
  RiderProfile,
  RiderOrders,
  RiderEarnings,
} from '../screens/rider/main';

// Import regular app screens
import HomeScreen from '../screens/user/main/home-screen/home-screen';
import CartScreen from '../screens/user/main/cart-screen/cart-screen';
import OrderScreen from '../screens/user/main/order-screen/order-screen';
import ProfileScreen from '../screens/user/main/profile-screen/profile-screen';
import FavoritesScreen from '../screens/user/main/favorites-screen/favorites-screen';
import SearchScreen from '../screens/user/main/search-screen/search-screen';
import RestaurantDetailsScreen from '../screens/user/main/restaurant-details-screen/restaurant-details-screen';
import ProductDetailsScreen from '../screens/user/main/product-details-screen/product-details-screen';
import CheckoutScreen from '../screens/user/main/checkout-screen/checkout-screen';
import OrderSuccessScreen from '../screens/user/main/order-success-screen/order-success-screen';
import TrackOrderScreen from '../screens/user/main/track-order-screen/track-order-screen';

import { colors } from '../constants';
import {
  Home,
  ShoppingCart,
  Clock,
  User,
  Heart,
  Search,
  Store,
  Package,
  Shield,
  Crown,
  Navigation,
  DollarSign,
  List,
} from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Admin Stack Navigator
const AdminStack = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      {user?.role === 'superadmin' ? (
        <Stack.Screen
          name="SuperAdminDashboard"
          component={SuperAdminDashboard}
        />
      ) : (
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      )}
      {user?.role !== 'superadmin' && (
        <>
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ManageProducts" component={ManageProducts} />
        </>
      )}
      {user?.role === 'superadmin' ? (
        <Stack.Screen name="SuperAdminProfile" component={SuperAdminProfile} />
      ) : (
        <Stack.Screen name="AdminProfile" component={AdminProfile} />
      )}
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="EarningsScreen" component={EarningsScreen} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

// Products Stack Navigator (for Products tab)
const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ManageProducts" component={ManageProducts} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};

// Restaurants Stack Navigator (for Restaurants tab)
const RestaurantsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ManageRestaurants" component={ManageRestaurants} />
      <Stack.Screen name="AddRestaurant" component={AddRestaurant} />
    </Stack.Navigator>
  );
};

// Admins Stack Navigator (for Admins tab)
const AdminsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ManageAdmins" component={ManageAdmins} />
      <Stack.Screen name="AddAdmin" component={AddAdmin} />
    </Stack.Navigator>
  );
};

// Rider Stack Navigator
const RiderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="RiderDashboard" component={RiderDashboard} />
      <Stack.Screen name="RiderOrders" component={RiderOrders} />
      <Stack.Screen name="RiderEarnings" component={RiderEarnings} />
    </Stack.Navigator>
  );
};

// Regular App Stack Navigator
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator for Regular Users
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lighterGray,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={AppStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Admin Tab Navigator
const AdminTabNavigator = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lighterGray,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminStack}
        options={{
          tabBarLabel: user?.role === 'superadmin' ? 'Super Admin' : 'Admin',
          tabBarIcon: ({ color, size }) =>
            user?.role === 'superadmin' ? (
              <Crown size={size} color={color} />
            ) : (
              <Shield size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsStack}
        options={{
          tabBarLabel:
            user?.role === 'superadmin' ? 'Restaurants' : 'Restaurant',
          tabBarIcon: ({ color, size }) => <Store size={size} color={color} />,
        }}
      />
      {user?.role !== 'superadmin' && (
        <Tab.Screen
          name="Products"
          component={ProductsStack}
          options={{
            tabBarLabel: 'Products',
            tabBarIcon: ({ color, size }) => (
              <Package size={size} color={color} />
            ),
          }}
        />
      )}
      {user?.role === 'superadmin' && (
        <Tab.Screen
          name="Admins"
          component={AdminsStack}
          options={{
            tabBarLabel: 'Admins',
            tabBarIcon: ({ color, size }) => (
              <Shield size={size} color={color} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={
          user?.role === 'superadmin' ? SuperAdminProfile : AdminProfile
        }
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Rider Tab Navigator
const RiderTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lighterGray,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={RiderStack}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Navigation size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={RiderOrders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Earnings"
        component={RiderEarnings}
        options={{
          tabBarLabel: 'Earnings',
          tabBarIcon: ({ color, size }) => (
            <DollarSign size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={RiderProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Main Role-Based Navigation Component
const RoleBasedNavigation = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Show admin interface for superadmin and admin users
  if (user?.role === 'superadmin' || user?.role === 'admin') {
    return <AdminTabNavigator />;
  }

  // Show rider interface for rider users
  if (user?.role === 'rider') {
    return <RiderTabNavigator />;
  }

  // Show regular app interface for regular users
  return <MainTabNavigator />;
};

export default RoleBasedNavigation;
