import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeProvider';


export default function GoOnlineScreen() {
const { colors } = useTheme();
const [subActive, setSubActive] = useState(false);
const [online, setOnline] = useState(false);


return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<Text style={[styles.title, { color: colors.text }]}>Rider Online/Offline</Text>
<Text style={{ color: colors.text, marginBottom: 8 }}>Rider monthly plan required to toggle Online.</Text>
<Button title={subActive ? 'Rider Plan Active' : 'Buy Rider Plan'} onPress={() => setSubActive(true)} />
<Button title={online ? 'Go Offline' : 'Go Online'} onPress={() => setOnline(!online)} style={{ marginTop: 12 }} disabled={!subActive} />
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 24, fontWeight: '800', marginBottom: 8 }
});