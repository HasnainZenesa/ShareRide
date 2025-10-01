import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Badge from '../../components/Badge';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome to Shareide</Text>
      <Badge label="Subscribe to unlock Chat/Call" />
      <Text style={[styles.desc, { color: colors.text }]}>Get a ride easily by subscribing.</Text>

      <View style={styles.cardContainer}>
        <Button title="Nearby Riders" color={colors.tint} onPress={() => alert('View Nearby Riders')} />
        <Button title="Subscription" color={colors.tint} onPress={() => alert('Manage Subscription')} />
        <Button title="Settings" color={colors.tint} onPress={() => alert('Go to Settings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  desc: { fontSize: 14, opacity: 0.8, marginBottom: 16 },
  cardContainer: { gap: 16, marginTop: 20 }
});
