import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
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
    const { accessToken, user } = useSelector(selectAuth);

    useEffect(() => {
        if (activeTab !== 'individual' || !accessToken || !user?.id) {
            return;
        }

        const loadIndividualProgress = async () => {
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

        loadIndividualProgress();
    }, [accessToken, activeTab, user?.id]);

    useEffect(() => {
        if (activeTab !== 'team' || !accessToken) {
            return;
        }

        const loadTeamProgress = async () => {
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

        loadTeamProgress();
    }, [accessToken, activeTab]);

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
                    <Text style={tableStyles.headerText}>Category</Text>
                </View>
                <View style={[tableStyles.cell, tableStyles.headerCell]}>
                    <Text style={tableStyles.headerText}>PLC{'\n'}Credits</Text>
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
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        {individualStatus === 'loading' ? (
                            <View style={styles.teamStateContainer}>
                                <ActivityIndicator size="large" color={colors.primary} />
                                <Text style={styles.teamStateText}>Loading individual progress...</Text>
                            </View>
                        ) : individualError ? (
                            <View style={styles.teamStateContainer}>
                                <Text style={styles.teamStateText}>{individualError}</Text>
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
                                    <View style={styles.teamStateContainer}>
                                        <Text style={styles.teamStateText}>No PLC credit details found</Text>
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
                                                                {item?.eventCategory || 'N/A'}
                                                            </Text>
                                                            <Text style={styles.locationText}>Location: {item?.eventLocation || 'TBD'}</Text>
                                                        </View>
                                                        <Icon name="chevron-with-circle-right" size={18} color="#999" />
                                                    </View>

                                                    <View style={styles.checkInRow}>
                                                        <View style={styles.checkInCon}>
                                                            <Text style={styles.checkInLabel}>Event Check In: </Text>
                                                            <Text style={styles.checkInValue}>{item?.eventCheckInTime || 'TBD'}</Text>
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
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        {teamStatus === 'loading' ? (
                            <View style={styles.teamStateContainer}>
                                <ActivityIndicator size="large" color={colors.primary} />
                                <Text style={styles.teamStateText}>Loading team progress...</Text>
                            </View>
                        ) : teamError ? (
                            <View style={styles.teamStateContainer}>
                                <Text style={styles.teamStateText}>{teamError}</Text>
                            </View>
                        ) : teamProgress.length === 0 ? (
                            <View style={styles.teamStateContainer}>
                                <Text style={styles.teamStateText}>No team progress found</Text>
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
