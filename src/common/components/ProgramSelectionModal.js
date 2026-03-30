import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { colors, typography } from '../../styles/globalStyles';
import {
  PROGRAM_KEYS,
  PROGRAM_LABELS,
} from '../constants/programs';

import OcAllInIcon from '../../assets/Image/svg/OcAllIn.svg';
import PlcIcon from '../../assets/Image/svg/Plc.svg';
import FitnessIcon from '../../assets/Image/svg/Thirty.svg';

const { height, width } = Dimensions.get('screen');

const PROGRAM_ICONS = {
  [PROGRAM_KEYS.OC_ALL_IN]: OcAllInIcon,
  [PROGRAM_KEYS.PROFESSIONAL_LEARNING_CENTER]: PlcIcon,
  [PROGRAM_KEYS.FITNESS_CHALLENGE]: FitnessIcon,
};

const ProgramSelectionModal = ({
  visible,
  title = 'Select a feature to proceed',
  programs = [],
  onClose,
  onSelect,
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
            <Text style={styles.title}>{title}</Text>
          </View>

          {programs.map(program => {
            const ProgramIcon = PROGRAM_ICONS[program.key];

            return (
              <View key={program.key} style={styles.cardSpace}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => onSelect?.(program.key)}>
                  <View style={styles.row}>
                    <View style={styles.iconContainer}>
                      {ProgramIcon ? (
                        <ProgramIcon
                          width={40}
                          height={40}
                          color={colors.primaryDark}
                        />
                      ) : null}
                    </View>

                    <View style={styles.textBox}>
                      <View style={styles.cardBox}>
                        <Text style={styles.cardTitle}>
                          {PROGRAM_LABELS[program.key] || program.label}
                        </Text>
                      </View>
                      <View style={styles.cardDescBox}>
                        <Text style={styles.subText}>{program.description}</Text>
                      </View>
                    </View>

                    <Icon
                      name="chevron-with-circle-right"
                      size={18}
                      color="#666666"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default ProgramSelectionModal;

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
    height: height / 15,
    borderBottomWidth: 1,
    borderColor: colors.boderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
  },
  cardSpace: {
    height: height / 8,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    height: height / 10,
    width: width / 1.1,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    backgroundColor: '#F7FBFF',
  },
  iconContainer: {
    width: width / 6,
    height: height / 10.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    height: height / 10.5,
    width: width / 1.5,
    justifyContent: 'center',
  },
  cardBox: {
    height: height / 25,
    width: width / 1.9,
    justifyContent: 'flex-end',
  },
  cardDescBox: {
    height: height / 18,
    width: width / 1.8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
    lineHeight: 20,
  },
  subText: {
    fontSize: 12,
    color: '#414651',
    fontWeight: '600',
    lineHeight: 20,
    fontFamily: 'Open Sans',
  },
});
