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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';

const AddAdmin = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if we're in edit mode
  const isEditMode = route?.params?.editMode || false;
  const adminData = route?.params?.adminData || null;

  const [formData, setFormData] = useState({
    name: adminData?.name || '',
    email: adminData?.email || '',
    password: '',
    confirmPassword: '',
    phone: adminData?.phone || '',
    address: adminData?.address || '',
    assignedRestaurant: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation only for add mode, not edit mode
    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // For edit mode, validate password only if provided
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (formData.password && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.assignedRestaurant) {
      newErrors.assignedRestaurant = 'Please assign a restaurant';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const successMessage = isEditMode
        ? 'Admin updated successfully!'
        : 'Admin added successfully!';
      Alert.alert('Success', successMessage, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      const errorMessage = isEditMode
        ? 'Failed to update admin. Please try again.'
        : 'Failed to add admin. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    icon: Icon,
    secureTextEntry = false,
    keyboardType = 'default',
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    error?: string;
    icon: any;
    secureTextEntry?: boolean;
    keyboardType?: any;
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <Icon size={20} color={colors.gray} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {label === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.gray} />
            ) : (
              <Eye size={20} color={colors.gray} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? 'Edit Admin' : 'Add Admin'}
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Text style={styles.formTitle}>Admin Information</Text>
            <Text style={styles.formSubtitle}>
              {isEditMode
                ? 'Update the admin user details'
                : 'Enter the details for the new admin user'}
            </Text>

            <InputField
              label="Full Name"
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              placeholder="Enter full name"
              error={errors.name}
              icon={User}
            />

            <InputField
              label="Email Address"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              placeholder="Enter email address"
              error={errors.email}
              icon={Mail}
              keyboardType="email-address"
            />

            <InputField
              label={
                isEditMode
                  ? 'Password (Leave blank to keep current)'
                  : 'Password'
              }
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
              placeholder={
                isEditMode ? 'Enter new password (optional)' : 'Enter password'
              }
              error={errors.password}
              icon={Lock}
              secureTextEntry={!showPassword}
            />

            <InputField
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={text => handleInputChange('confirmPassword', text)}
              placeholder="Confirm password"
              error={errors.confirmPassword}
              icon={Lock}
              secureTextEntry={!showPassword}
            />

            <InputField
              label="Phone Number"
              value={formData.phone}
              onChangeText={text => handleInputChange('phone', text)}
              placeholder="Enter phone number"
              error={errors.phone}
              icon={Phone}
              keyboardType="phone-pad"
            />

            <InputField
              label="Address"
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
              placeholder="Enter address"
              error={errors.address}
              icon={MapPin}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Assigned Restaurant</Text>
              <View
                style={[
                  styles.inputWrapper,
                  errors.assignedRestaurant && styles.inputError,
                ]}
              >
                <MapPin
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.assignedRestaurant}
                  onChangeText={text =>
                    handleInputChange('assignedRestaurant', text)
                  }
                  placeholder="Select restaurant to assign"
                  placeholderTextColor={colors.gray}
                />
              </View>
              {errors.assignedRestaurant && (
                <Text style={styles.errorText}>
                  {errors.assignedRestaurant}
                </Text>
              )}
            </View>

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
                {isLoading
                  ? isEditMode
                    ? 'Updating Admin...'
                    : 'Adding Admin...'
                  : isEditMode
                  ? 'Update Admin'
                  : 'Add Admin'}
              </Text>
            </TouchableOpacity>
          </View>
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
  keyboardView: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  form: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 30,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputError: {
    borderColor: colors.red,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.metallicBlack,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    color: colors.red,
    marginTop: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
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

export default AddAdmin;
