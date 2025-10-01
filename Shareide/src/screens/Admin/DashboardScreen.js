import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Badge from '../../components/Badge';


export default function AdminDashboard({ navigation }) {
const { colors } = useTheme();
return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<Text style={[styles.title, { color: colors.text }]}>Admin Dashboard</Text>
<Text style={[styles.kpi, { color: colors.text }]}>Total Users: 120</Text>
<Text style={[styles.kpi, { color: colors.text }]}>Riders: 45</Text>
<Text style={[styles.kpi, { color: colors.text }]}>Pending Applications: <Badge label="5" /></Text>
<Text style={[styles.link, { color: colors.tint }]} onPress={() => navigation.navigate('RiderQueue')}>Go to Rider Approvals →</Text>
<Text style={[styles.link, { color: colors.tint }]} onPress={() => navigation.navigate('AdminSettings')}>Platform Config →</Text>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
kpi: { fontSize: 16, marginTop: 8 },
link: { fontSize: 16, marginTop: 16, fontWeight: '700' }
});