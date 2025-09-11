import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '../../../constants';
import { AuthNavParamList } from '../../../routes/param-list';
import { navigate } from '../../../../root-navigation';

type MapScreenRouteProp = RouteProp<AuthNavParamList, 'MapScreen'>;

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MapScreenRouteProp>();
  const { type } = route.params || { type: 'delivery' };

  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'NoshNow needs access to your location to provide better service',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to continue',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // iOS permission handling
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        // You can reverse geocode here to get city and area
        reverseGeocode(latitude, longitude);
      },
      error => {
        console.log('Error getting location:', error);
        Alert.alert('Error', 'Unable to get your current location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const reverseGeocode = (latitude: number, longitude: number) => {
    // This is a simplified version - you would typically use a geocoding service
    // For now, we'll set some default values
    setCity('Karachi');
    setArea('Gulshan-e-Iqbal');
  };

  const handleConfirmLocation = () => {
    if (!city || !area) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Navigate to next screen or save location data
    Alert.alert(
      'Location Confirmed',
      `Service Type: ${type}\nCity: ${city}\nArea: ${area}`,
      [
        {
          text: 'OK',
          onPress: () => navigate('Home'),
        },
      ],
    );
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
        <Text style={styles.headerTitle}>
          {type === 'delivery' ? 'Delivery Location' : 'Pickup Location'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location?.latitude || 24.8607,
            longitude: location?.longitude || 67.0011,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : undefined
          }
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={event => {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setLocation({ latitude, longitude });
            reverseGeocode(latitude, longitude);
          }}
          onMapLoaded={() => {
            console.log('Map loaded');
          }}
          onRegionChange={() => {
            console.log('Region changed');
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
              description="Tap to confirm this location"
            />
          )}
        </MapView>
      </View>

      {/* Location Card */}
      <View style={styles.locationCard}>
        <Text style={styles.cardTitle}>Location Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City / Region</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city or region"
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Area / Sub Region</Text>
          <TextInput
            style={styles.input}
            value={area}
            onChangeText={setArea}
            placeholder="Enter your area or sub region"
            placeholderTextColor={colors.gray}
          />
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
        >
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
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
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
