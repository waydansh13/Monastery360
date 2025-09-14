import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const handleSetting = (setting: string) => {
    Alert.alert(
      'Setting',
      `${setting} functionality will be implemented.`,
      [{ text: 'OK' }]
    );
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person', title: 'Personal Information', action: () => handleSetting('Personal Information') },
        { icon: 'notifications', title: 'Notifications', action: () => handleSetting('Notifications') },
        { icon: 'language', title: 'Language', action: () => handleSetting('Language') },
        { icon: 'shield-checkmark', title: 'Privacy & Security', action: () => handleSetting('Privacy & Security') },
      ],
    },
    {
      title: 'Content',
      items: [
        { icon: 'download', title: 'Downloaded Content', action: () => handleSetting('Downloaded Content') },
        { icon: 'bookmark', title: 'Bookmarks', action: () => handleSetting('Bookmarks') },
        { icon: 'time', title: 'Tour History', action: () => handleSetting('Tour History') },
        { icon: 'star', title: 'Favorites', action: () => handleSetting('Favorites') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', title: 'Help & FAQ', action: () => handleSetting('Help & FAQ') },
        { icon: 'chatbubble', title: 'Contact Support', action: () => handleSetting('Contact Support') },
        { icon: 'information-circle', title: 'About', action: () => handleSetting('About') },
        { icon: 'document-text', title: 'Terms & Privacy', action: () => handleSetting('Terms & Privacy') },
      ],
    },
  ];

  const stats = [
    { label: 'Tours Completed', value: '12', icon: 'camera' },
    { label: 'Monasteries Visited', value: '8', icon: 'library' },
    { label: 'AR Experiences', value: '5', icon: 'cube' },
    { label: 'Artifacts Viewed', value: '24', icon: 'eye' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="white" />
          </View>
        </View>
        <Text style={styles.userName}>Guest User</Text>
        <Text style={styles.userEmail}>guest@sikkimheritage.org</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Journey</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name={stat.icon as any} size={24} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Profile Sections */}
      {profileSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex === section.items.length - 1 && styles.lastSettingItem,
                ]}
                onPress={item.action}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                  </View>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appName}>Sikkim Heritage</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appDescription}>
          Digital platform for exploring Sikkim's monasteries
        </Text>
      </View>

      {/* Partnership Info */}
      <View style={styles.partnershipInfo}>
        <Text style={styles.partnershipTitle}>In Partnership With</Text>
        <View style={styles.partnershipLogos}>
          <View style={styles.partnershipLogo}>
            <Text style={styles.partnershipLogoText}>NMMA</Text>
          </View>
          <View style={styles.partnershipLogo}>
            <Text style={styles.partnershipLogoText}>NMM</Text>
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
  profileHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  partnershipInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  partnershipTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  partnershipLogos: {
    flexDirection: 'row',
    gap: 16,
  },
  partnershipLogo: {
    width: 60,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnershipLogoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
});

export default ProfileScreen;