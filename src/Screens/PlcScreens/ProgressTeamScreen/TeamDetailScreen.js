import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { apiClient } from '../../../api/client';
import { env, endpoints } from '../../../env';
import { selectAuth } from '../../../store';
import { colors } from '../../../styles/globalStyles';
import { styles } from './TeamDetailStyles';

const { height } = Dimensions.get('window');

const getInitials = name => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function TeamDetailScreen({ navigation, route }) {
    const [activeTab, setActiveTab] = useState('events');
    const [teamDetails, setTeamDetails] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const { accessToken } = useSelector(selectAuth);
    const teamId = route?.params?.id || '';
    const teamName = route?.params?.name || 'Crimson Hawks';

    useEffect(() => {
        if (!accessToken || !teamId) {
            return;
        }

        const loadTeamDetails = async () => {
            try {
                setStatus('loading');
                setError(null);

                const response = await apiClient.get(
                    `${env.apiBaseUrl}${endpoints.plcTeamProgressDetails(teamId)}`,
                    { token: accessToken },
                );

                setTeamDetails(response?.data || {});
                setStatus('succeeded');
            } catch (requestError) {
                setStatus('failed');
                setError(requestError?.message || 'Failed to load team details');
            }
        };

        loadTeamDetails();
    }, [accessToken, teamId]);

    const eventsData = useMemo(() => {
        const list = teamDetails?.eventResponse;
        if (!Array.isArray(list)) {
            return [];
        }

        return list.map(item => ({
            id: item?.eventId,
            title: item?.eventName || 'Event',
            points: Number.isFinite(item?.eventPoints) ? item.eventPoints : 0,
            category: Array.isArray(item?.eventType)
                ? item.eventType.filter(Boolean).join(', ')
                : item?.eventType || 'N/A',
            term: item?.eventCategory || 'N/A',
            location: item?.eventLocation || 'TBD',
            checkIn: item?.eventCheckInTime || 'TBD',
            raw: item,
        }));
    }, [teamDetails]);

    const membersData = useMemo(() => {
        const list = teamDetails?.teamMembersResponse;
        if (!Array.isArray(list)) {
            return [];
        }

        return list.map(item => {
            const fullName = [item?.firstName, item?.lastName].filter(Boolean).join(' ').trim() || 'Member';
            return {
                id: item?.userId,
                name: item?.isCurrentUser ? 'You' : fullName,
                email: item?.email || '',
                avatar: null,
            };
        });
    }, [teamDetails]);

    const renderState = message => (
        <View style={styles.stateContainer}>
            {status === 'loading' && <ActivityIndicator size="large" color={colors.primary} />}
            <Text style={styles.stateText}>{message}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safe} >
            <BackHeader title={teamName} onBack={() => navigation.goBack()} />

            <AppGradient style={styles.fill}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'events' && styles.activeTab]}
                        onPress={() => setActiveTab('events')}>
                        <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
                            Events
                        </Text>
                        {activeTab === 'events' && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'members' && styles.activeTab]}
                        onPress={() => setActiveTab('members')}>
                        <Text style={[styles.tabText, activeTab === 'members' && styles.activeTabText]}>
                            Members
                        </Text>
                        {activeTab === 'members' && <View style={styles.tabUnderline} />}
                    </TouchableOpacity>
                </View>

                {activeTab === 'events' ? (
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.listCon}>
                            {status === 'loading' ? renderState('Loading team events...') : error ? renderState(error) : eventsData.length === 0 ? renderState('No team events found') : eventsData.map(item => (
                                <View style={styles.eventSpace} key={item.id}>
                                <TouchableOpacity onPress={() => navigation.navigate('PlcDetailScreen')} key={item.id} style={styles.eventCard}>
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
                                        <Text style={styles.eventLocation}>Location: {item.location}</Text>
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
                ) : (
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.listCon}>
                            {status === 'loading' ? renderState('Loading team members...') : error ? renderState(error) : membersData.length === 0 ? renderState('No team members found') : membersData.map(item => (
                                <View key={item.id} style={styles.spaceContainer}>
                                <TouchableOpacity key={item.id} style={styles.memberCard}>
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
                            <View style={{ height: height / 10 }} />
                        </View>
                    </ScrollView>
                )}
            </AppGradient>
        </SafeAreaView>
    );
}
