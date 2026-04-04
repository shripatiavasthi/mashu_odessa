import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        height: height/1,
       width: width/1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    contentBox: {
       height: height/1.1,
       width: width/1,
    //    backgroundColor: 'cyan',
    //    justifyContent: 'center',
        alignItems: 'center',
    },
    contentCon:{
        height: height/3,
       width: width/1,
    //    backgroundColor: 'blue',
       justifyContent: 'flex-end'
    },
    descriptionText: {
        fontSize: typography.size.sm,
        fontFamily: typography.medium,
        color: colors.textDark,
        textAlign: 'center',
        lineHeight: 24,
        // marginBottom: height / 20,
    },
    buttonContainer: {
        height: height / 4,
        width: width / 1,
        // alignSelf: 'center',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    loaderContainer: {
        minHeight: height / 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSpace:{
         height: height / 10,
        width: width / 1,
        justifyContent: 'flex-end',
        alignItems: 'center',        
        // backgroundColor: 'blue'
    },
    secbtnnSpace:{
         height: height / 10,
        width: width / 1,
        justifyContent: 'center',
        alignItems: 'center',        
        // backgroundColor: 'blue'
    },
    primaryButton: {
        backgroundColor: colors.primary,
        height: height / 20,
        width: width/1.2,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        color: colors.white,
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        fontWeight: '700',
    },
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 8,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
    },
    bottomNavItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    bottomNavIcon: {
        height: 28,
        width: 28,
    },
    bottomNavText: {
        color: colors.textDark,
        fontSize: 12,
        fontFamily: typography.bold,
        fontWeight: '600',
    },
    bottomNavTextActive: {
        color: colors.primary,
        fontSize: 12,
        fontFamily: typography.bold,
        fontWeight: '600',
    },
    moreIcon: {
        color: colors.textDark,
        fontSize: 24,
        lineHeight: 24,
        fontFamily: typography.bold,
        fontWeight: '700',
    },
});
