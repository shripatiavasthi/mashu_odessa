import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient from '../../../components/AppGradient';
import AppHeader from '../../../components/AppHeader';
import { styles } from '../ProgressTeamScreen/TeamDetailStyles';

import Team from '../../../assets/Image/svg/Team.svg'

const { height, width } = Dimensions.get('window');

const eventsData = [
    {
        id: 1,
        title: 'Graduation Ceremony',
        points: 100,
        category: 'Career Enhancement',
        term: 'PLC 2026',
        location: 'Exhibition Hall',
        checkIn: '2024-11-15 | 02:30 PM',
    },
    {
        id: 2,
        title: 'Annual Awards Gala',
        points: 100,
        category: 'Career Enhancement',
        term: 'PLC 2026',
        location: 'Grand Ballroom',
        checkIn: '2024-12-01 | 09:00 AM',
    },
    {
        id: 3,
        title: 'Innovation Summit',
        points: 50,
        category: 'Career Enhancement',
        term: 'PLC 2026',
        location: 'Conference Room A',
        checkIn: '2024-12-15 | 04:00 PM',
    },
];

const membersData = [
    {
        id: 1,
        name: 'You',
        email: 'michaela@odessa.edu',
        avatar: null,
    },
    {
        id: 2,
        name: 'Ethan Carter',
        email: 'ethan.carter@sunset.edu',
        avatar: null,
    },
    {
        id: 3,
        name: 'Oliver James',
        email: 'oliver.james@sunset.edu',
        avatar: null,
    },
    {
        id: 4,
        name: 'Noah Smith',
        email: 'noah.smith@sunset.edu',
        avatar: null,
    },
    {
        id: 5,
        name: 'Lucas Bennett',
        email: 'lucas.bennett@sunset.edu',
        avatar: null,
    },
];

const getInitials = name => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function TeamScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('myTeam');
    const [showExitModal, setShowExitModal] = useState(false);
    const teamName = 'The Holly Headed Harpes';

    return (
        <SafeAreaView style={styles.safe}>
            <AppGradient style={styles.fill}>
                <AppHeader />
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'myTeam' && styles.activeTab]}
                        onPress={() => setActiveTab('myTeam')}>
                        <Text style={[styles.tabText, activeTab === 'myTeam' && styles.activeTabText]}>
                            My Team
                        </Text>
                        {activeTab === 'myTeam' && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'events' && styles.activeTab]}
                        onPress={() => setActiveTab('events')}>
                        <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
                            Events
                        </Text>
                        {activeTab === 'events' && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                </View>


                {activeTab === 'myTeam' ? (
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.listCon}>
                            <View style={styles.teamContainer}>
                                <Text style={styles.teamHeaderText}>
                                    You are currently on the team
                                </Text>
                            </View>

                            <View style={styles.teamSpace}>
                                <View style={styles.teamNameContainer}>
                                    <Text style={styles.teamNameText}>{teamName}</Text>
                                </View>
                            </View>

                            <View style={styles.boxBoder}>
                                <View style={styles.teamMembersHeader}>
                                    <Text style={styles.teamMembersStar}>★</Text>
                                    <Text style={styles.teamMembersTitleText}>Team Members</Text>
                                    <Text style={styles.teamMembersStar}>★</Text>
                                </View>
                                {membersData.map(item => (
                                    <View key={item.id} style={styles.spaceContainer}>
                                        <TouchableOpacity style={styles.memberCard}>
                                            <View style={styles.avatarSpace}>
                                                <View style={styles.avatarCon}>
                                                    {item.avatar ? (
                                                        <Image
                                                            source={{ uri: item.avatar }}
                                                            style={styles.avatarImage}
                                                        />
                                                    ) : (
                                                        <Text style={styles.avatarInitials}>
                                                            {getInitials(item.name)}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={styles.memberInfo}>
                                                <View style={styles.memberNameCon}>
                                                    <Text style={styles.memberName}>{item.name}</Text>
                                                </View>
                                                <View style={styles.memberEmailCon}>
                                                    <Text style={styles.memberEmail}>{item.email}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    style={styles.exitButton}
                                    onPress={() => {
                                        console.log('Exit From Team pressed');
                                        setShowExitModal(true)
                                    }}>
                                    <Text style={styles.exitButtonText}>Exit From Team</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.changeButton}
                                    onPress={() => {
                                        console.log('Change My Team pressed');
                                        navigation.navigate('ChangeTeamScreen')
                                    }}>
                                    <Text style={styles.changeButtonText}>Change My Team</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ height: height / 10 }} />
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.listCon}>
                            {eventsData.map(item => (
                                <View style={styles.eventSpace} key={item.id}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PlcDetailScreen')}
                                        style={styles.eventCard}>
                                        <View style={styles.eventCardTop}>
                                            <View style={styles.eventTitleRow}>
                                                <Text style={styles.eventTitle}>{item.title}</Text>
                                                <View style={styles.pointsBadge}>
                                                    <View style={styles.dot} />
                                                    <Text style={styles.pointsText}>{item.points} Points</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.eventMeta}>
                                                {item.category}{'  '}|{'  '}{item.term}
                                            </Text>
                                            <Text style={styles.eventLocation}>
                                                Location: {item.location}
                                            </Text>
                                        </View>

                                        <View style={styles.eventCheckInRow}>
                                            <Text style={styles.checkInLabel}>Event Check In:{'  '}</Text>
                                            <Text style={styles.checkInValue}>{item.checkIn}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View style={{ height: height / 10 }} />
                        </View>
                    </ScrollView>
                )}
            </AppGradient>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showExitModal}
                onRequestClose={() => setShowExitModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleCon} >
                            <Text style={styles.modalTitle}>Exit From Current Team</Text>
                        </View>
                        <View style={styles.modalDivider} />
                        <View style={styles.modalIconContainer}>
                            <Team />
                        </View>
                        <View style={styles.quesContainer}>
                            <Text style={styles.modalQuestion}>
                                Are you sure you want to leave this team?
                            </Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text style={styles.modalDescription}>
                                If you exit yourself from the current team, you will no longer be associated with it.
                            </Text>
                        </View>
                        <View style={styles.modalDivider} />
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setShowExitModal(false)}
                            >
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalExitButton}
                                onPress={() => {
                                    setShowExitModal(false);
                                    navigation.navigate('TeamLoginSignScreen')
                                    console.log('User confirmed exit from team');
                                }}>
                                <Text style={styles.modalExitText}>Exit from Team</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}