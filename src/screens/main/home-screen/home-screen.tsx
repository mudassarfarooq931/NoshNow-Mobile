import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { User } from 'lucide-react-native';
import { colors } from '../../../constants';
import SectionList from 'react-native-tabs-section-list';

// Slider Data
const sliderData = [
  {
    id: 1,
    image:
      'https://static.tossdown.com/images/e4a26596-bf61-4d78-a69b-be5a1f88754e.webp',
    title: 'Delicious Pizza',
  },
  {
    id: 2,
    image:
      'https://static.tossdown.com/images/0c770e0e-28e3-44ae-8c75-9ba2b2230511.webp',
    title: 'Tasty Burger',
  },
  {
    id: 3,
    image:
      'https://static.tossdown.com/images/0c770e0e-28e3-44ae-8c75-9ba2b2230511.webp',
    title: 'Tasty Rolls',
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
      },
      {
        title: 'Chicken Burger',
        price: 320,
        description: 'Crispy fried chicken fillet burger',
      },
      {
        title: 'Double Beef Burger',
        price: 450,
        description: 'Two beef patties with extra cheese',
      },
      {
        title: 'Veggie Burger',
        price: 300,
        description: 'Grilled vegetable patty with sauces',
      },
      {
        title: 'Zinger Burger',
        price: 370,
        description: 'Spicy zinger fillet with mayo',
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
      },
      {
        title: 'Pepperoni',
        price: 750,
        description: 'Pepperoni slices with mozzarella',
      },
      {
        title: 'BBQ Chicken',
        price: 800,
        description: 'BBQ chicken with onions & cheese',
      },
      {
        title: 'Veggie Supreme',
        price: 700,
        description: 'Loaded with fresh vegetables',
      },
      {
        title: 'Cheese Lover',
        price: 850,
        description: 'Extra cheese, triple layered',
      },
      {
        title: 'Tandoori Pizza',
        price: 900,
        description: 'Spicy chicken tandoori flavor',
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
      },
      {
        title: 'Cheese Fries',
        price: 200,
        description: 'Fries topped with cheese sauce',
      },
      {
        title: 'Curly Fries',
        price: 220,
        description: 'Crispy curly seasoned fries',
      },
      {
        title: 'Spicy Fries',
        price: 180,
        description: 'Fries tossed with spicy seasoning',
      },
      {
        title: 'Loaded Fries',
        price: 300,
        description: 'Cheese, mayo & chicken loaded',
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
      },
      {
        title: 'Beef Wrap',
        price: 400,
        description: 'Juicy beef strips with veggies',
      },
      {
        title: 'Veggie Wrap',
        price: 280,
        description: 'Fresh veggies & sauces',
      },
      {
        title: 'Shawarma Wrap',
        price: 320,
        description: 'Middle Eastern shawarma style',
      },
      {
        title: 'Grilled Wrap',
        price: 370,
        description: 'Smoky grilled chicken & cheese',
      },
    ],
  },
  {
    title: 'Drinks',
    data: [
      { title: 'Coke', price: 120, description: 'Chilled Coca-Cola can' },
      { title: 'Pepsi', price: 120, description: 'Refreshing Pepsi can' },
      { title: 'Sprite', price: 120, description: 'Lemon-lime flavored drink' },
      {
        title: 'Fanta',
        price: 120,
        description: 'Orange flavored fizzy drink',
      },
      { title: 'Lemonade', price: 150, description: 'Fresh squeezed lemonade' },
      { title: 'Iced Tea', price: 180, description: 'Chilled lemon iced tea' },
    ],
  },
  {
    title: 'Desserts',
    data: [
      {
        title: 'Ice Cream',
        price: 250,
        description: '2 scoops of your favorite flavor',
      },
      {
        title: 'Brownie',
        price: 300,
        description: 'Chocolate brownie with fudge',
      },
      {
        title: 'Chocolate Cake',
        price: 350,
        description: 'Rich chocolate layered cake',
      },
      { title: 'Donut', price: 150, description: 'Frosted chocolate donut' },
      {
        title: 'Cheesecake',
        price: 400,
        description: 'Classic creamy cheesecake slice',
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
      <View style={styles.sliderContainer}>
        <SwiperFlatList
          data={sliderData}
          renderItem={({ item }) => (
            <View style={styles.sliderItem}>
              <FastImage
                source={{ uri: item.image }}
                style={styles.sliderImage}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.sliderOverlay}>
                <Text style={styles.sliderTitle}>{item.title}</Text>
              </View>
            </View>
          )}
          showPagination
        />
      </View>

      {/* Tabs + SectionList */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={50}
        tabBarStyle={styles.tabBar}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderTab={({ title, isActive }) => (
          <View
            style={[
              styles.tabContainer,
              { borderBottomWidth: isActive ? 1 : 0 },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: isActive ? '#090909' : '#9e9e9e' },
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
            <View style={styles.itemRow}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>Rs. {item.price}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
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
  sliderContainer: { height: 150, marginBottom: 10 },
  sliderItem: { flex: 1, position: 'relative' },
  sliderImage: { width: '100%', height: '100%' },
  sliderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  sliderTitle: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
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
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: '#131313',
  },
  itemPrice: {
    fontSize: 18,
    color: '#131313',
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
