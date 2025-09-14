import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Monastery {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  established: string;
  features: string[];
  rating: number;
}

const MonasteriesScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const monasteries: Monastery[] = [
    {
      id: 1,
      name: 'Rumtek Monastery',
      location: 'Gangtok, East Sikkim',
      description: 'The largest monastery in Sikkim and seat of the Karmapa lineage',
      image: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Rumtek+Monastery',
      established: '1966',
      features: ['Virtual Tour', '3D Model', 'AR Experience'],
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Pemayangtse Monastery',
      location: 'Pelling, West Sikkim',
      description: 'One of the oldest and most important monasteries of the Nyingma sect',
      image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Pemayangtse',
      established: '1705',
      features: ['Virtual Tour', '3D Model'],
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Tashiding Monastery',
      location: 'Tashiding, West Sikkim',
      description: 'Sacred monastery known for its annual Bumchu festival',
      image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Tashiding',
      established: '1641',
      features: ['Virtual Tour', 'Cultural Events'],
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Enchey Monastery',
      location: 'Gangtok, East Sikkim',
      description: 'A 200-year-old monastery with beautiful murals and architecture',
      image: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Enchey',
      established: '1840',
      features: ['Virtual Tour'],
      rating: 4.5,
    },
    {
      id: 5,
      name: 'Dubdi Monastery',
      location: 'Yuksom, West Sikkim',
      description: 'The oldest monastery in Sikkim, established by the first Chogyal',
      image: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Dubdi',
      established: '1701',
      features: ['Virtual Tour', 'Historical Records'],
      rating: 4.9,
    },
  ];

  const filters = ['All', 'Virtual Tour', '3D Model', 'AR Experience', 'Cultural Events'];

  const filteredMonasteries = monasteries.filter(monastery => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         monastery.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || monastery.features.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const renderMonasteryCard = ({ item }: { item: Monastery }) => (
    <TouchableOpacity
      style={styles.monasteryCard}
      onPress={() => navigation.navigate('MonasteryDetail', { monastery: item })}
    >
      <Image source={{ uri: item.image }} style={styles.monasteryImage} />
      <View style={styles.monasteryInfo}>
        <View style={styles.monasteryHeader}>
          <Text style={styles.monasteryName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.monasteryLocation}>{item.location}</Text>
        <Text style={styles.monasteryDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.monasteryFooter}>
          <Text style={styles.established}>Est. {item.established}</Text>
          <View style={styles.featuresContainer}>
            {item.features.slice(0, 2).map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
            {item.features.length > 2 && (
              <Text style={styles.moreFeatures}>+{item.features.length - 2}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === filter && styles.filterButtonTextActive,
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search monasteries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#6B7280"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(renderFilterButton)}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredMonasteries.length} monastery{filteredMonasteries.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Monasteries List */}
      <FlatList
        data={filteredMonasteries}
        renderItem={renderMonasteryCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
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
  resultsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  monasteryCard: {
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
  monasteryImage: {
    width: '100%',
    height: 160,
  },
  monasteryInfo: {
    padding: 16,
  },
  monasteryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  monasteryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    fontWeight: '500',
  },
  monasteryLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  monasteryDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  monasteryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  established: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 6,
  },
  featureText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500',
  },
  moreFeatures: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default MonasteriesScreen;