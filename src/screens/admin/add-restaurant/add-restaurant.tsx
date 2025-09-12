import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  MapPin,
  Clock,
  Star,
  Phone,
  Mail,
  Upload,
  Save,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';

const AddRestaurant = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    openingTime: '',
    closingTime: '',
    rating: '',
    category: '',
    deliveryTime: '',
    deliveryFee: '',
    minimumOrder: '',
    image: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    'Fast Food',
    'Pizza',
    'Chinese',
    'Italian',
    'Mexican',
    'Indian',
    'Thai',
    'Japanese',
    'Mediterranean',
    'Desserts',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.openingTime.trim()) {
      newErrors.openingTime = 'Opening time is required';
    }
    if (!formData.closingTime.trim()) {
      newErrors.closingTime = 'Closing time is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = 'Delivery time is required';
    }
    if (!formData.deliveryFee.trim()) {
      newErrors.deliveryFee = 'Delivery fee is required';
    }
    if (!formData.minimumOrder.trim()) {
      newErrors.minimumOrder = 'Minimum order amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Validation Error',
        'Please fill in all required fields correctly.',
      );
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 2000));

      Alert.alert('Success', 'Restaurant added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add restaurant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = () => {
    Alert.alert('Upload Image', 'Choose an option', [
      { text: 'Camera', onPress: () => console.log('Camera') },
      { text: 'Gallery', onPress: () => console.log('Gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Restaurant</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Upload Section */}
          <View style={styles.imageSection}>
            <TouchableOpacity
              style={styles.imageUploadButton}
              onPress={handleImageUpload}
            >
              {formData.image ? (
                <Image source={formData.image} style={styles.uploadedImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Camera size={40} color={colors.gray} />
                  <Text style={styles.uploadText}>Upload Restaurant Image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Restaurant Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
                placeholder="Enter restaurant name"
                placeholderTextColor={colors.gray}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  errors.description && styles.inputError,
                ]}
                value={formData.description}
                onChangeText={text => handleInputChange('description', text)}
                placeholder="Enter restaurant description"
                placeholderTextColor={colors.gray}
                multiline
                numberOfLines={4}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category *</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryChip,
                      formData.category === category &&
                        styles.selectedCategoryChip,
                    ]}
                    onPress={() => handleInputChange('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        formData.category === category &&
                          styles.selectedCategoryChipText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {errors.category && (
                <Text style={styles.errorText}>{errors.category}</Text>
              )}
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address *</Text>
              <View style={styles.inputWithIcon}>
                <MapPin
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.inputWithIconText,
                    errors.address && styles.inputError,
                  ]}
                  value={formData.address}
                  onChangeText={text => handleInputChange('address', text)}
                  placeholder="Enter restaurant address"
                  placeholderTextColor={colors.gray}
                />
              </View>
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <View style={styles.inputWithIcon}>
                <Phone size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[
                    styles.inputWithIconText,
                    errors.phone && styles.inputError,
                  ]}
                  value={formData.phone}
                  onChangeText={text => handleInputChange('phone', text)}
                  placeholder="Enter phone number"
                  placeholderTextColor={colors.gray}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email *</Text>
              <View style={styles.inputWithIcon}>
                <Mail size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[
                    styles.inputWithIconText,
                    errors.email && styles.inputError,
                  ]}
                  value={formData.email}
                  onChangeText={text => handleInputChange('email', text)}
                  placeholder="Enter email address"
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
          </View>

          {/* Business Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Hours</Text>

            <View style={styles.timeRow}>
              <View style={styles.timeInputContainer}>
                <Text style={styles.inputLabel}>Opening Time *</Text>
                <View style={styles.inputWithIcon}>
                  <Clock
                    size={20}
                    color={colors.gray}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.inputWithIconText,
                      errors.openingTime && styles.inputError,
                    ]}
                    value={formData.openingTime}
                    onChangeText={text =>
                      handleInputChange('openingTime', text)
                    }
                    placeholder="09:00"
                    placeholderTextColor={colors.gray}
                  />
                </View>
                {errors.openingTime && (
                  <Text style={styles.errorText}>{errors.openingTime}</Text>
                )}
              </View>

              <View style={styles.timeInputContainer}>
                <Text style={styles.inputLabel}>Closing Time *</Text>
                <View style={styles.inputWithIcon}>
                  <Clock
                    size={20}
                    color={colors.gray}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.inputWithIconText,
                      errors.closingTime && styles.inputError,
                    ]}
                    value={formData.closingTime}
                    onChangeText={text =>
                      handleInputChange('closingTime', text)
                    }
                    placeholder="22:00"
                    placeholderTextColor={colors.gray}
                  />
                </View>
                {errors.closingTime && (
                  <Text style={styles.errorText}>{errors.closingTime}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Delivery Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Delivery Time *</Text>
              <TextInput
                style={[styles.input, errors.deliveryTime && styles.inputError]}
                value={formData.deliveryTime}
                onChangeText={text => handleInputChange('deliveryTime', text)}
                placeholder="e.g., 30-45 minutes"
                placeholderTextColor={colors.gray}
              />
              {errors.deliveryTime && (
                <Text style={styles.errorText}>{errors.deliveryTime}</Text>
              )}
            </View>

            <View style={styles.inputRow}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.inputLabel}>Delivery Fee *</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.deliveryFee && styles.inputError,
                  ]}
                  value={formData.deliveryFee}
                  onChangeText={text => handleInputChange('deliveryFee', text)}
                  placeholder="$2.99"
                  placeholderTextColor={colors.gray}
                  keyboardType="numeric"
                />
                {errors.deliveryFee && (
                  <Text style={styles.errorText}>{errors.deliveryFee}</Text>
                )}
              </View>

              <View style={styles.halfInputContainer}>
                <Text style={styles.inputLabel}>Minimum Order *</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.minimumOrder && styles.inputError,
                  ]}
                  value={formData.minimumOrder}
                  onChangeText={text => handleInputChange('minimumOrder', text)}
                  placeholder="$15.00"
                  placeholderTextColor={colors.gray}
                  keyboardType="numeric"
                />
                {errors.minimumOrder && (
                  <Text style={styles.errorText}>{errors.minimumOrder}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Save size={20} color={colors.white} style={styles.submitIcon} />
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Adding Restaurant...' : 'Add Restaurant'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageUploadButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray,
    borderStyle: 'dashed',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  uploadedImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  uploadText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.metallicBlack,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.red,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIconText: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  categoryScroll: {
    marginBottom: 5,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  selectedCategoryChipText: {
    color: colors.white,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  errorText: {
    fontSize: 12,
    color: colors.red,
    marginTop: 5,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default AddRestaurant;
