import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    scrollView: {
         height: height / 1,
        width: width / 1,
    },
    container: {
        height: height / 1.2,
        width: width / 1.1,
        alignSelf: 'center',
        // paddingVertical: height / 40,
    },
        
    headContainer:{
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
    bulletItemCon:{
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

    // Labels (Team Name & Team Password)
    label: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        marginTop: height / 35,
        marginBottom: height / 70,
    },

    // Input Fields
    input: {
        width: '100%',
        height: height / 14,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: colors.white,
        paddingHorizontal: width / 25,
        fontSize: typography.size.md,
        marginBottom: height / 50,
    },

    // Notes
    importantNote: {
        fontSize: typography.size.sm,
        fontFamily: typography.regular,
        color: colors.textMuted,
        marginBottom: height / 40,
        lineHeight: 20,
    },
    passwordNote: {
        fontSize: typography.size.sm,
        fontFamily: typography.regular,
        color: colors.textMuted,
        marginBottom: height / 40,
        lineHeight: 20,
    },

    // Create Team Button
    createButton: {
        width: '100%',
        height: height / 14,
        backgroundColor: colors.primaryDark,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height / 15,
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
});