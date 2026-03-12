import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/globalStyles';

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
      style={style}>
      {children}
    </LinearGradient>
  );
};

export default AppGradient;
