import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height / 1, 
    width: width / 1,
  },

  safeArea: {
    height: height / 1, 
    width: width / 1,
  },

  logoContainer: {
     height: height / 3, 
    width: width / 1,
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width / 2.08,
    height: height / 9.55,
    resizeMode: 'contain',
  },

  title: {
    fontSize: height / 23.88,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    marginBottom: height / 101.5,
    fontFamily: 'Open Sans',
  },
  subtitle: {
    fontSize: height / 52.4,
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: height / 36.9,
    marginBottom: height / 25.37,
    fontFamily: 'Open Sans',
  },

  tabWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: height / 58,
    alignItems: 'center',
  },
  tabText: {
    fontSize: height / 49.2,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: 'Open Sans',
  },
  activeTabText: {
    color: '#003087',
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },

  content: {
    marginTop: height / 8,
    // backgroundColor: 'cyan',
  },

  infoText: {
    fontSize: height / 56,
    color: '#374151',
    marginBottom: height / 56,
    fontFamily: 'Open Sans',
  },

  label: {
    fontSize: height / 67.6,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: height / 135,
    fontFamily: 'Open Sans',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: height / 58,
    height: height / 14,
    paddingHorizontal: width / 20.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: height / 49.2,
    color: '#111827',
    paddingVertical: 0,
    fontFamily: 'Open Sans',
  },
  domain: {
    fontSize: height / 49.2,
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: 'Open Sans',
  },

  nextButton: {
    backgroundColor: '#9CA3AF',
    height: height / 14.5,
    borderRadius: height / 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 67.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nextText: {
    color: '#111827',
    fontSize: height / 45.1,
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },

  microsoftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E63B5',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: height / 58,
    height: height / 17,
    gap: height / 67.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  microsoftIcon: {
    width: height / 31.2,
    height: height / 31.2,
  },
  microsoftText: {
    fontSize: height / 49.2,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Open Sans',
  },
});