import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { connect } from 'react-redux';
import ToastView from '../../components/toast-view';
import { RootState } from '../../redux/store';
import { MainNavParamList } from '../param-list';
import CustomBottomTab from '../../components/bottom-tab';
import ProductDetailsScreen from '../../screens/main/product-details-screen/product-details-screen';
import CartScreen from '../../screens/main/cart-screen/cart-screen';
import CheckoutScreen from '../../screens/main/checkout-screen/checkout-screen';
import OrderSuccessScreen from '../../screens/main/order-success-screen/order-success-screen';
import TrackOrderScreen from '../../screens/main/track-order-screen/track-order-screen';
import FavoritesScreen from '../../screens/main/favorites-screen/favorites-screen';
import SearchScreen from '../../screens/main/search-screen/search-screen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

interface IProps {
  isAuthenticated: boolean;
}
const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const { Navigator, Screen } = createNativeStackNavigator<MainNavParamList>();
const MainNav = ({ isAuthenticated }: IProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Navigate to auth flow if not authenticated
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthNav' as never }],
      });
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) {
    return null; // or loading screen
  }

  return (
    <>
      <Navigator
        initialRouteName={'BottomTabNav'}
        screenOptions={{ headerShown: false }}
      >
        <Screen name="BottomTabNav" component={CustomBottomTab} />
        <Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Screen name="Cart" component={CartScreen} />
        <Screen name="Checkout" component={CheckoutScreen} />
        <Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Screen name="TrackOrder" component={TrackOrderScreen} />
        <Screen name="Favorites" component={FavoritesScreen} />
        <Screen name="Search" component={SearchScreen} />
      </Navigator>
      <ToastView />
    </>
  );
};

export default connect(mapStateToProps)(MainNav);
