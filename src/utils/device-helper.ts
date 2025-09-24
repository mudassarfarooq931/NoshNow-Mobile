import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Device type detection based on screen dimensions
 */
export const getDeviceType = () => {
  // Get the smaller dimension to determine device orientation
  const minDimension = Math.min(width, height);
  const maxDimension = Math.max(width, height);

  // Calculate diagonal size in inches (approximate)
  // Using common DPI values for mobile devices
  const diagonalSize = Math.sqrt(width * width + height * height) / 160; // 160 DPI is standard

  // Tablet detection criteria:
  // 1. Minimum dimension should be at least 600px (tablet threshold)
  // 2. Diagonal size should be at least 7 inches
  // 3. Aspect ratio should be reasonable for tablets

  const isTablet =
    minDimension >= 600 ||
    diagonalSize >= 7 ||
    (minDimension >= 500 && maxDimension >= 800);

  return {
    isTablet,
    isMobile: !isTablet,
    width,
    height,
    minDimension,
    maxDimension,
    diagonalSize: Math.round(diagonalSize * 10) / 10, // Round to 1 decimal
    orientation: width > height ? 'landscape' : 'portrait',
    platform: Platform.OS,
  };
};

/**
 * Check if device is tablet
 */
export const isTablet = () => {
  return getDeviceType().isTablet;
};

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return getDeviceType().isMobile;
};

/**
 * Get responsive dimensions based on device type
 */
export const getResponsiveDimensions = () => {
  const deviceInfo = getDeviceType();

  return {
    ...deviceInfo,
    // Responsive padding
    padding: deviceInfo.isTablet ? 24 : 16,
    margin: deviceInfo.isTablet ? 20 : 12,

    // Responsive font sizes
    fontSize: {
      small: deviceInfo.isTablet ? 14 : 12,
      medium: deviceInfo.isTablet ? 16 : 14,
      large: deviceInfo.isTablet ? 20 : 16,
      xlarge: deviceInfo.isTablet ? 24 : 18,
      xxlarge: deviceInfo.isTablet ? 28 : 22,
    },

    // Responsive spacing
    spacing: {
      xs: deviceInfo.isTablet ? 4 : 2,
      sm: deviceInfo.isTablet ? 8 : 4,
      md: deviceInfo.isTablet ? 16 : 8,
      lg: deviceInfo.isTablet ? 24 : 16,
      xl: deviceInfo.isTablet ? 32 : 20,
      xxl: deviceInfo.isTablet ? 48 : 32,
    },

    // Responsive icon sizes
    iconSize: {
      small: deviceInfo.isTablet ? 20 : 16,
      medium: deviceInfo.isTablet ? 24 : 20,
      large: deviceInfo.isTablet ? 32 : 24,
      xlarge: deviceInfo.isTablet ? 40 : 32,
    },

    // Responsive button heights
    buttonHeight: {
      small: deviceInfo.isTablet ? 40 : 32,
      medium: deviceInfo.isTablet ? 48 : 40,
      large: deviceInfo.isTablet ? 56 : 48,
    },
  };
};

/**
 * Get device-specific breakpoints
 */
export const getBreakpoints = () => {
  return {
    mobile: 600,
    tablet: 768,
    desktop: 1024,
    large: 1200,
  };
};

/**
 * Check if current device matches a specific breakpoint
 */
export const isBreakpoint = (
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large',
) => {
  const breakpoints = getBreakpoints();
  const currentWidth = Math.max(width, height);

  switch (breakpoint) {
    case 'mobile':
      return currentWidth < breakpoints.tablet;
    case 'tablet':
      return (
        currentWidth >= breakpoints.tablet && currentWidth < breakpoints.desktop
      );
    case 'desktop':
      return (
        currentWidth >= breakpoints.desktop && currentWidth < breakpoints.large
      );
    case 'large':
      return currentWidth >= breakpoints.large;
    default:
      return false;
  }
};

/**
 * Get device-specific layout configuration
 */
export const getLayoutConfig = () => {
  const deviceInfo = getDeviceType();

  return {
    // Grid columns based on device type
    gridColumns: deviceInfo.isTablet ? 3 : 2,

    // Card width based on device type
    cardWidth: deviceInfo.isTablet ? '30%' : '45%',

    // Modal width based on device type
    modalWidth: deviceInfo.isTablet ? '60%' : '90%',

    // List item height based on device type
    listItemHeight: deviceInfo.isTablet ? 80 : 60,

    // Header height based on device type
    headerHeight: deviceInfo.isTablet ? 80 : 60,

    // Tab bar height based on device type
    tabBarHeight: deviceInfo.isTablet ? 80 : 60,
  };
};

export default {
  getDeviceType,
  isTablet,
  isMobile,
  getResponsiveDimensions,
  getBreakpoints,
  isBreakpoint,
  getLayoutConfig,
};
