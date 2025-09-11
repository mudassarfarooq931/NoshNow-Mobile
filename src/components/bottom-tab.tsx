import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, List, User, Heart } from 'lucide-react-native';
import React from 'react';
import { HomeScreen, OrderScreen, ProfileScreen } from '../screens';
import FavoritesScreen from '../screens/main/favorites-screen/favorites-screen';
import { colors } from '../constants';

const { Navigator, Screen } = createBottomTabNavigator();

const CustomBottomTab = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          // borderTopWidth: 1,
          // borderTopColor: '#E5E5EA',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Home color={color} size={focused ? 26 : 24} />
          ),
        }}
      />
      <Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused, color, size }) => (
            <List color={color} size={focused ? 26 : 24} />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused, color, size }) => (
            <Heart color={color} size={focused ? 26 : 24} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <User color={color} size={focused ? 26 : 24} />
          ),
        }}
      />
    </Navigator>
  );
};

export default CustomBottomTab;
