import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeProvider';


export default function SubscriptionScreen() {
const { colors } = useTheme();
const [active, setActive] = useState(false);
return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<Text style={[styles.title, { color: colors.text }]}>Passenger Subscription</Text>
<Text style={[styles.desc, { color: colors.text }]}>Chat/Call buttons unlock when active.</Text>
<Button title={active ? 'Subscribed' : 'Buy Monthly'} onPress={() => setActive(true)} />
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
desc: { fontSize: 14, opacity: 0.8, marginBottom: 16 }
});