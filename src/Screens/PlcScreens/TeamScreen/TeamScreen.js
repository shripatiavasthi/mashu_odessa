import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    ActivityIndicator,
    Alert,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { apiClient } from '../../../api/client';
import AppGradient from '../../../components/AppGradient';
import AppHeader from '../../../components/AppHeader';
import { env, endpoints } from '../../../env';
import { selectAuth } from '../../../store';
import { colors } from '../../../styles/globalStyles';
import { styles } from '../ProgressTeamScreen/TeamDetailStyles';
import Team from '../../../assets/Image/svg/Team.svg';

const { height, width } = Dimensions.get('window');

const getInitials = name => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function TeamScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('myTeam');
    const [showExitModal, setShowExitModal] = useState(false);
    const [myTeam, setMyTeam] = useState(null);
    const [myTeamStatus, setMyTeamStatus] = useState('idle');
    const [myTeamError, setMyTeamError] = useState(null);
    const [teamEvents, setTeamEvents] = useState([]);
    const [teamEventsStatus, setTeamEventsStatus] = useState('idle');
    const [teamEventsError, setTeamEventsError] = useState(null);
    const [exitStatus, setExitStatus] = useState('idle');
    const [refreshing, setRefreshing] = useState(false);
    const { accessToken, user } = useSelector(selectAuth);

    const loadMyTeam = async () => {
        if (!accessToken || !user?.id) {
            setMyTeam(null);
            setMyTeamStatus('idle');
            setMyTeamError(null);
            return;
        }
        try {
            setMyTeamStatus('loading');
            setMyTeamError(null);
            const response = await apiClient.get(
                `${env.apiBaseUrl}${endpoints.plcMyTeam(user.id)}`,
                { token: accessToken },
            );
            setMyTeam(response?.data || null);
            setMyTeamStatus('succeeded');
        } catch (error) {
            setMyTeam(null);
            setMyTeamStatus('failed');
            setMyTeamError(error?.message || 'Failed to load your team');
        }
    };

    const loadTeamEvents = async () => {
        if (!accessToken || !user?.id) {
            setTeamEvents([]);
            setTeamEventsStatus('idle');
            setTeamEventsError(null);
            return;
        }
        try {
            setTeamEventsStatus('loading');
            setTeamEventsError(null);
            const response = await apiClient.get(
                `${env.apiBaseUrl}${endpoints.plcMyTeamEvents(user.id)}`,
                { token: accessToken },
            );
            const data = response?.data;
            setTeamEvents(Array.isArray(data) ? data : []);
            setTeamEventsStatus('succeeded');
        } catch (error) {
            setTeamEvents([]);
            setTeamEventsStatus('failed');
            setTeamEventsError(error?.message || 'Failed to load team events');
        }
    };

    useEffect(() => {
        loadMyTeam();
    }, [accessToken, user?.id]);

    useEffect(() => {
        loadTeamEvents();
    }, [accessToken, user?.id]);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            if (activeTab === 'myTeam') {
                await loadMyTeam();
            } else {
                await loadTeamEvents();
            }
        } catch (e) {
            console.warn('[Refresh] Failed:', e?.message);
        } finally {
            setRefreshing(false);
        }
    };

    const teamName = myTeam?.teamName || 'No team assigned';

    const membersData = useMemo(() => {
        const list = myTeam?.members;
        if (!Array.isArray(list)) return [];
        return list.map(item => {
            const fullName = [item?.firstName, item?.lastName]
                .filter(Boolean)
                .join(' ')
                .trim() || 'Member';
            return {
                id: item?.userId || fullName,
                name: item?.isCurrentUser ? 'You' : fullName,
                email: item?.email || '',
                avatar: null,
            };
        });
    }, [myTeam]);

    useEffect(() => {
        if (myTeamStatus !== 'succeeded') return;
        if (membersData.length === 0) {
            navigation.navigate('TeamLoginSignScreen');
        }
    }, [membersData.length, myTeamStatus, navigation]);

    const handleExitTeam = async () => {
        if (!accessToken || !user?.id || exitStatus === 'loading') return;
        try {
            setExitStatus('loading');
            const response = await apiClient.post(
                `${env.apiBaseUrl}${endpoints.plcExitTeam(user.id)}`,
                {},
                { token: accessToken },
            );
            if (response?.success) {
                setShowExitModal(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TeamLoginSignScreen' }],
                });
                return;
            }
            throw new Error('Failed to exit team');
        } catch (error) {
            Alert.alert('Exit Team Failed', error?.message || 'Unable to exit the team right now.');
        } finally {
            setExitStatus('idle');
        }
    };

    const isMyTeamLoading = (myTeamStatus === 'loading' || myTeamStatus === 'idle') && !refreshing;
    const isEventsLoading = (teamEventsStatus === 'loading' || teamEventsStatus === 'idle') && !refreshing;

    const renderMyTeamContent = () => {
        if (isMyTeamLoading) {
            return (
                <View style={localStyles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }
        if (myTeamError) {
            return (
                <View style={localStyles.centerContainer}>
                    <Text style={localStyles.emptyTitle}>Something Went Wrong</Text>
                    <Text style={localStyles.emptySubtitle}>{myTeamError}</Text>
                    <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                </View>
            );
        }
        return membersData.map(item => (
            <View key={item.id} style={styles.spaceContainer}>
                <TouchableOpacity style={styles.memberCard}>
                    <View style={styles.avatarSpace}>
                        <View style={styles.avatarCon}>
                            {item.avatar ? (
                                <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
                            ) : (
                                <Text style={styles.avatarInitials}>{getInitials(item.name)}</Text>
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
        ));
    };

    const renderEventsContent = () => {
        if (isEventsLoading) {
            return (
                <View style={localStyles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }
        if (teamEventsError) {
            return (
                <View style={localStyles.centerContainer}>
                    <Text style={localStyles.emptyTitle}>Something Went Wrong</Text>
                    <Text style={localStyles.emptySubtitle}>{teamEventsError}</Text>
                    <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                </View>
            );
        }
        if (teamEvents.length === 0) {
            return (
                <View style={localStyles.centerContainer}>
                    <Text style={localStyles.emptyTitle}>No Team Events Available</Text>
                    <Text style={localStyles.emptySubtitle}>
                        There are no team events to display right now.
                    </Text>
                    <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                </View>
            );
        }
        return teamEvents.map(item => {
            const title = item?.eventName || 'Event';
            const points = Number.isFinite(item?.eventPoints) ? item.eventPoints : 0;
            const category = Array.isArray(item?.eventType)
                ? item.eventType.filter(Boolean).join(', ')
                : item?.eventType || 'N/A';
            const term = item?.eventCategory || 'N/A';
            const location = item?.eventLocation || 'TBD';
            const checkIn = item?.eventCheckInTime || 'TBD';
            return (
                <View style={styles.eventSpace} key={item?.eventId || title}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PlcDetailScreen', { event: item })}
                        style={styles.eventCard}>
                        <View style={styles.eventCardTop}>
                            <View style={styles.eventTitleRow}>
                                <Text style={styles.eventTitle}>{title}</Text>
                                <View style={styles.pointsBadge}>
                                    <View style={styles.dot} />
                                    <Text style={styles.pointsText}>{points} Points</Text>
                                </View>
                            </View>
                            <Text style={styles.eventMeta}>
                                {category}{'  '}|{'  '}{term}
                            </Text>
                            <Text style={styles.eventLocation}>Location: {location}</Text>
                        </View>
                        <View style={styles.eventCheckInRow}>
                            <Text style={styles.checkInLabel}>Event Check In:{'  '}</Text>
                            <Text style={styles.checkInValue}>{checkIn}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });
    };

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
                    <ScrollView
                        style={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            isMyTeamLoading || myTeamError ? localStyles.scrollEmpty : null
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={[colors.primary]}
                                tintColor={colors.primary}
                            />
                        }>
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
                                {renderMyTeamContent()}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    style={styles.exitButton}
                                    onPress={() => setShowExitModal(true)}>
                                    <Text style={styles.exitButtonText}>Exit From Team</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.changeButton}
                                    onPress={() => navigation.navigate('ChangeTeamScreen')}>
                                    <Text style={styles.changeButtonText}>Change My Team</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: height / 10 }} />
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView
                        style={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            isEventsLoading || teamEventsError || teamEvents.length === 0
                                ? localStyles.scrollEmpty
                                : null
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={[colors.primary]}
                                tintColor={colors.primary}
                            />
                        }>
                        <View style={styles.listCon}>
                            {renderEventsContent()}
                            <View style={{ height: height / 10 }} />
                        </View>
                    </ScrollView>
                )}
            </AppGradient>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showExitModal}
                onRequestClose={() => setShowExitModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleCon}>
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
                                onPress={() => setShowExitModal(false)}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalExitButton}
                                onPress={handleExitTeam}
                                disabled={exitStatus === 'loading'}>
                                <Text style={styles.modalExitText}>
                                    {exitStatus === 'loading' ? 'Exiting...' : 'Exit from Team'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    centerContainer: {
        alignItems: 'center',
        paddingHorizontal: width / 10,
        paddingVertical: height / 20,
    },
    scrollEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a5fa8',
        marginBottom: 12,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
});


