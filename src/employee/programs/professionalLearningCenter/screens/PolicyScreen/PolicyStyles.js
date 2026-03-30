import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
       scrollView: {
        flex: 1,
    },
    container: {
        flex: 1
    },
    titleCon: {
        height: height / 16,
        width: width / 1,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        fontSize: typography.size.md,
        fontFamily: typography.bold,
        color: colors.primary,
        lineHeight: 24,
        fontWeight: '700'
    },
    boxContainer: {
        //  height: height / 35,
        paddingBottom: 10,
        width: width / 1.1,
        // backgroundColor: 'lightblue',
        alignSelf: 'center'
    },
    secHeadingCon: {
        height: height / 35,
        // paddingBottom: 15,
        width: width / 1.1,
        // backgroundColor: 'lightblue',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center'
    },
    sectionTitle: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
        // marginTop: height / 30,
        // marginBottom: height / 50,
    },
    paragraphCon: {
        // height: height / 20,
        // paddingBottom: 15,
        width: width / 1.1,
        // backgroundColor: 'lightyellow',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center'
    },
    paragraph: {
        fontSize: typography.size.xs,
        fontFamily: typography.regular,
        color: colors.textDark,
        lineHeight: 20,

    },
    bulletList: {
        // height: height / 11,
        paddingBottom: 5,
        width: width / 1.1,
        // backgroundColor: 'lightgreen',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        // paddingHorizontal: 10
    },
    bulletSpace: {
        // height: height / 35,
        paddingBottom: 5,
        width: width / 1.15,
        // backgroundColor: 'cyan',
        alignSelf: 'center'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    bulletItem: {
        fontSize: typography.size.xs,
        fontFamily: typography.regular,
        color: colors.textDark,
        lineHeight: 20,
        // paddingHorizontal: 10
        // marginBottom: height / 55,
        // paddingLeft: width / 40,
    },
    subBulletList: {
        paddingLeft: width / 20,
        
    },
});
