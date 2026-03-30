import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safe: {
        flex: 1
    },
    fill: {
        height: height / 1.1,
        width: width / 1
    },
    scroll: {
        height: height / 1.1,
        width: width / 1
    },

    tabBar: {
        flexDirection: 'row',
        // backgroundColor: 'cyan',
        borderBottomWidth: 1,
        borderBottomColor: colors.boderLight,
        height: height / 20,
    },
    tab: {
        height: height / 20,
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabText: {
        fontSize: typography.size.sm,
        fontWeight: '500',
        color: colors.textMuted,
        fontFamily: typography.regular,
    },
    activeTabText: {
        color: colors.primary,
        fontWeight: '700',
        fontFamily: typography.bold,
    },
    tabUnderline: {
        position: 'absolute',
        bottom: 0,
        width: width / 2,
        borderBottomWidth: 2,
        borderColor: colors.primaryDark,
        borderRadius: 2,
    },

    listCon: {
        width: width,
        alignItems: 'center',
        // paddingTop: height / 60,
    },
    eventSpace: {
        height: height / 6,
        width: width / 1,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    eventCard: {
        width: width / 1.1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: colors.white,
        // marginBottom: height / 60,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    eventCardTop: {
        width: width / 1.2,
        alignSelf: 'center',
        paddingTop: height / 60,
        paddingBottom: height / 80,
    },
    eventTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height / 100,
    },
    eventTitle: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        flex: 1,
        paddingRight: width / 40,
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        borderRadius: 30,
        paddingHorizontal: width / 35,
        height: height / 35,
        gap: width / 60,
    },
    dot: {
        width: width / 45,
        height: width / 45,
        borderRadius: width / 90,
        backgroundColor: colors.primary,
    },
    pointsText: {
        fontSize: typography.size.xs,
        color: colors.primary,
        fontFamily: typography.semiBold,
        fontWeight: '600',
    },
    eventMeta: {
        fontSize: typography.size.xs,
        color: colors.textMuted,
        fontFamily: typography.regular,
        marginBottom: height / 200,
    },
    eventLocation: {
        fontSize: typography.size.xs,
        color: colors.textMuted,
        fontFamily: typography.regular,
    },
    eventCheckInRow: {
        height: height / 25,
        width: width / 1.11,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: width / 25,
        alignSelf: 'center'
    },
    checkInLabel: {
        fontSize: typography.size.xs,
        color: colors.textMuted,
        fontFamily: typography.regular,
    },
    checkInValue: {
        fontSize: typography.size.xs,
        color: colors.textDark,
        fontFamily: typography.bold,
        fontWeight: '700',
    },

    spaceContainer: {
        height: height / 10.5,
        width: width / 1,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    memberCard: {
        height: height / 12,
        width: width / 1.1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        backgroundColor: colors.white,
        // marginBottom: height / 60,
        flexDirection: 'row',
        // alignItems: 'center',
        // paddingHorizontal: width / 25,
        shadowColor: colors.primary,
        // shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        // elevation: 0.5,
        // alignItems: 'center'
    },
    avatarSpace: {
        height: height / 12.3,
        width: width / 5.5,
        //  backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarCon: {
        height: width / 9,
        width: width / 9,
        borderRadius: width / 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        height: width / 9,
        width: width / 9,
        borderRadius: width / 16,
    },
    avatarInitials: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
    },
    memberInfo: {
        height: height / 12.3,
        width: width / 1.4,
        //  backgroundColor: 'lightgreen',
        //  justifyContent: 'center',
        //  alignItems: 'center'
    },
    memberNameCon: {
        height: height / 28,
        width: width / 1.4,
        //  backgroundColor: 'lightblue',
        justifyContent: 'flex-end',
        //  alignItems: 'center'
    },
    memberName: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        // marginBottom: height / 200,
    },
    memberEmailCon: {
        height: height / 30,
        width: width / 1.4,
        //  backgroundColor: 'lightyellow',
        justifyContent: 'center',
        //  alignItems: 'center'
    },
    memberEmail: {
        fontSize: typography.size.xs,
        fontFamily: typography.regular,
        color: colors.textMuted,
    },


    //TeamPageStyling
    teamContainer: {
        height: height / 16,
        width: width / 1,
        //  backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamHeaderText: {
        // textAlign: 'center',
        fontSize: typography.size.sm,
        color: colors.textMuted,
        fontFamily: typography.regular,
    },
    teamSpace: {
        height: height / 12,
        width: width / 1,
        //  backgroundColor: 'yellow',
        //  justifyContent: 'center',
        alignItems: 'center'
    },
    teamNameContainer: {
        height: height / 22,
        width: width / 1.2,
        backgroundColor: colors.lightBlue,
        // marginHorizontal: width / 12,
        borderRadius: 8,
        // paddingVertical: height / 55,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamNameText: {
        fontSize: typography.size.lg,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
    },
    boxBoder: {
        width: width / 1.05,
        backgroundColor: colors.white,
        borderRadius: 8,
        // shadowColor: colors.primary,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.05,
        // shadowRadius: 3,
        // elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.boderLight,
        paddingBottom: 15

    },
    teamMembersHeader: {
        height: height / 22,
        width: width / 1.2,
        //  backgroundColor: 'cyan',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: height / 40,
        gap: width / 40,
    },
    teamMembersStar: {
        fontSize: typography.size.md,
        color: colors.primary,
    },
    teamMembersTitleText: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
    },
    buttonsContainer: {
        height: height / 11,
        width: width / 1.1,
        flexDirection: 'row',
        alignSelf: 'center',
        // backgroundColor: 'cyan',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exitButton: {
        height: height / 22,
        width: width / 2.3,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    changeButton: {
        height: height / 22,
        width: width / 2.3,
        backgroundColor: colors.primaryDark,
        borderRadius: 8,
        // paddingVertical: height / 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    exitButtonText: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
        lineHeight: 20
    },
    changeButtonText: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.white,
        lineHeight: 20
    },


    //ExitModal Style
    modalOverlay: {
        height: height / 1,
        width: width / 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 16,
        height: height / 2.55,
        width: width / 1.1,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        // elevation: 15,
    },
    titleCon: {
        height: height / 18,
        width: width / 1.2,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
        // borderColor: colors.boderLight,
        // borderBottomWidth: 1
    },
    modalTitle: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        // marginBottom: height / 70,
    },
    // modalDivider: {
    //     width: '100%',
    //     height: 1,
    //     backgroundColor: colors.border,
    //     marginBottom: height / 40,
    // },
    modalIconContainer: {
        height: height / 7,
        width: width / 1.2,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalGroupIcon: {
        fontSize: width / 8,
        color: colors.primary,
    },
    quesContainer:{
         height: height / 25,
        width: width / 1.2,
        // backgroundColor: 'cyan',
        alignItems: 'center'
    },
    modalQuestion: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        // textAlign: 'center',
        // lineHeight: 24,
    },
    descContainer:{
          height: height / 13,
        width: width / 1.2,
        // backgroundColor: 'cyan',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    modalDescription: {
        fontSize: typography.size.xs,
        fontFamily: typography.regular,
        color: colors.textDark,
        textAlign: 'center',
        lineHeight: 22,
        
    },
    modalButtonsContainer: {
         height: height / 14,
        width: width / 1.2,
        // backgroundColor: 'cyan',
        flexDirection: 'row',
        gap: width / 30,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalCancelButton: {
       height: height / 25,
        width: width / 4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.boderLight,
        backgroundColor: colors.white,
    },
    modalExitButton: {
        height: height / 25,
        width: width / 3,
        backgroundColor: colors.primaryDark,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalCancelText: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
    },
    modalExitText: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.white,
    },
    modalDivider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.boderLight,
        
    },

    
});
