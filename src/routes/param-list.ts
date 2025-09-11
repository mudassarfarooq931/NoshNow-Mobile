import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//------------------------------
export type AuthNavParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  LocationScreen: undefined;
  MapScreen: { type: string };
};

export type AuthRouteProp<T extends keyof AuthNavParamList> = RouteProp<
  AuthNavParamList,
  T
>;
export type AuthNavigationProp<T extends keyof AuthNavParamList> =
  NativeStackNavigationProp<AuthNavParamList, T>;

//------------------------------
export type MainNavParamList = {
  BottomTabNav: undefined;
  ProductDetails: {
    product: {
      id: string;
      title: string;
      price: number;
      description: string;
      image: any;
      category: string;
    };
  };
  Cart: undefined;
  Checkout: undefined;
  OrderSuccess: {
    orderDetails: {
      orderId: string;
      items: any[];
      deliveryAddress: string;
      phone: string;
      paymentMethod: string;
      subtotal: number;
      deliveryFee: number;
      total: number;
    };
  };
  TrackOrder: {
    orderId: string;
  };
  Favorites: undefined;
  Search: undefined;
};

export type MainRouteProp<T extends keyof MainNavParamList> = RouteProp<
  MainNavParamList,
  T
>;

export type MainNavigationProp<T extends keyof MainNavParamList> =
  NativeStackNavigationProp<MainNavParamList, T>;

//------------------------------------
export type BottomTabsNavParamList = {};

export type BottomTabsRouteProp<T extends keyof BottomTabsNavParamList> =
  RouteProp<BottomTabsNavParamList, T>;

export type BottomTabsNavigationProp<T extends keyof BottomTabsNavParamList> =
  NativeStackNavigationProp<BottomTabsNavParamList, T>;
