import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, typography } from '../../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    height: height / 1,
    width: width / 1,
  },
  headerContent: {
    height: height / 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: typography.regular,
  },
  headerContainer: {
    height: height / 15,
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerContainers: {
    height: height / 15,
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: typography.regular,
  },
  labelContainer: {
    height: height / 15,
    width: width / 1.2,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    fontFamily: typography.regular,
  },
  spacer: {
    height: height / 15,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },

inputContainer: {  
  height: height / 20,  
  width: width / 1.2,
  justifyContent: 'center',
  // alignItems: 'center',
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: colors.white,
},

inputContainer: {
  height: height / 18,               
  width: width / 1.2,
  justifyContent: 'center',
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: colors.white,
},
input: {
  height: height / 18,
  width: width / 1.2,
  paddingHorizontal: 12,
  fontSize: 14,
  fontFamily: typography.regular,
  color: colors.textDark,
  fontWeight: '600',
                                    
},

 button: {
  height: height / 20,             
  width: width / 1.2,
  backgroundColor: colors.primary,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
btnContainer: {
  paddingVertical: height * 0.02,   
  alignItems: 'center',
  justifyContent: 'center',
},
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: typography.regular,
  },
  disabledButtonText: {
    color: '#FFFFFFAA',
  },


  fab: {
    position: 'absolute',
    right: width / 18,
    bottom: Platform.OS === 'ios' ? height / 10 : height / 10,
    height: width / 7,
    width: width / 7,
    borderRadius: width / 12,
    backgroundColor: '#006BB6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  fabText: {
    color: '#FFFFFF',
    fontSize: width / 18,
    fontWeight: '700',
  },

});

export default styles;