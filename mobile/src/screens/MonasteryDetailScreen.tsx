import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MonasteryDetailScreen = ({ route, navigation }: any) => {
  const { monastery } = route.params;
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'information-circle' },
    { id: 'tours', title: 'Tours', icon: 'camera' },
    { id: 'artifacts', title: 'Artifacts', icon: 'library' },
    { id: 'history', title: 'History', icon: 'book' },
  ];

  const handleVirtualTour = () => {
    Alert.alert(
      'Virtual Tour',
      'Virtual tour functionality will be implemented with 360° panorama viewer.',
      [{ text: 'OK' }]
    );
  };

  const handleARExperience = () => {
    Alert.alert(
      'AR Experience',
      'AR experience will be implemented with ARCore/ARKit integration.',
      [{ text: 'OK' }]
    );
  };

  const handleDirections = () => {
    Alert.alert(
      'Directions',
      'GPS navigation will be implemented with map integration.',
      [{ text: 'OK' }]
    );
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#6B7280" />
          <Text style={styles.infoText}>{monastery.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#6B7280" />
          <Text style={styles.infoText}>Established {monastery.established}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="star" size={20} color="#F59E0B" />
          <Text style={styles.infoText}>Rating: {monastery.rating}/5</Text>
        </View>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.description}>{monastery.description}</Text>
      </View>

      <View style={styles.featuresCard}>
        <Text style={styles.cardTitle}>Available Features</Text>
        <View style={styles.featuresList}>
          {monastery.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderTours = () => (
    <View style={styles.tabContent}>
      <View style={styles.actionCard}>
        <TouchableOpacity style={styles.actionButton} onPress={handleVirtualTour}>
          <View style={styles.actionIcon}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Virtual Tour</Text>
            <Text style={styles.actionDescription}>
              Explore the monastery in 360° panoramic view
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.actionCard}>
        <TouchableOpacity style={styles.actionButton} onPress={handleARExperience}>
          <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}>
            <Ionicons name="cube" size={24} color="white" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>AR Experience</Text>
            <Text style={styles.actionDescription}>
              View 3D models and historical overlays
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderArtifacts = () => (
    <View style={styles.tabContent}>
      <View style={styles.placeholderCard}>
        <Ionicons name="library" size={48} color="#6B7280" />
        <Text style={styles.placeholderTitle}>Artifacts Collection</Text>
        <Text style={styles.placeholderText}>
          Browse through sacred artifacts, statues, and religious objects
        </Text>
      </View>
    </View>
  );

  const renderHistory = () => (
    <View style={styles.tabContent}>
      <View style={styles.placeholderCard}>
        <Ionicons name="book" size={48} color="#6B7280" />
        <Text style={styles.placeholderTitle}>Historical Records</Text>
        <Text style={styles.placeholderText}>
          Learn about the monastery's history, significance, and cultural importance
        </Text>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'tours':
        return renderTours();
      case 'artifacts':
        return renderArtifacts();
      case 'history':
        return renderHistory();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: monastery.image }} style={styles.headerImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Monastery Info */}
        <View style={styles.monasteryInfo}>
          <Text style={styles.monasteryName}>{monastery.name}</Text>
          <Text style={styles.monasteryLocation}>{monastery.location}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(monastery.rating) ? 'star' : 'star-outline'}
                  size={16}
                  color="#F59E0B"
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{monastery.rating}/5</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleVirtualTour}>
            <Ionicons name="camera" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Virtual Tour</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleDirections}>
            <Ionicons name="navigate" size={20} color="#3B82F6" />
            <Text style={styles.secondaryButtonText}>Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.id ? '#3B82F6' : '#6B7280'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monasteryInfo: {
    padding: 20,
    backgroundColor: 'white',
  },
  monasteryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  monasteryLocation: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  tabContent: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
  },
  descriptionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  featuresCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  placeholderCard: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MonasteryDetailScreen;