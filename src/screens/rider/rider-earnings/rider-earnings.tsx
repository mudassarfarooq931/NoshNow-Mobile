import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { colors } from '../../../constants';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Package,
  Star,
  Download,
  Filter,
  BarChart3,
} from 'lucide-react-native';
import { riderStats, staticOrders } from '../../../constants/static-data';

const { width } = Dimensions.get('window');

const RiderEarnings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const riderOrders = staticOrders.filter(order => order.riderId === user?.id);
  const completedOrders = riderOrders.filter(
    order => order.status === 'delivered',
  );

  const calculateEarnings = (period: string) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }

    return completedOrders
      .filter(order => new Date(order.orderTime) >= startDate)
      .reduce((total, order) => total + order.riderEarnings, 0);
  };

  const calculateDeliveries = (period: string) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }

    return completedOrders.filter(
      order => new Date(order.orderTime) >= startDate,
    ).length;
  };

  const periodOptions = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
  ];

  const earnings = calculateEarnings(selectedPeriod);
  const deliveries = calculateDeliveries(selectedPeriod);
  const averageEarning = deliveries > 0 ? earnings / deliveries : 0;

  const handleDownloadReport = () => {
    // Handle download report functionality
    console.log('Download report');
  };

  const handleFilter = () => {
    // Handle filter functionality
    console.log('Filter earnings');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFilter}>
            <Filter size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDownloadReport}
          >
            <Download size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodContent}
          >
            {periodOptions.map(option => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.periodTab,
                  selectedPeriod === option.key && styles.periodTabActive,
                ]}
                onPress={() => setSelectedPeriod(option.key)}
              >
                <Text
                  style={[
                    styles.periodTabText,
                    selectedPeriod === option.key && styles.periodTabTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Earnings Overview */}
        <View style={styles.overviewContainer}>
          <View style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <DollarSign size={24} color={colors.primary} />
              <Text style={[styles.overviewChange, { color: colors.success }]}>
                +12%
              </Text>
            </View>
            <Text style={styles.overviewValue}>${earnings.toFixed(2)}</Text>
            <Text style={styles.overviewTitle}>Total Earnings</Text>
          </View>

          <View style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <TrendingUp size={24} color={colors.success} />
              <Text style={[styles.overviewChange, { color: colors.success }]}>
                +8%
              </Text>
            </View>
            <Text style={styles.overviewValue}>
              ${averageEarning.toFixed(2)}
            </Text>
            <Text style={styles.overviewTitle}>Average per Delivery</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Package size={24} color={colors.primary} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +8%
              </Text>
            </View>
            <Text style={styles.statValue}>{riderStats.totalDeliveries}</Text>
            <Text style={styles.statTitle}>Total Deliveries</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <DollarSign size={24} color={colors.success} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +15%
              </Text>
            </View>
            <Text style={styles.statValue}>${riderStats.totalEarnings}</Text>
            <Text style={styles.statTitle}>Lifetime Earnings</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Star size={24} color={colors.warning} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +5%
              </Text>
            </View>
            <Text style={styles.statValue}>{riderStats.averageRating}</Text>
            <Text style={styles.statTitle}>Average Rating</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Clock size={24} color={colors.info} />
              <Text style={[styles.statChange, { color: colors.success }]}>
                +12%
              </Text>
            </View>
            <Text style={styles.statValue}>{riderStats.completedToday}</Text>
            <Text style={styles.statTitle}>Today's Deliveries</Text>
          </View>
        </View>

        {/* Earnings Chart Placeholder */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Earnings Trend</Text>
            <BarChart3 size={20} color={colors.primary} />
          </View>
          <View style={styles.chartPlaceholder}>
            <BarChart3 size={48} color={colors.lighterGray} />
            <Text style={styles.chartPlaceholderText}>
              Chart will be displayed here
            </Text>
          </View>
        </View>

        {/* Recent Earnings */}
        <View style={styles.recentEarningsContainer}>
          <Text style={styles.sectionTitle}>Recent Earnings</Text>

          {completedOrders.slice(0, 5).map((order, index) => (
            <View key={order.id} style={styles.earningItem}>
              <View style={styles.earningInfo}>
                <Text style={styles.earningOrderId}>Order #{order.id}</Text>
                <Text style={styles.earningRestaurant}>
                  {order.restaurantName}
                </Text>
                <Text style={styles.earningDate}>
                  {new Date(order.orderTime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              <View style={styles.earningAmount}>
                <Text style={styles.earningValue}>+${order.riderEarnings}</Text>
                <Text style={styles.earningStatus}>Completed</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>

          <View style={styles.metricItem}>
            <View style={styles.metricInfo}>
              <Text style={styles.metricLabel}>Delivery Success Rate</Text>
              <Text style={styles.metricValue}>98.5%</Text>
            </View>
            <View style={styles.metricBar}>
              <View style={[styles.metricProgress, { width: '98.5%' }]} />
            </View>
          </View>

          <View style={styles.metricItem}>
            <View style={styles.metricInfo}>
              <Text style={styles.metricLabel}>On-Time Delivery</Text>
              <Text style={styles.metricValue}>94.2%</Text>
            </View>
            <View style={styles.metricBar}>
              <View style={[styles.metricProgress, { width: '94.2%' }]} />
            </View>
          </View>

          <View style={styles.metricItem}>
            <View style={styles.metricInfo}>
              <Text style={styles.metricLabel}>Customer Rating</Text>
              <Text style={styles.metricValue}>4.7/5.0</Text>
            </View>
            <View style={styles.metricBar}>
              <View style={[styles.metricProgress, { width: '94%' }]} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionCard}>
            <Download size={24} color={colors.primary} />
            <Text style={styles.actionText}>Download Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Calendar size={24} color={colors.primary} />
            <Text style={styles.actionText}>View Calendar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  periodContainer: {
    backgroundColor: colors.white,
    paddingVertical: 8,
  },
  periodContent: {
    paddingHorizontal: 20,
  },
  periodTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginRight: 6,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodTabActive: {
    backgroundColor: colors.primary,
  },
  periodTabText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '500',
  },
  periodTabTextActive: {
    color: colors.white,
  },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  overviewCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: 12,
    color: colors.gray,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  overviewChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: colors.gray,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicBlack,
    marginBottom: 15,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    borderRadius: 8,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 12,
  },
  recentEarningsContainer: {
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  earningInfo: {
    flex: 1,
  },
  earningOrderId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  earningRestaurant: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  earningDate: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  earningAmount: {
    alignItems: 'flex-end',
  },
  earningValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },
  earningStatus: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  metricsContainer: {
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricItem: {
    marginBottom: 20,
  },
  metricInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.black,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  metricBar: {
    height: 6,
    backgroundColor: colors.lighterGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricProgress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginTop: 8,
  },
});

export default RiderEarnings;
