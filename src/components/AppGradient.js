import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const AppGradient = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[
        colors.white,
        '#FEFEFE',
        '#F7FDFF',
        '#EEF9FF',
        '#DBF4FF',
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={style}
      >
      {children}
    </LinearGradient>
  );
};

export const BackHeader = ({ title, onBack }) => {
  return (
    <View style={headerStyles.headeSection}>
    <LinearGradient
     colors={[colors.primary, colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={headerStyles.header}>
        
      <TouchableOpacity onPress={onBack} style={headerStyles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={colors.white} />
      </TouchableOpacity>
      <Text style={headerStyles.headerTitle}>{title}</Text>
    
    </LinearGradient>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  // fullSize:{
  //   height: height/1,

  // },
  header: {
    height: height / 14,
    width: width/1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: width / 25,
  },
  backBtn: {
    height: height / 14,
    width: width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
    
  },
  headerTitle: {
    fontSize: typography.size.lg,
    fontFamily: typography.bold,
    fontWeight: '700',
    color: colors.white,
    // marginLeft: width / 40,
  },
});

export default AppGradient;

