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
} from 'lucide-react-native';
import { colors } from '../../../constants';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MainNavParamList } from '../../routes/param-list';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '../../../redux/slice/cart-slice';

const { height: screenHeight } = Dimensions.get('window');

type ProductDetailsScreenRouteProp = RouteProp<
  MainNavParamList,
  'ProductDetails'
>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const dispatch = useDispatch();
  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={colors.metallicBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Heart
            size={24}
            color={isFavorite ? colors.red : colors.gray}
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
          <Text style={styles.sectionTitle}>Flavor</Text>
          <View style={styles.optionsContainer}>
            {flavors.map(flavor => (
              <TouchableOpacity
                key={flavor}
                style={[
                  styles.optionButton,
                  selectedFlavor === flavor && styles.selectedOption,
                ]}
                onPress={() => setSelectedFlavor(flavor)}
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
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.optionsContainer}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  selectedSize === size && styles.selectedOption,
                ]}
                onPress={() => setSelectedSize(size)}
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
        </View>

        {/* Extras */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extras (Rs. 50 each)</Text>
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
                    selectedExtras.includes(extra) && styles.selectedExtraText,
                  ]}
                >
                  {extra}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
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
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: colors.white,
  },
  extrasContainer: {
    gap: 12,
  },
  extraButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  selectedExtra: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  extraText: {
    fontSize: 15,
    color: colors.gray,
  },
  selectedExtraText: {
    color: colors.white,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
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
});

export default ProductDetailsScreen;
