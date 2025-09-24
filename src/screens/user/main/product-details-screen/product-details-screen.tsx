import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  MainNavParamList,
  MainNavigationProp,
} from '../../../../routes/param-list';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '../../../../redux/slice/cart-slice';
import SkeletonLoader from '../../../../components/skeleton-loader';

const { height: screenHeight } = Dimensions.get('window');

type ProductDetailsScreenRouteProp = RouteProp<
  MainNavParamList,
  'ProductDetails'
>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const dispatch = useDispatch();
  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlavorOpen, setIsFlavorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isExtrasOpen, setIsExtrasOpen] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading

    return () => clearTimeout(timer);
  }, []);

  const flavors = ['Original', 'Spicy', 'Extra Spicy', 'Mild'];
  const sizes = ['Small', 'Medium', 'Large'];
  const extras = ['Extra Cheese', 'Extra Sauce', 'Extra Toppings', 'No Onions'];

  const toggleExtra = (extra: string) => {
    setSelectedExtras(prev =>
      prev.includes(extra)
        ? prev.filter(item => item !== extra)
        : [...prev, extra],
    );
  };

  const toggleFlavorSection = () => {
    setIsFlavorOpen(!isFlavorOpen);
  };

  const toggleSizeSection = () => {
    setIsSizeOpen(!isSizeOpen);
  };

  const toggleExtrasSection = () => {
    setIsExtrasOpen(!isExtrasOpen);
  };

  const handleFlavorSelect = (flavor: string) => {
    setSelectedFlavor(flavor);
    setIsFlavorOpen(false); // Close section after selection
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setIsSizeOpen(false); // Close section after selection
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
    // Here you could also dispatch to Redux to manage favorites globally
  };

  const calculateTotal = () => {
    if (!product) return 0;
    let total = product.price * quantity;

    // Add size pricing
    if (selectedSize === 'Large') total += 200;
    else if (selectedSize === 'Medium') total += 100;

    // Add extras pricing
    total += selectedExtras.length * 50;

    return total;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${
        product.id
      }-${selectedFlavor}-${selectedSize}-${selectedExtras.join(',')}`,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      quantity,
      selectedFlavor,
      selectedSize,
      selectedExtras,
      totalPrice: calculateTotal(),
    };

    dispatch(addToCart(cartItem));
    navigation.navigate('Cart');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={30} height={30} borderRadius={15} />
          <SkeletonLoader width={150} height={18} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <ScrollView style={styles.content}>
          <SkeletonLoader width="100%" height={300} borderRadius={0} />
          <View style={styles.detailsContainer}>
            <SkeletonLoader
              width="80%"
              height={24}
              style={{ marginBottom: 10 }}
            />
            <SkeletonLoader
              width="60%"
              height={16}
              style={{ marginBottom: 20 }}
            />
            <SkeletonLoader
              width="100%"
              height={200}
              style={{ marginBottom: 20 }}
            />
            <SkeletonLoader
              width="100%"
              height={100}
              style={{ marginBottom: 20 }}
            />
            <SkeletonLoader
              width="100%"
              height={100}
              style={{ marginBottom: 20 }}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <SkeletonLoader width="100%" height={50} borderRadius={25} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Heart
            size={24}
            color={isFavorite ? colors.red : colors.white}
            fill={isFavorite ? colors.red : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>Rs. {product.price}</Text>
        </View>

        {/* Quantity Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Plus size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Flavor Selection */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={toggleFlavorSection}
          >
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Flavor</Text>
              {!isFlavorOpen && selectedFlavor && (
                <Text style={styles.selectedOptionDisplayText}>
                  : {selectedFlavor}
                </Text>
              )}
            </View>
            {isFlavorOpen ? (
              <ChevronUp size={20} color={colors.primary} />
            ) : (
              <ChevronDown size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
          {isFlavorOpen && (
            <View style={styles.optionsContainer}>
              {flavors.map(flavor => (
                <TouchableOpacity
                  key={flavor}
                  style={[
                    styles.optionButton,
                    selectedFlavor === flavor && styles.selectedOption,
                  ]}
                  onPress={() => handleFlavorSelect(flavor)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedFlavor === flavor && styles.selectedOptionText,
                    ]}
                  >
                    {flavor}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={toggleSizeSection}
          >
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Size</Text>
              {!isSizeOpen && selectedSize && (
                <Text style={styles.selectedOptionDisplayText}>
                  : {selectedSize}
                  {selectedSize === 'Large' && ' (+Rs. 200)'}
                  {selectedSize === 'Medium' && ' (+Rs. 100)'}
                </Text>
              )}
            </View>
            {isSizeOpen ? (
              <ChevronUp size={20} color={colors.primary} />
            ) : (
              <ChevronDown size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
          {isSizeOpen && (
            <View style={styles.optionsContainer}>
              {sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.optionButton,
                    selectedSize === size && styles.selectedOption,
                  ]}
                  onPress={() => handleSizeSelect(size)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedSize === size && styles.selectedOptionText,
                    ]}
                  >
                    {size}
                    {size === 'Large' && ' (+Rs. 200)'}
                    {size === 'Medium' && ' (+Rs. 100)'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Extras */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={toggleExtrasSection}
          >
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Extras (Rs. 50 each)</Text>
              {!isExtrasOpen && selectedExtras.length > 0 && (
                <Text style={styles.selectedOptionDisplayText}>
                  : {selectedExtras.join(', ')}
                  {selectedExtras.length > 0 &&
                    ` (+Rs. ${selectedExtras.length * 50})`}
                </Text>
              )}
            </View>
            {isExtrasOpen ? (
              <ChevronUp size={20} color={colors.primary} />
            ) : (
              <ChevronDown size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
          {isExtrasOpen && (
            <View style={styles.extrasContainer}>
              {extras.map(extra => (
                <TouchableOpacity
                  key={extra}
                  style={[
                    styles.extraButton,
                    selectedExtras.includes(extra) && styles.selectedExtra,
                  ]}
                  onPress={() => toggleExtra(extra)}
                >
                  <Text
                    style={[
                      styles.extraText,
                      selectedExtras.includes(extra) &&
                        styles.selectedExtraText,
                    ]}
                  >
                    {extra}
                  </Text>
                  <Text
                    style={[
                      styles.extraPrice,
                      selectedExtras.includes(extra) &&
                        styles.selectedExtraPrice,
                    ]}
                  >
                    +Rs. 50
                  </Text>
                  <View
                    style={[
                      styles.extraCheckbox,
                      selectedExtras.includes(extra) &&
                        styles.selectedExtraCheckbox,
                    ]}
                  >
                    {selectedExtras.includes(extra) && (
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                      >
                        ✓
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Selected Options Summary */}
        <View style={styles.selectedOptionsContainer}>
          <Text style={styles.selectedOptionsTitle}>Selected Options</Text>

          {selectedFlavor && (
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Flavor:</Text>
              <Text style={styles.optionValue}>{selectedFlavor}</Text>
            </View>
          )}

          {selectedSize && (
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Size:</Text>
              <Text style={styles.optionValue}>{selectedSize}</Text>
            </View>
          )}

          {selectedExtras.length > 0 && (
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Extras:</Text>
              <Text style={styles.optionValue}>
                {selectedExtras.join(', ')}
              </Text>
            </View>
          )}

          {!selectedFlavor && !selectedSize && selectedExtras.length === 0 && (
            <Text style={styles.noOptionsText}>No customizations selected</Text>
          )}
        </View>

        {/* Total Price */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>Rs. {calculateTotal()}</Text>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color={colors.white} />
          <Text style={styles.addToCartText}>
            Add to Cart - Rs. {calculateTotal()}
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  favoriteButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: 250,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  productInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 8,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  sectionTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  selectedOptionDisplayText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.lighterGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginHorizontal: 25,
    minWidth: 40,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.lighterGray,
    backgroundColor: colors.white,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  extrasContainer: {
    gap: 10,
  },
  extraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lighterGray,
    backgroundColor: colors.white,
  },
  selectedExtra: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  extraText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: '500',
    flex: 1,
  },
  selectedExtraText: {
    color: colors.primary,
    fontWeight: '600',
  },
  extraPrice: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedExtraPrice: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  extraCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  selectedExtraCheckbox: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectedOptionsContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
  },
  selectedOptionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  optionLabel: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  optionValue: {
    fontSize: 14,
    color: colors.metallicBlack,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  noOptionsText: {
    fontSize: 14,
    color: colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    gap: 12,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
});

export default ProductDetailsScreen;
