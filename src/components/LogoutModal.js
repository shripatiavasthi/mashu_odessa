import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../styles/globalStyles';


const { height, width } = Dimensions.get('window');

const LogoutModal = ({ visible, onCancel, onConfirm }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            statusBarTranslucent
            >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Logout</Text>
                    </View>
                    <View style={styles.boderContainer} />
                    <View style={styles.body}>
                        <View style={styles.imgConatainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="log-out-outline" size={40} color={colors.primary} />
                        </View>
                        </View>
                        <View style={styles.msgCon}>
                        <Text style={styles.message}>
                            Are you sure do you want to
                        </Text>
                        </View>
                <View style={styles.msgCon}>
                        <Text style={styles.headerText}>Logout</Text>
</View>
                    </View>
                    <View style={styles.boderContainer} />

                    <View style={styles.footer}>
                        <View style={styles.btnSpace}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.btnSpace}>
                            <TouchableOpacity
                                style={styles.yesBtn}
                                onPress={onConfirm}>
                                <Text style={styles.yesText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default LogoutModal;


const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        width: width / 1.1,
        backgroundColor: colors.white,
        borderRadius: 16,
        overflow: 'hidden',
        // backgroundColor: 'cyan'
    },

    /* Header */
    header: {
        height: height / 15,
        // backgroundColor: 'cyan',
        // borderBottomWidth: 1,
        borderColor: colors.boderLight,
        width: width / 1.3,
        alignSelf: 'center',
        justifyContent: 'center',
        // alignItems: 'center'
    },

    headerText: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: typography.bold,
        color: colors.textDark
    },
    boderContainer: {
        height: 1,
        borderColor: colors.boderLight,
        width: width / 1.1,
        // borderWidth: 1,
        backgroundColor: colors.boderLight
    },
    /* Body */
    body: {
        height: height/4.5,
        width: width/1.1,
        // alignItems: 'center',
        // paddingVertical: 25,
        // backgroundColor: 'cyan',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    imgConatainer:{
        height: height/7,
        width: width/1.1,
        // alignItems: 'center',
        // paddingVertical: 25,
        // backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#005A9C',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 15,
    },
    msgCon:{
        height: height/30,
        width: width/1.1,
        // alignItems: 'center',
        // paddingVertical: 25,
        // backgroundColor: 'lightpink',
        // justifyContent: 'center',
        alignItems: 'center'
    },

    message: {
        fontSize: 16,
        color: '#666',
        fontWeight: '400',
        fontFamily: typography.regular
    },

    logoutText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 5,
        color: '#333',
    },

    /* Footer */
    footer: {
        height: height / 15,
        width: width / 1.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: '#ddd',
        // backgroundColor: 'cyan'
    },

    cancelBtn: {
        height: height / 25,
        width: width / 4.5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        borderRadius: 8,
        alignItems: 'center',
    },

    cancelText: {
        color: colors.textDark,
        fontSize: 14,
        fontFamily: typography.regular
    },
    btnSpace: {
        height: height / 15,
        width: width / 3.8,
        // backgroundColor: 'pink',
        justifyContent: 'center',

    },

    yesBtn: {
        height: height / 25,
        width: width / 4.5,
        backgroundColor: colors.primary,

        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center'
    },

    yesText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: typography.bold
    },

});
