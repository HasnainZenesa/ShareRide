import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';


export default function DashboardScreen() {
const { colors } = useTheme();
return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<Text style={[styles.title, { color: colors.text }]}>Rider Dashboard</Text>
<Text style={{ color: colors.text }}>Status: Offline (subscribe to go online)</Text>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 24, fontWeight: '800', marginBottom: 8 }
});