import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScreenEnum } from '../../constants';
import { LoginScreen, SignupScreen, WelcomeScreen } from '../../screens';
import LocationScreen from '../../screens/user/auth/location-screen/location-screen';
import MapScreen from '../../screens/user/auth/map-screen/map-screen';
import { AuthNavParamList } from '../param-list';

interface IProps {}

const { Navigator, Screen } = createNativeStackNavigator<AuthNavParamList>();
const AuthNav: React.FC<IProps> = () => {
  return (
    <Navigator
      initialRouteName={ScreenEnum.Welcome}
      screenOptions={{ headerShown: false }}
    >
      <Screen name={ScreenEnum.Welcome} component={WelcomeScreen} />
      <Screen name={ScreenEnum.Login} component={LoginScreen} />
      <Screen name={ScreenEnum.Signup} component={SignupScreen} />
      <Screen name="LocationScreen" component={LocationScreen} />
      <Screen name="MapScreen" component={MapScreen} />
    </Navigator>
  );
};

export default AuthNav;
