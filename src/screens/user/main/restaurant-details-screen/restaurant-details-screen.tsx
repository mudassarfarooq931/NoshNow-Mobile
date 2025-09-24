import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SectionList,
} from 'react-native';
import {
  ArrowLeft,
  Star,
  Clock,
  Heart,
  ShoppingCart,
} from 'lucide-react-native';
import { colors } from '../../../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainNavigationProp } from '../../../../routes/param-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { addToCart } from '../../../../redux/slice/cart-slice';
import { RestaurantDetailsSkeleton } from '../../../../components/skeleton-loader';

const { width } = Dimensions.get('window');

interface RestaurantItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: any;
}

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  image: any;
  category: string;
  isFavorite: boolean;
  items: RestaurantItem[];
}

const RestaurantDetailsScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const route = useRoute();
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const { restaurant, selectedCategory } = route.params as {
    restaurant: Restaurant;
    selectedCategory?: string | null;
  };
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  // Organize menu items into sections with selected category first
  const organizedSections = React.useMemo(() => {
    const sections = [];

    if (selectedCategory) {
      // Add selected category section first
      const categoryItems = restaurant.items.filter(item => {
        const itemName = item.name.toLowerCase();
        const categoryName = selectedCategory.toLowerCase();

        // Check if item name contains the category
        if (itemName.includes(categoryName)) {
          return true;
        }

        // Check if item belongs to the category based on common patterns
        if (categoryName === 'pizza' && itemName.includes('pizza')) return true;
        if (categoryName === 'burger' && itemName.includes('burger'))
          return true;
        if (categoryName === 'pasta' && itemName.includes('pasta')) return true;
        if (categoryName === 'wrap' && itemName.includes('wrap')) return true;
        if (categoryName === 'roll' && itemName.includes('roll')) return true;
        if (
          categoryName === 'chicken' &&
          itemName.includes('chicken') &&
          !itemName.includes('burger')
        )
          return true;
        if (
          categoryName === 'mexican' &&
          (itemName.includes('taco') ||
            itemName.includes('burrito') ||
            itemName.includes('quesadilla') ||
            itemName.includes('nacho'))
        )
          return true;
        if (
          categoryName === 'japanese' &&
          (itemName.includes('sushi') ||
            itemName.includes('sashimi') ||
            itemName.includes('teriyaki') ||
            itemName.includes('mochi'))
        )
          return true;
        if (
          categoryName === 'desserts' &&
          (itemName.includes('dessert') ||
            itemName.includes('cake') ||
            itemName.includes('tiramisu') ||
            itemName.includes('ice cream'))
        )
          return true;
        if (
          categoryName === 'drinks' &&
          (itemName.includes('drink') ||
            itemName.includes('coke') ||
            itemName.includes('juice') ||
            itemName.includes('tea') ||
            itemName.includes('soda'))
        )
          return true;
        if (
          categoryName === 'sides' &&
          (itemName.includes('fries') ||
            itemName.includes('nugget') ||
            itemName.includes('bread'))
        )
          return true;

        return false;
      });

      if (categoryItems.length > 0) {
        sections.push({
          title: `${selectedCategory} (${categoryItems.length})`,
          data: categoryItems,
          isSelectedCategory: true,
        });
      }

      // Add other items in their respective categories
      const otherItems = restaurant.items.filter(
        item => !categoryItems.includes(item),
      );

      // Group other items by their type/category
      const groupedItems = otherItems.reduce((acc, item) => {
        let category = 'Other Items';

        // Determine category based on item name
        if (item.name.toLowerCase().includes('burger')) {
          category = 'Burgers';
        } else if (item.name.toLowerCase().includes('pizza')) {
          category = 'Pizza';
        } else if (item.name.toLowerCase().includes('pasta')) {
          category = 'Pasta';
        } else if (item.name.toLowerCase().includes('wrap')) {
          category = 'Wraps';
        } else if (item.name.toLowerCase().includes('roll')) {
          category = 'Rolls';
        } else if (
          item.name.toLowerCase().includes('chicken') &&
          !item.name.toLowerCase().includes('burger')
        ) {
          category = 'Chicken';
        } else if (
          item.name.toLowerCase().includes('taco') ||
          item.name.toLowerCase().includes('burrito') ||
          item.name.toLowerCase().includes('quesadilla') ||
          item.name.toLowerCase().includes('nacho')
        ) {
          category = 'Mexican';
        } else if (
          item.name.toLowerCase().includes('sushi') ||
          item.name.toLowerCase().includes('sashimi') ||
          item.name.toLowerCase().includes('teriyaki') ||
          item.name.toLowerCase().includes('mochi')
        ) {
          category = 'Japanese';
        } else if (
          item.name.toLowerCase().includes('dessert') ||
          item.name.toLowerCase().includes('cake') ||
          item.name.toLowerCase().includes('tiramisu') ||
          item.name.toLowerCase().includes('ice cream')
        ) {
          category = 'Desserts';
        } else if (
          item.name.toLowerCase().includes('drink') ||
          item.name.toLowerCase().includes('coke') ||
          item.name.toLowerCase().includes('juice') ||
          item.name.toLowerCase().includes('tea') ||
          item.name.toLowerCase().includes('soda')
        ) {
          category = 'Drinks';
        } else if (
          item.name.toLowerCase().includes('fries') ||
          item.name.toLowerCase().includes('nugget') ||
          item.name.toLowerCase().includes('bread')
        ) {
          category = 'Sides';
        }

        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {} as Record<string, RestaurantItem[]>);

      // Add grouped sections
      Object.entries(groupedItems).forEach(([category, items]) => {
        if (items.length > 0) {
          sections.push({
            title: `${category} (${items.length})`,
            data: items,
            isSelectedCategory: false,
          });
        }
      });
    } else {
      // If no selected category, group all items by type
      const groupedItems = restaurant.items.reduce((acc, item) => {
        let category = 'Other Items';

        if (item.name.toLowerCase().includes('burger')) {
          category = 'Burgers';
        } else if (item.name.toLowerCase().includes('pizza')) {
          category = 'Pizza';
        } else if (item.name.toLowerCase().includes('pasta')) {
          category = 'Pasta';
        } else if (item.name.toLowerCase().includes('wrap')) {
          category = 'Wraps';
        } else if (item.name.toLowerCase().includes('roll')) {
          category = 'Rolls';
        } else if (
          item.name.toLowerCase().includes('chicken') &&
          !item.name.toLowerCase().includes('burger')
        ) {
          category = 'Chicken';
        } else if (
          item.name.toLowerCase().includes('taco') ||
          item.name.toLowerCase().includes('burrito') ||
          item.name.toLowerCase().includes('quesadilla') ||
          item.name.toLowerCase().includes('nacho')
        ) {
          category = 'Mexican';
        } else if (
          item.name.toLowerCase().includes('sushi') ||
          item.name.toLowerCase().includes('sashimi') ||
          item.name.toLowerCase().includes('teriyaki') ||
          item.name.toLowerCase().includes('mochi')
        ) {
          category = 'Japanese';
        } else if (
          item.name.toLowerCase().includes('dessert') ||
          item.name.toLowerCase().includes('cake') ||
          item.name.toLowerCase().includes('tiramisu') ||
          item.name.toLowerCase().includes('ice cream')
        ) {
          category = 'Desserts';
        } else if (
          item.name.toLowerCase().includes('drink') ||
          item.name.toLowerCase().includes('coke') ||
          item.name.toLowerCase().includes('juice') ||
          item.name.toLowerCase().includes('tea') ||
          item.name.toLowerCase().includes('soda')
        ) {
          category = 'Drinks';
        } else if (
          item.name.toLowerCase().includes('fries') ||
          item.name.toLowerCase().includes('nugget') ||
          item.name.toLowerCase().includes('bread')
        ) {
          category = 'Sides';
        }

        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {} as Record<string, RestaurantItem[]>);

      // Add all grouped sections
      Object.entries(groupedItems).forEach(([category, items]) => {
        if (items.length > 0) {
          sections.push({
            title: `${category} (${items.length})`,
            data: items,
            isSelectedCategory: false,
          });
        }
      });
    }

    return sections;
  }, [restaurant.items, selectedCategory]);

  const handleItemPress = (item: RestaurantItem) => {
    const product = {
      id: item.id,
      title: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: restaurant.category,
    };
    navigation.navigate('ProductDetails', { product });
  };

  const handleAddToCart = (item: RestaurantItem) => {
    const cartItem = {
      id: item.id,
      title: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: restaurant.category,
      quantity: 1,
      selectedFlavor: '',
      selectedSize: '',
      selectedExtras: [],
      totalPrice: item.price,
    };
    dispatch(addToCart(cartItem));
  };

  const renderMenuItem = ({ item }: { item: RestaurantItem }) => (
    <View style={styles.menuItem}>
      <TouchableOpacity
        style={styles.menuItemContent}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.8}
      >
        <Image source={item.image} style={styles.menuItemImage} />
        <View style={styles.menuItemDetails}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>Rs. {item.price}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
        activeOpacity={0.8}
      >
        <Text style={styles.addToCartText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View
      style={[
        styles.sectionHeader,
        section.isSelectedCategory && styles.selectedSectionHeader,
      ]}
    >
      <Text
        style={[
          styles.sectionHeaderText,
          section.isSelectedCategory && styles.selectedSectionHeaderText,
        ]}
      >
        {section.title}
      </Text>
    </View>
  );

  if (isLoading) {
    return <RestaurantDetailsSkeleton />;
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
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <ShoppingCart size={24} color={colors.white} />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Restaurant Info */}
      <View style={styles.restaurantInfo}>
        <Image source={restaurant.image} style={styles.restaurantImage} />
        <View style={styles.restaurantDetails}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart
                size={24}
                color={restaurant.isFavorite ? colors.red : colors.gray}
                fill={restaurant.isFavorite ? colors.red : 'none'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.restaurantStats}>
            <View style={styles.ratingContainer}>
              <Star
                size={16}
                color={colors.yellow_dark}
                fill={colors.yellow_dark}
              />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
            <View style={styles.deliveryTimeContainer}>
              <Clock size={16} color={colors.gray} />
              <Text style={styles.deliveryTimeText}>
                {restaurant.deliveryTime}
              </Text>
            </View>
            <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
        <SectionList
          sections={organizedSections}
          renderItem={renderMenuItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
          stickySectionHeadersEnabled={true}
        />
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.red,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  restaurantDetails: {
    padding: 20,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  restaurantStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  deliveryTimeText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.gray,
  },
  restaurantCategory: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    backgroundColor: colors.primaryLightest,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 15,
  },
  sectionHeader: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  selectedSectionHeader: {
    backgroundColor: colors.primaryLightest,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  selectedSectionHeaderText: {
    color: colors.primary,
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 15,
  },
  menuItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
    lineHeight: 18,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RestaurantDetailsScreen;
