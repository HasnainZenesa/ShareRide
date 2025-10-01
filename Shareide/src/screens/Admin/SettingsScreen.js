import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export default function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={{ color: colors.text, marginTop: 8 }}>Theme: {mode}</Text>
      <View style={styles.switchContainer}>
        <Text style={{ color: colors.text }}>Light Mode</Text>
        <Switch
          value={mode === 'light'}
          onValueChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
        />
        <Text style={{ color: colors.text }}>Dark Mode</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '800' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
