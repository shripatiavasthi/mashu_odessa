import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    
    Dimensions,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
import AppHeader from '../../../components/AppHeader';
import AppGradient from '../../../components/AppGradient';
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

const teamData = [
    { id: 1, name: 'Crimson Hawks', members: 5, points: 250 },
    { id: 2, name: 'Silver Serpents', members: 5, points: 10011 },
    { id: 3, name: 'Blue Barracudas', members: 5, points: 175 },
    { id: 4, name: 'Golden Griffins', members: 5, points: 150 },
    { id: 5, name: 'Emerald Enchanters', members: 5, points: 70000 },
];

export default function ProgressScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('individual');

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
        <SafeAreaView style={styles.safe}>
            <AppGradient style={styles.safe}>
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
                        {teamData.map(team => (
                            <View key={team.id} style={styles.spaceBox}>
                                <TouchableOpacity
                                    style={styles.teamCard}
                                    onPress={() => navigation.navigate('TeamDetailScreen', { name: team.name })}>
                                    <View style={styles.teamCardLeft}>
                                        <View style={styles.nameCon}>
                                            <Text style={styles.teamName}>{team.name}</Text>
                                        </View>
                                        <View style={styles.teamCon}>
                                            <Text style={styles.teamMembers}>{team.members} Team members</Text>
                                        </View>
                                    </View>
                                    <View style={styles.teamCardRight}>
                                        <View style={styles.pointsBadge}>
                                            <View style={styles.dot} />
                                            <Text style={styles.pointsText}>{team.points} Points</Text>
                                        </View>
                                        <View style={styles.arrowCon}>
                                            <Icon name="chevron-with-circle-right" size={18} color={colors.textDark} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={{ height: height / 10 }} />
                    </ScrollView>
                )}
            </AppGradient>
        </SafeAreaView>
    );
}
