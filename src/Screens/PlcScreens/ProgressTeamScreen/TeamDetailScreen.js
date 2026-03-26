import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
// import { styles, tableStyles } from '../ProgressScreen/ProgressStyles';
import { styles } from './TeamDetailStyles';

const { height } = Dimensions.get('window');

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
        location: 'Virtual Meeting',
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

export default function TeamDetailScreen({ navigation, route }) {
    const [activeTab, setActiveTab] = useState('events');
    const teamName = route?.params?.name || 'Crimson Hawks';

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
                            {eventsData.map(item => (
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
                            {membersData.map(item => (
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