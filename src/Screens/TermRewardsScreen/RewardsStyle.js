import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, typography } from '../../styles/globalStyles';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    height: height / 1.05,
    width: width / 1,
  },
  gradient: {
    height: height / 1,
    width: width / 1,
  },

  header: {
    height: height / 12,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    height: height / 18,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: height / 12,
    width: width / 1.3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    tintColor: colors.white
  },
  filterContainer: {
    height: height / 20,
    width: width / 3.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  dropDownCon: {
    height: height / 40,
    width: width / 6.8,
    justifyContent: 'center',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
  },

  filterTxt: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    color: colors.white,
  },
  dropImgStyle: {
    height: 20,
    width: 20,
  },

  scrollContent: {
    paddingTop: height / 40,
    paddingBottom: height / 8,
    alignItems: 'center',
  },

  /* Sections */
  sectionContainer: {
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingBottom: 12,
    marginBottom: 12,
  },
  headerContainer: {
    height: height / 25,
    width: width / 1.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D4E89',
    fontFamily: typography.bold,
  },

  cardContainer: {
    height: height / 10,
    width: width / 1.1,
    justifyContent: 'flex-end',
  },
  decSpaceContainer: {
    height: height / 12,
    width: width / 1.1,
    justifyContent: 'flex-end',
  },

  card: {
    width: width / 1.18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDE6FA',
    alignSelf: 'center',
  },

  ocSectionCon: {
    height: height / 10,
    width: width / 1.18,
    justifyContent: 'center',
  },

  cardTopRow: {
    height: height / 12,
    width: width / 1.18,
    alignItems: 'center',
  },

  titleRow: {
    height: height / 25,
    width: width / 1.19,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleCon: {
    height: height / 20,
    width: width / 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
    paddingHorizontal: 10,
  },
  infoImgStyle: {
    tintColor: colors.primary,
    height: 20,
    width: 20,
  },

  termBadge: {
    borderWidth: 1,
    borderColor: '#9EC9F3',
    borderRadius: width / 25,
    height: height / 45,
    width: width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  cardDecContainer: {
    height: height / 15,
    width: width / 1.18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDE6FA',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  decebmerinfoCon: {
    height: height / 20,
    width: width / 1.185,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  decCon: {
    height: height / 20,
    width: width / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termText: {
    fontSize: width / 30,
    fontWeight: '600',
    color: colors.primaryDark,
  },

  pointCon: {
    height: height / 28,
    width: width / 1.27,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 12,
    color: colors.textDark,
  },

  pointsItalic: {
    fontStyle: 'italic',
    color: '#667085',
  },

  /* Reward Tag */
  rewardTag: {
    height: height / 35,
    width: width / 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rewardText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.semiBold,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  decModalContainer: {
    height: height / 1.96,
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  decHeadContainer: {
    height: height / 15,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  decTitle: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textDark,
    fontWeight: 'bold',
  },

  criteriaContainer: {
    height: height / 25,
    width: width / 1.2,
    alignSelf: 'center',
  },

  modalDivider: {
    height: 1,
    backgroundColor: colors.boderLight,
  },

  iconContainer: {
    height: height / 7,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bonusIcon: {
    height: 80,
    width: 80,
    tintColor: colors.primary,
  },

  decHeading: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textDark,
    textAlign: 'center',
    fontWeight: '700',
  },
  decContainer: {
    height: height / 14,
    width: width / 1.2,
    alignSelf: 'center',
  },

  txtDecContainer: {
    height: height / 8.5,
    width: width / 1.2,
    alignSelf: 'center',
  },
  decText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: typography.regular,
    fontWeight: '400',
  },

  btnSpaceCon: {
    height: height / 19,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  closeBtn: {
    borderWidth: 1,
    borderColor: colors.boderLight,
    height: height / 27,
    width: width / 5.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textDark,
    fontWeight: '400',
    lineHeight: 20,
  },

  fab: {
    position: 'absolute',
    right: width / 18,
    bottom: Platform.OS === 'ios' ? height / 11 : height / 18,
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
});