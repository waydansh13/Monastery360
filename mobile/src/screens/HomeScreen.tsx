import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const featuredMonasteries = [
    {
      id: 1,
      name: 'Rumtek Monastery',
      location: 'Gangtok, East Sikkim',
      image: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Rumtek+Monastery',
      features: ['Virtual Tour', '3D Model', 'AR Experience'],
    },
    {
      id: 2,
      name: 'Pemayangtse Monastery',
      location: 'Pelling, West Sikkim',
      image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Pemayangtse',
      features: ['Virtual Tour', '3D Model'],
    },
    {
      id: 3,
      name: 'Tashiding Monastery',
      location: 'Tashiding, West Sikkim',
      image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Tashiding',
      features: ['Virtual Tour', 'Cultural Events'],
    },
  ];

  const quickActions = [
    {
      title: 'Virtual Tours',
      icon: 'camera',
      color: '#3B82F6',
      description: 'Explore monasteries in 360°',
    },
    {
      title: 'AR Experience',
      icon: 'cube',
      color: '#8B5CF6',
      description: 'Augmented reality features',
    },
    {
      title: 'Maps',
      icon: 'map',
      color: '#10B981',
      description: 'Find nearby monasteries',
    },
    {
      title: 'Documentation',
      icon: 'book',
      color: '#F59E0B',
      description: 'Cultural artifacts & history',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Ionicons name="library" size={48} color="white" />
          <Text style={styles.heroTitle}>Sikkim Monasteries</Text>
          <Text style={styles.heroSubtitle}>
            Discover the spiritual heritage of the Himalayas
          </Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Start Exploring</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as any} size={24} color="white" />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
              <Text style={styles.quickActionDescription}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Monasteries */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Monasteries</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredMonasteries.map((monastery) => (
            <TouchableOpacity key={monastery.id} style={styles.monasteryCard}>
              <Image source={{ uri: monastery.image }} style={styles.monasteryImage} />
              <View style={styles.monasteryInfo}>
                <Text style={styles.monasteryName}>{monastery.name}</Text>
                <Text style={styles.monasteryLocation}>{monastery.location}</Text>
                <View style={styles.featuresContainer}>
                  {monastery.features.map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Digital Documentation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Digital Documentation</Text>
        <View style={styles.documentationCard}>
          <View style={styles.documentationHeader}>
            <Ionicons name="book" size={32} color="#3B82F6" />
            <Text style={styles.documentationTitle}>Cultural Heritage</Text>
          </View>
          <Text style={styles.documentationDescription}>
            Comprehensive documentation of artifacts, rituals, and historical records 
            in partnership with NMMA and the National Mission for Manuscripts.
          </Text>
          <TouchableOpacity style={styles.documentationButton}>
            <Text style={styles.documentationButtonText}>Explore Documentation</Text>
            <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Ionicons name="eye" size={20} color="#10B981" />
            <Text style={styles.activityText}>Virtual tour of Rumtek Monastery completed</Text>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="cube" size={20} color="#8B5CF6" />
            <Text style={styles.activityText}>AR experience unlocked for Pemayangtse</Text>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="book" size={20} color="#F59E0B" />
            <Text style={styles.activityText}>New artifacts added to Tashiding collection</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  heroSection: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  monasteryCard: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monasteryImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  monasteryInfo: {
    padding: 12,
  },
  monasteryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  monasteryLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500',
  },
  documentationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  documentationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  documentationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentationButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 8,
  },
  activityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
  },
});

export default HomeScreen;