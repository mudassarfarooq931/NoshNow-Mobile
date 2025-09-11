import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {
  ShoppingCart,
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  Heart,
} from 'lucide-react-native';
import { colors } from '../../../constants';
import SectionList from 'react-native-tabs-section-list';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProp } from '../../../routes/param-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { HomeScreenSkeleton } from '../../../components/skeleton-loader';

interface FoodItem {
  title: string;
  price: number;
  description: string;
  image: any;
}

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: any;
  category: string;
}

const { width } = Dimensions.get('window');

const sliderImages = [
  {
    id: '1',
    image: require('../../../assets/images/slide1.png'),
    title: 'Special Offer!',
    subtitle: 'Get 20% off on your first order',
  },
  {
    id: '2',
    image: require('../../../assets/images/slide2.png'),
    title: 'Free Delivery!',
    subtitle: 'On orders above Rs. 1000',
  },
  {
    id: '3',
    image: require('../../../assets/images/slide1.png'),
    title: 'New Menu Items!',
    subtitle: 'Try our latest delicious dishes',
  },
  {
    id: '4',
    image: require('../../../assets/images/slide2.png'),
    title: 'Weekend Special!',
    subtitle: '50% off on all pizzas',
  },
  {
    id: '5',
    image: require('../../../assets/images/slide1.png'),
    title: 'Happy Hour!',
    subtitle: 'Buy 2 Get 1 Free on drinks',
  },
];

const categories = [
  { id: '1', name: 'Burgers', icon: '🍔', color: '#FF6B6B' },
  { id: '2', name: 'Pizza', icon: '🍕', color: '#4ECDC4' },
  { id: '3', name: 'Fries', icon: '🍟', color: '#45B7D1' },
  { id: '4', name: 'Wraps', icon: '🌯', color: '#96CEB4' },
  { id: '5', name: 'Drinks', icon: '🥤', color: '#FFEAA7' },
  { id: '6', name: 'Desserts', icon: '🍰', color: '#DDA0DD' },
  { id: '7', name: 'Asian', icon: '🍜', color: '#98D8C8' },
  { id: '8', name: 'Fast Food', icon: '🍗', color: '#F7DC6F' },
];

const allRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    rating: 4.5,
    deliveryTime: '25-30 min',
    image: require('../../../assets/images/slide1.png'),
    category: 'Burgers',
    isFavorite: false,
    items: [
      // Burgers
      {
        id: '1',
        name: 'Classic Burger',
        price: 350,
        description: 'Juicy beef patty with fresh lettuce',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '2',
        name: 'Cheese Burger',
        price: 380,
        description: 'Beef patty with melted cheese',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '3',
        name: 'Chicken Burger',
        price: 320,
        description: 'Crispy chicken fillet burger',
        image: require('../../../assets/images/slide1.png'),
      },
      // Pizza
      {
        id: '4',
        name: 'Margherita Pizza',
        price: 600,
        description: 'Classic cheese & tomato pizza',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '5',
        name: 'Pepperoni Pizza',
        price: 750,
        description: 'Pepperoni slices with mozzarella',
        image: require('../../../assets/images/slide2.png'),
      },
      // Wraps
      {
        id: '6',
        name: 'Chicken Wrap',
        price: 350,
        description: 'Grilled chicken wrapped in tortilla',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '7',
        name: 'Beef Wrap',
        price: 400,
        description: 'Juicy beef strips with veggies',
        image: require('../../../assets/images/slide1.png'),
      },
      // Rolls
      {
        id: '8',
        name: 'Spring Roll',
        price: 200,
        description: 'Crispy vegetable spring roll',
        image: require('../../../assets/images/slide2.png'),
      },
      // Drinks
      {
        id: '9',
        name: 'Coke',
        price: 120,
        description: 'Chilled Coca-Cola can',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '10',
        name: 'Fresh Juice',
        price: 180,
        description: 'Fresh orange juice',
        image: require('../../../assets/images/slide2.png'),
      },
    ],
  },
  {
    id: '2',
    name: 'Pizza Corner',
    rating: 4.8,
    deliveryTime: '20-25 min',
    image: require('../../../assets/images/slide2.png'),
    category: 'Pizza',
    isFavorite: true,
    items: [
      // Pizza
      {
        id: '1',
        name: 'Margherita Pizza',
        price: 600,
        description: 'Classic cheese & tomato pizza',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '2',
        name: 'Pepperoni Pizza',
        price: 750,
        description: 'Pepperoni slices with mozzarella',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '3',
        name: 'BBQ Chicken Pizza',
        price: 800,
        description: 'BBQ chicken with onions & cheese',
        image: require('../../../assets/images/slide2.png'),
      },
      // Pasta
      {
        id: '4',
        name: 'Spaghetti Carbonara',
        price: 480,
        description: 'Creamy pasta with bacon',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '5',
        name: 'Chicken Alfredo',
        price: 520,
        description: 'Chicken with creamy alfredo sauce',
        image: require('../../../assets/images/slide1.png'),
      },
      // Burgers
      {
        id: '6',
        name: 'Italian Burger',
        price: 420,
        description: 'Beef patty with Italian herbs',
        image: require('../../../assets/images/slide1.png'),
      },
      // Wraps
      {
        id: '7',
        name: 'Mediterranean Wrap',
        price: 380,
        description: 'Fresh veggies with hummus wrap',
        image: require('../../../assets/images/slide2.png'),
      },
      // Desserts
      {
        id: '8',
        name: 'Tiramisu',
        price: 350,
        description: 'Classic Italian dessert',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '9',
        name: 'Chocolate Cake',
        price: 300,
        description: 'Rich chocolate layered cake',
        image: require('../../../assets/images/slide2.png'),
      },
      // Drinks
      {
        id: '10',
        name: 'Italian Soda',
        price: 150,
        description: 'Refreshing Italian soda',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    id: '3',
    name: 'Chicken Express',
    rating: 4.3,
    deliveryTime: '15-20 min',
    image: require('../../../assets/images/slide1.png'),
    category: 'Fast Food',
    isFavorite: false,
    items: [
      // Chicken
      {
        id: '1',
        name: 'Fried Chicken',
        price: 450,
        description: 'Crispy fried chicken pieces',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '2',
        name: 'Chicken Wings',
        price: 380,
        description: 'Spicy chicken wings',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '3',
        name: 'Chicken Sandwich',
        price: 320,
        description: 'Grilled chicken sandwich',
        image: require('../../../assets/images/slide1.png'),
      },
      // Burgers
      {
        id: '4',
        name: 'Chicken Burger',
        price: 350,
        description: 'Crispy chicken fillet burger',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '5',
        name: 'Spicy Chicken Burger',
        price: 380,
        description: 'Spicy chicken with jalapeños',
        image: require('../../../assets/images/slide2.png'),
      },
      // Wraps
      {
        id: '6',
        name: 'Chicken Caesar Wrap',
        price: 320,
        description: 'Grilled chicken with caesar dressing',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '7',
        name: 'Buffalo Chicken Wrap',
        price: 340,
        description: 'Spicy buffalo chicken wrap',
        image: require('../../../assets/images/slide2.png'),
      },
      // Fries & Sides
      {
        id: '8',
        name: 'Chicken Nuggets',
        price: 250,
        description: 'Crispy chicken nuggets',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '9',
        name: 'Loaded Fries',
        price: 300,
        description: 'Fries with cheese and chicken',
        image: require('../../../assets/images/slide2.png'),
      },
      // Drinks
      {
        id: '10',
        name: 'Iced Tea',
        price: 120,
        description: 'Refreshing iced tea',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    id: '4',
    name: 'Taco Bell',
    rating: 4.2,
    deliveryTime: '18-22 min',
    image: require('../../../assets/images/slide2.png'),
    category: 'Mexican',
    isFavorite: false,
    items: [
      // Mexican
      {
        id: '1',
        name: 'Beef Tacos',
        price: 280,
        description: 'Spicy beef tacos with salsa',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '2',
        name: 'Chicken Burrito',
        price: 350,
        description: 'Chicken burrito with rice',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '3',
        name: 'Nachos Supreme',
        price: 420,
        description: 'Loaded nachos with cheese',
        image: require('../../../assets/images/slide2.png'),
      },
      // Wraps
      {
        id: '4',
        name: 'Chicken Quesadilla',
        price: 320,
        description: 'Grilled chicken quesadilla',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '5',
        name: 'Beef Wrap',
        price: 380,
        description: 'Spicy beef wrap with veggies',
        image: require('../../../assets/images/slide1.png'),
      },
      // Burgers
      {
        id: '6',
        name: 'Mexican Burger',
        price: 400,
        description: 'Beef patty with Mexican spices',
        image: require('../../../assets/images/slide2.png'),
      },
      // Pizza
      {
        id: '7',
        name: 'Mexican Pizza',
        price: 450,
        description: 'Pizza with Mexican toppings',
        image: require('../../../assets/images/slide1.png'),
      },
      // Rolls
      {
        id: '8',
        name: 'Chicken Roll',
        price: 250,
        description: 'Crispy chicken roll',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '9',
        name: 'Vegetable Roll',
        price: 200,
        description: 'Fresh vegetable roll',
        image: require('../../../assets/images/slide1.png'),
      },
      // Drinks
      {
        id: '10',
        name: 'Horchata',
        price: 150,
        description: 'Traditional Mexican rice drink',
        image: require('../../../assets/images/slide2.png'),
      },
    ],
  },
  {
    id: '5',
    name: 'Sushi Master',
    rating: 4.7,
    deliveryTime: '30-35 min',
    image: require('../../../assets/images/slide1.png'),
    category: 'Japanese',
    isFavorite: true,
    items: [
      // Sushi & Rolls
      {
        id: '1',
        name: 'California Roll',
        price: 450,
        description: 'Crab, avocado, cucumber roll',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '2',
        name: 'Salmon Sashimi',
        price: 600,
        description: 'Fresh salmon sashimi',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '3',
        name: 'Dragon Roll',
        price: 550,
        description: 'Eel and avocado roll',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '4',
        name: 'Spicy Tuna Roll',
        price: 480,
        description: 'Spicy tuna with cucumber',
        image: require('../../../assets/images/slide2.png'),
      },
      // Wraps
      {
        id: '5',
        name: 'Chicken Teriyaki Wrap',
        price: 380,
        description: 'Grilled chicken with teriyaki sauce',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '6',
        name: 'Vegetable Wrap',
        price: 320,
        description: 'Fresh vegetables with ginger dressing',
        image: require('../../../assets/images/slide1.png'),
      },
      // Burgers
      {
        id: '7',
        name: 'Teriyaki Burger',
        price: 420,
        description: 'Chicken patty with teriyaki glaze',
        image: require('../../../assets/images/slide2.png'),
      },
      // Pizza
      {
        id: '8',
        name: 'Japanese Pizza',
        price: 500,
        description: 'Pizza with Japanese toppings',
        image: require('../../../assets/images/slide1.png'),
      },
      // Desserts
      {
        id: '9',
        name: 'Mochi Ice Cream',
        price: 250,
        description: 'Traditional Japanese ice cream',
        image: require('../../../assets/images/slide2.png'),
      },
      // Drinks
      {
        id: '10',
        name: 'Green Tea',
        price: 100,
        description: 'Traditional Japanese green tea',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    id: '6',
    name: 'Pasta House',
    rating: 4.4,
    deliveryTime: '22-28 min',
    image: require('../../../assets/images/slide2.png'),
    category: 'Italian',
    isFavorite: false,
    items: [
      // Pasta
      {
        id: '1',
        name: 'Spaghetti Carbonara',
        price: 480,
        description: 'Creamy pasta with bacon',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '2',
        name: 'Chicken Alfredo',
        price: 520,
        description: 'Chicken with creamy alfredo sauce',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '3',
        name: 'Margherita Pasta',
        price: 450,
        description: 'Pasta with tomato and basil',
        image: require('../../../assets/images/slide2.png'),
      },
      // Pizza
      {
        id: '4',
        name: 'Margherita Pizza',
        price: 600,
        description: 'Classic Italian pizza',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        id: '5',
        name: 'Pepperoni Pizza',
        price: 700,
        description: 'Pepperoni with mozzarella',
        image: require('../../../assets/images/slide1.png'),
      },
      // Burgers
      {
        id: '6',
        name: 'Italian Burger',
        price: 450,
        description: 'Beef patty with Italian herbs',
        image: require('../../../assets/images/slide2.png'),
      },
      {
        id: '7',
        name: 'Chicken Parmesan Burger',
        price: 480,
        description: 'Chicken with parmesan cheese',
        image: require('../../../assets/images/slide1.png'),
      },
      // Wraps
      {
        id: '8',
        name: 'Italian Wrap',
        price: 380,
        description: 'Fresh vegetables with Italian dressing',
        image: require('../../../assets/images/slide2.png'),
      },
      // Rolls
      {
        id: '9',
        name: 'Garlic Bread Roll',
        price: 200,
        description: 'Crispy garlic bread roll',
        image: require('../../../assets/images/slide1.png'),
      },
      // Drinks
      {
        id: '10',
        name: 'Italian Soda',
        price: 150,
        description: 'Refreshing Italian soda',
        image: require('../../../assets/images/slide2.png'),
      },
    ],
  },
];
const sections = [
  {
    title: 'Burgers',
    data: [
      {
        title: 'Cheeseburger',
        price: 350,
        description: 'Juicy beef patty with cheddar cheese',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Chicken Burger',
        price: 320,
        description: 'Crispy fried chicken fillet burger',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Double Beef Burger',
        price: 450,
        description: 'Two beef patties with extra cheese',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Veggie Burger',
        price: 300,
        description: 'Grilled vegetable patty with sauces',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Zinger Burger',
        price: 370,
        description: 'Spicy zinger fillet with mayo',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    title: 'Pizzas',
    data: [
      {
        title: 'Margherita',
        price: 600,
        description: 'Classic cheese & tomato pizza',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Pepperoni',
        price: 750,
        description: 'Pepperoni slices with mozzarella',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'BBQ Chicken',
        price: 800,
        description: 'BBQ chicken with onions & cheese',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Veggie Supreme',
        price: 700,
        description: 'Loaded with fresh vegetables',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Cheese Lover',
        price: 850,
        description: 'Extra cheese, triple layered',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Tandoori Pizza',
        price: 900,
        description: 'Spicy chicken tandoori flavor',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    title: 'Fries',
    data: [
      {
        title: 'Regular Fries',
        price: 150,
        description: 'Golden crispy fries',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Cheese Fries',
        price: 200,
        description: 'Fries topped with cheese sauce',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Curly Fries',
        price: 220,
        description: 'Crispy curly seasoned fries',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Spicy Fries',
        price: 180,
        description: 'Fries tossed with spicy seasoning',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Loaded Fries',
        price: 300,
        description: 'Cheese, mayo & chicken loaded',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    title: 'Wraps',
    data: [
      {
        title: 'Chicken Wrap',
        price: 350,
        description: 'Grilled chicken wrapped in tortilla',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Beef Wrap',
        price: 400,
        description: 'Juicy beef strips with veggies',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Veggie Wrap',
        price: 280,
        description: 'Fresh veggies & sauces',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Shawarma Wrap',
        price: 320,
        description: 'Middle Eastern shawarma style',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Grilled Wrap',
        price: 370,
        description: 'Smoky grilled chicken & cheese',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    title: 'Drinks',
    data: [
      {
        title: 'Coke',
        price: 120,
        description: 'Chilled Coca-Cola can',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Pepsi',
        price: 120,
        description: 'Refreshing Pepsi can',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Sprite',
        price: 120,
        description: 'Lemon-lime flavored drink',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Fanta',
        price: 120,
        description: 'Orange flavored fizzy drink',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Lemonade',
        price: 150,
        description: 'Fresh squeezed lemonade',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Iced Tea',
        price: 180,
        description: 'Chilled lemon iced tea',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
  {
    title: 'Desserts',
    data: [
      {
        title: 'Ice Cream',
        price: 250,
        description: '2 scoops of your favorite flavor',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Brownie',
        price: 300,
        description: 'Chocolate brownie with fudge',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Chocolate Cake',
        price: 350,
        description: 'Rich chocolate layered cake',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Donut',
        price: 150,
        description: 'Frosted chocolate donut',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Cheesecake',
        price: 400,
        description: 'Classic creamy cheesecake slice',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Cupcake',
        price: 200,
        description: 'Soft vanilla cupcake with frosting',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Apple Pie',
        price: 350,
        description: 'Traditional apple pie slice',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Pudding',
        price: 220,
        description: 'Creamy caramel pudding',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Chocolate Mousse',
        price: 280,
        description: 'Light and fluffy mousse',
        image: require('../../../assets/images/slide1.png'),
      },
      {
        title: 'Fruit Salad',
        price: 300,
        description: 'Mixed seasonal fresh fruits',
        image: require('../../../assets/images/slide1.png'),
      },
    ],
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<MainNavigationProp<'BottomTabNav'>>();
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const stickyHeaderHeight = 60;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  const handleProductPress = (item: FoodItem) => {
    const product = {
      id: item.title,
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: 'Food',
    };
    navigation.navigate('ProductDetails', { product });
  };

  const handleRestaurantPress = (restaurant: any) => {
    (navigation as any).navigate('RestaurantDetails', {
      restaurant,
      selectedCategory: selectedCategory,
    });
  };

  const handleCategoryPress = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      // If same category is clicked, show all restaurants
      setSelectedCategory(null);
      setFilteredRestaurants(allRestaurants);
    } else {
      // Filter restaurants by category
      setSelectedCategory(categoryName);
      const filtered = allRestaurants.filter(restaurant => {
        // Check if restaurant category matches
        if (restaurant.category.toLowerCase() === categoryName.toLowerCase()) {
          return true;
        }

        // Check if restaurant has items in this category
        const hasItemsInCategory = restaurant.items.some(item => {
          const itemName = item.name.toLowerCase();
          const categoryNameLower = categoryName.toLowerCase();

          // Direct name match
          if (itemName.includes(categoryNameLower)) {
            return true;
          }

          // Category-specific pattern matching
          if (categoryNameLower === 'pizza' && itemName.includes('pizza'))
            return true;
          if (categoryNameLower === 'burger' && itemName.includes('burger'))
            return true;
          if (categoryNameLower === 'pasta' && itemName.includes('pasta'))
            return true;
          if (categoryNameLower === 'wrap' && itemName.includes('wrap'))
            return true;
          if (categoryNameLower === 'roll' && itemName.includes('roll'))
            return true;
          if (
            categoryNameLower === 'chicken' &&
            itemName.includes('chicken') &&
            !itemName.includes('burger')
          )
            return true;
          if (
            categoryNameLower === 'mexican' &&
            (itemName.includes('taco') ||
              itemName.includes('burrito') ||
              itemName.includes('quesadilla') ||
              itemName.includes('nacho'))
          )
            return true;
          if (
            categoryNameLower === 'japanese' &&
            (itemName.includes('sushi') ||
              itemName.includes('sashimi') ||
              itemName.includes('teriyaki') ||
              itemName.includes('mochi'))
          )
            return true;
          if (
            categoryNameLower === 'desserts' &&
            (itemName.includes('dessert') ||
              itemName.includes('cake') ||
              itemName.includes('tiramisu') ||
              itemName.includes('ice cream'))
          )
            return true;
          if (
            categoryNameLower === 'drinks' &&
            (itemName.includes('drink') ||
              itemName.includes('coke') ||
              itemName.includes('juice') ||
              itemName.includes('tea') ||
              itemName.includes('soda'))
          )
            return true;
          if (
            categoryNameLower === 'sides' &&
            (itemName.includes('fries') ||
              itemName.includes('nugget') ||
              itemName.includes('bread'))
          )
            return true;

          return false;
        });

        return hasItemsInCategory;
      });
      setFilteredRestaurants(filtered);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      // If search is empty, show restaurants based on selected category
      if (selectedCategory) {
        const filtered = allRestaurants.filter(restaurant => {
          // Check if restaurant category matches
          if (
            restaurant.category.toLowerCase() === selectedCategory.toLowerCase()
          ) {
            return true;
          }

          // Check if restaurant has items in this category
          const hasItemsInCategory = restaurant.items.some(item => {
            const itemName = item.name.toLowerCase();
            const categoryNameLower = selectedCategory.toLowerCase();

            // Direct name match
            if (itemName.includes(categoryNameLower)) {
              return true;
            }

            // Category-specific pattern matching
            if (categoryNameLower === 'pizza' && itemName.includes('pizza'))
              return true;
            if (categoryNameLower === 'burger' && itemName.includes('burger'))
              return true;
            if (categoryNameLower === 'pasta' && itemName.includes('pasta'))
              return true;
            if (categoryNameLower === 'wrap' && itemName.includes('wrap'))
              return true;
            if (categoryNameLower === 'roll' && itemName.includes('roll'))
              return true;
            if (
              categoryNameLower === 'chicken' &&
              itemName.includes('chicken') &&
              !itemName.includes('burger')
            )
              return true;
            if (
              categoryNameLower === 'mexican' &&
              (itemName.includes('taco') ||
                itemName.includes('burrito') ||
                itemName.includes('quesadilla') ||
                itemName.includes('nacho'))
            )
              return true;
            if (
              categoryNameLower === 'japanese' &&
              (itemName.includes('sushi') ||
                itemName.includes('sashimi') ||
                itemName.includes('teriyaki') ||
                itemName.includes('mochi'))
            )
              return true;
            if (
              categoryNameLower === 'desserts' &&
              (itemName.includes('dessert') ||
                itemName.includes('cake') ||
                itemName.includes('tiramisu') ||
                itemName.includes('ice cream'))
            )
              return true;
            if (
              categoryNameLower === 'drinks' &&
              (itemName.includes('drink') ||
                itemName.includes('coke') ||
                itemName.includes('juice') ||
                itemName.includes('tea') ||
                itemName.includes('soda'))
            )
              return true;
            if (
              categoryNameLower === 'sides' &&
              (itemName.includes('fries') ||
                itemName.includes('nugget') ||
                itemName.includes('bread'))
            )
              return true;

            return false;
          });

          return hasItemsInCategory;
        });
        setFilteredRestaurants(filtered);
      } else {
        setFilteredRestaurants(allRestaurants);
      }
    } else {
      // Filter restaurants by search query
      const filtered = allRestaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.items.some(item =>
            item.name.toLowerCase().includes(query.toLowerCase()),
          ),
      );
      setFilteredRestaurants(filtered);
    }
  };

  const renderCategory = ({ item }: { item: any }) => {
    const isSelected = selectedCategory === item.name;
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item.name)}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.categoryIcon,
            {
              backgroundColor: isSelected ? colors.primary : item.color,
              borderWidth: isSelected ? 2 : 0,
              borderColor: isSelected ? colors.primary : 'transparent',
            },
          ]}
        >
          <Text style={styles.categoryEmoji}>{item.icon}</Text>
        </View>
        <Text
          style={[
            styles.categoryName,
            { color: isSelected ? colors.primary : colors.black },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRestaurant = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.restaurantImage} />
      <TouchableOpacity style={styles.favoriteButton}>
        <Heart
          size={20}
          color={item.isFavorite ? colors.red : colors.gray}
          fill={item.isFavorite ? colors.red : 'none'}
        />
      </TouchableOpacity>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.restaurantDetails}>
          <View style={styles.ratingContainer}>
            <Star
              size={14}
              color={colors.yellow_dark}
              fill={colors.yellow_dark}
            />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.deliveryTimeContainer}>
            <Clock size={14} color={colors.gray} />
            <Text style={styles.deliveryTimeText}>{item.deliveryTime}</Text>
          </View>
        </View>
        <Text style={styles.restaurantCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <HomeScreenSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <MapPin size={20} color={colors.white} />
            <Text style={styles.locationText}>Karachi, Pakistan</Text>
          </View>
          <TouchableOpacity
            style={styles.cartIcon}
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food, restaurants..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Promotional Banner Slider */}
        <View style={styles.bannerContainer}>
          <FlatList
            ref={sliderRef}
            data={sliderImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setCurrentSlideIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={styles.slideContainer}>
                <Image source={item.image} style={styles.bannerImage} />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {sliderImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      index === currentSlideIndex
                        ? colors.white
                        : 'rgba(255,255,255,0.5)',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Filtered Restaurants */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory
              ? `${selectedCategory} Restaurants`
              : 'All Restaurants'}
            {searchQuery && ` - "${searchQuery}"`}
          </Text>
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurant}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.restaurantsGrid}
            columnWrapperStyle={styles.restaurantRow}
          />
        </View>

        {/* Food Items by Category - Sticky Section - COMMENTED OUT */}
        {/* <View style={styles.stickySectionContainer}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <View style={styles.stickySectionContent}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${item.title}-${index}`}
              stickySectionHeadersEnabled={true}
          scrollToLocationOffset={50}
          tabBarStyle={styles.tabBar}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderTab={({ title, isActive }) => (
            <View
              style={[
                styles.tabContainer,
                {
                      borderBottomWidth: isActive ? 2 : 0,
                      borderBottomColor: isActive
                        ? colors.primary
                        : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                      { color: isActive ? colors.primary : colors.gray },
                ]}
              >
                {title}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
                <View style={styles.stickySectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handleProductPress(item)}
              activeOpacity={0.7}
            >
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                </View>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                    <View style={styles.itemFooter}>
                      <View style={styles.ratingContainer}>
                        <Star
                          size={14}
                          color={colors.yellow_dark}
                          fill={colors.yellow_dark}
                        />
                        <Text style={styles.itemRating}>4.5</Text>
                      </View>
                      <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stickyHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  cartIcon: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.black,
  },
  filterButton: {
    padding: 5,
  },

  // Banner
  bannerContainer: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  slideContainer: {
    width: width - 40,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  bannerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: colors.white,
    fontSize: 14,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // Sections
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Sticky Section
  stickySectionContainer: {
    backgroundColor: colors.background,
  },
  stickySectionContent: {
    backgroundColor: colors.background,
  },
  stickySectionHeader: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },

  // Categories
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Restaurants
  restaurantsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  restaurantRow: {
    justifyContent: 'space-between',
  },
  restaurantCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.black,
    fontWeight: '500',
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.gray,
  },
  restaurantCategory: {
    fontSize: 12,
    color: colors.gray,
  },

  // Tabs
  tabBar: {
    backgroundColor: colors.white,
    borderBottomColor: colors.lighterGray,
    borderBottomWidth: 1,
    height: 50,
  },
  tabContainer: {
    paddingHorizontal: 20,
  },
  tabText: {
    paddingVertical: 15,
    color: colors.gray,
    fontSize: 16,
    fontWeight: '500',
  },

  // Section Headers
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: colors.lighterGray,
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: colors.background,
  },
  sectionHeaderText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Food Items
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: colors.gray,
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRating: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.gray,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
export default HomeScreen;
