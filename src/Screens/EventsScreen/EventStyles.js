import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, typography } from '../../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
   safeArea: {
    height: height / 1.05,
    width: width / 1,
  },
  gradient: {
    height: height / 1,
    width: width / 1,
  },
  centerContainer: {
    height: height / 1.35,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'cyan'
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },

  header: {
    height: height / 12,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  menuContainer: {
    height: height / 18,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  logoContainer: {
    height: height / 12,
    width: width / 1.3,
    justifyContent: 'space-between',
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  filterContainer: {
    height: height / 20,
    // width: width / 2.6,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  filterCon: {
    height: height / 40,
    // width: width / 5,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 5,
  },

  dropDownCon: {
    height: height / 40,
    width: width / 6.5,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropDownWrapper: {
    position: 'relative',
    alignItems: 'flex-end',
    // backgroundColor: 'cyan'
  },
  dropDownPressed: {
    opacity: 0.9,

  },
  dropDownMenu: {
    position: 'absolute',
    top: height / 40 + 6,
    right: 0,
    minWidth: width / 6.5,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    zIndex: 10,

  },
  dropDownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.boderLight,
    backgroundColor: colors.white,
    borderRadius: 8

  },
  dropDownItemLast: {
    borderBottomWidth: 0,
  },
  dropDownItemPressed: {
    backgroundColor: colors.surface,

  },
  dropDownItemText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    color: colors.primary,
    textAlign: 'center',
  },


  filterTxt: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    color: colors.white
  },


  
  tabContainer: {
    height: height / 17,
    width: width / 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'cyan',
    borderWidth: 0.5,
    borderColor: colors.border
  },
  tabItem: {
    height: height / 18,
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    // backgroundColor: 'lightgreen',
    backgroundColor: '#FFFFFF',
  },
  activeTab: {

    borderBottomColor: colors.primary,

  },
  tabText: {
    fontSize: typography.size.md,
    color: '#667085',
    fontWeight: '500',
  },
  activeTabText: {
    fontSize: typography.size.md,
    color: '#2E6FB6',
    fontWeight: '700',
  },
  scrollContent: {
       paddingBottom: 200, 
       alignItems: 'center',
  },

  spaceConatiner: {
    // height: height / 5.5,
    paddingTop: height / 60,
    width: width / 1,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    // height: height / 6.5,
    // paddingTop: height / 100,
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    // backgroundColor: 'cyan'


  },
  cardHeader: {
    // height: height / 25,
    paddingTop: height / 100,
    width: width / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue',
    alignSelf: 'center'
  },
  cardHeaderUpcome: {
    // height: height / 25,
    paddingTop: height / 100,
    width: width / 1.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
    alignSelf: 'flex-end'
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    width: width / 1.75,
    gap: width / 50,
  },
  cardTitle: {
    width: width / 3.4,
    fontSize: typography.size.md,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
    // backgroundColor: 'cyan'
  },
  teamEventBadge: {
    backgroundColor: '#FFF4E5',
    borderRadius: 16,
    paddingHorizontal: width / 40,
    paddingVertical: height / 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamEventText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C56A16',
    fontFamily: typography.semiBold,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.bold,
    
  },
  locationCon: {
    // height: height / 25,
    paddingVertical: height / 100,
    width: width / 1.21,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    flexDirection: 'row'
  },


  locationText: {
    
    width: width / 1.35,
    fontSize: typography.xs,
    color: colors.textDark,
    fontWeight: '400',
    fontFamily: typography.regular,
    // backgroundColor: 'blue',
  },
  upLocText: {
      width: width / 1.6,
    fontSize: typography.xs,
    color: colors.textDark,
    fontWeight: '400',
    fontFamily: typography.regular,
    // backgroundColor: 'cyan'
  },
  cardDivider: {
    height: 1,
    width: width / 1.1,
    backgroundColor: colors.border,
    // marginVertical: height / 60,

  },


  dateRow: {
    height: height / 14.5,
    width: width / 1.11,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    // backgroundColor: 'cyan'
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dateBlock: {
    height: height / 15,
    width: width / 2.4,
    // justifyContent: 'center',
    // backgroundColor: 'yellow',
    // paddingHorizontal: 15
    justifyContent: 'center'
  },
  dateContainer: {
    height: height / 35,
    width: width / 2.4,
    justifyContent: 'flex-end',
    // backgroundColor: 'pink',
  },
  checkInCon: {
    height: height / 30,
    width: width / 2.4,
    justifyContent: 'flex-end',
    // backgroundColor: 'pink',
    paddingHorizontal: 10
  },
  checkInvalueCon: {
    height: height / 32,
    width: width / 2.4,
    justifyContent: 'center',
    // backgroundColor: 'lightgreen',
    paddingHorizontal: 10
  },
  dateLabel: {
    fontSize: typography.size.xx,
    color: colors.textDark,
    // marginBottom: height / 200,

  },
  timeContainer: {
    height: height / 32,
    width: width / 2.4,
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  dateValue: {
    fontSize: typography.size.xs,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold
  },
  verticalDivider: {
    height: height / 18,
    width: 1,
    backgroundColor: colors.border,
    // justifyContent: 'center',
    alignSelf: 'center'
  },

  // upcoming Designing here 
  upcomingContainer: {
    // height: height / 4.3,
    paddingTop: height / 60,
    width: width / 1,
    // backgroundColor: "yellow",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  upcomingCard: {
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B9DCF5',
    paddingTop: height / 100,
    // padding: width / 25,
    // marginBottom: height / 40,
    // backgroundColor: 'cyan'
  },


  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  upcomingLoc: {
    // height: height / 20,
    paddingVertical: height / 100,
    width: width / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    alignSelf: 'center'
  },
    uplocationText: {
    width: width / 2,
    fontSize: typography.xs,
    color: colors.textDark,
    fontWeight: '400',
    fontFamily: typography.regular,
    // backgroundColor: 'blue',
  },

  termContainer: {
    height: height / 25,
    width: width / 1.2,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'green',
    alignSelf: 'center',
    flexDirection: 'row'
  },

  termText: {
    fontSize: width / 30,
    color: '#667085',
    // marginTop: height / 120,
  },

  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4F1FB',
    // height: height / 38,
    // width: width / 4,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    // gap: 2,
    paddingHorizontal: 5,

  },
   plcpointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4F1FB',
    // height: height / 38,
    // width: width / 4,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    // gap: 2,
    paddingHorizontal: 5,
    right: 10

  },

  dot: {
    height: width / 40,
    width: width / 40,
    borderRadius: width / 80,
    backgroundColor: '#2E6FB6',
    marginRight: width / 80,
    
  },

  upcomingFooter: {
    marginTop: height / 40,
    paddingTop: height / 60,
    borderTopWidth: 1,
    borderTopColor: '#E4F1FB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'cyan'
    
  },
  btnContainer: {
    height: height / 18,
    width: width / 2.4,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: colors.boderLight

  },

  checkInBtn: {
    height: height / 24,
    width: width / 2.9,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkInText: {
    color: '#FFFFFF',
    fontSize: width / 28,
    fontWeight: '700',
  },

  fab: {
    position: 'absolute',
    right: width / 18,
    bottom: Platform.OS === 'ios' ? height / 8 : height / 7,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  modalDropdown: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 50,
    right: 25,
    minWidth: width / 6.5,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },


});

