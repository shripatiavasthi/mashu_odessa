import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    contentContainer: {
        height: height / 1.1,
        width: width / 1,
        // backgroundColor: 'lightblue',
        // justifyContent: 
    },
    insContainer: {
        height: height / 8,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    instructionText: {
        fontSize: typography.size.sm,
        lineHeight: 22,
        color: colors.textDark,
        // marginBottom: height / 35,
        fontFamily: typography.regular,
        fontWeight: '400'
    },
    spaceCon: {
        height: height / 8,
        width: width / 1,
        // backgroundColor: 'cyan',
    },
    selectTeamCon: {
        height: height / 16.5,
        width: width / 1.2,
        // backgroundColor: 'cyan',
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    label: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        // marginBottom: height / 70,
    },
    selectBox: {
        alignSelf: 'center',
        width: width / 1.2,
        height: height / 20,
        borderWidth: 1,
        borderColor: colors.boderLight,
        borderRadius: 8,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width / 25,


    },
    selectText: {
        fontSize: typography.size.md,
        color: colors.textDark,
        fontFamily: typography.medium,
        // position: 'relative',
    },
    dropdownArrow: {
        fontSize: 18,
        color: colors.textMuted,
    },
    optionsContainer: {
        height: height / 5.5,
        width: width / 1.2,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: height /2.68
    },
    optionItem: {
        height: height / 23,
        width: width / 1.3,
        // backgroundColor: 'cyan',
        alignSelf: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // alignItems: 'center'
    },
    optionText: {
        fontSize: typography.size.sm,
        color: colors.textDark,
        fontFamily: typography.regular,
    },
    passwordInput: {
        alignSelf: 'center',
        width: width / 1.2,
        height: height / 20,
        borderWidth: 1,
        borderColor: colors.boderLight,
        borderRadius: 8,
        backgroundColor: colors.white,
        paddingHorizontal: width / 25,
        fontSize: typography.size.md,


    },
    btnContainer: {
        height: height / 3,
        width: width / 1,
        //  backgroundColor: 'cyan',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    changeButton: {
        height: height / 20,
        width: width / 1.2,
        backgroundColor: colors.primaryDark,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 'auto',
        // marginBottom: height / 25,
    },
    changeButtonDisabled: {
        backgroundColor: colors.boderLight,
    },
    changeButtonText: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.white,
    },
    changeButtonTextDisabled: {
        color: colors.white,
    },
});
