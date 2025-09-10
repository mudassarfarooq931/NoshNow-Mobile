import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Utensils, Clock, Star } from 'lucide-react-native';
import { colors, ScreenEnum } from '../../../constants';
import { navigate } from '../../../../root-navigation';
const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background Pattern */}

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Utensils color="#FFFFFF" size={40} />
        </View>
        <Text style={styles.appName}>NoshNow</Text>
        <Text style={styles.tagline}>
          Delicious food delivered to your doorstep
        </Text>

        {/* Feature Icons */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Clock color={colors.primary} size={20} />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <Star color={colors.primary} size={20} />
            <Text style={styles.featureText}>Quality Food</Text>
          </View>
        </View>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.7}
          onPress={() => {
            navigate(ScreenEnum.Login);
          }}
        >
          <Text style={styles.loginButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.25,
    zIndex: 1,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#8B0000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 16,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 8,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 340,
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 16,
    shadowColor: '#8B0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
