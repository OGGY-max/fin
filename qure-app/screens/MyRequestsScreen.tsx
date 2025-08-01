import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { VerificationRequest } from '../types';

// Mock data for user's requests
const mockRequests: VerificationRequest[] = [
  {
    id: '1',
    productTitle: 'iPhone 14 Pro',
    productDescription: 'Used iPhone 14 Pro in excellent condition',
    photos: ['https://via.placeholder.com/80'],
    category: 'Electronics',
    location: 'New York, NY',
    preferredAgent: 'Sarah Johnson',
    status: 'completed',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    productTitle: 'Louis Vuitton Bag',
    productDescription: 'Vintage Louis Vuitton handbag',
    photos: ['https://via.placeholder.com/80'],
    category: 'Fashion',
    location: 'New York, NY',
    status: 'in_progress',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    productTitle: 'MacBook Pro 2023',
    productDescription: 'Brand new MacBook Pro with M3 chip',
    photos: ['https://via.placeholder.com/80'],
    category: 'Electronics',
    location: 'New York, NY',
    status: 'pending',
    createdAt: new Date('2024-01-22'),
  },
];

const statusTabs = [
  { key: 'all', label: 'All', count: 3 },
  { key: 'pending', label: 'Pending', count: 1 },
  { key: 'in_progress', label: 'In Progress', count: 1 },
  { key: 'completed', label: 'Completed', count: 1 },
];

const MyRequestsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      case 'pending':
        return theme.colors.gray;
      default:
        return theme.colors.gray;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'in_progress':
        return 'time';
      case 'pending':
        return 'hourglass';
      default:
        return 'help-circle';
    }
  };

  const filteredRequests = selectedTab === 'all' 
    ? mockRequests 
    : mockRequests.filter(request => request.status === selectedTab);

  const handleRequestPress = (request: VerificationRequest) => {
    if (request.status === 'completed') {
      navigation.navigate('VerificationReport', { reportId: request.id });
    } else {
      // Show request details or allow cancellation
      console.log('View request details:', request.id);
    }
  };

  const handleNewRequest = () => {
    navigation.navigate('VerificationRequest');
  };

  const renderTabItem = ({ item }: { item: typeof statusTabs[0] }) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        selectedTab === item.key && styles.tabItemActive,
      ]}
      onPress={() => setSelectedTab(item.key)}
    >
      <Text style={[
        styles.tabText,
        selectedTab === item.key && styles.tabTextActive,
      ]}>
        {item.label}
      </Text>
      <View style={[
        styles.tabBadge,
        selectedTab === item.key && styles.tabBadgeActive,
      ]}>
        <Text style={[
          styles.tabBadgeText,
          selectedTab === item.key && styles.tabBadgeTextActive,
        ]}>
          {item.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderRequestItem = ({ item }: { item: VerificationRequest }) => (
    <TouchableOpacity
      style={styles.requestCard}
      onPress={() => handleRequestPress(item)}
    >
      <View style={styles.requestHeader}>
        <Image source={{ uri: item.photos[0] }} style={styles.requestImage} />
        <View style={styles.requestInfo}>
          <Text style={styles.requestTitle}>{item.productTitle}</Text>
          <Text style={styles.requestCategory}>{item.category}</Text>
          <Text style={styles.requestDate}>
            {item.createdAt.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.requestStatus}>
          <Ionicons
            name={getStatusIcon(item.status)}
            size={24}
            color={getStatusColor(item.status)}
          />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
          </Text>
        </View>
      </View>
      
      {item.preferredAgent && (
        <View style={styles.agentInfo}>
          <Ionicons name="person" size={16} color={theme.colors.gray} />
          <Text style={styles.agentText}>Agent: {item.preferredAgent}</Text>
        </View>
      )}
      
      <View style={styles.locationInfo}>
        <Ionicons name="location" size={16} color={theme.colors.gray} />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={statusTabs}
          renderItem={renderTabItem}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsList}
        />
      </View>

      {/* Requests List */}
      <FlatList
        data={filteredRequests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.requestsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={theme.colors.gray} />
            <Text style={styles.emptyTitle}>No requests found</Text>
            <Text style={styles.emptyText}>
              {selectedTab === 'all' 
                ? "You haven't made any verification requests yet"
                : `No ${selectedTab.replace('_', ' ')} requests found`
              }
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleNewRequest}>
        <Ionicons name="add" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabsContainer: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  tabsList: {
    paddingHorizontal: theme.spacing.medium,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    marginRight: theme.spacing.small,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.background,
  },
  tabItemActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
    color: theme.colors.darkGray,
  },
  tabTextActive: {
    color: theme.colors.white,
  },
  tabBadge: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: theme.spacing.small,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: theme.colors.white,
  },
  tabBadgeText: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.darkGray,
  },
  tabBadgeTextActive: {
    color: theme.colors.primary,
  },
  requestsList: {
    padding: theme.spacing.medium,
  },
  requestCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  requestHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.small,
  },
  requestImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.medium,
    marginRight: theme.spacing.medium,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  requestCategory: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  requestDate: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  requestStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  agentText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxlarge,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.darkGray,
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.small,
  },
  emptyText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.large,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.large,
    bottom: theme.spacing.large,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default MyRequestsScreen;