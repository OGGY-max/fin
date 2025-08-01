import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { VerificationReport } from '../types';

// Mock data for agent profile
const mockAgent = {
  id: '1',
  name: 'Sarah Johnson',
  location: 'New York, NY',
  rating: 4.9,
  profilePhoto: 'https://via.placeholder.com/120',
  experience: '3 years',
  completedVerifications: 245,
  memberSince: 'January 2021',
  bio: 'Professional verification specialist with expertise in electronics and luxury goods. I provide thorough, honest assessments to help buyers make informed decisions.',
  specialties: ['Electronics', 'Fashion', 'Luxury Items'],
  responseTime: 'Usually responds within 2 hours',
  verificationHistory: [
    {
      id: '1',
      productName: 'iPhone 14 Pro',
      category: 'Electronics',
      photos: ['https://via.placeholder.com/60'],
      agentName: 'Sarah Johnson',
      agentId: '1',
      report: 'Product is authentic and in excellent condition.',
      status: 'verified' as const,
      date: new Date('2024-01-15'),
      location: 'New York, NY',
    },
    {
      id: '2',
      productName: 'Louis Vuitton Bag',
      category: 'Fashion',
      photos: ['https://via.placeholder.com/60'],
      agentName: 'Sarah Johnson',
      agentId: '1',
      report: 'Verified authentic with all original components.',
      status: 'verified' as const,
      date: new Date('2024-01-10'),
      location: 'New York, NY',
    },
    {
      id: '3',
      productName: 'MacBook Pro',
      category: 'Electronics',
      photos: ['https://via.placeholder.com/60'],
      agentName: 'Sarah Johnson',
      agentId: '1',
      report: 'Minor cosmetic issues but fully functional.',
      status: 'verified' as const,
      date: new Date('2024-01-05'),
      location: 'New York, NY',
    },
  ],
};

const AgentProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleRequestVerification = () => {
    navigation.navigate('VerificationRequest');
  };

  const handleViewReport = (reportId: string) => {
    navigation.navigate('VerificationReport', { reportId });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return theme.colors.success;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  };

  const renderVerificationItem = ({ item }: { item: VerificationReport }) => (
    <TouchableOpacity
      style={styles.verificationItem}
      onPress={() => handleViewReport(item.id)}
    >
      <View style={styles.verificationHeader}>
        <Image source={{ uri: item.photos[0] }} style={styles.verificationImage} />
        <View style={styles.verificationInfo}>
          <Text style={styles.verificationTitle}>{item.productName}</Text>
          <Text style={styles.verificationCategory}>{item.category}</Text>
          <View style={styles.verificationStatus}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.verificationDate}>
          {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: mockAgent.profilePhoto }} style={styles.profilePhoto} />
          <View style={styles.profileInfo}>
            <Text style={styles.agentName}>{mockAgent.name}</Text>
            <Text style={styles.agentLocation}>{mockAgent.location}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(mockAgent.rating)}
              <Text style={styles.ratingText}>({mockAgent.rating})</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockAgent.completedVerifications}</Text>
            <Text style={styles.statLabel}>Verifications</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockAgent.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{mockAgent.bio}</Text>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={20} color={theme.colors.primary} />
            <Text style={styles.detailText}>Member since {mockAgent.memberSince}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={20} color={theme.colors.primary} />
            <Text style={styles.detailText}>{mockAgent.responseTime}</Text>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.specialtiesContainer}>
            {mockAgent.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyChip}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Verifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Verifications</Text>
          <FlatList
            data={mockAgent.verificationHistory}
            renderItem={renderVerificationItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Request Button */}
        <TouchableOpacity style={styles.requestButton} onPress={handleRequestVerification}>
          <Text style={styles.requestButtonText}>Request Verification from this Agent</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.medium,
  },
  profileHeader: {
    flexDirection: 'row',
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
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: theme.spacing.medium,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  agentName: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  agentLocation: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
    marginBottom: theme.spacing.small,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
  },
  statsContainer: {
    flexDirection: 'row',
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
    textAlign: 'center',
  },
  section: {
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
  sectionTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.medium,
  },
  bioText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGray,
    lineHeight: 22,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  detailText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGray,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyChip: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    marginRight: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  specialtyText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  verificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
    paddingVertical: theme.spacing.medium,
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationImage: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.medium,
    marginRight: theme.spacing.medium,
  },
  verificationInfo: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  verificationCategory: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
    marginBottom: theme.spacing.xs,
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.small,
  },
  statusText: {
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  verificationDate: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  requestButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  requestButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
  },
});

export default AgentProfileScreen;