// import React, { useEffect, useMemo, useState } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     Image,
//     Dimensions,
//     Modal,
//     ActivityIndicator,
//     Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
// import { apiClient } from '../../../api/client';
// import AppGradient from '../../../components/AppGradient';
// import AppHeader from '../../../components/AppHeader';
// import { env, endpoints } from '../../../env';
// import { selectAuth } from '../../../store';
// import { colors } from '../../../styles/globalStyles';
// import { styles } from '../ProgressTeamScreen/TeamDetailStyles';

// import Team from '../../../assets/Image/svg/Team.svg'

// const { height, width } = Dimensions.get('window');

// const getInitials = name => {
//     const parts = name.trim().split(' ');
//     if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
//     return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
// };

// export default function TeamScreen({ navigation }) {
//     const [activeTab, setActiveTab] = useState('myTeam');
//     const [showExitModal, setShowExitModal] = useState(false);
//     const [myTeam, setMyTeam] = useState(null);
//     const [myTeamStatus, setMyTeamStatus] = useState('idle');
//     const [myTeamError, setMyTeamError] = useState(null);
//     const [teamEvents, setTeamEvents] = useState([]);
//     const [teamEventsStatus, setTeamEventsStatus] = useState('idle');
//     const [teamEventsError, setTeamEventsError] = useState(null);
//     const [exitStatus, setExitStatus] = useState('idle');
//     const { accessToken, user } = useSelector(selectAuth);

