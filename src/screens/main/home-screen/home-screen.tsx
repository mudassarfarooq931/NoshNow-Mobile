import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { User } from 'lucide-react-native';
import { colors } from '../../../constants';
import SectionList from 'react-native-tabs-section-list';

const { width } = Dimensions.get('window');

const sliderImages = [
  require('../../../assets/images/slide1.png'),
  require('../../../assets/images/slide2.png'),
  require('../../../assets/images/slide1.png'),
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
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NoshNow</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <User size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <View style={styles.sliderWrapper}>
        <FlatList
          data={sliderImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.sliderImage} />
          )}
        />
      </View>

      <View style={{ flex: 1 }}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          stickySectionHeadersEnabled={false}
          scrollToLocationOffset={50}
          tabBarStyle={styles.tabBar}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderTab={({ title, isActive }) => (
            <View
              style={[
                styles.tabContainer,
                {
                  borderBottomWidth: isActive ? 1 : 0,
                  borderBottomColor: isActive ? colors.primary : '#090909',
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? colors.primary : '#9e9e9e' },
                ]}
              >
                {title}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View>
              <View style={styles.sectionHeaderContainer} />
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6' },

  // Header
  header: {
    height: 60,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: colors.white },
  profileIcon: { padding: 8 },

  // Slider
  sliderWrapper: {
    height: 149,
    width: width,
  },
  sliderImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },

  // Tabs
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    height: 70,
  },
  tabContainer: {
    borderBottomColor: '#090909',
  },
  tabText: {
    padding: 15,
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '500',
  },

  // Section
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#eaeaea',
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: '#010101',
    backgroundColor: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },

  // Item
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  itemDetails: { flex: 1, justifyContent: 'center' },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    color: '#131313',
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 16,
    color: '#131313',
    fontWeight: '500',
  },
  itemDescription: {
    marginTop: 6,
    color: '#777',
    fontSize: 14,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default HomeScreen;
