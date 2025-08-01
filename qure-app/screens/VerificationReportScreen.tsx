import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { theme } from '../constants/theme';

// Mock data for verification report
const mockReport = {
  id: '1',
  productName: 'iPhone 14 Pro',
  category: 'Electronics',
  photos: [
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
  ],
  agentName: 'Sarah Johnson',
  agentId: '1',
  agentPhoto: 'https://via.placeholder.com/50',
  report: `After thorough inspection of this iPhone 14 Pro, I can confirm the following:

AUTHENTICITY: ✅ VERIFIED
The device shows all the hallmarks of a genuine Apple product including:
- Correct serial number formatting and Apple verification
- Authentic build quality and materials
- Original Apple packaging and accessories

CONDITION ASSESSMENT: Excellent (9/10)
- Screen: Perfect condition, no scratches or cracks
- Body: Minor scuff marks on the bottom edge (barely visible)
- Camera: All lenses clear and functional
- Battery: Health at 95%, excellent performance
- Functionality: All features tested and working perfectly

INCLUDED ITEMS:
- iPhone 14 Pro (128GB, Deep Purple)
- Original Lightning cable
- Original box with all documentation
- Unused EarPods

RECOMMENDATION: This is an excellent purchase. The device is authentic and in outstanding condition with minimal wear. The seller has maintained the device very well.`,
  status: 'verified' as const,
  date: new Date('2024-01-15'),
  location: 'New York, NY',
  verificationCode: 'QUR-2024-001234',
};

const VerificationReportScreen: React.FC = () => {
  const route = useRoute();

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      default:
        return 'time';
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Qure Verification Report\n\nProduct: ${mockReport.productName}\nStatus: ${mockReport.status.toUpperCase()}\nVerified by: ${mockReport.agentName}\nVerification Code: ${mockReport.verificationCode}\n\nTrusted by Qure - Verified by Real People`,
        title: 'Qure Verification Report',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share report');
    }
  };

  const handleDownload = () => {
    Alert.alert('Download', 'PDF download functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            <Ionicons
              name={getStatusIcon(mockReport.status)}
              size={32}
              color={getStatusColor(mockReport.status)}
            />
            <Text style={[styles.statusText, { color: getStatusColor(mockReport.status) }]}>
              {mockReport.status.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.verificationCode}>#{mockReport.verificationCode}</Text>
        </View>

        {/* Product Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Information</Text>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{mockReport.productName}</Text>
            <Text style={styles.productCategory}>{mockReport.category}</Text>
          </View>
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
            {mockReport.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.productPhoto} />
            ))}
          </ScrollView>
        </View>

        {/* Agent Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verified By</Text>
          <View style={styles.agentInfo}>
            <Image source={{ uri: mockReport.agentPhoto }} style={styles.agentPhoto} />
            <View style={styles.agentDetails}>
              <Text style={styles.agentName}>{mockReport.agentName}</Text>
              <Text style={styles.agentLocation}>{mockReport.location}</Text>
              <Text style={styles.verificationDate}>
                Verified on {mockReport.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Report */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Report</Text>
          <Text style={styles.reportText}>{mockReport.report}</Text>
        </View>

        {/* Trust Badge */}
        <View style={styles.trustBadge}>
          <View style={styles.trustBadgeHeader}>
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.primary} />
            <Text style={styles.trustBadgeTitle}>Qure Verified</Text>
          </View>
          <Text style={styles.trustBadgeText}>
            This verification was conducted by a Qure-certified agent following our strict authentication protocols.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share" size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Share Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
            <Ionicons name="download" size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Download PDF</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    alignItems: 'center',
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  statusText: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    marginTop: theme.spacing.small,
  },
  verificationCode: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
    fontFamily: 'monospace',
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
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  productCategory: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.gray,
  },
  photosContainer: {
    marginHorizontal: -theme.spacing.medium,
  },
  productPhoto: {
    width: 200,
    height: 150,
    borderRadius: theme.borderRadius.medium,
    marginRight: theme.spacing.medium,
    marginLeft: theme.spacing.medium,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.medium,
  },
  agentDetails: {
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
  verificationDate: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
  },
  reportText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.darkGray,
    lineHeight: 22,
  },
  trustBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
  trustBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  trustBadgeTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginLeft: theme.spacing.small,
  },
  trustBadgeText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.white,
    opacity: 0.9,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default VerificationReportScreen;