//     useEffect(() => {
//         if (!accessToken || !user?.id) {
//             setMyTeam(null);
//             setMyTeamStatus('idle');
//             setMyTeamError(null);
//             return;
//         }

//         const loadMyTeam = async () => {
//             try {
//                 setMyTeamStatus('loading');
//                 setMyTeamError(null);

//                 const response = await apiClient.get(
//                     `${env.apiBaseUrl}${endpoints.plcMyTeam(user.id)}`,
//                     { token: accessToken },
//                 );

//                 setMyTeam(response?.data || null);
//                 setMyTeamStatus('succeeded');
//             } catch (error) {
//                 setMyTeam(null);
//                 setMyTeamStatus('failed');
//                 setMyTeamError(error?.message || 'Failed to load your team');
//             }
//         };

//         loadMyTeam();
//     }, [accessToken, user?.id]);

//     useEffect(() => {
//         if (!accessToken || !user?.id) {
//             setTeamEvents([]);
//             setTeamEventsStatus('idle');
//             setTeamEventsError(null);
//             return;
//         }

//         const loadTeamEvents = async () => {
//             try {
//                 setTeamEventsStatus('loading');
//                 setTeamEventsError(null);

//                 const response = await apiClient.get(
//                     `${env.apiBaseUrl}${endpoints.plcMyTeamEvents(user.id)}`,
//                     { token: accessToken },
//                 );

//                 const data = response?.data;
//                 setTeamEvents(Array.isArray(data) ? data : []);
//                 setTeamEventsStatus('succeeded');
//             } catch (error) {
//                 setTeamEvents([]);
//                 setTeamEventsStatus('failed');
//                 setTeamEventsError(error?.message || 'Failed to load team events');
//             }
//         };

//         loadTeamEvents();
//     }, [accessToken, user?.id]);

//     const teamName = myTeam?.teamName || 'No team assigned';

//     const membersData = useMemo(() => {
//         const list = myTeam?.members;
//         if (!Array.isArray(list)) {
//             return [];
//         }

//         return list.map(item => {
//             const fullName = [item?.firstName, item?.lastName]
//                 .filter(Boolean)
//                 .join(' ')
//                 .trim() || 'Member';

//             return {
//                 id: item?.userId || fullName,
//                 name: item?.isCurrentUser ? 'You' : fullName,
//                 email: item?.email || '',
//                 avatar: null,
//             };
//         });
//     }, [myTeam]);

