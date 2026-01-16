import React, {useEffect} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import AppGradient from '../components/AppGradient';

const {height, width} = Dimensions.get('screen');

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('ChooseRoleScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AppGradient style={styles.mainContainer}>
      <Image 
        source={require('../assets/Image/SplashLogo.png')} 
        resizeMode='contain' 
        style={styles.imgstyleSize}
      />
    </AppGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgstyleSize: {
    height: height / 4,
    width: width / 2,
  }
});
