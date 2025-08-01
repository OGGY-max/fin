import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { Agent } from '../types';

// Mock data
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
];

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Automotive', 'Sports'];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleAgentPress = (agentId: string) => {
    navigation.navigate('AgentProfile', { agentId });
  };

  const handleBookNow = (agentId: string) => {
    navigation.navigate('VerificationRequest');
  };

  const handleNewVerification = () => {
    navigation.navigate('VerificationRequest');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={theme.colors.accent} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color={theme.colors.accent} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color={theme.colors.lightGray} />
      );
    }

    return stars;
  };

  const renderAgentCard = ({ item }: { item: Agent }) => (
    <TouchableOpacity
      style={styles.agentCard}
      onPress={() => handleAgentPress(item.id)}
    >
      <View style={styles.agentHeader}>
        <Image
          source={{ uri: item.profilePhoto }}
          style={styles.agentPhoto}
        />
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>{item.name}</Text>
          <Text style={styles.agentLocation}>{item.location}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>({item.rating})</Text>
          </View>
        </View>
      </View>
      <View style={styles.agentStats}>
        <Text style={styles.statsText}>
          {item.completedVerifications} verifications • {item.experience} experience
        </Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBookNow(item.id)}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for verifiers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedLocation === 'nearby' && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedLocation(selectedLocation === 'nearby' ? '' : 'nearby')}
          >
            <Ionicons name="location" size={16} color={
              selectedLocation === 'nearby' ? theme.colors.white : theme.colors.primary
            } />
            <Text style={[
              styles.filterText,
              selectedLocation === 'nearby' && styles.filterTextSelected,
            ]}>Nearby</Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipSelected,
              ]}
              onPress={() => setSelectedCategory(selectedCategory === category ? '' : category)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextSelected,
              ]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={mockAgents}
        renderItem={renderAgentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.agentsList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewVerification}
      >
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
  searchContainer: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.white,
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
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
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
    marginBottom: theme.spacing.medium,
  },
  statsText: {
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

export default HomeScreen;