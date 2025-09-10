import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//------------------------------
export type AuthNavParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
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
