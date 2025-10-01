import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeProvider';


export default function RolePickerScreen({ onSelectRole }) {
const { colors } = useTheme();
return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<Image source={require('../../../assets/logo.png')} style={{ width: 160, height: 60, marginBottom: 24 }} resizeMode="contain" />
<Text style={[styles.title, { color: colors.text }]}>Welcome to Shareide</Text>
<Text style={[styles.sub, { color: colors.text }]}>Choose a role to preview UI:</Text>


<Button title="Passenger" onPress={() => onSelectRole('passenger')} style={{ width: '100%', marginTop: 16 }} />
<Button title="Rider" onPress={() => onSelectRole('rider')} style={{ width: '100%', marginTop: 12 }} />
<Button title="Admin" onPress={() => onSelectRole('admin')} style={{ width: '100%', marginTop: 12 }} />
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
title: { fontSize: 28, fontWeight: '800' },
sub: { fontSize: 14, opacity: 0.8, marginTop: 4 }
});