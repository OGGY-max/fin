import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../constants/theme';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Automotive',
  'Sports',
  'Books & Media',
  'Health & Beauty',
  'Toys & Games',
];

const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
];

const mockAgents = [
  { id: '1', name: 'Sarah Johnson', location: 'New York, NY' },
  { id: '2', name: 'Mike Chen', location: 'San Francisco, CA' },
  { id: '3', name: 'Emily Rodriguez', location: 'Los Angeles, CA' },
];

const VerificationRequestScreen: React.FC = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    if (!productTitle || !productDescription || !selectedCategory || !selectedLocation) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Request Submitted',
      'Your verification request has been submitted successfully!',
      [{ text: 'OK', onPress: () => {/* Navigate back */} }]
    );
  };

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedCategory(item);
        setShowCategoryModal(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
      {selectedCategory === item && (
        <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  const renderLocationItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedLocation(item);
        setShowLocationModal(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
      {selectedLocation === item && (
        <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  const renderAgentItem = ({ item }: { item: typeof mockAgents[0] }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedAgent(item.name);
        setShowAgentModal(false);
      }}
    >
      <View>
        <Text style={styles.modalItemText}>{item.name}</Text>
        <Text style={styles.modalItemSubtext}>{item.location}</Text>
      </View>
      {selectedAgent === item.name && (
        <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product title"
              value={productTitle}
              onChangeText={setProductTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the product you want verified"
              value={productDescription}
              onChangeText={setProductDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Photos</Text>
            <View style={styles.photoContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {photos.map((photo, index) => (
                  <View key={index} style={styles.photoWrapper}>
                    <Image source={{ uri: photo }} style={styles.photo} />
                    <TouchableOpacity
                      style={styles.removePhotoButton}
                      onPress={() => removePhoto(index)}
                    >
                      <Ionicons name="close" size={16} color={theme.colors.white} />
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                  <Ionicons name="camera" size={24} color={theme.colors.gray} />
                  <Text style={styles.addPhotoText}>Add Photo</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.photoActions}>
              <TouchableOpacity style={styles.photoActionButton} onPress={pickImage}>
                <Ionicons name="image" size={20} color={theme.colors.primary} />
                <Text style={styles.photoActionText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoActionButton} onPress={takePhoto}>
                <Ionicons name="camera" size={20} color={theme.colors.primary} />
                <Text style={styles.photoActionText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={[styles.selectButtonText, !selectedCategory && styles.placeholder]}>
                {selectedCategory || 'Select category'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowLocationModal(true)}
            >
              <Text style={[styles.selectButtonText, !selectedLocation && styles.placeholder]}>
                {selectedLocation || 'Select your location'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Agent (Optional)</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowAgentModal(true)}
            >
              <Text style={[styles.selectButtonText, !selectedAgent && styles.placeholder]}>
                {selectedAgent || 'Choose an agent'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Request Qure Check</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Ionicons name="close" size={24} color={theme.colors.gray} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal
        visible={showLocationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Ionicons name="close" size={24} color={theme.colors.gray} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={locations}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Agent Modal */}
      <Modal
        visible={showAgentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAgentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Agent</Text>
              <TouchableOpacity onPress={() => setShowAgentModal(false)}>
                <Ionicons name="close" size={24} color={theme.colors.gray} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={mockAgents}
              renderItem={renderAgentItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
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
  form: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
  },
  inputGroup: {
    marginBottom: theme.spacing.large,
  },
  label: {
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
    color: theme.colors.darkGray,
    marginBottom: theme.spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    fontSize: theme.fontSizes.medium,
    backgroundColor: theme.colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },
  selectButtonText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.black,
  },
  placeholder: {
    color: theme.colors.gray,
  },
  photoContainer: {
    marginBottom: theme.spacing.small,
  },
  photoWrapper: {
    position: 'relative',
    marginRight: theme.spacing.small,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.medium,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
  },
  photoActionText: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    maxHeight: '80%',
    padding: theme.spacing.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
    paddingBottom: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
  modalTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  modalItemText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.black,
  },
  modalItemSubtext: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.gray,
    marginTop: theme.spacing.xs,
  },
});

export default VerificationRequestScreen;