import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ContactUsScreen = () => {
  const navigation = useNavigation();

  const callNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const ListItem = ({ title, phone, email }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        if (phone) callNumber(phone);
        if (email) sendEmail(email);
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.itemText}>{title}</Text>
      <View style={styles.iconContainer}>
        {phone && (
          <Image
            source={require('../../assets/Image/Phone.png')}
            style={styles.phoneIcon}
            resizeMode="contain"
          />
        )}
        {email && (
          <Image
            source={require('../../assets/Image/Mail.png')}
            style={styles.emailIcon}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007ACC" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
          <Image
          resizeMode="contain"
            source={require('../../assets/Image/Menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Campus</Text>
        <ListItem title="Main Line" phone="432-335-6400" />
        <ListItem title="Campus Police" phone="432-335-6666" />
        <ListItem title="Human Resources" phone="432-335-6850" />
        <ListItem title="Maintenance" phone="432-335-6220" />
        <ListItem title="After-Hours Maintenance" phone="432-335-6666" />
        <ListItem title="Sports Center" phone="432-335-6300" />

        <Text style={styles.sectionTitle}>Student Services</Text>
        <ListItem title="Bookstore" phone="432-335-6640" />
        <ListItem title="Wrangler Express" phone="432-335-6200" />
        <ListItem title="Wrangler Express" email="wranglerexpress@odessa.edu" />
        <ListItem title="Housing" phone="432-335-6500" />
        <ListItem title="Learning Resources Center" phone="432-335-6510" />
        <ListItem title="Testing Center" phone="432-335-6620" />
        <ListItem title="Continuing Education" phone="432-335-6580" />
        <ListItem title="Cafeteria" phone="432-335-6300" />

        <Text style={styles.sectionTitle}>Helpdesk Support</Text>
        <ListItem title="IT Helpdesk" phone="432-335-6800" />
        <ListItem title="Residence Hall Helpdesk" phone="432-335-6500" />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  header: {
    height: 60,
    backgroundColor: '#006BB6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingHorizontal: 15,
  },
  menuButton: {
    width: width / 8,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  menuIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
    // paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    // textAlign: 'center',
    marginRight: -40,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007ACC',
    marginTop: 25,
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 14,
    color: '#414651',
    flex: 1,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    width: 24,
    height: 24,
    tintColor: '#007ACC',
    marginLeft: 15,
  },
  emailIcon: {
    width: 26,
    height: 26,
    tintColor: '#007ACC',
  },
});