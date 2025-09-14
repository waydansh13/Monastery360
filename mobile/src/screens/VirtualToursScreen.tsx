import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface VirtualTour {
  id: number;
  title: string;
  monastery: string;
  description: string;
  duration: number;
  thumbnail: string;
  type: 'panorama' | 'walkthrough' | 'interactive';
  isCompleted: boolean;
}

const VirtualToursScreen = () => {
  const [selectedType, setSelectedType] = useState('All');

  const virtualTours: VirtualTour[] = [
    {
      id: 1,
      title: 'Rumtek Monastery Interior',
      monastery: 'Rumtek Monastery',
      description: 'Explore the main prayer hall, meditation chambers, and sacred artifacts',
      duration: 15,
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Rumtek+Interior',
      type: 'panorama',
      isCompleted: true,
    },
    {
      id: 2,
      title: 'Pemayangtse Architecture',
      monastery: 'Pemayangtse Monastery',
      description: 'Discover the intricate woodwork and traditional Tibetan architecture',
      duration: 12,
      thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Pemayangtse+Architecture',
      type: 'walkthrough',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Tashiding Sacred Grounds',
      monastery: 'Tashiding Monastery',
      description: 'Navigate through the monastery complex and surrounding sacred sites',
      duration: 20,
      thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Tashiding+Grounds',
      type: 'interactive',
      isCompleted: false,
    },
    {
      id: 4,
      title: 'Enchey Monastery Murals',
      monastery: 'Enchey Monastery',
      description: 'Admire the beautiful murals and traditional artwork',
      duration: 10,
      thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Enchey+Murals',
      type: 'panorama',
      isCompleted: false,
    },
    {
      id: 5,
      title: 'Dubdi Historical Tour',
      monastery: 'Dubdi Monastery',
      description: 'Learn about the oldest monastery in Sikkim and its historical significance',
      duration: 18,
      thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Dubdi+History',
      type: 'interactive',
      isCompleted: true,
    },
  ];

  const tourTypes = ['All', 'Panorama', 'Walkthrough', 'Interactive'];

  const filteredTours = selectedType === 'All' 
    ? virtualTours 
    : virtualTours.filter(tour => tour.type === selectedType.toLowerCase());

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'panorama':
        return 'eye';
      case 'walkthrough':
        return 'walk';
      case 'interactive':
        return 'hand-left';
      default:
        return 'camera';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'panorama':
        return '#3B82F6';
      case 'walkthrough':
        return '#8B5CF6';
      case 'interactive':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const renderTourCard = ({ item }: { item: VirtualTour }) => (
    <TouchableOpacity style={styles.tourCard}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.thumbnailOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="white" />
          </View>
        </View>
        {item.isCompleted && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          </View>
        )}
      </View>
      
      <View style={styles.tourInfo}>
        <View style={styles.tourHeader}>
          <Text style={styles.tourTitle}>{item.title}</Text>
          <View style={[styles.typeIcon, { backgroundColor: getTypeColor(item.type) }]}>
            <Ionicons name={getTypeIcon(item.type) as any} size={16} color="white" />
          </View>
        </View>
        
        <Text style={styles.monasteryName}>{item.monastery}</Text>
        <Text style={styles.tourDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.tourFooter}>
          <View style={styles.durationContainer}>
            <Ionicons name="time" size={14} color="#6B7280" />
            <Text style={styles.duration}>{item.duration} min</Text>
          </View>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>
              {item.isCompleted ? 'Replay' : 'Start Tour'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTypeFilter = (type: string) => (
    <TouchableOpacity
      key={type}
      style={[
        styles.filterButton,
        selectedType === type && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedType(type)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedType === type && styles.filterButtonTextActive,
        ]}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Virtual Tours</Text>
        <Text style={styles.subtitle}>
          Immersive 360° experiences of Sikkim's monasteries
        </Text>
      </View>

      {/* Type Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          data={tourTypes}
          renderItem={({ item }) => renderTypeFilter(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {/* Tours List */}
      <FlatList
        data={filteredTours}
        renderItem={renderTourCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.toursList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filtersList: {
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  toursList: {
    padding: 20,
    paddingTop: 0,
  },
  tourCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 160,
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  tourInfo: {
    padding: 16,
  },
  tourHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tourTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  typeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monasteryName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tourDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tourFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 4,
  },
});

export default VirtualToursScreen;