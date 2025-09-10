import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Truck, Store } from 'lucide-react-native';
import { colors } from '../../../constants';
import { navigate } from '../../../../root-navigation';

const LocationScreen = () => {
  const navigation = useNavigation();

  const handleDelivery = () => {
    navigate('MapScreen', { type: 'delivery' });
  };

  const handlePickup = () => {
    navigate('MapScreen', { type: 'pickup' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Service</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MapPin size={80} color={colors.primary} />
        </View>

        <Text style={styles.title}>
          How would you like to receive your order?
        </Text>
        <Text style={styles.subtitle}>
          Select your preferred service type to continue
        </Text>

        {/* Delivery Option */}
        <TouchableOpacity style={styles.optionCard} onPress={handleDelivery}>
          <View style={styles.optionIcon}>
            <Truck size={32} color={colors.white} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Delivery</Text>
            <Text style={styles.optionDescription}>
              Get your food delivered to your doorstep
            </Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Pickup Option */}
        <TouchableOpacity style={styles.optionCard} onPress={handlePickup}>
          <View style={styles.optionIcon}>
            <Store size={32} color={colors.white} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Pickup</Text>
            <Text style={styles.optionDescription}>
              Pick up your order from our restaurant
            </Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
  arrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default LocationScreen;