//     useEffect(() => {
//         if (myTeamStatus !== 'succeeded') {
//             return;
//         }

//         if (membersData.length === 0) {
//             navigation.navigate('TeamLoginSignScreen');
//         }
//     }, [membersData.length, myTeamStatus, navigation]);

//     const renderMyTeamState = message => (
//         <View style={styles.stateContainer}>
//             {myTeamStatus === 'loading' && (
//                 <ActivityIndicator size="large" color={colors.primary} />
//             )}
//             <Text style={styles.stateText}>{message}</Text>
//         </View>
//     );

//     const renderTeamEventsState = message => (
//         <View style={styles.stateContainer}>
//             {teamEventsStatus === 'loading' && (
//                 <ActivityIndicator size="large" color={colors.primary} />
//             )}
//             <Text style={styles.stateText}>{message}</Text>
//         </View>
//     );

//     const handleExitTeam = async () => {
//         if (!accessToken || !user?.id || exitStatus === 'loading') {
//             return;
//         }

//         try {
//             setExitStatus('loading');

//             const response = await apiClient.post(
//                 `${env.apiBaseUrl}${endpoints.plcExitTeam(user.id)}`,
//                 {},
//                 { token: accessToken },
//             );

//             if (response?.success) {
//                 setShowExitModal(false);
//                 navigation.reset({
//                     index: 0,
//                     routes: [{ name: 'TeamLoginSignScreen' }],
//                 });
//                 return;
//             }

//             throw new Error('Failed to exit team');
//         } catch (error) {
//             Alert.alert('Exit Team Failed', error?.message || 'Unable to exit the team right now.');
//         } finally {
//             setExitStatus('idle');
//         }
//     };

//     return (
//         <SafeAreaView style={styles.safe}>
//             <AppGradient style={styles.fill}>
//                 <AppHeader />
//                 <View style={styles.tabBar}>
//                     <TouchableOpacity
//                         style={[styles.tab, activeTab === 'myTeam' && styles.activeTab]}
//                         onPress={() => setActiveTab('myTeam')}>
//                         <Text style={[styles.tabText, activeTab === 'myTeam' && styles.activeTabText]}>
//                             My Team
//                         </Text>
//                         {activeTab === 'myTeam' && <View style={styles.tabUnderline} />}
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.tab, activeTab === 'events' && styles.activeTab]}
//                         onPress={() => setActiveTab('events')}>
//                         <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
//                             Events
//                         </Text>
//                         {activeTab === 'events' && <View style={styles.tabUnderline} />}
//                     </TouchableOpacity>
//                 </View>


//                 {activeTab === 'myTeam' ? (
//                     <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//                         <View style={styles.listCon}>
//                             <View style={styles.teamContainer}>
//                                 <Text style={styles.teamHeaderText}>
//                                     You are currently on the team
//                                 </Text>
//                             </View>

//                             <View style={styles.teamSpace}>
//                                 <View style={styles.teamNameContainer}>
//                                     <Text style={styles.teamNameText}>{teamName}</Text>
//                                 </View>
//                             </View>

//                             <View style={styles.boxBoder}>
//                                 <View style={styles.teamMembersHeader}>
//                                     <Text style={styles.teamMembersStar}>★</Text>
//                                     <Text style={styles.teamMembersTitleText}>Team Members</Text>
//                                     <Text style={styles.teamMembersStar}>★</Text>
//                                 </View>
//                                 {myTeamStatus === 'loading' ? renderMyTeamState('Loading your team...') : myTeamError ? renderMyTeamState(myTeamError) : membersData.map(item => (
//                                     <View key={item.id} style={styles.spaceContainer}>
//                                         <TouchableOpacity style={styles.memberCard}>
//                                             <View style={styles.avatarSpace}>
//                                                 <View style={styles.avatarCon}>
//                                                     {item.avatar ? (
//                                                         <Image
//                                                             source={{ uri: item.avatar }}
//                                                             style={styles.avatarImage}
//                                                         />
//                                                     ) : (
//                                                         <Text style={styles.avatarInitials}>
//                                                             {getInitials(item.name)}
//                                                         </Text>
//                                                     )}
//                                                 </View>
//                                             </View>
//                                             <View style={styles.memberInfo}>
//                                                 <View style={styles.memberNameCon}>
//                                                     <Text style={styles.memberName}>{item.name}</Text>
//                                                 </View>
//                                                 <View style={styles.memberEmailCon}>
//                                                     <Text style={styles.memberEmail}>{item.email}</Text>
//                                                 </View>
//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>
//                                 ))}
//                             </View>

