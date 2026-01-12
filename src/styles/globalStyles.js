import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export const metrics = {
  height,
  width,
  isSmallDevice: width < 360,
};

export const colors = {
  primary: '#2E6FB6',
  primaryDark: '#1E63B5',
  primaryLight: '#4DA3DA',
  accent: '#00A2E5',
  text: '#344054',
  textMuted: '#667085',
  textDark: '#414651',
  white: '#FFFFFF',
  border: '#E4F1FB',
  surface: '#F5F9FF',
};

export const typography = {
  regular: Platform.select({ios: 'OpenSans-Regular', android: 'OpenSans-Regular'}),
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
  },
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
};

export const shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
};

export default {
  metrics,
  colors,
  typography,
  spacing,
  shadows,
};