export default styles;





// import { StyleSheet, Dimensions, Platform } from 'react-native';
// import { colors, typography } from '../../styles/globalStyles';

// const { height, width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   safeArea: {
//     height: height / 1.05,
//     width: width / 1,
//   },
//   gradient: {
//     height: height / 1,
//     width: width / 1,
//   },
//   centerContainer: {
//     height: height / 1.1,
//     width: width / 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     // backgroundColor: 'cyan'
//   },
//   loadingText: {
//     fontSize: 16,
//     fontWeight: '700',
//     fontFamily: typography.bold,
//     color: colors.primary,
//     textAlign: 'center',
//   },

//   header: {
//     height: height / 12,
//     width: width,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: 'cyan'
//   },
//   menuContainer: {
//     height: height / 18,
//     width: width / 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'cyan'
//   },
//   logoContainer: {
//     height: height / 12,
//     width: width / 1.3,
//     justifyContent: 'space-between',
//     // backgroundColor: 'cyan',
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   menuIcon: {
//     width: 30,
//     height: 30,
//     tintColor: colors.white,
//     resizeMode: 'contain',
//   },
//   logo: {
//     width: 100,
//     height: 60,
//     resizeMode: 'contain',
//     tintColor: colors.white,
//   },
//   filterContainer: {
//     height: height / 20,
//     // width: width / 2.6,
//     // backgroundColor: 'cyan',
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: 10,
//   },

//   filterCon: {
//     height: height / 40,
//     // width: width / 5,
//     justifyContent: 'center',
//     // backgroundColor: 'pink',
//     borderRadius: 32,
//     borderWidth: 1,
//     borderColor: colors.white,
//     alignItems: 'center',
//     gap: 4,
//     paddingHorizontal: 5,
//   },

//   dropDownCon: {
//     height: height / 40,
//     width: width / 6.5,
//     justifyContent: 'center',
//     // backgroundColor: 'pink',
//     borderRadius: 32,
//     borderWidth: 1,
//     borderColor: colors.white,
//     alignItems: 'center',
//     flexDirection: 'row',

//   },
//   dropDownWrapper: {
//     position: 'relative',
//     alignItems: 'flex-end',
//     // backgroundColor: 'cyan'
//   },
//   dropDownPressed: {
//     opacity: 0.9,

//   },
//   dropDownMenu: {
//     position: 'absolute',
//     top: height / 40 + 6,
//     right: 0,
//     minWidth: width / 6.5,
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//     zIndex: 10,

//   },
//   dropDownItem: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.boderLight,
//     backgroundColor: colors.white,
//     borderRadius: 8

//   },
//   dropDownItemLast: {
//     borderBottomWidth: 0,
//   },
//   dropDownItemPressed: {
//     backgroundColor: colors.surface,

//   },
//   dropDownItemText: {
//     fontSize: 11,
//     fontWeight: '600',
//     fontFamily: typography.semiBold,
//     color: colors.primary,
//     textAlign: 'center',
//   },


//   filterTxt: {
//     fontSize: 10,
//     fontWeight: '600',
//     fontFamily: typography.semiBold,
//     color: colors.white
//   },


  
//   tabContainer: {
//     height: height / 17,
//     width: width / 1,
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     // backgroundColor: 'cyan',
//     borderWidth: 0.5,
//     borderColor: colors.border
//   },
//   tabItem: {
//     height: height / 18,
//     width: width / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//     // backgroundColor: 'lightgreen',
//     backgroundColor: '#FFFFFF',
//   },
//   activeTab: {

//     borderBottomColor: colors.primary,

//   },
//   tabText: {
//     fontSize: typography.size.md,
//     color: '#667085',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     fontSize: typography.size.md,
//     color: '#2E6FB6',
//     fontWeight: '700',
//   },
//   scrollContent: {
//        paddingBottom: 50, 
//        alignItems: 'center',
//   },

//   spaceConatiner: {
//     // height: height / 5.5,
//     paddingTop: height / 60,
//     width: width / 1,
//     // backgroundColor: 'pink',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   card: {
//     // height: height / 6.5,
//     // paddingTop: height / 100,
//     width: width / 1.1,
//     backgroundColor: colors.white,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: colors.border,


//   },
//   cardHeader: {
//     // height: height / 25,
//     paddingTop: height / 100,
//     width: width / 1.2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'blue',
//     alignSelf: 'center'
//   },
//   cardHeaderUpcome: {
//     // height: height / 25,
//     paddingTop: height / 100,
//     width: width / 1.15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'blue',
//     alignSelf: 'flex-end'
//   },
//   cardTitle: {
//     width: width / 1.75,
//     fontSize: typography.size.md,
//     fontWeight: '700',
//     color: colors.textDark,
//     fontFamily: typography.bold,
//     // backgroundColor: 'cyan'
//   },
//   pointsText: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: colors.primary,
//     fontFamily: typography.bold
//   },
//   locationCon: {
//     // height: height / 25,
//     paddingVertical: height / 100,
//     width: width / 1.21,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'lightblue',
//     alignSelf: 'center',
//     flexDirection: 'row'
//   },


//   locationText: {
//     width: width / 1.3,
//     fontSize: typography.xs,
//     color: colors.textDark,
//     fontWeight: '400',
//     fontFamily: typography.regular,
//     // backgroundColor: 'cyan'
//   },
//   upLocText: {
//       width: width / 1.6,
//     fontSize: typography.xs,
//     color: colors.textDark,
//     fontWeight: '400',
//     fontFamily: typography.regular,
//     // backgroundColor: 'cyan'
//   },
//   cardDivider: {
//     height: 1,
//     width: width / 1.1,
//     backgroundColor: colors.border,
//     // marginVertical: height / 60,

//   },


//   dateRow: {
//     height: height / 14.5,
//     width: width / 1.11,
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     borderWidth: 0,
//     // backgroundColor: 'cyan'
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   dateBlock: {
//     height: height / 14.5,
//     width: width / 2.4,
//     // justifyContent: 'center',
//     // backgroundColor: 'yellow',
//     // paddingHorizontal: 15
//   },
//   dateContainer: {
//     height: height / 30,
//     width: width / 2.4,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'pink',
//   },
//   checkInCon: {
//     height: height / 30,
//     width: width / 2.4,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'pink',
//     paddingHorizontal: 10
//   },
//   checkInvalueCon: {
//     height: height / 32,
//     width: width / 2.4,
//     justifyContent: 'center',
//     // backgroundColor: 'lightgreen',
//     paddingHorizontal: 10
//   },
//   dateLabel: {
//     fontSize: typography.size.xx,
//     color: colors.textDark,
//     // marginBottom: height / 200,

//   },
//   timeContainer: {
//     height: height / 32,
//     width: width / 2.4,
//     justifyContent: 'center',
//     // backgroundColor: 'pink',
//   },
//   dateValue: {
//     fontSize: typography.size.xs,
//     fontWeight: '700',
//     color: colors.textDark,
//     fontFamily: typography.bold
//   },
//   verticalDivider: {
//     height: height / 18,
//     width: 1,
//     backgroundColor: colors.border,
//     // justifyContent: 'center',
//     alignSelf: 'center'
//   },

//   // upcoming Designing here 
//   upcomingContainer: {
//     // height: height / 4.3,
//     paddingTop: height / 60,
//     width: width / 1,
//     // backgroundColor: "blue",
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },

//   upcomingCard: {
//     width: width / 1.1,
//     backgroundColor: colors.white,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#B9DCF5',
//     paddingTop: height / 100,
//     // padding: width / 25,
//     // marginBottom: height / 40,
//   },


//   upcomingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   upcomingLoc: {
//     // height: height / 20,
//     paddingVertical: height / 100,
//     width: width / 1.2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'cyan',
//     alignSelf: 'center'
//   },

//   termContainer: {
//     height: height / 25,
//     width: width / 1.2,
//     justifyContent: 'space-between',
//     // alignItems: 'center',
//     // backgroundColor: 'lightblue',
//     alignSelf: 'center',
//     flexDirection: 'row'
//   },

//   termText: {
//     fontSize: width / 30,
//     color: '#667085',
//     // marginTop: height / 120,
//   },

//   pointsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: '#f0f9ff',
//     backgroundColor: '#E4F1FB',
//     height: height / 38,
//     // width: width / 4,
//     // margin: width / 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//     gap: 4,
//     paddingHorizontal: 5,

//   },

//   dot: {
//     height: width / 40,
//     width: width / 40,
//     borderRadius: width / 80,
//     backgroundColor: '#2E6FB6',
//     marginRight: width / 80,
    
//   },

//   upcomingFooter: {
//     marginTop: height / 40,
//     paddingTop: height / 60,
//     borderTopWidth: 1,
//     borderTopColor: '#E4F1FB',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   btnContainer: {
//     height: height / 15,
//     width: width / 2.2,
//     // backgroundColor: 'cyan',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },

//   checkInBtn: {
//     height: height / 24,
//     width: width / 2.9,
//     backgroundColor: colors.primary,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   checkInText: {
//     color: '#FFFFFF',
//     fontSize: width / 28,
//     fontWeight: '700',
//   },

//   fab: {
//     position: 'absolute',
//     right: width / 18,
//     bottom: Platform.OS === 'ios' ? height / 8 : height / 7,
//     height: width / 7,
//     width: width / 7,
//     borderRadius: width / 12,
//     backgroundColor: '#006BB6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   fabText: {
//     color: '#FFFFFF',
//     fontSize: width / 18,
//     fontWeight: '700',
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },

