import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { Agent } from '../types';

// Mock data for all agents
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, NY',
    rating: 4.9,
    profilePhoto: 'https://via.placeholder.com/60',
    experience: '3 years',
    completedVerifications: 245,
    verificationHistory: [],
  },
  {
    id: '2',
    name: 'Mike Chen',
    location: 'San Francisco, CA',
    rating: 4.8,
    profilePhoto: 'https://via.placeholder.com/60',
    experience: '2 years',
    completedVerifications: 189,
    verificationHistory: [],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Los Angeles, CA',
    rating: 4.7,
    profilePhoto: 'https://via.placeholder.com/60',
    experience: '4 years',
    completedVerifications: 312,
    verificationHistory: [],
  },
  {
    id: '4',
    name: 'David Kim',
    location: 'Chicago, IL',
    rating: 4.6,
    profilePhoto: 'https://via.placeholder.com/60',
    experience: '1.5 years',
    completedVerifications: 98,
    verificationHistory: [],
  },
  {
    id: '5',
    name: 'Lisa Wang',
    location: 'Austin, TX',
    rating: 4.8,
    profilePhoto: 'https://via.placeholder.com/60',
    experience: '2.5 years',
    completedVerifications: 156,
    verificationHistory: [],
  },
  {
    id: '6',
    name: 'James Thompson',
    location: 'Miami, FL',
    rating: 4.5,
    profilePhoto: 'https://via.placeholder.com/60',
    experience: '1 year',
    completedVerifications: 67,
    verificationHistory: [],
  },
];

const filterOptions = [
  { key: 'all', label: 'All Agents' },
  { key: 'top_rated', label: 'Top Rated' },
  { key: 'most_experienced', label: 'Most Experienced' },
  { key: 'nearby', label: 'Nearby' },
];

const sortOptions = [
  { key: 'rating', label: 'Rating' },
  { key: 'experience', label: 'Experience' },
  { key: 'verifications', label: 'Verifications' },
];

const AgentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('rating');

  const handleAgentPress = (agentId: string) => {
    navigation.navigate('AgentProfile', { agentId });
  };

  const handleBookAgent = (agentId: string) => {
    navigation.navigate('VerificationRequest');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={14} color={theme.colors.accent} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color={theme.colors.accent} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={14} color={theme.colors.lightGray} />
      );
    }

    return stars;
  };

  const getFilteredAndSortedAgents = () => {
    let filteredAgents = [...mockAgents];

    // Apply search filter
    if (searchQuery) {
      filteredAgents = filteredAgents.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (selectedFilter) {
      case 'top_rated':
        filteredAgents = filteredAgents.filter(agent => agent.rating >= 4.7);
        break;
      case 'most_experienced':
        filteredAgents = filteredAgents.filter(agent => {
          const years = parseFloat(agent.experience);
          return years >= 2;
        });
        break;
      case 'nearby':
        // Mock nearby filter - in real app would use location
        filteredAgents = filteredAgents.filter(agent => 
          agent.location.includes('New York') || agent.location.includes('Los Angeles')
        );
        break;
    }

    // Apply sorting
    switch (selectedSort) {
      case 'rating':
        filteredAgents.sort((a, b) => b.rating - a.rating);
        break;
      case 'experience':
        filteredAgents.sort((a, b) => {
          const aYears = parseFloat(a.experience);
          const bYears = parseFloat(b.experience);
          return bYears - aYears;
        });
        break;
      case 'verifications':
        filteredAgents.sort((a, b) => b.completedVerifications - a.completedVerifications);
        break;
    }

    return filteredAgents;
  };

  const renderFilterChip = (filter: typeof filterOptions[0]) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterChip,
        selectedFilter === filter.key && styles.filterChipSelected,
      ]}
      onPress={() => setSelectedFilter(filter.key)}
    >
      <Text style={[
        styles.filterText,
        selectedFilter === filter.key && styles.filterTextSelected,
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const renderAgentCard = ({ item }: { item: Agent }) => (
    <TouchableOpacity
      style={styles.agentCard}
      onPress={() => handleAgentPress(item.id)}
    >
      <View style={styles.agentHeader}>
        <Image source={{ uri: item.profilePhoto }} style={styles.agentPhoto} />
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>{item.name}</Text>
          <Text style={styles.agentLocation}>{item.location}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>({item.rating})</Text>
          </View>
        </View>
        <View style={styles.agentStats}>
          <Text style={styles.statsNumber}>{item.completedVerifications}</Text>
          <Text style={styles.statsLabel}>Verifications</Text>
        </View>
      </View>
      
      <View style={styles.agentDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={theme.colors.gray} />
          <Text style={styles.detailText}>{item.experience} experience</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
          <Text style={styles.detailText}>Verified agent</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBookAgent(item.id)}
      >
        <Text style={styles.bookButtonText}>Book Verification</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filteredAgents = getFilteredAndSortedAgents();

  return (
    <SafeAreaView style={styles.container}>
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search agents by name or location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filterOptions.map(renderFilterChip)}
        </ScrollView>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sortOptions.map((sort) => (
              <TouchableOpacity
                key={sort.key}
                style={[
                  styles.sortChip,
                  selectedSort === sort.key && styles.sortChipSelected,
                ]}
                onPress={() => setSelectedSort(sort.key)}
              >
                <Text style={[
                  styles.sortText,
                  selectedSort === sort.key && styles.sortTextSelected,
                ]}>
                  {sort.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Agents List */}
      <FlatList
        data={filteredAgents}
        renderItem={renderAgentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.agentsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={theme.colors.gray} />
            <Text style={styles.emptyTitle}>No agents found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    marginBottom: theme.spacing.medium,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.black,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.medium,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.large,
    marginRight: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  filterChipSelected: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: theme.colors.white,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
    color: theme.colors.darkGray,
    marginRight: theme.spacing.medium,
  },
  sortChip: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.medium,
    marginRight: theme.spacing.small,
  },
  sortChipSelected: {
    backgroundColor: theme.colors.accent,
  },
  sortText: {
    color: theme.colors.darkGray,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  sortTextSelected: {
    color: theme.colors.white,
  },
  resultsHeader: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  resultsText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
  },
  agentsList: {
    padding: theme.spacing.medium,
  },
  agentCard: {
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
  agentHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.medium,
  },
  agentPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.medium,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  agentLocation: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  agentStats: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statsLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  agentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.medium,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  bookButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    alignItems: 'center',
  },
  bookButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
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
});

export default AgentsScreen;