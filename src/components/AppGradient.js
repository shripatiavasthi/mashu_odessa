import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const AppGradient = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#F0F8FF', '#D6EFFF', '#B3E0FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default AppGradient;