//                             <View style={styles.buttonsContainer}>
//                                 <TouchableOpacity
//                                     style={styles.exitButton}
//                                     onPress={() => {
//                                         console.log('Exit From Team pressed');
//                                         setShowExitModal(true)
//                                     }}>
//                                     <Text style={styles.exitButtonText}>Exit From Team</Text>
//                                 </TouchableOpacity>

//                                 <TouchableOpacity
//                                     style={styles.changeButton}
//                                     onPress={() => {
//                                         console.log('Change My Team pressed');
//                                         navigation.navigate('ChangeTeamScreen')
//                                     }}>
//                                     <Text style={styles.changeButtonText}>Change My Team</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={{ height: height / 10 }} />
//                         </View>
//                     </ScrollView>
//                 ) : (
//                     <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//                         <View style={styles.listCon}>
//                             {teamEventsStatus === 'loading' ? renderTeamEventsState('Loading team events...') : teamEventsError ? renderTeamEventsState(teamEventsError) : teamEvents.length === 0 ? renderTeamEventsState('No team events found') : teamEvents.map(item => {
//                                 const title = item?.eventName || 'Event';
//                                 const points = Number.isFinite(item?.eventPoints) ? item.eventPoints : 0;
//                                 const category = Array.isArray(item?.eventType)
//                                     ? item.eventType.filter(Boolean).join(', ')
//                                     : item?.eventType || 'N/A';
//                                 const term = item?.eventCategory || 'N/A';
//                                 const location = item?.eventLocation || 'TBD';
//                                 const checkIn = item?.eventCheckInTime || 'TBD';

//                                 return (
//                                     <View style={styles.eventSpace} key={item?.eventId || title}>
//                                         <TouchableOpacity
//                                             onPress={() => navigation.navigate('PlcDetailScreen', { event: item })}
//                                             style={styles.eventCard}>
//                                             <View style={styles.eventCardTop}>
//                                                 <View style={styles.eventTitleRow}>
//                                                     <Text style={styles.eventTitle}>{title}</Text>
//                                                     <View style={styles.pointsBadge}>
//                                                         <View style={styles.dot} />
//                                                         <Text style={styles.pointsText}>{points} Points</Text>
//                                                     </View>
//                                                 </View>
//                                                 <Text style={styles.eventMeta}>
//                                                     {category}{'  '}|{'  '}{term}
//                                                 </Text>
//                                                 <Text style={styles.eventLocation}>
//                                                     Location: {location}
//                                                 </Text>
//                                             </View>

//                                             <View style={styles.eventCheckInRow}>
//                                                 <Text style={styles.checkInLabel}>Event Check In:{'  '}</Text>
//                                                 <Text style={styles.checkInValue}>{checkIn}</Text>
//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>
//                                 );
//                             })}
//                             <View style={{ height: height / 10 }} />
//                         </View>
//                     </ScrollView>
//                 )}
//             </AppGradient>
//             <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={showExitModal}
//                 onRequestClose={() => setShowExitModal(false)}
//             >
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.titleCon} >
//                             <Text style={styles.modalTitle}>Exit From Current Team</Text>
//                         </View>
//                         <View style={styles.modalDivider} />
//                         <View style={styles.modalIconContainer}>
//                             <Team />
//                         </View>
//                         <View style={styles.quesContainer}>
//                             <Text style={styles.modalQuestion}>
//                                 Are you sure you want to leave this team?
//                             </Text>
//                         </View>
//                         <View style={styles.descContainer}>
//                             <Text style={styles.modalDescription}>
//                                 If you exit yourself from the current team, you will no longer be associated with it.
//                             </Text>
//                         </View>
//                         <View style={styles.modalDivider} />
//                         <View style={styles.modalButtonsContainer}>
//                             <TouchableOpacity
//                                 style={styles.modalCancelButton}
//                                 onPress={() => setShowExitModal(false)}
//                             >
//                                 <Text style={styles.modalCancelText}>Cancel</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={styles.modalExitButton}
//                                 onPress={handleExitTeam}
//                                 disabled={exitStatus === 'loading'}>
//                                 <Text style={styles.modalExitText}>
//                                     {exitStatus === 'loading' ? 'Exiting...' : 'Exit from Team'}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// }