//   modalDropdown: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 110 : 50,
//     right: 25,
//     minWidth: width / 6.5,
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 10,
//   },


// });

// export default styles;

// import { StyleSheet, Dimensions, Platform } from 'react-native';
// import { colors, typography } from '../../styles/globalStyles';

// const { height, width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   centerContainer: {
//     height: height / 1.35,
//     width: width / 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     // backgroundColor: 'cyan'
//   },
//   loadingText: {
//     fontSize: 16,
//     fontWeight: '700',
//     fontFamily: typography.bold,
//     color: colors.primary,
//     textAlign: 'center',
//   },

//   header: {
//     height: height / 12,
//     width: width,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: 'cyan'
//   },
//   menuContainer: {
//     height: height / 18,
//     width: width / 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'cyan'
//   },
//   logoContainer: {
//     height: height / 12,
//     width: width / 1.3,
//     justifyContent: 'space-between',
//     // backgroundColor: 'cyan',
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   menuIcon: {
//     width: 30,
//     height: 30,
//     tintColor: colors.white,
//   },
//   logo: {
//     width: 100,
//     height: 60,
//     resizeMode: 'contain',
//     tintColor: colors.white
//   },
//   filterContainer: {
//     height: height / 20,
//     width: width / 2.6,
//     // backgroundColor: 'cyan',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },

//   filterCon: {
//     height: height / 40,
//     width: width / 5,
//     justifyContent: 'center',
//     // backgroundColor: 'pink',
//     borderRadius: 32,
//     borderWidth: 1,
//     borderColor: colors.white,
//     alignItems: 'center'
//   },

//   dropDownCon: {
//     height: height / 40,
//     width: width / 6.5,
//     justifyContent: 'center',
//     // backgroundColor: 'pink',
//     borderRadius: 32,
//     borderWidth: 1,
//     borderColor: colors.white,
//     alignItems: 'center',
//     flexDirection: 'row',

//   },
//   dropDownWrapper: {
//     position: 'relative',
//     alignItems: 'flex-end',
//     // backgroundColor: 'cyan'
//   },
//   dropDownPressed: {
//     opacity: 0.9,

//   },
//   dropDownMenu: {
//     position: 'absolute',
//     top: height / 40 + 6,
//     right: 0,
//     minWidth: width / 6.5,
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//     zIndex: 10,

//   },
//   dropDownItem: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.boderLight,
//     backgroundColor: colors.white,
//     borderRadius: 8

//   },
//   dropDownItemLast: {
//     borderBottomWidth: 0,
//   },
//   dropDownItemPressed: {
//     backgroundColor: colors.surface,

//   },
//   dropDownItemText: {
//     fontSize: 11,
//     fontWeight: '600',
//     fontFamily: typography.semiBold,
//     color: colors.primary,
//     textAlign: 'center',
//   },


//   filterTxt: {
//     fontSize: 10,
//     fontWeight: '600',
//     fontFamily: typography.semiBold,
//     color: colors.white
//   },


//   /* Tabs */
//   tabContainer: {
//     height: height / 17,
//     width: width / 1,
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     // backgroundColor: 'cyan',
//     borderWidth: 0.5,
//     borderColor: colors.border
//   },
//   tabItem: {
//     height: height / 18,
//     width: width / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//     // backgroundColor: 'lightgreen',
//     backgroundColor: '#FFFFFF',
//   },
//   activeTab: {

//     borderBottomColor: colors.primary,

//   },
//   tabText: {
//     fontSize: typography.size.md,
//     color: '#667085',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     fontSize: typography.size.md,
//     color: '#2E6FB6',
//     fontWeight: '700',
//   },

//   /* Scroll */
//   scrollContent: {
//     // paddingTop: height / 50,
//     paddingBottom: height / 10,
//     // alignItems: 'center',
//   },

//   spaceConatiner: {
//     height: height / 5.5,
//     width: width / 1,
//     // backgroundColor: 'pink',
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   card: {
//     height: height / 6.5,
//     width: width / 1.1,
//     backgroundColor: colors.white,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: colors.border,


//   },
//   cardHeader: {
//     height: height / 25,
//     width: width / 1.2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     // backgroundColor: 'blue',
//     alignSelf: 'center'
//   },
//   cardHeaderUpcome: {
//     height: height / 25,
//     width: width / 1.15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     // backgroundColor: 'blue',
//     alignSelf: 'flex-end'
//   },
//   cardTitle: {
//     fontSize: typography.size.md,
//     fontWeight: '700',
//     color: colors.textDark,
//     fontFamily: typography.bold
//   },
//   pointsText: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: colors.primary,
//     fontFamily: typography.bold
//   },
//   locationCon: {
//     height: height / 25,
//     width: width / 1.2,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'lightblue',
//     alignSelf: 'center',
//     flexDirection: 'row'
//   },


//   locationText: {
//     fontSize: typography.xs,
//     color: colors.textDark,
//     fontWeight: '400',
//     fontFamily: typography.regular
//   },

//   cardDivider: {
//     height: 1,
//     width: width / 1.1,
//     backgroundColor: colors.border,
//     // marginVertical: height / 60,

//   },


//   dateRow: {
//     height: height / 14.4,
//     width: width / 1.11,
//     flexDirection: 'row',
//     backgroundColor: colors.surface,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     borderWidth: 0,
//     // backgroundColor: 'cyan'
//   },
//   dateBlock: {
//     height: height / 15,
//     width: width / 2.4,
//     // justifyContent: 'center',
//     // backgroundColor: 'yellow',
//     // paddingHorizontal: 15
//   },
//   dateContainer: {
//     height: height / 30,
//     width: width / 2.4,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'pink',
//   },
//   checkInCon: {
//     height: height / 30,
//     width: width / 2.4,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'pink',
//     paddingHorizontal: 10
//   },
//   checkInvalueCon: {
//     height: height / 32,
//     width: width / 2.4,
//     justifyContent: 'center',
//     // backgroundColor: 'lightgreen',
//     paddingHorizontal: 10
//   },
//   dateLabel: {
//     fontSize: typography.size.xx,
//     color: colors.textDark,
//     // marginBottom: height / 200,

//   },
//   timeContainer: {
//     height: height / 32,
//     width: width / 2.4,
//     justifyContent: 'center',
//     // backgroundColor: 'pink',
//   },
//   dateValue: {
//     fontSize: typography.size.xs,
//     fontWeight: '700',
//     color: colors.textDark,
//     fontFamily: typography.bold
//   },
//   verticalDivider: {
//     height: height / 18,
//     width: 1,
//     backgroundColor: colors.border,
//     // justifyContent: 'center',
//     alignSelf: 'center'
//   },

//   // upcoming Designing here 
//   upcomingContainer: {
//     height: height / 4.3,
//     width: width / 1,
//     // backgroundColor: "blue",
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },

//   upcomingCard: {
//     width: width / 1.1,
//     backgroundColor: colors.white,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#B9DCF5',
//     // padding: width / 25,
//     // marginBottom: height / 40,
//   },


//   upcomingHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   upcomingLoc: {
//     height: height / 20,
//     width: width / 1.2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: 'cyan',
//     alignSelf: 'center'
//   },

//   termContainer: {
//     height: height / 25,
//     width: width / 1.2,
//     justifyContent: 'space-between',
//     // alignItems: 'center',
//     // backgroundColor: 'lightblue',
//     alignSelf: 'center',
//     flexDirection: 'row'
//   },

//   termText: {
//     fontSize: width / 30,
//     color: '#667085',
//     // marginTop: height / 120,
//   },

//   pointsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f9ff',
//     height: height / 35,
//     width: width / 4,
//     // margin: width / 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25

//   },

//   dot: {
//     height: width / 40,
//     width: width / 40,
//     borderRadius: width / 80,
//     backgroundColor: '#2E6FB6',
//     marginRight: width / 80,
    
//   },

//   upcomingFooter: {
//     marginTop: height / 40,
//     paddingTop: height / 60,
//     borderTopWidth: 1,
//     borderTopColor: '#E4F1FB',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   btnContainer: {
//     height: height / 15,
//     width: width / 2.2,
//     // backgroundColor: 'cyan',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },

//   checkInBtn: {
//     height: height / 24,
//     width: width / 2.9,
//     backgroundColor: colors.primary,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   checkInText: {
//     color: '#FFFFFF',
//     fontSize: width / 28,
//     fontWeight: '700',
//   },

//   fab: {
//     position: 'absolute',
//     right: width / 18,
//     bottom: Platform.OS === 'ios' ? height / 11 : height / 16,
//     height: width / 7,
//     width: width / 7,
//     borderRadius: width / 12,
//     backgroundColor: '#006BB6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   fabText: {
//     color: '#FFFFFF',
//     fontSize: width / 18,
//     fontWeight: '700',
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },

//   modalDropdown: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 110 : 50,
//     right: 25,
//     minWidth: width / 6.5,
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 10,
//   },


// });

// export default styles;
