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

const summaryData = [
    { category: 'Career Enhancement', plc: 7, required: 9, adjunct: 2 },
    { category: 'Personal Enrichment', plc: 8, required: 3, adjunct: 'Optional' },
    { category: 'Technology Training', plc: 1, required: 4, adjunct: 2 },
];

const totals = { plc: 16, required: 16, adjunct: 4 };

const creditDetails = [
    {
        id: 1,
        title: 'Graduation Ceremony',
        credit: '1 PLC Credit',
        category: 'Career Enhancement',
        term: 'PLC 2026',
        location: 'Conference Room A',
        checkIn: '2025-09-10 | 10:00 AM',
    },
    {
        id: 2,
        title: 'Annual Awards Gala',
        credit: '1 PLC Credit',
        category: 'Career Enhancement',
        term: 'PLC 2026',
        location: 'Virtual Meeting',
        checkIn: '2025-09-12 | 02:00 PM',
    },
    {
        id: 3,
        title: 'Leadership Workshop',
        credit: '2 PLC Credits',
        category: 'Personal Enrichment',
        term: 'PLC 2026',
        location: 'Main Auditorium',
        checkIn: '2025-10-01 | 09:00 AM',
    },
];

export default function ProgressScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('individual');
    const [teamProgress, setTeamProgress] = useState([]);
    const [teamStatus, setTeamStatus] = useState('idle');
    const [teamError, setTeamError] = useState(null);
    const { accessToken } = useSelector(selectAuth);

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

            {summaryData.map((row, index) => (
                <View key={index} style={tableStyles.row}>
                    <View style={[tableStyles.cell, tableStyles.categoryCell]}>
                        <Text style={tableStyles.categoryText}>{row.category}</Text>
                    </View>
                    <View style={tableStyles.cell}>
                        <Text style={tableStyles.valueText}>{row.plc}</Text>
                    </View>
                    <View style={tableStyles.cell}>
                        <Text style={tableStyles.valueText}>{row.required}</Text>
                    </View>
                    <View style={[tableStyles.cell, tableStyles.lastCell]}>
                        <Text style={tableStyles.valueText}>{row.adjunct}</Text>
                    </View>
                </View>
            ))}

            <View style={[tableStyles.row, tableStyles.totalRowBg, tableStyles.lastRow]}>
                <View style={[tableStyles.cell, tableStyles.categoryCell]}>
                    <Text style={tableStyles.totalCategoryText}>Total PLC Credits</Text>
                </View>
                <View style={tableStyles.cell}>
                    <Text style={tableStyles.totalValueText}>{totals.plc}</Text>
                </View>
                <View style={tableStyles.cell}>
                    <Text style={tableStyles.totalValueText}>{totals.required}</Text>
                </View>
                <View style={[tableStyles.cell, tableStyles.lastCell]}>
                    <Text style={tableStyles.totalValueText}>{totals.adjunct}</Text>
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

                        <View style={styles.sectionCon}>
                            <Text style={styles.sectionTitle}>PLC Credit Summary</Text>
                        </View>
                        {renderTable()}
                        <View style={styles.divider} />

                        <View style={styles.sectionCon}>
                            <Text style={styles.sectionTitle}>PLC Credit Details</Text>
                        </View>
                        {creditDetails.map(item => (
                            <View key={item.id} style={styles.spaceCon}>
                                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PlcDetailScreen')}>

                                    <View style={styles.titleCon}>
                                        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                                        <View style={styles.creditBadge}>
                                            <View style={styles.dot} />
                                            <Text style={styles.creditText}>{item.credit}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardMeta}>
                                        <View style={styles.cardTop}>
                                            <Text style={styles.metaText}>
                                                {item.category}{'  '}|{'  '}{item.term}
                                            </Text>
                                            <Text style={styles.locationText}>Location: {item.location}</Text>
                                        </View>
                                        <Icon name="chevron-with-circle-right" size={18} color="#999" />
                                    </View>

                                    <View style={styles.checkInRow}>
                                        <View style={styles.checkInCon}>
                                            <Text style={styles.checkInLabel}>Event Check In: </Text>
                                            <Text style={styles.checkInValue}>{item.checkIn}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={{ height: height / 10 }} />
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
