import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    scrollView: {
        height: height / 1.1,
        width: width / 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'cyan',
        paddingTop: height / 40,
        paddingBottom: height / 20,
    },

    headContainer: {
        height: height / 16,
        width: width / 1.1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'cyan'
        // paddingBottom: height / 40,
    },



    infoTitle: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
        // marginBottom: height / 35,
    },

    // Bullet List
    bulletList: {
        // marginBottom: height / 45,
    },
    bulletItemCon: {
        // height: height / 12,
        paddingBottom: height / 40,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
    },
    bulletItem: {
        fontSize: typography.size.sm,
        fontFamily: typography.regular,
        color: colors.textDark,
        lineHeight: 24,
        fontWeight: '400',
        // marginBottom: height / 55,
        // paddingLeft: width / 40,
    },

    labelCon: {
        height: height / 25,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        // alignItems: 'flex-start',
        justifyContent: 'center',
    },
    label: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,

    },
    inputCon: {
        height: height / 16,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        // justifyContent: 'center',

    },

    input: {
        height: height / 20,
        width: width / 1.1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        fontSize: typography.size.md,
        // marginBottom: height / 50,
    },


    importantNote: {
        fontSize: typography.size.xs,
        fontFamily: typography.regular,
        color: colors.textMuted,
        // marginBottom: height / 40,
        lineHeight: 20,
        fontStyle: 'italic',
    },
    passwordNote: {
        fontSize: typography.size.sm,
        fontFamily: typography.regular,
        color: colors.textMuted,
        marginBottom: height / 40,
        lineHeight: 20,
    },

    btnCon: {
        height: height / 8,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
    },
    createButton: {
        width: width / 1.1,
        height: height / 20,
        backgroundColor: colors.primaryDark,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',

    },
    createButtonDisabled: {
        backgroundColor: colors.textMuted,
    },
    createButtonText: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.white,
    },
    createButtonTextDisabled: {
        color: '#E2E8F0',
    },



    // Success Screen Styles

    successContainer: {
        height: height / 1,
        width: width / 1,
        // backgroundColor: 'cyan',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingHorizontal: width / 10,
    },
    successCircle: {
        height: height / 3.5,
        width: width / 1,
        // backgroundColor: "lightblue",
        justifyContent: 'center',   
        alignItems: 'center',
    },
    iconOuter: {
       height: 150,
       width: 150,
       borderRadius: 100,
       backgroundColor: colors.lightBlue,
       alignItems: 'center',
       justifyContent: 'center',
    //    alignSelf: 'center',
    //    marginBottom: height / 30,
        // backgroundColor: 'green',
    },

    checkIcon: {
        height: 100,
        width: 100
    },
    successCheck: {
        fontSize: 48,
        color: colors.white,
    },
    successTitleContainer:{
        height: height / 12,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        alignItems: 'center',
        alignSelf: 'center',
        // justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        
    },
    successTitle: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
        // paddingBottom: height / 40,
    },
  
    successTextContainer: {
        alignItems: 'center ',
    },
    congratsContainer:{
         height: height / 12,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    congratsText: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        // marginBottom: height / 20,
    },
    desContainer: {
        // height: height / 12,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    successDescription: {
        fontSize: typography.size.sm,
        fontFamily: typography.regular,
        color: colors.textDark,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: height / 30,
    },
    boldText: {
        fontWeight: '700',
    },
});