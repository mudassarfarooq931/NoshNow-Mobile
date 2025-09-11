import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../constants';

const { width } = Dimensions.get('window');

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  width: skeletonWidth = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.skeltonBackground, colors.lighterGray],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: skeletonWidth,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

// Restaurant Card Skeleton
export const RestaurantCardSkeleton = () => (
  <View style={styles.restaurantCardSkeleton}>
    <SkeletonLoader width="100%" height={120} borderRadius={15} />
    <View style={styles.restaurantInfoSkeleton}>
      <SkeletonLoader width="80%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="60%" height={14} style={{ marginBottom: 4 }} />
      <SkeletonLoader width="40%" height={12} />
    </View>
  </View>
);

// Category Item Skeleton
export const CategoryItemSkeleton = () => (
  <View style={styles.categoryItemSkeleton}>
    <SkeletonLoader width={60} height={60} borderRadius={30} />
    <SkeletonLoader width={50} height={12} style={{ marginTop: 8 }} />
  </View>
);

// Menu Item Skeleton
export const MenuItemSkeleton = () => (
  <View style={styles.menuItemSkeleton}>
    <SkeletonLoader width={80} height={80} borderRadius={10} />
    <View style={styles.menuItemInfoSkeleton}>
      <SkeletonLoader width="70%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="90%" height={14} style={{ marginBottom: 8 }} />
      <View style={styles.menuItemFooterSkeleton}>
        <SkeletonLoader width={60} height={14} />
        <SkeletonLoader width={50} height={30} borderRadius={15} />
      </View>
    </View>
  </View>
);

// Banner Skeleton
export const BannerSkeleton = () => (
  <View style={styles.bannerSkeleton}>
    <SkeletonLoader width="100%" height={150} borderRadius={15} />
  </View>
);

// Home Screen Skeleton
export const HomeScreenSkeleton = () => (
  <View style={styles.container}>
    {/* Header Skeleton */}
    <View style={styles.headerSkeleton}>
      <View style={styles.headerTopSkeleton}>
        <SkeletonLoader width={120} height={16} />
        <SkeletonLoader width={30} height={30} borderRadius={15} />
      </View>
      <SkeletonLoader
        width="100%"
        height={50}
        borderRadius={25}
        style={{ marginTop: 15 }}
      />
    </View>

    {/* Banner Skeleton */}
    <BannerSkeleton />

    {/* Categories Skeleton */}
    <View style={styles.sectionSkeleton}>
      <SkeletonLoader
        width={150}
        height={22}
        style={{ marginBottom: 15, marginLeft: 20 }}
      />
      <View style={styles.categoriesSkeleton}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <CategoryItemSkeleton key={item} />
        ))}
      </View>
    </View>

    {/* Restaurants Skeleton */}
    <View style={styles.sectionSkeleton}>
      <SkeletonLoader
        width={200}
        height={22}
        style={{ marginBottom: 15, marginLeft: 20 }}
      />
      <View style={styles.restaurantsSkeleton}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <RestaurantCardSkeleton key={item} />
        ))}
      </View>
    </View>
  </View>
);

// Restaurant Details Skeleton
export const RestaurantDetailsSkeleton = () => (
  <View style={styles.container}>
    {/* Header Skeleton */}
    <View style={styles.restaurantHeaderSkeleton}>
      <SkeletonLoader width={30} height={30} borderRadius={15} />
      <SkeletonLoader width={150} height={18} />
      <SkeletonLoader width={30} height={30} borderRadius={15} />
    </View>

    {/* Restaurant Info Skeleton */}
    <View style={styles.restaurantInfoCardSkeleton}>
      <SkeletonLoader width="100%" height={200} borderRadius={15} />
      <View style={styles.restaurantDetailsSkeleton}>
        <View style={styles.restaurantHeaderDetailsSkeleton}>
          <SkeletonLoader width="70%" height={24} />
          <SkeletonLoader width={30} height={30} borderRadius={15} />
        </View>
        <View style={styles.restaurantStatsSkeleton}>
          <SkeletonLoader width={80} height={16} />
          <SkeletonLoader width={100} height={16} />
          <SkeletonLoader width={60} height={20} borderRadius={10} />
        </View>
      </View>
    </View>

    {/* Menu Items Skeleton */}
    <View style={styles.menuContainerSkeleton}>
      <SkeletonLoader width={80} height={20} style={{ marginBottom: 15 }} />
      {[1, 2, 3, 4, 5, 6].map(item => (
        <MenuItemSkeleton key={item} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skeleton: {
    backgroundColor: colors.skeltonBackground,
  },

  // Restaurant Card Skeleton
  restaurantCardSkeleton: {
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
  restaurantInfoSkeleton: {
    padding: 15,
  },

  // Category Item Skeleton
  categoryItemSkeleton: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },

  // Menu Item Skeleton
  menuItemSkeleton: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  menuItemInfoSkeleton: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  menuItemFooterSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Banner Skeleton
  bannerSkeleton: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },

  // Home Screen Skeleton
  headerSkeleton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTopSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionSkeleton: {
    marginBottom: 20,
  },
  categoriesSkeleton: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  restaurantsSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  // Restaurant Details Skeleton
  restaurantHeaderSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  restaurantInfoCardSkeleton: {
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
  restaurantDetailsSkeleton: {
    padding: 20,
  },
  restaurantHeaderDetailsSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  restaurantStatsSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  menuContainerSkeleton: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
  },
});

export default SkeletonLoader;
