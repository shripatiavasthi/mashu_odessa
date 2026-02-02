import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { colors, typography } from '../styles/globalStyles';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store';
import { useDispatch } from 'react-redux';
import { logoutWithAccessToken, clearAuth } from '../store/slices/authSlice';

import LogoutModal from './LogoutModal'

const { height, width } = Dimensions.get('window');
const LOCAL_IMAGE_KEY = 'profileImageUri';

const drawerItems = [
  {
    label: 'Check-In',
    icon: require('../assets/Image/Icons/CheckInOn.png'),
    tab: 'CheckIn',
  },
  {
    label: 'My Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
    initialTab: 'MY_EVENTS',
  },
  {
    label: 'Upcoming Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
    initialTab: 'UPCOMING_EVENTS',
  },
  {
    label: 'Rewards',
    icon: require('../assets/Image/Icons/RewardOn.png'),
    tab: 'Rewards',
  },
  {
    label: "FAQ's",
    icon: require('../assets/Image/Icons/FaqOn.png'),
    tab: 'Faq',
  },
];

const AppDrawerContent = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector(selectAuth);

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.displayName ||
    'Employee';
  const email = user?.email || '';



  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const uri = await AsyncStorage.getItem(LOCAL_IMAGE_KEY);
      if (uri) {
        setProfileImage({ uri });
      }
    } catch (error) {
      console.error('Load failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async (camera = false) => {
    if (Platform.OS === 'web') return true;

    let permission;

    if (Platform.OS === 'ios') {
      permission = camera
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      // Android
      if (camera) {
        permission = PERMISSIONS.ANDROID.CAMERA;
      } else {
        permission =
          Platform.Version >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    }

    try {
      let status = await check(permission);

      if (status === RESULTS.DENIED) {
        status = await request(permission);
      }

      if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
        return true;
      } else {
        Alert.alert(
          'Permission Required',
          `Please allow ${camera ? 'Camera' : 'Photo Library'} access in your device settings to continue.`,
          [{ text: 'OK' }]
        );
        return false;
      }
    } catch (error) {
      console.error('Permission check error:', error);
      Alert.alert('Error', 'Failed to check permissions');
      return false;
    }
  };

  const pickImage = async (camera = false) => {
    const hasPermission = await requestPermission(camera);
    if (!hasPermission) {
      setModalVisible(false);
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    const picker = camera ? launchCamera : launchImageLibrary;

    picker(options, (response) => {
      if (response.didCancel) {
        setModalVisible(false);
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        setModalVisible(false);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const imageUri = asset.uri;
        saveProfileImage(imageUri);
        setProfileImage({ uri: imageUri });
      }

      setModalVisible(false);
    });
  };

  const saveProfileImage = async (uri) => {
    try {
      await AsyncStorage.setItem(LOCAL_IMAGE_KEY, uri);
    } catch (error) {
      Alert.alert('Save failed', error.message);
    }
  };

  const deleteProfileImage = async () => {
    try {
      await AsyncStorage.removeItem(LOCAL_IMAGE_KEY);
      setProfileImage(null);
      console.log('Profile photo removed');
    } catch (error) {
      Alert.alert('Delete failed', error.message);
    }
    setModalVisible(false);
  };

  const handleNavigate = (tab, initialTab) => {
    const resolvedInitialTab =
      tab === 'Events' && !initialTab ? 'MY_EVENTS' : initialTab;
    navigation.navigate('Home', {
      screen: tab,
      params: { initialTab: resolvedInitialTab },
    });
  };

  const handleLogout = () => {
    
    setShowLogout(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogout(false);
    try {
      if (accessToken) {
        await dispatch(logoutWithAccessToken({ accessToken })).unwrap();
      }
    } catch (error) {
      const message = error?.message || 'Logout failed';
      Alert.alert('Logout Failed', message);
    } finally {
      dispatch(clearAuth());
      navigation.getParent?.()?.navigate('ChooseRoleScreen');
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.fill}>
        <SafeAreaView style={styles.safeArea} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.fill}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={profileImage ? { uri: profileImage.uri } : require('../assets/Image/Profile.png')}
              style={styles.avatar}
              resizeMode='cover'
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>{fullName}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => pickImage(false)}
              >
                <Text style={styles.modalText}>📷 Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => pickImage(true)}
              >
                <Text style={styles.modalText}>📸 Take Photo</Text>
              </TouchableOpacity>

              {profileImage && (
                <TouchableOpacity
                  style={[styles.modalOption, styles.deleteOption]}
                  onPress={deleteProfileImage}
                >
                  <Text style={styles.modalText}>🗑️ Remove Photo</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.menuSection}>
          {drawerItems.map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.tab, item.initialTab)}
            >
              <Image source={item.icon} style={styles.menuIcon} resizeMode="contain" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Image
              source={require('../assets/Image/Logout.png')}
              style={styles.menuIcon}
              resizeMode="contain"
            />
            <Text style={styles.menuLabel}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>


        <LogoutModal
          visible={showLogout}
          onCancel={() => setShowLogout(false)}
          onConfirm={handleConfirmLogout}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: width * 0.08,
  },
  profileSection: {
    // paddingTop: height * 0.05,
    // paddingBottom: height * 0.02,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 12,
  },
  nameText: {
    fontSize: typography.size.lg,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '700',
  },
  emailText: {
    fontSize: typography.size.sm,
    color: colors.white,
    opacity: 0.9,
    fontFamily: typography.regular,
    marginTop: 4,
  },
  menuSection: {
    marginTop: height * 0.01,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.018,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  menuIcon: {
    width: 21,
    height: 21,
    tintColor: colors.white,
    marginRight: 16,
  },
  menuLabel: {
    fontSize: typography.size.md,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: height * 0.04,
  },
  versionText: {
    color: colors.white,
    fontFamily: typography.regular,
    fontSize: typography.size.sm,
    opacity: 0.9,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    maxHeight: height * 0.4,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deleteOption: {
    borderBottomWidth: 0,
  },
  modalText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  modalCancel: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default AppDrawerContent;
