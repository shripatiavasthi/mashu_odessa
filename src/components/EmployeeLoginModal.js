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

const { height, width } = Dimensions.get('screen')

const EmployeeLoginModal = ({
    visible,
    onClose,
    onAllIn,
    onPLC,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            statusBarTranslucent>
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={onClose}
                    activeOpacity={1}
                />

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Employee Login</Text>
                    </View>

                    <View style={styles.cardSpace}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={onAllIn}>
                            <View style={styles.row}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name="person-outline"
                                        size={35}
                                        color="#006BB6"
                                    />
                                </View>

                                <View style={styles.textBox}>
                                    <View style={styles.cardBox}>
                                        <Text style={styles.cardTitle}>OC All-In</Text>
                                    </View>
                                    <View style={styles.cardDescBox}>
                                        <Text style={styles.subText}>
                                            Please log in to access the employee reward program
                                        </Text>
                                    </View>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={22}
                                    color="#666"
                                />

                            </View>
                        </TouchableOpacity>
                    </View>


                        <View style={styles.cardSpace}>
                        <TouchableOpacity
                            style={styles.card}
                             onPress={onPLC}>
                            <View style={styles.row}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name="school-outline"
                                        size={35}
                                        color="#006BB6"
                                    />
                                </View>

                                <View style={styles.textBox}>
                                    <View style={styles.iOSBoxCon}>
                                        <Text style={styles.cardTitle}>Professional Learning Center</Text>
                                    </View>
                                    <View style={styles.cardDescBox}>
                                        <Text style={styles.subText}>
                                             Please log in to access the PLC credits
                                        </Text>
                                    </View>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={22}
                                    color="#666"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default EmployeeLoginModal;



const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },

    backdrop: {
        flex: 1,
        
    },


    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 30,
        width: width / 1,
    },


    header: {
        // backgroundColor: 'cyan',
        height: height / 15,
        borderBottomWidth: 1,
        borderColor: colors.boderLight,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        fontFamily: typography.bold
    },
    cardSpace: {
        height: height / 8,
        width: width / 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    card: {
        height: height / 10,
        width: width / 1.1,
        alignSelf: 'center',
        // marginTop: 18,
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: 8,
        // padding: 15,
        backgroundColor: '#F7FBFF',
    },
    iconContainer: {
        width: width / 6,
        height: height / 10.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'orange'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    textBox: {
        height: height / 10.5,
        width: width / 1.5,
        // backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    cardBox: {
        height: height / 25,
        width: width / 1.9,
        // backgroundColor: 'magenta',
        justifyContent: 'flex-end',
        // marginBottom: 5
    },
    cardDescBox: {
        height: height / 18,
        width: width / 1.8,
        // backgroundColor: 'cyan'

    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        fontFamily: typography.bold,
        lineHeight: 20
    },

    subText: {
        fontSize: 12,
        color: '#414651',
        fontWeight: '600',
        // marginTop: height * 0.004,
        lineHeight: 20,
        fontFamily: 'Open Sans',
    },
    iOSBoxCon: {
      height: height/35,
    //   backgroundColor: 'cyan',
      justifyContent: 'flex-end'
    },
});

