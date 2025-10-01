import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';


export default function SettingsScreen() {
const { colors, mode, setMode, resolved } = useTheme();
return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<Text style={[styles.title, { color: colors.text }]}>Settings</Text>
<Text style={{ color: colors.text, marginTop: 8 }}>Theme: {mode} (resolved: {resolved})</Text>
<View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
<Chip onPress={() => setMode('system')} active={mode==='system'}>System</Chip>
<Chip onPress={() => setMode('light')} active={mode==='light'}>Light</Chip>
<Chip onPress={() => setMode('dark')} active={mode==='dark'}>Dark</Chip>
</View>
</View>
);
}


function Chip({ children, onPress, active }) {
return (
<Pressable onPress={onPress} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: active ? '#FFD400' : '#EAEAEA' }}>
<Text style={{ fontWeight: '700' }}>{children}</Text>
</Pressable>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 24, fontWeight: '800' }
});