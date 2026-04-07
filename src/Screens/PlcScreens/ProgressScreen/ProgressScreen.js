import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import AppHeader from '../../../components/AppHeader';
import AppGradient from '../../../components/AppGradient';
import { apiClient } from '../../../api/client';
import { env, endpoints } from '../../../env';
import { selectAuth } from '../../../store';
import { colors, typography } from '../../../styles/globalStyles';
import { styles, tableStyles } from './ProgressStyles';

const { width, height } = Dimensions.get('window');

export default function ProgressScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('individual');
    const [individualProgress, setIndividualProgress] = useState(null);
    const [individualStatus, setIndividualStatus] = useState('idle');
    const [individualError, setIndividualError] = useState(null);
    const [teamProgress, setTeamProgress] = useState([]);
    const [teamStatus, setTeamStatus] = useState('idle');
    const [teamError, setTeamError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const { accessToken, user } = useSelector(selectAuth);

    const loadIndividualProgress = async () => {
        if (!accessToken || !user?.id) return;
        try {
            setIndividualStatus('loading');
            setIndividualError(null);
            const response = await apiClient.get(
                `${env.apiBaseUrl}${endpoints.plcIndividualProgress(user.id)}`,
                { token: accessToken },
            );
            setIndividualProgress(response?.data || {});
            setIndividualStatus('succeeded');
        } catch (error) {
            setIndividualProgress(null);
            setIndividualStatus('failed');
            setIndividualError(error?.message || 'Failed to load individual progress');
        }
    };

    const loadTeamProgress = async () => {
        if (!accessToken) return;
        try {
            setTeamStatus('loading');
            setTeamError(null);
            const response = await apiClient.get(
                `${env.apiBaseUrl}${endpoints.plcTeamProgress}`,
                { token: accessToken },
            );
            const data = response?.data;
            setTeamProgress(Array.isArray(data) ? data : []);
            setTeamStatus('succeeded');
        } catch (error) {
            setTeamStatus('failed');
            setTeamError(error?.message || 'Failed to load team progress');
        }
    };

    useEffect(() => {
        if (activeTab !== 'individual' || !accessToken || !user?.id) return;
        loadIndividualProgress();
    }, [accessToken, activeTab, user?.id]);

    useEffect(() => {
        if (activeTab !== 'team' || !accessToken) return;
        loadTeamProgress();
    }, [accessToken, activeTab]);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            if (activeTab === 'individual') {
                await loadIndividualProgress();
            } else {
                await loadTeamProgress();
            }
        } catch (e) {
            console.warn('[Refresh] Failed:', e?.message);
        } finally {
            setRefreshing(false);
        }
    };

    const splitDateTime = value => {
        if (typeof value !== 'string' || !value.trim()) return 'TBD';
        const normalized = value.trim();
        const datePart = normalized.slice(0, 10) || 'TBD';
        const timePart = normalized.slice(11) || 'TBD';
        return `${datePart} | ${timePart}`;
    };

    const plcCreditSummary = Array.isArray(individualProgress?.plcCreditSummary)
        ? individualProgress.plcCreditSummary
        : [];
    const eventDetails = Array.isArray(individualProgress?.eventDetails)
        ? individualProgress.eventDetails
        : [];
    const totalPlcCredits = plcCreditSummary.reduce(
        (sum, item) => sum + (Number(item?.plcCredits) || 0),
        0,
    );

    const renderTable = () => (
        <View style={tableStyles.wrapper}>
            <View style={tableStyles.row}>
                <View style={[tableStyles.cell, tableStyles.categoryCell, tableStyles.headerCell]}>
                    <Text style={tableStyles.headerText}>Type</Text>
                </View>
                <View style={[tableStyles.cell, tableStyles.headerCell]}>
                    <Text style={tableStyles.headerText} numberOfLines={2}>PLC{'\n'}Credits</Text>
                </View>
                <View style={[tableStyles.cell, tableStyles.headerCell]}>
                    <Text style={tableStyles.headerText}>Required{'\n'}Credits</Text>
                </View>
                <View style={[tableStyles.cell, tableStyles.headerCell, tableStyles.lastCell]}>
                    <Text style={tableStyles.headerText}>Adjunct{'\n'}Credits</Text>
                </View>
            </View>

            {plcCreditSummary.map((row, index) => (
                <View key={index} style={tableStyles.row}>
                    <View style={[tableStyles.cell, tableStyles.categoryCell]}>
                        <Text style={tableStyles.categoryText}>{row?.eventTypeName || 'N/A'}</Text>
                    </View>
                    <View style={tableStyles.cell}>
                        <Text style={tableStyles.valueText}>{Number(row?.plcCredits) || 0}</Text>
                    </View>
                    <View style={tableStyles.cell}>
                        <Text style={tableStyles.valueText}>-</Text>
                    </View>
                    <View style={[tableStyles.cell, tableStyles.lastCell]}>
                        <Text style={tableStyles.valueText}>-</Text>
                    </View>
                </View>
            ))}

            <View style={[tableStyles.row, tableStyles.totalRowBg, tableStyles.lastRow]}>
                <View style={[tableStyles.cell, tableStyles.categoryCell]}>
                    <Text style={tableStyles.totalCategoryText}>Total PLC Credits</Text>
                </View>
                <View style={tableStyles.cell}>
                    <Text style={tableStyles.totalValueText}>{totalPlcCredits}</Text>
                </View>
                <View style={tableStyles.cell}>
                    <Text style={tableStyles.totalValueText}>-</Text>
                </View>
                <View style={[tableStyles.cell, tableStyles.lastCell]}>
                    <Text style={tableStyles.totalValueText}>-</Text>
                </View>
            </View>
        </View>
    );

    return (
        <AppGradient style={styles.safe}>
            <SafeAreaView style={styles.safe}>
                <AppHeader />

                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'individual' && styles.activeTab]}
                        onPress={() => setActiveTab('individual')}>
                        <Text style={[styles.tabText, activeTab === 'individual' && styles.activeTabText]}>
                            Individual Progress
                        </Text>
                        {activeTab === 'individual' && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'team' && styles.activeTab]}
                        onPress={() => setActiveTab('team')}>
                        <Text style={[styles.tabText, activeTab === 'team' && styles.activeTabText]}>
                            Team Progress
                        </Text>
                        {activeTab === 'team' && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                </View>

                {activeTab === 'individual' ? (
                    <ScrollView
                        style={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            individualStatus === 'loading' || individualStatus === 'idle' || eventDetails.length === 0
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
                        {individualStatus === 'loading' || individualStatus === 'idle' ? (
                            <View style={localStyles.centerContainer}>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        ) : individualError ? (
                            <View style={localStyles.centerContainer}>
                                <Text style={localStyles.emptyTitle}>Something Went Wrong</Text>
                                <Text style={localStyles.emptySubtitle}>{individualError}</Text>
                                <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                            </View>
                        ) : (
                            <>
                                <View style={styles.sectionCon}>
                                    <Text style={styles.sectionTitle}>PLC Credit Summary</Text>
                                </View>

                                {renderTable()}

                                <View style={styles.divider} />

                                <View style={styles.sectionCon}>
                                    <Text style={styles.sectionTitle}>PLC Credit Details</Text>
                                </View>

                                {eventDetails.length === 0 ? (
                                    <View style={localStyles.centerContainer}>
                                        <Text style={localStyles.emptyTitle}>No PLC Credits Available</Text>
                                        <Text style={localStyles.emptySubtitle}>
                                            There are no PLC credit details right now.
                                        </Text>
                                        <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                                    </View>
                                ) : (
                                    eventDetails.map(item => {
                                        const creditValue = Number(item?.eventPlcCredits) || 0;
                                        return (
                                            <View key={item?.eventId || item?.eventName} style={styles.spaceCon}>
                                                <TouchableOpacity
                                                    style={styles.card}
                                                    onPress={() => navigation.navigate('PlcDetailScreen', { event: item })}>
                                                    <View style={styles.titleCon}>
                                                        <Text style={styles.cardTitle} numberOfLines={2}>{item?.eventName || 'Event'}</Text>
                                                        <View style={styles.creditBadge}>
                                                            <View style={styles.dot} />
                                                            <Text style={styles.creditText}>
                                                                {creditValue} PLC Credit{creditValue === 1 ? '' : 's'}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.cardMeta}>
                                                        <View style={styles.cardTop}>
                                                            <Text style={styles.metaText}>
                                                                {item?.eventType} | {item?.eventCategory}
                                                            </Text>
                                                            <Text style={styles.locationText}>Location: {item?.eventLocation || 'TBD'}</Text>
                                                        </View>
                                                        <Icon name="chevron-with-circle-right" size={18} color="#999" />
                                                    </View>
                                                    <View style={styles.checkInRow}>
                                                        <View style={styles.checkInCon}>
                                                            <Text style={styles.checkInLabel}>Event Check In: </Text>
                                                            <Text style={styles.checkInValue}>{splitDateTime(item?.eventCheckInTime) || 'TBD'}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })
                                )}
                                <View style={{ height: height / 10 }} />
                            </>
                        )}
                    </ScrollView>
                ) : (
                    <ScrollView
                        style={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            teamStatus === 'loading' || teamStatus === 'idle' || teamProgress.length === 0
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
                        {teamStatus === 'loading' || teamStatus === 'idle' ? (
                            <View style={localStyles.centerContainer}>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        ) : teamError ? (
                            <View style={localStyles.centerContainer}>
                                <Text style={localStyles.emptyTitle}>Something Went Wrong</Text>
                                <Text style={localStyles.emptySubtitle}>{teamError}</Text>
                                <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                            </View>
                        ) : teamProgress.length === 0 ? (
                            <View style={localStyles.centerContainer}>
                                <Text style={localStyles.emptyTitle}>No Team Progress Available</Text>
                                <Text style={localStyles.emptySubtitle}>
                                    There is no team progress to display right now.
                                </Text>
                                <Text style={localStyles.emptySubtitle}>Check back soon for updates!</Text>
                            </View>
                        ) : (
                            teamProgress.map(team => {
                                const teamMembers = Number(team?.teamMembersCount) || 0;
                                const totalPoints = Number(team?.totalPoints) || 0;
                                return (
                                    <View key={team?.teamId || team?.teamName} style={styles.spaceBox}>
                                        <TouchableOpacity
                                            style={styles.teamCard}
                                            onPress={() => navigation.navigate('TeamDetailScreen', {
                                                id: team?.teamId,
                                                name: team?.teamName,
                                            })}>
                                            <View style={styles.teamCardLeft}>
                                                <View style={styles.nameCon}>
                                                    <Text style={styles.teamName}>{team?.teamName || 'Team'}</Text>
                                                </View>
                                                <View style={styles.teamCon}>
                                                    <Text style={styles.teamMembers}>
                                                        {teamMembers} Team member{teamMembers === 1 ? '' : 's'}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.teamCardRight}>
                                                <View style={styles.pointsBadge}>
                                                    <View style={styles.dot} />
                                                    <Text style={styles.pointsText}>{totalPoints} Points</Text>
                                                </View>
                                                <View style={styles.arrowCon}>
                                                    <Icon name="chevron-with-circle-right" size={18} color={colors.textDark} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        )}
                        <View style={{ height: height / 10 }} />
                    </ScrollView>
                )}
            </SafeAreaView>
        </AppGradient>
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


// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     ActivityIndicator,
//     Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Entypo';
// import { useSelector } from 'react-redux';
// import AppHeader from '../../../components/AppHeader';
// import AppGradient from '../../../components/AppGradient';
// import { apiClient } from '../../../api/client';
// import { env, endpoints } from '../../../env';
// import { selectAuth } from '../../../store';
// import { colors, typography } from '../../../styles/globalStyles';
// import { styles, tableStyles } from './ProgressStyles';


// const { width, height } = Dimensions.get('window');

// export default function ProgressScreen({ navigation }) {
//     const [activeTab, setActiveTab] = useState('individual');
//     const [individualProgress, setIndividualProgress] = useState(null);
//     const [individualStatus, setIndividualStatus] = useState('idle');
//     const [individualError, setIndividualError] = useState(null);
//     const [teamProgress, setTeamProgress] = useState([]);
//     const [teamStatus, setTeamStatus] = useState('idle');
//     const [teamError, setTeamError] = useState(null);
//     const { accessToken, user } = useSelector(selectAuth);

//     useEffect(() => {
//         if (activeTab !== 'individual' || !accessToken || !user?.id) {
//             return;
//         }

//         const loadIndividualProgress = async () => {
//             try {
//                 setIndividualStatus('loading');
//                 setIndividualError(null);

//                 const response = await apiClient.get(
//                     `${env.apiBaseUrl}${endpoints.plcIndividualProgress(user.id)}`,
//                     { token: accessToken },
//                 );

//                 setIndividualProgress(response?.data || {});
//                 setIndividualStatus('succeeded');
//             } catch (error) {
//                 setIndividualProgress(null);
//                 setIndividualStatus('failed');
//                 setIndividualError(error?.message || 'Failed to load individual progress');
//             }
//         };

//         loadIndividualProgress();
//     }, [accessToken, activeTab, user?.id]);

//     useEffect(() => {
//         if (activeTab !== 'team' || !accessToken) {
//             return;
//         }

//         const loadTeamProgress = async () => {
//             try {
//                 setTeamStatus('loading');
//                 setTeamError(null);

//                 const response = await apiClient.get(
//                     `${env.apiBaseUrl}${endpoints.plcTeamProgress}`,
//                     { token: accessToken },
//                 );

//                 const data = response?.data;
//                 setTeamProgress(Array.isArray(data) ? data : []);
//                 setTeamStatus('succeeded');
//             } catch (error) {
//                 setTeamStatus('failed');
//                 setTeamError(error?.message || 'Failed to load team progress');
//             }
//         };

//         loadTeamProgress();
//     }, [accessToken, activeTab]);

//     const splitDateTime = value => {
//         if (typeof value !== 'string' || !value.trim()) {
//             return 'TBD';
//         }

//         const normalized = value.trim();
//         const datePart = normalized.slice(0, 10) || 'TBD';
//         const timePart = normalized.slice(11) || 'TBD';
//         return `${datePart} | ${timePart}`;
//     };

//     console.log("data: ", individualProgress)

//     const plcCreditSummary = Array.isArray(individualProgress?.plcCreditSummary)
//         ? individualProgress.plcCreditSummary
//         : [];
//     const eventDetails = Array.isArray(individualProgress?.eventDetails)
//         ? individualProgress.eventDetails
//         : [];
//     const totalPlcCredits = plcCreditSummary.reduce(
//         (sum, item) => sum + (Number(item?.plcCredits) || 0),
//         0,
//     );

//     const renderTable = () => (
//         <View style={tableStyles.wrapper}>
//             <View style={tableStyles.row}>
//                 <View style={[tableStyles.cell, tableStyles.categoryCell, tableStyles.headerCell]}>
//                     <Text style={tableStyles.headerText}>Type</Text>
//                 </View>
//                 <View style={[tableStyles.cell, tableStyles.headerCell]}>
//                     <Text style={tableStyles.headerText} numberOfLines={2}>PLC{'\n'}Credits</Text>
//                 </View>
//                 <View style={[tableStyles.cell, tableStyles.headerCell]}>
//                     <Text style={tableStyles.headerText}>Required{'\n'}Credits</Text>
//                 </View>
//                 <View style={[tableStyles.cell, tableStyles.headerCell, tableStyles.lastCell]}>
//                     <Text style={tableStyles.headerText}>Adjunct{'\n'}Credits</Text>
//                 </View>
//             </View>

//             {plcCreditSummary.map((row, index) => (
//                 <View key={index} style={tableStyles.row}>
//                     <View style={[tableStyles.cell, tableStyles.categoryCell]}>
//                         <Text style={tableStyles.categoryText}>{row?.eventTypeName || 'N/A'}</Text>
//                     </View>
//                     <View style={tableStyles.cell}>
//                         <Text style={tableStyles.valueText}>{Number(row?.plcCredits) || 0}</Text>
//                     </View>
//                     <View style={tableStyles.cell}>
//                         <Text style={tableStyles.valueText}>-</Text>
//                     </View>
//                     <View style={[tableStyles.cell, tableStyles.lastCell]}>
//                         <Text style={tableStyles.valueText}>-</Text>
//                     </View>
//                 </View>
//             ))}

//             <View style={[tableStyles.row, tableStyles.totalRowBg, tableStyles.lastRow]}>
//                 <View style={[tableStyles.cell, tableStyles.categoryCell]}>
//                     <Text style={tableStyles.totalCategoryText}>Total PLC Credits</Text>
//                 </View>
//                 <View style={tableStyles.cell}>
//                     <Text style={tableStyles.totalValueText}>{totalPlcCredits}</Text>
//                 </View>
//                 <View style={tableStyles.cell}>
//                     <Text style={tableStyles.totalValueText}>-</Text>
//                 </View>
//                 <View style={[tableStyles.cell, tableStyles.lastCell]}>
//                     <Text style={tableStyles.totalValueText}>-</Text>
//                 </View>
//             </View>

//         </View>
//     );

//     return (
//         <AppGradient style={styles.safe}>
//             <SafeAreaView style={styles.safe}>
//                 <AppHeader />

//                 <View style={styles.tabBar}>
//                     <TouchableOpacity
//                         style={[styles.tab, activeTab === 'individual' && styles.activeTab]}
//                         onPress={() => setActiveTab('individual')}>
//                         <Text style={[styles.tabText, activeTab === 'individual' && styles.activeTabText]}>
//                             Individual Progress
//                         </Text>
//                         {activeTab === 'individual' && <View style={styles.tabUnderline} />}
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[styles.tab, activeTab === 'team' && styles.activeTab]}
//                         onPress={() => setActiveTab('team')}>
//                         <Text style={[styles.tabText, activeTab === 'team' && styles.activeTabText]}>
//                             Team Progress
//                         </Text>
//                         {activeTab === 'team' && <View style={styles.tabUnderline} />}
//                     </TouchableOpacity>
//                 </View>

//                 {activeTab === 'individual' ? (
//                     <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//                         {individualStatus === 'loading' ? (
//                             <View style={styles.teamStateContainer}>
//                                 <ActivityIndicator size="large" color={colors.primary} />
//                                 <Text style={styles.teamStateText}>Loading individual progress...</Text>
//                             </View>
//                         ) : individualError ? (
//                             <View style={styles.teamStateContainer}>
//                                 <Text style={styles.teamStateText}>{individualError}</Text>
//                             </View>
//                         ) : (
//                             <>
//                                 <View style={styles.sectionCon}>
//                                     <Text style={styles.sectionTitle}>PLC Credit Summary</Text>
//                                 </View>

//                                 {renderTable()}

//                                 <View style={styles.divider} />

//                                 <View style={styles.sectionCon}>
//                                     <Text style={styles.sectionTitle}>PLC Credit Details</Text>
//                                 </View>
//                                 {eventDetails.length === 0 ? (
//                                     <View style={styles.teamStateContainer}>
//                                         <Text style={styles.teamStateText}>No PLC credit details found</Text>
//                                     </View>
//                                 ) : (
//                                     eventDetails.map(item => {
//                                         const creditValue = Number(item?.eventPlcCredits) || 0;
//                                         return (
//                                             <View key={item?.eventId || item?.eventName} style={styles.spaceCon}>
//                                                 <TouchableOpacity
//                                                     style={styles.card}
//                                                     onPress={() => navigation.navigate('PlcDetailScreen', { event: item })}>

//                                                     <View style={styles.titleCon}>
//                                                         <Text style={styles.cardTitle} numberOfLines={2}>{item?.eventName || 'Event'}</Text>
//                                                         <View style={styles.creditBadge}>
//                                                             <View style={styles.dot} />
//                                                             <Text style={styles.creditText}>
//                                                                 {creditValue} PLC Credit{creditValue === 1 ? '' : 's'}
//                                                             </Text>
//                                                         </View>
//                                                     </View>

//                                                     <View style={styles.cardMeta}>
//                                                         <View style={styles.cardTop}>
//                                                             <Text style={styles.metaText}>

//                                                                 {item?.eventType} | {item?.eventCategory}
//                                                             </Text>
//                                                             <Text style={styles.locationText}>Location: {item?.eventLocation || 'TBD'}</Text>
//                                                         </View>
//                                                         <Icon name="chevron-with-circle-right" size={18} color="#999" />
//                                                     </View>

//                                                     <View style={styles.checkInRow}>
//                                                         <View style={styles.checkInCon}>
//                                                             <Text style={styles.checkInLabel}>Event Check In: </Text>
//                                                             <Text style={styles.checkInValue}>{splitDateTime(item?.eventCheckInTime) || 'TBD'}</Text>
//                                                         </View>
//                                                     </View>

//                                                 </TouchableOpacity>
//                                             </View>
//                                         );
//                                     })
//                                 )}

//                                 <View style={{ height: height / 10 }} />
//                             </>
//                         )}
//                     </ScrollView>
//                 ) : (
//                     <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//                         {teamStatus === 'loading' ? (
//                             <View style={styles.teamStateContainer}>
//                                 <ActivityIndicator size="large" color={colors.primary} />
//                                 <Text style={styles.teamStateText}>Loading team progress...</Text>
//                             </View>
//                         ) : teamError ? (
//                             <View style={styles.teamStateContainer}>
//                                 <Text style={styles.teamStateText}>{teamError}</Text>
//                             </View>
//                         ) : teamProgress.length === 0 ? (
//                             <View style={styles.teamStateContainer}>
//                                 <Text style={styles.teamStateText}>No team progress found</Text>
//                             </View>
//                         ) : (
//                             teamProgress.map(team => {
//                                 const teamMembers = Number(team?.teamMembersCount) || 0;
//                                 const totalPoints = Number(team?.totalPoints) || 0;

//                                 return (
//                                     <View key={team?.teamId || team?.teamName} style={styles.spaceBox}>
//                                         <TouchableOpacity
//                                             style={styles.teamCard}
//                                             onPress={() => navigation.navigate('TeamDetailScreen', {
//                                                 id: team?.teamId,
//                                                 name: team?.teamName,
//                                             })}>
//                                             <View style={styles.teamCardLeft}>
//                                                 <View style={styles.nameCon}>
//                                                     <Text style={styles.teamName}>{team?.teamName || 'Team'}</Text>
//                                                 </View>
//                                                 <View style={styles.teamCon}>
//                                                     <Text style={styles.teamMembers}>
//                                                         {teamMembers} Team member{teamMembers === 1 ? '' : 's'}
//                                                     </Text>
//                                                 </View>
//                                             </View>
//                                             <View style={styles.teamCardRight}>
//                                                 <View style={styles.pointsBadge}>
//                                                     <View style={styles.dot} />
//                                                     <Text style={styles.pointsText}>{totalPoints} Points</Text>
//                                                 </View>
//                                                 <View style={styles.arrowCon}>
//                                                     <Icon name="chevron-with-circle-right" size={18} color={colors.textDark} />
//                                                 </View>
//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>
//                                 );
//                             })
//                         )}
//                         <View style={{ height: height / 10 }} />
//                     </ScrollView>
//                 )}
//             </SafeAreaView>
//         </AppGradient>
//     );
// }
