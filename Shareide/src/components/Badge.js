import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';


export default function Badge({ label, tint }) {
const { colors } = useTheme();
return (
<View style={[styles.badge, { backgroundColor: tint || colors.tint }]}>
<Text style={styles.text}>{label}</Text>
</View>
);
}


const styles = StyleSheet.create({
badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
text: { color: '#000', fontWeight: '700', fontSize: 12 }
});