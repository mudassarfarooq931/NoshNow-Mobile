import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { connect } from 'react-redux';
import ToastView from '../../components/toast-view';
import { RootState } from '../../redux/store';
import { MainNavParamList } from '../param-list';
import CustomBottomTab from '../../components/bottom-tab';

interface IProps {}
const mapStateToProps = (state: RootState) => {
  return {};
};

const { Navigator, Screen } = createNativeStackNavigator<MainNavParamList>();
const MainNav = ({}: IProps) => {
  return (
    <>
      <Navigator
        initialRouteName={'BottomTabNav'}
        screenOptions={{ headerShown: false }}
      >
        <Screen name="BottomTabNav" component={CustomBottomTab} />
      </Navigator>
      <ToastView />
    </>
  );
};

export default connect(mapStateToProps)(MainNav);
