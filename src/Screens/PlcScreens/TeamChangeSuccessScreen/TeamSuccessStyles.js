import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    content: {
        // flex: 1,
        // alignItems: 'center',
        // paddingHorizontal: width / 20,
        // paddingTop: height / 15,
    },
    iconOuter: {
        height: height / 4.5,
        width: width / 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    iconCircle: {
        height: height / 6.5,
        width: height / 6.5,
        borderRadius: 100,
        // borderWidth: 4,
        backgroundColor: colors.lightBlue,
        borderColor: '#2E6FB6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        height: 100,
        width: 100

    },
    successCon:{
        height: height / 10,
        width: width / 1.1,
        // justifyContent: 'flex-end',
        // backgroundColor:'cyan',
        alignSelf: 'center',
         borderBottomWidth: 1,
        borderColor: colors.boderLight

    },
    successTitle: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
        textAlign: 'center',
        // marginBottom: height / 45, 
    },
    divider: {
        width: width / 1.1,
        height: 1,
        backgroundColor: colors.border,
        marginBottom: height / 35,
    },
    congratsCon:{
        height: height / 10,
        width: width / 1.1,
        justifyContent: 'center',
        // backgroundColor:'cyan',
        alignSelf: 'center',
        alignItems: 'center'
    },
    messageCon:{
        height: height / 3,
        width: width / 1.1,
        // justifyContent: 'center',
        // backgroundColor:'cyan',
        alignSelf: 'center',
        alignItems: 'center'
    },
    congrats: {
        fontSize: typography.size.lg,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        
    },
    message: {
        fontSize: typography.size.md,
        fontFamily: typography.regular,
        color: colors.textDark,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: width / 15,
    },
    teamName: {
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.primary,
    },
    button: {
        height: height / 20,
        width: width / 1.1,
        backgroundColor: colors.primaryDark,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 'auto',
        // marginBottom: height / 20,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.white,
    },
});