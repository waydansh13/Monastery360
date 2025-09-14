import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ARScreen = () => {
  const [isARActive, setIsARActive] = useState(false);

  const arFeatures = [
    {
      id: 1,
      title: 'Monastery Overlay',
      description: 'View 3D monastery models overlaid on real locations',
      icon: 'cube',
      color: '#3B82F6',
    },
    {
      id: 2,
      title: 'Historical Context',
      description: 'See historical images and information at specific locations',
      icon: 'time',
      color: '#8B5CF6',
    },
    {
      id: 3,
      title: 'Artifact Visualization',
      description: 'Examine 3D models of sacred artifacts and statues',
      icon: 'library',
      color: '#10B981',
    },
    {
      id: 4,
      title: 'Ritual Guide',
      description: 'Interactive guides for understanding ceremonies and rituals',
      icon: 'book',
      color: '#F59E0B',
    },
  ];

  const handleStartAR = () => {
    Alert.alert(
      'AR Experience',
      'AR functionality requires camera permissions and will be implemented with ARCore/ARKit integration.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => setIsARActive(true) },
      ]
    );
  };

  if (isARActive) {
    return (
      <View style={styles.arContainer}>
        <View style={styles.arHeader}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsARActive(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.arTitle}>AR Experience</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.arContent}>
          <View style={styles.cameraPlaceholder}>
            <Ionicons name="camera" size={64} color="rgba(255, 255, 255, 0.6)" />
            <Text style={styles.cameraPlaceholderText}>
              Camera view will be implemented here
            </Text>
            <Text style={styles.cameraPlaceholderSubtext}>
              Point your camera at monastery locations to see AR overlays
            </Text>
          </View>
        </View>

        <View style={styles.arControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="scan" size={24} color="white" />
            <Text style={styles.controlButtonText}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="information-circle" size={24} color="white" />
            <Text style={styles.controlButtonText}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="settings" size={24} color="white" />
            <Text style={styles.controlButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AR Experience</Text>
        <Text style={styles.subtitle}>
          Explore Sikkim's monasteries through augmented reality
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        {arFeatures.map((feature) => (
          <View key={feature.id} style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
              <Ionicons name={feature.icon as any} size={24} color="white" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to Use AR</Text>
        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>
            Allow camera permissions when prompted
          </Text>
        </View>
        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>
            Point your camera at monastery locations
          </Text>
        </View>
        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>
            Tap on AR overlays to learn more
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartAR}>
        <Ionicons name="camera" size={24} color="white" />
        <Text style={styles.startButtonText}>Start AR Experience</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  header: {
    marginBottom: 24,
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
  featuresContainer: {
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  instructionsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  arContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  arHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    padding: 8,
  },
  arTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  arContent: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
  },
  cameraPlaceholderText: {
    fontSize: 18,
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
  },
  cameraPlaceholderSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  arControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
  },
  controlButtonText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});

export default ARScreen;