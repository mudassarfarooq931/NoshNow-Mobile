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
  DollarSign,
  Package,
  Save,
  Upload,
  Star,
  Clock,
  Hash,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';

const AddProduct = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    restaurant: '',
    preparationTime: '',
    ingredients: '',
    allergens: '',
    calories: '',
    image: null,
    isAvailable: true,
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Salads',
    'Soups',
    'Pizza',
    'Burgers',
    'Pasta',
    'Rice',
  ];

  const restaurants = [
    'Pizza Palace',
    'Burger King',
    'Sushi Master',
    'Spice Garden',
    'Taco Bell',
    'KFC',
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.restaurant.trim()) {
      newErrors.restaurant = 'Restaurant is required';
    }
    if (!formData.preparationTime.trim()) {
      newErrors.preparationTime = 'Preparation time is required';
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
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

      Alert.alert('Success', 'Product added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add product. Please try again.');
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

  const renderCheckbox = (label: string, field: string, value: boolean) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => handleInputChange(field, !value)}
    >
      <View style={[styles.checkbox, value && styles.checkedBox]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Add Product</Text>
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
                  <Text style={styles.uploadText}>Upload Product Image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Product Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
                placeholder="Enter product name"
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
                placeholder="Enter product description"
                placeholderTextColor={colors.gray}
                multiline
                numberOfLines={4}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.inputRow}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.inputLabel}>Price *</Text>
                <View style={styles.inputWithIcon}>
                  <DollarSign
                    size={20}
                    color={colors.gray}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.inputWithIconText,
                      errors.price && styles.inputError,
                    ]}
                    value={formData.price}
                    onChangeText={text => handleInputChange('price', text)}
                    placeholder="0.00"
                    placeholderTextColor={colors.gray}
                    keyboardType="numeric"
                  />
                </View>
                {errors.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
              </View>

              <View style={styles.halfInputContainer}>
                <Text style={styles.inputLabel}>Preparation Time *</Text>
                <View style={styles.inputWithIcon}>
                  <Clock
                    size={20}
                    color={colors.gray}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.inputWithIconText,
                      errors.preparationTime && styles.inputError,
                    ]}
                    value={formData.preparationTime}
                    onChangeText={text =>
                      handleInputChange('preparationTime', text)
                    }
                    placeholder="15 min"
                    placeholderTextColor={colors.gray}
                  />
                </View>
                {errors.preparationTime && (
                  <Text style={styles.errorText}>{errors.preparationTime}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Category and Restaurant */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category & Restaurant</Text>

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

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Restaurant *</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {restaurants.map((restaurant, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryChip,
                      formData.restaurant === restaurant &&
                        styles.selectedCategoryChip,
                    ]}
                    onPress={() => handleInputChange('restaurant', restaurant)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        formData.restaurant === restaurant &&
                          styles.selectedCategoryChipText,
                      ]}
                    >
                      {restaurant}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {errors.restaurant && (
                <Text style={styles.errorText}>{errors.restaurant}</Text>
              )}
            </View>
          </View>

          {/* Ingredients and Allergens */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients & Allergens</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ingredients *</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  errors.ingredients && styles.inputError,
                ]}
                value={formData.ingredients}
                onChangeText={text => handleInputChange('ingredients', text)}
                placeholder="Enter ingredients (comma separated)"
                placeholderTextColor={colors.gray}
                multiline
                numberOfLines={3}
              />
              {errors.ingredients && (
                <Text style={styles.errorText}>{errors.ingredients}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Allergens</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.allergens}
                onChangeText={text => handleInputChange('allergens', text)}
                placeholder="Enter allergens (comma separated)"
                placeholderTextColor={colors.gray}
                multiline
                numberOfLines={2}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Calories</Text>
              <View style={styles.inputWithIcon}>
                <Hash size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIconText}
                  value={formData.calories}
                  onChangeText={text => handleInputChange('calories', text)}
                  placeholder="Enter calories"
                  placeholderTextColor={colors.gray}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Product Attributes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Attributes</Text>

            <View style={styles.checkboxRow}>
              {renderCheckbox(
                'Vegetarian',
                'isVegetarian',
                formData.isVegetarian,
              )}
              {renderCheckbox('Vegan', 'isVegan', formData.isVegan)}
            </View>

            <View style={styles.checkboxRow}>
              {renderCheckbox('Spicy', 'isSpicy', formData.isSpicy)}
              {renderCheckbox('Available', 'isAvailable', formData.isAvailable)}
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
              {isLoading ? 'Adding Product...' : 'Add Product'}
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
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    flex: 1,
    marginRight: 10,
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
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.metallicBlack,
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

export default AddProduct;
