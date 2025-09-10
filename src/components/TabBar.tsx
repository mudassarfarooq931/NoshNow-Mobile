import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  RegisteredStyle,
  SectionListData,
} from 'react-native';
import { colors } from '../constants';

interface TabBarProps {
  sections: SectionListData<any>[];
  renderTab: (section: SectionListData<any>) => React.ReactNode;
  tabBarStyle?: ViewStyle | RegisteredStyle<ViewStyle>;
  currentIndex: number;
  onPress: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  sections,
  renderTab,
  tabBarStyle,
  currentIndex,
  onPress,
}) => {
  return (
    <View style={[styles.tabBar, tabBarStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(index)}
            style={styles.tabWrapper}
          >
            {renderTab({ ...section, isActive: currentIndex === index })}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    height: 70,
  },
  tabContainer: {
    paddingHorizontal: 10,
  },
  tabWrapper: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
};

export default TabBar;
