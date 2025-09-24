// User screens (auth and main)
import {
  LoginScreen,
  SignupScreen,
  WelcomeScreen,
  CartScreen,
  HomeScreen,
  OrderScreen,
  ProfileScreen,
  FavoritesScreen,
  SearchScreen,
  RestaurantDetailsScreen,
  ProductDetailsScreen,
  CheckoutScreen,
  OrderSuccessScreen,
  TrackOrderScreen,
  LocationScreen,
  MapScreen,
} from './user';

// Admin screens
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
} from './admin';

// SuperAdmin screens
import {
  SuperAdminDashboard,
  SuperAdminProfile,
  ManageAdmins,
  AddAdmin,
} from './superadmin';

// Rider screens
import {
  RiderDashboard,
  RiderProfile,
  RiderOrders,
  RiderEarnings,
} from './rider';

export {
  // User auth exports
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  LocationScreen,
  MapScreen,
  // User main exports
  HomeScreen,
  CartScreen,
  OrderScreen,
  ProfileScreen,
  FavoritesScreen,
  SearchScreen,
  RestaurantDetailsScreen,
  ProductDetailsScreen,
  CheckoutScreen,
  OrderSuccessScreen,
  TrackOrderScreen,
  // Admin exports
  AdminDashboard,
  AddRestaurant,
  ManageRestaurants,
  AddProduct,
  ManageProducts,
  AdminProfile,
  NotificationScreen,
  EarningsScreen,
  OrdersScreen,
  // SuperAdmin exports
  SuperAdminDashboard,
  SuperAdminProfile,
  ManageAdmins,
  AddAdmin,
  // Rider exports
  RiderDashboard,
  RiderProfile,
  RiderOrders,
  RiderEarnings,
};
