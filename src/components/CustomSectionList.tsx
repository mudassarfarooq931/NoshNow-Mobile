import * as React from 'react';
import {
  View,
  SectionList as RNSectionList,
  SectionListProps,
  ViewStyle,
  RegisteredStyle,
  SectionListData,
} from 'react-native';
import TabBar from './TabBar';

interface IProps extends SectionListProps<any> {
  scrollToLocationOffset?: number;
  tabBarStyle?: ViewStyle | RegisteredStyle<ViewStyle>;
  renderTab: (section: SectionListData<any>) => React.ReactNode;
}

interface IState {
  currentIndex: number;
}

export default class CustomSectionList extends React.PureComponent<
  IProps,
  IState
> {
  state: IState = {
    currentIndex: 0,
  };

  private blockUpdateIndex: boolean = false;
  private sectionList: React.RefObject<RNSectionList<any>> = React.createRef();

  render() {
    const { sections, renderTab, tabBarStyle, scrollToLocationOffset } =
      this.props;

    const prepareSections = sections.map((item, index) => ({ ...item, index }));

    return (
      <View style={{ flex: 1 }}>
        <TabBar
          sections={prepareSections}
          renderTab={renderTab}
          tabBarStyle={tabBarStyle}
          currentIndex={this.state.currentIndex}
          onPress={(index: number) => {
            this.setState({ currentIndex: index });
            this.blockUpdateIndex = true;

            const sectionList = this.sectionList.current;
            if (sectionList && sectionList.scrollToLocation) {
              sectionList.scrollToLocation({
                animated: true,
                itemIndex: 0,
                viewOffset: scrollToLocationOffset || 0,
                sectionIndex: index,
              });
            }
          }}
        />

        <RNSectionList
          {...this.props}
          sections={prepareSections}
          onViewableItemsChanged={({ viewableItems }) => {
            if (!this.blockUpdateIndex && viewableItems.length > 0) {
              // Find the section that has the most visible items
              const sectionVisibility = {};
              viewableItems.forEach(item => {
                const sectionIndex = item.section.index;
                sectionVisibility[sectionIndex] =
                  (sectionVisibility[sectionIndex] || 0) + 1;
              });

              // Get the section with the most visible items
              const mostVisibleSection = Object.keys(sectionVisibility).reduce(
                (a, b) => (sectionVisibility[a] > sectionVisibility[b] ? a : b),
              );

              const currentIndex = parseInt(mostVisibleSection);
              if (this.state.currentIndex !== currentIndex) {
                this.setState({ currentIndex });
              }
            }
          }}
          viewabilityConfig={{
            minimumViewTime: 50,
            itemVisiblePercentThreshold: 30,
          }}
          onScrollBeginDrag={() => (this.blockUpdateIndex = false)}
          ref={this.sectionList as React.RefObject<any>}
          onMomentumScrollEnd={() => (this.blockUpdateIndex = false)}
        />
      </View>
    );
  }
}
