import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import {
  isReadyRef,
  navigationRef,
  routeNameRef,
} from '../../navigation-helper';
import ToastView from '../components/toast-view';
import { colors } from '../constants';
import { RootState } from '../redux/store';
import AuthNav from './auth/auth.routes';
import MainNav from './main/main.routes';
interface IProps {}
const mapStateToProps = (state: RootState) => ({});

const Routes: React.FC<IProps> = React.memo(({}) => {
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name;
          isReadyRef.current = true;
        }}
      >
        <ToastView />
        <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
        {true ? (
          <>
            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
              <MainNav />
            </SafeAreaView>
          </>
        ) : (
          <AuthNav />
        )}
      </NavigationContainer>
    </>
  );
});

export default connect(mapStateToProps)(Routes);
